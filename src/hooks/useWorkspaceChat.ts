'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/browserClient';
import type { WorkspaceMessage } from '@/types/workspace';
import {
  getWorkspaceMessages,
  sendWorkspaceMessage,
  getCurrentWorkspaceMember,
  markWorkspaceMessagesAsRead,
  type CurrentWorkspaceMember,
} from '@/lib/api/workspaceMessagesApi';

// SWR keys
const messagesKey = (
  workspaceId: number,
  limit?: number,
  beforeTimestamp?: string
) => {
  const params = new URLSearchParams();
  if (limit) params.set('limit', limit.toString());
  if (beforeTimestamp) params.set('before', beforeTimestamp);
  const query = params.toString();
  return `/workspaces/${workspaceId}/messages${query ? `?${query}` : ''}`;
};

const workspaceMemberKey = (workspaceId: number) =>
  `/workspaces/${workspaceId}/member`;

// Raw message from DB without joins
type RawMessage = {
  id: number;
  workspace_id: number;
  workspace_member_id: number;
  text: string;
  created_at: string;
  updated_at: string;
};

export function useWorkspaceChat(workspaceId: number) {
  const supabase = createClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const lastMarkedMessageIdRef = useRef<number | null>(null);
  const markInFlightRef = useRef(false);
  const workspaceMemberRef = useRef<CurrentWorkspaceMember | null>(null);
  const oldestMessageTimestampRef = useRef<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [localMessages, setLocalMessages] = useState<WorkspaceMessage[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // Fetch workspace member using SWR
  const {
    data: workspaceMember,
    error: memberError,
    mutate: mutateMember,
  } = useSWR<CurrentWorkspaceMember | null>(
    workspaceMemberKey(workspaceId),
    () => getCurrentWorkspaceMember(workspaceId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  // Fetch initial messages using SWR
  const {
    data: initialMessages,
    error: messagesError,
    isLoading,
    mutate: mutateMessages,
  } = useSWR<WorkspaceMessage[]>(
    messagesKey(workspaceId, 50),
    () => getWorkspaceMessages(workspaceId, 50),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  // Update workspace member ref when it changes
  useEffect(() => {
    if (workspaceMember) {
      workspaceMemberRef.current = workspaceMember;
    }
  }, [workspaceMember]);

  // Decorate messages with read status
  const decorateMessages = useCallback(
    (
      rawMessages: WorkspaceMessage[],
      memberOverride?: CurrentWorkspaceMember | null
    ) => {
      const member = memberOverride ?? workspaceMemberRef.current;
      const memberId = member?.id ?? null;
      const lastReadId = member?.last_read_message_id ?? null;

      return rawMessages.map(message => {
        const existingReads = message.reads ? [...message.reads] : [];
        const readCount = message.read_count ?? existingReads.length;
        const hasExistingRead =
          memberId !== null
            ? existingReads.some(read => read.workspace_member_id === memberId)
            : false;
        const withinLastReadRange =
          memberId !== null && lastReadId !== null && message.id <= lastReadId;

        return {
          ...message,
          reads: existingReads,
          read_count: readCount,
          is_read_by_current_user: hasExistingRead || withinLastReadRange,
        };
      });
    },
    []
  );

  // Initialize local messages from SWR data
  useEffect(() => {
    if (initialMessages) {
      const reversedMessages = [...initialMessages].reverse();
      const decorated = decorateMessages(reversedMessages, workspaceMember);
      setLocalMessages(decorated);

      // Track pagination state
      if (reversedMessages.length > 0) {
        oldestMessageTimestampRef.current =
          reversedMessages[0]?.created_at || null;
      }
      setHasMoreMessages(initialMessages.length === 50);
    }
  }, [initialMessages, workspaceMember, decorateMessages]);

  // Re-decorate messages when workspace member changes
  useEffect(() => {
    if (workspaceMember) {
      setLocalMessages(prev => decorateMessages(prev, workspaceMember));
    }
  }, [workspaceMember, decorateMessages]);

  // Set up Realtime subscription with retry logic
  useEffect(() => {
    let mounted = true;

    async function setupRealtime() {
      // Clear existing reconnect timeout
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      // Remove existing channel
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }

      try {
        // Get current session to ensure we have auth
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session || !mounted) {
          console.warn('No session available for Realtime');
          setIsConnected(false);
          return;
        }

        // Set auth for Realtime
        await supabase.realtime.setAuth();

        const channel = supabase.channel(`workspace:${workspaceId}:messages`, {
          config: { private: true, broadcast: { self: true, ack: true } },
        });

        channel
          .on('broadcast', { event: 'INSERT' }, () => {
            if (!mounted) return;
            // When broadcast is received, revalidate messages
            mutateMessages();
          })
          .on('broadcast', { event: 'UPDATE' }, () => {
            if (!mounted) return;
            // Revalidate on update
            mutateMessages();
          })
          .on('broadcast', { event: 'DELETE' }, ({ payload }) => {
            if (!mounted) return;
            const deleted = payload.old as RawMessage;
            if (deleted && deleted.id) {
              setLocalMessages(prev =>
                prev.filter(msg => msg.id !== deleted.id)
              );
            }
          })
          .subscribe((status, err) => {
            if (!mounted) return;

            console.log('Realtime status:', status, err ? { err } : '');

            if (status === 'SUBSCRIBED') {
              setIsConnected(true);
              retryCountRef.current = 0;
            } else if (
              status === 'CHANNEL_ERROR' ||
              status === 'TIMED_OUT' ||
              status === 'CLOSED'
            ) {
              setIsConnected(false);

              // Retry connection with exponential backoff
              const maxRetries = 5;
              if (retryCountRef.current < maxRetries) {
                retryCountRef.current += 1;
                const delay = Math.min(
                  1000 * Math.pow(2, retryCountRef.current),
                  30000
                );

                reconnectTimeoutRef.current = setTimeout(() => {
                  if (mounted) {
                    console.log(
                      `Retrying Realtime connection (attempt ${retryCountRef.current})...`
                    );
                    setupRealtime();
                  }
                }, delay);
              } else {
                console.error('Max retries reached for Realtime connection.');
              }
            }
          });

        channelRef.current = channel;
      } catch (err) {
        if (!mounted) return;
        console.error('Error setting up Realtime:', err);
        setIsConnected(false);

        // Retry after delay
        if (retryCountRef.current < 5) {
          retryCountRef.current += 1;
          const delay = Math.min(
            1000 * Math.pow(2, retryCountRef.current),
            30000
          );
          reconnectTimeoutRef.current = setTimeout(() => {
            if (mounted) {
              setupRealtime();
            }
          }, delay);
        }
      }
    }

    // Wait a bit for auth to be ready
    const initTimeout = setTimeout(() => {
      setupRealtime();
    }, 500);

    return () => {
      mounted = false;
      clearTimeout(initTimeout);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [workspaceId, supabase, mutateMessages]);

  const sendMessage = useCallback(
    async (
      text: string,
      replyToId?: number | null,
      workspaceFileIds?: number[],
      mentionedMemberIds?: number[],
      mentionedNoteIds?: number[]
    ) => {
      if (!workspaceMember?.id) return;
      // Allow sending if there's text or files
      if (!text.trim() && (!workspaceFileIds || workspaceFileIds.length === 0))
        return;

      setSendError(null);

      try {
        await sendWorkspaceMessage(
          workspaceId,
          workspaceMember.id,
          text,
          replyToId,
          workspaceFileIds,
          mentionedMemberIds,
          mentionedNoteIds
        );
        // Revalidate messages to get the new one
        mutateMessages();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to send message';
        setSendError(errorMessage);
        console.error('Error sending message:', err);
        throw err;
      }
    },
    [workspaceId, workspaceMember, mutateMessages]
  );

  // Load more messages (for infinite scroll)
  const loadMoreMessages = useCallback(async () => {
    if (
      !hasMoreMessages ||
      isLoadingMore ||
      !oldestMessageTimestampRef.current
    ) {
      return;
    }

    setIsLoadingMore(true);
    setSendError(null);

    try {
      const olderMessages = await getWorkspaceMessages(
        workspaceId,
        50,
        oldestMessageTimestampRef.current
      );

      if (olderMessages.length === 0) {
        setHasMoreMessages(false);
        setIsLoadingMore(false);
        return;
      }

      // Reverse to show oldest first
      const reversedOlderMessages = [...olderMessages].reverse();

      setLocalMessages(prev => {
        // Prepend older messages to the beginning
        const allMessages = [...reversedOlderMessages, ...prev];
        return decorateMessages(allMessages, workspaceMemberRef.current);
      });

      // Update oldest message timestamp
      if (reversedOlderMessages.length > 0) {
        oldestMessageTimestampRef.current =
          reversedOlderMessages[0]?.created_at || null;
      }

      // Check if there are more messages to load
      setHasMoreMessages(olderMessages.length === 50);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load older messages';
      setSendError(errorMessage);
      console.error('Error loading older messages:', err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [workspaceId, hasMoreMessages, isLoadingMore, decorateMessages]);

  // Mark messages as read when they appear
  useEffect(() => {
    if (!workspaceMember?.id) return;
    if (localMessages.length === 0) return;
    if (markInFlightRef.current) return;

    const lastRead =
      workspaceMember.last_read_message_id ??
      lastMarkedMessageIdRef.current ??
      0;

    const unreadMessages = localMessages.filter(message => {
      if (message.workspace_member_id === workspaceMember.id) {
        return false;
      }

      return !message.is_read_by_current_user && message.id > lastRead;
    });

    if (unreadMessages.length === 0) return;

    const messageIds = Array.from(
      new Set(unreadMessages.map(message => message.id))
    );

    markInFlightRef.current = true;
    let cancelled = false;

    (async () => {
      try {
        const updatedLastRead = await markWorkspaceMessagesAsRead(
          workspaceId,
          workspaceMember.id,
          messageIds,
          workspaceMember.last_read_message_id ?? lastMarkedMessageIdRef.current
        );

        if (cancelled) return;

        const newLastReadValue =
          updatedLastRead ?? workspaceMember.last_read_message_id ?? null;

        lastMarkedMessageIdRef.current =
          newLastReadValue ?? lastMarkedMessageIdRef.current;

        // Update workspace member in SWR cache
        mutateMember((current): CurrentWorkspaceMember | null => {
          if (!current) return current ?? null;
          return {
            ...current,
            last_read_message_id:
              newLastReadValue ?? current.last_read_message_id ?? null,
          };
        }, false);

        // Update local messages state
        const messageIdSet = new Set(messageIds);

        setLocalMessages(prev =>
          prev.map(message => {
            if (!messageIdSet.has(message.id)) {
              return message;
            }

            const existingReads = message.reads ?? [];
            const hasExistingRead = existingReads.some(
              read => read.workspace_member_id === workspaceMember.id
            );
            const baseReadCount = message.read_count ?? existingReads.length;

            const updatedReads = hasExistingRead
              ? existingReads
              : [
                  ...existingReads,
                  {
                    workspace_message_id: message.id,
                    workspace_member_id: workspaceMember.id,
                    read_at: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                    workspace_member: undefined,
                  },
                ];

            return {
              ...message,
              reads: updatedReads,
              read_count: hasExistingRead ? baseReadCount : baseReadCount + 1,
              is_read_by_current_user: true,
            };
          })
        );
      } catch (err) {
        console.error('Error marking messages as read:', err);
      } finally {
        if (!cancelled) {
          markInFlightRef.current = false;
        }
      }
    })();

    return () => {
      cancelled = true;
      markInFlightRef.current = false;
    };
  }, [localMessages, workspaceId, workspaceMember, mutateMember]);

  // Combine errors
  const error =
    memberError || messagesError
      ? memberError?.message ||
        messagesError?.message ||
        'Failed to load chat data'
      : sendError;

  return {
    messages: localMessages,
    sendMessage,
    isLoading,
    isLoadingMore,
    error,
    isConnected,
    workspaceMember,
    loadMoreMessages,
    hasMoreMessages,
  };
}

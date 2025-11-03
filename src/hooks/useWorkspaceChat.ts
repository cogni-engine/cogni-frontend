'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/browserClient';
import type { WorkspaceMessage } from '@/types/workspace';
import {
  getWorkspaceMessages,
  sendWorkspaceMessage,
  getCurrentWorkspaceMember,
  markWorkspaceMessagesAsRead,
  type CurrentWorkspaceMember,
} from '@/lib/api/workspaceMessagesApi';

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
  const [messages, setMessages] = useState<WorkspaceMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workspaceMember, setWorkspaceMember] =
    useState<CurrentWorkspaceMember | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const supabase = createClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const lastMessageIdRef = useRef<number | null>(null);
  const lastMarkedMessageIdRef = useRef<number | null>(null);
  const markInFlightRef = useRef(false);
  const workspaceMemberRef = useRef<CurrentWorkspaceMember | null>(null);
  const oldestMessageTimestampRef = useRef<string | null>(null);

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

  // Polling fallback to ensure messages are loaded even if Realtime fails
  const startPolling = useCallback(() => {
    // Clear existing polling
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }

    // Poll every 3 seconds
    pollIntervalRef.current = setInterval(async () => {
      try {
        const msgs = await getWorkspaceMessages(workspaceId, 100);
        setMessages(prev => {
          const newMsgs = decorateMessages([...msgs].reverse());
          // Only update if we have new messages or empty list
          if (
            prev.length === 0 ||
            (newMsgs.length > 0 &&
              newMsgs[newMsgs.length - 1]?.id !== prev[prev.length - 1]?.id)
          ) {
            return newMsgs;
          }
          return prev;
        });
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 3000);
  }, [workspaceId, decorateMessages]);

  // Fetch initial messages and workspace member ID
  useEffect(() => {
    let mounted = true;

    async function init() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch current workspace member ID
        const member = await getCurrentWorkspaceMember(workspaceId);
        if (!mounted) return;
        setWorkspaceMember(member);
        workspaceMemberRef.current = member;

        // Fetch initial messages
        const initialMessages = await getWorkspaceMessages(workspaceId, 50);
        if (!mounted) return;

        // Reverse to show oldest first
        const reversedMessages = [...initialMessages].reverse();
        setMessages(decorateMessages(reversedMessages, member));

        // Track last message ID
        if (reversedMessages.length > 0) {
          lastMessageIdRef.current =
            reversedMessages[reversedMessages.length - 1]?.id || null;
          // Track oldest message timestamp for pagination
          oldestMessageTimestampRef.current =
            reversedMessages[0]?.created_at || null;
        }

        // Check if there are more messages to load
        setHasMoreMessages(initialMessages.length === 50);
      } catch (err) {
        if (!mounted) return;
        setError(
          err instanceof Error ? err.message : 'Failed to initialize chat'
        );
        console.error('Error initializing chat:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, [workspaceId, decorateMessages]);

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
          startPolling();
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
            // When broadcast is received, refresh the messages list
            // This ensures we get the full message with nested relations
            getWorkspaceMessages(workspaceId, 100)
              .then(msgs => {
                if (mounted) {
                  setMessages(decorateMessages([...msgs].reverse()));
                }
              })
              .catch(err => {
                console.error('Error fetching messages after INSERT:', err);
              });
          })
          .on('broadcast', { event: 'UPDATE' }, () => {
            if (!mounted) return;
            // Refresh on update
            getWorkspaceMessages(workspaceId, 100)
              .then(msgs => {
                if (mounted) {
                  setMessages(decorateMessages([...msgs].reverse()));
                }
              })
              .catch(err => {
                console.error('Error fetching messages after UPDATE:', err);
              });
          })
          .on('broadcast', { event: 'DELETE' }, ({ payload }) => {
            if (!mounted) return;
            const deleted = payload.old as RawMessage;
            if (deleted && deleted.id) {
              setMessages(prev => prev.filter(msg => msg.id !== deleted.id));
            }
          })
          .subscribe((status, err) => {
            if (!mounted) return;

            console.log('Realtime status:', status, err ? { err } : '');

            if (status === 'SUBSCRIBED') {
              setIsConnected(true);
              retryCountRef.current = 0;
              // Stop polling when connected
              if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
                pollIntervalRef.current = null;
              }
            } else if (
              status === 'CHANNEL_ERROR' ||
              status === 'TIMED_OUT' ||
              status === 'CLOSED'
            ) {
              setIsConnected(false);
              // Start polling as fallback
              startPolling();

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
                console.error(
                  'Max retries reached for Realtime connection. Using polling fallback.'
                );
                setError(
                  'Real-time connection unavailable. Messages will refresh periodically.'
                );
              }
            }
          });

        channelRef.current = channel;
      } catch (err) {
        if (!mounted) return;
        console.error('Error setting up Realtime:', err);
        setIsConnected(false);
        // Start polling as fallback
        startPolling();

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
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [workspaceId, supabase, startPolling, decorateMessages]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!workspaceMember?.id || !text.trim()) return;

      setIsLoading(true);
      setError(null);

      try {
        await sendWorkspaceMessage(workspaceId, workspaceMember.id, text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to send message');
        console.error('Error sending message:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [workspaceId, workspaceMember]
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
    setError(null);

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

      setMessages(prev => {
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
      setError(
        err instanceof Error ? err.message : 'Failed to load older messages'
      );
      console.error('Error loading older messages:', err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [workspaceId, hasMoreMessages, isLoadingMore, decorateMessages]);

  // Re-decorate messages when workspace member context changes
  useEffect(() => {
    workspaceMemberRef.current = workspaceMember;
    setMessages(prev => decorateMessages(prev, workspaceMember));
  }, [workspaceMember, decorateMessages]);

  // Mark messages as read when they appear
  useEffect(() => {
    if (!workspaceMember?.id) return;
    if (messages.length === 0) return;
    if (markInFlightRef.current) return;

    const lastRead =
      workspaceMember.last_read_message_id ??
      lastMarkedMessageIdRef.current ??
      0;

    const unreadMessages = messages.filter(message => {
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

        setWorkspaceMember(prev => {
          if (!prev) return prev;
          const nextValue: CurrentWorkspaceMember = {
            ...prev,
            last_read_message_id:
              newLastReadValue ?? prev.last_read_message_id ?? null,
          };
          workspaceMemberRef.current = nextValue;
          return nextValue;
        });

        const messageIdSet = new Set(messageIds);

        setMessages(prev =>
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
  }, [messages, workspaceId, workspaceMember]);

  return {
    messages,
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

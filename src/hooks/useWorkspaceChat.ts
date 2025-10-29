'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/browserClient';
import type { WorkspaceMessage } from '@/types/workspace';
import {
  getWorkspaceMessages,
  sendWorkspaceMessage,
  getCurrentWorkspaceMember,
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
  const [error, setError] = useState<string | null>(null);
  const [workspaceMemberId, setWorkspaceMemberId] = useState<number | null>(
    null
  );
  const [isConnected, setIsConnected] = useState(false);
  const supabase = createClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const lastMessageIdRef = useRef<number | null>(null);

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
          const newMsgs = [...msgs].reverse();
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
  }, [workspaceId]);

  // Fetch initial messages and workspace member ID
  useEffect(() => {
    let mounted = true;

    async function init() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch current workspace member ID
        const memberId = await getCurrentWorkspaceMember(workspaceId);
        if (!mounted) return;
        setWorkspaceMemberId(memberId);

        // Fetch initial messages
        const initialMessages = await getWorkspaceMessages(workspaceId);
        if (!mounted) return;

        // Reverse to show oldest first
        const reversedMessages = [...initialMessages].reverse();
        setMessages(reversedMessages);

        // Track last message ID
        if (reversedMessages.length > 0) {
          lastMessageIdRef.current =
            reversedMessages[reversedMessages.length - 1]?.id || null;
        }
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
  }, [workspaceId]);

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
                  setMessages([...msgs].reverse());
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
                  setMessages([...msgs].reverse());
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
  }, [workspaceId, supabase, startPolling]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!workspaceMemberId || !text.trim()) return;

      setIsLoading(true);
      setError(null);

      try {
        await sendWorkspaceMessage(workspaceId, workspaceMemberId, text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to send message');
        console.error('Error sending message:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [workspaceId, workspaceMemberId]
  );

  return {
    messages,
    sendMessage,
    isLoading,
    error,
    isConnected,
    workspaceMemberId,
  };
}

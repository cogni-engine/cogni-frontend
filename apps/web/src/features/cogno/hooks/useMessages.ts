'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Message } from '@/types/chat';

export interface UseMessagesOptions {
  threadId: number | null;
  apiBaseUrl?: string;
}

export function useMessages({
  threadId,
  apiBaseUrl = '/api',
}: UseMessagesOptions) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(
    async (tid: number) => {
      try {
        setLoading(true);
        setError(null);
        const url = `${apiBaseUrl}/cogno/threads/${tid}/messages`;
        const response = await fetch(url);
        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            'Failed to fetch messages:',
            response.status,
            errorText
          );
          throw new Error(`Failed to fetch messages: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch messages'
        );
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    },
    [apiBaseUrl]
  );

  useEffect(() => {
    if (threadId) {
      fetchMessages(threadId);
    } else {
      setMessages([]);
    }
  }, [threadId, fetchMessages]);

  return {
    messages,
    setMessages,
    loading,
    error,
    refetch: fetchMessages,
  };
}

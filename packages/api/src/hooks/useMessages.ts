import { useState, useCallback, useEffect } from 'react';
import type { Message } from '@cogni/types';

export interface UseMessagesOptions {
  threadId: number | null;
  apiBaseUrl?: string;
}

export function useMessages({ threadId, apiBaseUrl = '/api' }: UseMessagesOptions) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debug logging for message updates
  useEffect(() => {
    console.log('📝 Messages updated in useMessages:', messages.length, 'messages');
  }, [messages]);

  const fetchMessages = useCallback(
    async (tid: number) => {
      console.log('💬 fetchMessages called', { threadId: tid, apiBaseUrl });
      try {
        setLoading(true);
        setError(null);
        const url = `${apiBaseUrl}/cogno/threads/${tid}/messages`;
        console.log('📡 Fetching messages from:', url);
        const response = await fetch(url);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Failed to fetch messages:', response.status, errorText);
          throw new Error(`Failed to fetch messages: ${response.status}`);
        }
        const data = await response.json();
        console.log('✅ Fetched messages:', data.messages?.length || 0, 'messages');
        setMessages(data.messages || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch messages');
        console.error('❌ Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    },
    [apiBaseUrl]
  );

  useEffect(() => {
    console.log('👀 useMessages effect triggered', { threadId });
    if (threadId) {
      fetchMessages(threadId);
    } else {
      console.log('⚠️ No threadId, clearing messages');
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


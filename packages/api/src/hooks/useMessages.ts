import { useState, useCallback, useEffect } from 'react';
import type { Message } from '@cogni/types';

export interface UseMessagesOptions {
  threadId: number | null;
  apiBaseUrl?: string;
  headers?: HeadersInit;
}

export function useMessages({ threadId, apiBaseUrl = '/api', headers }: UseMessagesOptions) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(
    async (tid: number) => {
      try {
        setLoading(true);
        setError(null);
        const url = `${apiBaseUrl}/cogno/threads/${tid}/messages`;
        console.log('📡 Fetching messages:', { url, headers });
        const response = await fetch(url, { headers });
        console.log('📡 Response status:', response.status, response.statusText);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to fetch messages:', response.status, errorText);
          throw new Error(`Failed to fetch messages: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        console.log('📡 Content-Type:', contentType);
        
        if (!contentType?.includes('application/json')) {
          const text = await response.text();
          console.error('Expected JSON but got:', text.substring(0, 200));
          throw new Error('API returned non-JSON response');
        }
        
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch messages');
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    },
    [apiBaseUrl, headers]
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


'use client';

import useSWR from 'swr';
import { getThreadMessages } from '@/lib/api/aiMessagesApi';
import type { AIMessage } from '@/types/chat';
import type { ThreadId } from '@/contexts/ThreadContext';

export interface UseMessagesOptions {
  threadId: ThreadId;
}

export function useMessages({ threadId }: UseMessagesOptions) {
  // Only fetch for existing threads (numeric IDs)
  const swrKey =
    typeof threadId === 'number' ? `ai-messages-${threadId}` : null;

  const { data, error, isLoading, mutate } = useSWR(
    swrKey,
    () => getThreadMessages(threadId as number),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    messages: data ?? [],
    setMessages: (
      messages: AIMessage[] | ((prev: AIMessage[]) => AIMessage[])
    ) => {
      mutate(
        typeof messages === 'function' ? messages(data ?? []) : messages,
        false
      );
    },
    loading: isLoading,
    error: error?.message ?? null,
    refetch: () => mutate(),
  };
}

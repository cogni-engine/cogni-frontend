'use client';

import { useEffect } from 'react';
import useSWR from 'swr';
import { getThreadMessages } from '@/features/cogno/api/aiMessagesApi';
import type { AIMessage } from '@/types/chat';
import type { ThreadId } from '../contexts/ThreadContext';

const CACHE_KEY = 'cogno-messages-cache';
const MAX_CACHED_THREADS = 5;

function getCachedMessages(threadId: number): AIMessage[] | undefined {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    return cache[threadId];
  } catch {
    return undefined;
  }
}

function setCachedMessages(threadId: number, messages: AIMessage[]) {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    cache[threadId] = messages;
    // Keep only the most recent N threads
    const keys = Object.keys(cache);
    if (keys.length > MAX_CACHED_THREADS) {
      delete cache[keys[0]];
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore storage errors
  }
}

export interface UseMessagesOptions {
  threadId: ThreadId;
}

export function useMessages({ threadId }: UseMessagesOptions) {
  const numericThreadId = typeof threadId === 'number' ? threadId : null;
  const swrKey = numericThreadId ? `ai-messages-${numericThreadId}` : null;

  const { data, error, isLoading, mutate } = useSWR(
    swrKey,
    () => getThreadMessages(numericThreadId!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: freshData => {
        if (numericThreadId && freshData) {
          setCachedMessages(numericThreadId, freshData);
        }
      },
    }
  );

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    if (numericThreadId && !data && isLoading) {
      const cached = getCachedMessages(numericThreadId);
      if (cached && cached.length > 0) {
        mutate(cached, false);
      }
    }
  }, [numericThreadId, data, isLoading, mutate]);

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
    // Not loading if we have cached data (instant display)
    loading: isLoading && !data,
    error: error?.message ?? null,
    refetch: () => mutate(),
  };
}

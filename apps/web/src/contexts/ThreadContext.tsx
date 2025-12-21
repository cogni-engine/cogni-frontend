'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import useSWR from 'swr';
import {
  getThreads,
  updateThread as apiUpdateThread,
  deleteThread as apiDeleteThread,
} from '@/lib/api/threadsApi';
import type { Thread } from '@/types/thread';
import { getPersonalWorkspaceId } from '@/lib/cookies';

export type ThreadId = number | 'new' | null;

interface ThreadContextType {
  // Selected thread
  selectedThreadId: ThreadId;
  setSelectedThreadId: (id: ThreadId) => void;
  // Thread list
  threads: Thread[];
  threadsLoading: boolean;
  threadsError: string | null;
  refetchThreads: () => Promise<void>;
  updateThread: (id: number, title: string) => Promise<Thread>;
  deleteThread: (id: number) => Promise<void>;
}

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

async function fetchThreads(workspaceId: number): Promise<Thread[]> {
  return getThreads(workspaceId);
}

export function ThreadProvider({ children }: { children: ReactNode }) {
  const [selectedThreadId, setSelectedThreadId] = useState<ThreadId>(null);
  const hasAutoSelected = useRef(false);

  const workspaceId = getPersonalWorkspaceId();
  const swrKey = workspaceId ? `/threads/${workspaceId}` : null;

  const {
    data: threads = [],
    error,
    isLoading,
    mutate,
  } = useSWR(swrKey, () => fetchThreads(workspaceId!), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Auto-select most recent thread on initial data load
  useEffect(() => {
    if (!hasAutoSelected.current && threads.length > 0 && !isLoading) {
      hasAutoSelected.current = true;
      setSelectedThreadId(threads[0].id);
    }
  }, [threads, isLoading]);

  const updateExistingThread = useCallback(
    async (id: number, title: string) => {
      const updatedThread = await apiUpdateThread(id, title);

      // Optimistically update the cache
      mutate(
        current =>
          current?.map(thread => (thread.id === id ? updatedThread : thread)) ??
          [],
        false
      );

      return updatedThread;
    },
    [mutate]
  );

  const deleteExistingThread = useCallback(
    async (id: number) => {
      await apiDeleteThread(id);

      // Optimistically update the cache
      mutate(
        current => current?.filter(thread => thread.id !== id) ?? [],
        false
      );
    },
    [mutate]
  );

  const refetchThreads = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return (
    <ThreadContext.Provider
      value={{
        selectedThreadId,
        setSelectedThreadId,
        threads,
        threadsLoading: isLoading,
        threadsError: error?.message ?? null,
        refetchThreads,
        updateThread: updateExistingThread,
        deleteThread: deleteExistingThread,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
}

export function useThreadContext() {
  const context = useContext(ThreadContext);
  if (context === undefined) {
    throw new Error('useThreadContext must be used within a ThreadProvider');
  }
  return context;
}

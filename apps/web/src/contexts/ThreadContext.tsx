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
  createThread as apiCreateThread,
  updateThread as apiUpdateThread,
  deleteThread as apiDeleteThread,
} from '@/lib/api/threadsApi';
import type { Thread } from '@/types/thread';
import { getPersonalWorkspaceId } from '@/lib/cookies';

export type ThreadId = number | 'new' | null;

const SELECTED_THREAD_CACHE_KEY = 'cogno-selected-thread';

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
  const [selectedThreadId, setSelectedThreadIdState] = useState<ThreadId>(null);
  const hasHydrated = useRef(false);
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

  // Wrapper to persist selected thread to localStorage
  const setSelectedThreadId = useCallback((id: ThreadId) => {
    setSelectedThreadIdState(id);
    if (typeof id === 'number') {
      try {
        localStorage.setItem(SELECTED_THREAD_CACHE_KEY, id.toString());
      } catch {
        // Ignore storage errors
      }
    }
  }, []);

  // Hydrate selectedThreadId from localStorage after mount
  useEffect(() => {
    if (hasHydrated.current) return;
    hasHydrated.current = true;

    try {
      const cached = localStorage.getItem(SELECTED_THREAD_CACHE_KEY);
      if (cached) {
        const threadId = parseInt(cached, 10);
        if (!isNaN(threadId)) {
          setSelectedThreadIdState(threadId);
          hasAutoSelected.current = true; // Don't auto-select if we have a cached selection
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Auto-select most recent thread only if no cached selection
  // If error or no threads, automatically create a new thread
  useEffect(() => {
    if (!hasAutoSelected.current && !isLoading) {
      hasAutoSelected.current = true;
      
      // If there's an error or threads is empty, create a new thread
      if (error || threads.length === 0) {
        // Only create thread if workspaceId is available
        if (workspaceId) {
          console.log('[ThreadContext] Auto-creating new thread. Error:', error, 'Threads count:', threads.length);
          
          // Create a new thread automatically
          apiCreateThread(workspaceId, 'New Thread')
            .then(newThread => {
              console.log('[ThreadContext] Auto-created new thread:', newThread.id);
              setSelectedThreadId(newThread.id);
              // Refresh threads list to include the new thread
              mutate();
            })
            .catch(err => {
              console.error('[ThreadContext] Failed to auto-create thread:', err);
              // Fallback to 'new' mode if creation fails
              setSelectedThreadId('new');
            });
        } else {
          // Fallback to 'new' mode if workspaceId is not available
          console.log('[ThreadContext] WorkspaceId not available, setting to new thread mode');
          setSelectedThreadId('new');
        }
      } else if (threads.length > 0) {
        // Otherwise, select the most recent thread
        console.log('[ThreadContext] Auto-selecting most recent thread:', threads[0].id);
        setSelectedThreadId(threads[0].id);
      }
    }
  }, [threads, isLoading, error, workspaceId, setSelectedThreadId, mutate]);

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

  // Loading until we've hydrated from localStorage and have a selected thread
  const stillLoading =
    !hasHydrated.current || (isLoading && selectedThreadId === null);

  return (
    <ThreadContext.Provider
      value={{
        selectedThreadId,
        setSelectedThreadId,
        threads,
        threadsLoading: stillLoading,
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

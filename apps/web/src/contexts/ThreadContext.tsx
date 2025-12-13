'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { getThreads, updateThread, deleteThread } from '@/lib/api/threadsApi';
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

export function ThreadProvider({ children }: { children: ReactNode }) {
  const [selectedThreadId, setSelectedThreadId] = useState<ThreadId>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [threadsLoading, setThreadsLoading] = useState(true);
  const [threadsError, setThreadsError] = useState<string | null>(null);

  const fetchThreads = useCallback(async (selectMostRecent = false) => {
    try {
      setThreadsLoading(true);
      setThreadsError(null);

      const workspaceId = getPersonalWorkspaceId();
      if (!workspaceId) {
        throw new Error('No personal workspace found');
      }

      const data = await getThreads(workspaceId);
      setThreads(data);

      // Select the most recent thread on initial load
      if (selectMostRecent && data.length > 0) {
        setSelectedThreadId(data[0].id);
      }
    } catch (err) {
      setThreadsError(
        err instanceof Error ? err.message : 'Failed to fetch threads'
      );
      console.error('Error fetching threads:', err);
    } finally {
      setThreadsLoading(false);
    }
  }, []);

  const updateExistingThread = useCallback(
    async (id: number, title: string) => {
      try {
        setThreadsError(null);
        const updatedThread = await updateThread(id, title);
        setThreads(prev =>
          prev.map(thread => (thread.id === id ? updatedThread : thread))
        );
        return updatedThread;
      } catch (err) {
        setThreadsError(
          err instanceof Error ? err.message : 'Failed to update thread'
        );
        console.error('Error updating thread:', err);
        throw err;
      }
    },
    []
  );

  const deleteExistingThread = useCallback(async (id: number) => {
    try {
      setThreadsError(null);
      await deleteThread(id);
      setThreads(prev => prev.filter(thread => thread.id !== id));
    } catch (err) {
      setThreadsError(
        err instanceof Error ? err.message : 'Failed to delete thread'
      );
      console.error('Error deleting thread:', err);
      throw err;
    }
  }, []);

  // Fetch threads on mount and select the most recent one
  useEffect(() => {
    fetchThreads(true);
  }, [fetchThreads]);

  return (
    <ThreadContext.Provider
      value={{
        selectedThreadId,
        setSelectedThreadId,
        threads,
        threadsLoading,
        threadsError,
        refetchThreads: fetchThreads,
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

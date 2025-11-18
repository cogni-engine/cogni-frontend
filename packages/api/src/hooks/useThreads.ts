import { useState, useEffect, useCallback } from 'react';
import {
  getThreads,
  createThread,
  updateThread,
  deleteThread,
} from '../threads';
import type { Thread } from '@cogni/types';

export interface UseThreadsOptions {
  workspaceId: number | null;
  autoFetch?: boolean;
}

export function useThreads({ workspaceId, autoFetch = true }: UseThreadsOptions) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchThreads = useCallback(async () => {
    if (!workspaceId) {
      setThreads([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getThreads(workspaceId);
      setThreads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch threads');
      console.error('Error fetching threads:', err);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  const createNewThread = useCallback(
    async (title: string) => {
      if (!workspaceId) {
        throw new Error('No workspace ID provided');
      }

      try {
        setError(null);
        const newThread = await createThread(workspaceId, title);
        setThreads(prev => [newThread, ...prev]);
        return newThread;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create thread');
        console.error('Error creating thread:', err);
        throw err;
      }
    },
    [workspaceId]
  );

  const updateExistingThread = useCallback(
    async (id: number, title: string) => {
      try {
        setError(null);
        const updatedThread = await updateThread(id, title);
        setThreads(prev =>
          prev.map(thread => (thread.id === id ? updatedThread : thread))
        );
        return updatedThread;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update thread');
        console.error('Error updating thread:', err);
        throw err;
      }
    },
    []
  );

  const deleteExistingThread = useCallback(async (id: number) => {
    try {
      setError(null);
      await deleteThread(id);
      setThreads(prev => prev.filter(thread => thread.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete thread');
      console.error('Error deleting thread:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchThreads();
    }
  }, [fetchThreads, autoFetch]);

  return {
    threads,
    loading,
    error,
    refetch: fetchThreads,
    createThread: createNewThread,
    updateThread: updateExistingThread,
    deleteThread: deleteExistingThread,
  };
}


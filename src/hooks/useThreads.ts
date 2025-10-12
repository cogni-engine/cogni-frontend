"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  getThreads, 
  getThread, 
  createThread, 
  updateThread, 
  deleteThread,
} from '@/lib/api/threadsApi';
import type { Thread } from '@/types/thread';
import { getPersonalWorkspaceId } from '@/lib/cookies';

export function useThreads() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchThreads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const workspaceId = getPersonalWorkspaceId();
      if (!workspaceId) {
        throw new Error('No personal workspace found');
      }

      const data = await getThreads(workspaceId);
      setThreads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch threads');
      console.error('Error fetching threads:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewThread = useCallback(async (title: string) => {
    try {
      setError(null);
      
      const workspaceId = getPersonalWorkspaceId();
      if (!workspaceId) {
        throw new Error('No personal workspace found');
      }

      const newThread = await createThread(workspaceId, title);
      setThreads(prev => [newThread, ...prev]);
      return newThread;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create thread');
      console.error('Error creating thread:', err);
      throw err;
    }
  }, []);

  const updateExistingThread = useCallback(async (id: number, title: string) => {
    try {
      setError(null);
      
      const updatedThread = await updateThread(id, title);
      setThreads(prev => prev.map(thread => thread.id === id ? updatedThread : thread));
      return updatedThread;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update thread');
      console.error('Error updating thread:', err);
      throw err;
    }
  }, []);

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
    fetchThreads();
  }, [fetchThreads]);

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

export function useThread(id: number | 'new') {
  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === 'new') {
      // Creating a new thread
      setThread({
        id: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        title: '',
        workspace_id: getPersonalWorkspaceId() || 0,
      });
      setLoading(false);
      return;
    }

    async function fetchThread() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getThread(id);
        if (!data) {
          throw new Error('Thread not found');
        }
        
        setThread(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch thread');
        console.error('Error fetching thread:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchThread();
  }, [id]);

  const saveThread = useCallback(async (title: string) => {
    try {
      setError(null);
      
      if (id === 'new') {
        const workspaceId = getPersonalWorkspaceId();
        if (!workspaceId) {
          throw new Error('No personal workspace found');
        }
        const newThread = await createThread(workspaceId, title);
        setThread(newThread);
        return newThread;
      } else {
        const updatedThread = await updateThread(id, title);
        setThread(updatedThread);
        return updatedThread;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save thread');
      console.error('Error saving thread:', err);
      throw err;
    }
  }, [id]);

  return {
    thread,
    loading,
    error,
    saveThread,
  };
}


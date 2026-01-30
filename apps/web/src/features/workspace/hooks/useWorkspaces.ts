'use client';

import useSWR, { mutate } from 'swr';
import { useEffect, useState } from 'react';
import {
  getWorkspaces,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from '@/lib/api/workspaceApi';
import type { Workspace } from '@/types/workspace';
import { workspaceCache } from '../api/workspaceCache';

// SWR keys
const WORKSPACES_KEY = '/workspaces';
const workspaceKey = (id: number) => `/workspaces/${id}`;

/**
 * Hook to fetch and manage the list of workspaces with localStorage caching
 */
export function useWorkspaces() {
  // Track if we've done the initial cache check
  const [hasMounted, setHasMounted] = useState(false);

  // Initialize cached data on client-side only to avoid hydration mismatch
  const [initialData] = useState<Workspace[] | null>(() => {
    if (typeof window === 'undefined') return null;
    return workspaceCache.get();
  });

  // Mark as mounted after first render
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { data, error, isLoading, isValidating } = useSWR<Workspace[]>(
    WORKSPACES_KEY,
    getWorkspaces,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      fallbackData: initialData || undefined,
      keepPreviousData: true,
    }
  );

  // Update localStorage cache whenever fresh data arrives
  useEffect(() => {
    if (data) {
      workspaceCache.set(data);
    }
  }, [data]);

  // Always prioritize showing any available data
  const workspaces = data || initialData;

  return {
    workspaces,
    // Don't show loading until we've mounted and checked cache
    isLoading: hasMounted && isLoading && !workspaces,
    isValidating,
    error,
  };
}

/**
 * Hook to manage workspace mutations (create, update, delete) with optimistic updates
 */
export function useWorkspaceMutations() {
  const create = async (title: string) => {
    const workspace = await createWorkspace(title);

    // Optimistically add to cache
    if (workspace) {
      workspaceCache.addWorkspace(workspace);
    }

    mutate(WORKSPACES_KEY); // Revalidate list
    return workspace;
  };

  const update = async (
    id: number,
    updates: Partial<Pick<Workspace, 'title' | 'type' | 'icon_url'>>
  ) => {
    // Optimistically update cache
    workspaceCache.updateWorkspace(id, updates);

    const workspace = await updateWorkspace(id, updates);
    mutate(workspaceKey(id)); // Revalidate specific workspace
    mutate(WORKSPACES_KEY); // Revalidate list
    return workspace;
  };

  const remove = async (id: number) => {
    // Optimistically remove from cache
    workspaceCache.removeWorkspace(id);

    await deleteWorkspace(id);
    mutate(WORKSPACES_KEY); // Revalidate list
  };

  return { create, update, remove };
}

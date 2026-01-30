'use client';

import useSWR, { mutate } from 'swr';
import { useEffect, useState } from 'react';
import {
  getWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  getWorkspaceMembers,
} from '@/lib/api/workspaceApi';
import type { Workspace, WorkspaceMember } from '@/types/workspace';
import { workspaceCache } from '@/lib/cache/workspaceCache';

// SWR keys
const WORKSPACES_KEY = '/workspaces';
const workspaceKey = (id: number) => `/workspaces/${id}`;

// Hooks
export function useWorkspaces() {
  // Initialize cached data on client-side only to avoid hydration mismatch
  const [initialData] = useState<Workspace[] | null>(() => {
    if (typeof window === 'undefined') return null;
    return workspaceCache.get();
  });

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
    isLoading: isLoading && !workspaces, // Only loading if no data at all
    isValidating,
    error,
  };
}

export function useWorkspace(id: number | null) {
  const { data, error, isLoading } = useSWR<Workspace>(
    id ? workspaceKey(id) : null,
    () => getWorkspace(id!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    workspace: data,
    isLoading,
    error,
  };
}

export function useWorkspaceMembers(workspaceId: number | null) {
  const { data, error, isLoading } = useSWR<WorkspaceMember[]>(
    workspaceId ? `/workspaces/${workspaceId}/members` : null,
    workspaceId ? async () => await getWorkspaceMembers(workspaceId) : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    members: data || [],
    isLoading,
    error,
  };
}

// Mutation helpers with optimistic updates
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

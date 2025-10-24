'use client';

import useSWR, { mutate } from 'swr';
import {
  getWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from '@/lib/api/workspaceApi';
import type { Workspace } from '@/types/workspace';

// SWR keys
const WORKSPACES_KEY = '/workspaces';
const workspaceKey = (id: number) => `/workspaces/${id}`;

// Hooks
export function useWorkspaces() {
  const { data, error, isLoading } = useSWR<Workspace[]>(
    WORKSPACES_KEY,
    getWorkspaces,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    workspaces: data,
    isLoading,
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

// Mutation helpers
export function useWorkspaceMutations() {
  const create = async (title: string) => {
    const workspace = await createWorkspace(title);
    mutate(WORKSPACES_KEY); // Revalidate list
    return workspace;
  };

  const update = async (
    id: number,
    updates: Partial<Pick<Workspace, 'title' | 'type'>>
  ) => {
    const workspace = await updateWorkspace(id, updates);
    mutate(workspaceKey(id)); // Revalidate specific workspace
    mutate(WORKSPACES_KEY); // Revalidate list
    return workspace;
  };

  const remove = async (id: number) => {
    await deleteWorkspace(id);
    mutate(WORKSPACES_KEY); // Revalidate list
  };

  return { create, update, remove };
}

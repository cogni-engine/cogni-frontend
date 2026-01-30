'use client';

import useSWR, { mutate } from 'swr';
import {
  getWorkspace,
  updateWorkspace,
  getWorkspaceMembers,
} from '@/lib/api/workspaceApi';
import type { Workspace, WorkspaceMember } from '@/types/workspace';

// SWR keys
const workspaceKey = (id: number) => `/workspaces/${id}`;
const WORKSPACES_KEY = '/workspaces';

// Hooks

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

/**
 * Mutation helpers for workspace updates
 * Note: For workspace list mutations (create, delete), use useWorkspaceMutations
 * from @/features/workspace/hooks/useWorkspaces
 */
export function useWorkspaceMutations() {
  const update = async (
    id: number,
    updates: Partial<Pick<Workspace, 'title' | 'type' | 'icon_url'>>
  ) => {
    const workspace = await updateWorkspace(id, updates);
    mutate(workspaceKey(id)); // Revalidate specific workspace
    mutate(WORKSPACES_KEY); // Revalidate list
    return workspace;
  };

  return { update };
}

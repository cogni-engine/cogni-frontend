'use client';

import useSWR from 'swr';
import { getAllWorkspaceMembersForUser } from '@/lib/api/workspaceApi';
import { useNotes } from '@/features/notes/hooks/useNotes';
import { getPersonalWorkspaceId } from '@cogni/utils';
import type { WorkspaceMember } from '@/types/workspace';

/**
 * Hook to fetch all workspace members and notes for AI chat mentions
 * Returns members from all workspaces the user belongs to and all accessible notes
 */
export function useAIChatMentions() {
  const personalWorkspaceId = getPersonalWorkspaceId();

  // Fetch members with SWR for caching
  const {
    data: members = [],
    error: membersError,
    isLoading: membersLoading,
  } = useSWR<WorkspaceMember[]>(
    '/api/workspace-members/all',
    getAllWorkspaceMembersForUser,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Fetch notes using local SWR-based hook (shares cache with NotesProvider)
  const { notes, loading: notesLoading } = useNotes({
    workspaceId: personalWorkspaceId || 0,
    includeDeleted: true,
    includeAssignedNotes: true,
  });

  return {
    members,
    notes,
    isLoading: membersLoading || notesLoading,
    error: membersError?.message ?? null,
  };
}

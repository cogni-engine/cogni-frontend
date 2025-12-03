'use client';

import { useState, useEffect } from 'react';
import { getAllWorkspaceMembersForUser } from '@/lib/api/workspaceApi';
import { useNotes } from '@cogni/api';
import { getPersonalWorkspaceId } from '@cogni/utils';
import type { WorkspaceMember } from '@/types/workspace';

/**
 * Hook to fetch all workspace members and notes for AI chat mentions
 * Returns members from all workspaces the user belongs to and all accessible notes
 */
export function useAIChatMentions() {
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [membersLoading, setMembersLoading] = useState(true);
  const [membersError, setMembersError] = useState<string | null>(null);

  const personalWorkspaceId = getPersonalWorkspaceId();

  // Fetch notes using existing hook (personal + assigned notes)
  const { notes, loading: notesLoading } = useNotes({
    workspaceId: personalWorkspaceId || 0,
    includeDeleted: true,
    includeAssignedNotes: true,
  });

  // Fetch all workspace members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setMembersLoading(true);
        setMembersError(null);
        const data = await getAllWorkspaceMembersForUser();
        setMembers(data);
      } catch (err) {
        setMembersError(
          err instanceof Error ? err.message : 'Failed to fetch members'
        );
        console.error('Error fetching workspace members:', err);
      } finally {
        setMembersLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return {
    members,
    notes,
    isLoading: membersLoading || notesLoading,
    error: membersError,
  };
}

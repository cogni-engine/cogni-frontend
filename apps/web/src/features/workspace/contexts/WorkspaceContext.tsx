'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { useNotes } from '@/features/notes/hooks/useNotes';
import type { WorkspaceMember } from '@/types/workspace';
import type { NoteWithParsed } from '@/types/note';

interface WorkspaceContextType {
  // Workspace members
  members: WorkspaceMember[];
  membersLoading: boolean;
  membersError: Error | null;

  // Workspace notes
  notes: NoteWithParsed[];
  notesLoading: boolean;
  notesError: string | null;
  refetchNotes: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

interface WorkspaceProviderProps {
  children: ReactNode;
  workspaceId: number;
  /**
   * Whether to include deleted notes in the notes list
   * @default false
   */
  includeDeletedNotes?: boolean;
  /**
   * Whether to auto-fetch notes on mount
   * @default true
   */
  autoFetchNotes?: boolean;
}

export function WorkspaceProvider({
  children,
  workspaceId,
  includeDeletedNotes = false,
  autoFetchNotes = true,
}: WorkspaceProviderProps) {
  // Fetch workspace members
  const {
    members,
    isLoading: membersLoading,
    error: membersError,
  } = useWorkspaceMembers(workspaceId);

  // Fetch workspace notes
  const {
    notes,
    loading: notesLoading,
    error: notesError,
    refetch: refetchNotes,
  } = useNotes({
    workspaceId,
    includeDeleted: includeDeletedNotes,
    includeAssignedNotes: false,
    autoFetch: autoFetchNotes,
  });

  const value: WorkspaceContextType = {
    members,
    membersLoading,
    membersError: membersError || null,
    notes,
    notesLoading,
    notesError,
    refetchNotes,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

/**
 * Hook to access workspace context
 * Must be used within a WorkspaceProvider
 */
export function useWorkspaceContext(): WorkspaceContextType {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error(
      'useWorkspaceContext must be used within a WorkspaceProvider'
    );
  }
  return context;
}

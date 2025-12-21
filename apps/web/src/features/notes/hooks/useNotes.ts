'use client';

import { useCallback } from 'react';
import useSWR from 'swr';
import type { Note, NoteWithParsed } from '@/types/note';
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  softDeleteNote,
  restoreNote,
  duplicateNote,
  emptyTrash,
  searchNotes,
  getUserAssignedNotes,
} from '@/lib/api/notesApi';
import { parseNote } from '../lib/noteHelpers';

// SWR Keys
const notesKey = (workspaceId: number, includeDeleted: boolean) =>
  `/workspaces/${workspaceId}/notes?includeDeleted=${includeDeleted}`;

const assignedNotesKey = () => '/notes/assigned';

const combinedNotesKey = (
  workspaceId: number | undefined,
  includeDeleted: boolean,
  includeAssignedNotes: boolean
) => {
  if (workspaceId && includeAssignedNotes) {
    return `/notes/combined?workspace=${workspaceId}&deleted=${includeDeleted}&assigned=true`;
  }
  if (workspaceId) {
    return notesKey(workspaceId, includeDeleted);
  }
  if (includeAssignedNotes) {
    return assignedNotesKey();
  }
  return null;
};

interface UseNotesOptions {
  workspaceId?: number;
  includeDeleted?: boolean;
  includeAssignedNotes?: boolean;
  autoFetch?: boolean;
}

interface UseNotesReturn {
  notes: NoteWithParsed[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  searchNotes: (query: string) => Promise<void>;
  createNote: (
    title: string,
    content: string,
    folderId?: number | null
  ) => Promise<NoteWithParsed>;
  updateNote: (
    id: number,
    title: string,
    content: string
  ) => Promise<NoteWithParsed>;
  deleteNote: (id: number) => Promise<void>;
  softDeleteNote: (id: number) => Promise<NoteWithParsed>;
  restoreNote: (id: number) => Promise<NoteWithParsed>;
  duplicateNote: (id: number) => Promise<NoteWithParsed>;
  emptyTrash: () => Promise<void>;
}

// Fetcher function for SWR
async function fetchNotes(
  workspaceId: number | undefined,
  includeDeleted: boolean,
  includeAssignedNotes: boolean
): Promise<NoteWithParsed[]> {
  let allNotes: Note[] = [];

  // Fetch workspace notes
  if (workspaceId) {
    const workspaceNotes = await getNotes(workspaceId, includeDeleted);
    allNotes = [...workspaceNotes];
  }

  // Fetch assigned notes from other workspaces
  if (includeAssignedNotes) {
    const assignedNotes = await getUserAssignedNotes();

    // Merge and deduplicate by note ID
    const notesMap = new Map<number, Note>();
    [...allNotes, ...assignedNotes].forEach(note => {
      notesMap.set(note.id, note);
    });
    allNotes = Array.from(notesMap.values());
  }

  return allNotes.map(parseNote);
}

/**
 * Unified hook for managing notes with SWR
 * Can be used for personal notes, workspace notes, or both
 */
export function useNotes(options: UseNotesOptions = {}): UseNotesReturn {
  const {
    workspaceId,
    includeDeleted = true,
    includeAssignedNotes = false,
    autoFetch = true,
  } = options;

  // Generate the SWR key
  const swrKey =
    autoFetch && (workspaceId || includeAssignedNotes)
      ? combinedNotesKey(workspaceId, includeDeleted, includeAssignedNotes)
      : null;

  // Use SWR for data fetching
  const {
    data: notes = [],
    error: swrError,
    isLoading,
    mutate: mutateNotes,
  } = useSWR<NoteWithParsed[]>(
    swrKey,
    () => fetchNotes(workspaceId, includeDeleted, includeAssignedNotes),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const refetch = useCallback(async () => {
    await mutateNotes();
  }, [mutateNotes]);

  const searchNotesQuery = useCallback(
    async (query: string) => {
      if (!workspaceId) {
        throw new Error('workspaceId is required for search');
      }

      const data = await searchNotes(workspaceId, query);
      const parsedNotes = data.map(parseNote);
      // Update the cache with search results
      mutateNotes(parsedNotes, false);
    },
    [workspaceId, mutateNotes]
  );

  const createNewNote = useCallback(
    async (title: string, content: string, folderId?: number | null) => {
      if (!workspaceId) {
        throw new Error('workspaceId is required to create a note');
      }

      const newNote = await createNote(workspaceId, title, content, folderId);
      const parsedNote = parseNote(newNote);

      // Optimistically update the cache
      mutateNotes(
        current => (current ? [parsedNote, ...current] : [parsedNote]),
        false
      );

      return parsedNote;
    },
    [workspaceId, mutateNotes]
  );

  const updateExistingNote = useCallback(
    async (id: number, title: string, content: string) => {
      const updatedNote = await updateNote(id, title, content);
      const parsedNote = parseNote(updatedNote);

      // Optimistically update the cache
      mutateNotes(
        current =>
          current?.map(note => (note.id === id ? parsedNote : note)) ?? [],
        false
      );

      return parsedNote;
    },
    [mutateNotes]
  );

  const deleteExistingNote = useCallback(
    async (id: number) => {
      await deleteNote(id);

      // Optimistically update the cache
      mutateNotes(
        current => current?.filter(note => note.id !== id) ?? [],
        false
      );
    },
    [mutateNotes]
  );

  const softDeleteExistingNote = useCallback(
    async (id: number) => {
      const deletedNote = await softDeleteNote(id);
      const parsedNote = parseNote(deletedNote);

      // Optimistically update the cache
      mutateNotes(
        current =>
          current?.map(note => (note.id === id ? parsedNote : note)) ?? [],
        false
      );

      return parsedNote;
    },
    [mutateNotes]
  );

  const restoreExistingNote = useCallback(
    async (id: number) => {
      const restoredNote = await restoreNote(id);
      const parsedNote = parseNote(restoredNote);

      // Optimistically update the cache
      mutateNotes(
        current =>
          current?.map(note => (note.id === id ? parsedNote : note)) ?? [],
        false
      );

      return parsedNote;
    },
    [mutateNotes]
  );

  const duplicateExistingNote = useCallback(
    async (id: number) => {
      const newNote = await duplicateNote(id);
      const parsedNote = parseNote(newNote);

      // Optimistically update the cache
      mutateNotes(
        current => (current ? [parsedNote, ...current] : [parsedNote]),
        false
      );

      return parsedNote;
    },
    [mutateNotes]
  );

  const emptyWorkspaceTrash = useCallback(async () => {
    if (!workspaceId) {
      throw new Error('workspaceId is required to empty trash');
    }

    await emptyTrash(workspaceId);

    // Optimistically update the cache - remove all deleted notes
    mutateNotes(
      current => current?.filter(note => !note.deleted_at) ?? [],
      false
    );
  }, [workspaceId, mutateNotes]);

  return {
    notes,
    loading: isLoading,
    error: swrError?.message ?? null,
    refetch,
    searchNotes: searchNotesQuery,
    createNote: createNewNote,
    updateNote: updateExistingNote,
    deleteNote: deleteExistingNote,
    softDeleteNote: softDeleteExistingNote,
    restoreNote: restoreExistingNote,
    duplicateNote: duplicateExistingNote,
    emptyTrash: emptyWorkspaceTrash,
  };
}

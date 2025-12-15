'use client';

import { useState, useEffect, useCallback } from 'react';
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

/**
 * Unified hook for managing notes
 * Can be used for personal notes, workspace notes, or both
 */
export function useNotes(options: UseNotesOptions = {}): UseNotesReturn {
  const {
    workspaceId,
    includeDeleted = true,
    includeAssignedNotes = false,
    autoFetch = true,
  } = options;

  const [notes, setNotes] = useState<NoteWithParsed[]>([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    if (!workspaceId && !includeAssignedNotes) {
      setError('Either workspaceId or includeAssignedNotes must be specified');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

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

      const parsedNotes = allNotes.map(parseNote);
      setNotes(parsedNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  }, [workspaceId, includeDeleted, includeAssignedNotes]);

  const searchNotesQuery = useCallback(
    async (query: string) => {
      if (!workspaceId) {
        setError('workspaceId is required for search');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await searchNotes(workspaceId, query);
        const parsedNotes = data.map(parseNote);
        setNotes(parsedNotes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to search notes');
        console.error('Error searching notes:', err);
      } finally {
        setLoading(false);
      }
    },
    [workspaceId]
  );

  const createNewNote = useCallback(
    async (title: string, content: string, folderId?: number | null) => {
      if (!workspaceId) {
        throw new Error('workspaceId is required to create a note');
      }

      try {
        setError(null);
        const newNote = await createNote(workspaceId, title, content, folderId);
        const parsedNote = parseNote(newNote);
        setNotes(prev => [parsedNote, ...prev]);
        return parsedNote;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create note');
        console.error('Error creating note:', err);
        throw err;
      }
    },
    [workspaceId]
  );

  const updateExistingNote = useCallback(
    async (id: number, title: string, content: string) => {
      try {
        setError(null);
        const updatedNote = await updateNote(id, title, content);
        const parsedNote = parseNote(updatedNote);
        setNotes(prev =>
          prev.map(note => (note.id === id ? parsedNote : note))
        );
        return parsedNote;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update note');
        console.error('Error updating note:', err);
        throw err;
      }
    },
    []
  );

  const deleteExistingNote = useCallback(async (id: number) => {
    try {
      setError(null);
      await deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note');
      console.error('Error deleting note:', err);
      throw err;
    }
  }, []);

  const softDeleteExistingNote = useCallback(async (id: number) => {
    try {
      setError(null);
      const deletedNote = await softDeleteNote(id);
      const parsedNote = parseNote(deletedNote);
      setNotes(prev => prev.map(note => (note.id === id ? parsedNote : note)));
      return parsedNote;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note');
      console.error('Error soft deleting note:', err);
      throw err;
    }
  }, []);

  const restoreExistingNote = useCallback(async (id: number) => {
    try {
      setError(null);
      const restoredNote = await restoreNote(id);
      const parsedNote = parseNote(restoredNote);
      setNotes(prev => prev.map(note => (note.id === id ? parsedNote : note)));
      return parsedNote;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to restore note');
      console.error('Error restoring note:', err);
      throw err;
    }
  }, []);

  const duplicateExistingNote = useCallback(async (id: number) => {
    try {
      setError(null);
      const newNote = await duplicateNote(id);
      const parsedNote = parseNote(newNote);
      setNotes(prev => [parsedNote, ...prev]);
      return parsedNote;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to duplicate note');
      console.error('Error duplicating note:', err);
      throw err;
    }
  }, []);

  const emptyWorkspaceTrash = useCallback(async () => {
    if (!workspaceId) {
      throw new Error('workspaceId is required to empty trash');
    }

    try {
      setError(null);
      await emptyTrash(workspaceId);
      setNotes(prev => prev.filter(note => !note.deleted_at));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to empty trash');
      console.error('Error emptying trash:', err);
      throw err;
    }
  }, [workspaceId]);

  useEffect(() => {
    if (autoFetch) {
      fetchNotes();
    }
  }, [fetchNotes, autoFetch]);

  return {
    notes,
    loading,
    error,
    refetch: fetchNotes,
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

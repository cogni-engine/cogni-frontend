'use client';

import { useState, useEffect, useCallback } from 'react';
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
  parseNoteText,
} from '@/lib/api/notesApi';
import { getWorkspace } from '@/lib/api/workspaceApi';
import type { Note, NoteWithParsed } from '@/types/note';
import type { Workspace } from '@/types/workspace';

/**
 * Parse note into format with title, content, and preview
 */
function parseNote(note: Note): NoteWithParsed {
  const { title, content } = parseNoteText(note.text);
  const preview = content.slice(0, 100) + (content.length > 100 ? '...' : '');

  return {
    ...note,
    title,
    content,
    preview,
  };
}

/**
 * Format date for display
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '/');
}

export function useWorkspaceNotes(workspaceId: number, enabled: boolean = true) {
  const [notes, setNotes] = useState<NoteWithParsed[]>([]);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch workspace info and notes in parallel
      const [workspaceData, notesData] = await Promise.all([
        getWorkspace(workspaceId),
        getNotes(workspaceId),
      ]);

      setWorkspace(workspaceData);
      const parsedNotes = notesData.map(parseNote);
      setNotes(parsedNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  const searchNotesQuery = useCallback(
    async (query: string) => {
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
    if (workspaceId && enabled) {
      fetchNotes();
    } else if (!enabled) {
      setLoading(false);
    }
  }, [fetchNotes, workspaceId, enabled]);

  return {
    notes,
    workspace,
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

export { formatDate };

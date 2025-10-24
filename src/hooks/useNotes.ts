'use client';

import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  searchNotes,
  parseNoteText,
} from '@/lib/api/notesApi';
import type { Note, NoteWithParsed } from '@/types/note';
import { getPersonalWorkspaceId } from '@/lib/cookies';

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

export function useNotes() {
  const [notes, setNotes] = useState<NoteWithParsed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const workspaceId = getPersonalWorkspaceId();
      if (!workspaceId) {
        throw new Error('No personal workspace found');
      }

      const data = await getNotes(workspaceId);
      const parsedNotes = data.map(parseNote);
      setNotes(parsedNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchNotesQuery = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);

      const workspaceId = getPersonalWorkspaceId();
      if (!workspaceId) {
        throw new Error('No personal workspace found');
      }

      const data = await searchNotes(workspaceId, query);
      const parsedNotes = data.map(parseNote);
      setNotes(parsedNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search notes');
      console.error('Error searching notes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewNote = useCallback(async (title: string, content: string) => {
    try {
      setError(null);

      const workspaceId = getPersonalWorkspaceId();
      if (!workspaceId) {
        throw new Error('No personal workspace found');
      }

      const newNote = await createNote(workspaceId, title, content);
      const parsedNote = parseNote(newNote);
      setNotes(prev => [parsedNote, ...prev]);
      return parsedNote;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note');
      console.error('Error creating note:', err);
      throw err;
    }
  }, []);

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

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return {
    notes,
    loading,
    error,
    refetch: fetchNotes,
    searchNotes: searchNotesQuery,
    createNote: createNewNote,
    updateNote: updateExistingNote,
    deleteNote: deleteExistingNote,
  };
}

/**
 * Hook for fetching an existing note by ID using SWR
 */
export function useNote(id: number) {
  const { data, error, isLoading } = useSWR<Note | null>(
    `/notes/${id}`,
    () => getNote(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    note: data ? parseNote(data) : null,
    loading: isLoading,
    error,
  };
}

/**
 * Hook for creating a new note
 */
export function useNewNote() {
  const [note, setNote] = useState<NoteWithParsed | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const workspaceId = getPersonalWorkspaceId();
    if (!workspaceId) {
      setLoading(false);
      return;
    }

    setNote({
      id: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      text: '',
      workspace_id: workspaceId,
      title: '',
      content: '',
      preview: '',
    });
    setLoading(false);
  }, []);

  return { note, loading, error: null };
}

/**
 * Hook for note mutations (create, update, delete)
 */
export function useNoteMutations() {
  const create = useCallback(async (title: string, content: string) => {
    const workspaceId = getPersonalWorkspaceId();
    if (!workspaceId) throw new Error('No personal workspace found');

    const newNote = await createNote(workspaceId, title, content);
    return parseNote(newNote);
  }, []);

  const update = useCallback(
    async (id: number, title: string, content: string) => {
      const updatedNote = await updateNote(id, title, content);
      return parseNote(updatedNote);
    },
    []
  );

  const remove = useCallback(async (id: number) => {
    await deleteNote(id);
  }, []);

  return { create, update, remove };
}

export { formatDate };

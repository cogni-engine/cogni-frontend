'use client';

import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { getNote, updateNote, parseNoteText } from '@/lib/api/notesApi';
import type { NoteWithParsed } from '@/types/note';

const AUTOSAVE_DELAY = 700;

/**
 * Hook for editing a single note with automatic saving
 */
export function useNoteEditor(noteId: number | null) {
  // Fetch note data using SWR
  const {
    data: note,
    error,
    isLoading,
    mutate: mutateNote,
  } = useSWR<NoteWithParsed | null>(
    noteId ? `/notes/${noteId}` : null,
    async () => {
      if (!noteId) return null;
      const data = await getNote(noteId);
      return data
        ? { ...data, ...parseNoteText(data.text), preview: '' }
        : null;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  // Local state for editing
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize local state when note data loads
  useEffect(() => {
    if (note && !hasInitialized) {
      setTitle(note.title);

      setContent(note.content);
      setHasInitialized(true);
    }
  }, [note, hasInitialized]);

  // Debounced autosave
  useEffect(() => {
    if (!noteId || isLoading || !hasInitialized) return;

    const timeout = setTimeout(async () => {
      try {
        setSaving(true);

        // Perform actual update (just like the original implementation)
        const saved = await updateNote(noteId, title, content);
        const parsedSaved = {
          ...saved,
          ...parseNoteText(saved.text),
          preview: '',
        };

        // Silently update the current note cache without revalidation
        await mutateNote(parsedSaved, false);
      } catch (err) {
        console.error('Autosave failed:', err);
      } finally {
        setSaving(false);
      }
    }, AUTOSAVE_DELAY);

    return () => clearTimeout(timeout);
  }, [title, content, noteId, isLoading, hasInitialized, mutateNote]);

  // Manual save function (if needed)
  const save = useCallback(async () => {
    if (!noteId || !hasInitialized) return;

    try {
      setSaving(true);
      const saved = await updateNote(noteId, title, content);
      const parsedSaved = {
        ...saved,
        ...parseNoteText(saved.text),
        preview: '',
      };
      // Update the current note cache without revalidation
      await mutateNote(parsedSaved, false);
    } catch (err) {
      console.error('Save failed:', err);
      throw err;
    } finally {
      setSaving(false);
    }
  }, [noteId, title, content, hasInitialized, mutateNote]);

  return {
    note,
    title,
    content,
    saving,
    loading: isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : 'Failed to load note'
      : null,
    setTitle,
    setContent,
    save,
    refetch: () => mutateNote(),
  };
}

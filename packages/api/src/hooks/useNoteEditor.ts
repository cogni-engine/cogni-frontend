import { useState, useEffect, useCallback } from 'react';
import type { NoteWithParsed } from '@cogni/types';
import { getNote, updateNote } from '../notes';
import { parseNote } from '../utils/noteHelpers';

const AUTOSAVE_DELAY = 700;

interface UseNoteEditorOptions {
  noteId: number | null;
  autoSave?: boolean;
  autoSaveDelay?: number;
}

interface UseNoteEditorReturn {
  note: NoteWithParsed | null;
  title: string;
  content: string;
  saving: boolean;
  loading: boolean;
  error: string | null;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  save: () => Promise<void>;
  refetch: () => Promise<void>;
}

/**
 * Hook for editing a single note with automatic saving
 */
export function useNoteEditor(options: UseNoteEditorOptions): UseNoteEditorReturn {
  const { noteId, autoSave = true, autoSaveDelay = AUTOSAVE_DELAY } = options;

  const [note, setNote] = useState<NoteWithParsed | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const fetchNote = useCallback(async () => {
    if (!noteId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getNote(noteId);
      if (data) {
        const parsedNote = parseNote(data);
        setNote(parsedNote);
        if (!hasInitialized) {
          setTitle(parsedNote.title);
          setContent(parsedNote.content);
          setHasInitialized(true);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load note');
      console.error('Error fetching note:', err);
    } finally {
      setLoading(false);
    }
  }, [noteId, hasInitialized]);

  const save = useCallback(async () => {
    if (!noteId || !hasInitialized) return;

    try {
      setSaving(true);
      const saved = await updateNote(noteId, title, content);
      const parsedSaved = parseNote(saved);
      setNote(parsedSaved);
    } catch (err) {
      console.error('Save failed:', err);
      throw err;
    } finally {
      setSaving(false);
    }
  }, [noteId, title, content, hasInitialized]);

  // Auto-save effect
  useEffect(() => {
    if (!autoSave || !noteId || loading || !hasInitialized) return;

    const timeout = setTimeout(async () => {
      try {
        setSaving(true);
        const saved = await updateNote(noteId, title, content);
        const parsedSaved = parseNote(saved);
        setNote(parsedSaved);
      } catch (err) {
        console.error('Autosave failed:', err);
      } finally {
        setSaving(false);
      }
    }, autoSaveDelay);

    return () => clearTimeout(timeout);
  }, [title, content, noteId, loading, hasInitialized, autoSave, autoSaveDelay]);

  // Initial fetch
  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  return {
    note,
    title,
    content,
    saving,
    loading,
    error,
    setTitle,
    setContent,
    save,
    refetch: fetchNote,
  };
}


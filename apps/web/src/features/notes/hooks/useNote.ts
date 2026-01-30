'use client';

import useSWR from 'swr';
import type { Note } from '@/types/note';
import { getNote } from '@/features/notes/api/notesApi';

// SWR key for individual note
export const noteKey = (noteId: number) => `/notes/${noteId}`;

interface UseNoteOptions {
  noteId: number | null;
  initialData?: Note | null;
}

interface UseNoteReturn {
  note: Note | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching a single note with SWR caching
 * Will use cached data from useNotes if available
 */
export function useNote({
  noteId,
  initialData,
}: UseNoteOptions): UseNoteReturn {
  const {
    data: note = null,
    error: swrError,
    isLoading,
    mutate,
  } = useSWR<Note | null>(
    noteId ? noteKey(noteId) : null,
    () => (noteId ? getNote(noteId) : null),
    {
      fallbackData: initialData, // Use initial data if provided
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 2000, // Don't refetch within 2 seconds
    }
  );

  return {
    note,
    loading: isLoading,
    error: swrError?.message ?? null,
    refetch: async () => {
      await mutate();
    },
  };
}

'use client';

import { useCallback } from 'react';
import useSWR from 'swr';
import type { NoteFolder } from '@/types/note';
import {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
  moveNoteToFolder,
} from '@/features/notes/api/foldersApi';

interface UseNoteFoldersOptions {
  workspaceId: number;
  autoFetch?: boolean;
}

interface UseNoteFoldersReturn {
  folders: NoteFolder[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createFolder: (title: string) => Promise<NoteFolder>;
  updateFolder: (id: number, title: string) => Promise<NoteFolder>;
  deleteFolder: (id: number) => Promise<void>;
  moveNote: (noteId: number, folderId: number | null) => Promise<void>;
}

/**
 * Hook for managing note folders using SWR for caching
 */
export function useNoteFolders(
  options: UseNoteFoldersOptions
): UseNoteFoldersReturn {
  const { workspaceId, autoFetch = true } = options;

  // Use SWR for data fetching with caching
  const {
    data: folders = [],
    error: swrError,
    isLoading,
    mutate,
  } = useSWR<NoteFolder[]>(
    autoFetch && workspaceId ? `/workspaces/${workspaceId}/folders` : null,
    () => getFolders(workspaceId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 2000, // Don't refetch within 2 seconds
    }
  );

  const fetchFolders = useCallback(async () => {
    await mutate();
  }, [mutate]);

  const createNewFolder = useCallback(
    async (title: string) => {
      try {
        const newFolder = await createFolder(workspaceId, title);
        // Optimistically update the cache
        mutate(
          current => (current ? [newFolder, ...current] : [newFolder]),
          false
        );
        return newFolder;
      } catch (err) {
        console.error('Error creating folder:', err);
        throw err;
      }
    },
    [workspaceId, mutate]
  );

  const updateExistingFolder = useCallback(
    async (id: number, title: string) => {
      try {
        const updatedFolder = await updateFolder(id, title);
        // Optimistically update the cache
        mutate(
          current =>
            current?.map(folder =>
              folder.id === id ? updatedFolder : folder
            ) ?? [],
          false
        );
        return updatedFolder;
      } catch (err) {
        console.error('Error updating folder:', err);
        throw err;
      }
    },
    [mutate]
  );

  const deleteExistingFolder = useCallback(
    async (id: number) => {
      try {
        await deleteFolder(id);
        // Optimistically update the cache
        mutate(
          current => current?.filter(folder => folder.id !== id) ?? [],
          false
        );
      } catch (err) {
        console.error('Error deleting folder:', err);
        throw err;
      }
    },
    [mutate]
  );

  const moveNote = useCallback(
    async (noteId: number, folderId: number | null) => {
      try {
        await moveNoteToFolder(noteId, folderId);
      } catch (err) {
        console.error('Error moving note:', err);
        // エラーの詳細をログに出力
        if (err && typeof err === 'object') {
          console.error('Error details:', JSON.stringify(err, null, 2));
        }
        throw err;
      }
    },
    []
  );

  return {
    folders,
    loading: isLoading,
    error: swrError?.message ?? null,
    refetch: fetchFolders,
    createFolder: createNewFolder,
    updateFolder: updateExistingFolder,
    deleteFolder: deleteExistingFolder,
    moveNote,
  };
}

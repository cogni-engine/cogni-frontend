'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
  getFolderNoteCounts,
  moveNoteToFolder,
} from '@cogni/api';
import type { NoteFolder } from '@/types/note';

export function useNoteFolders(workspaceId: number) {
  const [folders, setFolders] = useState<NoteFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFolders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [foldersData, noteCounts] = await Promise.all([
        getFolders(workspaceId),
        getFolderNoteCounts(workspaceId),
      ]);

      // Add note counts to folders
      const foldersWithCounts = foldersData.map(folder => ({
        ...folder,
        note_count: noteCounts[folder.id] || 0,
      }));

      setFolders(foldersWithCounts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch folders');
      console.error('Error fetching folders:', err);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  const createNewFolder = useCallback(
    async (title: string) => {
      try {
        setError(null);

        const newFolder = await createFolder(workspaceId, title);
        setFolders(prev => [{ ...newFolder, note_count: 0 }, ...prev]);
        return newFolder;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to create folder'
        );
        console.error('Error creating folder:', err);
        throw err;
      }
    },
    [workspaceId]
  );

  const updateExistingFolder = useCallback(
    async (id: number, title: string) => {
      try {
        setError(null);

        const updatedFolder = await updateFolder(id, title);
        setFolders(prev =>
          prev.map(folder =>
            folder.id === id
              ? { ...updatedFolder, note_count: folder.note_count }
              : folder
          )
        );
        return updatedFolder;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to update folder'
        );
        console.error('Error updating folder:', err);
        throw err;
      }
    },
    []
  );

  const deleteExistingFolder = useCallback(async (id: number) => {
    try {
      setError(null);

      await deleteFolder(id);
      setFolders(prev => prev.filter(folder => folder.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete folder');
      console.error('Error deleting folder:', err);
      throw err;
    }
  }, []);

  const moveNote = useCallback(
    async (noteId: number, folderId: number | null) => {
      try {
        setError(null);
        await moveNoteToFolder(noteId, folderId);
        // Refetch to update note counts
        await fetchFolders();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to move note');
        console.error('Error moving note:', err);
        throw err;
      }
    },
    [fetchFolders]
  );

  useEffect(() => {
    if (workspaceId) {
      fetchFolders();
    }
  }, [workspaceId, fetchFolders]);

  return {
    folders,
    loading,
    error,
    refetch: fetchFolders,
    createFolder: createNewFolder,
    updateFolder: updateExistingFolder,
    deleteFolder: deleteExistingFolder,
    moveNote,
  };
}

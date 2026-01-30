'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { NotesView } from './NotesView';
import { NotesListSkeleton } from './NotesListSkeleton';
import { EmptyTrashModal } from './EmptyTrashModal';
import { useNotesContext } from '../NotesProvider';
import { useNoteActions } from './NoteActionsLayer';

export function NotesPageContent() {
  const {
    loading,
    foldersLoading,
    error,
    formattedActiveNotes,
    formattedDeletedNotes,
    createNote,
    folders,
    searchQuery,
    emptyTrash,
  } = useNotesContext();

  const { openContextMenu } = useNoteActions();
  const [selectedFolder, setSelectedFolder] = useState<'trash' | number | null>(
    null
  );
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);

  const handleBackFromFolder = useCallback(() => {
    setSelectedFolder(null);
  }, []);

  const handleDeleteAll = useCallback(() => {
    setShowDeleteAllConfirm(true);
  }, []);

  const handleConfirmDeleteAll = useCallback(async () => {
    await emptyTrash();
    setShowDeleteAllConfirm(false);
  }, [emptyTrash]);

  const handleCreateNote = useCallback(() => {
    createNote('Untitled', '');
  }, [createNote]);

  // Listen for trash click event from Header
  useEffect(() => {
    const handleTrashClick = () => {
      setSelectedFolder('trash');
    };
    window.addEventListener('trash-folder-selected', handleTrashClick);
    return () => {
      window.removeEventListener('trash-folder-selected', handleTrashClick);
    };
  }, []);

  // Determine which notes to show based on selected folder (before early returns)
  const notesToShow = useMemo(() => {
    if (selectedFolder === 'trash') {
      return formattedDeletedNotes;
    }
    if (selectedFolder !== null) {
      return formattedActiveNotes.filter(
        note =>
          typeof selectedFolder === 'number' &&
          note.note_folder_id === selectedFolder
      );
    }
    return formattedActiveNotes;
  }, [selectedFolder, formattedActiveNotes, formattedDeletedNotes]);

  // Wait for both notes and folders to load to prevent visible re-organization
  if (loading || foldersLoading) {
    return <NotesListSkeleton />;
  }

  if (error) {
    return (
      <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300'>
        {error}
      </div>
    );
  }

  return (
    <>
      <NotesView
        notes={notesToShow}
        folders={folders}
        searchQuery={searchQuery}
        onContextMenu={openContextMenu}
        onCreateNote={handleCreateNote}
        selectedFolder={selectedFolder}
        onBackFromFolder={handleBackFromFolder}
        onDeleteAll={handleDeleteAll}
      />
      <EmptyTrashModal
        isOpen={showDeleteAllConfirm}
        noteCount={formattedDeletedNotes.length}
        onClose={() => setShowDeleteAllConfirm(false)}
        onConfirm={handleConfirmDeleteAll}
      />
    </>
  );
}

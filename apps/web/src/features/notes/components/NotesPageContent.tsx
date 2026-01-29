'use client';

import { useState, useEffect } from 'react';
import { NotesView } from './NotesView';
import { NotesListSkeleton } from './NotesListSkeleton';
import { EmptyTrashModal } from './EmptyTrashModal';
import { useNotesContext } from '../NotesProvider';
import { useNoteActions } from './NoteActionsLayer';
import { useRouter } from 'next/navigation';

export function NotesPageContent() {
  const {
    loading,
    error,
    formattedActiveNotes,
    formattedDeletedNotes,
    createNote,
    folders,
    searchQuery,
    emptyTrash,
  } = useNotesContext();

  const { openContextMenu } = useNoteActions();
  const router = useRouter();
  const [selectedFolder, setSelectedFolder] = useState<'trash' | number | null>(
    null
  );
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);

  const handleNoteClick = (id: string) => {
    router.push(`/notes/${id}`);
  };

  const handleBackFromFolder = () => {
    setSelectedFolder(null);
  };

  const handleDeleteAll = () => {
    setShowDeleteAllConfirm(true);
  };

  const handleConfirmDeleteAll = async () => {
    await emptyTrash();
    setShowDeleteAllConfirm(false);
  };

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

  if (loading) {
    return <NotesListSkeleton />;
  }

  if (error) {
    return (
      <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300'>
        {error}
      </div>
    );
  }

  // Determine which notes to show based on selected folder
  const notesToShow =
    selectedFolder === 'trash'
      ? formattedDeletedNotes
      : selectedFolder !== null
        ? formattedActiveNotes.filter(
            note =>
              typeof selectedFolder === 'number' &&
              note.note_folder_id === selectedFolder
          )
        : formattedActiveNotes;

  return (
    <>
      <NotesView
        notes={notesToShow}
        folders={folders}
        searchQuery={searchQuery}
        onNoteClick={handleNoteClick}
        onContextMenu={openContextMenu}
        onCreateNote={() => createNote('Untitled', '')}
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

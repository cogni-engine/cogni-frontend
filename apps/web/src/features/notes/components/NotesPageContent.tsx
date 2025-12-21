'use client';

import { TrashView } from './TrashView';
import { NotesView } from './NotesView';
import { NotesListSkeleton } from './NotesListSkeleton';
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
    selectedFolder,
    sortBy,
    searchQuery,
  } = useNotesContext();

  const { openContextMenu, openEmptyTrashConfirm } = useNoteActions();
  const router = useRouter();

  const handleNoteClick = (id: string) => {
    router.push(`/notes/${id}`);
  };

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

  if (selectedFolder === 'trash') {
    return (
      <TrashView
        deletedNotes={formattedDeletedNotes}
        onNoteClick={handleNoteClick}
        onContextMenu={openContextMenu}
        onEmptyTrash={openEmptyTrashConfirm}
      />
    );
  }

  return (
    <NotesView
      notes={formattedActiveNotes}
      folders={folders}
      sortBy={sortBy}
      searchQuery={searchQuery}
      selectedFolder={selectedFolder}
      onNoteClick={handleNoteClick}
      onContextMenu={openContextMenu}
      onCreateNote={() => createNote('Untitled', '')}
    />
  );
}

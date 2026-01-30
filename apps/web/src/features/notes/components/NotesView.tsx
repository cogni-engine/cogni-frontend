'use client';

import { PenSquare } from 'lucide-react';
import GlassButton from '@/components/glass-design/GlassButton';
import NoteList from './NoteList';
import type { NoteFolder } from '@/types/note';
import type { FormattedNote } from '../NotesProvider';

type NotesViewProps = {
  notes: FormattedNote[];
  folders: NoteFolder[];
  searchQuery: string;
  onContextMenu: (e: React.MouseEvent, id: string, isDeleted: boolean) => void;
  onCreateNote: () => void;
  selectedFolder?: 'trash' | number | null;
  onBackFromFolder?: () => void;
  onDeleteAll?: () => void;
};

export function NotesView({
  notes,
  folders,
  searchQuery,
  onContextMenu,
  onCreateNote,
  selectedFolder = null,
  onBackFromFolder,
  onDeleteAll,
}: NotesViewProps) {
  // Check if there are any notes at all (across all folders)
  const hasAnyNotes = notes.length > 0 || folders.length > 0;

  if (!hasAnyNotes && !searchQuery) {
    return (
      <div className='text-center py-12'>
        <PenSquare className='w-12 h-12 text-gray-600 mx-auto mb-3' />
        <h3 className='text-lg font-medium text-white mb-2'>No notes yet</h3>
        <p className='text-gray-400 mb-6'>
          Create your first note to get started
        </p>
        <GlassButton onClick={onCreateNote} className='px-6 py-2.5 rounded-xl'>
          Create Note
        </GlassButton>
      </div>
    );
  }

  if (notes.length === 0 && searchQuery) {
    return (
      <div className='text-center py-12'>
        <PenSquare className='w-12 h-12 text-gray-600 mx-auto mb-3' />
        <h3 className='text-lg font-medium text-white mb-2'>
          No matching notes
        </h3>
        <p className='text-gray-400 mb-6'>
          {`No notes match "${searchQuery}"`}
        </p>
      </div>
    );
  }

  return (
    <NoteList
      notes={notes}
      onContextMenu={onContextMenu}
      groupBy='folder'
      folders={folders}
      selectedFolder={selectedFolder}
      onBackFromFolder={onBackFromFolder}
      onDeleteAll={onDeleteAll}
    />
  );
}

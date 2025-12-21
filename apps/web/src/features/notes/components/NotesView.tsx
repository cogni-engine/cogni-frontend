'use client';

import { PenSquare } from 'lucide-react';
import GlassButton from '@/components/glass-design/GlassButton';
import NoteList from './NoteList';
import type { NoteFolder } from '@/types/note';
import type { FormattedNote } from '../NotesProvider';

type NotesViewProps = {
  notes: FormattedNote[];
  folders: NoteFolder[];
  sortBy: 'time' | 'folder';
  searchQuery: string;
  selectedFolder: 'all' | 'notes' | 'trash' | number;
  onNoteClick: (id: string) => void;
  onContextMenu: (e: React.MouseEvent, id: string, isDeleted: boolean) => void;
  onCreateNote: () => void;
};

export function NotesView({
  notes,
  folders,
  sortBy,
  searchQuery,
  selectedFolder,
  onNoteClick,
  onContextMenu,
  onCreateNote,
}: NotesViewProps) {
  if (notes.length === 0) {
    return (
      <div className='text-center py-12'>
        <PenSquare className='w-12 h-12 text-gray-600 mx-auto mb-3' />
        <h3 className='text-lg font-medium text-white mb-2'>
          {searchQuery ? 'No matching notes' : 'No notes yet'}
        </h3>
        <p className='text-gray-400 mb-6'>
          {searchQuery
            ? `No notes match "${searchQuery}"`
            : 'Create your first note to get started'}
        </p>
        {!searchQuery && selectedFolder !== 'all' && (
          <GlassButton
            onClick={onCreateNote}
            className='px-6 py-2.5 rounded-xl'
          >
            Create Note
          </GlassButton>
        )}
      </div>
    );
  }

  return (
    <NoteList
      notes={notes}
      onNoteClick={onNoteClick}
      onContextMenu={onContextMenu}
      groupBy={sortBy}
      folders={folders}
    />
  );
}

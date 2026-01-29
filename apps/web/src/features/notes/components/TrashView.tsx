'use client';

import { Trash2 } from 'lucide-react';
import NoteList from './NoteList';
import type { FormattedNote } from '../NotesProvider';

type TrashViewProps = {
  deletedNotes: FormattedNote[];
  onNoteClick: (id: string) => void;
  onContextMenu: (e: React.MouseEvent, id: string, isDeleted: boolean) => void;
  onEmptyTrash: () => void;
};

export function TrashView({
  deletedNotes,
  onNoteClick,
  onContextMenu,
  onEmptyTrash,
}: TrashViewProps) {
  if (deletedNotes.length === 0) {
    return (
      <div className='text-center py-12'>
        <Trash2 className='w-12 h-12 text-gray-600 mx-auto mb-3' />
        <h3 className='text-lg font-medium text-white mb-2'>
          No recently deleted notes
        </h3>
        <p className='text-gray-400'>Deleted notes will appear here</p>
      </div>
    );
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-3 px-5'>
        <h3 className='text-sm font-medium text-gray-400'>
          {deletedNotes.length} deleted note
          {deletedNotes.length !== 1 ? 's' : ''}
        </h3>
        <button
          onClick={onEmptyTrash}
          className='text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium'
        >
          Delete All
        </button>
      </div>
      <NoteList
        notes={deletedNotes}
        onNoteClick={onNoteClick}
        onContextMenu={onContextMenu}
      />
    </div>
  );
}

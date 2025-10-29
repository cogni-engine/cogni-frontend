'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useWorkspaceNotes, formatDate } from '@/hooks/useWorkspaceNotes';
import type { NoteWithParsed } from '@/types/note';

export default function WorkspaceNotesPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = parseInt(params.id as string);

  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );

  const {
    notes,
    workspace,
    loading,
    error,
    refetch,
    searchNotes,
    createNote,
    deleteNote,
  } = useWorkspaceNotes(workspaceId);

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      await searchNotes(query);
      setIsSearching(false);
    } else {
      await refetch();
    }
  };

  const handleCreateNote = async () => {
    try {
      const newNote = await createNote('Untitled', '');
      router.push(`/workspace/${workspaceId}/notes/${newNote.id}`);
    } catch (err) {
      console.error('Failed to create note:', err);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      await deleteNote(noteId);
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  const handleNoteClick = (noteId: number) => {
    router.push(`/workspace/${workspaceId}/notes/${noteId}`);
  };

  if (loading && !isSearching) {
    return (
      <div className='flex justify-center items-center py-12'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300'>
        <div className='flex items-center justify-between'>
          <span>{error}</span>
          <button
            onClick={refetch}
            className='text-sm px-3 py-1 bg-red-600/20 hover:bg-red-600/30 rounded-md transition-colors'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col'>
      {/* Header */}
      <div className='flex p-6 border-b border-white/10 gap-3'>
        {/* Search */}
        <div className='w-full'>
          <input
            type='text'
            placeholder='Search notes...'
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className='w-full bg-white/8 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-white/20'
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
          >
            <circle cx='11' cy='11' r='8' />
            <path d='m21 21-4.35-4.35' />
          </svg>
          {isSearching && (
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
            </div>
          )}
        </div>
        <button
          onClick={handleCreateNote}
          className='bg-white/15 hover:bg-white/25 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M12 5v14M5 12h14' />
          </svg>
        </button>
      </div>

      {/* Notes List */}
      <div className='flex-1 overflow-y-auto p-6'>
        {notes.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-gray-400 mb-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mx-auto mb-4'
              >
                <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                <polyline points='14 2 14 8 20 8' />
                <line x1='16' y1='13' x2='8' y2='13' />
                <line x1='16' y1='17' x2='8' y2='17' />
                <polyline points='10 9 9 9 8 9' />
              </svg>
            </div>
            <h3 className='text-lg font-medium text-white mb-2'>
              {searchQuery ? 'No notes found' : 'No notes yet'}
            </h3>
            <p className='text-gray-400 mb-6'>
              {searchQuery
                ? `No notes match "${searchQuery}"`
                : 'Create your first note to get started'}
            </p>
            {!searchQuery && (
              <button
                onClick={handleCreateNote}
                className='bg-white/15 hover:bg-white/25 text-white px-6 py-3 rounded-lg transition-colors'
              >
                Create Note
              </button>
            )}
          </div>
        ) : (
          <div className='grid gap-4'>
            {notes.map((note: NoteWithParsed) => (
              <div
                key={note.id}
                className='group bg-white/8 backdrop-blur-xl hover:bg-white/12 transition-all duration-300 rounded-lg p-4 border border-white/10 hover:border-white/15 cursor-pointer relative'
                onClick={() => handleNoteClick(note.id)}
              >
                <div className='flex justify-between items-start gap-3'>
                  <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-white text-lg leading-tight truncate mb-1'>
                      {note.title || 'Untitled'}
                    </h3>
                    <p className='text-gray-400 text-sm line-clamp-2 mb-2'>
                      {note.preview || 'No content'}
                    </p>
                    <div className='text-xs text-gray-500'>
                      Updated {formatDate(note.updated_at)}
                    </div>
                  </div>
                  <div className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setShowDeleteConfirm(note.id);
                      }}
                      className='p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <polyline points='3 6 5 6 21 6' />
                        <path d='m19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c0 1 1 2 2h4v2' />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-gray-900 rounded-lg p-6 max-w-sm w-full border border-white/10'>
            <h3 className='text-lg font-semibold text-white mb-2'>
              Delete Note
            </h3>
            <p className='text-gray-400 mb-6'>
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className='flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteNote(showDeleteConfirm)}
                className='flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

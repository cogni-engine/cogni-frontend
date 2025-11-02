'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useWorkspaceNotes, formatDate } from '@/hooks/useWorkspaceNotes';
import type { NoteWithParsed } from '@/types/note';
import { Search, PenSquare, Trash } from 'lucide-react';

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
      router.push(`/notes/${newNote.id}`);
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
    router.push(`/notes/${noteId}`);
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
      <div className='flex gap-3 mb-4'>
        {/* Search */}
        <div className='flex items-center bg-white/8 backdrop-blur-xl text-white px-4 py-3 rounded-4xl flex-1 border border-black focus-within:border-black shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300'>
          <Search className='text-gray-400 mr-2 w-[18px] h-[18px]' />
          <input
            type='text'
            placeholder='Search notes...'
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className='bg-transparent outline-none text-sm text-white w-full placeholder-gray-500'
          />
        </div>
        <button
          onClick={handleCreateNote}
          className='bg-white/10 backdrop-blur-xl border border-black p-3 rounded-full hover:bg-white/15 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]'
        >
          <PenSquare className='w-5 h-5 text-white' />
        </button>
      </div>

      {/* Notes List */}
      <div
        className='flex-1 overflow-y-auto'
        style={{
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
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
          <div className='flex flex-col gap-[14px]'>
            {notes.map((note: NoteWithParsed) => (
              <div
                key={note.id}
                className='group bg-white/8 backdrop-blur-xl transition-all duration-300 rounded-[20px] px-5 py-[8px] border border-black shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] cursor-pointer relative'
                onClick={() => handleNoteClick(note.id)}
              >
                <div className='flex justify-between items-start gap-3 mb-1'>
                  <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-white text-[17px] leading-[1.4] line-clamp-2'>
                      {note.title || 'Untitled'}
                    </h3>
                  </div>
                  <span className='text-[11px] text-gray-400 whitespace-nowrap mt-0.5'>
                    {formatDate(note.updated_at)}
                  </span>
                </div>
                <p className='text-[13px] text-gray-400 leading-[1.6] line-clamp-2 mb-1'>
                  {note.preview || 'No content'}
                </p>
                {/* Assigned Members */}
                {note.workspace_member_note &&
                  note.workspace_member_note.length > 0 && (
                    <div className='flex items-center gap-1.5 mt-2 mb-1'>
                      <div className='flex -space-x-2'>
                        {note.workspace_member_note
                          .filter(
                            assignment =>
                              assignment.workspace_member_note_role ===
                              'assignee'
                          )
                          .slice(0, 3)
                          .map((assignment, index) => (
                            <div
                              key={
                                assignment.workspace_member?.id ||
                                `temp-${index}`
                              }
                              className='w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-gray-900 flex items-center justify-center text-white text-xs font-medium'
                              title={
                                assignment.workspace_member?.user_profiles
                                  ?.name || 'Unknown'
                              }
                            >
                              {assignment.workspace_member?.user_profiles
                                ?.avatar_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={
                                    assignment.workspace_member.user_profiles
                                      .avatar_url
                                  }
                                  alt={
                                    assignment.workspace_member.user_profiles
                                      .name || 'User'
                                  }
                                  className='w-full h-full rounded-full object-cover'
                                />
                              ) : (
                                assignment.workspace_member?.user_profiles?.name
                                  ?.charAt(0)
                                  .toUpperCase() || '?'
                              )}
                            </div>
                          ))}
                        {note.workspace_member_note.filter(
                          assignment =>
                            assignment.workspace_member_note_role === 'assignee'
                        ).length > 3 && (
                          <div className='w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-white text-xs font-medium'>
                            +
                            {note.workspace_member_note.filter(
                              assignment =>
                                assignment.workspace_member_note_role ===
                                'assignee'
                            ).length - 3}
                          </div>
                        )}
                      </div>
                      <span className='text-xs text-gray-500'>担当者</span>
                    </div>
                  )}
                {/* Delete button - always at bottom right */}
                <div className='absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setShowDeleteConfirm(note.id);
                    }}
                    className='p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors'
                  >
                    <Trash className='w-4 h-4' />
                  </button>
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

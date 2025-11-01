'use client';

import NoteList from '@/features/notes/components/NoteList';
import { useNotes, formatDate, useNoteMutations } from '@/hooks/useNotes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getPersonalWorkspaceId } from '@/lib/cookies';

export default function NotesPage() {
  const router = useRouter();
  const { notes, loading, error, searchNotes } = useNotes();
  const { create } = useNoteMutations();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const formattedNotes = notes.map(note => ({
    id: note.id.toString(),
    title: note.title,
    date: formatDate(note.updated_at),
    preview: note.preview,
  }));

  const handleCreateNote = async () => {
    try {
      setIsCreating(true);
      const workspaceId = getPersonalWorkspaceId();
      if (!workspaceId) {
        throw new Error('No personal workspace found');
      }

      // Create a new note with empty/default content
      const newNote = await create('Untitled', '');

      // Navigate to the new note page
      router.push(`/notes/${newNote.id}`);
    } catch (err) {
      console.error('Failed to create note:', err);
      // TODO: Show error toast/notification
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className='flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 relative overflow-hidden'>
      {/* 背景の星 */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse'></div>
        <div className='absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse delay-1000'></div>
        <div className='absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-white/15 rounded-full animate-pulse delay-2000'></div>
        <div className='absolute top-2/3 right-1/4 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500'></div>
        <div className='absolute bottom-1/3 right-1/2 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-1500'></div>
      </div>

      {/* 固定ヘッダー（タイトル + 検索バー + 新規作成ボタン） */}
      <div className='relative z-20 px-4 md:px-6 pt-4 md:pt-6 pb-4 bg-gradient-to-br from-slate-950 via-black to-slate-950'>
        {/* 検索バー + 新規作成ボタン */}
        <div className='flex items-center justify-between w-full max-w-4xl mx-auto gap-3'>
          {/* Search Box */}
          <div className='flex items-center bg-white/8 backdrop-blur-xl text-gray-300 px-4 py-3 rounded-full flex-1 border border-white/10 hover:border-white/15 focus-within:border-white/15 hover:scale-[1.005] focus-within:scale-[1.002] shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-gray-400 mr-2'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <path d='m21 21-4.35-4.35'></path>
            </svg>
            <input
              type='text'
              placeholder='Search notes...'
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                searchNotes(e.target.value);
              }}
              className='bg-transparent outline-none text-sm text-gray-200 w-full placeholder-gray-500'
            />
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-gray-400 ml-2'
            >
              <path d='M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z'></path>
              <path d='M19 10v2a7 7 0 0 1-14 0v-2'></path>
              <line x1='12' y1='19' x2='12' y2='22'></line>
            </svg>
          </div>

          {/* 新規作成ボタン */}
          <button
            onClick={handleCreateNote}
            disabled={isCreating}
            className='bg-white/10 backdrop-blur-xl border border-white/12 hover:border-white/18 p-3 rounded-full hover:bg-white/15 hover:scale-[1.08] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          >
            {isCreating ? (
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-300'></div>
            ) : (
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-gray-300'
              >
                <rect
                  x='3'
                  y='3'
                  width='14'
                  height='14'
                  rx='2'
                  ry='2'
                  stroke='currentColor'
                  fill='none'
                ></rect>
                <path d='M17 3l4 4-9.5 9.5-4 1 1-4L17 3z'></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* スクロール可能エリア（ノートリストのみ） */}
      <div
        className='relative z-10 flex-1 overflow-y-auto px-4 md:px-6 pb-4'
        style={{
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {loading && (
          <div className='flex justify-center items-center py-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
          </div>
        )}

        {error && (
          <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300'>
            {error}
          </div>
        )}

        {!loading && !error && <NoteList notes={formattedNotes} />}
      </div>
    </div>
  );
}

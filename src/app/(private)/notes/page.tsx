'use client';

import NoteList from '@/features/notes/components/NoteList';
import { useNotes, formatDate, useNoteMutations } from '@/hooks/useNotes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getPersonalWorkspaceId } from '@/lib/cookies';
import { PenSquare } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import GlassButton from '@/components/glass-card/GlassButton';

export default function NotesPage() {
  const router = useRouter();
  const { notes, loading, error, searchNotes } = useNotes();
  const { create } = useNoteMutations();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const personalWorkspaceId = getPersonalWorkspaceId();

  const formattedNotes = notes.map(note => ({
    id: note.id.toString(),
    title: note.title,
    date: formatDate(note.updated_at),
    preview: note.preview,
    workspace: note.workspace,
    isGroupNote:
      note.workspace?.type === 'group' &&
      note.workspace_id !== personalWorkspaceId,
    updated_at: note.updated_at,
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
    <div className='flex flex-col h-full text-gray-100 relative overflow-hidden'>
      {/* 固定ヘッダー（タイトル + 検索バー + 新規作成ボタン） */}
      <div className='relative z-20 px-4 md:px-6 pt-4 md:pt-6 pb-4'>
        {/* 検索バー + 新規作成ボタン */}
        <div className='flex w-full items-center justify-between gap-3'>
          <SearchBar
            placeholder='Search notes...'
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              searchNotes(e.target.value);
            }}
          />

          {/* 新規作成ボタン */}
          <GlassButton
            onClick={handleCreateNote}
            disabled={isCreating}
            size='icon'
            className='size-11 disabled:cursor-not-allowed'
          >
            {isCreating ? (
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-300'></div>
            ) : (
              <PenSquare className='w-5 h-5 text-white' />
            )}
          </GlassButton>
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

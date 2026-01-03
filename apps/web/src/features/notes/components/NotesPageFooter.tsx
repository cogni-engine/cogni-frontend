'use client';

import { PenSquare } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import GlassButton from '@/components/glass-design/GlassButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotesContext } from '../NotesProvider';

type NotesPageFooterProps = {
  isInputActive: boolean;
};

export function NotesPageFooter({ isInputActive }: NotesPageFooterProps) {
  const { createNote, searchQuery, handleSearch } = useNotesContext();
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const router = useRouter();

  const handleCreateNote = async () => {
    try {
      setIsCreatingNote(true);
      // Always create in default folder (null)
      const newNote = await createNote('Untitled', '', null);
      // Navigate to the new note page
      router.push(`/notes/${newNote.id}`);
    } catch (err) {
      console.error('Failed to create note:', err);
    } finally {
      setIsCreatingNote(false);
    }
  };

  return (
    <div
      className={`fixed left-0 right-0 z-100 px-4 md:px-6 py-4 transition-all duration-300 ${
        isInputActive ? 'bottom-0 md:bottom-[72px]' : 'bottom-[72px]'
      }`}
    >
      <div className='relative flex items-center gap-2 max-w-7xl mx-auto'>
        <SearchBar
          placeholder='Search notes...'
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleSearch(e.target.value);
          }}
        />

        <GlassButton
          onClick={handleCreateNote}
          disabled={isCreatingNote}
          size='icon'
          className='size-12 disabled:cursor-not-allowed shrink-0'
        >
          {isCreatingNote ? (
            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-300'></div>
          ) : (
            <PenSquare className='w-5 h-5 text-white' />
          )}
        </GlassButton>
      </div>
    </div>
  );
}

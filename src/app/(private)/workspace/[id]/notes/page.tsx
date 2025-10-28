'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import NoteList from '@/components/notes/NoteList';
import { useWorkspaceNotes, formatDate } from '@/hooks/useWorkspaceNotes';
import type { NoteWithParsed } from '@/types/note';

export default function WorkspaceNotesPage() {
  const params = useParams();
  const workspaceId = parseInt(params.id as string);

  const { notes, loading, error } = useWorkspaceNotes(workspaceId);

  const formattedNotes = useMemo(() => {
    return notes.map((note: NoteWithParsed) => ({
      id: note.id.toString(),
      title: note.title,
      date: formatDate(note.updated_at),
      preview: note.preview,
    }));
  }, [notes]);

  if (loading) {
    return (
      <div className='flex justify-center items-center py-12'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300'>
        {error}
      </div>
    );
  }

  return (
    <div className='h-full overflow-y-auto'>
      <NoteList notes={formattedNotes} />
    </div>
  );
}

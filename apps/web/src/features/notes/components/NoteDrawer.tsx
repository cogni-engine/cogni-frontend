'use client';

import { useState, useEffect } from 'react';
import { Loader2, FileText, SquareArrowOutUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
} from '@/components/ui/drawer';
import type { Note } from '@/types/note';
import { getNote } from '@/features/notes/api/notesApi';
import { TiptapRenderer } from '@/components/tiptap/TiptapRenderer';

interface NoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  noteId: number | null;
}

export default function NoteDrawer({
  isOpen,
  onClose,
  noteId,
}: NoteDrawerProps) {
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setNote(null);
      setError(null);
    }
  }, [isOpen]);

  // Fetch note when drawer opens
  useEffect(() => {
    if (isOpen && noteId) {
      setLoading(true);
      setError(null);

      getNote(noteId)
        .then(data => {
          if (data) {
            setNote(data);
          } else {
            setError('Note not found');
          }
        })
        .catch(err => {
          console.error('Failed to fetch note:', err);
          setError('Failed to load note');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, noteId]);

  // Get note content without the first line (title)
  const getNoteContent = (text: string) => {
    if (!text || !text.trim()) {
      return '';
    }
    const lines = text.split('\n');
    // Find the index of the first non-empty line
    const firstLineIndex = lines.findIndex(line => line.trim().length > 0);
    if (firstLineIndex !== -1) {
      // Return everything after the first non-empty line
      return lines
        .slice(firstLineIndex + 1)
        .join('\n')
        .trim();
    }
    return text;
  };

  const handleNavigateToNote = () => {
    if (noteId) {
      router.push(`/notes/${noteId}`);
      onClose();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={open => !open && onClose()}>
      <DrawerContent zIndex={160} maxHeight='80vh'>
        <DrawerHandle />

        {/* Header */}
        <DrawerHeader className='px-4 pb-2 pt-0'>
          <DrawerTitle className='truncate'>
            {note?.title || 'Note'}
          </DrawerTitle>
          {note && (
            <button
              onClick={handleNavigateToNote}
              className='p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0'
              title='Open note in full page'
            >
              <SquareArrowOutUpRight className='w-5 h-5 text-gray-400 hover:text-white transition-colors' />
            </button>
          )}
        </DrawerHeader>

        {/* Content */}
        <DrawerBody>
          {loading && (
            <div className='flex items-center justify-center py-12'>
              <Loader2 className='w-8 h-8 text-blue-400 animate-spin' />
            </div>
          )}

          {error && (
            <div className='flex flex-col items-center justify-center py-12 text-center'>
              <FileText className='w-12 h-12 text-gray-400 opacity-50 mb-3' />
              <p className='text-gray-400'>{error}</p>
            </div>
          )}

          {note && !loading && !error && (
            <div className='prose prose-invert max-w-none'>
              <TiptapRenderer
                content={getNoteContent(note.text)}
                contentType='markdown'
                className='tiptap-note-content'
              />
            </div>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

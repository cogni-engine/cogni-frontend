'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2, FileText, SquareArrowOutUpRight } from 'lucide-react';
import { useDrag } from '@use-gesture/react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/glass-card/GlassCard';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import type { Note } from '@/types/note';
import { getNote } from '@cogni/api';
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
  const { setDrawerOpen } = useGlobalUI();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setDrawerOpen(true);
    } else {
      document.body.style.overflow = 'unset';
      setDrawerOpen(false);
      // Reset state when closed
      setNote(null);
      setError(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
      setDrawerOpen(false);
    };
  }, [isOpen, setDrawerOpen]);

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

  // Swipe down to close gesture handler
  const bind = useDrag(
    ({ last, movement: [, my], velocity: [, vy], direction: [, dy] }) => {
      // Only allow downward swipes
      if (my > 0) {
        if (last) {
          // Close if swiped down more than 100px or fast swipe down
          if (my > 100 || (vy > 0.5 && dy > 0)) {
            onClose();
            setDragOffset(0);
          } else {
            // Snap back
            setDragOffset(0);
          }
        } else {
          // Update drag offset during the drag
          setDragOffset(my);
        }
      }
    },
    {
      axis: 'y',
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  // Parse note title from markdown content
  const getNoteTitle = (text: string) => {
    if (!text || !text.trim()) {
      return 'Untitled Note';
    }
    const lines = text.split('\n');
    // Find the first non-empty line
    const firstLine = lines.find(line => line.trim().length > 0);
    if (firstLine) {
      // Remove markdown heading symbols if present
      const title = firstLine.replace(/^#{1,6}\s+/, '').trim();
      return title || 'Untitled Note';
    }
    return 'Untitled Note';
  };

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm z-100'
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className='fixed inset-x-0 bottom-0 z-110 animate-[slide-up_0.3s_ease-out]'
        style={{
          transform: `translateY(${dragOffset}px)`,
          transition: dragOffset === 0 ? 'transform 0.2s ease-out' : 'none',
        }}
      >
        <GlassCard className='rounded-t-3xl rounded-b-none max-h-[80vh] flex flex-col'>
          {/* Drag Handle */}
          <div
            {...bind()}
            className='pt-2 pb-1 cursor-grab active:cursor-grabbing touch-none'
          >
            <div className='w-12 h-1 bg-white/20 rounded-full mx-auto' />
          </div>

          {/* Header */}
          <div className='flex items-center justify-between px-4 pb-2 pt-0 border-b border-white/10'>
            <div className='flex items-center gap-2 flex-1 min-w-0'>
              <div className='w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0'>
                <FileText className='w-4 h-4 text-purple-400' />
              </div>
              <h3 className='text-lg font-semibold text-white truncate'>
                {note ? getNoteTitle(note.text) : 'Note'}
              </h3>
            </div>
            {note && (
              <button
                onClick={handleNavigateToNote}
                className='p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0'
                title='Open note in full page'
              >
                <SquareArrowOutUpRight className='w-5 h-5 text-gray-400 hover:text-white transition-colors' />
              </button>
            )}
          </div>

          {/* Content */}
          <div className='flex-1 overflow-y-auto p-4'>
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
          </div>
        </GlassCard>
      </div>
    </>
  );
}

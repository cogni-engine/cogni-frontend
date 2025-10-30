'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useNote, useNoteMutations } from '@/hooks/useNotes';
import { ArrowLeft } from 'lucide-react';

export default function NoteEditor({ noteId }: { noteId: string }) {
  const router = useRouter();
  const id = parseInt(noteId, 10);
  const isValidId = !isNaN(id);

  // Always call hooks first (React requirement)
  const { note, loading, error } = useNote(isValidId ? id : 0);
  const { update } = useNoteMutations();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const hasLoadedInitialData = useRef(false);

  // Reset the loaded flag when noteId changes
  useEffect(() => {
    hasLoadedInitialData.current = false;
  }, [noteId]);

  // Load note data only once when it first becomes available
  useEffect(() => {
    if (note && isValidId && !hasLoadedInitialData.current) {
      setTitle(note.title);
      setContent(note.content);
      hasLoadedInitialData.current = true;
    }
  }, [note, isValidId]);

  // Debounced autosave (update only, since note is already created)
  useEffect(() => {
    if (loading || !isValidId) return;

    // Skip if we haven't loaded the note data yet
    if (!hasLoadedInitialData.current) return;

    const timeout = setTimeout(async () => {
      try {
        setSaving(true);
        await update(id, title, content);
      } catch (err) {
        console.error('Autosave failed:', err);
      } finally {
        setSaving(false);
      }
    }, 700);

    return () => clearTimeout(timeout);
  }, [title, content, id, update, loading, isValidId]);

  // Validate that noteId is a valid number (after hooks)
  if (!isValidId) {
    return (
      <div className='flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center p-6'>
        <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-red-300 max-w-md'>
          <h2 className='font-bold mb-2'>Invalid Note ID</h2>
          <p>The note ID must be a valid number.</p>
          <button
            onClick={() => router.push('/notes')}
            className='mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition'
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center p-6'>
        <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-red-300 max-w-md'>
          <h2 className='font-bold mb-2'>Error</h2>
          <p>{error}</p>
          <button
            onClick={() => router.push('/notes')}
            className='mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition'
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className='flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 relative overflow-hidden'
      style={{
        willChange: 'scroll-position',
        transform: 'translateZ(0)',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* 背景の星 */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse'></div>
        <div className='absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse delay-1000'></div>
        <div className='absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-white/15 rounded-full animate-pulse delay-2000'></div>
        <div className='absolute top-2/3 right-1/4 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500'></div>
        <div className='absolute bottom-1/3 right-1/2 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-1500'></div>
      </div>

      {/* ヘッダー */}
      <header className='flex justify-between items-center px-4 md:px-6 py-3 relative z-10'>
        {/* 戻るボタン - 丸く浮き出る */}
        <button
          onClick={() => router.back()}
          className='w-11 h-11 rounded-full bg-white/8 backdrop-blur-xl border border-black text-gray-400 hover:text-white hover:bg-white/12 hover:scale-110 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] flex items-center justify-center'
        >
          <ArrowLeft className='w-4 h-4' />
        </button>

        {/* Saving indicator (subtle, replaces explicit save) */}
        {saving && (
          <div className='text-xs text-white/60 px-3 py-1 rounded-full bg-white/10 border border-white/15'>
            Saving...
          </div>
        )}
      </header>

      {/* エディタ */}
      <div
        className='flex flex-col flex-1 p-4 md:p-6 relative z-10'
        style={{
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='タイトル'
          className='text-2xl font-bold bg-transparent focus:outline-none mb-3 text-white placeholder-gray-500'
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder='メモを入力...'
          className='flex-1 bg-transparent resize-none focus:outline-none leading-relaxed text-gray-300 placeholder-gray-600'
        />
      </div>
    </div>
  );
}

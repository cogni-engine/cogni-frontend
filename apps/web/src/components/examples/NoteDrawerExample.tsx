/**
 * Example Component: Using Global NoteDrawer
 *
 * This component demonstrates how to use the global NoteDrawer
 * from anywhere in your application.
 *
 * To use this example:
 * 1. Import this component in any page
 * 2. Click the "Open Note" button
 * 3. The global NoteDrawer will open with the specified note
 */

'use client';

import { useGlobalUI } from '@/contexts/GlobalUIContext';
import GlassButton from '@/components/glass-card/GlassButton';
import { FileText } from 'lucide-react';

export default function NoteDrawerExample() {
  const { openNoteDrawer, noteDrawerOpen, selectedNoteId } = useGlobalUI();

  const handleOpenNote = (noteId: number) => {
    openNoteDrawer(noteId);
  };

  return (
    <div className='p-6 space-y-4'>
      <div className='space-y-2'>
        <h2 className='text-xl font-semibold text-white'>
          Global NoteDrawer Example
        </h2>
        <p className='text-gray-400 text-sm'>
          Click any button below to open a note in the global drawer.
        </p>
      </div>

      <div className='flex gap-3 flex-wrap'>
        <GlassButton
          onClick={() => handleOpenNote(1)}
          className='flex items-center gap-2'
        >
          <FileText className='w-4 h-4' />
          Open Note #1
        </GlassButton>

        <GlassButton
          onClick={() => handleOpenNote(2)}
          className='flex items-center gap-2'
        >
          <FileText className='w-4 h-4' />
          Open Note #2
        </GlassButton>

        <GlassButton
          onClick={() => handleOpenNote(3)}
          className='flex items-center gap-2'
        >
          <FileText className='w-4 h-4' />
          Open Note #3
        </GlassButton>
      </div>

      {noteDrawerOpen && (
        <div className='mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg'>
          <p className='text-green-400 text-sm'>
            ✅ Note drawer is currently open with note ID: {selectedNoteId}
          </p>
        </div>
      )}

      <div className='mt-6 p-4 bg-white/5 rounded-lg'>
        <p className='text-xs text-gray-400 font-mono'>Usage Example:</p>
        <pre className='text-xs text-white/80 mt-2 overflow-x-auto'>
          {`import { useGlobalUI } from '@/contexts/GlobalUIContext';

function MyComponent() {
  const { openNoteDrawer } = useGlobalUI();
  
  return (
    <button onClick={() => openNoteDrawer(123)}>
      View Note
    </button>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useWorkspaceNote } from '@/hooks/useWorkspaceNotes';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { assignNoteToMembers, getNoteAssignments } from '@/lib/api/notesApi';
import { MemberMultiSelect } from '@/components/workspace/MemberMultiSelect';

export default function WorkspaceNoteEditorPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = parseInt(params.id as string);
  const noteId =
    params.noteId === 'new' ? 'new' : parseInt(params.noteId as string);

  const { note, loading, error, saveNote } = useWorkspaceNote(
    workspaceId,
    noteId
  );

  const { members } = useWorkspaceMembers(workspaceId);

  // Debug: Log workspace members
  useEffect(() => {
    console.log('👥 Workspace members:', members);
    console.log('👥 Members length:', members?.length);
  }, [members]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [assignerIds, setAssignerIds] = useState<number[]>([]);
  const [assigneeIds, setAssigneeIds] = useState<number[]>([]);

  // Load note data when available
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setHasUnsavedChanges(false);
    }
  }, [note]);

  // Load assignment data for existing notes
  useEffect(() => {
    console.log('🎬 Assignment useEffect triggered');
    console.log('📝 noteId:', noteId, 'type:', typeof noteId);

    if (noteId !== 'new' && typeof noteId === 'number') {
      console.log('✅ Fetching assignments for noteId:', noteId);

      getNoteAssignments(noteId)
        .then(({ assigners, assignees }) => {
          console.log('🎉 Got assignments:', { assigners, assignees });

          const assignerIdsList = assigners
            .map((a: { workspace_member?: { id?: number } }) => {
              console.log('👤 Assigner:', a);
              return a.workspace_member?.id;
            })
            .filter(Boolean);

          const assigneeIdsList = assignees
            .map((a: { workspace_member?: { id?: number } }) => {
              console.log('👥 Assignee:', a);
              return a.workspace_member?.id;
            })
            .filter(Boolean);

          console.log('🆔 Assigner IDs:', assignerIdsList);
          console.log('🆔 Assignee IDs:', assigneeIdsList);

          setAssignerIds(assignerIdsList);
          setAssigneeIds(assigneeIdsList);
        })
        .catch(err => {
          console.error('❌ Failed to load assignments:', err);
          console.error('❌ Error type:', typeof err);
          console.error('❌ Error keys:', Object.keys(err));
          console.error('❌ Error message:', err?.message);
          console.error('❌ Error stack:', err?.stack);
          console.error('❌ Full error object:', JSON.stringify(err, null, 2));
        });
    } else {
      console.log('⏭️ Skipping (new note or invalid noteId)');
      // Reset for new notes
      setAssignerIds([]);
      setAssigneeIds([]);
    }
  }, [noteId]);

  // Track changes
  useEffect(() => {
    if (note && (title !== note.title || content !== note.content)) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [title, content, note]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      alert('Please enter a title or content for the note.');
      return;
    }

    try {
      setSaving(true);
      const savedNote = await saveNote(title.trim() || 'Untitled', content);

      // Save assignment information
      await assignNoteToMembers(savedNote.id, assignerIds, assigneeIds);

      // If it was a new note, redirect to the actual note page
      if (noteId === 'new') {
        router.replace(`/workspace/${workspaceId}/notes/${savedNote.id}`);
      }

      setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Failed to save note:', err);
      alert('Failed to save note. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      if (
        confirm('You have unsaved changes. Are you sure you want to leave?')
      ) {
        router.push(`/workspace/${workspaceId}/notes`);
      }
    } else {
      router.push(`/workspace/${workspaceId}/notes`);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [title, content, handleSave]);

  // Auto-save functionality (optional)
  useEffect(() => {
    if (!hasUnsavedChanges || noteId === 'new') return;

    const autoSaveTimer = setTimeout(() => {
      if (title.trim() || content.trim()) {
        handleSave();
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(autoSaveTimer);
  }, [title, content, hasUnsavedChanges, noteId, handleSave]);

  if (loading) {
    return (
      <div className='flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
        <p className='mt-4 text-gray-400'>Loading note...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center p-6'>
        <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-red-300 max-w-md text-center'>
          <h2 className='font-bold mb-2'>Error</h2>
          <p className='mb-4'>{error}</p>
          <button
            onClick={handleBack}
            className='px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition'
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
      {/* Header */}
      <header className='flex items-center gap-3 px-4 md:px-6 py-4 relative z-10 border-b border-white/10 w-full'>
        {/* Back button */}
        <button
          onClick={handleBack}
          className='w-[50px] h-[50px] rounded-full bg-white/10 backdrop-blur-xl text-white border border-black transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/15 hover:scale-102 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M15 18l-6-6 6-6' />
          </svg>
        </button>

        {/* Spacer */}
        <div className='flex-1'></div>

        {/* Status indicator */}
        <div className='flex items-center gap-3'>
          {hasUnsavedChanges && (
            <span className='text-xs text-yellow-400 flex items-center gap-1'>
              <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse'></div>
              Unsaved changes
            </span>
          )}
          {noteId !== 'new' && !hasUnsavedChanges && (
            <span className='text-xs text-green-400 flex items-center gap-1'>
              <div className='w-2 h-2 bg-green-400 rounded-full'></div>
              Saved
            </span>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving || (!hasUnsavedChanges && noteId !== 'new')}
          className='w-10 h-10 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-white hover:bg-white/25 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {saving ? (
            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='20 6 9 17 4 12'></polyline>
            </svg>
          )}
        </button>
      </header>

      {/* Editor */}
      <div
        className='flex flex-col flex-1 p-4 md:p-6 relative z-10'
        style={{
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Title input */}
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Note title...'
          className='text-2xl md:text-3xl font-bold bg-transparent focus:outline-none mb-4 text-white placeholder-gray-500 border-none resize-none'
          autoFocus={noteId === 'new'}
        />

        {/* Assignment selectors */}
        <div className='space-y-3 mb-4 pb-4 border-b border-white/10'>
          <MemberMultiSelect
            label='Assigner'
            members={members}
            selectedIds={assignerIds}
            onChange={setAssignerIds}
          />
          <MemberMultiSelect
            label='Assignee'
            members={members}
            selectedIds={assigneeIds}
            onChange={setAssigneeIds}
          />
        </div>

        {/* Content textarea */}
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder='Start writing your note...'
          className='flex-1 bg-transparent resize-none focus:outline-none leading-relaxed text-gray-300 placeholder-gray-600 border-none text-base md:text-lg'
          style={{ minHeight: '200px' }}
        />
      </div>

      {/* Keyboard shortcuts hint */}
      <div className='px-4 md:px-6 py-2 border-t border-white/10 relative z-10'>
        <p className='text-xs text-gray-500 text-center'>
          Press Ctrl+S (Cmd+S) to save • Auto-save enabled
        </p>
      </div>
    </div>
  );
}

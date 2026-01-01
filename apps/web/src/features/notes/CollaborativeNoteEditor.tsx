'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useNotes } from './hooks/useNotes';
import { EditorContent } from '@tiptap/react';
import { getPersonalWorkspaceId } from '@/lib/cookies';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { TaskListChain } from './types';
import { NoteEditorHeader } from './components/NoteEditorHeader';
import { NoteEditorToolbar } from './components/NoteEditorToolbar';
import { MobileFloatingToolbar } from './components/tool-bar/MobileFloatingToolbar';
import { EditorStyles } from './lib/editorStyles';
import { CollaborativeEditorStyles } from './lib/collaborativeEditorStyles';
import {
  useCollaborativeEditor,
  generateUserColor,
} from './hooks/useCollaborativeEditor';
import { useNoteAssignments } from './hooks/useNoteAssignments';
import { useEditorImageUpload } from './hooks/useEditorImageUpload';
import { getNote, updateNoteTitle } from '@/lib/api/notesApi';
import { createClient } from '@/lib/supabase/browserClient';
import type { Note } from '@/types/note';

export default function CollaborativeNoteEditor({
  noteId,
}: {
  noteId: string;
}) {
  const router = useRouter();
  const id = parseInt(noteId, 10);
  const isValidId = !isNaN(id);

  // Note data state
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // User info state
  const [userInfo, setUserInfo] = useState<{
    name: string;
    color: string;
    id: string;
  } | null>(null);

  // Check if this is a group workspace note (not personal)
  const personalWorkspaceId = getPersonalWorkspaceId();
  const isGroupNote = note?.workspace_id !== personalWorkspaceId;

  // Assignment dropdown state
  const [showAssignmentDropdown, setShowAssignmentDropdown] = useState(false);

  // Fetch workspace members if this is a group note
  const { members } = useWorkspaceMembers(
    isGroupNote && note?.workspace_id ? note.workspace_id : 0
  );

  // Fetch workspace notes for note mentions
  const { notes: workspaceNotes } = useNotes({
    workspaceId: note?.workspace_id || 0,
    autoFetch: !!note?.workspace_id,
  });

  // Use refs to always get the latest members and notes for mention suggestions
  const membersRef = useRef(members);
  membersRef.current = members;

  const notesRef = useRef(workspaceNotes.filter(n => n.id !== id));
  notesRef.current = workspaceNotes.filter(n => n.id !== id);

  // Use assignment hook
  const { assigneeIds, toggleAssignee } = useNoteAssignments({
    isGroupNote,
    noteId: note?.id,
  });

  // Ref for debounced title save
  const titleSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch note data
  useEffect(() => {
    if (!isValidId) {
      setLoading(false);
      return;
    }

    async function fetchNote() {
      try {
        setLoading(true);
        setError(null);
        const data = await getNote(id);
        if (data) {
          setNote(data);
          // Use title column if available, otherwise fallback to parsing from text
          if (data.title) {
            setTitle(data.title);
          } else {
            // Fallback for legacy notes without title column
            const lines = data.text?.split('\n') || [];
            const firstLine = lines.find(
              (line: string) => line.trim().length > 0
            );
            const noteTitle =
              firstLine?.replace(/^#{1,6}\s+/, '').trim() || 'Untitled';
            setTitle(noteTitle);
          }
        } else {
          setError('Note not found');
        }
      } catch (err) {
        console.error('Error fetching note:', err);
        setError('Failed to load note');
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id, isValidId]);

  // Handle title change - debounced save to database
  const handleTitleChange = useCallback(
    (newTitle: string) => {
      setTitle(newTitle);

      // Clear existing timeout
      if (titleSaveTimeoutRef.current) {
        clearTimeout(titleSaveTimeoutRef.current);
      }

      // Debounce save to database
      titleSaveTimeoutRef.current = setTimeout(async () => {
        try {
          await updateNoteTitle(id, newTitle);
          console.log('Title saved:', newTitle);
        } catch (err) {
          console.error('Error saving title:', err);
        }
      }, 500); // 500ms debounce
    },
    [id]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (titleSaveTimeoutRef.current) {
        clearTimeout(titleSaveTimeoutRef.current);
      }
    };
  }, []);

  // Fetch user info for collaboration
  useEffect(() => {
    async function fetchUserInfo() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Try to get user profile name
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('name')
          .eq('id', user.id)
          .single();

        setUserInfo({
          id: user.id,
          name: profile?.name || user.email?.split('@')[0] || 'Anonymous',
          color: generateUserColor(user.id),
        });
      }
    }

    fetchUserInfo();
  }, []);

  // Initialize collaborative editor
  const { editor, isSynced } = useCollaborativeEditor({
    noteId: isValidId ? id : null,
    isGroupNote,
    membersRef,
    notesRef,
    user: userInfo,
  });

  // Use image upload hook
  const {
    imageInputRef,
    uploadingImage,
    handleImageUpload,
    triggerImageInput,
  } = useEditorImageUpload({
    editor,
    workspaceId: note?.workspace_id,
  });

  // Handle toggle task list
  const handleToggleTaskList = () => {
    if (!editor) return;

    const chain = editor.chain().focus() as unknown as TaskListChain;

    if (typeof chain.toggleTaskList === 'function') {
      chain.toggleTaskList().run();
      return;
    }

    const commands = editor.commands as unknown as {
      toggleTaskList?: () => boolean;
    };

    if (typeof commands.toggleTaskList === 'function') {
      commands.toggleTaskList();
    } else {
      console.warn('Task list command not available');
    }
  };

  // Validate that noteId is a valid number
  if (!isValidId) {
    return (
      <div className='flex flex-col h-full bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center p-6'>
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

  // phase 1 loading
  if (loading) {
    return (
      <div className='flex flex-col h-full bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col h-full bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center p-6'>
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

  if (!note && !loading) {
    return (
      <div className='flex flex-col h-full bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center p-6'>
        <div className='bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 text-yellow-300 max-w-md'>
          <h2 className='font-bold mb-2'>Note Not Found</h2>
          <p>This note does not exist or you don&apos;t have access to it.</p>
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

  // Show loading state while connecting (phase 2)
  if (!isSynced) {
    return (
      <div className='flex flex-col h-full bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100 relative overflow-hidden'>
      <NoteEditorHeader
        title={title}
        onTitleChange={handleTitleChange}
        onBack={() => router.back()}
        isGroupNote={isGroupNote}
        showAssignmentDropdown={showAssignmentDropdown}
        onToggleAssignmentDropdown={() =>
          setShowAssignmentDropdown(!showAssignmentDropdown)
        }
        onCloseAssignmentDropdown={() => setShowAssignmentDropdown(false)}
        members={members}
        assigneeIds={assigneeIds}
        onToggleAssignee={toggleAssignee}
      />

      <div className='hidden md:block'>
        <NoteEditorToolbar
          editor={editor}
          uploadingImage={uploadingImage}
          canUploadImage={!!note?.workspace_id}
          onImageUpload={triggerImageInput}
          onToggleTaskList={handleToggleTaskList}
          aiSuggestionsEnabled={false}
          isSuggestionLoading={false}
          onToggleAI={() => {}}
        />
      </div>

      {/* Editor Content */}
      <div
        className='flex flex-col flex-1 px-4 md:px-6 relative z-10 overflow-auto'
        style={{
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className='flex-1 min-h-full'>
          <EditorContent editor={editor} />
          <div className='h-1/2'></div>
        </div>
      </div>

      {/* Hidden image input */}
      <input
        ref={imageInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleImageUpload}
      />

      {/* Mobile Floating Toolbar */}
      <MobileFloatingToolbar
        editor={editor}
        uploadingImage={uploadingImage}
        canUploadImage={!!note?.workspace_id}
        onImageUpload={triggerImageInput}
        onToggleTaskList={handleToggleTaskList}
        isGroupNote={isGroupNote}
      />

      <EditorStyles />
      <CollaborativeEditorStyles />
    </div>
  );
}

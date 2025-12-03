'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useNoteEditor, useNotes } from '@cogni/api';
import { EditorContent } from '@tiptap/react';
import { getPersonalWorkspaceId } from '@cogni/utils';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { useAICompletion } from '@/hooks/useAICompletion';
import { useCopilotReadable } from '@copilotkit/react-core';
import { TaskListChain } from './types';
import { NoteEditorHeader } from './components/NoteEditorHeader';
import { NoteEditorToolbar } from './components/NoteEditorToolbar';
import { EditorStyles } from './lib/editorStyles';
import { useNoteEditorSetup } from './hooks/useNoteEditorSetup';
import { useNoteAssignments } from './hooks/useNoteAssignments';
import { useNoteMentions } from './hooks/useNoteMentions';
import { useEditorImageUpload } from './hooks/useEditorImageUpload';

export default function NoteEditor({ noteId }: { noteId: string }) {
  const router = useRouter();
  const id = parseInt(noteId, 10);
  const isValidId = !isNaN(id);

  const { note, title, content, loading, error, setTitle, setContent } =
    useNoteEditor({
      noteId: isValidId ? id : null,
    });

  // Check if this is a group workspace note (not personal)
  const personalWorkspaceId = getPersonalWorkspaceId();
  const isGroupNote = note?.workspace_id !== personalWorkspaceId;

  // Assignment dropdown state
  const [showAssignmentDropdown, setShowAssignmentDropdown] = useState(false);

  // AI Completion state
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aiSuggestionsEnabled');
      return saved !== null ? saved === 'true' : false;
    }
    return false;
  });

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

  // Store note title in a ref for AI context
  const noteTitleRef = useRef(title);
  useEffect(() => {
    noteTitleRef.current = title;
  }, [title]);

  // Create placeholder callbacks for initial editor setup
  const acceptSuggestionRef = useRef<() => void>(() => {});
  const dismissSuggestionRef = useRef<() => void>(() => {});

  // Initialize editor with setup hook (using placeholder callbacks)
  const editor = useNoteEditorSetup({
    content,
    setContent,
    isGroupNote,
    membersRef,
    notesRef,
    aiSuggestionsEnabled,
    acceptSuggestion: () => acceptSuggestionRef.current(),
    dismissSuggestion: () => dismissSuggestionRef.current(),
  });

  // AI Completion hook (now that editor exists)
  const {
    suggestion,
    isLoading: isSuggestionLoading,
    acceptSuggestion,
    dismissSuggestion,
    requestSuggestion,
  } = useAICompletion({
    editor,
    noteTitle: title,
    noteId: note?.id,
    workspaceId: note?.workspace_id,
    enabled: aiSuggestionsEnabled,
    debounceMs: 1000,
  });

  // Update refs when callbacks change
  useEffect(() => {
    acceptSuggestionRef.current = acceptSuggestion;
    dismissSuggestionRef.current = dismissSuggestion;
  }, [acceptSuggestion, dismissSuggestion]);

  // Update AI completion hook with editor once it's ready
  useEffect(() => {
    if (editor && typeof window !== 'undefined') {
      // Expose editor for debugging
      (window as { __TIPTAP_EDITOR__?: typeof editor }).__TIPTAP_EDITOR__ =
        editor;
    }
  }, [editor]);

  // Clear suggestion when cursor moves
  const lastCursorPosRef = useRef<number | null>(null);
  useEffect(() => {
    if (!editor || !aiSuggestionsEnabled) return;

    const updateHandler = () => {
      const currentPos = editor.state.selection.from;

      if (
        lastCursorPosRef.current !== null &&
        lastCursorPosRef.current !== currentPos &&
        suggestion
      ) {
        console.log('🔄 Cursor moved, clearing suggestion');
        dismissSuggestion();
      }

      lastCursorPosRef.current = currentPos;
    };

    editor.on('selectionUpdate', updateHandler);
    return () => {
      editor.off('selectionUpdate', updateHandler);
    };
  }, [editor, suggestion, dismissSuggestion, aiSuggestionsEnabled]);

  // Update AI completion extension options when suggestion changes
  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      const aiCompletionExt = editor.extensionManager.extensions.find(
        ext => ext.name === 'aiCompletion'
      );
      if (aiCompletionExt) {
        aiCompletionExt.options.onAccept = acceptSuggestion;
        aiCompletionExt.options.onDismiss = dismissSuggestion;
      }

      const tr = editor.state.tr;
      tr.setMeta('aiCompletionSuggestion', suggestion);
      tr.setMeta('aiCompletionEnabled', aiSuggestionsEnabled);
      editor.view.dispatch(tr);
    }
  }, [
    editor,
    suggestion,
    acceptSuggestion,
    dismissSuggestion,
    aiSuggestionsEnabled,
  ]);

  // Trigger AI suggestions on content change
  useEffect(() => {
    console.log('🔍 AI suggestion effect triggered', {
      hasEditor: !!editor,
      aiEnabled: aiSuggestionsEnabled,
      isLoading: isSuggestionLoading,
      hasSuggestion: !!suggestion,
    });

    if (!editor || !aiSuggestionsEnabled || isSuggestionLoading) {
      console.log('⏹️ Skipping - disabled or loading');
      return;
    }

    if (suggestion) {
      console.log('⏹️ Skipping - suggestion already showing');
      return;
    }

    const { from } = editor.state.selection;
    const textBefore = editor.state.doc.textBetween(
      Math.max(0, from - 500),
      from,
      '\n'
    );

    console.log('📝 Text context:', {
      length: textBefore.trim().length,
      preview: textBefore.slice(-50),
    });

    if (textBefore.trim().length > 10) {
      console.log('✅ Requesting AI suggestion');
      requestSuggestion(textBefore, noteTitleRef.current);
    } else {
      console.log('❌ Text too short for suggestion');
    }
  }, [
    content,
    editor,
    aiSuggestionsEnabled,
    isSuggestionLoading,
    requestSuggestion,
    suggestion,
  ]);

  // Persist AI suggestions setting to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'aiSuggestionsEnabled',
        String(aiSuggestionsEnabled)
      );
    }
  }, [aiSuggestionsEnabled]);

  // Use mentions hook
  useNoteMentions({
    isGroupNote,
    noteId: note?.id,
    workspaceId: note?.workspace_id,
    editor,
    members,
    content,
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

  // Provide context to CopilotKit
  useCopilotReadable({
    description: 'Current note being edited in the editor',
    value: JSON.stringify({
      title: title || 'Untitled',
      content: content?.substring(0, 1000) || '',
      workspaceId: note?.workspace_id,
      noteId: note?.id,
    }),
    categories: ['note_editor'],
  });

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

  if (!editor) {
    return null;
  }

  return (
    <div className='flex flex-col h-full bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100 relative overflow-hidden'>
      <NoteEditorHeader
        title={title}
        onTitleChange={setTitle}
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
          aiSuggestionsEnabled={aiSuggestionsEnabled}
          isSuggestionLoading={isSuggestionLoading}
          onToggleAI={() => setAiSuggestionsEnabled(!aiSuggestionsEnabled)}
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

      <EditorStyles />
    </div>
  );
}

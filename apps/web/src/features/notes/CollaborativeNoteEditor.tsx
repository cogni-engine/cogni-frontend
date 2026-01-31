'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import {
  useNotes,
  useNote,
  useNoteAssignments,
  useEditorImageUpload,
  useDiffSuggestion,
  useCollaborativeEditor,
  generateUserColor,
} from './hooks';
import { EditorContent } from '@tiptap/react';
import { getPersonalWorkspaceId } from '@/lib/cookies';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { useIsMobileScreen } from '@/stores/usePlatformStore';
import { TaskListChain } from './types';
import { NoteEditorHeader } from './components/NoteEditorHeader';
import { NoteEditorToolbar } from './components/NoteEditorToolbar';
import { MobileFloatingToolbar } from './components/tool-bar/MobileFloatingToolbar';
import { NoteEditorSkeleton } from './components/NoteEditorSkeleton';
import { DesktopAIInput } from './components/DesktopAIInput';
import { EditorStyles } from './lib/editorStyles';
import { CollaborativeEditorStyles } from './lib/collaborativeEditorStyles';
import {
  updateNoteTitle,
  getAISuggestions,
} from '@/features/notes/api/notesApi';
import { yDocToAnnotatedMarkdown } from '@/lib/ydoc/yDocToMarkdown';
import { Check, X } from 'lucide-react';
import GlassCard from '@/components/glass-design/GlassCard';
import GlassButton from '@/components/glass-design/GlassButton';
import { useAppEvents } from '@/hooks/useAppEvents';
import {
  useUserId,
  useUserEmail,
  useUserProfile,
} from '@/stores/useUserProfileStore';

export default function CollaborativeNoteEditor({
  noteId,
}: {
  noteId: string;
}) {
  const router = useRouter();
  const id = parseInt(noteId, 10);
  const isValidId = !isNaN(id);
  const isMobileScreen = useIsMobileScreen();

  // Use SWR hook for cached note data
  const { note, loading, error } = useNote({
    noteId: isValidId ? id : null,
    initialData: null,
  });

  // Local state for editable title (controlled input)
  const [title, setTitle] = useState('');

  // Get user info from global store
  const userId = useUserId();
  const userEmail = useUserEmail();
  const profile = useUserProfile();

  // Derive userInfo for collaborative editor
  const userInfo = useMemo(() => {
    if (!userId) return null;

    return {
      id: userId,
      name: profile?.name || userEmail?.split('@')[0] || 'Anonymous',
      color: generateUserColor(userId),
    };
  }, [userId, profile?.name, userEmail]);
  // Check if this is a group workspace note (not personal)
  const personalWorkspaceId = getPersonalWorkspaceId();
  const isGroupNote = note?.workspace_id !== personalWorkspaceId;

  // Assignment dropdown state
  const [showAssignmentDropdown, setShowAssignmentDropdown] = useState(false);

  // AI suggestion state
  const [aiInstruction, setAiInstruction] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Editor focus state for mobile toolbar switching
  const [isEditorFocused, setIsEditorFocused] = useState(false);

  // App events for decoupled feature communication
  const appEvents = useAppEvents();

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
  const { assigneeIds, toggleAssignee, selectAllAssignees } =
    useNoteAssignments({
      isGroupNote,
      noteId: note?.id,
    });

  // Initialize title from note data
  useEffect(() => {
    if (note?.title) {
      setTitle(note.title);
    }
  }, [note?.title]);

  // Ref for debounced title save
  const titleSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Initialize collaborative editor
  const { editor, ydoc } = useCollaborativeEditor({
    noteId: isValidId ? id : null,
    isGroupNote,
    membersRef,
    notesRef,
    user: userInfo,
    initialYdocState: note?.ydoc_state || null,
  });

  // Track editor focus/blur for mobile toolbar switching
  useEffect(() => {
    if (!editor) return;

    const handleFocus = () => {
      setIsEditorFocused(true);
    };

    const handleBlur = () => {
      // Don't unfocus if Shepherd is actively targeting an element
      // This prevents the toolbar from switching during onboarding tours
      const isShepherdActive =
        document.querySelector('.shepherd-target') !== null;
      if (!isShepherdActive) {
        setIsEditorFocused(false);
      }
    };

    editor.on('focus', handleFocus);
    editor.on('blur', handleBlur);

    return () => {
      editor.off('focus', handleFocus);
      editor.off('blur', handleBlur);
    };
  }, [editor]);

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

  // Use diff suggestion hook for AI-powered editing
  // Pass userId for per-user ownership of suggestions
  const {
    hasPendingSuggestions,
    hasOtherUserSuggestions,
    insertBlockSuggestion,
    acceptAllSuggestions: originalAcceptAllSuggestions,
    rejectAllSuggestions,
  } = useDiffSuggestion({ editor, userId: userInfo?.id || null });

  // Wrap acceptAllSuggestions to emit event
  const acceptAllSuggestions = useCallback(() => {
    originalAcceptAllSuggestions();
    // Emit event after accepting - tutorial can react if needed
    if (note?.workspace_id) {
      appEvents.emitNoteAISuggestionAccepted(id, note.workspace_id);
    }
  }, [originalAcceptAllSuggestions, appEvents, note?.workspace_id, id]);

  // Convert Y.Doc to annotated markdown locally (no API call needed)
  const fetchYdocMarkdown = useCallback((): string => {
    if (!ydoc) {
      return '(no Y.Doc available)';
    }

    try {
      const markdown = yDocToAnnotatedMarkdown(ydoc);
      return markdown || '(empty document)';
    } catch (err) {
      console.error('Failed to convert Y.Doc to markdown:', err);
      return '(error converting Y.Doc to markdown)';
    }
  }, [ydoc]);

  // Helper: Find block position by blockId attribute
  const findBlockPosition = useCallback(
    (blockId: string): number | null => {
      if (!editor) return null;

      let foundPos: number | null = null;
      editor.state.doc.descendants((node, pos) => {
        if (node.attrs.blockId === blockId) {
          foundPos = pos;
          return false; // Stop searching
        }
      });

      return foundPos;
    },
    [editor]
  );

  // Helper: Wrap an existing block in a delete suggestion
  const wrapBlockInDeleteSuggestion = useCallback(
    (blockPos: number, suggestionId: string) => {
      if (!editor || !userInfo?.id) return false;

      const node = editor.state.doc.nodeAt(blockPos);
      if (!node) return false;

      // Use a Y.Doc-aware transaction through the chain API
      return editor
        .chain()
        .command(({ tr, state }) => {
          // Get the node again in the transaction context
          const currentNode = tr.doc.nodeAt(blockPos);
          if (!currentNode) return false;

          // Create a diffSuggestionBlock with type='deleted' wrapping the entire node
          // This preserves the node's type (heading, paragraph, etc.) and all its styling
          const diffBlock = state.schema.nodes.diffSuggestionBlock.create(
            {
              type: 'deleted',
              suggestionId,
              userId: userInfo.id,
            },
            [currentNode] // Wrap the entire node as a child, not just its content
          );

          // Replace the original node with the wrapped version
          tr.replaceWith(blockPos, blockPos + currentNode.nodeSize, diffBlock);
          return true;
        })
        .run();
    },
    [editor, userInfo]
  );

  // Handle AI suggestion request
  const handleAISuggest = useCallback(async () => {
    if (!aiInstruction.trim() || aiLoading || !editor) return;

    const instructionText = aiInstruction; // Save instruction before clearing
    setAiLoading(true);
    setAiError(null);

    // Emit loading event immediately when AI starts processing
    if (note?.workspace_id) {
      appEvents.emitNoteAISuggestionRequested(
        id,
        note.workspace_id,
        instructionText
      );
    }

    try {
      // Get fresh annotated markdown with block IDs from local Y.Doc
      const annotatedMarkdown = fetchYdocMarkdown();

      // Call AI with annotated markdown (AI will convert to simple IDs internally)
      const suggestions = await getAISuggestions(
        annotatedMarkdown,
        aiInstruction
      );

      if (suggestions.length === 0) {
        setAiError('No suggestions generated');
        return;
      }

      // Sort suggestions: insert_after first, then replace, then delete
      // This prevents position shifts from affecting later operations
      const sortedSuggestions = [...suggestions].sort((a, b) => {
        const order = { insert_after: 0, replace: 1, delete: 2 };
        return order[a.action] - order[b.action];
      });

      // Apply each suggestion to the CORRECT block by targeting block_id
      // Process suggestions sequentially with small delays to ensure Y.Doc sync
      for (let i = 0; i < sortedSuggestions.length; i++) {
        const suggestion = sortedSuggestions[i];

        // Find the actual block position by its ID
        const blockPos = findBlockPosition(suggestion.block_id);

        if (blockPos === null) {
          console.warn(`Block ${suggestion.block_id} not found in editor`);
          continue;
        }

        // Generate a unique suggestion ID for this change
        const suggestionId = `suggestion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${i}`;

        if (
          suggestion.action === 'replace' &&
          suggestion.suggested_text &&
          suggestion.suggested_text.length > 0
        ) {
          // For replace: wrap existing block in delete suggestion, then insert added blocks after
          // Get the node size before wrapping to calculate the new position
          const originalNode = editor.state.doc.nodeAt(blockPos);
          if (!originalNode) continue;

          // Check if the original node is empty (appears empty to the user)
          const nodeText = originalNode.textContent.trim();
          const isNodeEmpty = nodeText.length === 0;

          if (isNodeEmpty) {
            // If the node is empty, delete it directly without wrapping in a suggestion
            editor
              .chain()
              .command(({ tr }) => {
                const node = tr.doc.nodeAt(blockPos);
                if (!node) return false;
                tr.delete(blockPos, blockPos + node.nodeSize);
                return true;
              })
              .run();

            await new Promise(resolve => setTimeout(resolve, 10));

            // Position cursor at the deletion point to insert the new content
            editor.commands.setTextSelection(blockPos);

            // Combine all text blocks into a single markdown string
            const combinedMarkdown = suggestion.suggested_text.join('\n\n');

            // Insert as a single suggestion containing all blocks
            insertBlockSuggestion('added', combinedMarkdown);
            await new Promise(resolve => setTimeout(resolve, 10));
          } else {
            // If the node has content, wrap it in a delete suggestion
            const wrapped = wrapBlockInDeleteSuggestion(blockPos, suggestionId);

            if (wrapped) {
              // Small delay to let Y.Doc process the change
              await new Promise(resolve => setTimeout(resolve, 10));

              // The wrapped block is now at blockPos, find its size in the current state
              const wrappedNode = editor.state.doc.nodeAt(blockPos);
              if (wrappedNode) {
                // Position cursor after the wrapped block to insert the added suggestion
                const afterPos = blockPos + wrappedNode.nodeSize;
                editor.commands.setTextSelection(afterPos);

                // Combine all text blocks into a single markdown string
                // Each block is separated by double newlines to ensure proper parsing
                const combinedMarkdown = suggestion.suggested_text.join('\n\n');

                // Insert as a single suggestion containing all blocks
                insertBlockSuggestion('added', combinedMarkdown);
                await new Promise(resolve => setTimeout(resolve, 10));
              }
            }
          }
        } else if (
          suggestion.action === 'insert_after' &&
          suggestion.suggested_text &&
          suggestion.suggested_text.length > 0
        ) {
          // For insert_after: insert new content after the target block
          // Multiple inserts for the same block are combined into a single suggestion
          const node = editor.state.doc.nodeAt(blockPos);
          if (node) {
            const afterPos = blockPos + node.nodeSize;
            editor.commands.setTextSelection(afterPos);

            // Combine all text blocks into a single markdown string
            // Each block is separated by double newlines to ensure proper parsing
            const combinedMarkdown = suggestion.suggested_text.join('\n\n');

            // Insert as a single suggestion containing all blocks
            insertBlockSuggestion('added', combinedMarkdown);
            await new Promise(resolve => setTimeout(resolve, 10));
          }
        } else if (suggestion.action === 'delete') {
          // For delete: wrap the existing block in a delete suggestion (don't create new content)
          wrapBlockInDeleteSuggestion(blockPos, suggestionId);
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      }

      // Clear instruction after successful application
      setAiInstruction('');

      // Note: The AI_SUGGESTION_REQUESTED event was already emitted when loading started
      // No need to emit again here
    } catch (err) {
      console.error('AI suggestion failed:', err);
      setAiError(
        err instanceof Error ? err.message : 'Failed to get AI suggestions'
      );
    } finally {
      setAiLoading(false);
    }
  }, [
    aiInstruction,
    aiLoading,
    editor,
    fetchYdocMarkdown,
    insertBlockSuggestion,
    findBlockPosition,
    wrapBlockInDeleteSuggestion,
    appEvents,
    note?.workspace_id,
    id,
  ]);

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
    return <NoteEditorSkeleton />;
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
  if (!editor) {
    return <NoteEditorSkeleton />;
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
        onSelectAllAssignees={() => selectAllAssignees(members.map(m => m.id))}
      />

      <div className='hidden md:block'>
        <NoteEditorToolbar
          editor={editor}
          uploadingImage={uploadingImage}
          canUploadImage={!!note?.workspace_id}
          onImageUpload={triggerImageInput}
          onToggleTaskList={handleToggleTaskList}
          isGroupNote={isGroupNote}
        />
      </div>

      {/* Floating Accept/Reject All Buttons */}
      {hasPendingSuggestions && (
        <GlassCard className='absolute rounded-3xl bottom-24 md:bottom-20 left-1/2 transform -translate-x-1/2 z-50 flex gap-2 items-center px-3 py-2'>
          <GlassButton
            onClick={rejectAllSuggestions}
            className='flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 hover:scale-105'
          >
            <X className='w-4 h-4' /> Reject
          </GlassButton>
          <GlassButton
            onClick={acceptAllSuggestions}
            data-shepherd-target='note-accept-button'
            className='flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all bg-green-500/15 text-green-300 border-green-500/20 hover:bg-green-500/25 hover:text-green-200 hover:border-green-500/40 hover:scale-105'
          >
            <Check className='w-4 h-4' /> Accept
          </GlassButton>
        </GlassCard>
      )}

      {/* Info bar for other users' suggestions */}
      {hasOtherUserSuggestions && !hasPendingSuggestions && (
        <div className='mx-4 md:mx-6 mb-2 px-4 py-2 bg-linear-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 rounded-lg'>
          <span className='text-sm text-gray-400'>
            Other users have pending suggestions (shown in muted colors)
          </span>
        </div>
      )}

      {/* Editor Content */}
      <div
        className='flex flex-col flex-1 px-4 md:px-8 md:pt-4 relative z-10 overflow-auto'
        style={{
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className='flex-1 min-h-full' data-shepherd-target='note-editor'>
          <EditorContent editor={editor} />
          <div className='h-1/2'></div>
        </div>
      </div>

      {/* Hidden image input */}
      <input
        ref={imageInputRef}
        type='file'
        accept='image/png,image/jpeg,image/jpg,image/gif,image/webp'
        className='hidden'
        onChange={handleImageUpload}
      />

      {/* Mobile: Unified toolbar with AI input / regular buttons */}
      <MobileFloatingToolbar
        editor={editor}
        uploadingImage={uploadingImage}
        canUploadImage={!!note?.workspace_id}
        onImageUpload={triggerImageInput}
        onToggleTaskList={handleToggleTaskList}
        isGroupNote={isGroupNote}
        isEditorFocused={isEditorFocused}
        aiInstruction={aiInstruction}
        aiLoading={aiLoading}
        aiError={aiError}
        onInstructionChange={setAiInstruction}
        onSuggest={handleAISuggest}
      />

      {/* Desktop AI Input - always visible on desktop */}
      <div className='hidden md:block'>
        <DesktopAIInput
          aiInstruction={aiInstruction}
          aiLoading={aiLoading}
          aiError={aiError}
          onInstructionChange={setAiInstruction}
          onSuggest={handleAISuggest}
        />
      </div>

      <EditorStyles />
      <CollaborativeEditorStyles />
    </div>
  );
}

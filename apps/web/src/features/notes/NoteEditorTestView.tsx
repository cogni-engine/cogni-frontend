'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useNotes } from '@cogni/api';
import { EditorContent } from '@tiptap/react';
import { getPersonalWorkspaceId } from '@cogni/utils';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import {
  Copy,
  Check,
  X,
  FileJson,
  FileCode,
  RefreshCw,
  Sparkles,
  Loader2,
  ArrowUp,
} from 'lucide-react';
import { TaskListChain } from './types';
import { NoteEditorHeader } from './components/NoteEditorHeader';
import { NoteEditorToolbar } from './components/NoteEditorToolbar';
import { EditorStyles } from './lib/editorStyles';
import { CollaborativeEditorStyles } from './lib/collaborativeEditorStyles';
import {
  useCollaborativeEditor,
  generateUserColor,
} from './hooks/useCollaborativeEditor';
import { useNoteAssignments } from './hooks/useNoteAssignments';
import { useEditorImageUpload } from './hooks/useEditorImageUpload';
import { useDiffSuggestion } from './hooks/useDiffSuggestion';
import {
  getNote,
  updateNoteTitle,
  getNoteMarkdown,
  getAISuggestions,
} from '@/lib/api/notesApi';
import { createClient } from '@/lib/supabase/browserClient';
import type { Note } from '@/types/note';
import GlassCard from '@/components/glass-design/GlassCard';
import GlassButton from '@/components/glass-design/GlassButton';

export function NoteEditorTestView({ noteId }: { noteId: string }) {
  const router = useRouter();
  const id = parseInt(noteId, 10);
  const isValidId = !isNaN(id);

  // Debug panel state - all three views
  const [jsonContent, setJsonContent] = useState('');
  const [ydocMarkdown, setYdocMarkdown] = useState('');
  const [ydocLoading, setYdocLoading] = useState(false);
  const [copiedPanel, setCopiedPanel] = useState<
    'json' | 'text' | 'ydoc' | null
  >(null);

  // AI suggestion state
  const [aiInstruction, setAiInstruction] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

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
          if (data.title) {
            setTitle(data.title);
          }
        } else {
          setError('Note not found');
        }
      } catch (err) {
        console.error('Failed to fetch note:', err);
        setError('Failed to load note');
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id, isValidId]);

  // Cleanup title save timeout
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

  // Use diff suggestion hook
  const {
    hasPendingSuggestions,
    insertSuggestion,
    insertBlockSuggestion,
    acceptAllSuggestions,
    rejectAllSuggestions,
  } = useDiffSuggestion({ editor, userId: userInfo?.id || null });

  // Fetch Y.Doc markdown from backend
  const fetchYdocMarkdown = useCallback(async (): Promise<string> => {
    if (!isValidId) return '';
    setYdocLoading(true);
    try {
      const markdown = await getNoteMarkdown(id);
      const result = markdown || '(empty document)';
      setYdocMarkdown(result);
      return result; // Return the fresh markdown
    } catch (err) {
      console.error('Failed to fetch Y.Doc markdown:', err);
      const error = '(error fetching Y.Doc markdown)';
      setYdocMarkdown(error);
      return error;
    } finally {
      setYdocLoading(false);
    }
  }, [id, isValidId]);

  // Update debug panels when editor content changes
  useEffect(() => {
    if (!editor) return;

    const updateDebugContent = () => {
      // Get JSON
      const json = editor.getJSON();
      setJsonContent(JSON.stringify(json, null, 2));
    };

    // Initial update
    updateDebugContent();

    // Subscribe to changes
    editor.on('update', updateDebugContent);

    return () => {
      editor.off('update', updateDebugContent);
    };
  }, [editor]);

  // Fetch Y.Doc markdown when synced or on initial load
  useEffect(() => {
    if (isSynced) {
      fetchYdocMarkdown();
    }
  }, [isSynced, fetchYdocMarkdown]);

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
    }
  };

  // Handle AI suggestion test
  const handleTestAISuggestion = useCallback(() => {
    if (!editor || !userInfo?.id) return;

    const { from, to } = editor.state.selection;
    const hasSelection = from !== to;

    if (hasSelection) {
      const selectedText = editor.state.doc.textBetween(from, to);
      let improvedText: string;
      if (selectedText.length < 20) {
        improvedText = `${selectedText} — enhanced`;
      } else {
        improvedText = `[Rewritten] ${selectedText.charAt(0).toUpperCase()}${selectedText.slice(1)}`;
      }
      insertSuggestion(improvedText, selectedText);
    } else {
      const userId = userInfo.id;
      const ts = Date.now();
      const ids = {
        demo: `demo-${ts}`,
      };

      const inlineHtml = `
        <p>Test: <span data-diff-suggestion data-diff-type="deleted" data-suggestion-id="${ids.demo}" data-user-id="${userId}">old text</span><span data-diff-suggestion data-diff-type="added" data-suggestion-id="${ids.demo}" data-user-id="${userId}">new text</span></p>
      `;

      editor.chain().focus('end').insertContent(inlineHtml).run();
    }
  }, [editor, userInfo, insertSuggestion]);

  // Handle title change
  const handleTitleChange = useCallback(
    (newTitle: string) => {
      setTitle(newTitle);

      if (titleSaveTimeoutRef.current) {
        clearTimeout(titleSaveTimeoutRef.current);
      }

      titleSaveTimeoutRef.current = setTimeout(async () => {
        if (note?.id) {
          try {
            await updateNoteTitle(note.id, newTitle);
          } catch (error) {
            console.error('Failed to save title:', error);
          }
        }
      }, 500);
    },
    [note?.id]
  );

  // Copy to clipboard for a specific panel
  const handleCopy = useCallback(
    (panel: 'json' | 'text' | 'ydoc', content: string) => {
      navigator.clipboard.writeText(content);
      setCopiedPanel(panel);
      setTimeout(() => setCopiedPanel(null), 2000);
    },
    []
  );

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

      const { tr } = editor.state;

      // Create a diffSuggestionBlock with type='deleted' wrapping the existing content
      const diffBlock = editor.schema.nodes.diffSuggestionBlock.create(
        {
          type: 'deleted',
          suggestionId,
          userId: userInfo.id,
        },
        node.content
      );

      // Replace the original node with the wrapped version
      tr.replaceWith(blockPos, blockPos + node.nodeSize, diffBlock);
      editor.view.dispatch(tr);

      return true;
    },
    [editor, userInfo]
  );

  // Handle AI suggestion request
  const handleAISuggest = useCallback(async () => {
    if (!aiInstruction.trim() || !ydocMarkdown || aiLoading || !editor) return;

    setAiLoading(true);
    setAiError(null);

    try {
      // Fetch fresh annotated markdown with block IDs from Hocuspocus
      const annotatedMarkdown = await fetchYdocMarkdown(); // Use returned value directly!

      // Get plain text from the editor (for AI processing)
      const plainMarkdown = editor.getText();

      // Call AI with both versions: plain for AI processing, annotated for block ID mapping
      const suggestions = await getAISuggestions(
        plainMarkdown,
        annotatedMarkdown,
        aiInstruction
      );

      if (suggestions.length === 0) {
        setAiError('No suggestions generated');
        return;
      }

      // Apply each suggestion to the CORRECT block by targeting block_id
      for (const suggestion of suggestions) {
        // Find the actual block position by its ID
        const blockPos = findBlockPosition(suggestion.block_id);

        if (blockPos === null) {
          console.warn(`Block ${suggestion.block_id} not found in editor`);
          continue;
        }

        // Generate a unique suggestion ID for this change
        const suggestionId = `suggestion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        if (suggestion.action === 'replace' && suggestion.suggested_text) {
          // For replace: wrap existing block in delete suggestion, then insert added block after
          const wrapped = wrapBlockInDeleteSuggestion(blockPos, suggestionId);

          if (wrapped) {
            // Position cursor after the wrapped block to insert the added suggestion
            const node = editor.state.doc.nodeAt(blockPos);
            if (node) {
              const afterPos = blockPos + node.nodeSize;
              editor.commands.setTextSelection(afterPos);
              insertBlockSuggestion('added', suggestion.suggested_text);
            }
          }
        } else if (
          suggestion.action === 'insert_after' &&
          suggestion.suggested_text
        ) {
          // For insert_after: insert new content after the target block
          const node = editor.state.doc.nodeAt(blockPos);
          if (node) {
            const afterPos = blockPos + node.nodeSize;
            editor.commands.setTextSelection(afterPos);
            insertBlockSuggestion('added', suggestion.suggested_text);
          }
        } else if (suggestion.action === 'delete') {
          // For delete: wrap the existing block in a delete suggestion (don't create new content)
          wrapBlockInDeleteSuggestion(blockPos, suggestionId);
        }
      }

      // Clear instruction after successful application
      setAiInstruction('');
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
    ydocMarkdown,
    aiLoading,
    editor,
    fetchYdocMarkdown,
    insertBlockSuggestion,
    findBlockPosition,
    wrapBlockInDeleteSuggestion,
  ]);

  // Loading state
  if (loading) {
    return (
      <div className='flex flex-col h-full bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
      </div>
    );
  }

  // Error state
  if (error || !note) {
    return (
      <div className='flex flex-col h-full bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center p-6'>
        <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-red-300 max-w-md'>
          <h2 className='font-bold mb-2'>Error</h2>
          <p>{error || 'Note not found'}</p>
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
    <div className='flex h-full bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100'>
      <EditorStyles />
      <CollaborativeEditorStyles />

      {/* Hidden file input for image uploads */}
      <input
        ref={imageInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleImageUpload}
      />

      {/* Left: Editor */}
      <div className='flex-1 flex flex-col min-w-0 border-r border-white/10 relative'>
        {/* Header */}
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

        {/* Toolbar */}
        <NoteEditorToolbar
          editor={editor}
          uploadingImage={uploadingImage}
          canUploadImage={!!note?.workspace_id}
          onImageUpload={triggerImageInput}
          onToggleTaskList={handleToggleTaskList}
          aiSuggestionsEnabled={true}
          isSuggestionLoading={aiLoading}
          onToggleAI={handleTestAISuggestion}
        />

        {/* Editor Content */}
        <div className='flex-1 overflow-auto p-4 pb-32'>
          <EditorContent editor={editor} className='min-h-full' />
        </div>

        {/* Floating Accept/Reject All Buttons */}
        {hasPendingSuggestions && (
          <GlassCard className='absolute rounded-3xl bottom-24 left-1/2 transform -translate-x-1/2 z-50 flex gap-2 items-center px-3 py-2'>
            <GlassButton
              onClick={rejectAllSuggestions}
              className='flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 hover:scale-105'
            >
              <X className='w-4 h-4' /> Reject
            </GlassButton>
            <GlassButton
              onClick={acceptAllSuggestions}
              className='flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all bg-green-500/15 text-green-300 border-green-500/20 hover:bg-green-500/25 hover:text-green-200 hover:border-green-500/40 hover:scale-105'
            >
              <Check className='w-4 h-4' /> Accept
            </GlassButton>
          </GlassCard>
        )}

        {/* Chat-style AI Input at Bottom */}
        <div className='absolute bottom-0 left-0 right-0 z-100 px-4 py-3'>
          <div className='w-full max-w-4xl mx-auto'>
            <div className='relative'>
              <div className='w-full bg-white/2 backdrop-blur-sm rounded-4xl border border-black focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]'>
                <div className='flex items-center gap-2 px-4'>
                  <Sparkles className='w-4 h-4 text-purple-400 shrink-0' />
                  <input
                    type='text'
                    value={aiInstruction}
                    onChange={e => setAiInstruction(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAISuggest();
                      }
                    }}
                    placeholder='Ask AI to edit this note...'
                    className='flex-1 bg-transparent text-white py-3.5 pr-[60px] focus:outline-none placeholder-white/40'
                    disabled={aiLoading}
                  />
                </div>
              </div>
              {/* Send button */}
              <button
                onClick={handleAISuggest}
                disabled={aiLoading || !aiInstruction.trim()}
                className='absolute right-2.5 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-black text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/15 hover:scale-102 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]'
              >
                {aiLoading ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  <ArrowUp className='w-4 h-4' />
                )}
              </button>
            </div>
            {/* Error message */}
            {aiError && (
              <div className='mt-2 text-xs text-red-400 flex items-center gap-2 px-4'>
                <X className='w-3 h-3' />
                {aiError}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: Three Debug Panels Side by Side */}
      <div className='hidden lg:flex flex-1 min-w-0 mt-20'>
        {/* JSON Panel */}
        <div className='flex-1 flex flex-col bg-black/50 border-r border-white/10'>
          <div className='flex items-center justify-between border-b border-white/10 px-3 py-2'>
            <div className='flex items-center gap-1.5 text-blue-400'>
              <FileJson className='w-4 h-4' />
              <span className='text-sm font-medium'>JSON</span>
            </div>
            <button
              onClick={() => handleCopy('json', jsonContent)}
              className='flex items-center gap-1 px-2 py-1 rounded text-xs text-white/50 hover:text-white/80 hover:bg-white/5 transition'
            >
              {copiedPanel === 'json' ? (
                <Check className='w-3 h-3 text-green-400' />
              ) : (
                <Copy className='w-3 h-3' />
              )}
            </button>
          </div>
          <div className='flex-1 overflow-auto p-3'>
            <pre className='text-xs text-white/70 font-mono whitespace-pre-wrap break-all'>
              {jsonContent}
            </pre>
          </div>
          <div className='border-t border-white/10 px-3 py-1.5 text-xs text-white/40'>
            {jsonContent.length.toLocaleString()} chars{' '}
            {jsonContent.split('\n').length} lines
          </div>
        </div>

        {/* Y.Doc Markdown Panel */}
        <div className='flex-1 flex flex-col bg-black/50'>
          <div className='flex items-center justify-between border-b border-white/10 px-3 py-2'>
            <div className='flex items-center gap-1.5 text-amber-400'>
              <FileCode className='w-4 h-4' />
              <span className='text-sm font-medium'>Y.Doc MD</span>
            </div>
            <div className='flex items-center gap-1'>
              <button
                onClick={fetchYdocMarkdown}
                disabled={ydocLoading}
                className='flex items-center gap-1 px-2 py-1 rounded text-xs text-white/50 hover:text-white/80 hover:bg-white/5 transition disabled:opacity-50'
                title='Refresh Y.Doc markdown'
              >
                <RefreshCw
                  className={`w-3 h-3 ${ydocLoading ? 'animate-spin' : ''}`}
                />
              </button>
              <button
                onClick={() => handleCopy('ydoc', ydocMarkdown)}
                className='flex items-center gap-1 px-2 py-1 rounded text-xs text-white/50 hover:text-white/80 hover:bg-white/5 transition'
              >
                {copiedPanel === 'ydoc' ? (
                  <Check className='w-3 h-3 text-green-400' />
                ) : (
                  <Copy className='w-3 h-3' />
                )}
              </button>
            </div>
          </div>
          <div className='flex-1 overflow-auto p-3'>
            <pre className='text-xs text-white/70 font-mono whitespace-pre-wrap break-all'>
              {ydocLoading ? 'Loading...' : ydocMarkdown}
            </pre>
          </div>
          <div className='border-t border-white/10 px-3 py-1.5 text-xs text-white/40'>
            {ydocMarkdown.length.toLocaleString()} chars from server
          </div>
        </div>
      </div>
    </div>
  );
}

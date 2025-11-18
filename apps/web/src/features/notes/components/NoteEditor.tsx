'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import {
  useNoteEditor,
  useNotes,
  assignNoteToMembers,
  getNoteAssignments,
} from '@cogni/api';
import {
  ArrowLeft,
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Users,
  Image as ImageIcon,
  Loader2,
  CheckSquare,
  Sparkles,
} from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { getPersonalWorkspaceId } from '@cogni/utils';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { uploadWorkspaceFile, getFileUrl } from '@/lib/api/workspaceFilesApi';
import { CustomMention } from '@/lib/tiptap/MentionExtension';
import { createMentionSuggestion } from '@/lib/tiptap/mentionSuggestion';
import { NoteMention } from '@/lib/tiptap/NoteMentionExtension';
import { createNoteMentionSuggestion } from '@/lib/tiptap/noteMentionSuggestion';
import {
  syncNoteMemberMentions,
  syncNoteToNoteMentions,
} from '@/lib/api/mentionsApi';
import { createClient } from '@/lib/supabase/browserClient';
import { useAICompletion } from '@/hooks/useAICompletion';
import { AiCompletion } from '@/lib/tiptap/AiCompletionExtension';
import { useCopilotReadable } from '@copilotkit/react-core';

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  icon: React.ReactNode;
  title: string;
}

type ToggleCommand = {
  run: () => void;
};

type TaskListChain = {
  toggleTaskList?: () => ToggleCommand;
};

type StrikeChain = {
  toggleStrike?: () => ToggleCommand;
};

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  icon,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition-all ${
        isActive
          ? 'bg-white/20 text-white'
          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon}
    </button>
  );
}

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

  // Assignment state
  const [showAssignmentDropdown, setShowAssignmentDropdown] = useState(false);
  const [assigneeIds, setAssigneeIds] = useState<number[]>([]);
  const [savingAssignment, setSavingAssignment] = useState(false);

  // Image upload state
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // AI Completion state
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(() => {
    // Load from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aiSuggestionsEnabled');
      return saved !== null ? saved === 'true' : true; // Default to enabled
    }
    return true;
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

  // Track initial loaded state to compare against
  const [initialAssigneeIds, setInitialAssigneeIds] = useState<number[]>([]);
  const [assignmentsLoaded, setAssignmentsLoaded] = useState(false);

  // Mention state
  const [currentMemberId, setCurrentMemberId] = useState<number | null>(null);
  const supabase = createClient();

  // Use a ref to always get the latest members for mention suggestions
  const membersRef = useRef<typeof members>([]);
  membersRef.current = members;

  // Use a ref to always get the latest notes for note mention suggestions
  // Filter out the current note from the suggestions
  const notesRef = useRef<typeof workspaceNotes>([]);
  notesRef.current = workspaceNotes.filter(n => n.id !== id);

  // Get current user's workspace member ID
  useEffect(() => {
    if (isGroupNote && note?.workspace_id && members.length > 0) {
      const getCurrentMember = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const member = members.find(m => m.user_id === user.id);
          if (member) {
            setCurrentMemberId(member.id);
          }
        }
      };
      getCurrentMember();
    }
  }, [isGroupNote, note?.workspace_id, members, supabase.auth]);

  // Load existing assignments
  useEffect(() => {
    if (isGroupNote && note?.id) {
      getNoteAssignments(note.id)
        .then(({ assignees }) => {
          const assigneeIdsList = assignees
            .map((a: { workspace_member?: { id?: number } }) => {
              return a.workspace_member?.id;
            })
            .filter((id): id is number => typeof id === 'number');

          setAssigneeIds(assigneeIdsList);
          setInitialAssigneeIds(assigneeIdsList);
          setAssignmentsLoaded(true);
        })
        .catch(err => {
          console.error('Failed to load assignments:', err);
          setAssignmentsLoaded(true);
        });
    }
  }, [isGroupNote, note?.id]);

  // Auto-save assignments when changed (only if different from initial)
  useEffect(() => {
    if (!isGroupNote || !note?.id || savingAssignment || !assignmentsLoaded)
      return;

    // Check if there's an actual change from the initial state
    const hasChanged =
      assigneeIds.length !== initialAssigneeIds.length ||
      assigneeIds.some(id => !initialAssigneeIds.includes(id)) ||
      initialAssigneeIds.some(id => !assigneeIds.includes(id));

    if (!hasChanged) return;

    const saveAssignments = async () => {
      try {
        setSavingAssignment(true);
        await assignNoteToMembers(note.id, [], assigneeIds);
        // Update initial state after successful save
        setInitialAssigneeIds(assigneeIds);
      } catch (err) {
        console.error('Failed to save assignments:', err);
      } finally {
        setSavingAssignment(false);
      }
    };

    const timeout = setTimeout(saveAssignments, 500);
    return () => clearTimeout(timeout);
  }, [
    assigneeIds,
    initialAssigneeIds,
    isGroupNote,
    note?.id,
    savingAssignment,
    assignmentsLoaded,
  ]);

  const toggleAssignee = (memberId: number) => {
    if (assigneeIds.includes(memberId)) {
      setAssigneeIds(assigneeIds.filter(id => id !== memberId));
    } else {
      setAssigneeIds([...assigneeIds, memberId]);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor || !note?.workspace_id) return;

    // Validate it's an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      e.target.value = '';
      return;
    }

    setUploadingImage(true);
    try {
      // Upload to workspace storage
      const uploaded = await uploadWorkspaceFile(note.workspace_id, file);

      // Insert image into editor at current cursor position
      // Store file ID in data attribute for later URL refresh
      const { state, view } = editor;
      const { from } = state.selection;

      // Insert image with all attributes including data-file-id
      const imageNode = state.schema.nodes.image.create({
        src: uploaded.url,
        alt: uploaded.original_filename,
        'data-file-id': uploaded.id.toString(),
      });

      const tr = state.tr.insert(from, imageNode);
      view.dispatch(tr);
      editor.commands.focus();

      // Reset input
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const triggerImageInput = () => {
    imageInputRef.current?.click();
  };

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

  // Initialize TipTap editor
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      // AI Completion FIRST - needs to capture Tab before other extensions
      AiCompletion.configure({
        suggestion: null,
        onAccept: () => {},
        onDismiss: () => {},
        enabled: aiSuggestionsEnabled,
      }),
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        code: false,
      }),
      Placeholder.configure({
        placeholder: 'メモを入力...',
      }),
      Image.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            'data-file-id': {
              default: null,
              parseHTML: element => element.getAttribute('data-file-id'),
              renderHTML: attributes => {
                if (!attributes['data-file-id']) {
                  return {};
                }
                return {
                  'data-file-id': attributes['data-file-id'],
                };
              },
            },
          };
        },
      }).configure({
        inline: true,
        allowBase64: false,
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: 'task-list',
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'task-item',
        },
      }),
      // Add member mention extension only for group notes
      ...(isGroupNote
        ? [
            CustomMention.configure({
              HTMLAttributes: {
                class: 'mention',
              },
              suggestion: createMentionSuggestion(() => membersRef.current),
            }),
          ]
        : []),
      // Add note mention extension (available in all workspaces)
      NoteMention.configure({
        HTMLAttributes: {
          class: 'note-mention',
        },
        suggestion: createNoteMentionSuggestion(() => notesRef.current),
      }),
      Markdown,
    ],
    content: content || '',
    contentType: 'markdown',
    editorProps: {
      attributes: {
        class:
          'prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none max-w-none min-h-full text-gray-300',
      },
    },
    onUpdate: ({ editor }) => {
      const markdown = editor.getMarkdown();
      setContent(markdown);
    },
  });

  // Store note title in a ref for AI context
  const noteTitleRef = useRef(title);
  useEffect(() => {
    noteTitleRef.current = title;
  }, [title]);

  // Expose editor to window for debugging (optional, can be removed in production)
  useEffect(() => {
    if (editor && typeof window !== 'undefined') {
      (window as any).__TIPTAP_EDITOR__ = editor;
    }
  }, [editor]);

  // AI Completion hook
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
    debounceMs: 1000, // 1 second after user stops typing
  });

  // Clear suggestion when cursor moves
  const lastCursorPosRef = useRef<number | null>(null);
  useEffect(() => {
    if (!editor || !aiSuggestionsEnabled) return;

    const updateHandler = () => {
      const currentPos = editor.state.selection.from;

      // If cursor moved and we have a suggestion, clear it
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
      // Store callbacks in extension options
      const aiCompletionExt = editor.extensionManager.extensions.find(
        ext => ext.name === 'aiCompletion'
      );
      if (aiCompletionExt) {
        aiCompletionExt.options.onAccept = acceptSuggestion;
        aiCompletionExt.options.onDismiss = dismissSuggestion;
      }

      // Pass suggestion through transaction metadata
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

    // Don't request new suggestions if we already have one showing (saves tokens)
    if (suggestion) {
      console.log('⏹️ Skipping - suggestion already showing');
      return;
    }

    // Get text around cursor for context
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

  // Function to extract mentioned member IDs from editor content
  const extractMemberMentions = useCallback(() => {
    if (!editor) return [];

    const mentionedIds: number[] = [];
    editor.state.doc.descendants(node => {
      if (node.type.name === 'mention' && node.attrs.workspaceMemberId) {
        mentionedIds.push(node.attrs.workspaceMemberId);
      }
    });

    return [...new Set(mentionedIds)]; // Remove duplicates
  }, [editor]);

  // Function to extract mentioned note IDs from editor content
  const extractNoteMentions = useCallback(() => {
    if (!editor) return [];

    const mentionedNoteIds: number[] = [];
    editor.state.doc.descendants(node => {
      if (node.type.name === 'noteMention' && node.attrs.noteId) {
        mentionedNoteIds.push(node.attrs.noteId);
      }
    });

    return [...new Set(mentionedNoteIds)]; // Remove duplicates
  }, [editor]);

  // Update editor content when content from hook changes (e.g., after loading)
  useEffect(() => {
    if (editor && content !== undefined && !editor.isDestroyed) {
      const currentMarkdown = editor.getMarkdown();
      // Only update if the content is actually different to avoid cursor jumps
      if (currentMarkdown !== content) {
        editor.commands.setContent(content || '', { contentType: 'markdown' });

        // Refresh image URLs after content is loaded (for expired signed URLs)
        const refreshImageUrls = async () => {
          const images: Array<{
            node: { attrs: Record<string, unknown> };
            pos: number;
            fileId: number;
          }> = [];

          editor.state.doc.descendants((node, pos) => {
            if (node.type.name === 'image') {
              const fileId = node.attrs['data-file-id'];
              if (fileId) {
                images.push({ node, pos, fileId: parseInt(fileId, 10) });
              }
            }
          });

          if (images.length === 0) return;

          // Refresh URLs for all images with file IDs
          for (const { node, pos, fileId } of images) {
            try {
              const newUrl = await getFileUrl(fileId);
              if (newUrl && newUrl !== node.attrs.src) {
                // Update the image at this position
                const tr = editor.state.tr;
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  src: newUrl,
                });
                editor.view.dispatch(tr);
              }
            } catch (error) {
              console.error('Error refreshing image URL:', error);
            }
          }
        };

        // Small delay to ensure content is fully loaded
        setTimeout(refreshImageUrls, 500);
      }
    }
  }, [content, editor]);

  // Auto-save member mentions when content changes
  useEffect(() => {
    if (
      !isGroupNote ||
      !note?.id ||
      !note?.workspace_id ||
      !currentMemberId ||
      !editor
    )
      return;

    const saveMemberMentions = async () => {
      try {
        const mentionedMemberIds = extractMemberMentions();
        await syncNoteMemberMentions(
          note.id,
          note.workspace_id,
          mentionedMemberIds,
          currentMemberId
        );
      } catch (err) {
        console.error('Failed to save member mentions:', err);
      }
    };

    const timeout = setTimeout(saveMemberMentions, 1000);
    return () => clearTimeout(timeout);
  }, [
    content,
    isGroupNote,
    note?.id,
    note?.workspace_id,
    currentMemberId,
    extractMemberMentions,
    editor,
  ]);

  // Auto-save note mentions when content changes
  useEffect(() => {
    if (!note?.id || !note?.workspace_id || !currentMemberId || !editor) return;

    const saveNoteMentions = async () => {
      try {
        const mentionedNoteIds = extractNoteMentions();
        await syncNoteToNoteMentions(
          note.id,
          note.workspace_id,
          mentionedNoteIds,
          currentMemberId
        );
      } catch (err) {
        console.error('Failed to save note mentions:', err);
      }
    };

    const timeout = setTimeout(saveNoteMentions, 1000);
    return () => clearTimeout(timeout);
  }, [
    content,
    note?.id,
    note?.workspace_id,
    currentMemberId,
    extractNoteMentions,
    editor,
  ]);

  // Validate that noteId is a valid number (after hooks)
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
      {/* ヘッダー */}
      <header className='flex items-center gap-3 px-4 md:px-6 py-6 relative z-100'>
        {/* 戻るボタン - 丸く浮き出る */}
        <button
          onClick={() => router.back()}
          className='w-[50px] h-[50px] rounded-full bg-white/10 backdrop-blur-xl text-white border border-black transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/15 hover:scale-102 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center'
        >
          <ArrowLeft className='w-5 h-5' />
        </button>
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='タイトル'
          className='flex-1 text-2xl font-bold bg-transparent focus:outline-none text-white placeholder-gray-500'
        />
        {/* Assignment button for group notes */}
        {isGroupNote && (
          <div className='relative'>
            <button
              onClick={() => setShowAssignmentDropdown(!showAssignmentDropdown)}
              className='w-[50px] h-[50px] rounded-full bg-white/10 backdrop-blur-xl text-white border border-black transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/15 hover:scale-102 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center relative'
              title='担当者'
            >
              <Users className='w-5 h-5' />
              {assigneeIds.length > 0 && (
                <span className='absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium'>
                  {assigneeIds.length}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {showAssignmentDropdown && (
              <>
                {/* Backdrop */}
                <div
                  className='fixed inset-0 z-30'
                  onClick={() => setShowAssignmentDropdown(false)}
                />
                {/* Dropdown menu */}
                <div className='absolute right-0 top-full mt-2 w-64 bg-white/10 backdrop-blur-xl border border-black rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] z-40 overflow-hidden'>
                  <div className='px-4 py-3 border-b border-black'>
                    <div className='text-sm font-medium text-white'>担当者</div>
                  </div>
                  <div className='max-h-64 overflow-y-auto'>
                    {members.length === 0 ? (
                      <div className='px-4 py-3 text-sm text-gray-400'>
                        メンバーがいません
                      </div>
                    ) : (
                      members.map(member => (
                        <button
                          key={member.id}
                          type='button'
                          onClick={() => toggleAssignee(member.id)}
                          className='w-full px-4 py-2.5 text-left text-sm hover:bg-white/10 transition-colors flex items-center gap-3'
                        >
                          <div
                            className={`w-5 h-5 border-2 rounded flex items-center justify-center shrink-0 ${
                              assigneeIds.includes(member.id)
                                ? 'bg-blue-500 border-blue-500'
                                : 'border-gray-600'
                            }`}
                          >
                            {assigneeIds.includes(member.id) && (
                              <svg
                                className='w-3.5 h-3.5 text-white'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={3}
                                  d='M5 13l4 4L19 7'
                                />
                              </svg>
                            )}
                          </div>
                          <span className='text-gray-300'>
                            {member.user_profile?.name || 'Unknown'}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </header>
      {/* Toolbar */}
      <div className='sticky top-0 z-20 flex flex-wrap gap-2 mx-2 px-3 py-3 rounded-2xl border border-white/10 bg-white/8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)]'>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={<Bold className='w-4 h-4' />}
          title='Bold'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={<Italic className='w-4 h-4' />}
          title='Italic'
        />
        <ToolbarButton
          onClick={() => {
            const chain = editor.chain().focus() as StrikeChain;
            if (chain.toggleStrike) {
              chain.toggleStrike().run();
            }
          }}
          isActive={editor.isActive('strike')}
          icon={<Strikethrough className='w-4 h-4' />}
          title='Strikethrough'
        />
        <div className='w-px h-6 bg-white/10 my-auto' />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={<List className='w-4 h-4' />}
          title='Bullet list'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={<ListOrdered className='w-4 h-4' />}
          title='Numbered list'
        />
        <ToolbarButton
          onClick={handleToggleTaskList}
          isActive={editor.isActive('taskList')}
          icon={<CheckSquare className='w-4 h-4' />}
          title='Task list'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          icon={<Quote className='w-4 h-4' />}
          title='Quote'
        />
        <div className='w-px h-6 bg-white/10 my-auto' />
        <ToolbarButton
          onClick={triggerImageInput}
          disabled={uploadingImage || !note?.workspace_id}
          icon={
            uploadingImage ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <ImageIcon className='w-4 h-4' />
            )
          }
          title='Insert Image'
        />
        <div className='w-px h-6 bg-white/10 my-auto' />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          icon={<Undo className='w-4 h-4' />}
          title='Undo'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          icon={<Redo className='w-4 h-4' />}
          title='Redo'
        />
        <div className='w-px h-6 bg-white/10 my-auto' />
        <ToolbarButton
          onClick={() => setAiSuggestionsEnabled(!aiSuggestionsEnabled)}
          isActive={aiSuggestionsEnabled}
          icon={
            isSuggestionLoading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <Sparkles className='w-4 h-4' />
            )
          }
          title={`AI Suggestions (${aiSuggestionsEnabled ? 'On' : 'Off'}) - Press Tab to accept`}
        />
      </div>

      {/* エディタ */}
      <div
        className='flex flex-col flex-1 px-4 md:px-6 relative z-10 overflow-auto'
        style={{
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Editor Content */}
        <div className='flex-1 min-h-0'>
          <EditorContent editor={editor} />
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

      <style jsx global>{`
        .ProseMirror {
          outline: none;
          min-height: 100%;
          padding: 0;
        }
        .ProseMirror p {
          margin: 0.75em 0;
        }
        .ProseMirror p:first-child {
          margin-top: 0;
        }
        .ProseMirror p:last-child {
          margin-bottom: 0;
        }
        .ProseMirror h1,
        .ProseMirror h2,
        .ProseMirror h3 {
          margin-top: 1em;
          margin-bottom: 0.5em;
          font-weight: 600;
          line-height: 1.2;
        }
        .ProseMirror h1 {
          font-size: 2em;
        }
        .ProseMirror h2 {
          font-size: 1.5em;
        }
        .ProseMirror h3 {
          font-size: 1.25em;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          margin: 0.75em 0;
          padding-left: 1.5em !important;
          list-style-position: outside !important;
        }
        .ProseMirror ul {
          list-style-type: disc !important;
        }
        .ProseMirror ul li {
          display: list-item !important;
          list-style-type: disc !important;
        }
        .ProseMirror ol {
          list-style-type: decimal !important;
        }
        .ProseMirror ol li {
          display: list-item !important;
          list-style-type: decimal !important;
        }
        .ProseMirror li {
          margin: 0.25em 0;
        }
        .ProseMirror ul.task-list,
        .ProseMirror ul[data-type='taskList'] {
          list-style: none !important;
          padding-left: 0 !important;
          margin: 0.75em 0;
        }
        .ProseMirror ul.task-list > li,
        .ProseMirror ul[data-type='taskList'] > li {
          list-style: none !important;
          display: flex !important;
          align-items: flex-start;
          gap: 0.6em;
          margin: 0.3em 0;
        }
        .ProseMirror ul.task-list > li::marker,
        .ProseMirror ul[data-type='taskList'] > li::marker {
          content: '';
        }
        .ProseMirror li.task-item,
        .ProseMirror li[data-type='taskItem'] {
          display: flex;
          align-items: flex-start;
          gap: 0.6em;
        }
        .ProseMirror li.task-item > label,
        .ProseMirror li[data-type='taskItem'] > label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          cursor: pointer;
          user-select: none;
          margin-top: 0.15em;
        }
        .ProseMirror li.task-item > label input[type='checkbox'],
        .ProseMirror li[data-type='taskItem'] > label input[type='checkbox'] {
          width: 1.1em;
          height: 1.1em;
          cursor: pointer;
          accent-color: rgba(59, 130, 246, 0.8);
          border-radius: 0.25em;
          margin: 0;
        }
        .ProseMirror li.task-item > div,
        .ProseMirror li[data-type='taskItem'] > div {
          flex: 1;
          min-width: 0;
        }
        .ProseMirror li.task-item[data-checked='true'] > div,
        .ProseMirror li[data-type='taskItem'][data-checked='true'] > div {
          text-decoration: line-through;
          opacity: 0.7;
          color: rgba(255, 255, 255, 0.5);
        }
        .ProseMirror blockquote {
          border-left: 3px solid rgba(255, 255, 255, 0.2);
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
          color: rgba(255, 255, 255, 0.7);
        }
        .ProseMirror strong {
          font-weight: 600;
        }
        .ProseMirror em {
          font-style: italic;
        }
        .ProseMirror s {
          text-decoration: line-through;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(156, 163, 175, 0.6);
          pointer-events: none;
          height: 0;
        }
        .ProseMirror img.editor-image {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1em 0;
          display: block;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .ProseMirror img.editor-image:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }
        .ProseMirror img.editor-image.ProseMirror-selectednode {
          outline: 2px solid rgba(59, 130, 246, 0.5);
          outline-offset: 2px;
        }
        /* Member mention styles */
        .ProseMirror .mention {
          color: rgb(96, 165, 250);
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s;
        }
        .ProseMirror .mention:hover {
          color: rgb(147, 197, 253);
        }
        /* Note mention styles */
        .ProseMirror .note-mention {
          color: rgb(22, 163, 74);
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s;
        }
        .ProseMirror .note-mention:hover {
          color: rgb(34, 197, 94);
        }
        /* AI Completion ghost text styles */
        .ProseMirror .ai-completion-ghost-text {
          color: rgb(156, 163, 175);
          opacity: 0.5;
          pointer-events: none;
          user-select: none;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

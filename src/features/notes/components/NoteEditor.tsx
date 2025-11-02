'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useNoteEditor } from '@/hooks/useNoteEditor';
import {
  ArrowLeft,
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Users,
} from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import Placeholder from '@tiptap/extension-placeholder';
import { getPersonalWorkspaceId } from '@/lib/cookies';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { assignNoteToMembers, getNoteAssignments } from '@/lib/api/notesApi';

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  icon: React.ReactNode;
  title: string;
}

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
    useNoteEditor(isValidId ? id : null);

  // Check if this is a group workspace note (not personal)
  const personalWorkspaceId = getPersonalWorkspaceId();
  const isGroupNote = note?.workspace_id !== personalWorkspaceId;

  // Assignment state
  const [showAssignmentDropdown, setShowAssignmentDropdown] = useState(false);
  const [assigneeIds, setAssigneeIds] = useState<number[]>([]);
  const [savingAssignment, setSavingAssignment] = useState(false);

  // Fetch workspace members if this is a group note
  const { members } = useWorkspaceMembers(
    isGroupNote && note?.workspace_id ? note.workspace_id : 0
  );

  // Track initial loaded state to compare against
  const [initialAssigneeIds, setInitialAssigneeIds] = useState<number[]>([]);
  const [assignmentsLoaded, setAssignmentsLoaded] = useState(false);

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

  // Initialize TipTap editor
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'メモを入力...',
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

  // Update editor content when content from hook changes (e.g., after loading)
  useEffect(() => {
    if (editor && content !== undefined && !editor.isDestroyed) {
      const currentMarkdown = editor.getMarkdown();
      // Only update if the content is actually different to avoid cursor jumps
      if (currentMarkdown !== content) {
        editor.commands.setContent(content || '', { contentType: 'markdown' });
      }
    }
  }, [content, editor]);

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

  if (!note && !loading) {
    return (
      <div className='flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center p-6'>
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
    <div
      className='flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 relative overflow-hidden'
      style={{
        willChange: 'scroll-position',
        transform: 'translateZ(0)',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* ヘッダー */}
      <header className='flex items-center gap-3 px-4 md:px-6 py-6 relative z-30'>
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
                            className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
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
      <div className='sticky top-0 z-20 flex flex-wrap gap-2 mb-4 p-3 border-b border-white/10 bg-slate-950/90 backdrop-blur-sm shadow-[0_6px_20px_rgba(0,0,0,0.35)]'>
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
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          icon={<Strikethrough className='w-4 h-4' />}
          title='Strikethrough'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          icon={<Code className='w-4 h-4' />}
          title='Inline code'
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
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          icon={<Quote className='w-4 h-4' />}
          title='Quote'
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
        .ProseMirror ul[data-type='taskList'] {
          list-style: none !important;
          padding: 0;
        }
        .ProseMirror ul[data-type='taskList'] li {
          display: flex;
        }
        .ProseMirror blockquote {
          border-left: 3px solid rgba(255, 255, 255, 0.2);
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
          color: rgba(255, 255, 255, 0.7);
        }
        .ProseMirror code {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-size: 0.9em;
          font-family: 'Courier New', monospace;
        }
        .ProseMirror pre {
          background: rgba(255, 255, 255, 0.05);
          padding: 1em;
          border-radius: 0.5em;
          margin: 1em 0;
          overflow-x: auto;
        }
        .ProseMirror pre code {
          background: transparent;
          padding: 0;
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
      `}</style>
    </div>
  );
}

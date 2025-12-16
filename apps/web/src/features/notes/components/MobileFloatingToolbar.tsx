'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Image as ImageIcon,
  Loader2,
  CheckSquare,
  Heading1,
  Heading2,
  Heading3,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { StrikeChain } from '../types';
import GlassCard from '@/components/glass-design/GlassCard';

interface MobileFloatingToolbarProps {
  editor: Editor | null;
  uploadingImage: boolean;
  canUploadImage: boolean;
  onImageUpload: () => void;
  onToggleTaskList: () => void;
}

export function MobileFloatingToolbar({
  editor,
  uploadingImage,
  canUploadImage,
  onImageUpload,
  onToggleTaskList,
}: MobileFloatingToolbarProps) {
  const [cursorTop, setCursorTop] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  const [renderTrigger, setRenderTrigger] = useState(0);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Track viewport height changes (for virtual keyboard)
  useEffect(() => {
    const handleResize = () => {
      // Use visualViewport for better keyboard detection on mobile
      const vh = window.visualViewport?.height ?? window.innerHeight;
      setViewportHeight(vh);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateCursorPosition = useCallback(() => {
    if (!editor) return;

    const { selection } = editor.state;
    const { from } = selection;

    // Get coordinates from the editor's view
    const coords = editor.view.coordsAtPos(from);

    if (coords) {
      // Position the toolbar below the cursor line
      const lineHeight = 32; // Approximate line height
      const toolbarHeight = 56; // Toolbar height
      const padding = 12;

      // Calculate position, ensuring toolbar stays visible
      let newTop = coords.bottom + padding;

      // Ensure toolbar doesn't go below visible viewport (accounting for keyboard)
      const maxTop = viewportHeight - toolbarHeight - padding;
      newTop = Math.min(newTop, maxTop);

      // Ensure toolbar doesn't go above the cursor
      newTop = Math.max(newTop, coords.top + lineHeight);

      setCursorTop(newTop);
    }
  }, [editor, viewportHeight]);

  const executeCommand = useCallback((command: () => void) => {
    command();
    setRenderTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (!editor) return;

    const handleFocus = () => {
      setIsVisible(true);
      // Small delay to ensure keyboard is fully shown
      setTimeout(updateCursorPosition, 100);
    };

    const handleBlur = () => {
      // Delay hiding to allow clicking toolbar buttons
      setTimeout(() => {
        if (!editor.isFocused) {
          setIsVisible(false);
        }
      }, 250);
    };

    const handleSelectionUpdate = () => {
      if (editor.isFocused) {
        updateCursorPosition();
        setRenderTrigger(prev => prev + 1);
      }
    };

    editor.on('focus', handleFocus);
    editor.on('blur', handleBlur);
    editor.on('selectionUpdate', handleSelectionUpdate);

    // Check initial focus state
    if (editor.isFocused) {
      setIsVisible(true);
      updateCursorPosition();
    }

    return () => {
      editor.off('focus', handleFocus);
      editor.off('blur', handleBlur);
      editor.off('selectionUpdate', handleSelectionUpdate);
    };
  }, [editor, updateCursorPosition]);

  if (!editor || !isVisible) return null;

  // Calculate safe top position (don't go off visible screen)
  const toolbarHeight = 56;
  const safeTop = cursorTop
    ? Math.min(Math.max(cursorTop, 80), viewportHeight - toolbarHeight - 8)
    : viewportHeight - toolbarHeight - 8;

  // Determine toolbar context for dynamic button display
  const getToolbarContext = () => {
    const { selection } = editor.state;
    const hasSelection = !selection.empty;

    return {
      // Element types
      isInParagraph: editor.isActive('paragraph'),
      isInHeading: editor.isActive('heading'),
      isInListItem: editor.isActive('listItem'),
      isInTaskItem: editor.isActive('taskItem'),
      isInBlockquote: editor.isActive('blockquote'),
      isOnImage: editor.isActive('image'),

      // Selection state
      hasSelection,
      canIndent: editor.can().sinkListItem('listItem'),
      canOutdent: editor.can().liftListItem('listItem'),
    };
  };

  const context = getToolbarContext();

  const ToolbarBtn = ({
    onClick,
    isActive,
    disabled,
    icon,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    icon: React.ReactNode;
    title: string;
  }) => (
    <button
      type='button'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
      onMouseDown={e => e.preventDefault()} // Prevent focus loss
      disabled={disabled}
      title={title}
      className={`shrink-0 p-2.5 rounded-xl transition-all ${
        isActive
          ? 'bg-white/25 text-white shadow-inner'
          : 'bg-white/8 text-gray-300 active:bg-white/15'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
      {icon}
    </button>
  );

  const Divider = () => <div className='shrink-0 w-px h-8 bg-white/10 mx-1' />;

  return (
    <div
      ref={toolbarRef}
      className='w-full md:hidden fixed left-0 right-0 z-50 pointer-events-none'
      style={{
        top: `${safeTop}px`,
        transition: 'top 0.12s ease-out',
      }}
    >
      <GlassCard className='pointer-events-auto p-2 mx-2 rounded-2xl'>
        <div className='flex gap-1 overflow-x-auto scrollbar-hide touch-pan-x w-full'>
          {/* Headings - show when not in lists or task items */}
          {(context.isInParagraph ||
            context.isInHeading ||
            context.isInBlockquote) &&
            !context.isInListItem &&
            !context.isInTaskItem && (
              <>
                <ToolbarBtn
                  onClick={() =>
                    executeCommand(() =>
                      editor.chain().focus().toggleHeading({ level: 1 }).run()
                    )
                  }
                  isActive={editor.isActive('heading', { level: 1 })}
                  icon={<Heading1 className='w-5 h-5' />}
                  title='Heading 1'
                />
                <ToolbarBtn
                  onClick={() =>
                    executeCommand(() =>
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    )
                  }
                  isActive={editor.isActive('heading', { level: 2 })}
                  icon={<Heading2 className='w-5 h-5' />}
                  title='Heading 2'
                />
                <ToolbarBtn
                  onClick={() =>
                    executeCommand(() =>
                      editor.chain().focus().toggleHeading({ level: 3 }).run()
                    )
                  }
                  isActive={editor.isActive('heading', { level: 3 })}
                  icon={<Heading3 className='w-5 h-5' />}
                  title='Heading 3'
                />
                <Divider />
              </>
            )}
          {/* Indent/outdent - show when in list items */}
          {(context.isInListItem || context.isInTaskItem) && (
            <>
              <ToolbarBtn
                onClick={() =>
                  executeCommand(() =>
                    editor.chain().focus().sinkListItem('listItem').run()
                  )
                }
                disabled={!context.canIndent}
                icon={<ChevronRight className='w-5 h-5' />}
                title='Indent'
              />
              <ToolbarBtn
                onClick={() =>
                  executeCommand(() =>
                    editor.chain().focus().liftListItem('listItem').run()
                  )
                }
                disabled={!context.canOutdent}
                icon={<ChevronLeft className='w-5 h-5' />}
                title='Outdent'
              />
              <Divider />
            </>
          )}

          {/* Text formatting - show when in text elements */}
          {(context.isInParagraph ||
            context.isInHeading ||
            context.isInListItem ||
            context.isInTaskItem ||
            context.isInBlockquote) && (
            <>
              <ToolbarBtn
                onClick={() =>
                  executeCommand(() =>
                    editor.chain().focus().toggleBold().run()
                  )
                }
                isActive={editor.isActive('bold')}
                icon={<Bold className='w-5 h-5' />}
                title='Bold'
              />
              <ToolbarBtn
                onClick={() =>
                  executeCommand(() =>
                    editor.chain().focus().toggleItalic().run()
                  )
                }
                isActive={editor.isActive('italic')}
                icon={<Italic className='w-5 h-5' />}
                title='Italic'
              />
              <ToolbarBtn
                onClick={() =>
                  executeCommand(() => {
                    const chain = editor.chain().focus() as StrikeChain;
                    if (chain.toggleStrike) {
                      chain.toggleStrike().run();
                    }
                  })
                }
                isActive={editor.isActive('strike')}
                icon={<Strikethrough className='w-5 h-5' />}
                title='Strikethrough'
              />
            </>
          )}

          {/* Lists and block elements - show when in paragraph or heading */}
          {(context.isInParagraph || context.isInHeading) && (
            <>
              <Divider />
              <ToolbarBtn
                onClick={() =>
                  executeCommand(() =>
                    editor.chain().focus().toggleBulletList().run()
                  )
                }
                isActive={editor.isActive('bulletList')}
                icon={<List className='w-5 h-5' />}
                title='Bullet list'
              />
              <ToolbarBtn
                onClick={() =>
                  executeCommand(() =>
                    editor.chain().focus().toggleOrderedList().run()
                  )
                }
                isActive={editor.isActive('orderedList')}
                icon={<ListOrdered className='w-5 h-5' />}
                title='Numbered list'
              />
              <ToolbarBtn
                onClick={() => executeCommand(onToggleTaskList)}
                isActive={editor.isActive('taskList')}
                icon={<CheckSquare className='w-5 h-5' />}
                title='Task list'
              />
              <ToolbarBtn
                onClick={() =>
                  executeCommand(() =>
                    editor.chain().focus().toggleBlockquote().run()
                  )
                }
                isActive={editor.isActive('blockquote')}
                icon={<Quote className='w-5 h-5' />}
                title='Quote'
              />
            </>
          )}

          {/* Image - show when not on image */}
          {!context.isOnImage && (
            <>
              <Divider />
              <ToolbarBtn
                onClick={() => executeCommand(onImageUpload)}
                disabled={uploadingImage || !canUploadImage}
                icon={
                  uploadingImage ? (
                    <Loader2 className='w-5 h-5 animate-spin' />
                  ) : (
                    <ImageIcon className='w-5 h-5' />
                  )
                }
                title='Insert Image'
              />
            </>
          )}

          {/* Undo/Redo - always show */}
          <Divider />
          <ToolbarBtn
            onClick={() =>
              executeCommand(() => editor.chain().focus().undo().run())
            }
            disabled={!editor.can().undo()}
            icon={<Undo className='w-5 h-5' />}
            title='Undo'
          />
          <ToolbarBtn
            onClick={() =>
              executeCommand(() => editor.chain().focus().redo().run())
            }
            disabled={!editor.can().redo()}
            icon={<Redo className='w-5 h-5' />}
            title='Redo'
          />
        </div>
      </GlassCard>
    </div>
  );
}

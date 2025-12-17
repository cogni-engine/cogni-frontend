'use client';

// TODO: this needs to be refactored

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
  const [isVisible, setIsVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined'
      ? (window.visualViewport?.height ?? window.innerHeight)
      : 800
  );
  // Use top positioning to handle iOS Safari visual viewport correctly
  const [toolbarTop, setToolbarTop] = useState<number | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateToolbarPosition = useCallback(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const vh = vv.height;
    const offsetTop = vv.offsetTop;
    const toolbarHeight = toolbarRef.current?.offsetHeight || 60;

    // Position toolbar at the bottom of the visual viewport
    // This accounts for both keyboard AND Safari's viewport scrolling
    const topPosition = offsetTop + vh - toolbarHeight;

    setViewportHeight(vh);
    setToolbarTop(topPosition);

    console.log('[MobileToolbar] updatePosition:', {
      visualViewportHeight: vh,
      offsetTop,
      toolbarHeight,
      topPosition,
    });
  }, []);

  // Track viewport height and scroll changes (for virtual keyboard + Safari viewport scroll)
  useEffect(() => {
    // Initial position
    updateToolbarPosition();

    window.visualViewport?.addEventListener('resize', updateToolbarPosition);
    window.visualViewport?.addEventListener('scroll', updateToolbarPosition);

    return () => {
      window.visualViewport?.removeEventListener(
        'resize',
        updateToolbarPosition
      );
      window.visualViewport?.removeEventListener(
        'scroll',
        updateToolbarPosition
      );
    };
  }, [updateToolbarPosition]);

  // Helper function to scroll cursor into view above toolbar
  const scrollCursorIntoView = useCallback(() => {
    if (!editor || !toolbarRef.current) return;

    // Debounce scroll calls
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      try {
        // Get the cursor position element
        const { view } = editor;
        const { state } = view;
        const { selection } = state;

        // Get DOM coordinates of the cursor
        const coords = view.coordsAtPos(selection.from);

        // Get toolbar height
        const toolbarHeight = toolbarRef.current?.offsetHeight || 60;

        // Calculate the available viewport (excluding toolbar)
        const availableViewportBottom = viewportHeight - toolbarHeight - 50; // 20px padding

        // Check if cursor is below the safe zone
        if (coords.top > availableViewportBottom) {
          // Find the scrollable container (the editor content wrapper)
          const editorElement = view.dom;
          const scrollContainer = editorElement.closest('.overflow-auto');

          if (scrollContainer) {
            // Calculate absolute scroll position (not relative offset)
            const scrollNeeded = coords.top - availableViewportBottom;
            const newScrollTop = scrollContainer.scrollTop + scrollNeeded;
            scrollContainer.scrollTo({
              top: newScrollTop,
              behavior: 'instant',
            });
          }
        }
      } catch (error) {
        console.error('Error scrolling cursor into view:', error);
      }
    }, 50);
  }, [editor, viewportHeight]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const executeCommand = useCallback((command: () => void) => {
    command();
  }, []);

  useEffect(() => {
    if (!editor) return;

    const handleFocus = () => {
      setIsVisible(true);
      // Scroll cursor into view when toolbar appears
      scrollCursorIntoView();
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
      // Force re-render to update button states
      if (editor.isFocused) {
        setIsVisible(true);
        // Scroll cursor into view when selection changes (e.g., pressing Enter)
        scrollCursorIntoView();
      }
    };

    editor.on('focus', handleFocus);
    editor.on('blur', handleBlur);
    editor.on('selectionUpdate', handleSelectionUpdate);

    // Check initial focus state
    if (editor.isFocused) {
      setIsVisible(true);
      scrollCursorIntoView();
    }

    return () => {
      editor.off('focus', handleFocus);
      editor.off('blur', handleBlur);
      editor.off('selectionUpdate', handleSelectionUpdate);
    };
  }, [editor, scrollCursorIntoView]);

  // Scroll when viewport height changes (keyboard appears/disappears)
  useEffect(() => {
    if (isVisible && editor?.isFocused) {
      scrollCursorIntoView();
    }
  }, [viewportHeight, isVisible, editor, scrollCursorIntoView]);

  if (!editor || !isVisible) return null;

  // Calculate bottom position to account for keyboard

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
      className='fixed w-full md:hidden left-0 right-0 z-50 pointer-events-none'
      style={{
        top: toolbarTop !== null ? `${toolbarTop}px` : 'auto',
        bottom: toolbarTop === null ? '0px' : 'auto',
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

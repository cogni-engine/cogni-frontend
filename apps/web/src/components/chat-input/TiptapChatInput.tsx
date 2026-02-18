'use client';

import {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { ArrowUp, Square, Loader2 } from 'lucide-react';
import { useTiptapExtensions } from '@/components/tiptap/extensions/useTiptapExtensions';
import {
  extractMemberMentions,
  extractNoteMentions,
} from '@/lib/tiptap/extractMentions';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';
import GlassCard from '../glass-design/GlassCard';
import GlassButton from '../glass-design/GlassButton';

interface TiptapChatInputProps {
  onSend: (
    text: string,
    mentionedMemberIds: number[],
    mentionedNoteIds: number[]
  ) => void | Promise<void>;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  canStop?: boolean;
  isUploading?: boolean;
  hasAttachments?: boolean;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
  /** Content to render above the editor, inside the input container */
  topContent?: React.ReactNode;
  /** Callback when focus state changes */
  onFocusChange?: (focused: boolean) => void;
}

export type TiptapChatInputRef = {
  focus: () => void;
  clearContent: () => void;
};

const TiptapChatInput = forwardRef<TiptapChatInputRef, TiptapChatInputProps>(
  function TiptapChatInput(
    {
      onSend,
      onStop,
      isLoading = false,
      placeholder = 'Type a message...',
      canStop = true,
      isUploading = false,
      hasAttachments = false,
      workspaceMembers = [],
      workspaceNotes = [],
      topContent,
      onFocusChange,
    },
    ref
  ) {
    const [isFocused, setIsFocused] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const editorRef = useRef<HTMLDivElement>(null);
    const lastFocusTimeRef = useRef<number>(0);
    const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Get extensions for chat mode with member mentions and note mentions
    const extensions = useTiptapExtensions({
      mode: 'chat',
      placeholder,
      enableMemberMentions: workspaceMembers.length > 0,
      enableNoteMentions: workspaceNotes.length > 0,
      workspaceMembers,
      workspaceNotes,
    });

    // Initialize TipTap editor
    // Pass extensions as dependency to recreate editor when they change
    const editor = useEditor(
      {
        immediatelyRender: false,
        extensions,
        content: '',
        contentType: 'markdown',
        editorProps: {
          attributes: {
            class:
              'w-full bg-transparent text-text-primary px-5 py-3.5 pr-[50px] focus:outline-none resize-none overflow-y-auto chat-input-editor',
            style:
              'max-height: 140px; touch-action: manipulation; -webkit-user-select: text; user-select: text;', // ~7 lines, prevent double-tap zoom on mobile, ensure text selection works
            'data-placeholder': placeholder,
            contenteditable: 'true',
          },
        },
        onCreate: ({ editor }) => {
          const text = editor.getText();
          setIsEmpty(text.trim().length === 0);
        },
        onUpdate: ({ editor }) => {
          const text = editor.getText();
          setIsEmpty(text.trim().length === 0);
        },
        onFocus: () => {
          lastFocusTimeRef.current = Date.now();
          // Clear any pending blur timeout
          if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
            blurTimeoutRef.current = null;
          }
          setIsFocused(true);
          onFocusChange?.(true);
        },
        onBlur: () => {
          // On mobile, prevent blur if it happens too quickly after focus
          // This is a common issue with contenteditable on mobile browsers where
          // viewport changes (keyboard opening) cause immediate blur
          const isMobile = window.innerWidth < 768;
          const timeSinceFocus = Date.now() - lastFocusTimeRef.current;

          if (isMobile && timeSinceFocus < 300) {
            // Blur happened too quickly after focus - likely due to keyboard opening
            // Re-focus the editor to maintain focus
            blurTimeoutRef.current = setTimeout(() => {
              if (editor && !editor.isFocused) {
                editor.commands.focus();
              }
            }, 50);
            return; // Don't update state, keep it focused
          }

          // Normal blur handling
          blurTimeoutRef.current = setTimeout(() => {
            // Double-check that focus wasn't regained
            if (!editor?.isFocused) {
              setIsFocused(false);
              onFocusChange?.(false);
            }
          }, 100);
        },
      },
      [extensions, placeholder]
    );

    useImperativeHandle(ref, () => ({
      focus: () => {
        editor?.commands.focus();
      },
      clearContent: () => {
        editor?.commands.clearContent();
        setIsEmpty(true);
      },
    }));

    const handleSend = useCallback(async () => {
      if (isLoading || isUploading || !editor) return;

      const text = editor.getMarkdown().trim();
      const hasText = text.length > 0;

      if (!hasText && !hasAttachments) return;

      // Extract mentions before clearing
      const mentionedMemberIds = extractMemberMentions(editor);
      const mentionedNoteIds = extractNoteMentions(editor);

      await onSend(text || '', mentionedMemberIds, mentionedNoteIds);

      // Clear editor content
      editor.commands.clearContent();
      setIsEmpty(true);
    }, [isLoading, isUploading, editor, hasAttachments, onSend]);

    const handleStop = () => {
      if (onStop && isLoading) {
        onStop();
      }
    };

    // Handle voice input
    const handleVoiceTranscript = (text: string) => {
      if (editor) {
        editor.commands.setContent(text);
        editor.commands.focus();
      }
    };

    // Handle visual viewport changes (mobile keyboard) to maintain focus
    useEffect(() => {
      if (!editor || typeof window === 'undefined' || !window.visualViewport)
        return;

      const handleViewportChange = () => {
        const isMobile = window.innerWidth < 768;
        if (isMobile && editor.isFocused) {
          // When viewport changes (keyboard opens/closes), ensure editor stays focused
          const timeSinceFocus = Date.now() - lastFocusTimeRef.current;
          if (timeSinceFocus < 1000) {
            // Recently focused, maintain focus
            requestAnimationFrame(() => {
              if (editor && !editor.isFocused) {
                editor.commands.focus();
              }
            });
          }
        }
      };

      window.visualViewport.addEventListener('resize', handleViewportChange);
      window.visualViewport.addEventListener('scroll', handleViewportChange);

      return () => {
        window.visualViewport?.removeEventListener(
          'resize',
          handleViewportChange
        );
        window.visualViewport?.removeEventListener(
          'scroll',
          handleViewportChange
        );
      };
    }, [editor]);

    // Add keyboard shortcuts and direct focus/blur listeners
    useEffect(() => {
      if (!editor) return;

      const handleKeyDown = (event: Event) => {
        const keyboardEvent = event as KeyboardEvent;

        // Shift+Enter: newline (default behavior)
        if (keyboardEvent.key === 'Enter' && keyboardEvent.shiftKey) {
          return;
        }

        // Enter (without Shift): send message
        if (keyboardEvent.key === 'Enter' && !keyboardEvent.shiftKey) {
          // Don't send during IME composition
          if (keyboardEvent.isComposing) {
            return;
          }

          keyboardEvent.preventDefault();
          handleSend();
        }
      };

      const editorElement = editorRef.current?.querySelector('.ProseMirror');
      if (!editorElement) return;

      const handleDirectFocus = () => {
        lastFocusTimeRef.current = Date.now();
      };

      const handleDirectBlur = (e: Event) => {
        const isMobile = window.innerWidth < 768;
        const timeSinceFocus = Date.now() - lastFocusTimeRef.current;

        // On mobile, if blur happens within 1000ms of focus, it's likely a false blur
        // caused by keyboard opening or viewport changes. Aggressively re-focus.
        if (isMobile && timeSinceFocus < 1000) {
          // Prevent the blur event from propagating
          e.stopImmediatePropagation();

          // Re-focus using multiple strategies and timings
          const refocus = () => {
            if (!editor) return;

            const proseMirror = editorRef.current?.querySelector(
              '.ProseMirror'
            ) as HTMLElement;

            if (proseMirror) {
              // Direct DOM focus - most reliable on mobile
              proseMirror.focus();

              // Also try TipTap focus command
              requestAnimationFrame(() => {
                if (editor && !editor.isFocused) {
                  editor.commands.focus();
                }
              });
            }
          };

          // Try immediately in current frame
          refocus();

          // Try in next animation frame
          requestAnimationFrame(refocus);

          // Try after microtask queue
          Promise.resolve().then(refocus);

          // Try after short delays to catch any async blur operations
          setTimeout(refocus, 0);
          setTimeout(refocus, 10);
          setTimeout(refocus, 50);
          setTimeout(refocus, 100);
          setTimeout(refocus, 200);
        }
      };

      const handleDirectTouchStart = (e: Event) => {
        // On mobile, ensure focus happens on touch
        const isMobile = window.innerWidth < 768;
        if (isMobile && editor) {
          // Prevent default to avoid any browser default behaviors
          e.preventDefault();

          // Focus immediately and aggressively
          const proseMirror = editorRef.current?.querySelector(
            '.ProseMirror'
          ) as HTMLElement;

          if (proseMirror) {
            // Direct DOM focus - most reliable
            proseMirror.focus();

            // Also use TipTap focus command
            requestAnimationFrame(() => {
              if (editor) {
                editor.commands.focus();
              }
            });

            // Set focus time for blur detection
            lastFocusTimeRef.current = Date.now();
          }
        }
      };

      editorElement.addEventListener('keydown', handleKeyDown);
      editorElement.addEventListener('focus', handleDirectFocus, true);
      editorElement.addEventListener('blur', handleDirectBlur, true);
      editorElement.addEventListener(
        'touchstart',
        handleDirectTouchStart,
        true
      );

      return () => {
        editorElement.removeEventListener('keydown', handleKeyDown);
        editorElement.removeEventListener('focus', handleDirectFocus, true);
        editorElement.removeEventListener('blur', handleDirectBlur, true);
        editorElement.removeEventListener(
          'touchstart',
          handleDirectTouchStart,
          true
        );
        // Cleanup blur timeout
        if (blurTimeoutRef.current) {
          clearTimeout(blurTimeoutRef.current);
        }
      };
    }, [editor, handleSend]);

    // Ensure editor element is focusable on mobile
    useEffect(() => {
      if (!editor || typeof window === 'undefined') return;
      const isMobile = window.innerWidth < 768;
      if (!isMobile) return;

      const proseMirror = editorRef.current?.querySelector(
        '.ProseMirror'
      ) as HTMLElement;
      if (!proseMirror) return;

      // Ensure the element is focusable and can receive touch events
      proseMirror.setAttribute('tabindex', '0');
      proseMirror.style.outline = 'none';
      proseMirror.style.setProperty(
        '-webkit-tap-highlight-color',
        'transparent'
      );

      // Prevent iOS from zooming on double-tap
      let lastTouchEnd = 0;
      const preventZoom = (e: TouchEvent) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      };

      proseMirror.addEventListener('touchend', preventZoom, { passive: false });

      return () => {
        proseMirror.removeEventListener('touchend', preventZoom);
      };
    }, [editor]);

    if (!editor) {
      return null;
    }

    return (
      <div className='flex-1 relative min-w-0'>
        <GlassCard
          ref={editorRef}
          className='w-full dark:backdrop-blur-sm rounded-4xl'
        >
          {topContent}
          <EditorContent editor={editor} />
        </GlassCard>
        {/* マイクボタン - 送信ボタンの左 */}
        {/* <div className='absolute right-[50px] bottom-1.5 z-10'>
          <VoiceInputButton
            onTranscriptChange={handleVoiceTranscript}
            currentText={editor.getText()}
            disabled={isLoading}
            className='w-11 h-11 rounded-full bg-transparent border-0 text-white hover:scale-102 transition-all duration-300'
          />
        </div> */}

        {/* 送信ボタン / 停止ボタン */}
        <GlassButton
          type='button'
          onClick={isLoading && canStop ? handleStop : handleSend}
          onMouseDown={e => e.preventDefault()}
          onTouchEnd={e => {
            // Prevent default to avoid focus loss on mobile
            // Then manually trigger the send/stop action
            e.preventDefault();
            if (isLoading && canStop) {
              handleStop();
            } else if (
              !isLoading &&
              !isUploading &&
              (!isEmpty || hasAttachments)
            ) {
              handleSend();
            }
          }}
          disabled={isLoading || isUploading || (isEmpty && !hasAttachments)}
          className='absolute right-2.5 bottom-1.5 w-10 h-10 rounded-full bg-interactive-hover dark:backdrop-blur-xl border border-border-default text-text-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-interactive-active hover:scale-102 transition-all duration-300 shadow-card hover:shadow-card-hover'
        >
          {isLoading ? (
            canStop ? (
              <Square className='w-4 h-4 fill-current' />
            ) : (
              <Loader2 className='w-4 h-4 animate-spin' />
            )
          ) : (
            <ArrowUp className='w-4 h-4' />
          )}
        </GlassButton>
      </div>
    );
  }
);

export default TiptapChatInput;

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
import { ArrowUp, Square } from 'lucide-react';
import { VoiceInputButton } from './VoiceInputButton';
import { useTiptapExtensions } from '@/components/tiptap/extensions/useTiptapExtensions';
import {
  extractMemberMentions,
  extractNoteMentions,
} from '@/lib/tiptap/extractMentions';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';

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
      placeholder = 'メッセージを入力...',
      canStop = true,
      isUploading = false,
      hasAttachments = false,
      workspaceMembers = [],
      workspaceNotes = [],
      topContent,
    },
    ref
  ) {
    const [isFocused, setIsFocused] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const editorRef = useRef<HTMLDivElement>(null);

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
              'w-full bg-transparent text-white px-5 py-3.5 pr-[90px] focus:outline-none resize-none overflow-y-auto chat-input-editor',
            style: 'max-height: 140px;', // ~7 lines
            'data-placeholder': placeholder,
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
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
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

    // Add keyboard shortcuts
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
      editorElement?.addEventListener('keydown', handleKeyDown);

      return () => {
        editorElement?.removeEventListener('keydown', handleKeyDown);
      };
    }, [editor, handleSend]);

    if (!editor) {
      return null;
    }

    return (
      <div className='flex-1 relative ml-[55px]'>
        <div
          ref={editorRef}
          className='w-full bg-white/2 backdrop-blur-sm rounded-4xl border border-black focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]'
        >
          {topContent}
          <EditorContent editor={editor} />
        </div>
        {/* マイクボタン - 送信ボタンの左 */}
        <div className='absolute right-[50px] bottom-1.5 z-10'>
          <VoiceInputButton
            onTranscriptChange={handleVoiceTranscript}
            currentText={editor.getText()}
            disabled={isLoading}
            className='w-11 h-11 rounded-full bg-transparent border-0 text-white hover:scale-102 transition-all duration-300'
          />
        </div>

        {/* 送信ボタン / 停止ボタン */}
        <button
          onClick={isLoading && canStop ? handleStop : handleSend}
          disabled={isLoading || isUploading || (isEmpty && !hasAttachments)}
          className='absolute right-2.5 bottom-1.5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-black text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/15 hover:scale-102 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]'
        >
          {isLoading && canStop ? (
            <Square className='w-4 h-4 fill-current' />
          ) : (
            <ArrowUp className='w-4 h-4' />
          )}
        </button>
      </div>
    );
  }
);

export default TiptapChatInput;

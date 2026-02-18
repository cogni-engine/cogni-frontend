'use client';

import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { ArrowUp, Square } from 'lucide-react';
import { VoiceInputButton } from './VoiceInputButton';

type TextInputProps = {
  onSend: (text: string) => void | Promise<void>;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  canStop?: boolean;
  isUploading?: boolean;
  hasAttachments?: boolean;
};

export type AiAugmentedInputRef = {
  focus: () => void;
};

const AiAugmentedInput = forwardRef<AiAugmentedInputRef, TextInputProps>(
  function AiAugmentedInput(
    {
      onSend,
      onStop,
      isLoading = false,
      placeholder = 'Type a message...',
      canStop = true,
      isUploading = false,
      hasAttachments = false,
    },
    ref
  ) {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        textareaRef.current?.focus();
      },
    }));

    const maxRows = 7;

    const adjustHeight = (el: HTMLTextAreaElement | null) => {
      if (!el || !(el instanceof HTMLElement)) return;

      // 一旦リセットしてからscrollHeightを測る
      el.style.height = 'auto';
      const computed = window.getComputedStyle(el);
      const lineHeight = parseFloat(computed.lineHeight || '20');
      const maxHeight = lineHeight * maxRows;
      const nextHeight = Math.min(el.scrollHeight, maxHeight);
      el.style.height = `${nextHeight}px`;
      // 7行以上はスクロール
      el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
    };

    const handleSend = async () => {
      if (isLoading || isUploading) return;

      const trimmed = input.trim();
      const hasText = trimmed.length > 0;

      if (!hasText && !hasAttachments) return;

      await onSend(trimmed || '');

      setInput('');

      // 高さをリセット（1行表示に戻す）
      if (textareaRef.current) {
        textareaRef.current.style.height = '';
        textareaRef.current.style.overflowY = 'hidden';
      }
    };

    const handleStop = () => {
      if (onStop && isLoading) {
        onStop();
      }
    };

    // Unified change handler that updates input and adjusts height
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      // Adjust height after state update
      requestAnimationFrame(() => {
        adjustHeight(textareaRef.current);
      });
    };

    // Unified keydown handler
    const handleKeyDown = (e: React.KeyboardEvent) => {
      // Shift+Enter: 改行（デフォルト動作を許可）
      if (e.key === 'Enter' && e.shiftKey) {
        return; // デフォルト動作（改行）を許可
      }

      // Enter (without Shift)
      if (e.key === 'Enter' && !e.shiftKey) {
        // 入力中の場合は送信しない（IME確定用のEnter）
        if (e.nativeEvent.isComposing) {
          return; // デフォルト動作（IME確定）を許可
        }

        // Enterで送信
        e.preventDefault();
        handleSend();
      }
    };

    return (
      <div className='flex-1 relative ml-[55px]'>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus
          disabled={isLoading || isUploading}
          rows={1}
          className='w-full bg-surface-secondary dark:backdrop-blur-xl text-text-primary px-5 py-3.5 pr-[140px] rounded-4xl border border-border-default focus:outline-none resize-none shadow-card focus:shadow-card-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-y-auto'
        />
        {/* マイクボタン - 送信ボタンの左 */}
        {/* <div className='absolute right-[50px] bottom-1.5 z-110'>
          <VoiceInputButton
            onTranscriptChange={text => setInput(text)}
            currentText={input}
            disabled={isLoading}
            className='w-11 h-11 rounded-full bg-transparent border-0 text-white hover:scale-102 transition-all duration-300'
          />
        </div> */}
        {/* 送信ボタン / 停止ボタン */}
        <button
          onClick={isLoading && canStop ? handleStop : handleSend}
          disabled={
            isLoading || isUploading || (!input.trim() && !hasAttachments)
          }
          className='absolute right-2.5 bottom-1.5 w-10 h-10 rounded-full bg-interactive-hover dark:backdrop-blur-xl border border-border-default text-text-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-interactive-active hover:scale-102 transition-all duration-300 shadow-card hover:shadow-card-hover'
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

export default AiAugmentedInput;

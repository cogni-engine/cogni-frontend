'use client';

import {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { ArrowUp, Square } from 'lucide-react';
import { VoiceInputButton } from './VoiceInputButton';
import { useUI } from '@/contexts/UIContext';
import { CopilotTextarea } from '@copilotkit/react-textarea';

type TextInputProps = {
  onSend: (text: string) => void | Promise<void>;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  canStop?: boolean;
  disableCopilot?: boolean;
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
      placeholder = 'メッセージを入力...',
      canStop = true,
      disableCopilot = false,
      isUploading = false,
      hasAttachments = false,
    },
    ref
  ) {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { setInputActive } = useUI();

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

    // 入力中かどうかを検知してUIContextを更新（フォーカスまたは入力値がある場合）
    useEffect(() => {
      setInputActive(isFocused || input.trim().length > 0);
    }, [isFocused, input, setInputActive]);

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

    // Unified keydown handler (accepts any keyboard event since CopilotTextarea may wrap it)
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
        <CopilotTextarea
          disableBranding={true}
          autosuggestionsConfig={{
            textareaPurpose: `Assist me in replying to this chat thread. Remember all important details.`,
            contextCategories: ['workspace_chat', 'cogni_chat'],
            chatApiConfigs: {},
            disableWhenEmpty: false,
            temporarilyDisableWhenMovingCursorWithoutChangingText: false,
            temporarilyDisableNotTrustedEvents: false,
            disabled: disableCopilot,
          }}
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoFocus
          disabled={isLoading || isUploading}
          rows={1}
          className='w-full bg-white/8 backdrop-blur-xl text-white px-5 py-3.5 pr-[140px] rounded-4xl border border-black focus:outline-none resize-none shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] focus:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-y-auto'
        />
        {/* マイクボタン - 送信ボタンの左 */}
        <div className='absolute right-[50px] bottom-1.5 z-10'>
          <VoiceInputButton
            onTranscriptChange={text => setInput(text)}
            currentText={input}
            disabled={isLoading}
            className='w-11 h-11 rounded-full bg-transparent border-0 text-white hover:scale-102 transition-all duration-300'
          />
        </div>
        {/* 送信ボタン / 停止ボタン */}
        <button
          onClick={isLoading && canStop ? handleStop : handleSend}
          disabled={
            isLoading || isUploading || (!input.trim() && !hasAttachments)
          }
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

export default AiAugmentedInput;

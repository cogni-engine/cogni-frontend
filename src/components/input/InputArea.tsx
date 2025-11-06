'use client';

import { Message, AIMessage } from '@/types/chat';
import DynamicInput from './modes/DynamicInput';
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

type InputAreaProps = {
  messages?: Message[] | AIMessage[] | unknown[];
  onSend: (content: string, workspaceFileIds?: number[]) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  canStop?: boolean;
  ai_augmented_input?: boolean;
  replyingTo?: { id: number; text: string; authorName?: string } | null;
  onCancelReply?: () => void;
  workspaceId?: number;
};

export type InputAreaRef = {
  focus: () => void;
};

const InputArea = forwardRef<InputAreaRef, InputAreaProps>(function InputArea(
  {
    onSend,
    onStop,
    isLoading = false,
    placeholder = 'Ask anything',
    canStop = true,
    ai_augmented_input = true,
    replyingTo,
    onCancelReply,
    workspaceId,
  },
  ref
) {
  const inputRef = useRef<{ focus: () => void } | null>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));

  // Focus input when replying
  useEffect(() => {
    if (replyingTo) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [replyingTo]);

  return (
    <div className='bg-gradient-to-br from-slate-950 via-black to-slate-950 relative z-10 rounded-t-3xl'>
      {/* Reply indicator - absolutely positioned above input */}
      {replyingTo && (
        <div className='absolute bottom-full left-0 right-0 px-4 md:px-8 pb-2 pointer-events-auto'>
          <div className='flex items-center justify-between bg-white/8 backdrop-blur-xl border border-black rounded-2xl px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]'>
            <div className='flex-1 min-w-0'>
              <p className='text-xs text-white/60 mb-1'>
                Replying to {replyingTo.authorName || 'message'}
              </p>
              <p className='text-xs text-white/40 truncate'>
                {replyingTo.text.slice(0, 100)}
                {replyingTo.text.length > 100 ? '...' : ''}
              </p>
            </div>
            {onCancelReply && (
              <button
                onClick={onCancelReply}
                className='ml-3 text-white/60 hover:text-white/80 transition-colors text-sm'
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
      {/* 入力UI */}
      <div className='px-2 md:px-6 pt-2'>
        <DynamicInput
          ref={inputRef}
          suggestions={[]}
          inputPlaceholder={placeholder}
          onSuggestionClick={text => onSend(text)}
          onFreeTextSubmit={onSend}
          onStop={onStop}
          isLoading={isLoading}
          canStop={canStop}
          ai_augmented_input={ai_augmented_input}
          workspaceId={workspaceId}
        />
      </div>
    </div>
  );
});

export default InputArea;

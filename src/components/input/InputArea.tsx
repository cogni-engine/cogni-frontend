'use client';

import { Message, AIMessage } from '@/types/chat';
import DynamicInput from './modes/DynamicInput';

type InputAreaProps = {
  messages?: Message[] | AIMessage[] | unknown[];
  onSend: (content: string) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  canStop?: boolean;
  ai_augmented_input?: boolean;
  replyingTo?: { id: number; text: string; authorName?: string } | null;
  onCancelReply?: () => void;
};

export default function InputArea({
  onSend,
  onStop,
  isLoading = false,
  placeholder = 'Ask anything',
  canStop = true,
  ai_augmented_input = true,
  replyingTo,
  onCancelReply,
}: InputAreaProps) {
  return (
    <div className='bg-gradient-to-br from-slate-950 via-black to-slate-950 relative z-10 rounded-t-3xl'>
      {/* Reply indicator */}
      {replyingTo && (
        <div className='px-4 md:px-8 pt-3 pb-2 border-b border-white/10'>
          <div className='flex items-center justify-between bg-white/8 backdrop-blur-xl border border-black rounded-2xl px-4 py-2'>
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
          suggestions={[]}
          inputPlaceholder={placeholder}
          onSuggestionClick={onSend}
          onFreeTextSubmit={onSend}
          onStop={onStop}
          isLoading={isLoading}
          canStop={canStop}
          ai_augmented_input={ai_augmented_input}
        />
      </div>
    </div>
  );
}

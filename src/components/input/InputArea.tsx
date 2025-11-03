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
};

export default function InputArea({
  onSend,
  onStop,
  isLoading = false,
  placeholder = 'Ask anything',
  canStop = true,
  ai_augmented_input = true,
}: InputAreaProps) {
  return (
    <div className='bg-gradient-to-br from-slate-950 via-black to-slate-950 relative z-10 rounded-t-3xl'>
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

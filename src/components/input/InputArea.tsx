'use client';

import { Message, AIMessage } from '@/types/chat';
import DynamicInput from './modes/DynamicInput';

type InputAreaProps = {
  messages: Message[] | AIMessage[];
  onSend: (content: string) => void;
  onStop?: () => void;
  isLoading?: boolean;
};

export default function InputArea({
  messages,
  onSend,
  onStop,
  isLoading = false,
}: InputAreaProps) {
  return (
    <div className='bg-gradient-to-br from-slate-950 via-black to-slate-950 relative z-10 rounded-t-3xl'>
      {/* 入力UI */}
      <div className='px-6 md:px-6 pb-1 md:pb-1 pt-2'>
        <DynamicInput
          suggestions={[]}
          inputPlaceholder={'Ask anything'}
          onSuggestionClick={onSend}
          onFreeTextSubmit={onSend}
          onStop={onStop}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

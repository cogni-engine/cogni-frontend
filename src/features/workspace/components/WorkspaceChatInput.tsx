'use client';

import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

type Props = {
  onSend: (text: string) => void;
  isLoading?: boolean;
};

export default function WorkspaceChatInput({ onSend, isLoading }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim() || isLoading) return;
    onSend(text.trim());
    setText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className='border-t border-white/10 bg-gradient-to-br from-slate-950/50 via-black/50 to-slate-950/50 backdrop-blur-md'>
      <div className='p-4'>
        <div className='flex items-end gap-2'>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Type a message...'
            disabled={isLoading}
            rows={1}
            className='flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 resize-none disabled:opacity-50'
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || isLoading}
            className='p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
          >
            <Send className='w-5 h-5 text-white' />
          </button>
        </div>
      </div>
    </div>
  );
}

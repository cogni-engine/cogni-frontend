'use client';

import { Sparkles, Loader2, ArrowUp, X } from 'lucide-react';

interface DesktopAIInputProps {
  aiInstruction: string;
  aiLoading: boolean;
  aiError: string | null;
  onInstructionChange: (value: string) => void;
  onSuggest: () => void;
}

export function DesktopAIInput({
  aiInstruction,
  aiLoading,
  aiError,
  onInstructionChange,
  onSuggest,
}: DesktopAIInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSuggest();
    }
  };

  return (
    <div
      className='absolute bottom-0 left-0 right-0 z-100 px-4 py-3'
      data-shepherd-target='note-ai-input'
    >
      <div className='w-full max-w-4xl mx-auto'>
        <div className='relative'>
          <div className='w-full bg-white/2 backdrop-blur-sm rounded-4xl border border-black focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]'>
            <div className='flex items-center gap-2 px-4'>
              <Sparkles className='w-4 h-4 text-purple-400 shrink-0' />
              <input
                type='text'
                value={aiInstruction}
                onChange={e => onInstructionChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Ask AI to edit this note...'
                className='flex-1 bg-transparent text-white text-base py-3.5 pr-[60px] focus:outline-none placeholder-white/40'
                disabled={aiLoading}
              />
            </div>
          </div>
          {/* Send button */}
          <button
            onClick={onSuggest}
            disabled={aiLoading || !aiInstruction.trim()}
            className='absolute right-2.5 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-black text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/15 hover:scale-102 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]'
          >
            {aiLoading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <ArrowUp className='w-4 h-4' />
            )}
          </button>
        </div>
        {/* Error message */}
        {aiError && (
          <div className='mt-2 text-xs text-red-400 flex items-center gap-2 px-4'>
            <X className='w-3 h-3' />
            {aiError}
          </div>
        )}
      </div>
    </div>
  );
}

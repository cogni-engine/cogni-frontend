'use client';

import { Sparkles, Loader2, ArrowUp, X } from 'lucide-react';
import GlassCard from '@/components/glass-design/GlassCard';
import GlassButton from '@/components/glass-design/GlassButton';

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
    <div className='absolute bottom-0 left-0 right-0 z-100 px-4 py-3'>
      <div className='w-full max-w-4xl mx-auto'>
        <GlassCard
          className='flex items-center rounded-4xl px-4 py-3'
          data-shepherd-target='note-ai-input'
        >
          <Sparkles className='mr-2 size-5 text-text-muted shrink-0' />
          <input
            type='text'
            value={aiInstruction}
            onChange={e => onInstructionChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Ask AI to edit this note...'
            className='flex-1 bg-transparent text-foreground text-base outline-none placeholder-input-placeholder'
            disabled={aiLoading}
          />
          <GlassButton
            onClick={onSuggest}
            disabled={aiLoading || !aiInstruction.trim()}
            className='ml-2'
            aria-label='Send AI instruction'
          >
            {aiLoading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <ArrowUp className='w-4 h-4' />
            )}
          </GlassButton>
        </GlassCard>
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

'use client';

import { Check } from 'lucide-react';
import GlassCard from '@/components/glass-card/GlassCard';
import { RECURRENCE_OPTIONS } from '../utils/formatters';

interface RecurrenceSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

/**
 * Recurrence selector drawer for task scheduling
 */
export function RecurrenceSelector({
  value,
  onChange,
  onClose,
}: RecurrenceSelectorProps) {
  return (
    <>
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm z-60'
        onClick={onClose}
      />
      <div className='fixed inset-x-0 bottom-0 z-70 animate-[slide-up_0.3s_ease-out]'>
        <GlassCard className='rounded-t-3xl rounded-b-none'>
          <div className='flex items-center justify-between p-4 border-b border-white/10'>
            <button onClick={onClose} className='text-blue-400 text-[15px]'>
              Cancel
            </button>
            <span className='text-white text-[17px] font-semibold'>Repeat</span>
            <button onClick={onClose} className='text-blue-400 text-[15px]'>
              Done
            </button>
          </div>
          <div className='p-4 space-y-1'>
            {RECURRENCE_OPTIONS.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  onClose();
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  value === option.value
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <div className='flex items-center justify-between'>
                  {option.label}
                  {value === option.value && (
                    <Check className='w-5 h-5 text-blue-400' />
                  )}
                </div>
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );
}

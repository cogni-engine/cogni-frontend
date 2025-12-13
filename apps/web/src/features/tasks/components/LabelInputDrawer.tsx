'use client';

import GlassCard from '@/components/glass-card/GlassCard';

interface LabelInputDrawerProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

/**
 * Label input drawer for task naming
 */
export function LabelInputDrawer({
  value,
  onChange,
  onClose,
}: LabelInputDrawerProps) {
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
            <span className='text-white text-[17px] font-semibold'>Label</span>
            <button onClick={onClose} className='text-blue-400 text-[15px]'>
              Done
            </button>
          </div>
          <div className='p-4'>
            <input
              type='text'
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder='Task name'
              autoFocus
              className='w-full bg-white/5 text-white text-[17px] px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-blue-400 placeholder:text-white/30 transition-colors'
            />
          </div>
        </GlassCard>
      </div>
    </>
  );
}

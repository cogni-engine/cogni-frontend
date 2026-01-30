'use client';

import GlassCard from '@/components/glass-design/GlassCard';

type EmptyTrashModalProps = {
  isOpen: boolean;
  noteCount: number;
  onClose: () => void;
  onConfirm: () => void;
};

export function EmptyTrashModal({
  isOpen,
  noteCount,
  onClose,
  onConfirm,
}: EmptyTrashModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <GlassCard className='p-6 max-w-sm w-full rounded-2xl'>
        <h3 className='text-lg font-semibold text-white mb-2'>
          Delete All Notes
        </h3>
        <p className='text-gray-400 mb-6 text-sm leading-relaxed'>
          Are you sure you want to permanently delete {noteCount} note
          {noteCount !== 1 ? 's' : ''}? This action cannot be undone.
        </p>
        <div className='flex gap-3'>
          <button
            onClick={onClose}
            className='flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 font-medium'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg shadow-red-500/20'
          >
            Delete All
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

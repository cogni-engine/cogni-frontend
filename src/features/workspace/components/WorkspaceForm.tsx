'use client';

import { useState, useEffect } from 'react';
import type { Workspace } from '@/types/workspace';
import { Plus } from 'lucide-react';

interface WorkspaceFormProps {
  workspace?: Workspace | null;
  onSubmit: (id: number | null, title: string) => Promise<void>;
  onEditComplete?: () => void;
  isLoading?: boolean;
}

export default function WorkspaceForm({
  workspace,
  onSubmit,
  onEditComplete,
  isLoading,
}: WorkspaceFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When workspace prop changes (for editing), open the modal
  useEffect(() => {
    if (workspace) {
      setTitle(workspace.title || '');
      setIsOpen(true);
      setError('');
    }
  }, [workspace]);

  const handleOpen = () => {
    setTitle('');
    setError('');
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTitle('');
    setError('');
    if (onEditComplete) {
      onEditComplete();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(workspace?.id || null, title.trim());
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save workspace');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Create Button */}
      <button
        onClick={handleOpen}
        disabled={isLoading}
        className='p-3 bg-white/8 backdrop-blur-md hover:bg-white/12 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
      >
        <Plus className='w-4 h-4' />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700'>
            <h2 className='text-2xl font-bold text-white mb-6'>
              {workspace ? 'Edit Workspace' : 'Create New Workspace'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-300 mb-2'
                >
                  Workspace Title
                </label>
                <input
                  id='title'
                  type='text'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder='Enter workspace title'
                  disabled={isSubmitting}
                  className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                  autoFocus
                />
              </div>

              {error && (
                <div className='mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md text-red-300 text-sm'>
                  {error}
                </div>
              )}

              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className='flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='flex-1 px-4 py-2 bg-white/8 backdrop-blur-md hover:bg-white/12 p-5 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? 'Saving...' : workspace ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

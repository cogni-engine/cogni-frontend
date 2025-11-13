'use client';

import { useState, useEffect } from 'react';
import { X, FolderIcon, FolderOpen, Plus, Check } from 'lucide-react';
import GlassCard from '@/components/glass-card/GlassCard';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import type { NoteFolder } from '@/types/note';

interface MoveFolderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  folders: NoteFolder[];
  currentFolderId: number | null;
  onMove: (folderId: number | null) => void;
  onCreateFolder: (name: string) => Promise<void>;
}

export default function MoveFolderDrawer({
  isOpen,
  onClose,
  folders,
  currentFolderId,
  onMove,
  onCreateFolder,
}: MoveFolderDrawerProps) {
  const { setDrawerOpen } = useGlobalUI();
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setDrawerOpen(true);
    } else {
      document.body.style.overflow = 'unset';
      setDrawerOpen(false);
      setIsCreating(false);
      setNewFolderName('');
    }
    return () => {
      document.body.style.overflow = 'unset';
      setDrawerOpen(false);
    };
  }, [isOpen, setDrawerOpen]);

  const handleMove = (folderId: number | null) => {
    onMove(folderId);
    onClose();
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim() || isCreatingFolder) return;

    try {
      setIsCreatingFolder(true);
      await onCreateFolder(newFolderName.trim());
      setNewFolderName('');
      setIsCreating(false);
    } catch (err) {
      console.error('Failed to create folder:', err);
    } finally {
      setIsCreatingFolder(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50'
        onClick={onClose}
      />

      {/* Drawer */}
      <div className='fixed inset-x-0 bottom-0 z-100 animate-[slide-up_0.3s_ease-out]'>
        <GlassCard className='rounded-t-3xl rounded-b-none max-h-[70vh] flex flex-col'>
          {/* Header */}
          <div className='flex items-center justify-between p-4 border-b border-white/10'>
            <h3 className='text-lg font-semibold text-white'>Move to Folder</h3>
            <button
              onClick={onClose}
              className='p-2 hover:bg-white/10 rounded-lg transition-colors'
            >
              <X className='w-5 h-5 text-gray-400' />
            </button>
          </div>

          {/* Content */}
          <div className='flex-1 overflow-y-auto p-4'>
            {/* Create New Folder */}
            {isCreating ? (
              <div className='mb-4 p-3 bg-white/5 rounded-lg border border-white/10'>
                <div className='flex items-center gap-2 mb-3'>
                  <FolderIcon className='w-5 h-5 text-yellow-400' />
                  <span className='text-sm font-medium text-white'>
                    New Folder
                  </span>
                </div>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={newFolderName}
                    onChange={e => setNewFolderName(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleCreateFolder();
                      if (e.key === 'Escape') {
                        setIsCreating(false);
                        setNewFolderName('');
                      }
                    }}
                    placeholder='Folder name...'
                    autoFocus
                    className='flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-blue-400 transition-colors'
                  />
                  <button
                    onClick={handleCreateFolder}
                    disabled={!newFolderName.trim() || isCreatingFolder}
                    className='px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2'
                  >
                    {isCreatingFolder ? (
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white' />
                    ) : (
                      <>
                        <Check className='w-4 h-4' />
                        Create
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setNewFolderName('');
                    }}
                    className='px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className='w-full mb-4 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 border-dashed transition-colors flex items-center gap-3'
              >
                <div className='w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center'>
                  <Plus className='w-5 h-5 text-blue-400' />
                </div>
                <span className='font-medium text-white'>
                  Create New Folder
                </span>
              </button>
            )}

            {/* Show "Notes" folder option if not currently in it */}
            {currentFolderId !== null && (
              <button
                onClick={() => handleMove(null)}
                className='w-full mb-2 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-between group'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center'>
                    <FolderIcon className='w-5 h-5 text-blue-400' />
                  </div>
                  <div className='text-left'>
                    <div className='font-medium text-white'>Notes</div>
                    <div className='text-xs text-gray-400'>Default folder</div>
                  </div>
                </div>
                <div className='w-5 h-5 rounded-full border-2 border-white/20 group-hover:border-blue-400 transition-colors' />
              </button>
            )}

            {/* Show "All Notes" as disabled/info - not a move target */}
            <div className='w-full mb-2 p-3 bg-white/5 rounded-lg opacity-50 cursor-not-allowed'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center'>
                  <FolderOpen className='w-5 h-5 text-purple-400' />
                </div>
                <div className='text-left'>
                  <div className='font-medium text-white'>All Notes</div>
                  <div className='text-xs text-gray-400'>
                    View only - not a folder
                  </div>
                </div>
              </div>
            </div>

            {/* Folder List */}
            <div className='space-y-2'>
              {folders.map(folder => {
                const isCurrent = folder.id === currentFolderId;
                return (
                  <button
                    key={folder.id}
                    onClick={() => !isCurrent && handleMove(folder.id)}
                    disabled={isCurrent}
                    className={`w-full p-3 rounded-lg transition-colors flex items-center justify-between group ${
                      isCurrent
                        ? 'bg-blue-500/20 cursor-default'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isCurrent ? 'bg-blue-500/30' : 'bg-yellow-500/20'
                        }`}
                      >
                        <FolderIcon
                          className={`w-5 h-5 ${
                            isCurrent ? 'text-blue-400' : 'text-yellow-400'
                          }`}
                        />
                      </div>
                      <div className='text-left'>
                        <div className='font-medium text-white'>
                          {folder.title}
                        </div>
                        <div className='text-xs text-gray-400'>
                          {folder.note_count || 0} note
                          {folder.note_count !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    {isCurrent ? (
                      <div className='w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center'>
                        <Check className='w-3 h-3 text-white' />
                      </div>
                    ) : (
                      <div className='w-5 h-5 rounded-full border-2 border-white/20 group-hover:border-blue-400 transition-colors' />
                    )}
                  </button>
                );
              })}
            </div>

            {folders.length === 0 && currentFolderId === null && (
              <div className='text-center py-8 text-gray-400'>
                <FolderIcon className='w-12 h-12 mx-auto mb-3 opacity-50' />
                <p className='text-sm'>No folders yet</p>
                <p className='text-xs mt-1'>
                  Create your first folder to organize notes
                </p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </>
  );
}

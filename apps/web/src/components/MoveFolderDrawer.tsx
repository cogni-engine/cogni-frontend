'use client';

import { useState, useEffect } from 'react';
import { X, FolderIcon, FolderOpen, Plus, Check } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerClose,
} from '@/components/ui/drawer';
import type { NoteFolder } from '@/types/note';

interface MoveFolderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentFolderId: number | null;
  onMove: (folderId: number | null) => void;
  folders: NoteFolder[];
  createFolder: (title: string) => Promise<NoteFolder>;
}

export default function MoveFolderDrawer({
  isOpen,
  onClose,
  currentFolderId,
  onMove,
  folders,
  createFolder,
}: MoveFolderDrawerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  // Reset state when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setIsCreating(false);
      setNewFolderName('');
    }
  }, [isOpen]);

  const handleMove = (folderId: number | null) => {
    onMove(folderId);
    onClose();
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim() || isCreatingFolder) return;

    try {
      setIsCreatingFolder(true);
      await createFolder(newFolderName.trim());
      setNewFolderName('');
      setIsCreating(false);
    } catch (err) {
      console.error('Failed to create folder:', err);
    } finally {
      setIsCreatingFolder(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={open => !open && onClose()}>
      <DrawerContent maxHeight='70vh' swipeToClose={false}>
        {/* Header */}
        <DrawerHeader className='p-4'>
          <DrawerTitle>Move to Folder</DrawerTitle>
          <DrawerClose>
            <X className='w-5 h-5 text-text-muted' />
          </DrawerClose>
        </DrawerHeader>

        {/* Content */}
        <DrawerBody>
          {/* Create New Folder */}
          {isCreating ? (
            <div className='mb-4 p-3 bg-surface-primary rounded-lg border border-border-default'>
              <div className='flex items-center gap-2 mb-3'>
                <FolderIcon className='w-5 h-5 text-yellow-400' />
                <span className='text-sm font-medium text-text-primary'>
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
                  className='flex-1 px-3 py-2 bg-surface-primary border border-border-default rounded-lg text-text-primary placeholder-text-muted outline-none focus:border-blue-400 transition-colors'
                />
                <button
                  onClick={handleCreateFolder}
                  disabled={!newFolderName.trim() || isCreatingFolder}
                  className='px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-surface-secondary disabled:cursor-not-allowed text-white dark:text-white rounded-lg font-medium transition-colors flex items-center gap-2'
                >
                  {isCreatingFolder ? (
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-current' />
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
                  className='px-4 py-2 bg-surface-primary hover:bg-interactive-hover text-text-primary rounded-lg font-medium transition-colors'
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className='w-full mb-4 p-3 bg-surface-primary hover:bg-interactive-hover rounded-lg border border-border-default border-dashed transition-colors flex items-center gap-3'
            >
              <div className='w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center'>
                <Plus className='w-5 h-5 text-blue-400' />
              </div>
              <span className='font-medium text-text-primary'>
                Create New Folder
              </span>
            </button>
          )}

          {/* Show "Notes" folder option if not currently in it */}
          {currentFolderId !== null && (
            <button
              onClick={() => handleMove(null)}
              className='w-full mb-2 p-3 bg-surface-primary hover:bg-interactive-hover rounded-lg transition-colors flex items-center justify-between group'
            >
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center'>
                  <FolderIcon className='w-5 h-5 text-blue-400' />
                </div>
                <div className='text-left'>
                  <div className='font-medium text-text-primary'>Notes</div>
                  <div className='text-xs text-text-muted'>Default folder</div>
                </div>
              </div>
              <div className='w-5 h-5 rounded-full border-2 border-border-default group-hover:border-blue-400 transition-colors' />
            </button>
          )}

          {/* Show "All Notes" as disabled/info - not a move target */}
          <div className='w-full mb-2 p-3 bg-surface-primary rounded-lg opacity-50 cursor-not-allowed'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center'>
                <FolderOpen className='w-5 h-5 text-purple-400' />
              </div>
              <div className='text-left'>
                <div className='font-medium text-text-primary'>All Notes</div>
                <div className='text-xs text-text-muted'>
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
                      : 'bg-surface-primary hover:bg-interactive-hover'
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
                      <div className='font-medium text-text-primary'>
                        {folder.title}
                      </div>
                    </div>
                  </div>
                  {isCurrent ? (
                    <div className='w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center'>
                      <Check className='w-3 h-3 text-text-primary' />
                    </div>
                  ) : (
                    <div className='w-5 h-5 rounded-full border-2 border-border-default group-hover:border-blue-400 transition-colors' />
                  )}
                </button>
              );
            })}
          </div>

          {folders.length === 0 && currentFolderId === null && (
            <div className='text-center py-8 text-text-muted'>
              <FolderIcon className='w-12 h-12 mx-auto mb-3 opacity-50' />
              <p className='text-sm'>No folders yet</p>
              <p className='text-xs mt-1'>
                Create your first folder to organize notes
              </p>
            </div>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

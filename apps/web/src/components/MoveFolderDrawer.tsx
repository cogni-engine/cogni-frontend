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
import GlassCard from '@/components/glass-design/GlassCard';
import GlassButton from '@/components/glass-design/GlassButton';
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
            <GlassCard className='mb-3 p-4 rounded-2xl'>
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-8 h-8 rounded-2xl bg-surface-primary flex items-center justify-center'>
                  <FolderIcon className='w-4 h-4 text-text-muted' />
                </div>
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
                  className='flex-1 px-4 py-2.5 bg-surface-primary border border-border-default rounded-2xl text-text-primary placeholder-text-muted outline-none focus:border-border-default transition-colors'
                />
                <GlassButton
                  type='button'
                  onClick={handleCreateFolder}
                  disabled={!newFolderName.trim() || isCreatingFolder}
                  className='px-4 py-2 gap-2'
                >
                  {isCreatingFolder ? (
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-current' />
                  ) : (
                    <>
                      <Check className='w-4 h-4' />
                      Create
                    </>
                  )}
                </GlassButton>
                <GlassButton
                  type='button'
                  variant='ghost'
                  onClick={() => {
                    setIsCreating(false);
                    setNewFolderName('');
                  }}
                  className='px-4 py-2'
                >
                  Cancel
                </GlassButton>
              </div>
            </GlassCard>
          ) : (
            <GlassCard
              onClick={() => setIsCreating(true)}
              className='mb-3 px-3 py-2.5 rounded-3xl border border-dashed border-border-default flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors'
            >
              <div className='w-8 h-8 rounded-2xl bg-surface-primary flex items-center justify-center'>
                <Plus className='w-4 h-4 text-text-muted' />
              </div>
              <span className='text-sm font-medium text-text-secondary'>
                Create New Folder
              </span>
            </GlassCard>
          )}

          {/* Folder list */}
          <GlassCard className='rounded-3xl p-2 border border-border-default'>
            <div className='space-y-1'>
              {/* Show "Notes" (root) folder option if currently inside a folder */}
              {currentFolderId !== null && (
                <button
                  onClick={() => handleMove(null)}
                  className='w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-interactive-hover transition-colors group'
                >
                  <div className='w-8 h-8 rounded-2xl bg-surface-primary flex items-center justify-center'>
                    <FolderIcon className='w-4 h-4 text-text-secondary' />
                  </div>
                  <div className='flex-1 text-left'>
                    <div className='text-sm font-medium text-text-primary'>
                      Notes
                    </div>
                    <div className='text-xs text-text-muted'>
                      Default folder
                    </div>
                  </div>
                  <div className='w-5 h-5 rounded-full border-2 border-border-default group-hover:border-text-muted transition-colors' />
                </button>
              )}

              {/* All Notes - disabled info row */}
              <div className='flex items-center gap-3 px-3 py-2.5 rounded-2xl opacity-40 cursor-not-allowed'>
                <div className='w-8 h-8 rounded-2xl bg-surface-primary flex items-center justify-center'>
                  <FolderOpen className='w-4 h-4 text-text-muted' />
                </div>
                <div className='flex-1 text-left'>
                  <div className='text-sm font-medium text-text-primary'>
                    All Notes
                  </div>
                  <div className='text-xs text-text-muted'>
                    View only - not a folder
                  </div>
                </div>
              </div>

              {/* Folder items */}
              {folders.map(folder => {
                const isCurrent = folder.id === currentFolderId;
                return (
                  <button
                    key={folder.id}
                    onClick={() => !isCurrent && handleMove(folder.id)}
                    disabled={isCurrent}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-colors group ${
                      isCurrent
                        ? 'bg-interactive-active cursor-default'
                        : 'hover:bg-interactive-hover'
                    }`}
                  >
                    <div className='w-8 h-8 rounded-2xl bg-surface-primary flex items-center justify-center'>
                      <FolderIcon className='w-4 h-4 text-text-secondary' />
                    </div>
                    <div className='flex-1 text-left'>
                      <div className='text-sm font-medium text-text-primary'>
                        {folder.title}
                      </div>
                    </div>
                    {isCurrent ? (
                      <div className='w-5 h-5 rounded-full bg-text-primary flex items-center justify-center'>
                        <Check className='w-3 h-3 text-background' />
                      </div>
                    ) : (
                      <div className='w-5 h-5 rounded-full border-2 border-border-default group-hover:border-text-muted transition-colors' />
                    )}
                  </button>
                );
              })}
            </div>
          </GlassCard>

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

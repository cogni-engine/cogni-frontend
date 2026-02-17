'use client';

import { useState, useEffect, useRef } from 'react';
import { FolderIcon, Edit2, Trash2, Plus } from 'lucide-react';
import GlassButton from '@/components/glass-design/GlassButton';
import GlassCard from '@/components/glass-design/GlassCard';
import { useNoteFolders } from '@/features/notes/hooks/useNoteFolders';
import { useNotes } from '@/features/notes/hooks/useNotes';

interface FolderActionButtonProps {
  workspaceId: number;
}

export default function FolderActionButton({
  workspaceId,
}: FolderActionButtonProps) {
  // Fetch folders and notes internally
  const {
    folders,
    updateFolder,
    deleteFolder,
    createFolder: createFolderHook,
    refetch: refetchFolders,
  } = useNoteFolders({
    workspaceId,
    autoFetch: true,
  });

  const { notes } = useNotes({
    workspaceId,
    includeDeleted: true,
    autoFetch: true,
  });

  // Calculate trash count
  const trashCount = notes.filter(note => note.deleted_at).length;
  const [isOpen, setIsOpen] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const [editingFolderName, setEditingFolderName] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setEditingFolderId(null);
        setIsCreatingNew(false);
        setNewFolderName('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleUpdateFolder = async (folderId: number) => {
    if (!editingFolderName.trim()) return;

    try {
      await updateFolder(folderId, editingFolderName.trim());
      await refetchFolders();
      window.dispatchEvent(new CustomEvent('folders-updated'));
      setEditingFolderId(null);
      setEditingFolderName('');
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to update folder:', err);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      await createFolderHook(newFolderName.trim());
      await refetchFolders();
      window.dispatchEvent(new CustomEvent('folders-updated'));
      setIsCreatingNew(false);
      setNewFolderName('');
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to create folder:', err);
    }
  };

  const handleDeleteFolder = async (folderId: number) => {
    try {
      await deleteFolder(folderId);
      await refetchFolders();
      window.dispatchEvent(new CustomEvent('folders-updated'));
      setShowDeleteConfirm(null);
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to delete folder:', err);
    }
  };

  const handleTrashClick = () => {
    window.dispatchEvent(new CustomEvent('trash-folder-selected'));
    setIsOpen(false);
  };

  const startEditing = (folderId: number, currentName: string) => {
    setEditingFolderId(folderId);
    setEditingFolderName(currentName);
    setIsCreatingNew(false);
  };

  const startCreating = () => {
    setIsCreatingNew(true);
    setNewFolderName('');
    setEditingFolderId(null);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <GlassButton
        onClick={() => setIsOpen(!isOpen)}
        title='Folder actions'
        size='icon'
        className='size-12'
      >
        <FolderIcon className='w-5 h-5 text-text-primary' />
      </GlassButton>

      {/* Dropdown Menu */}
      {isOpen && (
        <GlassCard className='absolute right-0 mt-2 w-56 rounded-3xl z-110'>
          <div className='p-2'>
            {/* New Folder Button */}
            <button
              onClick={startCreating}
              className='w-full flex items-center gap-2 px-3 py-2 mb-2 hover:bg-surface-primary rounded-xl transition-colors text-sm text-text-secondary hover:text-text-primary'
            >
              <Plus className='w-4 h-4' />
              <span>New Folder</span>
            </button>

            {/* Divider */}
            {folders.length > 0 && (
              <div className='h-px bg-border-default mb-2' />
            )}

            {/* New Folder Input (when creating) */}
            {isCreatingNew && (
              <div className='mb-2'>
                <div className='p-2 bg-surface-primary rounded-2xl border border-border-default'>
                  <input
                    type='text'
                    value={newFolderName}
                    onChange={e => setNewFolderName(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleCreateFolder();
                      if (e.key === 'Escape') {
                        setIsCreatingNew(false);
                        setNewFolderName('');
                      }
                    }}
                    autoFocus
                    placeholder='Folder name'
                    className='w-full px-2 py-1.5 bg-transparent border-none outline-none text-text-primary text-sm placeholder:text-text-muted'
                  />
                  <div className='flex gap-2 mt-2'>
                    <button
                      onClick={handleCreateFolder}
                      className='flex-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white dark:text-white text-xs font-medium rounded-lg transition-all'
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setIsCreatingNew(false);
                        setNewFolderName('');
                      }}
                      className='flex-1 px-3 py-1.5 bg-interactive-hover hover:bg-interactive-active text-text-primary text-xs font-medium rounded-lg transition-colors'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Existing Folders */}
            {folders.length === 0 && !isCreatingNew ? (
              <div className='px-3 py-2 text-sm text-text-muted text-center'>
                No folders
              </div>
            ) : (
              <>
                {folders.map(folder => (
                  <div key={folder.id} className='mb-1'>
                    {editingFolderId === folder.id ? (
                      <div className='p-2 bg-surface-primary rounded-2xl border border-border-default'>
                        <input
                          type='text'
                          value={editingFolderName}
                          onChange={e => setEditingFolderName(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter')
                              handleUpdateFolder(folder.id);
                            if (e.key === 'Escape') {
                              setEditingFolderId(null);
                              setEditingFolderName('');
                            }
                          }}
                          autoFocus
                          className='w-full px-2 py-1.5 bg-transparent border-none outline-none text-text-primary text-sm'
                        />
                        <div className='flex gap-2 mt-2'>
                          <button
                            onClick={() => handleUpdateFolder(folder.id)}
                            className='flex-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white dark:text-white text-xs font-medium rounded-lg transition-all'
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingFolderId(null);
                              setEditingFolderName('');
                            }}
                            className='flex-1 px-3 py-1.5 bg-interactive-hover hover:bg-interactive-active text-text-primary text-xs font-medium rounded-lg transition-colors'
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className='flex items-center justify-between p-2 hover:bg-surface-primary rounded-xl transition-colors group'>
                        <span className='text-sm text-text-primary truncate flex-1'>
                          {folder.title}
                        </span>
                        <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                          <button
                            onClick={() =>
                              startEditing(folder.id, folder.title)
                            }
                            className='p-1.5 hover:bg-interactive-hover rounded-lg transition-colors'
                            title='Rename folder'
                          >
                            <Edit2 className='w-3.5 h-3.5 text-text-muted hover:text-text-primary' />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(folder.id)}
                            className='p-1.5 hover:bg-red-500/10 rounded-lg transition-colors'
                            title='Delete folder'
                          >
                            <Trash2 className='w-3.5 h-3.5 text-text-muted hover:text-red-400' />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Recently Deleted - Always show */}
                {folders.length > 0 && (
                  <div className='h-px bg-border-default my-2' />
                )}
                <button
                  onClick={handleTrashClick}
                  className='w-full flex items-center p-2 hover:bg-surface-primary rounded-xl transition-colors'
                >
                  <div className='flex items-center gap-2 flex-1'>
                    <Trash2 className='w-4 h-4 text-text-primary' />
                    <span className='text-sm text-text-primary'>
                      Recently Deleted
                    </span>
                    {trashCount > 0 && (
                      <span className='text-xs text-text-muted'>
                        ({trashCount})
                      </span>
                    )}
                  </div>
                </button>
              </>
            )}
          </div>
        </GlassCard>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className='fixed inset-0 z-120 flex items-center justify-center bg-dialog-overlay dark:backdrop-blur-md px-4 py-8'>
          <GlassCard className='w-full max-w-md rounded-3xl border border-border-default bg-interactive-hover p-6 shadow-card'>
            <div className='flex flex-col gap-4 text-text-primary'>
              <div className='flex items-start gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/20'>
                  <Trash2 className='h-5 w-5 text-red-600 dark:text-red-300' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold tracking-tight'>
                    Delete folder?
                  </h3>
                  <p className='mt-1 text-sm text-text-secondary'>
                    Notes inside this folder will move back to
                    &quot;Notes&quot;. This action can&apos;t be undone.
                  </p>
                </div>
              </div>

              <div className='h-px bg-border-default' />

              <div className='flex justify-end gap-3'>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className='rounded-full bg-interactive-hover px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-interactive-active'
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteFolder(showDeleteConfirm)}
                  className='rounded-full bg-red-500/90 px-4 py-2 text-sm font-semibold text-white dark:text-white shadow-card transition-colors hover:bg-red-500'
                >
                  Delete
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

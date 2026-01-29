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
        <FolderIcon className='w-5 h-5 text-white' />
      </GlassButton>

      {/* Dropdown Menu */}
      {isOpen && (
        <GlassCard className='absolute right-0 mt-2 w-56 rounded-3xl z-110'>
          <div className='p-2'>
            {/* New Folder Button */}
            <button
              onClick={startCreating}
              className='w-full flex items-center gap-2 px-3 py-2 mb-2 hover:bg-white/5 rounded-xl transition-colors text-sm text-white/80 hover:text-white'
            >
              <Plus className='w-4 h-4' />
              <span>New Folder</span>
            </button>

            {/* Divider */}
            {folders.length > 0 && <div className='h-px bg-white/10 mb-2' />}

            {/* New Folder Input (when creating) */}
            {isCreatingNew && (
              <div className='mb-2'>
                <div className='p-2 bg-white/5 rounded-2xl border border-white/10'>
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
                    className='w-full px-2 py-1.5 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/40'
                  />
                  <div className='flex gap-2 mt-2'>
                    <button
                      onClick={handleCreateFolder}
                      className='flex-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-all'
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setIsCreatingNew(false);
                        setNewFolderName('');
                      }}
                      className='flex-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Existing Folders */}
            {folders.length === 0 && !isCreatingNew ? (
              <div className='px-3 py-2 text-sm text-gray-400 text-center'>
                No folders
              </div>
            ) : (
              <>
                {folders.map(folder => (
                  <div key={folder.id} className='mb-1'>
                    {editingFolderId === folder.id ? (
                      <div className='p-2 bg-white/5 rounded-2xl border border-white/10'>
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
                          className='w-full px-2 py-1.5 bg-transparent border-none outline-none text-white text-sm'
                        />
                        <div className='flex gap-2 mt-2'>
                          <button
                            onClick={() => handleUpdateFolder(folder.id)}
                            className='flex-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-all'
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingFolderId(null);
                              setEditingFolderName('');
                            }}
                            className='flex-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors'
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className='flex items-center justify-between p-2 hover:bg-white/5 rounded-xl transition-colors group'>
                        <span className='text-sm text-white truncate flex-1'>
                          {folder.title}
                        </span>
                        <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                          <button
                            onClick={() =>
                              startEditing(folder.id, folder.title)
                            }
                            className='p-1.5 hover:bg-white/10 rounded-lg transition-colors'
                            title='Rename folder'
                          >
                            <Edit2 className='w-3.5 h-3.5 text-gray-400 hover:text-white' />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(folder.id)}
                            className='p-1.5 hover:bg-red-500/10 rounded-lg transition-colors'
                            title='Delete folder'
                          >
                            <Trash2 className='w-3.5 h-3.5 text-gray-400 hover:text-red-400' />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Recently Deleted - Always show */}
                {folders.length > 0 && (
                  <div className='h-px bg-white/10 my-2' />
                )}
                <button
                  onClick={handleTrashClick}
                  className='w-full flex items-center p-2 hover:bg-white/5 rounded-xl transition-colors'
                >
                  <div className='flex items-center gap-2 flex-1'>
                    <Trash2 className='w-4 h-4 text-white' />
                    <span className='text-sm text-white'>Recently Deleted</span>
                    {trashCount > 0 && (
                      <span className='text-xs text-gray-400'>
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
        <div className='fixed inset-0 z-120 flex items-center justify-center bg-black/60 backdrop-blur-md px-4 py-8'>
          <GlassCard className='w-full max-w-md rounded-3xl border border-white/12 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]'>
            <div className='flex flex-col gap-4 text-white'>
              <div className='flex items-start gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/20'>
                  <Trash2 className='h-5 w-5 text-red-300' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold tracking-tight'>
                    Delete folder?
                  </h3>
                  <p className='mt-1 text-sm text-white/70'>
                    Notes inside this folder will move back to
                    &quot;Notes&quot;. This action can&apos;t be undone.
                  </p>
                </div>
              </div>

              <div className='h-px bg-white/10' />

              <div className='flex justify-end gap-3'>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className='rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/16'
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteFolder(showDeleteConfirm)}
                  className='rounded-full bg-red-500/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(248,113,113,0.35)] transition-colors hover:bg-red-500'
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

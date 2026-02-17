'use client';

import { useState, useEffect, useRef } from 'react';
import {
  FolderIcon,
  FolderOpen,
  Trash2,
  Plus,
  ChevronRight,
  Check,
} from 'lucide-react';
import type { NoteFolder } from '@/types/note';
import GlassCard from '@/components/glass-design/GlassCard';

interface FolderDropdownProps {
  folders: NoteFolder[];
  selectedFolder: 'all' | 'notes' | 'trash' | number;
  onFolderSelect: (folderId: 'all' | 'notes' | 'trash' | number) => void;
  onCreateFolder: (title: string) => Promise<NoteFolder>;
  onUpdateFolder: (id: number, title: string) => Promise<NoteFolder>;
  onDeleteFolder: (id: number) => Promise<void>;
  noteCounts: {
    all: number;
    notes: number;
    trash: number;
  };
}

export default function FolderDropdown({
  folders,
  selectedFolder,
  onFolderSelect,
  onCreateFolder,
  onUpdateFolder,
  onDeleteFolder,
  noteCounts,
}: FolderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const [editingFolderName, setEditingFolderName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const [folderContextMenu, setFolderContextMenu] = useState<{
    folderId: number;
    x: number;
    y: number;
  } | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
        setIsCreating(false);
        setEditingFolderId(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!folderContextMenu) return;

    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (contextMenuRef.current?.contains(target)) {
        return;
      }
      setFolderContextMenu(null);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFolderContextMenu(null);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [folderContextMenu]);

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      await onCreateFolder(newFolderName.trim());
      setNewFolderName('');
      setIsCreating(false);
    } catch (err) {
      console.error('Failed to create folder:', err);
    }
  };

  const handleUpdateFolder = async (folderId: number) => {
    if (!editingFolderName.trim()) return;

    try {
      await onUpdateFolder(folderId, editingFolderName.trim());
      setEditingFolderId(null);
      setEditingFolderName('');
    } catch (err) {
      console.error('Failed to update folder:', err);
    }
  };

  const handleDeleteFolder = async (folderId: number) => {
    try {
      await onDeleteFolder(folderId);
      setShowDeleteConfirm(null);
      // If we're deleting the currently selected folder, switch to "all"
      if (selectedFolder === folderId) {
        onFolderSelect('all');
      }
    } catch (err) {
      console.error('Failed to delete folder:', err);
    }
  };

  const startEditing = (folderId: number, currentName: string) => {
    setEditingFolderId(folderId);
    setEditingFolderName(currentName);
  };

  const getSelectedLabel = () => {
    if (selectedFolder === 'all') return 'All Notes';
    if (selectedFolder === 'notes') return 'Notes';
    if (selectedFolder === 'trash') return 'Recently Deleted';
    const folder = folders.find(f => f.id === selectedFolder);
    return folder?.title || 'Select Folder';
  };

  const getSelectedIcon = () => {
    if (selectedFolder === 'all')
      return <FolderOpen className='w-4 h-4 text-purple-400' />;
    if (selectedFolder === 'notes')
      return <FolderIcon className='w-4 h-4 text-blue-400' />;
    if (selectedFolder === 'trash')
      return <Trash2 className='w-4 h-4 text-text-muted' />;
    return <FolderIcon className='w-4 h-4 text-yellow-400' />;
  };

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Dropdown Button */}
      <GlassCard
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-3 px-3 rounded-3xl transition-all duration-200 min-w-[180px] group'
      >
        <div className='flex items-center justify-center w-8 h-8 rounded-xl bg-transparent transition-colors'>
          {getSelectedIcon()}
        </div>
        <span className='flex-1 text-left text-sm font-semibold text-text-primary truncate transition-colors group-hover:text-text-primary group-focus-visible:text-text-primary'>
          {getSelectedLabel()}
        </span>
        <ChevronRight
          className={`w-4 h-4 text-text-muted transition-transform duration-200 group-hover:text-text-primary ${isOpen ? 'rotate-90' : ''}`}
        />
      </GlassCard>

      {/* Dropdown Menu */}
      {isOpen && (
        <GlassCard className='absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[280px] max-h-[460px] overflow-y-auto rounded-3xl z-50'>
          <div className='p-3'>
            {/* All Notes */}
            <button
              onClick={() => {
                onFolderSelect('all');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 group ${
                selectedFolder === 'all'
                  ? 'bg-interactive-hover'
                  : 'hover:bg-surface-primary'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                    selectedFolder === 'all'
                      ? 'bg-interactive-hover'
                      : 'bg-surface-primary group-hover:bg-interactive-hover'
                  }`}
                >
                  <FolderOpen className='w-5 h-5 text-purple-400' />
                </div>
                <div className='flex flex-col items-start'>
                  <span className='text-sm font-medium text-text-primary'>
                    All Notes
                  </span>
                  <span className='text-xs text-text-muted'>
                    {noteCounts.all} notes
                  </span>
                </div>
              </div>
              {selectedFolder === 'all' && (
                <Check className='w-5 h-5 text-text-primary' />
              )}
            </button>

            {/* Notes (Default) */}
            <button
              onClick={() => {
                onFolderSelect('notes');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                selectedFolder === 'notes'
                  ? 'bg-interactive-hover'
                  : 'hover:bg-surface-primary'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                    selectedFolder === 'notes'
                      ? 'bg-surface-primary'
                      : 'bg-surface-primary group-hover:bg-interactive-hover'
                  }`}
                >
                  <FolderIcon className='w-5 h-5 text-blue-400' />
                </div>
                <div className='flex flex-col items-start'>
                  <span className='text-sm font-medium text-text-primary'>
                    Notes
                  </span>
                  <span className='text-xs text-text-muted'>
                    {noteCounts.notes} notes
                  </span>
                </div>
              </div>
              {selectedFolder === 'notes' && (
                <Check className='w-5 h-5 text-text-primary' />
              )}
            </button>

            <div className='h-px bg-border-default my-3' />

            {/* Create New Folder */}
            {isCreating ? (
              <div className='p-3 bg-surface-primary rounded-xl mb-2 border border-border-default'>
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
                  className='w-full px-3 py-2 bg-transparent border-none outline-none text-text-primary text-sm placeholder-text-muted'
                />
                <div className='flex gap-2 mt-3'>
                  <button
                    onClick={handleCreateFolder}
                    className='flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white dark:text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-green-500/20'
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setNewFolderName('');
                    }}
                    className='flex-1 px-4 py-2 bg-interactive-hover hover:bg-interactive-active text-text-primary text-sm font-medium rounded-lg transition-colors'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className='w-full flex items-center gap-3 p-3 hover:bg-surface-primary rounded-xl transition-all duration-200 mb-2 group'
              >
                <div className='flex items-center justify-center w-9 h-9 rounded-lg bg-surface-primary group-hover:bg-interactive-hover transition-colors'>
                  <Plus className='w-5 h-5 text-green-400' />
                </div>
                <span className='text-sm font-medium text-text-primary'>
                  New Folder
                </span>
              </button>
            )}

            {/* Custom Folders */}
            {folders.map(folder => (
              <div key={folder.id} className='relative mb-1'>
                {editingFolderId === folder.id ? (
                  <div className='p-3 bg-surface-primary rounded-xl border border-border-default'>
                    <input
                      type='text'
                      value={editingFolderName}
                      onChange={e => setEditingFolderName(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleUpdateFolder(folder.id);
                        if (e.key === 'Escape') {
                          setEditingFolderId(null);
                          setEditingFolderName('');
                        }
                      }}
                      autoFocus
                      className='w-full px-3 py-2 bg-transparent border-none outline-none text-text-primary text-sm'
                    />
                    <div className='flex gap-2 mt-3'>
                      <button
                        onClick={() => handleUpdateFolder(folder.id)}
                        className='flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white dark:text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/20'
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingFolderId(null);
                          setEditingFolderName('');
                        }}
                        className='flex-1 px-4 py-2 bg-interactive-hover hover:bg-interactive-active text-text-primary text-sm font-medium rounded-lg transition-colors'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={e => {
                      if (folderContextMenu?.folderId === folder.id) {
                        setFolderContextMenu(null);
                        e.preventDefault();
                        return;
                      }
                      onFolderSelect(folder.id);
                      setIsOpen(false);
                    }}
                    onContextMenu={event => {
                      event.preventDefault();
                      setFolderContextMenu({
                        folderId: folder.id,
                        x: event.clientX,
                        y: event.clientY,
                      });
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                      selectedFolder === folder.id
                        ? 'bg-interactive-hover'
                        : 'hover:bg-surface-primary'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                          selectedFolder === folder.id
                            ? 'bg-interactive-hover'
                            : 'bg-surface-primary group-hover:bg-interactive-hover'
                        }`}
                      >
                        <FolderIcon className='w-5 h-5 text-yellow-400' />
                      </div>
                      <div className='flex flex-col items-start'>
                        <span className='text-sm font-medium text-text-primary truncate'>
                          {folder.title}
                        </span>
                      </div>
                    </div>
                    {selectedFolder === folder.id && (
                      <Check className='w-5 h-5 text-text-primary' />
                    )}
                  </button>
                )}
              </div>
            ))}

            <div className='h-px bg-border-default my-3' />

            {/* Recently Deleted */}
            <button
              onClick={() => {
                onFolderSelect('trash');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                selectedFolder === 'trash'
                  ? 'bg-interactive-hover'
                  : 'hover:bg-surface-primary'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                    selectedFolder === 'trash'
                      ? 'bg-interactive-hover'
                      : 'bg-surface-primary group-hover:bg-interactive-hover'
                  }`}
                >
                  <Trash2 className='w-5 h-5 text-text-muted' />
                </div>
                <div className='flex flex-col items-start'>
                  <span className='text-sm font-medium text-text-primary'>
                    Recently Deleted
                  </span>
                  <span className='text-xs text-text-muted'>
                    {noteCounts.trash} notes
                  </span>
                </div>
              </div>
              {selectedFolder === 'trash' && (
                <Check className='w-5 h-5 text-text-primary' />
              )}
            </button>
          </div>
        </GlassCard>
      )}

      {folderContextMenu && (
        <div
          ref={contextMenuRef}
          className='fixed z-110 min-w-[180px] rounded-xl border border-border-default bg-dropdown-bg px-2 py-2 text-sm text-text-primary shadow-card dark:backdrop-blur-md'
          style={{
            left: `${folderContextMenu.x}px`,
            top: `${folderContextMenu.y}px`,
          }}
        >
          <button
            onClick={() => {
              const target = folders.find(
                folder => folder.id === folderContextMenu.folderId
              );
              if (target) {
                startEditing(target.id, target.title);
              }
              setFolderContextMenu(null);
            }}
            className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors hover:bg-interactive-hover'
          >
            Rename folder
          </button>
          <button
            onClick={() => {
              setShowDeleteConfirm(folderContextMenu.folderId);
              setFolderContextMenu(null);
            }}
            className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-red-600 dark:text-red-300 transition-colors hover:bg-red-500/15'
          >
            Delete folder
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className='fixed inset-0 z-100 flex items-center justify-center bg-dialog-overlay dark:backdrop-blur-md px-4 py-8'>
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
                    Notes inside this folder will move back to “Notes”. This
                    action can’t be undone.
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

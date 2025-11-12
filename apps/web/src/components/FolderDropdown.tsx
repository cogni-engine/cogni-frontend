'use client';

import { useState, useEffect, useRef } from 'react';
import {
  FolderIcon,
  FolderOpen,
  Trash2,
  Plus,
  ChevronDown,
  Check,
  Edit2,
  X as XIcon,
} from 'lucide-react';
import type { NoteFolder } from '@/types/note';
import GlassCard from '@/components/glass-card/GlassCard';

interface FolderDropdownProps {
  folders: NoteFolder[];
  selectedFolder: 'all' | 'notes' | 'trash' | number;
  onFolderSelect: (folderId: 'all' | 'notes' | 'trash' | number) => void;
  onCreateFolder: (name: string) => Promise<void>;
  onUpdateFolder: (id: number, name: string) => Promise<void>;
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
    if (selectedFolder === 'trash') return 'Trash';
    const folder = folders.find(f => f.id === selectedFolder);
    return folder?.title || 'Select Folder';
  };

  const getSelectedIcon = () => {
    if (selectedFolder === 'all')
      return <FolderOpen className='w-4 h-4 text-purple-400' />;
    if (selectedFolder === 'notes')
      return <FolderIcon className='w-4 h-4 text-blue-400' />;
    if (selectedFolder === 'trash')
      return <Trash2 className='w-4 h-4 text-red-400' />;
    return <FolderIcon className='w-4 h-4 text-yellow-400' />;
  };

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Dropdown Button */}
      <GlassCard
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-2xl transition-all duration-200 min-w-[180px] group'
      >
        <div className='flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors'>
          {getSelectedIcon()}
        </div>
        <span className='flex-1 text-left text-sm font-semibold text-white truncate'>
          {getSelectedLabel()}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </GlassCard>

      {/* Dropdown Menu */}
      {isOpen && (
        <GlassCard className='absolute left-0 top-full mt-3 w-[320px] max-h-[520px] overflow-y-auto rounded-3xl z-50'>
          <div className='p-3'>
            {/* All Notes */}
            <button
              onClick={() => {
                onFolderSelect('all');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                selectedFolder === 'all' ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                    selectedFolder === 'all'
                      ? 'bg-white/10'
                      : 'bg-white/5 group-hover:bg-white/10'
                  }`}
                >
                  <FolderOpen className='w-5 h-5 text-purple-400' />
                </div>
                <div className='flex flex-col items-start'>
                  <span className='text-sm font-medium text-white'>
                    All Notes
                  </span>
                  <span className='text-xs text-gray-400'>
                    {noteCounts.all} notes
                  </span>
                </div>
              </div>
              {selectedFolder === 'all' && (
                <Check className='w-5 h-5 text-white' />
              )}
            </button>

            {/* Notes (Default) */}
            <button
              onClick={() => {
                onFolderSelect('notes');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                selectedFolder === 'notes' ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                    selectedFolder === 'notes'
                      ? 'bg-white/10'
                      : 'bg-white/5 group-hover:bg-white/10'
                  }`}
                >
                  <FolderIcon className='w-5 h-5 text-blue-400' />
                </div>
                <div className='flex flex-col items-start'>
                  <span className='text-sm font-medium text-white'>Notes</span>
                  <span className='text-xs text-gray-400'>
                    {noteCounts.notes} notes
                  </span>
                </div>
              </div>
              {selectedFolder === 'notes' && (
                <Check className='w-5 h-5 text-white' />
              )}
            </button>

            <div className='h-px bg-white/10 my-3' />

            {/* Create New Folder */}
            {isCreating ? (
              <div className='p-3 bg-white/5 rounded-xl mb-2 border border-white/10'>
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
                  className='w-full px-3 py-2 bg-transparent border-none outline-none text-white text-sm placeholder-gray-500'
                />
                <div className='flex gap-2 mt-3'>
                  <button
                    onClick={handleCreateFolder}
                    className='flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-green-500/20'
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setNewFolderName('');
                    }}
                    className='flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className='w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all duration-200 mb-2 group'
              >
                <div className='flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors'>
                  <Plus className='w-5 h-5 text-green-400' />
                </div>
                <span className='text-sm font-medium text-white'>
                  New Folder
                </span>
              </button>
            )}

            {/* Custom Folders */}
            {folders.map(folder => (
              <div key={folder.id} className='relative mb-1'>
                {editingFolderId === folder.id ? (
                  <div className='p-3 bg-white/5 rounded-xl border border-white/10'>
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
                      className='w-full px-3 py-2 bg-transparent border-none outline-none text-white text-sm'
                    />
                    <div className='flex gap-2 mt-3'>
                      <button
                        onClick={() => handleUpdateFolder(folder.id)}
                        className='flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/20'
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingFolderId(null);
                          setEditingFolderName('');
                        }}
                        className='flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='group relative'>
                    <button
                      onClick={() => {
                        onFolderSelect(folder.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                        selectedFolder === folder.id
                          ? 'bg-white/10'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className='flex items-center gap-3'>
                        <div
                          className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                            selectedFolder === folder.id
                              ? 'bg-white/10'
                              : 'bg-white/5 group-hover:bg-white/10'
                          }`}
                        >
                          <FolderIcon className='w-5 h-5 text-yellow-400' />
                        </div>
                        <div className='flex flex-col items-start'>
                          <span className='text-sm font-medium text-white truncate'>
                            {folder.title}
                          </span>
                          <span className='text-xs text-gray-400'>
                            {folder.note_count || 0} notes
                          </span>
                        </div>
                      </div>
                      {selectedFolder === folder.id && (
                        <Check className='w-5 h-5 text-white' />
                      )}
                    </button>
                    {/* Context Menu Buttons */}
                    <div className='absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-slate-800 rounded px-1'>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          startEditing(folder.id, folder.title);
                        }}
                        className='p-1 hover:bg-white/10 rounded'
                      >
                        <Edit2 className='w-3 h-3 text-gray-400' />
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setShowDeleteConfirm(folder.id);
                        }}
                        className='p-1 hover:bg-red-500/20 rounded'
                      >
                        <XIcon className='w-3 h-3 text-red-400' />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className='h-px bg-white/10 my-3' />

            {/* Trash */}
            <button
              onClick={() => {
                onFolderSelect('trash');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                selectedFolder === 'trash' ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                    selectedFolder === 'trash'
                      ? 'bg-white/10'
                      : 'bg-white/5 group-hover:bg-white/10'
                  }`}
                >
                  <Trash2 className='w-5 h-5 text-red-400' />
                </div>
                <div className='flex flex-col items-start'>
                  <span className='text-sm font-medium text-white'>Trash</span>
                  <span className='text-xs text-gray-400'>
                    {noteCounts.trash} notes
                  </span>
                </div>
              </div>
              {selectedFolder === 'trash' && (
                <Check className='w-5 h-5 text-white' />
              )}
            </button>
          </div>
        </GlassCard>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className='fixed inset-0 bg-white/5 backdrop-blur-sm flex items-center justify-center z-200 p-4'>
          <GlassCard className='p-6 max-w-sm w-full rounded-2xl'>
            <h3 className='text-lg font-semibold text-white mb-2'>
              Delete Folder
            </h3>
            <p className='text-gray-400 mb-6 text-sm'>
              Are you sure you want to delete this folder? Notes in this folder
              will be moved to &quot;Notes&quot;.
            </p>
            <div className='flex gap-3 justify-end'>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className='px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteFolder(showDeleteConfirm)}
                className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-lg shadow-red-500/20'
              >
                Delete
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

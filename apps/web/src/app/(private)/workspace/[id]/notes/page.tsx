'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, memo, useMemo, useEffect } from 'react';
import { useNotes, useNoteFolders, formatDate } from '@cogni/api';
import type { NoteWithParsed } from '@cogni/types';
import { PenSquare, FolderOpen } from 'lucide-react';
import NoteContextMenu from '@/features/workspace/components/NoteContextMenu';
import SearchBar from '@/components/SearchBar';
import GlassButton from '@/components/glass-design/GlassButton';
import GlassCard from '@/components/glass-design/GlassCard';
import MoveFolderDrawer from '@/components/MoveFolderDrawer';
import ScrollableView from '@/components/layout/ScrollableView';
import { FolderGroupHeader } from '@/features/notes/components/FolderGroupHeader';
import type { NoteFolder } from '@/types/note';

// Helper functions for date grouping (same as in NoteList.tsx)
function getTimeGroup(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);

  // Reset time to midnight for date comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const noteDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // Today
  if (noteDate.getTime() === today.getTime()) {
    return '今日';
  }

  // This week (last 7 days)
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  if (noteDate > weekAgo) {
    return '今週';
  }

  // This month
  if (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return '今月';
  }

  // Previous months in the same year
  if (date.getFullYear() === now.getFullYear()) {
    return `${date.getMonth() + 1}月`;
  }

  // Previous years
  return `${date.getFullYear()}年`;
}

function groupNotesByTime(
  notes: NoteWithParsed[]
): Record<string, NoteWithParsed[]> {
  const grouped: Record<string, NoteWithParsed[]> = {};

  notes.forEach(note => {
    const group = getTimeGroup(note.updated_at);
    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push(note);
  });

  return grouped;
}

function groupNotesByFolder(
  notes: NoteWithParsed[],
  folders: NoteFolder[]
): Record<string, NoteWithParsed[]> {
  const grouped: Record<string, NoteWithParsed[]> = {};

  // Sort folders alphabetically by title
  const sortedFolders = [...folders].sort((a, b) =>
    a.title.localeCompare(b.title, 'ja')
  );

  // Initialize groups for each folder (always show all folders)
  sortedFolders.forEach(folder => {
    grouped[folder.title] = [];
  });

  // Add "Notes" group for notes without folder
  grouped['Notes'] = [];

  // Group notes
  notes.forEach(note => {
    if (!note.note_folder_id) {
      grouped['Notes'].push(note);
    } else {
      const folder = folders.find(f => f.id === note.note_folder_id);
      if (folder && grouped[folder.title]) {
        grouped[folder.title].push(note);
      }
    }
  });

  // Don't remove empty groups - always show all folders

  return grouped;
}

function sortFolderGroupKeys(keys: string[]): string[] {
  // "Notes" should come first, then alphabetically
  return keys.sort((a, b) => {
    if (a === 'Notes') return -1;
    if (b === 'Notes') return 1;
    return a.localeCompare(b, 'ja');
  });
}

function sortGroupKeys(keys: string[]): string[] {
  const order = ['今日', '今週', '今月'];

  return keys.sort((a, b) => {
    // Priority order
    const aIndex = order.indexOf(a);
    const bIndex = order.indexOf(b);

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    // Month comparison (e.g., "10月", "11月")
    const aMonth = a.match(/^(\d+)月$/);
    const bMonth = b.match(/^(\d+)月$/);
    if (aMonth && bMonth) {
      return parseInt(bMonth[1]) - parseInt(aMonth[1]); // Descending
    }

    // Year comparison (e.g., "2024年", "2023年")
    const aYear = a.match(/^(\d+)年$/);
    const bYear = b.match(/^(\d+)年$/);
    if (aYear && bYear) {
      return parseInt(bYear[1]) - parseInt(aYear[1]); // Descending
    }

    // Months come before years
    if (aMonth) return -1;
    if (bMonth) return 1;

    return 0;
  });
}

export default function WorkspaceNotesPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = parseInt(params.id as string);

  const sortBy: 'time' | 'folder' = 'folder';
  const [searchQuery, setSearchQuery] = useState('');
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    noteId: number;
    isDeleted: boolean;
  } | null>(null);
  const [showHardDeleteConfirm, setShowHardDeleteConfirm] = useState<
    number | null
  >(null);
  const [showEmptyTrashConfirm, setShowEmptyTrashConfirm] = useState(false);
  const [showMoveDrawer, setShowMoveDrawer] = useState(false);
  const [noteToMove, setNoteToMove] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [collapsedFolders, setCollapsedFolders] = useState<Set<string>>(
    new Set()
  );
  const [selectedFolder, setSelectedFolder] = useState<'trash' | number | null>(
    null
  );

  const {
    notes,
    loading,
    error,
    refetch,
    searchNotes: searchNotesQuery,
    createNote,
    softDeleteNote,
    deleteNote,
    restoreNote,
    duplicateNote,
    emptyTrash,
  } = useNotes({
    workspaceId: workspaceId,
    includeDeleted: true,
  });

  const {
    folders: rawFolders,
    moveNote,
    createFolder,
    updateFolder,
    deleteFolder,
    refetch: refetchFolders,
  } = useNoteFolders({
    workspaceId: workspaceId || 0,
  });

  // Listen for folder updates from layout
  useEffect(() => {
    const handleFoldersUpdated = () => {
      refetchFolders();
    };
    window.addEventListener('folders-updated', handleFoldersUpdated);
    return () => {
      window.removeEventListener('folders-updated', handleFoldersUpdated);
    };
  }, [refetchFolders]);

  // Listen for trash click event from layout
  useEffect(() => {
    const handleTrashClick = () => {
      setSelectedFolder('trash');
    };
    window.addEventListener('trash-folder-selected', handleTrashClick);
    return () => {
      window.removeEventListener('trash-folder-selected', handleTrashClick);
    };
  }, []);

  // Use folders directly without note counts
  const folders = rawFolders;

  const [isSearching, setIsSearching] = useState(false);

  // Always show all active notes (no folder filtering)
  const activeNotes = useMemo(() => {
    return notes.filter(note => !note.deleted_at);
  }, [notes]);

  const deletedNotes = useMemo(() => {
    return notes.filter(note => note.deleted_at);
  }, [notes]);

  // Group active notes by date or folder
  const groupedNotes =
    sortBy === 'folder'
      ? groupNotesByFolder(activeNotes, folders)
      : groupNotesByTime(activeNotes);
  const sortedGroups =
    sortBy === 'folder'
      ? sortFolderGroupKeys(Object.keys(groupedNotes))
      : sortGroupKeys(Object.keys(groupedNotes));

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      await searchNotesQuery(query);
      setIsSearching(false);
    } else {
      await refetch();
    }
  };

  const handleCreateNote = async () => {
    try {
      setIsCreating(true);
      // Always create in default folder (null)
      const newNote = await createNote('Untitled', '', null);
      router.push(`/notes/${newNote.id}`);
    } catch (err) {
      console.error('Failed to create note:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleMove = async (folderId: number | null) => {
    if (!noteToMove) return;

    try {
      setIsMoving(true);

      // Move the note
      await moveNote(parseInt(noteToMove), folderId);

      // Refetch to update notes data (SWR cache)
      await refetch();

      // Close drawer
      setShowMoveDrawer(false);
      setNoteToMove(null);
    } catch (err) {
      console.error('Failed to move note:', err);
    } finally {
      setIsMoving(false);
    }
  };

  const handleNoteClick = (noteId: number) => {
    router.push(`/notes/${noteId}`);
  };

  const handleContextMenu = (
    e: React.MouseEvent,
    noteId: number,
    isDeleted: boolean
  ) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      noteId,
      isDeleted,
    });
  };

  const handleSoftDelete = async (noteId: number) => {
    try {
      await softDeleteNote(noteId);
    } catch (err) {
      console.error('Failed to soft delete note:', err);
    }
  };

  const handleHardDelete = async (noteId: number) => {
    try {
      await deleteNote(noteId);
      setShowHardDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to permanently delete note:', err);
    }
  };

  const handleRestore = async (noteId: number) => {
    try {
      await restoreNote(noteId);
    } catch (err) {
      console.error('Failed to restore note:', err);
    }
  };

  const handleDuplicate = async (noteId: number) => {
    try {
      await duplicateNote(noteId);
    } catch (err) {
      console.error('Failed to duplicate note:', err);
    }
  };

  const handleEmptyTrash = async () => {
    try {
      await emptyTrash();
      setShowEmptyTrashConfirm(false);
    } catch (err) {
      console.error('Failed to empty trash:', err);
    }
  };

  // Helper component for rendering a note card - memoized to prevent flickering
  const NoteCardComponent = ({
    note,
    isDeleted = false,
  }: {
    note: NoteWithParsed;
    isDeleted?: boolean;
  }) => {
    const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };

      // Start long press timer
      touchTimerRef.current = setTimeout(() => {
        // Trigger context menu after 500ms
        handleContextMenu(
          {
            preventDefault: () => {},
            clientX: touch.clientX,
            clientY: touch.clientY,
          } as React.MouseEvent,
          note.id,
          isDeleted
        );
      }, 500);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      // Cancel long press if user moves finger too much
      if (touchStartRef.current && touchTimerRef.current) {
        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
        const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

        if (deltaX > 10 || deltaY > 10) {
          clearTimeout(touchTimerRef.current);
          touchTimerRef.current = null;
        }
      }
    };

    const handleTouchEnd = () => {
      // Clear the timer if touch ends before long press threshold
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
        touchTimerRef.current = null;
      }
      touchStartRef.current = null;
    };

    return (
      <GlassCard
        key={note.id}
        className={`group relative rounded-[20px] px-5 py-[8px] cursor-pointer select-none border-0 shadow-none hover:shadow-none !bg-transparent backdrop-blur-none ${
          isDeleted ? 'opacity-60' : ''
        }`}
        onClick={() => !isDeleted && handleNoteClick(note.id)}
        onContextMenu={e => handleContextMenu(e, note.id, isDeleted)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div className='flex justify-between items-start gap-3'>
          <div className='flex-1 min-w-0'>
            <h2 className='font-semibold text-white/90 text-[15px] leading-[1.4] line-clamp-2'>
              {note.title || 'Untitled'}
            </h2>
            <div className='flex items-center gap-2 mt-0.5'>
              <span className='text-[11px] text-gray-400 whitespace-nowrap'>
                {formatDate(note.updated_at)}
              </span>
              <p className='text-[13px] text-gray-400 leading-[1.6] line-clamp-1 flex-1 min-w-0'>
                {note.preview || 'No content'}
              </p>
            </div>
          </div>
          {/* Assigned Members - Right side */}
          {note.workspace_member_note &&
            note.workspace_member_note.length > 0 && (
              <div className='flex items-center gap-1 shrink-0'>
                <div className='flex -space-x-2'>
                  {note.workspace_member_note
                    .filter(
                      assignment =>
                        assignment.workspace_member_note_role === 'assignee'
                    )
                    .slice(0, 3)
                    .map((assignment, index) => (
                      <div
                        key={assignment.workspace_member?.id || `temp-${index}`}
                        className='w-6 h-6 rounded-full bg-linear-to-br from-blue-500 to-purple-500 border-2 border-gray-900 flex items-center justify-center text-white text-xs font-medium'
                        title={
                          assignment.workspace_member?.user_profiles?.name ||
                          'Unknown'
                        }
                      >
                        {assignment.workspace_member?.user_profiles
                          ?.avatar_url ? (
                          <Image
                            src={
                              assignment.workspace_member.user_profiles
                                .avatar_url
                            }
                            alt={
                              assignment.workspace_member.user_profiles.name ||
                              'User'
                            }
                            width={24}
                            height={24}
                            className='h-full w-full rounded-full object-cover'
                          />
                        ) : (
                          assignment.workspace_member?.user_profiles?.name
                            ?.charAt(0)
                            .toUpperCase() || '?'
                        )}
                      </div>
                    ))}
                  {note.workspace_member_note.filter(
                    assignment =>
                      assignment.workspace_member_note_role === 'assignee'
                  ).length > 3 && (
                    <div className='w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-white text-xs font-medium'>
                      +
                      {note.workspace_member_note.filter(
                        assignment =>
                          assignment.workspace_member_note_role === 'assignee'
                      ).length - 3}
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
      </GlassCard>
    );
  };

  const NoteCard = memo(NoteCardComponent);

  if (loading && !isSearching && notes.length === 0) {
    return (
      <div className='flex flex-col h-full text-gray-100 overflow-hidden'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <p className='text-gray-400 font-medium animate-pulse'>
              Loading notes...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col h-full text-gray-100 overflow-hidden'>
        <div className='flex-1 flex items-center justify-center p-4'>
          <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300 max-w-md w-full'>
            <div className='flex items-center justify-between'>
              <span>{error}</span>
              <button
                onClick={refetch}
                className='text-sm px-3 py-1 bg-red-600/20 hover:bg-red-600/30 rounded-md transition-colors'
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full text-gray-100 overflow-hidden'>
      {/* Scrollable Notes List */}
      <ScrollableView className='md:px-6 pt-32 pb-24'>
        {activeNotes.length === 0 && folders.length === 0 && !searchQuery ? (
          <div className='text-center py-12'>
            <FolderOpen className='w-12 h-12 text-gray-600 mx-auto mb-3' />
            <h3 className='text-lg font-medium text-white mb-2'>
              No notes yet
            </h3>
            <p className='text-gray-400 mb-6'>
              Create your first note to get started
            </p>
            <GlassButton
              onClick={handleCreateNote}
              disabled={isCreating}
              className='px-6 py-2.5 rounded-xl'
            >
              {isCreating ? 'Creating...' : 'Create Note'}
            </GlassButton>
          </div>
        ) : activeNotes.length === 0 && searchQuery ? (
          <div className='text-center py-12'>
            <FolderOpen className='w-12 h-12 text-gray-600 mx-auto mb-3' />
            <h3 className='text-lg font-medium text-white mb-2'>
              No notes found
            </h3>
            <p className='text-gray-400'>{`No notes match "${searchQuery}"`}</p>
          </div>
        ) : selectedFolder !== null ? (
          // Show selected folder or trash
          <div className='flex flex-col gap-6'>
            <FolderGroupHeader
              folderName={
                selectedFolder === 'trash'
                  ? 'Trash'
                  : folders.find(f => f.id === selectedFolder)?.title || ''
              }
              isCollapsed={false}
              onToggle={() => {}}
              showBackButton={true}
              onBack={() => setSelectedFolder(null)}
            />
            <div className='flex flex-col'>
              {(selectedFolder === 'trash'
                ? deletedNotes
                : typeof selectedFolder === 'number'
                  ? activeNotes.filter(
                      note => note.note_folder_id === selectedFolder
                    )
                  : []
              ).map((note, index, arr) => (
                <div key={note.id}>
                  <NoteCard note={note} />
                  {index < arr.length - 1 && (
                    <div className='border-b border-white/10' />
                  )}
                </div>
              ))}
              {(selectedFolder === 'trash'
                ? deletedNotes
                : typeof selectedFolder === 'number'
                  ? activeNotes.filter(
                      note => note.note_folder_id === selectedFolder
                    )
                  : []
              ).length === 0 && (
                <div className='text-center py-12 text-gray-400'>
                  {selectedFolder === 'trash'
                    ? 'Trash is empty'
                    : 'No notes in this folder'}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-6'>
            {/* Active Notes by Folder Groups */}
            {sortedGroups.map(group => {
              const isCollapsed = collapsedFolders.has(group);
              return (
                <div key={group}>
                  {/* Folder Group Header */}
                  <FolderGroupHeader
                    folderName={group}
                    isCollapsed={isCollapsed}
                    onToggle={() => {
                      setCollapsedFolders(prev => {
                        const next = new Set(prev);
                        if (next.has(group)) {
                          next.delete(group);
                        } else {
                          next.add(group);
                        }
                        return next;
                      });
                    }}
                  />
                  {/* Notes in this group */}
                  {!isCollapsed && (
                    <div className='flex flex-col'>
                      {groupedNotes[group].map((note, index, arr) => (
                        <div key={note.id}>
                          <NoteCard note={note} />
                          {index < arr.length - 1 && (
                            <div className='border-b border-white/10 py-0.5' />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </ScrollableView>

      {/* Bottom Search Bar and Create Button - sits at bottom with transparent nav above */}
      <div className='fixed left-0 right-0 bottom-0 z-100 px-4 py-4'>
        <div className='relative flex items-center gap-3 max-w-7xl mx-auto'>
          <SearchBar
            placeholder='Search notes...'
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
          />

          {/* Create Button */}
          <GlassButton
            onClick={handleCreateNote}
            disabled={isCreating}
            size='icon'
            className='disabled:cursor-not-allowed shrink-0 size-12'
          >
            {isCreating ? (
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-300'></div>
            ) : (
              <PenSquare className='w-5 h-5 text-white' />
            )}
          </GlassButton>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <NoteContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          isDeleted={contextMenu.isDeleted}
          onSoftDelete={
            !contextMenu.isDeleted
              ? () => handleSoftDelete(contextMenu.noteId)
              : undefined
          }
          onHardDelete={
            contextMenu.isDeleted
              ? () => setShowHardDeleteConfirm(contextMenu.noteId)
              : undefined
          }
          onDuplicate={
            !contextMenu.isDeleted
              ? () => handleDuplicate(contextMenu.noteId)
              : undefined
          }
          onRestore={
            contextMenu.isDeleted
              ? () => handleRestore(contextMenu.noteId)
              : undefined
          }
          onMove={
            !contextMenu.isDeleted
              ? () => {
                  setNoteToMove(contextMenu.noteId.toString());
                  setShowMoveDrawer(true);
                  setContextMenu(null);
                }
              : undefined
          }
        />
      )}

      {/* Move Folder Drawer */}
      {showMoveDrawer && noteToMove && (
        <MoveFolderDrawer
          isOpen={showMoveDrawer}
          onClose={() => {
            setShowMoveDrawer(false);
            setNoteToMove(null);
          }}
          onMove={handleMove}
          currentFolderId={
            noteToMove
              ? notes.find(n => n.id.toString() === noteToMove)
                  ?.note_folder_id || null
              : null
          }
          folders={folders}
          createFolder={createFolder}
        />
      )}

      {/* Hard Delete Confirmation Modal */}
      {showHardDeleteConfirm && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <GlassCard className='p-6 max-w-sm w-full rounded-2xl'>
            <h3 className='text-lg font-semibold text-white mb-2'>
              Delete Permanently
            </h3>
            <p className='text-gray-400 mb-6 text-sm leading-relaxed'>
              Are you sure you want to permanently delete this note? This action
              cannot be undone.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={() => setShowHardDeleteConfirm(null)}
                className='flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 font-medium'
              >
                Cancel
              </button>
              <button
                onClick={() => handleHardDelete(showHardDeleteConfirm)}
                className='flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg shadow-red-500/20'
              >
                Delete
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Empty Trash Confirmation Modal */}
      {showEmptyTrashConfirm && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <GlassCard className='p-6 max-w-sm w-full rounded-2xl'>
            <h3 className='text-lg font-semibold text-white mb-2'>
              Empty Trash
            </h3>
            <p className='text-gray-400 mb-6 text-sm leading-relaxed'>
              Are you sure you want to permanently delete all{' '}
              {deletedNotes.length} note
              {deletedNotes.length !== 1 ? 's' : ''} in the trash? This action
              cannot be undone.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={() => setShowEmptyTrashConfirm(false)}
                className='flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 font-medium'
              >
                Cancel
              </button>
              <button
                onClick={handleEmptyTrash}
                className='flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg shadow-red-500/20'
              >
                Empty Trash
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

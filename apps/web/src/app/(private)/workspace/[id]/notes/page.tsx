'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, memo, useMemo, useEffect } from 'react';
import { useWorkspaceNotes, formatDate } from '@/hooks/useWorkspaceNotes';
import type { NoteWithParsed } from '@/types/note';
import { PenSquare, Trash2, FolderOpen } from 'lucide-react';
import NoteContextMenu from '@/features/workspace/components/NoteContextMenu';
import SearchBar from '@/components/SearchBar';
import GlassButton from '@/components/glass-card/GlassButton';
import GlassCard from '@/components/glass-card/GlassCard';
import FolderDropdown from '@/components/FolderDropdown';
import MoveFolderDrawer from '@/components/MoveFolderDrawer';
import { useNoteFolders } from '@/hooks/useNoteFolders';
import ScrollableView from '@/components/layout/ScrollableView';

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

  const [selectedFolder, setSelectedFolder] = useState<
    'all' | 'notes' | 'trash' | number
  >('all');
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
  } = useWorkspaceNotes(workspaceId);

  const {
    folders: rawFolders,
    moveNote,
    createFolder,
    updateFolder,
    deleteFolder,
  } = useNoteFolders(workspaceId || 0);

  // Add note counts to folders
  const folders = useMemo(() => {
    return rawFolders.map(folder => ({
      ...folder,
      note_count: notes.filter(
        n => !n.deleted_at && n.note_folder_id === folder.id
      ).length,
    }));
  }, [rawFolders, notes]);

  const [isSearching, setIsSearching] = useState(false);

  // Filter notes based on selected folder
  const filteredNotes = useMemo(() => {
    if (selectedFolder === 'all') {
      return notes.filter(note => !note.deleted_at);
    } else if (selectedFolder === 'notes') {
      return notes.filter(note => !note.deleted_at && !note.note_folder_id);
    } else if (selectedFolder === 'trash') {
      return notes.filter(note => note.deleted_at);
    } else {
      return notes.filter(
        note => !note.deleted_at && note.note_folder_id === selectedFolder
      );
    }
  }, [notes, selectedFolder]);

  // Separate active and deleted notes
  const activeNotes = selectedFolder === 'trash' ? [] : filteredNotes;
  const deletedNotes =
    selectedFolder === 'trash'
      ? filteredNotes
      : notes.filter(note => note.deleted_at);
  const unfolderedNotes = notes.filter(
    note => !note.deleted_at && !note.note_folder_id
  );

  // Calculate note counts for dropdown
  const noteCounts = useMemo(
    () => ({
      all: notes.filter(note => !note.deleted_at).length,
      notes: unfolderedNotes.length,
      trash: deletedNotes.length,
    }),
    [notes, unfolderedNotes, deletedNotes]
  );

  // Refetch when folder selection changes
  useEffect(() => {
    if (!isMoving) {
      refetch();
    }
  }, [selectedFolder, refetch, isMoving]);

  // Group active notes by date
  const groupedNotes = groupNotesByTime(activeNotes);
  const sortedGroups = sortGroupKeys(Object.keys(groupedNotes));

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

      // Determine folder ID based on current view
      let currentFolderId: number | null = null;
      if (typeof selectedFolder === 'number') {
        currentFolderId = selectedFolder;
      }
      // If 'all' or 'trash', create in default folder (null)

      const newNote = await createNote('Untitled', '', currentFolderId);
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

      // Refetch to update the lists
      await refetch();

      // Close drawer
      setShowMoveDrawer(false);
      setNoteToMove(null);

      // Update dropdown selection to show the destination folder
      if (folderId === null) {
        setSelectedFolder('notes');
      } else {
        setSelectedFolder(folderId);
      }
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
        className={`group relative rounded-[20px] px-5 py-[8px] cursor-pointer select-none ${
          isDeleted ? 'opacity-60' : ''
        }`}
        onClick={() => !isDeleted && handleNoteClick(note.id)}
        onContextMenu={e => handleContextMenu(e, note.id, isDeleted)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div className='flex justify-between items-start gap-3 mb-1'>
          <div className='flex-1 min-w-0'>
            <h2 className='font-semibold text-white text-[17px] leading-[1.4] line-clamp-2'>
              {note.title || 'Untitled'}
            </h2>
          </div>
          <span className='text-[11px] text-gray-400 whitespace-nowrap mt-0.5'>
            {formatDate(note.updated_at)}
          </span>
        </div>
        <p className='text-[13px] text-gray-400 leading-[1.6] line-clamp-2 mb-1'>
          {note.preview || 'No content'}
        </p>
        {/* Assigned Members */}
        {note.workspace_member_note &&
          note.workspace_member_note.length > 0 && (
            <div className='flex items-center gap-1.5 mt-2 mb-1'>
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
                            assignment.workspace_member.user_profiles.avatar_url
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
              <span className='text-xs text-gray-500'>担当者</span>
            </div>
          )}
      </GlassCard>
    );
  };

  const NoteCard = memo(NoteCardComponent);

  if (loading && !isSearching) {
    return (
      <div className='flex justify-center items-center py-12'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300'>
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
    );
  }

  return (
    <div className='flex flex-col h-full text-gray-100 overflow-hidden'>
      {/* Absolutely Positioned Folder Dropdown */}
      <div className='absolute top-29 left-1/2 -translate-x-1/2 z-50'>
        <FolderDropdown
          folders={folders}
          selectedFolder={selectedFolder}
          onFolderSelect={setSelectedFolder}
          onCreateFolder={async (name: string) => {
            await createFolder(name);
          }}
          onUpdateFolder={async (id: number, name: string) => {
            await updateFolder(id, name);
          }}
          onDeleteFolder={async (id: number) => {
            await deleteFolder(id);
          }}
          noteCounts={noteCounts}
        />
      </div>

      {/* Scrollable Notes List */}
      <ScrollableView className='md:px-6 pt-32 pb-24'>
        {activeNotes.length === 0 &&
        (selectedFolder === 'trash' ? deletedNotes.length === 0 : true) ? (
          <div className='text-center py-12'>
            {selectedFolder === 'trash' ? (
              <>
                <Trash2 className='w-12 h-12 text-gray-600 mx-auto mb-3' />
                <h3 className='text-lg font-medium text-white mb-2'>
                  Trash is empty
                </h3>
                <p className='text-gray-400'>Deleted notes will appear here</p>
              </>
            ) : (
              <>
                <FolderOpen className='w-12 h-12 text-gray-600 mx-auto mb-3' />
                <h3 className='text-lg font-medium text-white mb-2'>
                  {searchQuery
                    ? 'No notes found'
                    : selectedFolder === 'all'
                      ? 'No notes yet'
                      : selectedFolder === 'notes'
                        ? 'No unfiled notes'
                        : 'Folder is empty'}
                </h3>
                <p className='text-gray-400'>
                  {searchQuery
                    ? `No notes match "${searchQuery}"`
                    : selectedFolder === 'all'
                      ? 'Create your first note to get started'
                      : selectedFolder === 'notes'
                        ? 'Notes without a folder will appear here'
                        : 'Create a note or move one here'}
                </p>
              </>
            )}
          </div>
        ) : (
          <div className='flex flex-col gap-6'>
            {/* Active Notes by Date Groups */}
            {sortedGroups.map(group => (
              <div key={group}>
                {/* Group Header */}
                <h3 className='text-sm font-medium text-gray-400 mb-3 px-1'>
                  {group}
                </h3>
                {/* Notes in this group */}
                <div className='flex flex-col gap-[14px]'>
                  {groupedNotes[group].map(note => (
                    <NoteCard key={note.id} note={note} />
                  ))}
                </div>
              </div>
            ))}

            {/* Trash Section - only show when viewing all notes */}
            {selectedFolder === 'trash' && deletedNotes.length > 0 && (
              <div className='mt-6'>
                <div className='flex items-center justify-between mb-3 px-1'>
                  <h3 className='text-sm font-medium text-gray-400'>
                    {deletedNotes.length} deleted note
                    {deletedNotes.length !== 1 ? 's' : ''}
                  </h3>
                  <button
                    onClick={() => setShowEmptyTrashConfirm(true)}
                    className='text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-all duration-200 font-medium'
                  >
                    Empty Trash
                  </button>
                </div>
                <div className='flex flex-col gap-[14px]'>
                  {deletedNotes.map(note => (
                    <NoteCard key={note.id} note={note} isDeleted={true} />
                  ))}
                </div>
              </div>
            )}
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
          {selectedFolder !== 'trash' && (
            <GlassButton
              onClick={handleCreateNote}
              disabled={isCreating}
              size='icon'
              className='size-11 disabled:cursor-not-allowed shrink-0'
            >
              {isCreating ? (
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-300'></div>
              ) : (
                <PenSquare className='w-5 h-5 text-white' />
              )}
            </GlassButton>
          )}
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
          folders={folders}
          onMove={handleMove}
          onCreateFolder={async (name: string) => {
            await createFolder(name);
          }}
          currentFolderId={
            noteToMove
              ? notes.find(n => n.id.toString() === noteToMove)
                  ?.note_folder_id || null
              : null
          }
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

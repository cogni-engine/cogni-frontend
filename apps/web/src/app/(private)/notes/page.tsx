'use client';

import NoteList from '@/features/notes/components/NoteList';
import { useNotes, formatDate, useNoteMutations } from '@/hooks/useNotes';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { getPersonalWorkspaceId } from '@/lib/cookies';
import { PenSquare, Trash2 } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import GlassButton from '@/components/glass-card/GlassButton';
import GlassCard from '@/components/glass-card/GlassCard';
import NoteContextMenu from '@/features/workspace/components/NoteContextMenu';
import MoveFolderDrawer from '@/components/MoveFolderDrawer';
import FolderDropdown from '@/components/FolderDropdown';
import { useNoteFolders } from '@/hooks/useNoteFolders';
import { useGlobalUI } from '@/contexts/GlobalUIContext';

export default function NotesPage() {
  const router = useRouter();
  const { isInputActive } = useGlobalUI();
  const [selectedFolder, setSelectedFolder] = useState<
    'all' | 'notes' | 'trash' | number
  >('all');

  const {
    notes,
    loading,
    error,
    searchNotes,
    softDeleteNote,
    deleteNote,
    restoreNote,
    duplicateNote,
    emptyTrash,
    refetch,
  } = useNotes();
  const { create } = useNoteMutations();
  const personalWorkspaceId = getPersonalWorkspaceId();
  const {
    folders: rawFolders,
    moveNote,
    createFolder,
    updateFolder,
    deleteFolder,
  } = useNoteFolders(personalWorkspaceId || 0);

  // Add note counts to folders
  const folders = useMemo(() => {
    return rawFolders.map(folder => ({
      ...folder,
      note_count: notes.filter(
        n => !n.deleted_at && n.note_folder_id === folder.id
      ).length,
    }));
  }, [rawFolders, notes]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    noteId: string;
    isDeleted: boolean;
  } | null>(null);
  const [showHardDeleteConfirm, setShowHardDeleteConfirm] = useState<
    string | null
  >(null);
  const [showEmptyTrashConfirm, setShowEmptyTrashConfirm] = useState(false);
  const [showMoveDrawer, setShowMoveDrawer] = useState(false);
  const [noteToMove, setNoteToMove] = useState<string | null>(null);

  // Filter notes based on selected folder
  const filteredNotes = useMemo(() => {
    if (selectedFolder === 'trash') {
      // Show only deleted notes
      return notes.filter(note => note.deleted_at);
    } else if (selectedFolder === 'all') {
      // Show all active notes (no folder filter)
      return notes.filter(note => !note.deleted_at);
    } else if (selectedFolder === 'notes') {
      // Show notes with null folder_id (default Notes folder)
      return notes.filter(note => !note.deleted_at && !note.note_folder_id);
    } else {
      // Show notes in specific folder (not deleted)
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

  const formattedActiveNotes = activeNotes.map(note => ({
    id: note.id.toString(),
    title: note.title,
    date: formatDate(note.updated_at),
    preview: note.preview,
    workspace: note.workspace,
    isGroupNote:
      note.workspace?.type === 'group' &&
      note.workspace_id !== personalWorkspaceId,
    updated_at: note.updated_at,
    deleted_at: note.deleted_at,
  }));

  const formattedDeletedNotes = deletedNotes.map(note => ({
    id: note.id.toString(),
    title: note.title,
    date: formatDate(note.updated_at),
    preview: note.preview,
    workspace: note.workspace,
    isGroupNote:
      note.workspace?.type === 'group' &&
      note.workspace_id !== personalWorkspaceId,
    updated_at: note.updated_at,
    deleted_at: note.deleted_at,
  }));

  const handleCreateNote = async () => {
    try {
      setIsCreating(true);
      const workspaceId = getPersonalWorkspaceId();
      if (!workspaceId) {
        throw new Error('No personal workspace found');
      }

      // Create a new note with empty/default content and current selected folder
      let currentFolderId: number | null = null;
      if (selectedFolder === 'notes') {
        currentFolderId = null; // Default folder
      } else if (typeof selectedFolder === 'number') {
        currentFolderId = selectedFolder;
      }
      // If 'all' or 'trash', create in default folder (null)

      const newNote = await create('Untitled', '', currentFolderId);

      // Navigate to the new note page
      router.push(`/notes/${newNote.id}`);
    } catch (err) {
      console.error('Failed to create note:', err);
      // TODO: Show error toast/notification
    } finally {
      setIsCreating(false);
    }
  };

  const handleNoteClick = (id: string) => {
    router.push(`/notes/${id}`);
  };

  const handleContextMenu = (
    e: React.MouseEvent,
    noteId: string,
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

  const handleSoftDelete = async (noteId: string) => {
    try {
      await softDeleteNote(parseInt(noteId));
    } catch (err) {
      console.error('Failed to soft delete note:', err);
    }
  };

  const handleHardDelete = async (noteId: string) => {
    try {
      await deleteNote(parseInt(noteId));
      setShowHardDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to permanently delete note:', err);
    }
  };

  const handleRestore = async (noteId: string) => {
    try {
      await restoreNote(parseInt(noteId));
    } catch (err) {
      console.error('Failed to restore note:', err);
    }
  };

  const handleDuplicate = async (noteId: string) => {
    try {
      await duplicateNote(parseInt(noteId));
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

  const handleOpenMoveDrawer = (noteId: string) => {
    setNoteToMove(noteId);
    setShowMoveDrawer(true);
    setContextMenu(null);
  };

  const handleMove = async (folderId: number | null) => {
    if (!noteToMove) return;

    try {
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
    }
  };

  const handleCreateFolderInDrawer = async (name: string) => {
    try {
      await createFolder(name);
      // Folders will be automatically refetched by the hook
    } catch (err) {
      console.error('Failed to create folder:', err);
      throw err;
    }
  };

  return (
    <div className='flex flex-col h-full text-gray-100 relative overflow-hidden'>
      {/* 固定ヘッダー（フォルダードロップダウンのみ） */}
      <div className='relative z-20 px-4 md:px-6 md:pt-6 pb-4'>
        {/* Folder Dropdown */}
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

      {/* スクロール可能エリア（ノートリストのみ） */}
      <div
        className='relative z-10 flex-1 overflow-y-auto px-4 md:px-6 pb-32 md:pb-24'
        style={{
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {loading && (
          <div className='flex justify-center items-center py-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
          </div>
        )}

        {error && (
          <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300'>
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {selectedFolder === 'trash' ? (
              /* Trash View */
              <div>
                {deletedNotes.length > 0 ? (
                  <>
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
                    <NoteList
                      notes={formattedDeletedNotes}
                      onNoteClick={handleNoteClick}
                      onContextMenu={handleContextMenu}
                    />
                  </>
                ) : (
                  <div className='text-center py-12'>
                    <Trash2 className='w-12 h-12 text-gray-600 mx-auto mb-3' />
                    <h3 className='text-lg font-medium text-white mb-2'>
                      Trash is empty
                    </h3>
                    <p className='text-gray-400'>
                      Deleted notes will appear here
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Notes View */
              <>
                {formattedActiveNotes.length > 0 ? (
                  <NoteList
                    notes={formattedActiveNotes}
                    onNoteClick={handleNoteClick}
                    onContextMenu={handleContextMenu}
                  />
                ) : (
                  <div className='text-center py-12'>
                    <PenSquare className='w-12 h-12 text-gray-600 mx-auto mb-3' />
                    <h3 className='text-lg font-medium text-white mb-2'>
                      {searchQuery ? 'No matching notes' : 'No notes yet'}
                    </h3>
                    <p className='text-gray-400 mb-6'>
                      {searchQuery
                        ? `No notes match "${searchQuery}"`
                        : 'Create your first note to get started'}
                    </p>
                    {!searchQuery && selectedFolder !== 'all' && (
                      <GlassButton
                        onClick={handleCreateNote}
                        className='px-6 py-2.5 rounded-xl'
                      >
                        Create Note
                      </GlassButton>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Bottom Search Bar and Create Button */}
      <div
        className={`fixed left-0 right-0 z-30 px-4 py-4 transition-all duration-300 ${
          isInputActive ? 'bottom-0' : 'bottom-[72px] md:bottom-0'
        }`}
      >
        {/* Glass-morphism background with gradient mask */}
        <div className='relative flex items-center gap-3 max-w-7xl mx-auto'>
          <SearchBar
            placeholder='Search notes...'
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(e.target.value);
              searchNotes(e.target.value);
            }}
          />

          {/* 新規作成ボタン */}
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
              ? () => handleOpenMoveDrawer(contextMenu.noteId)
              : undefined
          }
        />
      )}

      {/* Move Folder Drawer */}
      <MoveFolderDrawer
        isOpen={showMoveDrawer}
        onClose={() => {
          setShowMoveDrawer(false);
          setNoteToMove(null);
        }}
        folders={folders}
        currentFolderId={
          noteToMove
            ? notes.find(n => n.id.toString() === noteToMove)?.note_folder_id ||
              null
            : null
        }
        onMove={handleMove}
        onCreateFolder={handleCreateFolderInDrawer}
      />

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

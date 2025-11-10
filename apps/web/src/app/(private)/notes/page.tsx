'use client';

import NoteList from '@/features/notes/components/NoteList';
import { useNotes, formatDate, useNoteMutations } from '@/hooks/useNotes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getPersonalWorkspaceId } from '@/lib/cookies';
import { PenSquare, Trash2 } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import GlassButton from '@/components/glass-card/GlassButton';
import GlassCard from '@/components/glass-card/GlassCard';
import NoteContextMenu from '@/features/workspace/components/NoteContextMenu';

export default function NotesPage() {
  const router = useRouter();
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
  } = useNotes();
  const { create } = useNoteMutations();
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

  const personalWorkspaceId = getPersonalWorkspaceId();

  // Separate active and deleted notes
  const activeNotes = notes.filter(note => !note.deleted_at);
  const deletedNotes = notes.filter(note => note.deleted_at);

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

      // Create a new note with empty/default content
      const newNote = await create('Untitled', '');

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

  return (
    <div className='flex flex-col h-full text-gray-100 relative overflow-hidden'>
      {/* 固定ヘッダー（タイトル + 検索バー + 新規作成ボタン） */}
      <div className='relative z-20 px-4 md:px-6 pt-4 md:pt-6 pb-4'>
        {/* 検索バー + 新規作成ボタン */}
        <div className='flex w-full items-center justify-between gap-3'>
          <SearchBar
            placeholder='Search notes...'
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(e.target.value);
              searchNotes(e.target.value);
            }}
          />

          {/* 新規作成ボタン */}
          <GlassButton
            onClick={handleCreateNote}
            disabled={isCreating}
            size='icon'
            className='size-11 disabled:cursor-not-allowed'
          >
            {isCreating ? (
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-300'></div>
            ) : (
              <PenSquare className='w-5 h-5 text-white' />
            )}
          </GlassButton>
        </div>
      </div>

      {/* スクロール可能エリア（ノートリストのみ） */}
      <div
        className='relative z-10 flex-1 overflow-y-auto px-4 md:px-6 pb-4'
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
            <NoteList
              notes={formattedActiveNotes}
              onNoteClick={handleNoteClick}
              onContextMenu={handleContextMenu}
            />

            {/* Trash Section */}
            {deletedNotes.length > 0 && (
              <div className='mt-6'>
                <div className='flex items-center justify-between mb-3 px-1'>
                  <h3 className='text-sm font-medium text-gray-400 flex items-center gap-2'>
                    <Trash2 className='w-4 h-4' />
                    Trash ({deletedNotes.length})
                  </h3>
                  <button
                    onClick={() => setShowEmptyTrashConfirm(true)}
                    className='text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-all duration-200 font-medium'
                  >
                    Empty Trash
                  </button>
                </div>
                <div className='flex flex-col gap-[14px]'>
                  <NoteList
                    notes={formattedDeletedNotes}
                    onNoteClick={handleNoteClick}
                    onContextMenu={handleContextMenu}
                  />
                </div>
              </div>
            )}
          </>
        )}
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

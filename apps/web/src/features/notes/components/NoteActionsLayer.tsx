'use client';

import {
  useState,
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from 'react';
import NoteContextMenu from '@/features/workspace/components/NoteContextMenu';
import MoveFolderDrawer from '@/components/MoveFolderDrawer';
import { HardDeleteModal } from './HardDeleteModal';
import { EmptyTrashModal } from './EmptyTrashModal';
import { useNotesContext } from '../NotesProvider';

type ContextMenuState = {
  x: number;
  y: number;
  noteId: string;
  isDeleted: boolean;
} | null;

type NoteActionsContextType = {
  openContextMenu: (
    e: React.MouseEvent,
    noteId: string,
    isDeleted: boolean
  ) => void;
  openEmptyTrashConfirm: () => void;
};

const NoteActionsContext = createContext<NoteActionsContextType | null>(null);

export function useNoteActions() {
  const context = useContext(NoteActionsContext);
  if (!context) {
    throw new Error('useNoteActions must be used within NoteActionsLayer');
  }
  return context;
}

export function NoteActionsLayer({ children }: { children: ReactNode }) {
  const {
    notes,
    deletedNotes,
    softDeleteNote,
    deleteNote,
    restoreNote,
    duplicateNote,
    emptyTrash,
    moveNote,
    refetch,
    setSelectedFolder,
  } = useNotesContext();

  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);
  const [showHardDeleteConfirm, setShowHardDeleteConfirm] = useState<
    string | null
  >(null);
  const [showEmptyTrashConfirm, setShowEmptyTrashConfirm] = useState(false);
  const [showMoveDrawer, setShowMoveDrawer] = useState(false);
  const [noteToMove, setNoteToMove] = useState<string | null>(null);

  const openContextMenu = useCallback(
    (e: React.MouseEvent, noteId: string, isDeleted: boolean) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY, noteId, isDeleted });
    },
    []
  );

  const openEmptyTrashConfirm = useCallback(() => {
    setShowEmptyTrashConfirm(true);
  }, []);

  const handleSoftDelete = async (noteId: string) => {
    try {
      await softDeleteNote(parseInt(noteId));
      setContextMenu(null);
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
      setContextMenu(null);
    } catch (err) {
      console.error('Failed to restore note:', err);
    }
  };

  const handleDuplicate = async (noteId: string) => {
    try {
      await duplicateNote(parseInt(noteId));
      setContextMenu(null);
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
      await moveNote(parseInt(noteToMove), folderId);
      await refetch();
      setShowMoveDrawer(false);
      setNoteToMove(null);
      setSelectedFolder(folderId === null ? 'notes' : folderId);
    } catch (err) {
      console.error('Failed to move note:', err);
    }
  };

  return (
    <NoteActionsContext.Provider
      value={{ openContextMenu, openEmptyTrashConfirm }}
    >
      {children}

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

      <MoveFolderDrawer
        isOpen={showMoveDrawer}
        onClose={() => {
          setShowMoveDrawer(false);
          setNoteToMove(null);
        }}
        currentFolderId={
          noteToMove
            ? notes.find(n => n.id.toString() === noteToMove)?.note_folder_id ||
              null
            : null
        }
        onMove={handleMove}
      />

      <HardDeleteModal
        isOpen={!!showHardDeleteConfirm}
        onClose={() => setShowHardDeleteConfirm(null)}
        onConfirm={() => {
          if (showHardDeleteConfirm) {
            handleHardDelete(showHardDeleteConfirm);
          }
        }}
      />

      <EmptyTrashModal
        isOpen={showEmptyTrashConfirm}
        noteCount={deletedNotes.length}
        onClose={() => setShowEmptyTrashConfirm(false)}
        onConfirm={handleEmptyTrash}
      />
    </NoteActionsContext.Provider>
  );
}

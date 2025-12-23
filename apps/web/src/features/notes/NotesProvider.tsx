import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';
import { useNoteFolders } from './hooks/useNoteFolders';
import { NoteFolder, NoteWithParsed } from '@/types/note';
import { useNotes } from './hooks/useNotes';
import { formatDate } from './lib/noteHelpers';

export type FormattedNote = {
  id: string;
  title: string;
  date: string;
  preview: string;
  workspace?: {
    id: number;
    title: string;
    type: 'group' | 'personal';
    created_at?: string;
    icon_url?: string | null;
  };
  isGroupNote?: boolean;
  updated_at: string;
  deleted_at?: string | null;
  note_folder_id?: number | null;
};

type NotesContextType = {
  // Data
  notes: NoteWithParsed[];
  formattedActiveNotes: FormattedNote[];
  formattedDeletedNotes: FormattedNote[];
  deletedNotes: NoteWithParsed[];
  unfolderedNotes: NoteWithParsed[];
  folders: NoteFolder[];

  // State
  loading: boolean;
  error: string | null;
  searchQuery: string;
  handleSearch: (query: string) => void;

  // Folder operations
  moveNote: (noteId: number, folderId: number | null) => Promise<void>;
  createFolder: (title: string) => Promise<NoteFolder>;
  updateFolder: (id: number, title: string) => Promise<NoteFolder>;
  deleteFolder: (id: number) => Promise<void>;

  // Note operations
  createNote: (
    title: string,
    content: string,
    folderId?: number | null
  ) => Promise<NoteWithParsed>;
  softDeleteNote: (id: number) => Promise<NoteWithParsed>;
  deleteNote: (id: number) => Promise<void>;
  restoreNote: (id: number) => Promise<NoteWithParsed>;
  duplicateNote: (id: number) => Promise<NoteWithParsed>;
  emptyTrash: () => Promise<void>;
  refetch: () => Promise<void>;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({
  children,
  workspaceId,
}: {
  children: ReactNode;
  workspaceId: number;
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    folders: rawFolders,
    moveNote: moveNoteToFolder,
    createFolder,
    updateFolder,
    deleteFolder,
    refetch: refetchFolders,
  } = useNoteFolders({
    workspaceId: workspaceId || 0,
  });

  // Listen for folder updates from Header
  React.useEffect(() => {
    const handleFoldersUpdated = () => {
      refetchFolders();
    };
    window.addEventListener('folders-updated', handleFoldersUpdated);
    return () => {
      window.removeEventListener('folders-updated', handleFoldersUpdated);
    };
  }, [refetchFolders]);

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
    refetch: refetchNotes,
    createNote,
  } = useNotes({
    workspaceId: workspaceId || 0,
    includeDeleted: true,
    includeAssignedNotes: true,
  });

  // Combined refetch for notes and folders
  const refetch = async () => {
    await Promise.all([refetchNotes(), refetchFolders()]);
  };

  // Search handler that updates both state and triggers API search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchNotes(query);
  };

  // Move note wrapper that refetches both notes and folders
  const moveNote = async (noteId: number, folderId: number | null) => {
    await moveNoteToFolder(noteId, folderId);
    await refetchNotes();
  };

  // Use folders directly without note counts
  const folders = rawFolders;

  // Always show all active notes (no folder filtering)
  const activeNotes = useMemo(() => {
    return notes.filter(note => !note.deleted_at);
  }, [notes]);

  // Separate active and deleted notes
  const formattedActiveNotes = useMemo(() => {
    return activeNotes.map(note => ({
      id: note.id.toString(),
      title: note.title,
      date: formatDate(note.updated_at),
      preview: note.preview,
      workspace: note.workspace,
      isGroupNote:
        note.workspace?.type === 'group' && note.workspace_id !== workspaceId,
      updated_at: note.updated_at,
      deleted_at: note.deleted_at,
      note_folder_id: note.note_folder_id,
    }));
  }, [activeNotes, workspaceId]);

  const deletedNotes = useMemo(() => {
    return notes.filter(note => note.deleted_at);
  }, [notes]);

  const unfolderedNotes = notes.filter(
    note => !note.deleted_at && !note.note_folder_id
  );

  const formattedDeletedNotes = useMemo(() => {
    return deletedNotes.map(note => ({
      id: note.id.toString(),
      title: note.title,
      date: formatDate(note.updated_at),
      preview: note.preview,
      workspace: note.workspace,
      isGroupNote:
        note.workspace?.type === 'group' && note.workspace_id !== workspaceId,
      updated_at: note.updated_at,
      deleted_at: note.deleted_at,
    }));
  }, [deletedNotes, workspaceId]);

  return (
    <NotesContext.Provider
      value={{
        // Data
        notes,
        formattedActiveNotes,
        formattedDeletedNotes,
        deletedNotes,
        unfolderedNotes,
        folders,

        // State
        loading,
        error,
        searchQuery,
        handleSearch,

        // Folder operations
        moveNote,
        createFolder,
        updateFolder,
        deleteFolder,

        // Note operations
        createNote,
        softDeleteNote,
        deleteNote,
        restoreNote,
        duplicateNote,
        emptyTrash,
        refetch,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export function useNotesContext() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  return context;
}

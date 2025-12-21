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
  folders: (NoteFolder & { note_count: number })[];
  noteCounts: { all: number; notes: number; trash: number };

  // State
  loading: boolean;
  error: string | null;
  selectedFolder: 'all' | 'notes' | 'trash' | number;
  setSelectedFolder: (folder: 'all' | 'notes' | 'trash' | number) => void;
  sortBy: 'time' | 'folder';
  setSortBy: (sort: 'time' | 'folder') => void;
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
  const [selectedFolder, setSelectedFolder] = useState<
    'all' | 'notes' | 'trash' | number
  >('all');
  const [sortBy, setSortBy] = useState<'time' | 'folder'>('time');
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

  // Add note counts to folders
  const folders = useMemo(() => {
    return rawFolders.map(folder => ({
      ...folder,
      note_count: notes.filter(
        n => !n.deleted_at && n.note_folder_id === folder.id
      ).length,
    }));
  }, [rawFolders, notes]);

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
  const formattedActiveNotes = useMemo(() => {
    if (selectedFolder === 'trash') {
      return [];
    }
    return filteredNotes.map(note => ({
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
  }, [filteredNotes, selectedFolder, workspaceId]);

  const deletedNotes =
    selectedFolder === 'trash'
      ? filteredNotes
      : notes.filter(note => note.deleted_at);

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

  // Calculate note counts for dropdown
  const noteCounts = useMemo(
    () => ({
      all: notes.filter(note => !note.deleted_at).length,
      notes: unfolderedNotes.length,
      trash: deletedNotes.length,
    }),
    [notes, unfolderedNotes, deletedNotes]
  );

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
        noteCounts,

        // State
        loading,
        error,
        selectedFolder,
        setSelectedFolder,
        sortBy,
        setSortBy,
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

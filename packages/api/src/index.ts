// Export Supabase client
export { createClient, getClient, resetClient } from './supabase/client';

// Export auth functions
export {
  signUp,
  signIn,
  signInWithGoogle,
  signInWithApple,
  signOut,
  getCurrentUser,
  getSession,
} from './supabase/auth';

// Export workspace functions
export { getPersonalWorkspace } from './workspace';

// Export thread functions
export {
  getThreads,
  getThread,
  createThread,
  updateThread,
  deleteThread,
} from './threads';

// Export hooks
export { useAuth } from './hooks/useAuth';
export { useThreads } from './hooks/useThreads';
export { useMessages } from './hooks/useMessages';
export { useSendMessage } from './hooks/useSendMessage';

// Export note functions
export {
  getNotes,
  getNote,
  createNote,
  updateNote,
  updateNoteTitle,
  deleteNote,
  softDeleteNote,
  restoreNote,
  duplicateNote,
  emptyTrash,
  searchNotes,
  getUserAssignedNotes,
  parseNoteText,
  combineNoteText,
  assignNoteToMembers,
  getNoteAssignments,
} from './notes';

// Export folder functions
export {
  getFolders,
  getFolder,
  createFolder,
  updateFolder,
  deleteFolder,
  moveNoteToFolder,
  getFolderNoteCounts,
} from './folders';

// Export note hooks
export { useNotes } from './hooks/useNotes';
export { useNoteFolders } from './hooks/useNoteFolders';
export { useNoteEditor } from './hooks/useNoteEditor';

// Export note helpers
export { parseNote, formatDate } from './utils/noteHelpers';


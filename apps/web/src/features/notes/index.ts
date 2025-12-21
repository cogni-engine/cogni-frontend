// Hooks
export { useNotes } from './hooks/useNotes';
export { useNoteFolders } from './hooks/useNoteFolders';

// Provider & Context
export { NotesProvider, useNotesContext } from './NotesProvider';
export {
  NoteActionsLayer,
  useNoteActions,
} from './components/NoteActionsLayer';
export type { FormattedNote } from './NotesProvider';

// Helpers
export { parseNote, formatDate } from './lib/noteHelpers';

// Components
export { default as NoteList } from './components/NoteList';
export { default as PersonalNotesClient } from './PersonalNotesClient';

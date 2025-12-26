import type { Note, NoteWithParsed } from '@/types/note';

/**
 * Parse note into format with title, content, and preview
 * Now uses the dedicated title field when available, falling back to parsing from text
 */
export function parseNote(note: Note): NoteWithParsed {
  // Use the dedicated title field if available, otherwise use default
  let title: string;
  let content: string;

  if (note.title && note.title.trim()) {
    // New implementation: title is a dedicated field
    title = note.title;
    content = note.text;
  } else {
    // If no title, use default and treat all text as content
    title = 'Untitled';
    content = note.text;
  }

  const preview = content.slice(0, 100) + (content.length > 100 ? '...' : '');

  return {
    ...note,
    title,
    content,
    preview,
  };
}

/**
 * Format date for display as YYYY/MM/DD
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

import type { Note, NoteWithParsed } from '@cogni/types';
import { parseNoteText } from '../notes';

/**
 * Parse note into format with title, content, and preview
 */
export function parseNote(note: Note): NoteWithParsed {
  const { title, content } = parseNoteText(note.text);
  const preview = content.slice(0, 100) + (content.length > 100 ? '...' : '');

  return {
    ...note,
    title,
    content,
    preview,
  };
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '/');
}


import type { Note, NoteWithParsed } from '@cogni/types';
import { parseNoteText } from '../notes';

/**
 * Parse note into format with title, content, and preview
 * Uses title column if available, otherwise falls back to parsing from text
 */
export function parseNote(note: Note): NoteWithParsed {
  // Use title column if available (new schema)
  // Otherwise fall back to parsing from text (legacy notes)
  let title: string;
  let content: string;
  
  if (note.title) {
    title = note.title;
    // For new schema, text contains only body content
    content = note.text || '';
  } else {
    // Legacy fallback: parse title from first line of text
    const parsed = parseNoteText(note.text);
    title = parsed.title;
    content = parsed.content;
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


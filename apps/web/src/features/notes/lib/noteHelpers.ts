import type { Note, NoteWithParsed } from '@/types/note';

/**
 * Parse note into format with title, content, and preview
 * Now uses the dedicated title field when available, falling back to parsing from text
 */
export function parseNote(note: Note): NoteWithParsed {
  // Use the dedicated title field if available, otherwise parse from text
  let title: string;
  let content: string;

  if (note.title) {
    // New implementation: title is a dedicated field
    title = note.title;
    content = note.text;
  } else {
    // Fallback: parse title from first line of text (legacy support)
    const lines = note.text.split('\n');
    title = lines[0] || 'Untitled';
    content = lines.slice(1).join('\n');
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

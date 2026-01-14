/**
 * Note Creation Service
 * Handles creating notes from user message responses during tier 2 onboarding
 */

import { createNote } from '@/lib/api/notesApi';

/**
 * Generate a note title from user message
 * Uses first 50 characters or a default title
 */
export function generateNoteTitle(userMessage: string): string {
  const trimmed = userMessage.trim();
  if (!trimmed) {
    return 'My Task';
  }

  // Take first 50 characters, or up to the last complete word
  const maxLength = 50;
  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  // Find the last space before maxLength
  const lastSpace = trimmed.lastIndexOf(' ', maxLength);
  const title =
    lastSpace > 0
      ? trimmed.substring(0, lastSpace)
      : trimmed.substring(0, maxLength);
  return title + (title.length < trimmed.length ? '...' : '');
}

/**
 * Create a note from user's message response
 */
export async function createNoteFromMessage(
  workspaceId: number,
  userMessage: string,
  userName?: string
): Promise<{ id: number; title: string }> {
  const title = generateNoteTitle(userMessage);
  const content = userMessage.trim();

  const note = await createNote(workspaceId, title, content, null);

  return {
    id: note.id,
    title: note.title ?? title,
  };
}

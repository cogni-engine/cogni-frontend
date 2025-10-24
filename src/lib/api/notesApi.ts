import { createClient } from '@/lib/supabase/browserClient';
import type { Note } from '@/types/note';

const supabase = createClient();

/**
 * Parse note text into title and content
 * First line is title, rest is content
 */
export function parseNoteText(text: string): {
  title: string;
  content: string;
} {
  const lines = text.split('\n');
  const title = lines[0] || 'Untitled';
  const content = lines.slice(1).join('\n');
  return { title, content };
}

/**
 * Combine title and content into text format for storage
 */
export function combineNoteText(title: string, content: string): string {
  return `${title}\n${content}`;
}

/**
 * Get all notes for a specific workspace
 */
export async function getNotes(workspaceId: number): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get a single note by ID
 */
export async function getNote(id: number): Promise<Note | null> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    throw error;
  }

  return data;
}

/**
 * Create a new note
 */
export async function createNote(
  workspaceId: number,
  title: string,
  content: string
): Promise<Note> {
  const text = combineNoteText(title, content);

  const { data, error } = await supabase
    .from('notes')
    .insert({
      workspace_id: workspaceId,
      text,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update an existing note
 */
export async function updateNote(
  id: number,
  title: string,
  content: string
): Promise<Note> {
  const text = combineNoteText(title, content);

  const { data, error } = await supabase
    .from('notes')
    .update({
      text,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a note
 */
export async function deleteNote(id: number): Promise<void> {
  const { error } = await supabase.from('notes').delete().eq('id', id);

  if (error) throw error;
}

/**
 * Search notes by text content
 */
export async function searchNotes(
  workspaceId: number,
  searchQuery: string
): Promise<Note[]> {
  if (!searchQuery.trim()) {
    return getNotes(workspaceId);
  }

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('workspace_id', workspaceId)
    .ilike('text', `%${searchQuery}%`)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

import { getClient } from './supabase/client';
import type { NoteFolder } from '@cogni/types';

const getSupabase = () => getClient();

/**
 * Get all folders for a workspace
 */
export async function getFolders(workspaceId: number): Promise<NoteFolder[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('note_folders')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get a single folder by ID
 */
export async function getFolder(id: number): Promise<NoteFolder | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('note_folders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

/**
 * Create a new folder
 */
export async function createFolder(
  workspaceId: number,
  title: string
): Promise<NoteFolder> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('note_folders')
    .insert({
      workspace_id: workspaceId,
      title,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update a folder
 */
export async function updateFolder(
  id: number,
  title: string
): Promise<NoteFolder> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('note_folders')
    .update({ title })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a folder
 */
export async function deleteFolder(id: number): Promise<void> {
  const supabase = getSupabase();
  
  // First, remove folder assignment from all notes
  const { error: updateError } = await supabase
    .from('notes')
    .update({ note_folder_id: null })
    .eq('note_folder_id', id);

  if (updateError) throw updateError;

  // Then delete the folder
  const { error } = await supabase.from('note_folders').delete().eq('id', id);
  if (error) throw error;
}

/**
 * Move a note to a folder
 */
export async function moveNoteToFolder(
  noteId: number,
  folderId: number | null
): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from('notes')
    .update({ note_folder_id: folderId })
    .eq('id', noteId);

  if (error) throw error;
}

/**
 * Get notes count for each folder
 */
export async function getFolderNoteCounts(
  workspaceId: number
): Promise<Record<number, number>> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('notes')
    .select('note_folder_id')
    .eq('workspace_id', workspaceId)
    .is('deleted_at', null);

  if (error) throw error;

  const counts: Record<number, number> = {};
  (data || []).forEach((note: any) => {
    if (note.note_folder_id) {
      counts[note.note_folder_id] = (counts[note.note_folder_id] || 0) + 1;
    }
  });

  return counts;
}


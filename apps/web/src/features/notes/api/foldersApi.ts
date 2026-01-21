import { createClient } from '@/lib/supabase/browserClient';
import type { NoteFolder } from '@/types/note';

const supabase = createClient();

/**
 * Get all folders for a workspace
 */
export async function getFolders(workspaceId: number): Promise<NoteFolder[]> {
  const { data, error } = await supabase
    .from('note_folders')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Create a new folder
 */
export async function createFolder(
  workspaceId: number,
  title: string
): Promise<NoteFolder> {
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
  // First, remove folder assignment from all notes in this folder
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
  const { error } = await supabase
    .from('notes')
    .update({ note_folder_id: folderId })
    .eq('id', noteId);

  if (error) throw error;
}

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
 * Get a single folder by ID
 */
export async function getFolder(id: number): Promise<NoteFolder | null> {
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
 * Get folder with note count
 */
export async function getFolderWithNoteCount(
  workspaceId: number
): Promise<NoteFolder[]> {
  const { data, error } = await supabase
    .from('note_folders')
    .select(
      `
      *,
      notes:notes(count)
    `
    )
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Transform the data to include note_count
  return (data || []).map((folder: any) => ({
    id: folder.id,
    created_at: folder.created_at,
    title: folder.title,
    workspace_id: folder.workspace_id,
    note_count: folder.notes?.[0]?.count || 0,
  }));
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

/**
 * Get notes count for each folder in a workspace
 */
export async function getFolderNoteCounts(
  workspaceId: number
): Promise<Record<number, number>> {
  const { data, error } = await supabase
    .from('notes')
    .select('note_folder_id')
    .eq('workspace_id', workspaceId)
    .is('deleted_at', null);

  if (error) throw error;

  const counts: Record<number, number> = {};
  (data || []).forEach(note => {
    if (note.note_folder_id) {
      counts[note.note_folder_id] = (counts[note.note_folder_id] || 0) + 1;
    }
  });

  return counts;
}

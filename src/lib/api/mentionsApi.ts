import { createClient } from '@/lib/supabase/browserClient';

const supabase = createClient();

export interface Mention {
  id: number;
  workspace_id: number;
  created_at: string;
  source_type: 'note' | 'message';
  source_id: number;
  target_type: 'workspace_member' | 'note';
  target_id: number;
  created_by: number;
}

/**
 * Create a mention record
 */
export async function createMention(
  workspaceId: number,
  sourceType: 'note' | 'message',
  sourceId: number,
  targetType: 'workspace_member' | 'note',
  targetId: number,
  createdBy: number
): Promise<Mention> {
  const { data, error } = await supabase
    .from('mentions')
    .insert({
      workspace_id: workspaceId,
      source_type: sourceType,
      source_id: sourceId,
      target_type: targetType,
      target_id: targetId,
      created_by: createdBy,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get all mentions for a specific note or message
 */
export async function getMentionsForSource(
  sourceType: 'note' | 'message',
  sourceId: number
): Promise<Mention[]> {
  const { data, error } = await supabase
    .from('mentions')
    .select('*')
    .eq('source_type', sourceType)
    .eq('source_id', sourceId);

  if (error) throw error;
  return data || [];
}

/**
 * Sync member mentions for a note - compares existing with new and updates accordingly
 */
export async function syncNoteMemberMentions(
  noteId: number,
  workspaceId: number,
  mentionedMemberIds: number[],
  createdBy: number
): Promise<void> {
  // Get existing member mentions
  const { data: existing, error: fetchError } = await supabase
    .from('mentions')
    .select('*')
    .eq('source_type', 'note')
    .eq('source_id', noteId)
    .eq('target_type', 'workspace_member');

  if (fetchError) throw fetchError;

  const existingIds = new Set((existing || []).map(m => m.target_id));
  const newIds = new Set(mentionedMemberIds);

  // Delete mentions that no longer exist
  const toDelete = (existing || []).filter(m => !newIds.has(m.target_id));
  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from('mentions')
      .delete()
      .in(
        'id',
        toDelete.map(m => m.id)
      );

    if (deleteError) throw deleteError;
  }

  // Add new mentions
  const toAdd = mentionedMemberIds.filter(id => !existingIds.has(id));
  if (toAdd.length > 0) {
    const newMentions = toAdd.map(targetId => ({
      workspace_id: workspaceId,
      source_type: 'note' as const,
      source_id: noteId,
      target_type: 'workspace_member' as const,
      target_id: targetId,
      created_by: createdBy,
    }));

    const { error: insertError } = await supabase
      .from('mentions')
      .insert(newMentions);

    if (insertError) throw insertError;
  }
}

/**
 * Sync note mentions for a note - compares existing with new and updates accordingly
 */
export async function syncNoteToNoteMentions(
  noteId: number,
  workspaceId: number,
  mentionedNoteIds: number[],
  createdBy: number
): Promise<void> {
  // Get existing note mentions
  const { data: existing, error: fetchError } = await supabase
    .from('mentions')
    .select('*')
    .eq('source_type', 'note')
    .eq('source_id', noteId)
    .eq('target_type', 'note');

  if (fetchError) throw fetchError;

  const existingIds = new Set((existing || []).map(m => m.target_id));
  const newIds = new Set(mentionedNoteIds);

  // Delete mentions that no longer exist
  const toDelete = (existing || []).filter(m => !newIds.has(m.target_id));
  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from('mentions')
      .delete()
      .in(
        'id',
        toDelete.map(m => m.id)
      );

    if (deleteError) throw deleteError;
  }

  // Add new mentions
  const toAdd = mentionedNoteIds.filter(id => !existingIds.has(id));
  if (toAdd.length > 0) {
    const newMentions = toAdd.map(targetId => ({
      workspace_id: workspaceId,
      source_type: 'note' as const,
      source_id: noteId,
      target_type: 'note' as const,
      target_id: targetId,
      created_by: createdBy,
    }));

    const { error: insertError } = await supabase
      .from('mentions')
      .insert(newMentions);

    if (insertError) throw insertError;
  }
}

/**
 * Delete all mentions for a note
 */
export async function deleteNoteMentions(noteId: number): Promise<void> {
  const { error } = await supabase
    .from('mentions')
    .delete()
    .eq('source_type', 'note')
    .eq('source_id', noteId);

  if (error) throw error;
}

/**
 * Sync member mentions for a workspace message - compares existing with new and updates accordingly
 */
export async function syncWorkspaceMessageMentions(
  messageId: number,
  workspaceId: number,
  mentionedMemberIds: number[],
  createdBy: number
): Promise<void> {
  // Get existing member mentions
  const { data: existing, error: fetchError } = await supabase
    .from('mentions')
    .select('*')
    .eq('source_type', 'message')
    .eq('source_id', messageId)
    .eq('target_type', 'workspace_member');

  if (fetchError) throw fetchError;

  const existingIds = new Set((existing || []).map(m => m.target_id));
  const newIds = new Set(mentionedMemberIds);

  // Delete mentions that no longer exist
  const toDelete = (existing || []).filter(m => !newIds.has(m.target_id));
  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from('mentions')
      .delete()
      .in(
        'id',
        toDelete.map(m => m.id)
      );

    if (deleteError) throw deleteError;
  }

  // Add new mentions
  const toAdd = mentionedMemberIds.filter(id => !existingIds.has(id));
  if (toAdd.length > 0) {
    const newMentions = toAdd.map(targetId => ({
      workspace_id: workspaceId,
      source_type: 'message' as const,
      source_id: messageId,
      target_type: 'workspace_member' as const,
      target_id: targetId,
      created_by: createdBy,
    }));

    const { error: insertError } = await supabase
      .from('mentions')
      .insert(newMentions);

    if (insertError) throw insertError;
  }
}

/**
 * Sync file mentions for a workspace message - compares existing with new and updates accordingly
 */
export async function syncWorkspaceMessageFileMentions(
  messageId: number,
  workspaceId: number,
  mentionedFileIds: number[],
  createdBy: number
): Promise<void> {
  // Get existing file mentions
  const { data: existing, error: fetchError } = await supabase
    .from('mentions')
    .select('*')
    .eq('source_type', 'message')
    .eq('source_id', messageId)
    .eq('target_type', 'workspace_file');

  if (fetchError) throw fetchError;

  const existingIds = new Set((existing || []).map(m => m.target_id));
  const newIds = new Set(mentionedFileIds);

  // Delete mentions that no longer exist
  const toDelete = (existing || []).filter(m => !newIds.has(m.target_id));
  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from('mentions')
      .delete()
      .in(
        'id',
        toDelete.map(m => m.id)
      );

    if (deleteError) throw deleteError;
  }

  // Add new mentions
  const toAdd = mentionedFileIds.filter(id => !existingIds.has(id));
  if (toAdd.length > 0) {
    const newMentions = toAdd.map(targetId => ({
      workspace_id: workspaceId,
      source_type: 'message' as const,
      source_id: messageId,
      target_type: 'workspace_file' as const,
      target_id: targetId,
      created_by: createdBy,
    }));

    const { error: insertError } = await supabase
      .from('mentions')
      .insert(newMentions);

    if (insertError) throw insertError;
  }
}

/**
 * Sync note mentions for a workspace message - compares existing with new and updates accordingly
 */
export async function syncWorkspaceMessageNoteMentions(
  messageId: number,
  workspaceId: number,
  mentionedNoteIds: number[],
  createdBy: number
): Promise<void> {
  // Get existing note mentions
  const { data: existing, error: fetchError } = await supabase
    .from('mentions')
    .select('*')
    .eq('source_type', 'message')
    .eq('source_id', messageId)
    .eq('target_type', 'note');

  if (fetchError) throw fetchError;

  const existingIds = new Set((existing || []).map(m => m.target_id));
  const newIds = new Set(mentionedNoteIds);

  // Delete mentions that no longer exist
  const toDelete = (existing || []).filter(m => !newIds.has(m.target_id));
  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from('mentions')
      .delete()
      .in(
        'id',
        toDelete.map(m => m.id)
      );

    if (deleteError) throw deleteError;
  }

  // Add new mentions
  const toAdd = mentionedNoteIds.filter(id => !existingIds.has(id));
  if (toAdd.length > 0) {
    const newMentions = toAdd.map(targetId => ({
      workspace_id: workspaceId,
      source_type: 'message' as const,
      source_id: messageId,
      target_type: 'note' as const,
      target_id: targetId,
      created_by: createdBy,
    }));

    const { error: insertError } = await supabase
      .from('mentions')
      .insert(newMentions);

    if (insertError) throw insertError;
  }
}

/**
 * Get all notes/messages where a user is mentioned
 */
export async function getUserMentions(
  workspaceMemberId: number
): Promise<Mention[]> {
  const { data, error } = await supabase
    .from('mentions')
    .select('*')
    .eq('target_type', 'workspace_member')
    .eq('target_id', workspaceMemberId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

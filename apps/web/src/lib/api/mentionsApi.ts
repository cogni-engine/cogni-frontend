import { createClient } from '@/lib/supabase/browserClient';

const supabase = createClient();

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

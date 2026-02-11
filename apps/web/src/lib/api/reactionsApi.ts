import { createClient } from '@/lib/supabase/browserClient';
import type { MessageReaction } from '@/types/workspace';
import { isValidReactionEmoji } from '@/types/workspace';

const supabase = createClient();

type RawRow = {
  id: string;
  workspace_message_id: number;
  workspace_member_id: number;
  emoji: string;
  workspace_member?: {
    id: number;
    user_id: string | null;
    user_profile?:
      | { id: string; name: string | null; avatar_url: string | null }
      | { id: string; name: string | null; avatar_url: string | null }[];
  } | null;
};

function transformReaction(row: RawRow | null): MessageReaction | null {
  if (!row) return null;
  const wmRaw = row.workspace_member;
  const wm = Array.isArray(wmRaw) ? wmRaw[0] : wmRaw;
  const profile = wm?.user_profile;
  const userProfile = Array.isArray(profile) ? profile[0] : profile;
  return {
    id: row.id,
    workspace_message_id: row.workspace_message_id,
    workspace_member_id: row.workspace_member_id,
    emoji: row.emoji,
    workspace_member: wm
      ? {
          id: wm.id,
          user_id: wm.user_id,
          user_profile: userProfile ?? undefined,
        }
      : undefined,
  };
}

export async function getReactionsForMessages(
  messageIds: number[]
): Promise<Map<number, MessageReaction[]>> {
  if (messageIds.length === 0) return new Map();

  const { data, error } = await supabase
    .from('message_reactions')
    .select(
      `
      id,
      workspace_message_id,
      workspace_member_id,
      emoji,
      workspace_member:workspace_member_id(
        id,
        user_id,
        user_profile:user_profiles!user_id(id, name, avatar_url)
      )
    `
    )
    .in('workspace_message_id', messageIds);

  if (error) throw error;

  const map = new Map<number, MessageReaction[]>();
  for (const row of data ?? []) {
    const transformed = transformReaction(row as unknown as RawRow);
    if (transformed) {
      const list = map.get(transformed.workspace_message_id) ?? [];
      list.push(transformed);
      map.set(transformed.workspace_message_id, list);
    }
  }
  return map;
}

export async function getMessageReactions(
  messageId: number
): Promise<MessageReaction[]> {
  const { data, error } = await supabase
    .from('message_reactions')
    .select(
      `
      id,
      workspace_message_id,
      workspace_member_id,
      emoji,
      workspace_member:workspace_member_id(
        id,
        user_id,
        user_profile:user_profiles!user_id(id, name, avatar_url)
      )
    `
    )
    .eq('workspace_message_id', messageId);

  if (error) throw error;
  return (data ?? [])
    .map(r => transformReaction(r as unknown as RawRow))
    .filter((r): r is MessageReaction => r !== null);
}

export async function addOrUpdateReaction(
  workspaceId: number,
  workspaceMessageId: number,
  workspaceMemberId: number,
  emoji: string
): Promise<MessageReaction> {
  if (!isValidReactionEmoji(emoji)) {
    throw new Error(`Invalid emoji: ${emoji}`);
  }

  const { data, error } = await supabase
    .from('message_reactions')
    .upsert(
      {
        workspace_id: workspaceId,
        workspace_message_id: workspaceMessageId,
        workspace_member_id: workspaceMemberId,
        emoji,
      },
      {
        onConflict: 'workspace_message_id,workspace_member_id',
      }
    )
    .select(
      `
      id,
      workspace_message_id,
      workspace_member_id,
      emoji,
      workspace_member:workspace_member_id(
        id,
        user_id,
        user_profile:user_profiles!user_id(id, name, avatar_url)
      )
    `
    )
    .single();

  if (error) throw error;
  const transformed = transformReaction(data as unknown as RawRow);
  if (!transformed) throw new Error('Failed to transform reaction');
  return transformed;
}

export async function removeReaction(
  workspaceMessageId: number,
  workspaceMemberId: number
): Promise<void> {
  const { error } = await supabase
    .from('message_reactions')
    .delete()
    .eq('workspace_message_id', workspaceMessageId)
    .eq('workspace_member_id', workspaceMemberId);

  if (error) throw error;
}

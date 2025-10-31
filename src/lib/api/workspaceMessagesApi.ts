import { createClient } from '@/lib/supabase/browserClient';
import {
  normalizeWorkspaceProfile,
  type SupabaseProfile,
} from '@/lib/api/profileUtils';
import type { WorkspaceMessage } from '@/types/workspace';

const supabase = createClient();

type RawWorkspaceMember = Omit<
  NonNullable<WorkspaceMessage['workspace_member']>,
  'user_profile'
> & {
  user_profile?: SupabaseProfile;
};

type RawWorkspaceMessage = WorkspaceMessage & {
  workspace_member?: RawWorkspaceMember | null;
};

function transformMessageRow(
  row: RawWorkspaceMessage | null
): WorkspaceMessage {
  if (!row) {
    return row as unknown as WorkspaceMessage;
  }

  const workspaceMember = row.workspace_member
    ? {
        ...row.workspace_member,
        user_profile:
          normalizeWorkspaceProfile(row.workspace_member.user_profile) ?? null,
      }
    : undefined;

  return {
    ...row,
    workspace_member: workspaceMember,
  };
}

export async function getWorkspaceMessages(
  workspaceId: number,
  limit: number = 50
): Promise<WorkspaceMessage[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('workspace_messages')
    .select(
      `
      *,
      workspace_member:workspace_member_id(
        id,
        user_id,
        user_profile:user_id(id, name, avatar_url)
      )
    `
    )
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  // Transform nested structure
  return (data || []).map(transformMessageRow);
}

export async function sendWorkspaceMessage(
  workspaceId: number,
  workspaceMemberId: number,
  text: string
): Promise<WorkspaceMessage> {
  const { data, error } = await supabase
    .from('workspace_messages')
    .insert({
      workspace_id: workspaceId,
      workspace_member_id: workspaceMemberId,
      text,
    })
    .select(
      `
      *,
      workspace_member:workspace_member_id(
        id,
        user_id,
        user_profile:user_id(id, name, avatar_url)
      )
    `
    )
    .single();

  if (error) throw error;

  // Transform nested structure
  return transformMessageRow(data);
}

export async function updateWorkspaceMessage(
  messageId: number,
  text: string
): Promise<WorkspaceMessage> {
  const { data, error } = await supabase
    .from('workspace_messages')
    .update({ text })
    .eq('id', messageId)
    .select(
      `
      *,
      workspace_member:workspace_member_id(
        id,
        user_id,
        user_profile:user_id(id, name, avatar_url)
      )
    `
    )
    .single();

  if (error) throw error;

  return transformMessageRow(data);
}

export async function deleteWorkspaceMessage(messageId: number): Promise<void> {
  const { error } = await supabase
    .from('workspace_messages')
    .delete()
    .eq('id', messageId);

  if (error) throw error;
}

export async function getCurrentWorkspaceMember(
  workspaceId: number
): Promise<number | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('workspace_member')
    .select('id')
    .eq('workspace_id', workspaceId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) throw error;

  return data?.id || null;
}

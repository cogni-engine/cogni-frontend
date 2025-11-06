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

type RawWorkspaceMessageRead = {
  workspace_message_id: number;
  workspace_member_id: number;
  read_at?: string;
  created_at?: string;
  workspace_member?: RawWorkspaceMember | null;
};

type RawWorkspaceMessage = WorkspaceMessage & {
  workspace_member?: RawWorkspaceMember | null;
  workspace_message_reads?: RawWorkspaceMessageRead[] | null;
  replied_message?: RawWorkspaceMessage | null;
};

function transformMessageRow(
  row: RawWorkspaceMessage | null
): WorkspaceMessage {
  if (!row) {
    return row as unknown as WorkspaceMessage;
  }

  const {
    workspace_member,
    workspace_message_reads,
    replied_message,
    ...rest
  } = row;

  const workspaceMember = workspace_member
    ? {
        ...workspace_member,
        user_profile:
          normalizeWorkspaceProfile(workspace_member.user_profile) ?? null,
      }
    : undefined;

  const reads = (workspace_message_reads ?? []).map(read => ({
    workspace_message_id: read.workspace_message_id,
    workspace_member_id: read.workspace_member_id,
    read_at: read.read_at ?? read.created_at ?? new Date().toISOString(),
    workspace_member: read.workspace_member
      ? {
          ...read.workspace_member,
          user_profile:
            normalizeWorkspaceProfile(read.workspace_member.user_profile) ??
            null,
        }
      : undefined,
  }));

  // Transform replied message if it exists
  const transformedRepliedMessage = replied_message
    ? transformMessageRow(replied_message)
    : null;

  return {
    ...rest,
    workspace_member: workspaceMember,
    replied_message: transformedRepliedMessage,
    reads,
    read_count: reads.length,
  };
}

export async function getWorkspaceMessages(
  workspaceId: number,
  limit: number = 50,
  beforeTimestamp?: string
): Promise<WorkspaceMessage[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  let query = supabase
    .from('workspace_messages')
    .select(
      `
      *,
      workspace_member:workspace_member_id(
        id,
        user_id,
        user_profile:user_id(id, name, avatar_url)
      ),
      workspace_message_reads(
        workspace_message_id,
        workspace_member_id,
        created_at,
        workspace_member:workspace_member_id(
          id,
          user_id,
          user_profile:user_id(id, name, avatar_url)
        )
      ),
      replied_message:reply_to_id(
        id,
        text,
        created_at,
        workspace_member_id,
        workspace_member:workspace_member_id(
          id,
          user_id,
          user_profile:user_id(id, name, avatar_url)
        )
      )
    `
    )
    .eq('workspace_id', workspaceId);

  // If beforeTimestamp is provided, get messages older than that timestamp
  if (beforeTimestamp) {
    query = query.lt('created_at', beforeTimestamp);
  }

  const { data, error } = await query
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  // Transform nested structure
  return (data || []).map(transformMessageRow);
}

export async function sendWorkspaceMessage(
  workspaceId: number,
  workspaceMemberId: number,
  text: string,
  replyToId?: number | null
): Promise<WorkspaceMessage> {
  const { data, error } = await supabase
    .from('workspace_messages')
    .insert({
      workspace_id: workspaceId,
      workspace_member_id: workspaceMemberId,
      text,
      reply_to_id: replyToId ?? null,
    })
    .select(
      `
      *,
      workspace_member:workspace_member_id(
        id,
        user_id,
        user_profile:user_id(id, name, avatar_url)
      ),
      workspace_message_reads(
        workspace_message_id,
        workspace_member_id,
        created_at,
        workspace_member:workspace_member_id(
          id,
          user_id,
          user_profile:user_id(id, name, avatar_url)
        )
      ),
      replied_message:reply_to_id(
        id,
        text,
        created_at,
        workspace_member_id,
        workspace_member:workspace_member_id(
          id,
          user_id,
          user_profile:user_id(id, name, avatar_url)
        )
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
      ),
      workspace_message_reads(
        workspace_message_id,
        workspace_member_id,
        created_at,
        workspace_member:workspace_member_id(
          id,
          user_id,
          user_profile:user_id(id, name, avatar_url)
        )
      ),
      replied_message:reply_to_id(
        id,
        text,
        created_at,
        workspace_member_id,
        workspace_member:workspace_member_id(
          id,
          user_id,
          user_profile:user_id(id, name, avatar_url)
        )
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

export type CurrentWorkspaceMember = {
  id: number;
  last_read_message_id: number | null;
};

export async function getCurrentWorkspaceMember(
  workspaceId: number
): Promise<CurrentWorkspaceMember | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('workspace_member')
    .select('id, last_read_message_id')
    .eq('workspace_id', workspaceId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    last_read_message_id: data.last_read_message_id ?? null,
  };
}

export async function markWorkspaceMessagesAsRead(
  workspaceId: number,
  workspaceMemberId: number,
  messageIds: number[],
  currentLastRead?: number | null
): Promise<number | null> {
  if (messageIds.length === 0) {
    return currentLastRead ?? null;
  }

  const uniqueIds = Array.from(new Set(messageIds));
  const rows = uniqueIds.map(messageId => ({
    workspace_message_id: messageId,
    workspace_member_id: workspaceMemberId,
  }));

  const { error: upsertError } = await supabase
    .from('workspace_message_reads')
    .upsert(rows, {
      onConflict: 'workspace_message_id,workspace_member_id',
    });

  if (upsertError) throw upsertError;

  const newLastRead = Math.max(...uniqueIds);
  const lastReadToCompare = currentLastRead ?? null;

  if (lastReadToCompare !== null && newLastRead <= lastReadToCompare) {
    return lastReadToCompare;
  }

  const { error: updateError } = await supabase
    .from('workspace_member')
    .update({ last_read_message_id: newLastRead })
    .eq('id', workspaceMemberId)
    .eq('workspace_id', workspaceId);

  if (updateError) throw updateError;

  return newLastRead;
}

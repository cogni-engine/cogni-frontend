import { createClient } from '@/lib/supabase/browserClient';
import {
  normalizeWorkspaceProfile,
  normalizeAgentProfile,
  type SupabaseProfile,
  type SupabaseAgentProfile,
} from '@/lib/api/profileUtils';
import type { WorkspaceMessage } from '@/types/workspace';
import { linkFilesToMessage } from './workspaceFilesApi';
import { getReactionsForMessages } from './reactionsApi';
import {
  syncWorkspaceMessageMentions,
  syncWorkspaceMessageNoteMentions,
} from './mentionsApi';
import { getCurrentUserId } from '@cogni/utils';

const supabase = createClient();

type RawWorkspaceMember = Omit<
  NonNullable<WorkspaceMessage['workspace_member']>,
  'user_profile' | 'agent_profile'
> & {
  user_profile?: SupabaseProfile;
  agent_profile?: SupabaseAgentProfile;
};

type RawWorkspaceMessageRead = {
  workspace_message_id: number;
  workspace_member_id: number;
  read_at?: string;
  created_at?: string;
  workspace_member?: RawWorkspaceMember | null;
};

type RawWorkspaceMessageFile = {
  id: number;
  workspace_file_id: number; // bigint (foreign key to workspace_files.id)
  workspace_file?: {
    id: number; // bigint (database primary key)
    original_file_name: string;
    file_path: string; // Contains UUID in path: {workspace_id}/uploads/{uuid}/{filename}
    mime_type: string;
    file_size: number;
  } | null;
};

type RawWorkspaceMessage = WorkspaceMessage & {
  workspace_member?: RawWorkspaceMember | null;
  workspace_message_reads?: RawWorkspaceMessageRead[] | null;
  replied_message?: RawWorkspaceMessage | null;
  workspace_message_files?: RawWorkspaceMessageFile[] | null;
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
    workspace_message_files,
    ...rest
  } = row;

  const workspaceMember = workspace_member
    ? {
        ...workspace_member,
        user_profile:
          normalizeWorkspaceProfile(workspace_member.user_profile) ?? null,
        agent_profile:
          normalizeAgentProfile(workspace_member.agent_profile) ?? null,
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
          agent_profile:
            normalizeAgentProfile(read.workspace_member.agent_profile) ?? null,
        }
      : undefined,
  }));

  // Transform replied message if it exists
  const transformedRepliedMessage = replied_message
    ? transformMessageRow(replied_message)
    : null;

  // Transform files - join through workspace_files table
  const files = (workspace_message_files ?? [])
    .filter(fileLink => fileLink.workspace_file)
    .map(fileLink => ({
      id: fileLink.workspace_file!.id,
      original_filename: fileLink.workspace_file!.original_file_name,
      file_path: fileLink.workspace_file!.file_path,
      mime_type: fileLink.workspace_file!.mime_type,
      file_size: fileLink.workspace_file!.file_size,
    }));

  return {
    ...rest,
    workspace_member: workspaceMember,
    replied_message: transformedRepliedMessage,
    reads,
    read_count: reads.length,
    files: files.length > 0 ? files : undefined,
  };
}

export async function getWorkspaceMessages(
  workspaceId: number,
  limit: number = 50,
  beforeTimestamp?: string
): Promise<WorkspaceMessage[]> {
  // Query 1: Get messages without the heavy workspace_message_reads join
  let messagesQuery = supabase
    .from('workspace_messages')
    .select(
      `
      *,
      workspace_member:workspace_member_id(
        id,
        user_id,
        agent_id,
        user_profile:user_profiles!user_id(id, name, avatar_url),
        agent_profile:agent_profiles!agent_id(id, name, avatar_url)
      ),
      replied_message:reply_to_id(
        id,
        text,
        created_at,
        workspace_member_id,
        workspace_member:workspace_member_id(
          id,
          user_id,
          agent_id,
          user_profile:user_profiles!user_id(id, name, avatar_url),
          agent_profile:agent_profiles!agent_id(id, name, avatar_url)
        )
      ),
      workspace_message_files(
        id,
        workspace_file_id,
        workspace_file:workspace_file_id(
          id,
          original_file_name,
          file_path,
          mime_type,
          file_size
        )
      )
    `
    )
    .eq('workspace_id', workspaceId);

  // If beforeTimestamp is provided, get messages older than that timestamp
  if (beforeTimestamp) {
    messagesQuery = messagesQuery.lt('created_at', beforeTimestamp);
  }

  const { data: messages, error } = await messagesQuery
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  if (!messages || messages.length === 0) return [];

  // Query 2: Get read counts separately (much faster than nested joins)
  const messageIds = messages.map(m => m.id);
  const [readCountsResult, reactionsMap] = await Promise.all([
    supabase
      .from('workspace_message_reads')
      .select('workspace_message_id')
      .in('workspace_message_id', messageIds),
    getReactionsForMessages(messageIds),
  ]);

  const { data: readCounts } = readCountsResult;

  // Build a count map
  const countMap = new Map<number, number>();
  (readCounts || []).forEach(r => {
    countMap.set(
      r.workspace_message_id,
      (countMap.get(r.workspace_message_id) || 0) + 1
    );
  });

  // Transform with counts and reactions
  return messages.map(row => {
    const transformed = transformMessageRow(row);
    return {
      ...transformed,
      read_count: countMap.get(row.id) || 0,
      reactions: reactionsMap.get(row.id) ?? [],
    };
  });
}

export async function sendWorkspaceMessage(
  workspaceId: number,
  workspaceMemberId: number,
  text: string,
  replyToId?: number | null,
  workspaceFileIds?: number[],
  mentionedMemberIds?: number[],
  mentionedNoteIds?: number[]
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
        agent_id,
        user_profile:user_profiles!user_id(id, name, avatar_url),
        agent_profile:agent_profiles!agent_id(id, name, avatar_url)
      ),
      replied_message:reply_to_id(
        id,
        text,
        created_at,
        workspace_member_id,
        workspace_member:workspace_member_id(
          id,
          user_id,
          agent_id,
          user_profile:user_profiles!user_id(id, name, avatar_url),
          agent_profile:agent_profiles!agent_id(id, name, avatar_url)
        )
      )
    `
    )
    .single();

  if (error) throw error;

  // Link files to message if any
  if (workspaceFileIds && workspaceFileIds.length > 0) {
    try {
      await linkFilesToMessage(data.id, workspaceFileIds);
    } catch (fileError) {
      console.error('Error linking files to message:', fileError);
      // Don't throw - message was created successfully, just file linking failed
    }
  }

  // Sync member mentions if any
  if (mentionedMemberIds && mentionedMemberIds.length > 0) {
    try {
      await syncWorkspaceMessageMentions(
        data.id,
        workspaceId,
        mentionedMemberIds,
        workspaceMemberId
      );
    } catch (mentionError) {
      console.error('Error syncing member mentions:', mentionError);
      // Don't throw - message was created successfully, just mention syncing failed
    }
  }

  // Sync note mentions if any
  if (mentionedNoteIds && mentionedNoteIds.length > 0) {
    try {
      await syncWorkspaceMessageNoteMentions(
        data.id,
        workspaceId,
        mentionedNoteIds,
        workspaceMemberId
      );
    } catch (mentionError) {
      console.error('Error syncing note mentions:', mentionError);
      // Don't throw - message was created successfully, just mention syncing failed
    }
  }

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
        agent_id,
        user_profile:user_profiles!user_id(id, name, avatar_url),
        agent_profile:agent_profiles!agent_id(id, name, avatar_url)
      ),
      replied_message:reply_to_id(
        id,
        text,
        created_at,
        workspace_member_id,
        workspace_member:workspace_member_id(
          id,
          user_id,
          agent_id,
          user_profile:user_profiles!user_id(id, name, avatar_url),
          agent_profile:agent_profiles!agent_id(id, name, avatar_url)
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
  const userId = getCurrentUserId();
  const { data, error } = await supabase
    .from('workspace_member')
    .select('id, last_read_message_id')
    .eq('workspace_id', workspaceId)
    .eq('user_id', userId)
    .is('removed_at', null)
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

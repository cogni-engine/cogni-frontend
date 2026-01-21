import { createClient } from '@/lib/supabase/browserClient';
import type { AIMessage, MessageFile } from '@/features/cogno/domain/chat';

const supabase = createClient();

type WorkspaceFileRow = {
  id: number;
  original_file_name: string;
  file_path: string;
  mime_type: string;
  file_size: number;
};

type AIMessageFileJoin = {
  workspace_files: WorkspaceFileRow | null;
};

type AIMessageWithFiles = Omit<AIMessage, 'files'> & {
  ai_message_files?: AIMessageFileJoin[];
};

/**
 * Get all messages for a thread directly from Supabase
 */
export async function getThreadMessages(
  threadId: number
): Promise<AIMessage[]> {
  const { data, error } = await supabase
    .from('ai_messages')
    .select(
      `
      *,
      ai_message_files(
        workspace_files(
          id,
          original_file_name,
          file_path,
          mime_type,
          file_size
        )
      )
    `
    )
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });

  if (error) throw error;

  // Transform the nested file structure (map original_file_name to original_filename)
  return ((data as AIMessageWithFiles[]) || []).map(msg => ({
    id: msg.id,
    content: msg.content,
    thread_id: msg.thread_id,
    role: msg.role,
    created_at: msg.created_at,
    meta: msg.meta,
    files:
      msg.ai_message_files
        ?.map(f =>
          f.workspace_files
            ? {
                id: f.workspace_files.id,
                original_filename: f.workspace_files.original_file_name,
                file_path: f.workspace_files.file_path,
                mime_type: f.workspace_files.mime_type,
                file_size: f.workspace_files.file_size,
              }
            : null
        )
        .filter((f): f is MessageFile => f !== null) || [],
  }));
}

/**
 * Get messages since a specific message ID
 */
export async function getMessagesSince(
  threadId: number,
  sinceId: number
): Promise<AIMessage[]> {
  const { data, error } = await supabase
    .from('ai_messages')
    .select(
      `
      *,
      ai_message_files(
        workspace_files(
          id,
          original_file_name,
          file_path,
          mime_type,
          file_size
        )
      )
    `
    )
    .eq('thread_id', threadId)
    .gt('id', sinceId)
    .order('created_at', { ascending: true });

  if (error) throw error;

  return ((data as AIMessageWithFiles[]) || []).map(msg => ({
    id: msg.id,
    content: msg.content,
    thread_id: msg.thread_id,
    role: msg.role,
    created_at: msg.created_at,
    meta: msg.meta,
    files:
      msg.ai_message_files
        ?.map(f =>
          f.workspace_files
            ? {
                id: f.workspace_files.id,
                original_filename: f.workspace_files.original_file_name,
                file_path: f.workspace_files.file_path,
                mime_type: f.workspace_files.mime_type,
                file_size: f.workspace_files.file_size,
              }
            : null
        )
        .filter((f): f is MessageFile => f !== null) || [],
  }));
}

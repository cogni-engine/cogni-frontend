import type { WorkspaceProfile } from './member';

export interface WorkspaceMessageRead {
  workspace_message_id: number;
  workspace_member_id: number;
  read_at: string;
  created_at?: string;
  workspace_member?: {
    id?: number;
    user_id?: string;
    user_profile?: WorkspaceProfile | null;
  } | null;
}

export interface WorkspaceMessageFile {
  id: number; // bigint (database primary key from workspace_files)
  original_filename: string;
  file_path: string; // Contains UUID in path: {workspace_id}/uploads/{uuid}/{filename}
  mime_type: string;
  file_size: number;
}

export interface WorkspaceMessage {
  id: number;
  workspace_id: number;
  workspace_member_id: number;
  text: string;
  created_at: string;
  updated_at: string;
  reply_to_id?: number | null;
  workspace_member?: {
    user_id?: string;
    user_profile?: WorkspaceProfile | null;
  };
  replied_message?: WorkspaceMessage | null;
  reads?: WorkspaceMessageRead[];
  read_count?: number;
  is_read_by_current_user?: boolean;
  files?: WorkspaceMessageFile[];
}

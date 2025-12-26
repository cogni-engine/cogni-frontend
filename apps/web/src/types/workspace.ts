export interface Workspace {
  id: number;
  created_at: string;
  title: string | null;
  icon_url: string | null;
  type: 'group' | 'personal';
  workspace_messages_updated_at?: string | null;
  notes?: Note[];
  members?: WorkspaceMember[];
  unread_count?: number;
  member_count?: number;
  latest_message_text?: string | null;
}

export interface Note {
  id: number;
  created_at: string;
  updated_at: string;
  text: string;
  workspace_id: number;
}

export interface WorkspaceProfile {
  id: string;
  name: string | null;
  avatar_url: string | null;
}

export interface WorkspaceMember {
  id: number;
  created_at: string;
  user_id: string;
  workspace_id: number;
  role: 'owner' | 'admin' | 'member';
  user_profile?: WorkspaceProfile | null;
  last_read_message_id?: number | null;
}

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

export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'cancelled';
export type InviteLinkStatus = 'active' | 'disabled' | 'expired';

export interface WorkspaceInvitation {
  id: string;
  workspace_id: number;
  inviter_id: string;
  invitee_email: string;
  invitee_id: string | null;
  status: InvitationStatus;
  token: string;
  expires_at: string;
  created_at: string;
  accepted_at: string | null;
}

export interface WorkspaceInviteLink {
  id: string;
  workspace_id: string;
  inviter_id: string | null;
  token: string;
  max_uses: number;
  used_count: number;
  expires_at: string | null;
  status: InviteLinkStatus;
  created_at: string;
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

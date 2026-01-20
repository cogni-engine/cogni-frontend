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

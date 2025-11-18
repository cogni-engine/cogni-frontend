// Auth types
export interface AuthUser {
  id: string;
  email?: string;
  [key: string]: any;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: AuthUser;
}

export interface AuthResponse {
  user: AuthUser | null;
  session: AuthSession | null;
}

// Workspace types (minimal for auth flow)
export interface Workspace {
  id: number;
  created_at: string;
  title: string | null;
  icon_url: string | null;
  type: 'group' | 'personal';
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


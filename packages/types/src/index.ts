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
  workspace_messages_updated_at?: string | null;
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

// Thread types
export interface Thread {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  workspace_id: number;
}

// Message types
export interface MessageFile {
  id: number;
  original_filename: string;
  file_path: string;
  mime_type: string;
  file_size: number;
}

export interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  files?: MessageFile[];
  file_ids?: number[];
}

export interface AIMessage {
  id: number;
  content: string;
  thread_id: number;
  role: 'user' | 'assistant' | 'system';
  created_at: string;
  meta?: Record<string, any> | null;
  files?: MessageFile[];
}

// Timer types
export type TimerStatus = 'active' | 'completed' | 'cancelled';

export interface TimerState {
  duration_minutes: number;
  duration_seconds?: number;
  started_at: string;
  ends_at: string;
  status: TimerStatus;
  unit: string;
  message_id?: number;
}

export interface TimerPollResponse {
  timer: TimerState | null;
  timer_ended: boolean;
  remaining_seconds?: number;
}

// Note types
export interface NoteAssignment {
  workspace_member_note_role: string;
  workspace_member?: {
    id: number;
    user_id: string;
    user_profiles?: {
      id: string;
      name: string;
      avatar_url?: string;
    };
  };
}

export interface Note {
  id: number;
  created_at: string;
  updated_at: string;
  title: string | null;
  text: string;
  workspace_id: number;
  deleted_at?: string | null;
  note_folder_id?: number | null;
  workspace?: {
    id: number;
    title: string;
    type: 'group' | 'personal';
    created_at: string;
  };
  workspace_member_note?: NoteAssignment[];
}

export interface NoteFolder {
  id: number;
  created_at: string;
  title: string;
  workspace_id: number;
  note_count?: number;
}

export interface NoteWithParsed extends Note {
  title: string;
  preview: string;
  content: string;
}


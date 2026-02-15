export type NotificationStatus = 'scheduled' | 'sent' | 'resolved';

export type NotificationReactionStatus =
  | 'None'
  | 'completed'
  | 'postponed'
  | 'ignored'
  | 'rejected'
  | 'in_progress';

export interface Notification {
  id: number;
  created_at: string;
  title: string;
  ai_context: string;
  body?: string;
  due_date: string;
  status: NotificationStatus;
  task_id: number;
  user_id: string;
  workspace_member_id?: number | null;
  reaction_status: NotificationReactionStatus;
  reaction_text: string | null;
}

export interface WorkspaceActivity {
  id: number;
  title: string;
  body?: string;
  ai_context: string;
  task_id: number;
  reaction_status: NotificationReactionStatus;
  reaction_text: string | null;
  reaction_choices: string[] | null;
  member_name: string;
  member_avatar_url?: string;
  workspace_member_id: number | null;
  updated_at: string;
  due_date: string;
  created_at: string;
}

export type NotificationStatus = 'scheduled' | 'sent' | 'resolved';

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
}

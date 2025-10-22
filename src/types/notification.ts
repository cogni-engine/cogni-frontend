export type NotificationStatus = 'scheduled' | 'sent' | 'resolved';

export interface Notification {
  id: number;
  created_at: string;
  title: string;
  content: string;
  due_date: string;
  status: NotificationStatus;
  task_id: number;
  user_id: string;
}


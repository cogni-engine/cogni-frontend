export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  deadline?: string | null;
  status: TaskStatus;
  progress?: number | null;
  user_id: string;
  assigner_id?: string | null;
  source_note_id?: number | null;
  is_ai_task?: boolean | null;
  recurrence_pattern?: string | null;
  next_run_time?: string | null;
  is_recurring_task_active?: boolean | null;
  created_at: string;
  updated_at?: string | null;
  completed_at?: string | null;
}

export interface TaskCreate {
  title: string;
  description?: string | null;
  deadline?: string | null;
  status?: TaskStatus;
  progress?: number | null;
  source_note_id?: number | null;
  recurrence_pattern: string;
  is_ai_task?: boolean;
  next_run_time: string;
  is_recurring_task_active?: boolean;
}

export interface TaskUpdate {
  title?: string;
  description?: string | null;
  deadline?: string | null;
  status?: TaskStatus;
  progress?: number | null;
  completed_at?: string | null;
  recurrence_pattern?: string | null;
  is_ai_task?: boolean | null;
  next_run_time?: string | null;
  is_recurring_task_active?: boolean | null;
}

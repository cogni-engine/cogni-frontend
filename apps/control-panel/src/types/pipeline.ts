export interface DateRange {
  from: string;
  to: string;
}

export interface WorkspaceFunnelRow {
  workspace_id: number;
  workspace_title: string;
  raw_events_note: number;
  raw_events_message: number;
  raw_events_total: number;
  semantic_events_note: number;
  semantic_events_message: number;
  semantic_events_total: number;
  tasks_count: number;
  notifications_count: number;
}

export interface PipelineTotals {
  raw_events: number;
  semantic_events: number;
  tasks: number;
  notifications: number;
  jobs_succeeded: number;
  jobs_failed: number;
  jobs_doing: number;
}

export interface JobStatusSummary {
  task_name: string;
  succeeded: number;
  doing: number;
  failed: number;
  total: number;
}

export interface JobEvent {
  type: string;
  at: string;
}

export interface FailedJob {
  id: number;
  task_name: string;
  status: string;
  args: Record<string, unknown>;
  attempts: number;
  deferred_at: string | null;
  started_at: string | null;
  failed_at: string | null;
  duration_ms: number | null;
  events: JobEvent[];
}

export interface NotificationDetail {
  id: number;
  title: string;
  body: string | null;
  status: string;
  due_date: string;
  task_id: number;
  task_title: string;
  workspace_id: number;
  member_name: string;
  reaction_text: string | null;
  reaction_choices: unknown;
  reacted_at: string | null;
  created_at: string;
}

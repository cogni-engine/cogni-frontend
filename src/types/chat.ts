export type Message = {
  id?: string;
  role: "user" | "assistant";
  content: string;
};

export type AIMessage = {
  id: number;
  content: string;
  thread_id: number;
  role: "user" | "assistant" | "system";
  created_at: string;
  meta?: Record<string, any> | null;
};

export type InputMode = "default" | "expanded";

export type SuggestionConfig = {
  suggestions: string[];
  inputPlaceholder?: string;
};

// Timer types
export type TimerStatus = "active" | "completed" | "cancelled";

export type TimerState = {
  duration_minutes: number;
  started_at: string;
  ends_at: string;
  status: TimerStatus;
  message_id?: number;
};

export type TimerPollResponse = {
  timer: TimerState | null;
  timer_ended: boolean;
  remaining_seconds?: number;
};


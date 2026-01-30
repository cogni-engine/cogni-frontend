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

export interface TaskResult {
  id: number;
  task_id: number;
  result_title: string;
  result_text: string;
  executed_at: string;
  created_at: string;
}

export interface Note {
  id: number;
  created_at: string;
  updated_at: string;
  title?: string | null;
  text: string;
  ydoc_state?: string | null;
  workspace_id: number;
  deleted_at?: string | null;
  note_folder_id?: number | null;
  workspace?: {
    id: number;
    title: string;
    type: 'group' | 'personal';
    created_at: string;
    icon_url?: string | null;
  };
  workspace_member_note?: NoteAssignment[];
  task_result?: TaskResult | null;
}

export interface NoteFolder {
  id: number;
  created_at: string;
  title: string;
  workspace_id: number;
}

export interface NoteWithParsed extends Note {
  title: string;
  preview: string;
  content: string;
}

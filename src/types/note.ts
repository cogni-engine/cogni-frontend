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
  text: string;
  workspace_id: number;
  workspace?: {
    id: number;
    title: string;
    type: 'group' | 'personal';
    created_at: string;
  };
  workspace_member_note?: NoteAssignment[];
}

export interface NoteWithParsed extends Note {
  title: string;
  preview: string;
  content: string;
}

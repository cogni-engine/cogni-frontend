export interface Note {
  id: number;
  created_at: string;
  updated_at: string;
  text: string;
  workspace_id: number;
}

export interface NoteWithParsed extends Note {
  title: string;
  preview: string;
  content: string;
}


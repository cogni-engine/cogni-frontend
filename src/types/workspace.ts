export interface Workspace {
  id: number;
  created_at: string;
  title: string | null;
  type: 'group' | 'personal';
  notes?: Note[];
  members?: WorkspaceMember[];
}

export interface Note {
  id: number;
  created_at: string;
  updated_at: string;
  text: string;
  workspace_id: number;
}

export interface WorkspaceMember {
  id: number;
  created_at: string;
  user_id: string;
  workspace_id: number;
  role: 'owner' | 'admin' | 'member';
  user_profile?: {
    id: string;
    user_name: string | null;
  };
}



export interface Mention {
  id: number;
  workspace_id: number;
  created_at: string;
  source_type: 'note' | 'message';
  source_id: number;
  target_type: 'workspace_member' | 'note';
  target_id: number;
  created_by: number;
}

export interface MentionWithDetails extends Mention {
  target_member?: {
    id: number;
    user_id: string;
    user_profile?: {
      name: string;
      avatar_url?: string;
    };
  };
  source?: {
    id: number;
    title?: string;
    text?: string;
  };
}

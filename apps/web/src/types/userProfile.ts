export type UserProfile = {
  id: string;
  created_at: string;
  updated_at: string | null;
  name: string | null;
  avatar_url: string | null;
  enable_ai_suggestion: boolean;
  deleted_at: string | null;
};

export type UserProfileUpdateInput = {
  name?: string | null;
  avatar_url?: string | null;
  enable_ai_suggestion?: boolean;
};

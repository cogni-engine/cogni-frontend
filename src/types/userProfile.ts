export type UserProfile = {
  id: string;
  created_at: string;
  updated_at: string | null;
  name: string | null;
  avatar_url: string | null;
};

export type UserProfileUpdateInput = {
  name?: string | null;
  avatar_url?: string | null;
};

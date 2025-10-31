import type { WorkspaceMember, WorkspaceProfile } from '@/types/workspace';

export type SupabaseProfile =
  | WorkspaceProfile
  | WorkspaceProfile[]
  | null
  | undefined;

export function normalizeWorkspaceProfile(
  profile: SupabaseProfile
): WorkspaceProfile | null | undefined {
  if (profile === undefined) {
    return undefined;
  }

  if (profile === null) {
    return null;
  }

  if (Array.isArray(profile)) {
    for (const entry of profile) {
      const normalized = normalizeWorkspaceProfile(entry);
      if (normalized) {
        return normalized;
      }
    }
    return null;
  }

  return {
    id: profile.id,
    name: profile.name ?? null,
    avatar_url: profile.avatar_url ?? null,
  };
}

type MemberWithoutProfile = Omit<WorkspaceMember, 'user_profile'>;

export type SupabaseWorkspaceMember = MemberWithoutProfile & {
  user_profile?: SupabaseProfile;
};

export function normalizeWorkspaceMember(
  member: SupabaseWorkspaceMember
): WorkspaceMember {
  return {
    ...member,
    role: (member.role ?? 'member') as WorkspaceMember['role'],
    user_profile: normalizeWorkspaceProfile(member.user_profile) ?? null,
  };
}

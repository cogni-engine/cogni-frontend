import type {
  WorkspaceMember,
  WorkspaceProfile,
  AgentProfile,
} from '@/types/workspace';

export type SupabaseProfile =
  | WorkspaceProfile
  | WorkspaceProfile[]
  | null
  | undefined;

export type SupabaseAgentProfile =
  | AgentProfile
  | AgentProfile[]
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

export function normalizeAgentProfile(
  profile: SupabaseAgentProfile
): AgentProfile | null | undefined {
  if (profile === undefined) {
    return undefined;
  }

  if (profile === null) {
    return null;
  }

  if (Array.isArray(profile)) {
    for (const entry of profile) {
      const normalized = normalizeAgentProfile(entry);
      if (normalized) {
        return normalized;
      }
    }
    return null;
  }

  return {
    id: profile.id,
    name: profile.name,
    avatar_url: profile.avatar_url,
  };
}

type MemberWithoutProfile = Omit<
  WorkspaceMember,
  'user_profile' | 'agent_profile' | 'is_agent'
>;

export type SupabaseWorkspaceMember = MemberWithoutProfile & {
  user_profile?: SupabaseProfile;
  agent_profile?: SupabaseAgentProfile;
};

export function normalizeWorkspaceMember(
  member: SupabaseWorkspaceMember
): WorkspaceMember {
  return {
    ...member,
    role: (member.role ?? 'member') as WorkspaceMember['role'],
    user_profile: normalizeWorkspaceProfile(member.user_profile) ?? null,
    agent_profile: normalizeAgentProfile(member.agent_profile) ?? null,
    is_agent: !!member.agent_id,
  };
}

// Helper functions for display
export function getDisplayProfile(
  member: WorkspaceMember
): WorkspaceProfile | AgentProfile | null {
  return member.agent_profile || member.user_profile || null;
}

export function getMemberDisplayName(member: WorkspaceMember): string {
  const profile = getDisplayProfile(member);
  return profile?.name || 'Unknown';
}

export function getMemberAvatarUrl(member: WorkspaceMember): string | null {
  const profile = getDisplayProfile(member);
  return profile?.avatar_url || null;
}

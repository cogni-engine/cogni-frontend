import { createClient } from '@/lib/supabase/browserClient';
import {
  normalizeWorkspaceMember,
  type SupabaseWorkspaceMember,
} from '@/lib/api/profileUtils';
import type { Workspace, WorkspaceMember } from '@/types/workspace';
import { generateAvatarBlob } from '@/features/users/utils/avatarGenerator';
import { getCurrentUserId } from '../cookies';

const supabase = createClient();
const WORKSPACE_ICON_BUCKET = 'workspace_icon';

function extractStoragePathFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split('/');
    const bucketIndex = parts.findIndex(part => part === WORKSPACE_ICON_BUCKET);
    if (bucketIndex === -1) return null;
    return parts.slice(bucketIndex + 1).join('/');
  } catch (error) {
    console.warn('Failed to parse workspace icon URL', error);
    return null;
  }
}

export async function getWorkspaces(): Promise<Workspace[]> {
  // Get current user
  const userId = getCurrentUserId();

  if (!userId) {
    throw new Error('User not authenticated');
  }

  // Get workspace IDs where user is a member (to avoid RLS recursion)
  const { data: memberData, error: memberError } = await supabase
    .from('workspace_member')
    .select('workspace_id, id, last_read_message_id')
    .eq('user_id', userId)
    .is('removed_at', null);

  if (memberError) throw memberError;

  // If user is not a member of any workspace, return empty array
  if (!memberData || memberData.length === 0) {
    return [];
  }

  type WorkspaceMembershipRow = {
    workspace_id: number;
    id: number;
    last_read_message_id: number | null;
  };

  const membershipRows = (memberData ?? []) as WorkspaceMembershipRow[];
  const workspaceIds = membershipRows.map(m => m.workspace_id);

  // Fetch all data in parallel instead of sequentially per workspace
  const [
    workspacesResult,
    allMessagesResult,
    allMembersResult,
    latestMessagesResult,
  ] = await Promise.all([
    // 1. Get workspaces
    supabase
      .from('workspace')
      .select('*')
      .in('id', workspaceIds)
      .in('type', ['group', 'dm'])
      .order('workspace_messages_updated_at', {
        ascending: false,
        nullsFirst: false,
      }),

    // 2. Get all messages for unread count calculation
    supabase
      .from('workspace_messages')
      .select('id, workspace_id, workspace_member_id')
      .in('workspace_id', workspaceIds),

    // 3. Get member counts for all workspaces at once
    supabase
      .from('workspace_member')
      .select('workspace_id')
      .in('workspace_id', workspaceIds)
      .is('removed_at', null),

    // 4. Get latest message for each workspace (one per workspace)
    supabase
      .from('workspace_messages')
      .select('workspace_id, text, created_at')
      .in('workspace_id', workspaceIds)
      .order('created_at', { ascending: false }),
  ]);

  if (workspacesResult.error) throw workspacesResult.error;

  if (!workspacesResult.data || workspacesResult.data.length === 0) {
    return [];
  }

  // Fetch DM other user profiles
  const dmWorkspaces = workspacesResult.data.filter(
    (w: { type: string }) => w.type === 'dm'
  );
  const dmProfileMap = new Map<
    number,
    { user_id: string; name: string | null; avatar_url: string | null }
  >();

  if (dmWorkspaces.length > 0) {
    const dmWorkspaceIds = dmWorkspaces.map((w: { id: number }) => w.id);
    const { data: dmMembers } = await supabase
      .from('workspace_member')
      .select('workspace_id, user_id, user_profile:user_id(name, avatar_url)')
      .in('workspace_id', dmWorkspaceIds)
      .neq('user_id', userId)
      .is('removed_at', null);

    if (dmMembers) {
      for (const m of dmMembers) {
        const profile = m.user_profile as unknown as {
          name: string | null;
          avatar_url: string | null;
        } | null;
        if (profile && m.user_id) {
          dmProfileMap.set(m.workspace_id, {
            user_id: m.user_id,
            name: profile.name,
            avatar_url: profile.avatar_url,
          });
        }
      }
    }
  }

  // Create lookup maps
  const membershipMap = new Map<number, WorkspaceMembershipRow>();
  for (const membership of membershipRows) {
    membershipMap.set(membership.workspace_id, membership);
  }

  // Calculate unread counts per workspace
  const unreadCountMap = new Map<number, number>();
  if (allMessagesResult.data) {
    for (const message of allMessagesResult.data) {
      const membership = membershipMap.get(message.workspace_id);
      if (!membership) continue;

      // Check if message should be counted as unread
      const isFromOtherMember =
        membership.id != null && message.workspace_member_id !== membership.id;
      const isAfterLastRead =
        membership.last_read_message_id != null
          ? message.id > membership.last_read_message_id
          : true;

      if (isFromOtherMember && isAfterLastRead) {
        const currentCount = unreadCountMap.get(message.workspace_id) || 0;
        unreadCountMap.set(message.workspace_id, currentCount + 1);
      }
    }
  }

  // Calculate member counts per workspace
  const memberCountMap = new Map<number, number>();
  if (allMembersResult.data) {
    for (const member of allMembersResult.data) {
      const count = memberCountMap.get(member.workspace_id) || 0;
      memberCountMap.set(member.workspace_id, count + 1);
    }
  }

  // Get latest message per workspace (first occurrence due to order by created_at desc)
  const latestMessageMap = new Map<number, string>();
  const seenWorkspaces = new Set<number>();
  if (latestMessagesResult.data) {
    for (const msg of latestMessagesResult.data) {
      if (!seenWorkspaces.has(msg.workspace_id)) {
        latestMessageMap.set(msg.workspace_id, msg.text);
        seenWorkspaces.add(msg.workspace_id);
      }
    }
  }

  // Assemble final workspace objects
  return workspacesResult.data.map(workspace => ({
    ...workspace,
    unread_count: unreadCountMap.get(workspace.id) || 0,
    member_count: memberCountMap.get(workspace.id) || 0,
    latest_message_text: latestMessageMap.get(workspace.id) || null,
    dm_other_user: dmProfileMap.get(workspace.id) || null,
  }));
}

export async function getPersonalWorkspace(): Promise<Workspace | null> {
  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Query from workspace table and join with workspace_member
  const { data, error } = await supabase
    .from('workspace')
    .select(
      `
      *,
      workspace_member!inner(user_id)
    `
    )
    .eq('type', 'personal')
    .eq('workspace_member.user_id', user.id)
    .single();

  if (error) throw error;

  return data as Workspace | null;
}

export async function getWorkspace(id: number): Promise<Workspace> {
  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Verify user is an active member of this workspace
  const { data: memberData, error: memberError } = await supabase
    .from('workspace_member')
    .select('workspace_id')
    .eq('workspace_id', id)
    .eq('user_id', user.id)
    .is('removed_at', null)
    .single();

  if (memberError || !memberData) {
    throw new Error('Access denied or workspace not found');
  }

  // Fetch workspace with notes (avoiding workspace_member to prevent RLS recursion)
  const { data, error } = await supabase
    .from('workspace')
    .select(
      `
      *,
      notes(*)
    `
    )
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}

export async function createWorkspace(
  title: string
  // type: 'group' | 'personal' = 'group'
): Promise<Workspace> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Use RPC function to create workspace (bypasses RLS)
  const { data: rpcData, error: rpcError } = await supabase.rpc(
    'create_workspace_with_member',
    {
      p_title: title,
    }
  );

  if (rpcError) {
    console.error('Failed to create workspace via RPC:', rpcError);

    // If RPC fails with NOT NULL constraint error, try to handle it
    if (rpcError.code === '23502') {
      // RPC function didn't set type, but workspace might have been created
      // Try to find the workspace and update it
      throw new Error(
        'Workspace creation failed: The database function needs to be updated. ' +
          "Please update the create_workspace_with_member function in Supabase to set type='group' in the INSERT statement."
      );
    }

    throw new Error(
      rpcError.message ||
        `Workspace creation failed: ${rpcError.code || 'Unknown error'}`
    );
  }

  if (!rpcData || rpcData.length === 0 || !rpcData[0]?.workspace_id) {
    throw new Error(
      'Failed to create workspace: No workspace ID returned from RPC'
    );
  }

  const workspaceId = rpcData[0].workspace_id;

  // Fetch the created workspace
  const { data: workspace, error: fetchError } = await supabase
    .from('workspace')
    .select('*')
    .eq('id', workspaceId)
    .single();

  if (fetchError || !workspace) {
    throw new Error(
      `Failed to fetch created workspace: ${fetchError?.message || 'Workspace not found'}`
    );
  }

  // If type is null, update it (RPC function might not set it)
  if (!workspace.type) {
    console.warn('Workspace type is null, updating to "group"');
    const updatedWorkspace = await updateWorkspace(workspaceId, {
      type: 'group',
    });
    if (updatedWorkspace) {
      workspace.type = updatedWorkspace.type;
    }
  }

  // Generate and upload default workspace icon
  try {
    const iconBlob = await generateAvatarBlob(title, {
      style: 'cosmic',
      includeInitials: false,
    });

    const { iconUrl } = await uploadWorkspaceIcon(workspaceId, iconBlob);

    // Update workspace with icon URL
    return await updateWorkspace(workspaceId, { icon_url: iconUrl });
  } catch (iconError) {
    console.warn('Failed to generate default workspace icon:', iconError);
    return workspace; // Return workspace without icon if generation fails
  }
}

export async function updateWorkspace(
  id: number,
  updates: Partial<Pick<Workspace, 'title' | 'type' | 'icon_url'>>
): Promise<Workspace> {
  const { data, error } = await supabase
    .from('workspace')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteWorkspace(id: number): Promise<void> {
  const { error } = await supabase.from('workspace').delete().eq('id', id);

  if (error) throw error;
}

export async function uploadWorkspaceIcon(
  workspaceId: number,
  file: File | Blob,
  previousIconUrl?: string | null
): Promise<{ iconUrl: string; path: string }> {
  const fileExt = file instanceof File ? file.name.split('.').pop() : 'png';
  const extension = fileExt
    ? fileExt.replace(/[^a-zA-Z0-9]/g, '') || 'png'
    : 'png';
  const filePath = `${workspaceId}/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(WORKSPACE_ICON_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from(WORKSPACE_ICON_BUCKET).getPublicUrl(filePath);

  if (previousIconUrl) {
    const oldPath = extractStoragePathFromUrl(previousIconUrl);
    if (oldPath) {
      void supabase.storage.from(WORKSPACE_ICON_BUCKET).remove([oldPath]);
    }
  }

  return { iconUrl: publicUrl, path: filePath };
}

export async function removeWorkspaceIcon(
  workspaceId: number,
  currentIconUrl?: string | null
): Promise<Workspace> {
  if (currentIconUrl) {
    const path = extractStoragePathFromUrl(currentIconUrl);
    if (path) {
      await supabase.storage.from(WORKSPACE_ICON_BUCKET).remove([path]);
    }
  }

  return updateWorkspace(workspaceId, { icon_url: null });
}

export async function checkWorkspaceMembership(
  workspaceId: number
): Promise<boolean> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data, error } = await supabase
    .from('workspace_member')
    .select('workspace_id')
    .eq('workspace_id', workspaceId)
    .eq('user_id', user.id)
    .is('removed_at', null)
    .maybeSingle();

  return !error && data !== null;
}

export async function getWorkspaceMembers(
  workspaceId: number
): Promise<WorkspaceMember[]> {
  // Fetch workspace members with their user profiles and agent profiles
  const { data, error } = await supabase
    .from('workspace_member')
    .select(
      `
      id,
      created_at,
      user_id,
      agent_id,
      workspace_id,
      role,
      user_profile:user_id(id, name, avatar_url),
      agent_profile:agent_id(id, name, avatar_url)
    `
    )
    .eq('workspace_id', workspaceId)
    .is('removed_at', null)
    .order('created_at', { ascending: true });

  console.log('📦 getWorkspaceMembers raw response:', { data, error });

  if (error) {
    console.error('❌ getWorkspaceMembers error:', error);
    console.error('❌ Error details:', JSON.stringify(error, null, 2));
    throw error;
  }

  console.log('✅ getWorkspaceMembers data received:', data);
  console.log('📊 getWorkspaceMembers data length:', data?.length);

  const members = (data ?? []) as SupabaseWorkspaceMember[];

  return members.map(normalizeWorkspaceMember);
}

/**
 * Get all workspace members from all workspaces the user belongs to
 * Excludes the current user and deduplicates by user_id
 */
export async function getAllWorkspaceMembersForUser(): Promise<
  WorkspaceMember[]
> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Get all workspace IDs where user is a member
  const { data: userMemberships, error: membershipError } = await supabase
    .from('workspace_member')
    .select('workspace_id')
    .eq('user_id', user.id)
    .is('removed_at', null);

  if (membershipError) throw membershipError;

  if (!userMemberships || userMemberships.length === 0) {
    return [];
  }

  const workspaceIds = userMemberships.map(m => m.workspace_id);

  // Fetch all workspace members from these workspaces (exclude agents)
  const { data, error } = await supabase
    .from('workspace_member')
    .select(
      `
      id,
      created_at,
      user_id,
      workspace_id,
      role,
      agent_id,
      user_profile:user_id(id, name, avatar_url)
    `
    )
    .in('workspace_id', workspaceIds)
    .neq('user_id', user.id) // Exclude current user
    .is('agent_id', null) // Exclude agent users
    .is('removed_at', null) // Exclude removed members
    .order('created_at', { ascending: true });

  if (error) throw error;

  const members = (data ?? []) as SupabaseWorkspaceMember[];

  // Deduplicate by user_id (a user might be in multiple workspaces)
  const uniqueMembersMap = new Map<string, WorkspaceMember>();

  members.forEach(member => {
    if (member.user_id) {
      const normalized = normalizeWorkspaceMember(member);
      if (!uniqueMembersMap.has(member.user_id)) {
        uniqueMembersMap.set(member.user_id, normalized);
      }
    }
  });

  return Array.from(uniqueMembersMap.values());
}

/**
 * Add multiple members to a workspace
 * @param workspaceId The workspace ID
 * @param userIds Array of user IDs to add
 * @returns Array of created workspace member IDs
 */
export async function addWorkspaceMembers(
  workspaceId: number,
  userIds: string[]
): Promise<number[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  if (userIds.length === 0) {
    return [];
  }

  // Check which users are already active members
  const { data: existingMembers, error: checkError } = await supabase
    .from('workspace_member')
    .select('user_id')
    .eq('workspace_id', workspaceId)
    .in('user_id', userIds)
    .is('removed_at', null);

  if (checkError) {
    throw checkError;
  }

  const existingUserIds = new Set(
    (existingMembers || []).map(m => m.user_id).filter(Boolean) as string[]
  );

  // Filter out users who are already members
  const newUserIds = userIds.filter(id => !existingUserIds.has(id));

  if (newUserIds.length === 0) {
    return [];
  }

  // Insert new members
  const { data: insertedMembers, error: insertError } = await supabase
    .from('workspace_member')
    .insert(
      newUserIds.map(userId => ({
        workspace_id: workspaceId,
        user_id: userId,
        role: 'member',
      }))
    )
    .select('id');

  if (insertError) {
    throw insertError;
  }

  return (insertedMembers || []).map(m => m.id);
}

/**
 * Find or create a DM workspace between the current user and another user.
 * Uses Supabase RPC to prevent duplicates.
 */
export async function findOrCreateDmWorkspace(
  otherUserId: string
): Promise<{ workspace_id: number; is_new: boolean }> {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase.rpc('find_or_create_dm_workspace', {
    p_user_id_1: userId,
    p_user_id_2: otherUserId,
  });

  if (error) {
    console.error('RPC find_or_create_dm_workspace error:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw new Error(error.message || 'DM workspace creation failed');
  }

  if (!data || data.length === 0) {
    throw new Error('Failed to find or create DM workspace');
  }

  return data[0];
}

/**
 * Remove (kick) a member from a workspace by setting removed_at.
 * Permission: owner can kick anyone, admin can kick members only.
 */
export async function removeWorkspaceMember(
  workspaceId: number,
  targetMemberId: number
): Promise<void> {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User not authenticated');
  }

  // Block removal in DM workspaces
  const { data: workspace } = await supabase
    .from('workspace')
    .select('type')
    .eq('id', workspaceId)
    .single();

  if (workspace?.type === 'dm') {
    throw new Error('Cannot remove members from a DM workspace');
  }

  // Get current user's role
  const { data: currentMember, error: currentError } = await supabase
    .from('workspace_member')
    .select('id, role')
    .eq('workspace_id', workspaceId)
    .eq('user_id', userId)
    .is('removed_at', null)
    .single();

  if (currentError || !currentMember) {
    throw new Error('You are not a member of this workspace');
  }

  // Get target member's role
  const { data: targetMember, error: targetError } = await supabase
    .from('workspace_member')
    .select('id, role, user_id')
    .eq('id', targetMemberId)
    .eq('workspace_id', workspaceId)
    .is('removed_at', null)
    .single();

  if (targetError || !targetMember) {
    throw new Error('Member not found');
  }

  // Cannot remove yourself
  if (targetMember.user_id === userId) {
    throw new Error('You cannot remove yourself');
  }

  // Permission check: owner cannot be kicked, others can kick equal or lower roles
  const targetRole = targetMember.role;

  if (targetRole === 'owner') {
    throw new Error('Cannot remove the workspace owner');
  }

  const roleRank: Record<string, number> = { owner: 3, admin: 2, member: 1 };
  if ((roleRank[currentMember.role] ?? 0) < (roleRank[targetRole] ?? 0)) {
    throw new Error('You do not have permission to remove this member');
  }

  // Soft delete: set removed_at
  const { error: updateError } = await supabase
    .from('workspace_member')
    .update({ removed_at: new Date().toISOString() })
    .eq('id', targetMemberId);

  if (updateError) {
    throw new Error(updateError.message || 'Failed to remove member');
  }
}

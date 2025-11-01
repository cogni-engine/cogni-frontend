import { createClient } from '@/lib/supabase/browserClient';
import {
  normalizeWorkspaceMember,
  type SupabaseWorkspaceMember,
} from '@/lib/api/profileUtils';
import type { Workspace, WorkspaceMember } from '@/types/workspace';

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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Get workspace IDs where user is a member (to avoid RLS recursion)
  const { data: memberData, error: memberError } = await supabase
    .from('workspace_member')
    .select('workspace_id, id, last_read_message_id')
    .eq('user_id', user.id);

  if (memberError) throw memberError;

  // If user is not a member of any workspace, return empty array
  if (!memberData || memberData.length === 0) {
    return [];
  }

  // Get workspaces for those IDs, excluding personal workspaces
  type WorkspaceMembershipRow = {
    workspace_id: number;
    id: number;
    last_read_message_id: number | null;
  };

  const membershipRows = (memberData ?? []) as WorkspaceMembershipRow[];
  const workspaceIds = membershipRows.map(m => m.workspace_id);
  const { data, error } = await supabase
    .from('workspace')
    .select('*')
    .in('id', workspaceIds)
    .eq('type', 'group')
    .order('created_at', { ascending: false });

  if (error) throw error;

  if (!data || data.length === 0) {
    return [];
  }

  const membershipMap = new Map<number, WorkspaceMembershipRow>();
  for (const membership of membershipRows) {
    membershipMap.set(membership.workspace_id, membership);
  }

  const workspacesWithCounts = await Promise.all(
    data.map(async workspace => {
      const membership = membershipMap.get(workspace.id);

      if (!membership) {
        return {
          ...workspace,
          unread_count: 0,
        } as Workspace;
      }

      let query = supabase
        .from('workspace_messages')
        .select('id', { count: 'exact', head: true })
        .eq('workspace_id', workspace.id);

      if (membership.id != null) {
        query = query.neq('workspace_member_id', membership.id);
      }

      if (membership.last_read_message_id != null) {
        query = query.gt('id', membership.last_read_message_id);
      }

      const { count, error: countError } = await query;

      if (countError) {
        console.warn(
          'Failed to fetch unread message count for workspace',
          workspace.id,
          countError
        );

        return {
          ...workspace,
          unread_count: 0,
        } as Workspace;
      }

      return {
        ...workspace,
        unread_count: count ?? 0,
      } as Workspace;
    })
  );

  return workspacesWithCounts;
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

  // Verify user is a member of this workspace
  const { data: memberData, error: memberError } = await supabase
    .from('workspace_member')
    .select('workspace_id')
    .eq('workspace_id', id)
    .eq('user_id', user.id)
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
  // Call the database function that creates workspace and adds user as member
  const { data, error } = await supabase.rpc('create_workspace_with_member', {
    p_title: title,
    // p_type: type
  });

  if (error) throw error;

  // Fetch the created workspace to return it with full details
  if (data && data.length > 0 && data[0].workspace_id) {
    const { data: workspace, error: fetchError } = await supabase
      .from('workspace')
      .select('*')
      .eq('id', data[0].workspace_id)
      .single();

    if (fetchError) throw fetchError;
    return workspace;
  }

  throw new Error('Failed to create workspace');
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
    .maybeSingle();

  return !error && data !== null;
}

export async function getWorkspaceMembers(
  workspaceId: number
): Promise<WorkspaceMember[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Fetch workspace members with their user profiles
  const { data, error } = await supabase
    .from('workspace_member')
    .select(
      `
      id,
      created_at,
      user_id,
      workspace_id,
      role,
      user_profile:user_id(id, name, avatar_url)
    `
    )
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: true });

  if (error) throw error;

  const members = (data ?? []) as SupabaseWorkspaceMember[];

  return members.map(normalizeWorkspaceMember);
}

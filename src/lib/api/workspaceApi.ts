import { createClient } from '@/lib/supabase/browserClient';
import type { Workspace } from '@/types/workspace';

const supabase = createClient();

export async function getWorkspaces(): Promise<Workspace[]> {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Get workspace IDs where user is a member (to avoid RLS recursion)
  const { data: memberData, error: memberError } = await supabase
    .from('workspace_member')
    .select('workspace_id')
    .eq('user_id', user.id);

  if (memberError) throw memberError;
  
  // If user is not a member of any workspace, return empty array
  if (!memberData || memberData.length === 0) {
    return [];
  }

  // Get workspaces for those IDs, excluding personal workspaces
  const workspaceIds = memberData.map(m => m.workspace_id);
  const { data, error } = await supabase
    .from('workspace')
    .select('*')
    .in('id', workspaceIds)
    .eq('type', 'group')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getPersonalWorkspace(): Promise<Workspace | null> {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Query from workspace table and join with workspace_member
  const { data, error } = await supabase
    .from('workspace')
    .select(`
      *,
      workspace_member!inner(user_id)
    `)
    .eq('type', 'personal')
    .eq('workspace_member.user_id', user.id)
    .single();

  if (error) throw error;

  return data as Workspace | null;
}

export async function getWorkspace(id: number): Promise<Workspace> {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
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
    .select(`
      *,
      notes(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  
  return data;
}

export async function createWorkspace(
  title: string,
  // type: 'group' | 'personal' = 'group'
): Promise<Workspace> {
  // Call the database function that creates workspace and adds user as member
  const { data, error } = await supabase
    .rpc('create_workspace_with_member', {
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
  updates: Partial<Pick<Workspace, 'title' | 'type'>>
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
  const { error } = await supabase
    .from('workspace')
    .delete()
    .eq('id', id);

  if (error) throw error;
}



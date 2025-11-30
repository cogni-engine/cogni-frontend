import { getClient } from './supabase/client';
import type { Workspace } from '@cogni/types';

/**
 * Get the user's personal workspace
 * Returns null if not found
 */
export async function getPersonalWorkspace(): Promise<Workspace | null> {
  const supabase = getClient();
  
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



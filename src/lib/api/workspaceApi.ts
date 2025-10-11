import { createClient } from '@/lib/supabase/browserClient';
import type { Workspace } from '@/types/workspace';

const supabase = createClient();

export async function getWorkspaces(): Promise<Workspace[]> {
  const { data, error } = await supabase
    .from('workspace')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getWorkspace(id: number): Promise<Workspace> {
  const { data, error } = await supabase
    .from('workspace')
    .select(`
      *,
      notes(*),
      workspace_member(
        *,
        user_profile(id, user_name)
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  
  // Rename workspace_member to members for cleaner API
  const { workspace_member, ...workspace } = data as any;
  return {
    ...workspace,
    members: workspace_member,
  };
}

export async function createWorkspace(
  title: string,
  type: 'group' | 'personal' = 'group'
): Promise<Workspace> {
  const { data, error } = await supabase
    .from('workspace')
    .insert({ title, type })
    .select()
    .single();

  if (error) throw error;
  return data;
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



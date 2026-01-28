import { createClient } from '@/lib/supabase/browserClient';
import type { Thread } from '@/features/cogno/domain/thread';

const supabase = createClient();

/**
 * Get the most recent 30 threads for a specific workspace
 */
export async function getThreads(workspaceId: number): Promise<Thread[]> {
  const { data, error } = await supabase
    .from('threads')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('updated_at', { ascending: false })
    .limit(30);

  if (error) throw error;
  return data || [];
}

/**
 * Create a new thread
 */
export async function createThread(
  workspaceId: number,
  title: string
): Promise<Thread> {
  const { data, error } = await supabase
    .from('threads')
    .insert({
      workspace_id: workspaceId,
      title,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update an existing thread
 */
export async function updateThread(id: number, title: string): Promise<Thread> {
  const { data, error } = await supabase
    .from('threads')
    .update({
      title,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a thread
 */
export async function deleteThread(id: number): Promise<void> {
  const { error } = await supabase.from('threads').delete().eq('id', id);

  if (error) throw error;
}

import { getClient } from './supabase/client';
import type { Note } from '@cogni/types';

const getSupabase = () => getClient();

/**
 * Parse note text into title and content
 * First line is title, rest is content
 */
export function parseNoteText(text: string): {
  title: string;
  content: string;
} {
  const lines = text.split('\n');
  const title = lines[0] || 'Untitled';
  const content = lines.slice(1).join('\n');
  return { title, content };
}

/**
 * Combine title and content into text format for storage
 */
export function combineNoteText(title: string, content: string): string {
  return `${title}\n${content}`;
}

/**
 * Get all notes for a specific workspace
 */
export async function getNotes(
  workspaceId: number,
  includeDeleted = true
): Promise<Note[]> {
  const supabase = getSupabase();
  let query = supabase
    .from('notes')
    .select(
      `
      *,
      workspace_member_note(
        workspace_member_note_role,
        workspace_member:workspace_member_id(
          id,
          user_id,
          user_profiles!user_id(id, name, avatar_url)
        )
      )
    `
    )
    .eq('workspace_id', workspaceId);

  if (!includeDeleted) {
    query = query.is('deleted_at', null);
  }

  const { data, error } = await query.order('updated_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((note: any) => ({
    ...note,
    workspace_member_note: (note.workspace_member_note || []).map(
      (assignment: any) => ({
        ...assignment,
        workspace_member: assignment.workspace_member
          ? {
              ...assignment.workspace_member,
              user_profiles: Array.isArray(
                assignment.workspace_member.user_profiles
              )
                ? assignment.workspace_member.user_profiles[0]
                : assignment.workspace_member.user_profiles,
            }
          : undefined,
      })
    ),
  }));
}

/**
 * Get a single note by ID
 */
export async function getNote(id: number): Promise<Note | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

/**
 * Create a new note
 */
export async function createNote(
  workspaceId: number,
  title: string,
  content: string,
  folderId?: number | null
): Promise<Note> {
  const supabase = getSupabase();
  const text = combineNoteText(title, content);

  const { data, error } = await supabase
    .from('notes')
    .insert({
      workspace_id: workspaceId,
      title,
      text,
      note_folder_id: folderId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update an existing note
 */
export async function updateNote(
  id: number,
  title: string,
  content: string
): Promise<Note> {
  const supabase = getSupabase();
  const text = combineNoteText(title, content);

  const { data, error } = await supabase
    .from('notes')
    .update({
      title,
      text,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update just the title of a note
 */
export async function updateNoteTitle(
  id: number,
  title: string
): Promise<Note> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('notes')
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
 * Soft delete a note
 */
export async function softDeleteNote(id: number): Promise<Note> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('notes')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Restore a soft-deleted note
 */
export async function restoreNote(id: number): Promise<Note> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('notes')
    .update({ deleted_at: null })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Permanently delete a note
 */
export async function deleteNote(id: number): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from('notes').delete().eq('id', id);
  if (error) throw error;
}

/**
 * Duplicate a note
 */
export async function duplicateNote(id: number): Promise<Note> {
  const supabase = getSupabase();
  const { data: originalNote, error: fetchError } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  // Use title column if available, otherwise parse from text
  const originalTitle = originalNote.title || parseNoteText(originalNote.text).title;
  const newTitle = `${originalTitle} (Copy)`;

  const { data, error } = await supabase
    .from('notes')
    .insert({
      workspace_id: originalNote.workspace_id,
      title: newTitle,
      text: originalNote.text,
      note_folder_id: originalNote.note_folder_id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Empty trash
 */
export async function emptyTrash(workspaceId: number): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('workspace_id', workspaceId)
    .not('deleted_at', 'is', null);

  if (error) throw error;
}

/**
 * Search notes
 */
export async function searchNotes(
  workspaceId: number,
  searchQuery: string
): Promise<Note[]> {
  if (!searchQuery.trim()) {
    return getNotes(workspaceId);
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('notes')
    .select(
      `
      *,
      workspace:workspace_id(*),
      workspace_member_note(
        workspace_member_note_role,
        workspace_member:workspace_member_id(
          id,
          user_id,
          user_profiles!user_id(id, name, avatar_url)
        )
      )
    `
    )
    .eq('workspace_id', workspaceId)
    .ilike('text', `%${searchQuery}%`)
    .order('updated_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((note: any) => ({
    ...note,
    workspace_member_note: (note.workspace_member_note || []).map(
      (assignment: any) => ({
        ...assignment,
        workspace_member: assignment.workspace_member
          ? {
              ...assignment.workspace_member,
              user_profiles: Array.isArray(
                assignment.workspace_member.user_profiles
              )
                ? assignment.workspace_member.user_profiles[0]
                : assignment.workspace_member.user_profiles,
            }
          : undefined,
      })
    ),
  }));
}

/**
 * Get notes where current user is assigned
 */
export async function getUserAssignedNotes(): Promise<Note[]> {
  const supabase = getSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  const { data: members, error: memberError } = await supabase
    .from('workspace_member')
    .select('id')
    .eq('user_id', user.id);

  if (memberError) throw memberError;
  if (!members || members.length === 0) return [];

  const memberIds = members.map((m: any) => m.id);

  const { data: assignments, error: assignmentError } = await supabase
    .from('workspace_member_note')
    .select('note_id')
    .in('workspace_member_id', memberIds);

  if (assignmentError) throw assignmentError;
  if (!assignments || assignments.length === 0) return [];

  const noteIds = [...new Set(assignments.map((a: any) => a.note_id))];

  const { data, error } = await supabase
    .from('notes')
    .select(
      `
      *,
      workspace:workspace_id(*),
      workspace_member_note(
        workspace_member_note_role,
        workspace_member:workspace_member_id(
          id,
          user_id,
          user_profiles!user_id(id, name, avatar_url)
        )
      )
    `
    )
    .in('id', noteIds)
    .order('updated_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((note: any) => ({
    ...note,
    workspace_member_note: (note.workspace_member_note || []).map(
      (assignment: any) => ({
        ...assignment,
        workspace_member: assignment.workspace_member
          ? {
              ...assignment.workspace_member,
              user_profiles: Array.isArray(
                assignment.workspace_member.user_profiles
              )
                ? assignment.workspace_member.user_profiles[0]
                : assignment.workspace_member.user_profiles,
            }
          : undefined,
      })
    ),
  }));
}

/**
 * Assign note to workspace members as assigner/assignee
 */
export async function assignNoteToMembers(
  noteId: number,
  assignerIds: number[],
  assigneeIds: number[]
): Promise<void> {
  const supabase = getSupabase();
  
  // Delete existing assignments
  const { error: deleteError } = await supabase
    .from('workspace_member_note')
    .delete()
    .eq('note_id', noteId);

  if (deleteError) throw deleteError;

  // Create new assignments
  const assignments = [
    ...assignerIds.map(id => ({
      workspace_member_id: id,
      note_id: noteId,
      workspace_member_note_role: 'assigner',
    })),
    ...assigneeIds.map(id => ({
      workspace_member_id: id,
      note_id: noteId,
      workspace_member_note_role: 'assignee',
    })),
  ];

  if (assignments.length > 0) {
    const { error } = await supabase
      .from('workspace_member_note')
      .insert(assignments);
    if (error) throw error;
  }
}

/**
 * Get note assignment information
 */
export async function getNoteAssignments(noteId: number): Promise<{
  assigners: any[];
  assignees: any[];
}> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('workspace_member_note')
    .select(
      `
      workspace_member_note_role,
      workspace_member:workspace_member_id(
        id,
        user_id,
        user_profiles!user_id(id, name)
      )
    `
    )
    .eq('note_id', noteId);

  if (error) throw error;

  const transformedData = (data || []).map((item: any) => ({
    workspace_member_note_role: item.workspace_member_note_role,
    workspace_member: item.workspace_member
      ? {
          ...item.workspace_member,
          user_profile: Array.isArray(item.workspace_member.user_profiles)
            ? item.workspace_member.user_profiles[0]
            : item.workspace_member.user_profiles,
        }
      : undefined,
  }));

  return {
    assigners: transformedData.filter((d: any) => d.workspace_member_note_role === 'assigner') || [],
    assignees: transformedData.filter((d: any) => d.workspace_member_note_role === 'assignee') || [],
  };
}


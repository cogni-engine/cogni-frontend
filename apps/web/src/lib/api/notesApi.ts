import { createClient } from '@/lib/supabase/browserClient';
import type { Note } from '@/types/note';

const supabase = createClient();

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
 * Get all notes for a specific workspace with assignments
 * @param workspaceId - The workspace ID
 * @param includeDeleted - Include soft-deleted notes (default: true)
 */
export async function getNotes(
  workspaceId: number,
  includeDeleted = true
): Promise<Note[]> {
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

  // Filter by deleted_at if not including deleted
  if (!includeDeleted) {
    query = query.is('deleted_at', null);
  }

  const { data, error } = await query.order('updated_at', { ascending: false });

  if (error) throw error;

  // Transform the nested structure to match our types
  return (data || []).map(note => ({
    ...note,
    workspace_member_note: (note.workspace_member_note || []).map(
      (assignment: { workspace_member?: { user_profiles?: unknown } }) => ({
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
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
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
  const text = combineNoteText(title, content);

  const { data, error } = await supabase
    .from('notes')
    .insert({
      workspace_id: workspaceId,
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
  const text = combineNoteText(title, content);

  const { data, error } = await supabase
    .from('notes')
    .update({
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
 * Soft delete a note (move to trash)
 */
export async function softDeleteNote(id: number): Promise<Note> {
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
 * Permanently delete a note (hard delete)
 */
export async function deleteNote(id: number): Promise<void> {
  const { error } = await supabase.from('notes').delete().eq('id', id);

  if (error) throw error;
}

/**
 * Duplicate a note
 */
export async function duplicateNote(id: number): Promise<Note> {
  // First, get the note to duplicate
  const { data: originalNote, error: fetchError } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  // Parse the original title
  const { title, content } = parseNoteText(originalNote.text);
  const newTitle = `${title} (Copy)`;
  const newText = combineNoteText(newTitle, content);

  // Create the duplicate
  const { data, error } = await supabase
    .from('notes')
    .insert({
      workspace_id: originalNote.workspace_id,
      text: newText,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Empty trash (permanently delete all soft-deleted notes in a workspace)
 */
export async function emptyTrash(workspaceId: number): Promise<void> {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('workspace_id', workspaceId)
    .not('deleted_at', 'is', null);

  if (error) throw error;
}

/**
 * Search notes by text content
 */
export async function searchNotes(
  workspaceId: number,
  searchQuery: string
): Promise<Note[]> {
  if (!searchQuery.trim()) {
    return getNotes(workspaceId);
  }

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

  // Transform the nested structure to match our types
  return (data || []).map(note => ({
    ...note,
    workspace_member_note: (note.workspace_member_note || []).map(
      (assignment: { workspace_member?: { user_profiles?: unknown } }) => ({
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
 * Get notes where current user is assigned as assigner or assignee
 */
export async function getUserAssignedNotes(): Promise<Note[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  // 1. Get all workspace_member records for current user
  const { data: members, error: memberError } = await supabase
    .from('workspace_member')
    .select('id')
    .eq('user_id', user.id);

  if (memberError) throw memberError;
  if (!members || members.length === 0) return [];

  const memberIds = members.map(m => m.id);

  // 2. Get note_ids from workspace_member_note
  const { data: assignments, error: assignmentError } = await supabase
    .from('workspace_member_note')
    .select('note_id')
    .in('workspace_member_id', memberIds);

  if (assignmentError) throw assignmentError;
  if (!assignments || assignments.length === 0) return [];

  const noteIds = [...new Set(assignments.map(a => a.note_id))];

  // 3. Get notes with workspace info and assignments
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

  // Transform the nested structure to match our types
  return (data || []).map(note => ({
    ...note,
    workspace_member_note: (note.workspace_member_note || []).map(
      (assignment: { workspace_member?: { user_profiles?: unknown } }) => ({
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
type NoteAssignmentItem = {
  workspace_member_note_role: string;
  workspace_member?: {
    id?: number;
    user_id?: string;
    user_profiles?:
      | {
          id?: string;
          name?: string;
        }
      | {
          id?: string;
          name?: string;
        }[];
  };
};

export async function getNoteAssignments(noteId: number): Promise<{
  assigners: NoteAssignmentItem[];
  assignees: NoteAssignmentItem[];
}> {
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

  if (error) {
    throw error;
  }

  // Transform nested structure (same pattern as workspaceMessagesApi)
  const transformedData = (data || []).map((item: unknown) => {
    const typedItem = item as NoteAssignmentItem;
    return {
      workspace_member_note_role: typedItem.workspace_member_note_role,
      workspace_member: typedItem.workspace_member
        ? {
            ...typedItem.workspace_member,
            user_profile: Array.isArray(
              typedItem.workspace_member.user_profiles
            )
              ? typedItem.workspace_member.user_profiles[0]
              : typedItem.workspace_member.user_profiles,
          }
        : undefined,
    };
  });

  const result = {
    assigners:
      transformedData.filter(
        d => d.workspace_member_note_role === 'assigner'
      ) || [],
    assignees:
      transformedData.filter(
        d => d.workspace_member_note_role === 'assignee'
      ) || [],
  };

  return result;
}

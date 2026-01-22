import { createClient } from '@/lib/supabase/browserClient';
import type { Note } from '@/types/note';
import { getCurrentUserId } from '@/lib/cookies';

const supabase = createClient();

/**
 * Parse note text into title and content
 * @deprecated Title is now stored as a separate field in the database
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
      id,
      created_at,
      updated_at,
      title,
      text,
      workspace_id,
      deleted_at,
      note_folder_id,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((note: any) => ({
    ...note,
    workspace_member_note: (note.workspace_member_note || []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (assignment: any) => ({
        ...assignment,
        workspace_member: assignment.workspace_member?.[0]
          ? {
              ...assignment.workspace_member[0],
              user_profiles: Array.isArray(
                assignment.workspace_member[0].user_profiles
              )
                ? assignment.workspace_member[0].user_profiles[0]
                : assignment.workspace_member[0].user_profiles,
            }
          : undefined,
      })
    ),
  })) as Note[];
}

/**
 * Get a single note by ID
 */
export async function getNote(id: number): Promise<Note | null> {
  const { data, error } = await supabase
    .from('notes')
    .select(
      'id, created_at, updated_at, title, text, workspace_id, deleted_at, note_folder_id'
    )
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
  const { data, error } = await supabase
    .from('notes')
    .insert({
      workspace_id: workspaceId,
      title,
      text: content,
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
  const { data, error } = await supabase
    .from('notes')
    .update({
      title,
      text: content,
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
    .select('id, title, text, workspace_id, note_folder_id')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  // Get the title - use dedicated field if available, otherwise parse from text
  const originalTitle =
    originalNote.title || originalNote.text.split('\n')[0] || 'Untitled';
  const newTitle = `${originalTitle} (Copy)`;

  // Create the duplicate
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
 * Search notes by title and text content
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
      id,
      created_at,
      updated_at,
      title,
      text,
      workspace_id,
      deleted_at,
      note_folder_id,
      workspace:workspace_id(id, title, type, created_at, icon_url),
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
    .or(`title.ilike.%${searchQuery}%,text.ilike.%${searchQuery}%`)
    .order('updated_at', { ascending: false });

  if (error) throw error;

  // Transform the nested structure to match our types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((note: any) => ({
    ...note,
    workspace: Array.isArray(note.workspace)
      ? note.workspace[0]
      : note.workspace,
    workspace_member_note: (note.workspace_member_note || []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (assignment: any) => ({
        ...assignment,
        workspace_member: assignment.workspace_member?.[0]
          ? {
              ...assignment.workspace_member[0],
              user_profiles: Array.isArray(
                assignment.workspace_member[0].user_profiles
              )
                ? assignment.workspace_member[0].user_profiles[0]
                : assignment.workspace_member[0].user_profiles,
            }
          : undefined,
      })
    ),
  })) as Note[];
}

/**
 * Get notes where current user is assigned as assigner or assignee
 */
export async function getUserAssignedNotes(): Promise<Note[]> {
  const userId = getCurrentUserId();

  if (!userId) throw new Error('Not authenticated');

  // 1. Get all workspace_member records for current user
  const { data: members, error: memberError } = await supabase
    .from('workspace_member')
    .select('id')
    .eq('user_id', userId);

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
      id,
      created_at,
      updated_at,
      title,
      text,
      workspace_id,
      deleted_at,
      note_folder_id,
      workspace:workspace_id(id, title, type, created_at, icon_url),
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((note: any) => ({
    ...note,
    workspace: Array.isArray(note.workspace)
      ? note.workspace[0]
      : note.workspace,
    workspace_member_note: (note.workspace_member_note || []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (assignment: any) => ({
        ...assignment,
        workspace_member: assignment.workspace_member?.[0]
          ? {
              ...assignment.workspace_member[0],
              user_profiles: Array.isArray(
                assignment.workspace_member[0].user_profiles
              )
                ? assignment.workspace_member[0].user_profiles[0]
                : assignment.workspace_member[0].user_profiles,
            }
          : undefined,
      })
    ),
  })) as Note[];
}

// Types for AI suggestions
export interface AISuggestion {
  block_id: string;
  action: 'replace' | 'insert_after' | 'delete';
  suggested_text?: string[]; // list of text blocks (allows multiple inserts for same block)
}

export interface AISuggestResponse {
  suggestions: AISuggestion[];
}

/**
 * Get AI suggestions for editing a note using anchor-based format
 *
 * Requires:
 * - annotatedNoteContent: Markdown with block ID comments (converted to simple IDs for AI)
 * - userInstruction: User's instruction for how to edit the note
 * - fileContents: Optional list of file contents to use as context
 */
export async function getAISuggestions(
  annotatedNoteContent: string,
  userInstruction: string,
  fileContents?: string[]
): Promise<AISuggestion[]> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

  try {
    const response = await fetch(`${apiUrl}/api/note-ai-editor/suggest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        annotated_note_content: annotatedNoteContent,
        user_instruction: userInstruction,
        file_contents: fileContents,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail ||
          `Failed to get AI suggestions: ${response.statusText}`
      );
    }

    const data: AISuggestResponse = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.error('Failed to get AI suggestions:', error);
    throw error;
  }
}

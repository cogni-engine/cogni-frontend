import { createClient } from '@/lib/supabase/browserClient';

const supabase = createClient();
const WORKSPACE_FILES_BUCKET = 'workspace-files';

export interface WorkspaceFile {
  id: number; // bigint (database primary key)
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  created_at: string;
}

export interface UploadedFile {
  id: number; // workspace_file_id (bigint, database primary key)
  file_path: string;
  url: string;
  original_filename: string;
  file_size: number;
  mime_type: string;
}

/**
 * Upload a file to workspace storage
 */
export async function uploadWorkspaceFile(
  workspaceId: number,
  file: File
): Promise<UploadedFile> {
  // Generate a UUID for the storage path (not the database ID)
  const storageUuid = crypto.randomUUID();
  const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

  // Storage path: workspace-files/{workspace_id}/uploads/{uuid}/{original_filename}
  const filePath = `${workspaceId}/uploads/${storageUuid}/${sanitizedFilename}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from(WORKSPACE_FILES_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) throw uploadError;

  // Insert file metadata into workspace_files table (database ID is auto-generated bigint)
  const { data: fileData, error: dbError } = await supabase
    .from('workspace_files')
    .insert({
      original_file_name: file.name,
      file_path: filePath,
      mime_type: file.type,
      file_size: file.size,
      workspace_id: workspaceId,
    })
    .select()
    .single();

  if (dbError) throw dbError;

  // Generate signed URL for private bucket (valid for 1 hour)
  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from(WORKSPACE_FILES_BUCKET)
    .createSignedUrl(filePath, 3600); // 1 hour expiration

  if (signedUrlError) {
    console.warn('Error creating signed URL:', signedUrlError);
  }

  // Return file info with workspace_file_id
  return {
    id: fileData.id,
    file_path: filePath,
    url: signedUrlData?.signedUrl || '', // Signed URL for private bucket
    original_filename: file.name,
    file_size: file.size,
    mime_type: file.type,
  };
}

/**
 * Get signed file URL from workspace_file_id (bigint)
 * For private buckets, returns a signed URL valid for the specified duration
 */
export async function getFileUrl(
  workspaceFileId: number,
  expiresIn: number = 3600
): Promise<string | null> {
  const { data, error } = await supabase
    .from('workspace_files')
    .select('file_path')
    .eq('id', workspaceFileId)
    .single();

  if (error || !data) {
    console.warn('File not found in database:', error);
    return null;
  }

  // Create signed URL for private bucket
  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from(WORKSPACE_FILES_BUCKET)
    .createSignedUrl(data.file_path, expiresIn);

  if (signedUrlError || !signedUrlData) {
    console.warn('Error creating signed URL:', signedUrlError);
    return null;
  }

  return signedUrlData.signedUrl;
}

/**
 * Get signed URL from file path (used by MessageFiles component)
 */
export async function getFileSignedUrl(
  filePath: string,
  expiresIn: number = 3600
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(WORKSPACE_FILES_BUCKET)
    .createSignedUrl(filePath, expiresIn);

  if (error || !data) {
    console.warn('Error creating signed URL:', error);
    return null;
  }

  return data.signedUrl;
}

/**
 * Link files to a message
 */
export async function linkFilesToMessage(
  messageId: number,
  workspaceFileIds: number[]
): Promise<void> {
  if (workspaceFileIds.length === 0) return;

  const rows = workspaceFileIds.map(workspaceFileId => ({
    message_id: messageId,
    workspace_file_id: workspaceFileId,
  }));

  const { error } = await supabase.from('workspace_message_files').insert(rows);

  if (error) throw error;
}

/**
 * Get all files for a workspace
 */
export async function getWorkspaceFiles(
  workspaceId: number,
  limit: number = 50
): Promise<WorkspaceFile[]> {
  const { data, error } = await supabase
    .from('workspace_files')
    .select(
      'id, original_file_name, file_path, file_size, mime_type, created_at'
    )
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  // Map the typo field name to correct one
  return (data || []).map(file => ({
    id: file.id,
    original_filename: file.original_file_name,
    file_path: file.file_path,
    file_size: file.file_size,
    mime_type: file.mime_type,
    created_at: file.created_at,
  }));
}

/**
 * Delete a workspace file
 */
export async function deleteWorkspaceFile(
  workspaceFileId: number
): Promise<void> {
  // First, get the file path from the database
  const { data: fileData, error: fetchError } = await supabase
    .from('workspace_files')
    .select('file_path')
    .eq('id', workspaceFileId)
    .single();

  if (fetchError) {
    console.warn('Error fetching file for deletion:', fetchError);
  }

  // Delete from storage if we have the path
  if (fileData?.file_path) {
    const { error: storageError } = await supabase.storage
      .from(WORKSPACE_FILES_BUCKET)
      .remove([fileData.file_path]);

    if (storageError) {
      console.warn('Error deleting file from storage:', storageError);
    }
  }

  // Delete from workspace_files table (CASCADE will handle workspace_message_files)
  const { error: dbError } = await supabase
    .from('workspace_files')
    .delete()
    .eq('id', workspaceFileId);

  if (dbError) {
    console.warn('Error deleting file from database:', dbError);
  }
}

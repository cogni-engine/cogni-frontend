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

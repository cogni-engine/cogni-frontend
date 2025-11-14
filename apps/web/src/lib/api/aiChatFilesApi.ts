import { createClient } from '@/lib/supabase/browserClient';
import type { UploadedFile } from '@/lib/api/workspaceFilesApi';
import Cookies from 'js-cookie';

const supabase = createClient();
const WORKSPACE_FILES_BUCKET = 'workspace-files';

/**
 * Upload a file for AI chat (reusing workspace-files bucket)
 * Path structure: ai-chat/{thread_id}/uploads/{uuid}/{filename}
 */
export async function uploadAIChatFile(
  threadId: number,
  file: File
): Promise<UploadedFile> {
  // Get workspace ID from cookie
  const personalWorkspaceId = Cookies.get('personal_workspace_id');
  if (!personalWorkspaceId) {
    throw new Error('Personal workspace ID not found in cookies');
  }

  const workspaceId = parseInt(personalWorkspaceId, 10);

  // Generate a UUID for the storage path
  const storageUuid = crypto.randomUUID();
  const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

  // Storage path: {workspace_id}/ai-chat/{thread_id}/uploads/{uuid}/{filename}
  // This matches workspace-files pattern but organized under ai-chat subdirectory
  const filePath = `${workspaceId}/ai-chat/${threadId}/uploads/${storageUuid}/${sanitizedFilename}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from(WORKSPACE_FILES_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) throw uploadError;

  // Insert file metadata into workspace_files table
  const { data: fileData, error: dbError } = await supabase
    .from('workspace_files')
    .insert({
      orginal_file_name: file.name,
      file_path: filePath,
      mime_type: file.type,
      file_size: file.size,
      workspace_id: workspaceId, // Use personal workspace ID from cookie
    })
    .select()
    .single();

  if (dbError) throw dbError;

  // Generate signed URL
  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from(WORKSPACE_FILES_BUCKET)
    .createSignedUrl(filePath, 3600);

  if (signedUrlError) {
    console.warn('Error creating signed URL:', signedUrlError);
  }

  return {
    id: fileData.id,
    file_path: filePath,
    url: signedUrlData?.signedUrl || '',
    original_filename: file.name,
    file_size: file.size,
    mime_type: file.type,
  };
}


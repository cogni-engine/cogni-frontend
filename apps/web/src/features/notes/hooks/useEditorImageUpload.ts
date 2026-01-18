import { useRef, useState } from 'react';
import { Editor } from '@tiptap/react';
import { uploadWorkspaceFile } from '@/lib/api/workspaceFilesApi';
import { useNativeImagePicker } from '@/hooks/useNativeImagePicker';

interface UseEditorImageUploadProps {
  editor: Editor | null;
  workspaceId: number | undefined;
}

export function useEditorImageUpload({
  editor,
  workspaceId,
}: UseEditorImageUploadProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { isNativeAvailable, pickImage } = useNativeImagePicker();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor || !workspaceId) return;

    // Validate it's an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      e.target.value = '';
      return;
    }

    setUploadingImage(true);
    try {
      // Upload to workspace storage
      const uploaded = await uploadWorkspaceFile(workspaceId, file);

      // Insert image into editor at current cursor position
      // Store file ID in data attribute for later URL refresh
      const { state, view } = editor;
      const { from } = state.selection;

      // Insert image with all attributes including data-file-id
      const imageNode = state.schema.nodes.image.create({
        src: uploaded.url,
        alt: uploaded.original_filename,
        'data-file-id': uploaded.id.toString(),
      });

      const tr = state.tr.insert(from, imageNode);
      view.dispatch(tr);
      editor.commands.focus();

      // Reset input
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const triggerImageInput = async () => {
    // Use native picker if available (mobile webview)
    if (isNativeAvailable) {
      if (!editor || !workspaceId) return;

      setUploadingImage(true);
      try {
        const result = await pickImage({
          quality: 0.8,
          multiple: false,
        });

        const file = Array.isArray(result) ? result[0] : result;

        // Validate it's an image
        if (!file.type.startsWith('image/')) {
          alert('Please select an image file');
          return;
        }

        // Upload to workspace storage
        const uploaded = await uploadWorkspaceFile(workspaceId, file);

        // Insert image into editor at current cursor position
        const { state, view } = editor;
        const { from } = state.selection;

        // Insert image with all attributes including data-file-id
        const imageNode = state.schema.nodes.image.create({
          src: uploaded.url,
          alt: uploaded.original_filename,
          'data-file-id': uploaded.id.toString(),
        });

        const tr = state.tr.insert(from, imageNode);
        view.dispatch(tr);
        editor.commands.focus();
      } catch (error) {
        console.error('Error uploading image:', error);
        // User probably canceled, no need to show alert
      } finally {
        setUploadingImage(false);
      }
    } else {
      // Fallback to file input
      imageInputRef.current?.click();
    }
  };

  return {
    imageInputRef,
    uploadingImage,
    handleImageUpload,
    triggerImageInput,
    isNativeAvailable,
  };
}

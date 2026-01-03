import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import TiptapChatInput, { TiptapChatInputRef } from './TiptapChatInput';
import FileUploadMenu from './FileUploadMenu';
import FileUploadPreview from './FileUploadPreview';
import { uploadAIChatFile } from '@/lib/api/aiChatFilesApi';
import { type UploadedFile } from '@/lib/api/workspaceFilesApi';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';

export type FileUploadItem = {
  file: File;
  id: string;
  preview?: string;
  uploaded?: UploadedFile;
  uploading: boolean;
  progress: number;
  error?: string;
};

type AiChatInputProps = {
  onSend: (
    content: string,
    files?: UploadedFile[],
    mentionedMemberIds?: number[],
    mentionedNoteIds?: number[]
  ) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  canStop?: boolean;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
};

export type AiChatInputRef = {
  focus: () => void;
  clearContent: () => void;
};

const AiChatInput = forwardRef<AiChatInputRef, AiChatInputProps>(
  function AiChatInput(
    {
      onSend,
      onStop,
      isLoading = false,
      placeholder = 'Ask anything',
      canStop = true,
      workspaceMembers = [],
      workspaceNotes = [],
    },
    ref
  ) {
    const inputRef = useRef<TiptapChatInputRef | null>(null);
    const [uploadItems, setUploadItems] = useState<FileUploadItem[]>([]);

    const hasAttachments = uploadItems.length > 0;

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      clearContent: () => {
        inputRef.current?.clearContent();
      },
    }));

    const handleFilesSelected = useCallback((files: File[]) => {
      const newItems: FileUploadItem[] = files.map(file => {
        const id = `${Date.now()}-${Math.random()}`;
        const isImage = file.type.startsWith('image/');
        let preview: string | undefined;

        if (isImage) {
          preview = URL.createObjectURL(file);
        }

        return {
          file,
          id,
          preview,
          uploading: true, // Start in uploading state
          progress: 0,
        };
      });

      setUploadItems(prev => {
        const combined = [...prev, ...newItems];
        // Limit to 4 files
        return combined.slice(0, 4);
      });

      // Upload files immediately
      newItems.forEach(async item => {
        try {
          const uploaded = await uploadAIChatFile(item.file);
          setUploadItems(prev =>
            prev.map(entry =>
              entry.id === item.id
                ? { ...entry, uploaded, uploading: false }
                : entry
            )
          );
        } catch (error) {
          console.error('Error uploading file:', error);
          const errorMessage =
            error instanceof Error ? error.message : 'Upload failed';
          setUploadItems(prev =>
            prev.map(entry =>
              entry.id === item.id
                ? { ...entry, error: errorMessage, uploading: false }
                : entry
            )
          );
        }
      });
    }, []);

    const handleRemoveFile = useCallback((id: string) => {
      setUploadItems(prev => {
        const item = prev.find(entry => entry.id === id);
        if (item?.preview) {
          URL.revokeObjectURL(item.preview);
        }
        return prev.filter(entry => entry.id !== id);
      });
    }, []);

    useEffect(() => {
      return () => {
        uploadItems.forEach(item => {
          if (item.preview) {
            URL.revokeObjectURL(item.preview);
          }
        });
      };
    }, [uploadItems]);

    // Check if any files are still uploading
    const hasUploadingFiles = uploadItems.some(item => item.uploading);

    const handleSend = useCallback(
      async (
        content: string,
        mentionedMemberIds: number[],
        mentionedNoteIds: number[]
      ) => {
        if (isLoading || hasUploadingFiles) return;

        const trimmed = content.trim();
        const hasText = trimmed.length > 0;

        if (!hasText && uploadItems.length === 0) return;

        // Check if any uploads failed
        const failedUploads = uploadItems.filter(item => item.error);
        if (failedUploads.length > 0) {
          alert(
            'Some files failed to upload. Please remove them and try again.'
          );
          return;
        }

        // Get all successfully uploaded files
        const uploadedFiles = uploadItems
          .filter(item => item.uploaded)
          .map(item => item.uploaded!);

        onSend(
          trimmed || '',
          uploadedFiles.length > 0 ? uploadedFiles : undefined,
          mentionedMemberIds,
          mentionedNoteIds
        );

        // Clear upload items
        setUploadItems(prev => {
          prev.forEach(item => {
            if (item.preview) {
              URL.revokeObjectURL(item.preview);
            }
          });
          return [];
        });
      },
      [isLoading, hasUploadingFiles, onSend, uploadItems]
    );

    return (
      <div className='relative z-100 rounded-t-3xl'>
        {/* Input UI */}
        <div className='px-4 md:px-6 py-2'>
          <div className='w-full md:max-w-7xl md:mx-auto'>
            <div className='relative'>
              {/* File Upload Menu - Plus button */}
              <div className='absolute left-0 bottom-0 z-100'>
                <FileUploadMenu
                  onFilesSelected={handleFilesSelected}
                  maxFiles={4}
                  disabled={
                    isLoading || hasUploadingFiles || uploadItems.length >= 4
                  }
                />
              </div>
              <TiptapChatInput
                ref={inputRef}
                placeholder={placeholder}
                onSend={handleSend}
                onStop={onStop}
                isLoading={isLoading}
                canStop={canStop}
                isUploading={hasUploadingFiles}
                hasAttachments={hasAttachments}
                workspaceMembers={workspaceMembers}
                workspaceNotes={workspaceNotes}
                topContent={
                  uploadItems.length > 0 ? (
                    <FileUploadPreview
                      files={uploadItems}
                      onRemove={handleRemoveFile}
                    />
                  ) : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default AiChatInput;

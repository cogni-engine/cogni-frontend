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
    fileIds?: number[],
    mentionedMemberIds?: number[],
    mentionedNoteIds?: number[]
  ) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  canStop?: boolean;
  threadId?: number | null;
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
      threadId,
      workspaceMembers = [],
      workspaceNotes = [],
    },
    ref
  ) {
    const inputRef = useRef<TiptapChatInputRef | null>(null);
    const [uploadItems, setUploadItems] = useState<FileUploadItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const hasAttachments = uploadItems.length > 0;

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      clearContent: () => {
        inputRef.current?.clearContent();
      },
    }));

    const handleFilesSelected = useCallback(
      (files: File[]) => {
        if (!threadId) return;

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
            uploading: false,
            progress: 0,
          };
        });

        setUploadItems(prev => {
          const combined = [...prev, ...newItems];
          // Limit to 4 files
          return combined.slice(0, 4);
        });
      },
      [threadId]
    );

    const handleRemoveFile = useCallback((id: string) => {
      setUploadItems(prev => {
        const item = prev.find(entry => entry.id === id);
        if (item?.preview) {
          URL.revokeObjectURL(item.preview);
        }
        return prev.filter(entry => entry.id !== id);
      });
    }, []);

    const handleUploadComplete = useCallback(
      (id: string, uploadedFile: UploadedFile) => {
        setUploadItems(prev =>
          prev.map(item =>
            item.id === id ? { ...item, uploaded: uploadedFile } : item
          )
        );
      },
      []
    );

    const handleUploadError = useCallback((id: string, error: string) => {
      setUploadItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, error, uploading: false } : item
        )
      );
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

    const handleSend = useCallback(
      async (
        content: string,
        mentionedMemberIds: number[],
        mentionedNoteIds: number[]
      ) => {
        if (isLoading || isUploading) return;

        const trimmed = content.trim();
        const hasText = trimmed.length > 0;

        if (!hasText && uploadItems.length === 0) return;

        let fileIds: number[] = [];

        if (uploadItems.length > 0 && threadId) {
          setIsUploading(true);
          try {
            const uploadPromises = uploadItems.map(async item => {
              if (item.uploaded) {
                return item.uploaded.id;
              }

              const uploaded = await uploadAIChatFile(threadId, item.file);
              return uploaded.id;
            });

            fileIds = await Promise.all(uploadPromises);
          } catch (error) {
            console.error('Error uploading files:', error);
            alert('Failed to upload files. Please try again.');
            setIsUploading(false);
            return;
          }
          setIsUploading(false);
        }

        onSend(
          trimmed || '',
          fileIds.length ? fileIds : undefined,
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
      [isLoading, isUploading, onSend, uploadItems, threadId]
    );

    return (
      <div className='relative z-100 rounded-t-3xl'>
        {/* File Upload Preview */}
        {threadId && uploadItems.length > 0 && (
          <FileUploadPreview
            files={uploadItems}
            workspaceId={threadId}
            onRemove={handleRemoveFile}
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
          />
        )}
        {/* Input UI */}
        <div className='px-4 md:px-6 py-2'>
          <div className='w-full md:max-w-4xl md:mx-auto'>
            <div className='relative'>
              {/* File Upload Menu - Plus button */}
              {threadId && (
                <div className='absolute left-0 z-100'>
                  <FileUploadMenu
                    onFilesSelected={handleFilesSelected}
                    maxFiles={4}
                    disabled={
                      isLoading || isUploading || uploadItems.length >= 4
                    }
                  />
                </div>
              )}
              <TiptapChatInput
                ref={inputRef}
                placeholder={placeholder}
                onSend={handleSend}
                onStop={onStop}
                isLoading={isLoading}
                canStop={canStop}
                isUploading={isUploading}
                hasAttachments={hasAttachments}
                workspaceMembers={workspaceMembers}
                workspaceNotes={workspaceNotes}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default AiChatInput;

'use client';

import { Message, AIMessage } from '@/types/chat';
import AiAugmentedInput from './AiAugmentedInput';
import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import FileUploadMenu from './FileUploadMenu';
import FileUploadPreview, { type FileUploadItem } from './FileUploadPreview';
import {
  uploadWorkspaceFile,
  type UploadedFile,
} from '@/lib/api/workspaceFilesApi';
import { ReplyIndicator } from './ReplyIndicator';

type ChatInputProps = {
  messages?: Message[] | AIMessage[] | unknown[];
  onSend: (content: string, workspaceFileIds?: number[]) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  canStop?: boolean;
  ai_augmented_input?: boolean;
  replyingTo?: { id: number; text: string; authorName?: string } | null;
  onCancelReply?: () => void;
  workspaceId?: number;
};

export type ChatInputRef = {
  focus: () => void;
};

const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(function ChatInput(
  {
    onSend,
    onStop,
    isLoading = false,
    placeholder = 'Ask anything',
    canStop = true,
    ai_augmented_input = true,
    replyingTo,
    onCancelReply,
    workspaceId,
  },
  ref
) {
  const inputRef = useRef<{ focus: () => void } | null>(null);
  const [uploadItems, setUploadItems] = useState<FileUploadItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const hasAttachments = uploadItems.length > 0;

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));

  // Focus input when replying
  useEffect(() => {
    if (replyingTo) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [replyingTo]);

  const handleFilesSelected = useCallback(
    (files: File[]) => {
      if (!workspaceId) return;

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
    [workspaceId]
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
    async (content: string) => {
      if (isLoading || isUploading) return;

      // Allow sending if there's text or files
      const trimmed = content.trim();
      const hasText = trimmed.length > 0;

      if (!hasText && uploadItems.length === 0) return;

      let workspaceFileIds: number[] = [];

      if (uploadItems.length > 0 && workspaceId) {
        setIsUploading(true);
        try {
          const uploadPromises = uploadItems.map(async item => {
            if (item.uploaded) {
              return item.uploaded.id;
            }

            const uploaded = await uploadWorkspaceFile(workspaceId, item.file);
            return uploaded.id;
          });

          workspaceFileIds = await Promise.all(uploadPromises);
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
        workspaceFileIds.length ? workspaceFileIds : undefined
      );

      setUploadItems(prev => {
        prev.forEach(item => {
          if (item.preview) {
            URL.revokeObjectURL(item.preview);
          }
        });
        return [];
      });
    },
    [isLoading, isUploading, onSend, uploadItems, workspaceId]
  );

  return (
    <div className='bg-gradient-to-br from-slate-950 via-black to-slate-950 relative z-10 rounded-t-3xl'>
      {/* Reply indicator - absolutely positioned above input */}
      {replyingTo && (
        <div className='absolute bottom-full left-0 right-0 px-4 md:px-8 pb-2 pointer-events-auto'>
          <ReplyIndicator
            replyingTo={replyingTo}
            onCancelReply={onCancelReply}
          />
        </div>
      )}
      {/* File Upload Preview */}
      {workspaceId && uploadItems.length > 0 && (
        <FileUploadPreview
          files={uploadItems}
          workspaceId={workspaceId}
          onRemove={handleRemoveFile}
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
        />
      )}
      {/* 入力UI */}
      <div className='px-2 md:px-6 pt-2'>
        <div className='w-full md:max-w-4xl md:mx-auto'>
          <div className='relative'>
            {/* File Upload Menu - Plus button */}
            {workspaceId && (
              <div className='absolute left-0 z-10'>
                <FileUploadMenu
                  onFilesSelected={handleFilesSelected}
                  maxFiles={4}
                  disabled={isLoading || isUploading || uploadItems.length >= 4}
                />
              </div>
            )}
            <AiAugmentedInput
              ref={inputRef}
              placeholder={placeholder}
              onSend={handleSend}
              onStop={onStop}
              isLoading={isLoading}
              canStop={canStop}
              disableCopilot={!ai_augmented_input}
              isUploading={isUploading}
              hasAttachments={hasAttachments}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ChatInput;

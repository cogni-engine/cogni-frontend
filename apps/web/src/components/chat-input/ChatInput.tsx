'use client';

import TiptapChatInput from './TiptapChatInput';
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
import { uploadWorkspaceFile } from '@/lib/api/workspaceFilesApi';
import { ReplyIndicator } from './ReplyIndicator';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';

type ChatInputProps = {
  onSend: (
    content: string,
    workspaceFileIds?: number[],
    mentionedMemberIds?: number[],
    mentionedNoteIds?: number[]
  ) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  canStop?: boolean;
  replyingTo?: { id: number; text: string; authorName?: string } | null;
  onCancelReply: () => void;
  workspaceId?: number;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
};

export type ChatInputRef = {
  focus: () => void;
  clearContent: () => void;
};

const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(function ChatInput(
  {
    onSend,
    onStop,
    isLoading = false,
    placeholder = 'Ask anything',
    canStop = true,
    replyingTo,
    onCancelReply,
    workspaceId,
    workspaceMembers = [],
    workspaceNotes = [],
  },
  ref
) {
  const inputRef = useRef<{
    focus: () => void;
    clearContent: () => void;
  } | null>(null);
  const [uploadItems, setUploadItems] = useState<FileUploadItem[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const hasAttachments = uploadItems.length > 0;
  const hasUploadingFiles = uploadItems.some(item => item.uploading);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    clearContent: () => {
      inputRef.current?.clearContent();
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
          const uploaded = await uploadWorkspaceFile(workspaceId, item.file);
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
      mentionedMemberIds?: number[],
      mentionedNoteIds?: number[]
    ) => {
      if (isLoading || hasUploadingFiles) return;

      // Allow sending if there's text or files
      const trimmed = content.trim();
      const hasText = trimmed.length > 0;

      if (!hasText && uploadItems.length === 0) return;

      // Check if any uploads failed
      const failedUploads = uploadItems.filter(item => item.error);
      if (failedUploads.length > 0) {
        alert('Some files failed to upload. Please remove them and try again.');
        return;
      }

      // Get all successfully uploaded file IDs
      const workspaceFileIds = uploadItems
        .filter(item => item.uploaded)
        .map(item => item.uploaded!.id);

      onSend(
        trimmed || '',
        workspaceFileIds.length > 0 ? workspaceFileIds : undefined,
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

  const topContent = () => {
    return (
      <div>
        {replyingTo && (
          <ReplyIndicator
            replyingTo={replyingTo}
            onCancelReply={onCancelReply}
          />
        )}
        {workspaceId && uploadItems.length > 0 && (
          <FileUploadPreview files={uploadItems} onRemove={handleRemoveFile} />
        )}
      </div>
    );
  };

  return (
    <div className='rounded-t-3xl' data-shepherd-target='chat-input'>
      {/* Reply indicator - absolutely positioned above input */}
      {/* 入力UI */}
      <div
        className={`py-2 transition-[padding] duration-300 ease-out ${isInputFocused ? 'px-0' : 'px-2'} md:px-6`}
      >
        <div className='w-full md:max-w-7xl md:mx-auto flex gap-2 items-center'>
          {/* File Upload Menu - Plus button */}
          {workspaceId && (
            <div>
              <FileUploadMenu
                onFilesSelected={handleFilesSelected}
                maxFiles={4}
                disabled={
                  isLoading || hasUploadingFiles || uploadItems.length >= 4
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
            isUploading={hasUploadingFiles}
            hasAttachments={hasAttachments}
            workspaceMembers={workspaceMembers}
            workspaceNotes={workspaceNotes}
            onFocusChange={setIsInputFocused}
            topContent={topContent()}
          />
        </div>
      </div>
    </div>
  );
});

export default ChatInput;

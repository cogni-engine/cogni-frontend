'use client';

import {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { ArrowUp, Square } from 'lucide-react';
import { VoiceInputButton } from '../VoiceInputButton';
import { useUI } from '@/contexts/UIContext';
import FileUploadMenu from '../FileUploadMenu';
import FileUploadPreview, { type FileUploadItem } from '../FileUploadPreview';
import {
  uploadWorkspaceFile,
  type UploadedFile,
} from '@/lib/api/workspaceFilesApi';

type TextInputProps = {
  onSend: (text: string, workspaceFileIds?: number[]) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  canStop?: boolean;
  workspaceId?: number;
};

export type FreeTextInputRef = {
  focus: () => void;
};

const FreeTextInput = forwardRef<FreeTextInputRef, TextInputProps>(
  function FreeTextInput(
    {
      onSend,
      onStop,
      isLoading = false,
      placeholder = 'メッセージを入力...',
      canStop = true,
      workspaceId,
    },
    ref
  ) {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [uploadItems, setUploadItems] = useState<FileUploadItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { setInputActive } = useUI();

    useImperativeHandle(ref, () => ({
      focus: () => {
        textareaRef.current?.focus();
      },
    }));

    const maxRows = 7;

    const adjustHeight = (el: HTMLTextAreaElement | null) => {
      if (!el || !(el instanceof HTMLElement)) return;

      // 一旦リセットしてからscrollHeightを測る
      el.style.height = 'auto';
      const computed = window.getComputedStyle(el);
      const lineHeight = parseFloat(computed.lineHeight || '20');
      const maxHeight = lineHeight * maxRows;
      const nextHeight = Math.min(el.scrollHeight, maxHeight);
      el.style.height = `${nextHeight}px`;
      // 7行以上はスクロール
      el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
    };

    // 入力中かどうかを検知してUIContextを更新（フォーカスまたは入力値がある場合）
    useEffect(() => {
      setInputActive(isFocused || input.trim().length > 0);
    }, [isFocused, input, setInputActive]);

    const handleSend = async () => {
      if (isLoading || isUploading) return;

      // Allow sending if there's text or files
      const hasText = input.trim().length > 0;
      const hasFiles = uploadItems.length > 0;

      if (!hasText && !hasFiles) return;

      // Upload files first if any
      let workspaceFileIds: number[] = [];
      if (uploadItems.length > 0 && workspaceId) {
        setIsUploading(true);
        try {
          const uploadPromises = uploadItems.map(async item => {
            if (item.uploaded) {
              return item.uploaded.id;
            }
            // Upload file (creates entry in workspace_files and returns id)
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

      // Send message with workspace file IDs
      onSend(
        input.trim() || '',
        workspaceFileIds.length > 0 ? workspaceFileIds : undefined
      );

      // Clear input and files
      setInput('');
      setUploadItems([]);

      // 高さをリセット（1行表示に戻す）
      if (textareaRef.current) {
        textareaRef.current.style.height = '';
        textareaRef.current.style.overflowY = 'hidden';
      }
    };

    const handleStop = () => {
      if (onStop && isLoading) {
        onStop();
      }
    };

    // Unified change handler that updates input and adjusts height
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      // Adjust height after state update
      requestAnimationFrame(() => {
        adjustHeight(textareaRef.current);
      });
    };

    // Unified keydown handler (accepts any keyboard event since CopilotTextarea may wrap it)
    const handleKeyDown = (e: React.KeyboardEvent) => {
      // Shift+Enter: 改行（デフォルト動作を許可）
      if (e.key === 'Enter' && e.shiftKey) {
        return; // デフォルト動作（改行）を許可
      }

      // Enter (without Shift)
      if (e.key === 'Enter' && !e.shiftKey) {
        // 入力中の場合は送信しない（IME確定用のEnter）
        if (e.nativeEvent.isComposing) {
          return; // デフォルト動作（IME確定）を許可
        }

        // Enterで送信
        e.preventDefault();
        handleSend();
      }
    };

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
        const item = prev.find(item => item.id === id);
        // Clean up preview URL
        if (item?.preview) {
          URL.revokeObjectURL(item.preview);
        }
        return prev.filter(item => item.id !== id);
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

    // Cleanup preview URLs on unmount
    useEffect(() => {
      return () => {
        uploadItems.forEach(item => {
          if (item.preview) {
            URL.revokeObjectURL(item.preview);
          }
        });
      };
    }, [uploadItems]);

    return (
      <div className='relative'>
        {/* File Upload Menu - Plus button */}
        {workspaceId && (
          <FileUploadMenu
            onFilesSelected={handleFilesSelected}
            maxFiles={4}
            disabled={isLoading || isUploading || uploadItems.length >= 4}
          />
        )}
        <div className='flex-1 relative ml-[55px]'>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            autoFocus
            disabled={isLoading}
            rows={1}
            className='w-full bg-white/8 backdrop-blur-xl text-white px-5 py-3.5 pr-[140px] rounded-4xl border border-black focus:outline-none resize-none shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] focus:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-y-auto'
          />
          {/* マイクボタン - 送信ボタンの左 */}
          <div className='absolute right-[50px] bottom-2.5 z-10'>
            <VoiceInputButton
              onTranscriptChange={text => setInput(text)}
              currentText={input}
              disabled={isLoading}
              className='w-11 h-11 rounded-full bg-transparent border-0 text-white hover:scale-102 transition-all duration-300'
            />
          </div>
          {/* 送信ボタン / 停止ボタン */}
          <button
            onClick={isLoading && canStop ? handleStop : handleSend}
            disabled={
              isLoading ||
              isUploading ||
              (!input.trim() && uploadItems.length === 0)
            }
            className='absolute right-2.5 bottom-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-black text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/15 hover:scale-102 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]'
          >
            {isLoading && canStop ? (
              <Square className='w-4 h-4 fill-current' />
            ) : (
              <ArrowUp className='w-4 h-4' />
            )}
          </button>
        </div>
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
      </div>
    );
  }
);

export default FreeTextInput;

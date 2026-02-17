'use client';

import Image from 'next/image';
import { X, File as FileIcon, Loader2 } from 'lucide-react';
import { type UploadedFile } from '@/lib/api/workspaceFilesApi';

export interface FileUploadItem {
  file: File;
  id: string;
  preview?: string;
  uploaded?: UploadedFile;
  error?: string;
  uploading: boolean;
  progress: number;
}

type FileUploadPreviewProps = {
  files: FileUploadItem[];
  onRemove: (id: string) => void;
};

export default function FileUploadPreview({
  files,
  onRemove,
}: FileUploadPreviewProps) {
  if (files.length === 0) return null;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const isImage = (mimeType: string): boolean => {
    return mimeType.startsWith('image/');
  };

  return (
    <div className='px-3 pt-3 pb-1'>
      <div className='flex flex-wrap gap-2'>
        {files.map(item => {
          const isImg = isImage(item.file.type);
          const hasError = !!item.error;
          const isUploading = item.uploading;

          return (
            <div
              key={item.id}
              className='relative group bg-surface-primary dark:backdrop-blur-xl border border-border-default rounded-xl overflow-hidden'
            >
              {/* Remove button */}
              {!isUploading && (
                <button
                  type='button'
                  onClick={() => onRemove(item.id)}
                  className='absolute top-1 right-1 z-100 w-6 h-6 rounded-full bg-dialog-overlay hover:bg-dropdown-bg dark:backdrop-blur-sm flex items-center justify-center transition-all'
                  aria-label='Remove file'
                >
                  <X className='w-3 h-3 text-text-primary' />
                </button>
              )}

              {/* Preview */}
              <div className='w-20 h-12 relative'>
                {isImg && item.preview ? (
                  <Image
                    src={item.preview}
                    alt={item.file.name}
                    fill
                    sizes='80px'
                    className='object-cover'
                    unoptimized
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center bg-surface-primary'>
                    <FileIcon className='w-8 h-8 text-text-muted' />
                  </div>
                )}

                {/* Upload progress overlay */}
                {isUploading && (
                  <div className='absolute inset-0 bg-dialog-overlay flex items-center justify-center'>
                    <Loader2 className='w-5 h-5 text-text-primary animate-spin' />
                  </div>
                )}

                {/* Error overlay */}
                {hasError && (
                  <div className='absolute inset-0 bg-red-900/50 flex items-center justify-center'>
                    <X className='w-5 h-5 text-red-200' />
                  </div>
                )}

                {/* Progress bar */}
                {isUploading && (
                  <div className='absolute bottom-0 left-0 right-0 h-1 bg-background/30'>
                    <div
                      className='h-full bg-text-secondary transition-all duration-300'
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* File name */}
              <div className='px-2 py-1 max-w-[80px]'>
                <p
                  className='text-xs text-text-secondary truncate'
                  title={item.file.name}
                >
                  {item.file.name}
                </p>
                <p className='text-xs text-text-muted'>
                  {formatFileSize(item.file.size)}
                </p>
              </div>

              {/* Error message */}
              {hasError && (
                <div className='px-2 pb-1'>
                  <p
                    className='text-xs text-red-600 dark:text-red-300 truncate'
                    title={item.error}
                  >
                    {item.error}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

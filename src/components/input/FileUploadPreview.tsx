'use client';

import { useState, useEffect } from 'react';
import { X, Image as ImageIcon, File as FileIcon, Loader2 } from 'lucide-react';
import {
  uploadWorkspaceFile,
  type UploadedFile,
} from '@/lib/api/workspaceFilesApi';

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
  workspaceId: number;
  onRemove: (id: string) => void;
  onUploadComplete: (id: string, uploadedFile: UploadedFile) => void;
  onUploadError: (id: string, error: string) => void;
};

export default function FileUploadPreview({
  files,
  workspaceId,
  onRemove,
  onUploadComplete,
  onUploadError,
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
    <div className='px-2 md:px-6 pb-2'>
      <div className='flex flex-wrap gap-2'>
        {files.map(item => {
          const isImg = isImage(item.file.type);
          const hasError = !!item.error;
          const isUploading = item.uploading;
          const isComplete = !!item.uploaded;

          return (
            <div
              key={item.id}
              className='relative group bg-white/8 backdrop-blur-xl border border-black rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]'
            >
              {/* Remove button */}
              {!isUploading && (
                <button
                  type='button'
                  onClick={() => onRemove(item.id)}
                  className='absolute top-1 right-1 z-10 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100'
                  aria-label='Remove file'
                >
                  <X className='w-3 h-3 text-white' />
                </button>
              )}

              {/* Preview */}
              <div className='w-20 h-20 relative'>
                {isImg && item.preview ? (
                  <img
                    src={item.preview}
                    alt={item.file.name}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center bg-white/5'>
                    <FileIcon className='w-8 h-8 text-white/40' />
                  </div>
                )}

                {/* Upload progress overlay */}
                {isUploading && (
                  <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                    <Loader2 className='w-5 h-5 text-white animate-spin' />
                  </div>
                )}

                {/* Error overlay */}
                {hasError && (
                  <div className='absolute inset-0 bg-red-900/50 flex items-center justify-center'>
                    <X className='w-5 h-5 text-red-200' />
                  </div>
                )}

                {/* Success indicator */}
                {isComplete && (
                  <div className='absolute inset-0 bg-green-900/30 flex items-center justify-center'>
                    <div className='w-3 h-3 rounded-full bg-green-500' />
                  </div>
                )}

                {/* Progress bar */}
                {isUploading && (
                  <div className='absolute bottom-0 left-0 right-0 h-1 bg-black/30'>
                    <div
                      className='h-full bg-white/60 transition-all duration-300'
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* File name */}
              <div className='px-2 py-1 max-w-[80px]'>
                <p
                  className='text-xs text-white/80 truncate'
                  title={item.file.name}
                >
                  {item.file.name}
                </p>
                <p className='text-xs text-white/40'>
                  {formatFileSize(item.file.size)}
                </p>
              </div>

              {/* Error message */}
              {hasError && (
                <div className='px-2 pb-1'>
                  <p
                    className='text-xs text-red-300 truncate'
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

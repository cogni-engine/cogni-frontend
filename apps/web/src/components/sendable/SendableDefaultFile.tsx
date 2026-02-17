'use client';

import {
  File as FileIcon,
  Download,
  Music,
  Video,
  FileText,
  FileCode,
  Archive,
  Image as ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

export type SendableDefaultFileProps = {
  filename: string;
  fileSize: number;
  mimeType?: string;
  onClick?: () => void;
  onDownload?: () => void;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const getFileIcon = (mimeType?: string) => {
  if (!mimeType) return FileIcon;

  if (mimeType.startsWith('audio/')) return Music;
  if (mimeType.startsWith('video/')) return Video;
  if (mimeType.startsWith('image/')) return ImageIcon;
  if (
    mimeType.includes('pdf') ||
    mimeType.includes('word') ||
    mimeType.includes('document')
  )
    return FileText;
  if (
    mimeType.includes('javascript') ||
    mimeType.includes('typescript') ||
    mimeType.includes('html') ||
    mimeType.includes('css') ||
    mimeType.includes('json')
  )
    return FileCode;
  if (
    mimeType.includes('zip') ||
    mimeType.includes('tar') ||
    mimeType.includes('rar') ||
    mimeType.includes('7z')
  )
    return Archive;

  return FileIcon;
};

export default function SendableDefaultFile({
  filename,
  fileSize,
  mimeType,
  onClick,
  onDownload,
}: SendableDefaultFileProps) {
  const Icon = useMemo(() => getFileIcon(mimeType), [mimeType]);

  return (
    <div
      className='relative group overflow-hidden cursor-pointer'
      onClick={onClick}
    >
      <div
        className={cn(
          'flex items-center gap-2',
          'bg-surface-secondary dark:backdrop-blur-xl border border-border-default rounded-3xl',
          'px-4 py-2.5',
          'shadow-card',
          'hover:bg-interactive-hover transition-all',
          'min-w-0 max-w-72 md:max-w-128'
        )}
      >
        <Icon className='w-5 h-5 text-text-secondary flex-shrink-0' />
        <div className='flex-1 min-w-0 overflow-hidden'>
          <p className='text-sm text-text-primary truncate' title={filename}>
            {filename}
          </p>
          <p className='text-xs text-text-muted truncate'>
            {formatFileSize(fileSize)}
          </p>
        </div>
        {onDownload && (
          <button
            onClick={e => {
              e.stopPropagation();
              onDownload();
            }}
            className='ml-2 p-1.5 rounded-md hover:bg-interactive-hover transition-colors flex-shrink-0'
            aria-label='Download file'
          >
            <Download className='w-4 h-4 text-text-secondary' />
          </button>
        )}
      </div>
    </div>
  );
}

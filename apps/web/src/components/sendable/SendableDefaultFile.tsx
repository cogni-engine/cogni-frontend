'use client';

import { File as FileIcon, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SendableDefaultFileProps = {
  filename: string;
  fileSize: number;
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

export default function SendableDefaultFile({
  filename,
  fileSize,
  onClick,
  onDownload,
}: SendableDefaultFileProps) {
  return (
    <div
      className='relative group overflow-hidden cursor-pointer'
      onClick={onClick}
    >
      <div
        className={cn(
          'flex items-center gap-2',
          'bg-white/13 backdrop-blur-xl border border-black rounded-3xl',
          'px-4 py-2.5',
          'shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]',
          'hover:bg-white/16 transition-all',
          'min-w-0 max-w-72 md:max-w-128'
        )}
      >
        <FileIcon className='w-5 h-5 text-white/60 flex-shrink-0' />
        <div className='flex-1 min-w-0 overflow-hidden'>
          <p className='text-sm text-white truncate' title={filename}>
            {filename}
          </p>
          <p className='text-xs text-white/40 truncate'>
            {formatFileSize(fileSize)}
          </p>
        </div>
        {onDownload && (
          <button
            onClick={e => {
              e.stopPropagation();
              onDownload();
            }}
            className='ml-2 p-1.5 rounded-md hover:bg-white/10 transition-colors flex-shrink-0'
            aria-label='Download file'
          >
            <Download className='w-4 h-4 text-white/60' />
          </button>
        )}
      </div>
    </div>
  );
}

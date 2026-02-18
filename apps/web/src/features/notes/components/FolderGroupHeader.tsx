'use client';

import Image from 'next/image';
import { ChevronRight, ChevronDown, ChevronLeft } from 'lucide-react';

interface FolderGroupHeaderProps {
  folderName: string;
  isCollapsed: boolean;
  onToggle: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  iconUrl?: string | null;
}

export function FolderGroupHeader({
  folderName,
  isCollapsed,
  onToggle,
  showBackButton = false,
  onBack,
  iconUrl,
}: FolderGroupHeaderProps) {
  return (
    <div className='flex items-center justify-between mb-3 px-5 select-none'>
      <div className='flex items-center gap-2 flex-1'>
        {showBackButton && onBack && (
          <button
            onClick={e => {
              e.stopPropagation();
              onBack();
            }}
            className='p-1 hover:bg-interactive-hover rounded-lg transition-colors'
            aria-label='Go back'
          >
            <ChevronLeft className='w-4 h-4 text-foreground' />
          </button>
        )}
        <div
          className='flex items-center justify-between flex-1 cursor-pointer'
          onClick={onToggle}
          aria-label={isCollapsed ? 'Expand folder' : 'Collapse folder'}
        >
          <div className='flex items-center gap-2'>
            {iconUrl !== undefined &&
              (iconUrl ? (
                <Image
                  src={iconUrl}
                  alt={folderName}
                  width={20}
                  height={20}
                  className='w-5 h-5 rounded-md object-cover'
                />
              ) : (
                <div className='w-5 h-5 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] text-white/90 font-bold'>
                  {folderName.charAt(0).toUpperCase()}
                </div>
              ))}
            <h3 className='text-lg font-medium text-foreground'>
              {folderName}
            </h3>
          </div>
          <div className='text-text-muted hover:text-foreground transition-colors pointer-events-none'>
            {isCollapsed ? (
              <ChevronRight className='w-4 h-4' />
            ) : (
              <ChevronDown className='w-4 h-4' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

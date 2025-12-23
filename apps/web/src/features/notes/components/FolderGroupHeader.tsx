'use client';

import { ChevronRight, ChevronDown, ChevronLeft } from 'lucide-react';

interface FolderGroupHeaderProps {
  folderName: string;
  isCollapsed: boolean;
  onToggle: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function FolderGroupHeader({
  folderName,
  isCollapsed,
  onToggle,
  showBackButton = false,
  onBack,
}: FolderGroupHeaderProps) {
  return (
    <div className='flex items-center justify-between mb-3 px-3 select-none'>
      <div className='flex items-center gap-2 flex-1'>
        {showBackButton && onBack && (
          <button
            onClick={e => {
              e.stopPropagation();
              onBack();
            }}
            className='p-1 hover:bg-white/10 rounded-lg transition-colors'
            aria-label='Go back'
          >
            <ChevronLeft className='w-4 h-4 text-white' />
          </button>
        )}
        <div
          className='flex items-center justify-between flex-1 cursor-pointer'
          onClick={onToggle}
          aria-label={isCollapsed ? 'Expand folder' : 'Collapse folder'}
        >
          <h3 className='text-lg font-medium text-white'>{folderName}</h3>
          <div className='text-gray-400 hover:text-white transition-colors pointer-events-none'>
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

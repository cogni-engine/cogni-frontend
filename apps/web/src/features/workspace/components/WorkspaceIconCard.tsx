'use client';

import type { ChangeEvent, RefObject } from 'react';
import { Sparkles } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GlassButton from '@/components/glass-design/GlassButton';

import type { StatusMessage } from '@/features/users/utils/avatar';

type WorkspaceIconCardProps = {
  iconUrl?: string | null;
  iconAlt?: string;
  initials: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onUploadClick: () => void;
  onGenerateClick: () => void;
  savingIcon: boolean;
  generatingIcon: boolean;
  onRemove: () => void;
  removingIcon: boolean;
  removeDisabled: boolean;
  status: StatusMessage | null;
};

export function WorkspaceIconCard({
  iconUrl,
  iconAlt,
  initials,
  fileInputRef,
  onFileChange,
  onUploadClick,
  onGenerateClick,
  savingIcon,
  generatingIcon,
  onRemove,
  removingIcon,
  removeDisabled,
  status,
}: WorkspaceIconCardProps) {
  return (
    <div className='space-y-3'>
      <h2 className='text-sm font-medium text-white/60'>Icon</h2>
      <div className='flex items-center gap-4'>
        <Avatar className='h-16 w-16 border border-white/10'>
          {iconUrl ? (
            <AvatarImage src={iconUrl} alt={iconAlt ?? 'Workspace icon'} />
          ) : (
            <AvatarFallback className='text-lg text-white/60 bg-white/5'>
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
        <div className='flex flex-wrap gap-2'>
          <GlassButton
            type='button'
            onClick={onUploadClick}
            disabled={savingIcon || generatingIcon}
            className='py-2'
          >
            <span className='text-white/80 text-sm px-1'>
              {savingIcon ? 'Processing...' : 'Upload'}
            </span>
          </GlassButton>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={onFileChange}
          />
          <GlassButton
            type='button'
            onClick={onGenerateClick}
            disabled={savingIcon || generatingIcon}
            className='gap-2 py-2'
          >
            <Sparkles className='w-4 h-4 text-white/60' />
            <span className='text-white/80 text-sm'>
              {generatingIcon ? 'Generating...' : 'Generate'}
            </span>
          </GlassButton>
          {iconUrl && (
            <GlassButton
              type='button'
              onClick={onRemove}
              disabled={removeDisabled || generatingIcon}
              className='py-2'
            >
              <span className='text-white/50 text-sm px-1'>
                {removingIcon ? 'Removing...' : 'Remove'}
              </span>
            </GlassButton>
          )}
        </div>
      </div>
      {status && (
        <span className='text-xs text-white/50'>{status.message}</span>
      )}
    </div>
  );
}

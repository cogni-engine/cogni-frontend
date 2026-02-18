'use client';

import type { ChangeEvent, RefObject } from 'react';
import { Sparkles } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import type { StatusMessage } from '../utils/avatar';

type AvatarCardProps = {
  avatarUrl?: string | null;
  avatarAlt?: string;
  initials: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onUploadClick: () => void;
  savingAvatar: boolean;
  onRemove: () => void;
  removingAvatar: boolean;
  removeDisabled: boolean;
  status: StatusMessage | null;
  onGenerate?: () => void;
  generatingAvatar?: boolean;
};

export function AvatarCard({
  avatarUrl,
  avatarAlt,
  initials,
  fileInputRef,
  onFileChange,
  onUploadClick,
  savingAvatar,
  onRemove,
  removingAvatar,
  removeDisabled,
  status,
  onGenerate,
  generatingAvatar,
}: AvatarCardProps) {
  const isProcessing = savingAvatar || generatingAvatar;

  return (
    <div className='space-y-3 lg:grid lg:grid-cols-[200px_1fr] lg:gap-10 lg:space-y-0'>
      <div className='lg:pt-2'>
        <h3 className='text-base font-semibold text-text-primary'>Photo</h3>
      </div>
      <div className='flex flex-col items-center gap-4 lg:flex-row lg:items-center'>
        <Avatar className='h-20 w-20 border-border-default text-2xl lg:h-16 lg:w-16 shrink-0'>
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={avatarAlt ?? 'User avatar'} />
          ) : (
            <AvatarFallback className='text-lg'>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div className='flex flex-col items-center gap-2 lg:items-start'>
          <div className='flex flex-wrap gap-2'>
            <Button
              type='button'
              variant='secondary'
              onClick={onUploadClick}
              disabled={isProcessing}
            >
              {savingAvatar ? 'Processing...' : 'Upload'}
            </Button>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={onFileChange}
            />
            {onGenerate && (
              <Button
                type='button'
                variant='outline'
                onClick={onGenerate}
                disabled={isProcessing}
                className='gap-1.5'
              >
                <Sparkles className='h-4 w-4' />
                {generatingAvatar ? 'Generating...' : 'Generate'}
              </Button>
            )}
            <Button
              type='button'
              variant='ghost'
              onClick={onRemove}
              disabled={removeDisabled || isProcessing}
            >
              {removingAvatar ? 'Removing...' : 'Remove'}
            </Button>
          </div>
          {status && (
            <span
              className={
                status.type === 'success'
                  ? 'text-sm text-emerald-300'
                  : 'text-sm text-red-300'
              }
            >
              {status.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

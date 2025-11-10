'use client';

import type { ChangeEvent, RefObject } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
}: AvatarCardProps) {
  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>Avatar</CardTitle>
        <CardDescription>
          Upload an image to personalize your workspace presence.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col items-center gap-6'>
        <Avatar className='h-24 w-24 border-white/20 text-2xl'>
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={avatarAlt ?? 'User avatar'} />
          ) : (
            <AvatarFallback className='text-lg'>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div className='flex flex-col gap-2 text-center text-sm text-white/60'>
          <span>Recommended: square image, at least 256×256px.</span>
          <span>Supported formats: PNG or JPG.</span>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex gap-2'>
          <Button
            type='button'
            variant='secondary'
            onClick={onUploadClick}
            disabled={savingAvatar}
          >
            {savingAvatar ? 'Processing…' : 'Upload new avatar'}
          </Button>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={onFileChange}
          />
          <Button
            type='button'
            variant='ghost'
            onClick={onRemove}
            disabled={removeDisabled}
          >
            {removingAvatar ? 'Removing…' : 'Remove avatar'}
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
      </CardFooter>
    </Card>
  );
}

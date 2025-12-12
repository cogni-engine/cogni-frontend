'use client';

import type { ChangeEvent, RefObject } from 'react';
import { Sparkles } from 'lucide-react';

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
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>Avatar</CardTitle>
        <CardDescription>
          Upload an image or generate a unique abstract avatar.
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
      <CardFooter className='flex flex-col gap-3'>
        <div className='flex flex-wrap gap-2'>
          <Button
            type='button'
            variant='secondary'
            onClick={onUploadClick}
            disabled={isProcessing}
          >
            {savingAvatar ? 'Processing…' : 'Upload'}
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
              {generatingAvatar ? 'Generating…' : 'Generate'}
            </Button>
          )}
          <Button
            type='button'
            variant='ghost'
            onClick={onRemove}
            disabled={removeDisabled || isProcessing}
          >
            {removingAvatar ? 'Removing…' : 'Remove'}
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

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

import type { StatusMessage } from '@/features/users/utils/avatar';

type WorkspaceIconCardProps = {
  iconUrl?: string | null;
  iconAlt?: string;
  initials: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onUploadClick: () => void;
  savingIcon: boolean;
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
  savingIcon,
  onRemove,
  removingIcon,
  removeDisabled,
  status,
}: WorkspaceIconCardProps) {
  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>Workspace icon</CardTitle>
        <CardDescription>
          Upload an image to help teammates recognize this workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col items-center gap-6'>
        <Avatar className='h-24 w-24 border-white/20 text-2xl'>
          {iconUrl ? (
            <AvatarImage src={iconUrl} alt={iconAlt ?? 'Workspace icon'} />
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
            disabled={savingIcon}
          >
            {savingIcon ? 'Processing…' : 'Upload new icon'}
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
            {removingIcon ? 'Removing…' : 'Remove icon'}
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

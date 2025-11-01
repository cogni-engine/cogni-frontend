'use client';

import { FormEvent, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { StatusMessage } from '@/features/users/utils/avatar';

type WorkspaceInfoFormProps = {
  title: string;
  onTitleChange: (value: string) => void;
  onSubmit: () => Promise<void>;
  saving: boolean;
  disableSave: boolean;
  status: StatusMessage | null;
};

export function WorkspaceInfoForm({
  title,
  onTitleChange,
  onSubmit,
  saving,
  disableSave,
  status,
}: WorkspaceInfoFormProps) {
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await onSubmit();
    },
    [onSubmit]
  );

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>Workspace details</CardTitle>
        <CardDescription>
          Update the workspace name used across shared surfaces.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className='space-y-5' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <Label htmlFor='workspace-title'>Workspace name</Label>
            <Input
              id='workspace-title'
              placeholder='Add a workspace name'
              value={title}
              onChange={event => onTitleChange(event.target.value)}
              disabled={saving}
              autoComplete='organization'
            />
            <p className='text-xs text-white/50'>
              This is how the workspace is shown to members.
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <Button type='submit' disabled={saving || disableSave}>
              {saving ? 'Saving…' : 'Save workspace name'}
            </Button>
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
        </form>
      </CardContent>
    </Card>
  );
}

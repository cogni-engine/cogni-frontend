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

import type { StatusMessage } from '../utils/avatar';

type ProfileInfoFormProps = {
  name: string;
  onNameChange: (value: string) => void;
  onSubmit: () => Promise<void>;
  saving: boolean;
  disableSave: boolean;
  status: StatusMessage | null;
};

export function ProfileInfoForm({
  name,
  onNameChange,
  onSubmit,
  saving,
  disableSave,
  status,
}: ProfileInfoFormProps) {
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
        <CardTitle>Profile information</CardTitle>
        <CardDescription>Update the name shown across the app.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className='space-y-5' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <Label htmlFor='name'>Display name</Label>
            <Input
              id='name'
              placeholder='Add your display name'
              value={name}
              onChange={event => onNameChange(event.target.value)}
              disabled={saving}
              autoComplete='name'
            />
            <p className='text-xs text-white/50'>
              This is how your name appears to teammates.
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <Button type='submit' disabled={saving || disableSave}>
              {saving ? 'Saving…' : 'Save name'}
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

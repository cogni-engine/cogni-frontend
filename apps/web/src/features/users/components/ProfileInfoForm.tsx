'use client';

import { FormEvent, useCallback } from 'react';

import { Button } from '@/components/ui/button';
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
    <div className='space-y-3 lg:grid lg:grid-cols-[200px_1fr] lg:gap-10 lg:space-y-0'>
      <div className='lg:pt-2'>
        <h3 className='text-base font-semibold text-text-primary'>Name</h3>
        <p className='text-sm text-text-muted'>Visible to collaborators.</p>
      </div>
      <form className='space-y-4' onSubmit={handleSubmit}>
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
        </div>
        <div className='flex items-center gap-3'>
          <Button type='submit' disabled={saving || disableSave}>
            {saving ? 'Saving...' : 'Save'}
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
    </div>
  );
}

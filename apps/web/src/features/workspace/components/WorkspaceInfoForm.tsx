'use client';

import { FormEvent, useCallback } from 'react';

import GlassButton from '@/components/glass-design/GlassButton';
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
    <div className='space-y-3'>
      <h2 className='text-sm font-medium text-white/60'>Name</h2>
      <form className='flex items-center gap-3' onSubmit={handleSubmit}>
        <Label htmlFor='workspace-title' className='sr-only'>
          Workspace name
        </Label>
        <Input
          id='workspace-title'
          placeholder='Workspace name'
          value={title}
          onChange={event => onTitleChange(event.target.value)}
          disabled={saving}
          autoComplete='organization'
          className='flex-1 bg-white/5 border-white/10 focus:border-white/20'
        />
        <GlassButton
          type='submit'
          disabled={saving || disableSave}
          className='py-2'
        >
          <span className='text-white text-sm px-1'>
            {saving ? 'Saving...' : 'Save'}
          </span>
        </GlassButton>
      </form>
      {status && (
        <span className='text-xs text-white/50'>{status.message}</span>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type DeleteAccountSectionProps = {
  onDelete: () => Promise<void>;
  isDeleting: boolean;
};

export function DeleteAccountSection({
  onDelete,
  isDeleting,
}: DeleteAccountSectionProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete();
    } catch (error) {
      console.error('Failed to delete account', error);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between lg:grid lg:grid-cols-[200px_1fr] lg:gap-10'>
        <div>
          <h3 className='text-base font-semibold text-red-700 dark:text-red-200'>
            Delete Account
          </h3>
          <p className='text-sm text-text-muted'>Permanent and irreversible.</p>
        </div>
        <div className='lg:flex lg:justify-end'>
          <Button
            variant='destructive'
            onClick={handleDeleteClick}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete account'}
          </Button>
        </div>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete account</DialogTitle>
            <DialogDescription>
              Are you sure? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-3'>
            <p className='text-sm text-text-secondary'>This will:</p>
            <ul className='list-disc list-inside space-y-1 text-sm text-text-secondary ml-4'>
              <li>Delete all your notes and tasks</li>
              <li>Remove you from all workspaces</li>
              <li>Delete your profile data</li>
            </ul>
            <p className='text-sm text-red-600 dark:text-red-300 font-medium'>
              This action is permanent.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant='ghost'
              onClick={() => setShowConfirmDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Yes, delete my account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

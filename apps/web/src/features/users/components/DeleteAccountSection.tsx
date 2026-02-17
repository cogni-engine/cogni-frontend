'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
      // The parent component will handle signOut and redirect
    } catch (error) {
      console.error('Failed to delete account', error);
      // Keep dialog open on error so user can try again
    }
  };

  return (
    <>
      <Card className='border border-red-500/30 bg-red-500/5'>
        <CardHeader>
          <CardTitle className='text-red-700 dark:text-red-200'>
            Danger zone
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all of your data.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='text-sm text-text-secondary'>
            This action is irreversible. Once you delete your account, you will
            not be able to recover any of your data, including notes, tasks, and
            workspaces.
          </div>
          <Button
            variant='destructive'
            onClick={handleDeleteClick}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting…' : 'Delete account'}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <p className='text-sm text-text-secondary'>
              Deleting your account will:
            </p>
            <ul className='list-disc list-inside space-y-1 text-sm text-text-secondary ml-4'>
              <li>Permanently delete all your notes and tasks</li>
              <li>Remove you from all workspaces</li>
              <li>Delete your profile and account data</li>
              <li>Ban your account from accessing the service</li>
            </ul>
            <p className='text-sm text-red-600 dark:text-red-300 font-medium'>
              This action is permanent and cannot be reversed.
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
              {isDeleting ? 'Deleting…' : 'Yes, delete my account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

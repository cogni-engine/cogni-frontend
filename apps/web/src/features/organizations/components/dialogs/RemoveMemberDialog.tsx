import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserMinus, Loader2 } from 'lucide-react';
import { useRemoveMember } from '../../hooks/useOrganizationMembers';
import type { Member } from '../../types/members';
import { getMemberDisplayName } from '../../utils/memberUtils';

interface RemoveMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member | null;
  organizationId: number | undefined;
  onSuccess?: () => void;
}

export function RemoveMemberDialog({
  open,
  onOpenChange,
  member,
  organizationId,
  onSuccess,
}: RemoveMemberDialogProps) {
  const removeMember = useRemoveMember();

  const handleRemove = async () => {
    if (!organizationId || !member) return;

    try {
      await removeMember.mutateAsync({
        organizationId,
        memberId: member.id,
      });

      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to remove member:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-gray-900 border-white/10 text-white'>
        <DialogHeader>
          <DialogTitle>Remove Member</DialogTitle>
          <DialogDescription className='text-white/60'>
            Are you sure you want to remove this member from the organization?
            They will lose access to all organization resources.
          </DialogDescription>
        </DialogHeader>

        {member && (
          <div className='py-4 px-4 bg-white/5 rounded-lg border border-white/10'>
            <p className='text-white font-medium'>
              {getMemberDisplayName(member)}
            </p>
            <p className='text-sm text-white/60'>{member.email}</p>
          </div>
        )}

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={removeMember.isPending}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleRemove}
            disabled={removeMember.isPending}
          >
            {removeMember.isPending ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Removing...
              </>
            ) : (
              <>
                <UserMinus className='mr-2 h-4 w-4' />
                Remove Member
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

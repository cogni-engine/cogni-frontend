import * as React from 'react';
import GlassCard from '@/components/glass-design/GlassCard';
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

  if (!open || !member) return null;

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
    <div className='fixed inset-0 z-120 flex items-center justify-center bg-black/60 backdrop-blur-md px-4 py-8'>
      <GlassCard className='w-full max-w-md rounded-3xl border border-white/12 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]'>
        <div className='flex flex-col gap-4 text-white'>
          <div className='flex items-start gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/20'>
              <UserMinus className='h-5 w-5 text-red-300' />
            </div>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold tracking-tight'>
                Remove member?
              </h3>
              <p className='mt-1 text-sm text-white/70'>
                {getMemberDisplayName(member)} will lose access to all
                organization resources. This action can&apos;t be undone.
              </p>
            </div>
          </div>

          <div className='p-3 bg-white/5 rounded-xl border border-white/10'>
            <p className='text-white font-medium text-sm'>
              {getMemberDisplayName(member)}
            </p>
            <p className='text-xs text-white/60'>{member.email}</p>
          </div>

          <div className='h-px bg-white/10' />

          <div className='flex justify-end gap-3'>
            <button
              onClick={() => onOpenChange(false)}
              disabled={removeMember.isPending}
              className='rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/16 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Cancel
            </button>
            <button
              onClick={handleRemove}
              disabled={removeMember.isPending}
              className='rounded-full bg-red-500/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(248,113,113,0.35)] transition-colors hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
            >
              {removeMember.isPending ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Removing...
                </>
              ) : (
                'Remove Member'
              )}
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

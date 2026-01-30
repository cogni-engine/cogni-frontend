import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { PendingInvitationCard } from './PendingInvitationCard';
import type { OrganizationInvitation } from '@/lib/api/organizationInvitationsApi';

interface PendingInvitationsListProps {
  invitations: OrganizationInvitation[];
  isLoading: boolean;
  onCopyLink: (invitation: OrganizationInvitation) => void;
  onCancel: (invitationId: string) => void;
}

export function PendingInvitationsList({
  invitations,
  isLoading,
  onCopyLink,
  onCancel,
}: PendingInvitationsListProps) {
  const pendingInvitations = invitations.filter(
    inv => inv.status === 'pending'
  );

  return (
    <div className='mt-8'>
      <h3 className='text-lg font-semibold text-white mb-4'>
        Pending Invitations
      </h3>

      {isLoading ? (
        <div className='flex justify-center py-8'>
          <Loader2 className='h-6 w-6 text-white/40 animate-spin' />
        </div>
      ) : pendingInvitations.length === 0 ? (
        <p className='text-white/40 text-center py-8'>No pending invitations</p>
      ) : (
        <div className='space-y-2'>
          {pendingInvitations.map(invitation => (
            <PendingInvitationCard
              key={invitation.id}
              invitation={invitation}
              onCopyLink={onCopyLink}
              onCancel={onCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
}

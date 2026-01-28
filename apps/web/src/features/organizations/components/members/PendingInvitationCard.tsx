import * as React from 'react';
import { Button } from '@/components/ui/button';
import type { OrganizationInvitation } from '@/lib/api/organizationInvitationsApi';

interface PendingInvitationCardProps {
  invitation: OrganizationInvitation;
  onCopyLink: (invitation: OrganizationInvitation) => void;
  onCancel: (invitationId: string) => void;
}

export function PendingInvitationCard({
  invitation,
  onCopyLink,
  onCancel,
}: PendingInvitationCardProps) {
  return (
    <div className='p-4 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between'>
      <div>
        <p className='text-white font-medium'>{invitation.invitee_email}</p>
        <p className='text-sm text-white/60'>
          Invited {new Date(invitation.created_at).toLocaleDateString()}
          {' • Expires '}
          {new Date(invitation.expires_at).toLocaleDateString()}
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onCopyLink(invitation)}
          className='bg-blue-500/10 border-blue-500/50 text-blue-300 hover:bg-blue-500/20'
        >
          Copy Link
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onCancel(invitation.id)}
          className='bg-red-500/10 border-red-500/50 text-red-300 hover:bg-red-500/20'
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

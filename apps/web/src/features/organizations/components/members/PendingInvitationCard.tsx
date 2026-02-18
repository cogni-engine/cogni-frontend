import * as React from 'react';
import { Copy, X } from 'lucide-react';
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
    <div className='p-4 bg-surface-primary rounded-3xl border border-border-default flex items-center justify-between'>
      <div>
        <p className='text-text-primary font-medium'>
          {invitation.invitee_email}
        </p>
        <p className='text-sm text-text-secondary'>
          Invited {new Date(invitation.created_at).toLocaleDateString()}
          {' • Expires '}
          {new Date(invitation.expires_at).toLocaleDateString()}
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <button
          onClick={() => onCopyLink(invitation)}
          className='flex h-9 w-9 items-center justify-center rounded-3xl bg-blue-500/10 border border-blue-500/50 text-blue-300 hover:bg-blue-500/20 transition-colors'
          aria-label='Copy invitation link'
        >
          <Copy className='h-4 w-4' />
        </button>
        <button
          onClick={() => onCancel(invitation.id)}
          className='flex h-9 w-9 items-center justify-center rounded-3xl bg-red-500/10 border border-red-500/50 text-red-300 hover:bg-red-500/20 transition-colors'
          aria-label='Cancel invitation'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
}

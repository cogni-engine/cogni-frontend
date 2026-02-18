import * as React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
} from '@/components/ui/drawer';
import GlassButton from '@/components/glass-design/GlassButton';
import { UserPlus, Loader2, Mail, Info } from 'lucide-react';
import { useCreateInvitation } from '../../hooks/useOrganizationInvitations';
import { RoleSelector } from '../RoleSelector';

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: number | undefined;
  availableSeats: number;
  onSuccess?: (message: string) => void;
}

export function InviteMemberDialog({
  open,
  onOpenChange,
  organizationId,
  availableSeats,
  onSuccess,
}: InviteMemberDialogProps) {
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteRoleId, setInviteRoleId] = React.useState<number>(3); // Default to 'member' role

  const createInvitation = useCreateInvitation();

  const handleClose = () => {
    onOpenChange(false);
    setInviteEmail('');
    setInviteRoleId(3);
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationId || !inviteEmail.trim()) return;

    try {
      const invitation = await createInvitation.mutateAsync({
        organizationId,
        inviteeEmail: inviteEmail,
        roleId: inviteRoleId,
      });

      // Copy link to clipboard
      try {
        await navigator.clipboard.writeText(invitation.invitation_link);
        onSuccess?.(
          `Invitation sent to ${inviteEmail}! Link copied to clipboard.`
        );
      } catch {
        onSuccess?.(`Invitation sent to ${inviteEmail}!`);
      }

      // Close drawer and reset form
      handleClose();
    } catch (error) {
      // Error will be displayed by the parent component
      console.error('Failed to invite member:', error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent zIndex={150} maxHeight='85vh'>
        <DrawerHandle />

        <DrawerHeader className='px-6 pb-2 pt-0'>
          <DrawerTitle>Invite Member</DrawerTitle>
        </DrawerHeader>

        <DrawerBody>
          <form onSubmit={handleInvite} className='space-y-6 px-4'>
            <div className='space-y-2'>
              <label
                htmlFor='invite-email'
                className='text-sm font-medium text-text-secondary'
              >
                Email address
              </label>
              <div className='relative'>
                <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted' />
                <input
                  id='invite-email'
                  type='email'
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder='member@example.com'
                  className='w-full pl-11 pr-4 py-3 bg-surface-primary border border-border-default rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-border-default transition-all'
                  disabled={createInvitation.isPending}
                  autoFocus
                />
              </div>
            </div>

            <RoleSelector
              value={inviteRoleId}
              onChange={setInviteRoleId}
              disabled={createInvitation.isPending}
              label='Role'
            />
            <div className='flex items-start gap-2 text-xs text-text-muted'>
              <Info className='h-3 w-3 mt-0.5 shrink-0' />
              <p>
                Admins can invite and remove members. Owner role cannot be
                assigned.
              </p>
            </div>
          </form>
        </DrawerBody>

        <DrawerFooter className='px-4 pb-6'>
          <div className='flex gap-2 w-full'>
            <GlassButton
              type='button'
              onClick={handleClose}
              disabled={createInvitation.isPending}
              className='flex-1 h-12'
            >
              Cancel
            </GlassButton>
            <GlassButton
              type='button'
              onClick={handleInvite}
              disabled={createInvitation.isPending || !inviteEmail.trim()}
              className='flex-1 h-12 bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-50'
            >
              {createInvitation.isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Inviting...
                </>
              ) : (
                <>
                  <UserPlus className='mr-2 h-4 w-4' />
                  Send Invitation
                </>
              )}
            </GlassButton>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

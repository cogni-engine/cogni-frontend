'use client';

import { useParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import MemberList from '@/features/workspace/components/MemberList';
import { useWorkspaceInvitations } from '@/features/workspace/hooks/useWorkspaceInvitations';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { generateInvitationLink } from '@/features/workspace/api/invitationsApi';
import { Plus, X, Mail, Link, Copy } from 'lucide-react';
import GlassCard from '@/components/glass-design/GlassCard';
import GlassButton from '@/components/glass-design/GlassButton';
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
} from '@/components/ui/drawer';

export default function WorkspaceMembersPage() {
  const params = useParams();
  const workspaceId = parseInt(params.id as string);

  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invitationType, setInvitationType] = useState<'email' | 'anonymous'>(
    'email'
  );

  const {
    invitations,
    inviteLinks,
    loading: invitationsLoading,
    createEmailInvitation,
    createAnonymousInviteLink,
    cancelInvitationById,
    disableInviteLinkById,
  } = useWorkspaceInvitations(workspaceId);

  const {
    members,
    isLoading: membersLoading,
    error: membersError,
  } = useWorkspaceMembers(workspaceId);

  const handleCreateInvitation = useCallback(async () => {
    if (invitationType === 'email' && !inviteEmail.trim()) return;

    try {
      const link =
        invitationType === 'email'
          ? await createEmailInvitation(inviteEmail)
          : await createAnonymousInviteLink();

      await navigator.clipboard.writeText(link);
      setInviteEmail('');
      setShowInviteModal(false);
      setInvitationType('email');
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to create invitation:', error);
    }
  }, [
    invitationType,
    inviteEmail,
    createEmailInvitation,
    createAnonymousInviteLink,
  ]);

  const handleCancelInvitation = useCallback(
    async (invitationId: string) => {
      try {
        await cancelInvitationById(invitationId);
      } catch (error) {
        console.error('Failed to cancel invitation:', error);
      }
    },
    [cancelInvitationById]
  );

  const handleDisableInviteLink = useCallback(
    async (inviteLinkId: string) => {
      try {
        await disableInviteLinkById(inviteLinkId);
      } catch (error) {
        console.error('Failed to disable invite link:', error);
      }
    },
    [disableInviteLinkById]
  );

  const handleCopyInviteLink = useCallback(async (token: string) => {
    try {
      const link = generateInvitationLink(token);
      await navigator.clipboard.writeText(link);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy invite link:', error);
    }
  }, []);

  return (
    <>
      <div className='h-full overflow-y-auto space-y-6 py-20 px-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-white'>Members</h2>
          <GlassButton
            onClick={() => setShowInviteModal(true)}
            title='Invite Member'
            className='size-12'
          >
            <Plus className='w-5 h-5 text-white' />
          </GlassButton>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-gray-300'>
            Workspace Members
          </h3>
          {membersError && (
            <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300'>
              Failed to load members
            </div>
          )}
          <MemberList members={members} loading={membersLoading} />

          <h3 className='text-lg font-medium text-gray-300 pt-4'>
            Email Invitations
          </h3>
          {invitationsLoading ? (
            <div className='flex justify-center py-4'>
              <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>
            </div>
          ) : invitations.length === 0 ? (
            <p className='text-gray-400'>No pending email invitations</p>
          ) : (
            <div className='space-y-2'>
              {invitations.map(invitation => (
                <GlassCard
                  key={invitation.id}
                  className='flex items-center justify-between rounded-lg p-3'
                >
                  <div>
                    <p className='text-white font-medium'>
                      {invitation.invitee_email}
                    </p>
                    <p className='text-sm text-gray-400'>
                      Email invitation • Invited{' '}
                      {new Date(invitation.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        invitation.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : invitation.status === 'accepted'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-gray-500/20 text-gray-300'
                      }`}
                    >
                      {invitation.status}
                    </span>
                    {invitation.status === 'pending' && (
                      <button
                        onClick={() => handleCancelInvitation(invitation.id)}
                        className='p-1 hover:bg-red-500/20 rounded transition-colors'
                        title='Cancel invitation'
                      >
                        <X className='w-4 h-4 text-red-400' />
                      </button>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          <h3 className='text-lg font-medium text-gray-300'>Invite Links</h3>
          {invitationsLoading ? (
            <div className='flex justify-center py-4'>
              <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>
            </div>
          ) : inviteLinks.length === 0 ? (
            <p className='text-gray-400'>No active invite links</p>
          ) : (
            <div className='space-y-2'>
              {inviteLinks.map(inviteLink => (
                <GlassCard
                  key={inviteLink.id}
                  className='flex items-center justify-between rounded-lg p-3'
                >
                  <div>
                    <p className='text-white font-medium'>Anonymous Link</p>
                    <p className='text-sm text-gray-400'>
                      {inviteLink.used_count}/{inviteLink.max_uses} uses •
                      Created{' '}
                      {new Date(inviteLink.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        inviteLink.status === 'active'
                          ? 'bg-green-500/20 text-green-300'
                          : inviteLink.status === 'disabled'
                            ? 'bg-gray-500/20 text-gray-300'
                            : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {inviteLink.status}
                    </span>
                    {inviteLink.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleCopyInviteLink(inviteLink.token)}
                          className='p-1 hover:bg-blue-500/20 rounded transition-colors'
                          title='Copy invite link'
                        >
                          <Copy className='w-4 h-4 text-blue-400' />
                        </button>
                        <button
                          onClick={() => handleDisableInviteLink(inviteLink.id)}
                          className='p-1 hover:bg-red-500/20 rounded transition-colors'
                          title='Disable invite link'
                        >
                          <X className='w-4 h-4 text-red-400' />
                        </button>
                      </>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Invite Drawer */}
      <Drawer open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DrawerContent zIndex={150} maxHeight='85vh'>
          <DrawerHandle />

          <DrawerHeader className='px-6 pb-2 pt-0'>
            <DrawerTitle>Invite to Workspace</DrawerTitle>
          </DrawerHeader>

          <DrawerBody>
            <div className='space-y-4 px-4'>
              {/* Invitation Type Selection */}
              <div className='space-y-3'>
                <button
                  onClick={() => setInvitationType('email')}
                  className={`w-full p-4 rounded-xl transition-all duration-300 ${
                    invitationType === 'email'
                      ? 'bg-white/10 border border-white/20'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <Mail className='w-5 h-5 text-white' />
                    <div className='text-left flex-1'>
                      <p className='font-medium text-white'>Invite by email</p>
                      <p className='text-sm text-white/60'>
                        Send an invitation to a specific email address
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setInvitationType('anonymous')}
                  className={`w-full p-4 rounded-xl transition-all duration-300 ${
                    invitationType === 'anonymous'
                      ? 'bg-white/10 border border-white/20'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <Link className='w-5 h-5 text-white' />
                    <div className='text-left flex-1'>
                      <p className='font-medium text-white'>Share link</p>
                      <p className='text-sm text-white/60'>
                        Create a link that anyone can use to join
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Email Input */}
              {invitationType === 'email' && (
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-white/80'>
                    Email address
                  </label>
                  <input
                    type='email'
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    placeholder='colleague@company.com'
                    className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all'
                    autoFocus
                  />
                </div>
              )}
            </div>
          </DrawerBody>

          <DrawerFooter className='flex gap-3 px-4 pb-4'>
            <GlassButton
              onClick={() => {
                setShowInviteModal(false);
                setInvitationType('email');
                setInviteEmail('');
              }}
              variant='ghost'
              className='flex-1'
            >
              Cancel
            </GlassButton>
            <GlassButton
              onClick={handleCreateInvitation}
              disabled={invitationType === 'email' && !inviteEmail.trim()}
              className='flex-1 gap-2'
            >
              <Copy className='w-4 h-4' />
              {invitationType === 'email' ? 'Send Invite' : 'Copy Link'}
            </GlassButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

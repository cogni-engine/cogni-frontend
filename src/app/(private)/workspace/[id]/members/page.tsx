'use client';

import { useParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import MemberList from '@/features/workspace/components/MemberList';
import { useWorkspaceInvitations } from '@/hooks/useWorkspaceInvitations';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { generateInvitationLink } from '@/lib/api/invitationsApi';
import { Plus, X, Mail, Link, Copy } from 'lucide-react';

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
      <div className='h-full overflow-y-auto space-y-6 pr-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-white'>Members</h2>
          <button
            onClick={() => setShowInviteModal(true)}
            className='p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors'
            title='Invite Member'
          >
            <Plus className='w-5 h-5 text-white' />
          </button>
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
                <div
                  key={invitation.id}
                  className='flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10'
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
                </div>
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
                <div
                  key={inviteLink.id}
                  className='flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10'
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-slate-900 rounded-xl border border-white/10 w-full max-w-md'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-semibold text-white'>
                  Invite to Workspace
                </h3>
                <button
                  onClick={() => {
                    setShowInviteModal(false);
                    setInvitationType('email');
                    setInviteEmail('');
                  }}
                  className='p-1 hover:bg-white/10 rounded-lg transition-colors'
                >
                  <X className='w-5 h-5 text-gray-400' />
                </button>
              </div>

              <div className='space-y-4'>
                {/* Email Invitation */}
                <button
                  onClick={() => setInvitationType('email')}
                  className={`w-full p-4 rounded-lg border transition-colors ${
                    invitationType === 'email'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/20 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className={`p-2 rounded-lg ${
                        invitationType === 'email'
                          ? 'bg-blue-500'
                          : 'bg-gray-600'
                      }`}
                    >
                      <Mail className='w-5 h-5 text-white' />
                    </div>
                    <div className='text-left'>
                      <p className='font-medium text-white'>Invite by email</p>
                      <p className='text-sm text-gray-400'>
                        Send an invitation to a specific email address
                      </p>
                    </div>
                  </div>
                </button>

                {/* Share Link */}
                <button
                  onClick={() => setInvitationType('anonymous')}
                  className={`w-full p-4 rounded-lg border transition-colors ${
                    invitationType === 'anonymous'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/20 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className={`p-2 rounded-lg ${
                        invitationType === 'anonymous'
                          ? 'bg-blue-500'
                          : 'bg-gray-600'
                      }`}
                    >
                      <Link className='w-5 h-5 text-white' />
                    </div>
                    <div className='text-left'>
                      <p className='font-medium text-white'>Share link</p>
                      <p className='text-sm text-gray-400'>
                        Create a link that anyone can use to join
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Email Input */}
              {invitationType === 'email' && (
                <div className='mt-6'>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>
                    Email address
                  </label>
                  <input
                    type='email'
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    placeholder='colleague@company.com'
                    className='w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    autoFocus
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className='flex gap-3 mt-6'>
                <button
                  onClick={() => {
                    setShowInviteModal(false);
                    setInvitationType('email');
                    setInviteEmail('');
                  }}
                  className='flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors font-medium'
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateInvitation}
                  disabled={invitationType === 'email' && !inviteEmail.trim()}
                  className='flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors font-medium flex items-center justify-center gap-2'
                >
                  <Copy className='w-4 h-4' />
                  {invitationType === 'email' ? 'Send Invite' : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

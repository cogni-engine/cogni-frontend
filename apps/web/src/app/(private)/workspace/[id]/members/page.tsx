'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';
import { useSWRConfig } from 'swr';
import MemberList from '@/features/workspace/components/MemberList';
import MemberSelectionStep from '@/features/workspace/components/MemberSelectionStep';
import { useWorkspaceInvitations } from '@/features/workspace/hooks/useWorkspaceInvitations';
import { useWorkspaceMembers } from '@/hooks/useWorkspace';
import { generateInvitationLink } from '@/features/workspace/api/invitationsApi';
import { addWorkspaceMembers } from '@/lib/api/workspaceApi';
import { Plus, X, Mail, Link, Copy, Check } from 'lucide-react';
import GlassCard from '@/components/glass-design/GlassCard';
import GlassButton from '@/components/glass-design/GlassButton';
export default function WorkspaceMembersPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const workspaceId = parseInt(params.id as string);
  const { mutate } = useSWRConfig();

  const showInviteMode = searchParams.get('invite') === 'true';

  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isAddingMembers, setIsAddingMembers] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showEmailInviteForm, setShowEmailInviteForm] = useState(false);
  const [isSendingEmailInvite, setIsSendingEmailInvite] = useState(false);
  const [linkCopySuccess, setLinkCopySuccess] = useState(false);

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

  const handleSendEmailInvite = useCallback(async () => {
    if (!inviteEmail.trim()) return;
    setIsSendingEmailInvite(true);
    try {
      const link = await createEmailInvitation(inviteEmail);
      await navigator.clipboard.writeText(link);
      setInviteEmail('');
    } catch (error) {
      console.error('Failed to create invitation:', error);
    } finally {
      setIsSendingEmailInvite(false);
    }
  }, [inviteEmail, createEmailInvitation]);

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

  const handleAddExistingMembers = useCallback(async () => {
    if (selectedUserIds.length === 0) return;

    setIsAddingMembers(true);
    try {
      await addWorkspaceMembers(workspaceId, selectedUserIds);
      await mutate(`/workspaces/${workspaceId}/members`);
      window.history.replaceState(
        {},
        '',
        `/workspace/${workspaceId}/members`
      );
      setSelectedUserIds([]);
    } catch (error) {
      console.error('Failed to add members:', error);
    } finally {
      setIsAddingMembers(false);
    }
  }, [workspaceId, selectedUserIds, mutate]);

  const handleInviteByEmail = useCallback(() => {
    setShowEmailInviteForm(true);
    setInviteEmail('');
  }, []);

  const handleShareLink = useCallback(async () => {
    if (isSharing) return;
    setIsSharing(true);
    try {
      let inviteLink: string;
      const activeLink = inviteLinks.find(link => link.status === 'active');
      if (activeLink) {
        inviteLink = generateInvitationLink(activeLink.token);
      } else {
        inviteLink = await createAnonymousInviteLink();
      }
      if (navigator.share) {
        await navigator.share({
          title: 'Join my workspace on Cogno',
          text: "You've been invited to join my workspace!",
          url: inviteLink,
        });
      } else {
        await navigator.clipboard.writeText(inviteLink);
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Failed to share link:', error);
        try {
          const activeLink = inviteLinks.find(link => link.status === 'active');
          const link = activeLink
            ? generateInvitationLink(activeLink.token)
            : await createAnonymousInviteLink();
          await navigator.clipboard.writeText(link);
        } catch (clipboardError) {
          console.error('Failed to copy link to clipboard:', clipboardError);
        }
      }
    } finally {
      setIsSharing(false);
    }
  }, [inviteLinks, createAnonymousInviteLink]);

  const handleCopyExistingInviteLink = useCallback(async () => {
    const activeLink = inviteLinks.find(link => link.status === 'active');
    try {
      if (activeLink) {
        const link = generateInvitationLink(activeLink.token);
        await navigator.clipboard.writeText(link);
      } else {
        await createAnonymousInviteLink();
      }
      setLinkCopySuccess(true);
      setTimeout(() => setLinkCopySuccess(false), 1500);
    } catch (error) {
      console.error('Failed to copy invite link:', error);
    }
  }, [inviteLinks, createAnonymousInviteLink]);

  const existingMemberUserIds = useMemo(() => {
    return members.map(m => m.user_id).filter(Boolean) as string[];
  }, [members]);

  // Show invite mode UI when invite=true query param is present
  if (showInviteMode) {
    const activeInviteLink = inviteLinks.find(link => link.status === 'active');

    return (
      <>
        <div className='flex flex-col h-full relative overflow-hidden'>
          {/* Header - Moved down to avoid overlap with back button */}
          <div className='flex-shrink-0 px-4 pt-20 pb-2'>
            <h2 className='text-xl font-semibold text-white'>
              Invite Members
            </h2>
          </div>

          {/* Invitation Buttons - Fixed at top */}
          <div className='flex-shrink-0 px-4 pb-4'>
            <div className='flex gap-2'>
              <button
                type='button'
                onClick={handleInviteByEmail}
                className='flex-1 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-3 cursor-pointer group'
              >
                <div className='p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors'>
                  <Mail className='w-5 h-5 text-white' />
                </div>
                <div className='text-left flex-1'>
                  <p className='font-medium text-white text-sm'>
                    Invite by email
                  </p>
                  <p className='text-xs text-gray-400'>
                    Send an invitation to a specific email address
                  </p>
                </div>
              </button>
              <button
                type='button'
                onClick={handleShareLink}
                disabled={isSharing}
                className='flex-1 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-3 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <div className='p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors'>
                  <Link className='w-5 h-5 text-white' />
                </div>
                <div className='text-left flex-1'>
                  <p className='font-medium text-white text-sm'>Share link</p>
                  <p className='text-xs text-gray-400'>
                    Create a link that anyone can use to join
                  </p>
                </div>
              </button>
              <button
                type='button'
                onClick={handleCopyExistingInviteLink}
                className='p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center cursor-pointer group'
                title={
                  linkCopySuccess
                    ? 'Copied!'
                    : activeInviteLink
                      ? 'Copy existing invite link'
                      : 'Create and copy invite link'
                }
              >
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    linkCopySuccess
                      ? 'bg-green-500/20'
                      : 'bg-white/10 group-hover:bg-white/20'
                  }`}
                >
                  {linkCopySuccess ? (
                    <Check className='w-5 h-5 text-green-400' />
                  ) : (
                    <Copy className='w-5 h-5 text-white' />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Email invite form - above search, when メール招待 clicked */}
          {showEmailInviteForm && (
            <div className='flex-shrink-0 px-4 pb-4 space-y-3'>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium text-white/80'>
                  Email address
                </label>
                <button
                  type='button'
                  onClick={() => {
                    setShowEmailInviteForm(false);
                    setInviteEmail('');
                  }}
                  className='text-gray-400 hover:text-white text-sm p-1'
                  title='閉じる'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
              <div className='flex gap-2'>
                <input
                  type='email'
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder='colleague@company.com'
                  className='flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all'
                  autoFocus
                />
                <GlassButton
                  onClick={handleSendEmailInvite}
                  disabled={!inviteEmail.trim() || isSendingEmailInvite}
                  className='px-4 gap-2'
                >
                  {isSendingEmailInvite ? 'Sending...' : 'Invite'}
                </GlassButton>
              </div>
            </div>
          )}

          {/* Member Selection - Scrollable area */}
          <div className='flex-1 min-h-0 px-4 overflow-hidden flex flex-col pb-0'>
            <MemberSelectionStep
              selectedUserIds={selectedUserIds}
              onSelectionChange={setSelectedUserIds}
              excludeUserIds={existingMemberUserIds}
            />
          </div>

          {/* Action Buttons - Fixed at bottom, outside scroll */}
          <div className='flex-shrink-0 px-4 pb-4 pt-3 border-t border-white/10 flex gap-3 bg-[#0a0a0a]'>
            <GlassButton
              type='button'
              onClick={() => {
                window.history.replaceState(
                  {},
                  '',
                  `/workspace/${workspaceId}/members`
                );
              }}
              variant='ghost'
              className='flex-1 opacity-100'
            >
              <span className='font-medium text-white text-sm'>Cancel</span>
            </GlassButton>
            <GlassButton
              type='button'
              onClick={handleAddExistingMembers}
              disabled={selectedUserIds.length === 0 || isAddingMembers}
              className='flex-1 opacity-100 disabled:opacity-40'
            >
              <span className='font-medium text-white text-sm'>
                {isAddingMembers
                  ? 'Adding...'
                  : `Add ${selectedUserIds.length} member${
                      selectedUserIds.length !== 1 ? 's' : ''
                    }`}
              </span>
            </GlassButton>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='h-full overflow-y-auto space-y-6 py-20 px-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-white'>Members</h2>
          <GlassButton
            onClick={() =>
              router.push(`/workspace/${workspaceId}/members?invite=true`)
            }
            title='Invite'
            className='gap-2 px-4'
          >
            <Plus className='w-5 h-5 text-white' />
            Invite
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
    </>
  );
}

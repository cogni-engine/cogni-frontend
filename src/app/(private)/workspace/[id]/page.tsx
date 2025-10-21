'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import NoteList from '@/components/notes/NoteList';
import { useWorkspaceNotes, formatDate } from '@/hooks/useWorkspaceNotes';
import { useWorkspaceInvitations } from '@/hooks/useWorkspaceInvitations';
import { generateInvitationLink } from '@/lib/api/invitationsApi';
import type { NoteWithParsed } from '@/types/note';
import {
  ArrowLeft,
  MessageSquare,
  FileText,
  Users,
  Plus,
  X,
  Mail,
  Link,
  Copy,
} from 'lucide-react';

type ViewType = 'chat' | 'notes' | 'members';

export default function WorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceId = parseInt(params.id as string);

  const [currentView, setCurrentView] = useState<ViewType>('notes');
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invitationType, setInvitationType] = useState<'email' | 'anonymous'>(
    'email'
  );

  const { notes, loading, error, searchNotes, workspace } =
    useWorkspaceNotes(workspaceId);
  const {
    invitations,
    inviteLinks,
    loading: invitationsLoading,
    createEmailInvitation,
    createAnonymousInviteLink,
    cancelInvitationById,
    disableInviteLinkById,
  } = useWorkspaceInvitations(workspaceId);

  // Update view based on URL search params
  useEffect(() => {
    const view = searchParams.get('view') as ViewType;
    if (view && ['chat', 'notes', 'members'].includes(view)) {
      setCurrentView(view);
    }
  }, [searchParams]);

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('view', view);
    router.push(`/workspace/${workspaceId}?${newSearchParams.toString()}`);
  };

  const handleCreateInvitation = async () => {
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
  };

  const handleDisableInviteLink = async (inviteLinkId: string) => {
    try {
      await disableInviteLinkById(inviteLinkId);
    } catch (error) {
      console.error('Failed to disable invite link:', error);
    }
  };

  const handleCopyInviteLink = async (token: string) => {
    try {
      const link = generateInvitationLink(token);
      await navigator.clipboard.writeText(link);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy invite link:', error);
    }
  };

  const formattedNotes = notes.map((note: NoteWithParsed) => ({
    id: note.id.toString(),
    title: note.title,
    date: formatDate(note.updated_at),
    preview: note.preview,
  }));

  const renderContent = () => {
    switch (currentView) {
      case 'chat':
        return (
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center'>
              <MessageSquare className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-300 mb-2'>
                Chat Coming Soon
              </h3>
              <p className='text-gray-400'>
                Chat functionality will be available soon.
              </p>
            </div>
          </div>
        );

      case 'members':
        return (
          <div className='space-y-6'>
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
                            onClick={() =>
                              handleCancelInvitation(invitation.id)
                            }
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

              <h3 className='text-lg font-medium text-gray-300'>
                Invite Links
              </h3>
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
                              onClick={() =>
                                handleCopyInviteLink(inviteLink.token)
                              }
                              className='p-1 hover:bg-blue-500/20 rounded transition-colors'
                              title='Copy invite link'
                            >
                              <Copy className='w-4 h-4 text-blue-400' />
                            </button>
                            <button
                              onClick={() =>
                                handleDisableInviteLink(inviteLink.id)
                              }
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
        );

      case 'notes':
      default:
        return (
          <>
            {loading && (
              <div className='flex justify-center items-center py-12'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
              </div>
            )}

            {error && (
              <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300'>
                {error}
              </div>
            )}

            {!loading && !error && (
              <NoteList notes={formattedNotes} onSearch={searchNotes} />
            )}
          </>
        );
    }
  };

  return (
    <div className='flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 p-4 md:p-6 relative overflow-hidden'>
      {/* 背景の星 */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse'></div>
        <div className='absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse delay-1000'></div>
        <div className='absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-white/15 rounded-full animate-pulse delay-2000'></div>
        <div className='absolute top-2/3 right-1/4 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500'></div>
        <div className='absolute bottom-1/3 right-1/2 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-1500'></div>
      </div>

      <div className='relative z-10 flex flex-col h-full'>
        <div className='flex items-center gap-3 mb-6'>
          <button
            onClick={() => router.back()}
            className='p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'
            title='Go back'
          >
            <ArrowLeft className='w-5 h-5 text-white' />
          </button>
          <h1 className='text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
            {workspace ? workspace.title : 'Workspace'}
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className='flex gap-1 mb-6 bg-white/5 rounded-lg p-1'>
          <button
            onClick={() => handleViewChange('notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              currentView === 'notes'
                ? 'bg-white/20 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className='w-4 h-4' />
            Notes
          </button>
          <button
            onClick={() => handleViewChange('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              currentView === 'chat'
                ? 'bg-white/20 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <MessageSquare className='w-4 h-4' />
            Chat
          </button>
          <button
            onClick={() => handleViewChange('members')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              currentView === 'members'
                ? 'bg-white/20 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Users className='w-4 h-4' />
            Members
          </button>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-hidden'>{renderContent()}</div>
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
    </div>
  );
}

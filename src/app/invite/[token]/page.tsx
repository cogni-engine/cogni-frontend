'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  getInvitationByToken,
  acceptInvitation,
} from '@/lib/api/invitationsApi';
import type {
  WorkspaceInvitation,
  WorkspaceInviteLink,
} from '@/types/workspace';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [invitation, setInvitation] = useState<
    WorkspaceInvitation | WorkspaceInviteLink | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accepting, setAccepting] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getInvitationByToken(token);
        setInvitation(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load invitation'
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchInvitation();
    }
  }, [token]);

  const handleAcceptInvitation = async () => {
    if (!invitation) return;

    try {
      setAccepting(true);
      setError(null);
      await acceptInvitation(token);
      setAccepted(true);

      // Redirect to workspace after a short delay
      setTimeout(() => {
        const workspaceId =
          'workspace_id' in invitation
            ? invitation.workspace_id
            : parseInt(invitation.workspace_id);
        router.push(`/workspace/${workspaceId}`);
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to accept invitation'
      );
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-gray-400'>Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 flex items-center justify-center'>
        <div className='text-center max-w-md mx-auto p-6'>
          <XCircle className='w-16 h-16 text-red-400 mx-auto mb-4' />
          <h1 className='text-2xl font-bold text-white mb-2'>
            Invalid Invitation
          </h1>
          <p className='text-gray-400 mb-6'>
            {error || 'This invitation link is invalid or has expired.'}
          </p>
          <button
            onClick={() => router.push('/')}
            className='px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors'
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (accepted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 flex items-center justify-center'>
        <div className='text-center max-w-md mx-auto p-6'>
          <CheckCircle className='w-16 h-16 text-green-400 mx-auto mb-4' />
          <h1 className='text-2xl font-bold text-white mb-2'>Welcome!</h1>
          <p className='text-gray-400 mb-6'>
            You've successfully joined the workspace. Redirecting you now...
          </p>
          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 flex items-center justify-center'>
      <div className='max-w-md mx-auto p-6 bg-white/5 rounded-lg border border-white/10'>
        <div className='text-center mb-6'>
          <CheckCircle className='w-12 h-12 text-blue-400 mx-auto mb-4' />
          <h1 className='text-2xl font-bold text-white mb-2'>
            Workspace Invitation
          </h1>
          <p className='text-gray-400'>
            You've been invited to join a workspace
          </p>
        </div>

        <div className='space-y-4 mb-6'>
          <div className='flex items-center gap-3'>
            <Clock className='w-5 h-5 text-gray-400' />
            <div>
              <p className='text-sm text-gray-400'>Invited by</p>
              <p className='text-white font-medium'>
                {'invitee_email' in invitation
                  ? invitation.invitee_email
                  : 'Anonymous invitation'}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <AlertCircle className='w-5 h-5 text-gray-400' />
            <div>
              <p className='text-sm text-gray-400'>Expires</p>
              <p className='text-white font-medium'>
                {invitation.expires_at
                  ? new Date(invitation.expires_at).toLocaleDateString()
                  : 'Never'}
              </p>
            </div>
          </div>

          {'used_count' in invitation && (
            <div className='flex items-center gap-3'>
              <AlertCircle className='w-5 h-5 text-gray-400' />
              <div>
                <p className='text-sm text-gray-400'>Uses</p>
                <p className='text-white font-medium'>
                  {invitation.used_count}/{invitation.max_uses}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className='space-y-3'>
          <button
            onClick={handleAcceptInvitation}
            disabled={accepting}
            className='w-full px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors font-medium'
          >
            {accepting ? 'Accepting...' : 'Accept Invitation'}
          </button>

          <button
            onClick={() => router.push('/')}
            className='w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors font-medium'
          >
            Decline
          </button>
        </div>

        {error && (
          <div className='mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm'>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

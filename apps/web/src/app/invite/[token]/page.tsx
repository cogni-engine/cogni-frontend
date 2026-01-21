'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  getInvitationByToken,
  acceptInvitation,
  checkWorkspaceMembership,
} from '@/features/workspace';
import { createClient } from '@/lib/supabase/browserClient';
import { setCookie, clearPendingInviteToken, COOKIE_KEYS } from '@cogni/utils';
import { CheckCircle, XCircle } from 'lucide-react';

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<
    'checking' | 'ready' | 'accepting' | 'success' | 'error'
  >('checking');

  useEffect(() => {
    const handleAcceptInvitation = async (workspaceId: number) => {
      try {
        setStatus('accepting');
        setError(null);

        await acceptInvitation(token);

        setStatus('success');
        clearPendingInviteToken();

        // Redirect to workspace after a short delay
        setTimeout(() => {
          router.push(`/workspace/${workspaceId}`);
        }, 2000);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to accept invitation'
        );
        setStatus('error');
      }
    };

    const processInvitation = async () => {
      try {
        setLoading(true);
        setError(null);
        setStatus('checking');

        // First, fetch invitation details to make sure it's valid
        const invitationData = await getInvitationByToken(token);
        if (!invitationData) {
          setError('Invitation not found or has expired');
          setStatus('error');
          setLoading(false);
          return;
        }

        // Check if user is authenticated
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          // Not authenticated - store token and redirect to login
          setCookie(COOKIE_KEYS.PENDING_INVITE_TOKEN, token, 7);
          router.push(`/login?invite=${token}`);
          return;
        }

        // User is authenticated - get workspace ID and ensure it's a number
        let workspaceId: number;
        if ('workspace_id' in invitationData) {
          // WorkspaceInvitation has numeric workspace_id
          workspaceId =
            typeof invitationData.workspace_id === 'number'
              ? invitationData.workspace_id
              : parseInt(invitationData.workspace_id, 10);
        } else {
          setError('Invalid invitation data');
          setStatus('error');
          setLoading(false);
          return;
        }

        // Check if user is already a member
        const isMember = await checkWorkspaceMembership(workspaceId);

        if (isMember) {
          // Already a member, redirect directly to workspace
          clearPendingInviteToken();
          router.push(`/workspace/${workspaceId}`);
          return;
        }

        // Ready to accept invitation
        setStatus('ready');
        setLoading(false);

        // Auto-accept after a brief moment
        setTimeout(() => {
          handleAcceptInvitation(workspaceId);
        }, 1000);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to process invitation'
        );
        setStatus('error');
        setLoading(false);
      }
    };

    if (token) {
      processInvitation();
    }
  }, [token, router, supabase]);

  if (loading || status === 'checking') {
    return (
      <div className='min-h-screen bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-gray-400'>Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (status === 'ready' || status === 'accepting') {
    return (
      <div className='min-h-screen bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100 flex items-center justify-center'>
        <div className='text-center max-w-md mx-auto p-6'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <h1 className='text-2xl font-bold text-white mb-2'>
            {status === 'ready' ? 'Processing...' : 'Joining Workspace...'}
          </h1>
          <p className='text-gray-400'>
            Please wait while we add you to the workspace
          </p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className='min-h-screen bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100 flex items-center justify-center'>
        <div className='text-center max-w-md mx-auto p-6'>
          <CheckCircle className='w-16 h-16 text-green-400 mx-auto mb-4' />
          <h1 className='text-2xl font-bold text-white mb-2'>Welcome!</h1>
          <p className='text-gray-400 mb-6'>
            You&apos;ve successfully joined the workspace. Redirecting you
            now...
          </p>
          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto'></div>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-950 via-black to-slate-950 text-gray-100 flex items-center justify-center'>
      <div className='text-center max-w-md mx-auto p-6'>
        <XCircle className='w-16 h-16 text-red-400 mx-auto mb-4' />
        <h1 className='text-2xl font-bold text-white mb-2'>
          Unable to Process Invitation
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

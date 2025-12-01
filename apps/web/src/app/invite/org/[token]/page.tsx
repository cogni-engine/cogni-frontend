'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { acceptOrganizationInvitation } from '@/lib/api/organizationInvitationsApi';
import { createClient } from '@/lib/supabase/browserClient';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function AcceptOrganizationInvitePage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [status, setStatus] = useState<
    'checking' | 'accepting' | 'success' | 'error'
  >('checking');
  const [error, setError] = useState<string | null>(null);
  const [organizationName, setOrganizationName] = useState<string>('');

  useEffect(() => {
    const processInvitation = async () => {
      try {
        const supabase = createClient();

        // Check if user is authenticated
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          // Not authenticated - redirect to login with return URL
          const returnUrl = encodeURIComponent(`/invite/org/${token}`);
          router.push(`/login?redirect=${returnUrl}`);
          return;
        }

        // User is authenticated - accept invitation
        setStatus('accepting');
        const result = await acceptOrganizationInvitation(token);

        setOrganizationName(result.organization_name);
        setStatus('success');

        // Redirect to organizations page after 2 seconds
        setTimeout(() => {
          router.push('/user/organizations');
        }, 2000);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to accept invitation'
        );
        setStatus('error');
      }
    };

    if (token) {
      processInvitation();
    }
  }, [token, router]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center p-4'>
      <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl'>
        {status === 'checking' && (
          <div className='text-center space-y-4'>
            <Loader2 className='h-16 w-16 text-purple-400 animate-spin mx-auto' />
            <div>
              <h2 className='text-2xl font-bold text-white mb-2'>
                Checking Invitation
              </h2>
              <p className='text-white/70'>Please wait...</p>
            </div>
          </div>
        )}

        {status === 'accepting' && (
          <div className='text-center space-y-4'>
            <Loader2 className='h-16 w-16 text-blue-400 animate-spin mx-auto' />
            <div>
              <h2 className='text-2xl font-bold text-white mb-2'>
                Joining Organization
              </h2>
              <p className='text-white/70'>This will only take a moment...</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className='text-center space-y-4'>
            <CheckCircle2 className='h-16 w-16 text-green-400 mx-auto' />
            <div>
              <h2 className='text-2xl font-bold text-white mb-2'>
                Welcome! 🎉
              </h2>
              <p className='text-white/90'>
                You&apos;ve successfully joined{' '}
                <span className='font-semibold text-purple-300'>
                  {organizationName}
                </span>
              </p>
              <p className='text-white/60 text-sm mt-4'>
                Redirecting to your organizations...
              </p>
            </div>
            <div className='flex items-center justify-center gap-2 mt-6'>
              <div className='h-2 w-2 bg-purple-400 rounded-full animate-bounce' />
              <div
                className='h-2 w-2 bg-purple-400 rounded-full animate-bounce'
                style={{ animationDelay: '0.1s' }}
              />
              <div
                className='h-2 w-2 bg-purple-400 rounded-full animate-bounce'
                style={{ animationDelay: '0.2s' }}
              />
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className='text-center space-y-4'>
            <XCircle className='h-16 w-16 text-red-400 mx-auto' />
            <div>
              <h2 className='text-2xl font-bold text-white mb-2'>
                Unable to Join
              </h2>
              <p className='text-white/90 mb-4'>{error}</p>
              <div className='space-y-2'>
                <p className='text-white/60 text-sm'>
                  This invitation may have expired or already been used.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push('/user/organizations')}
              className='mt-6 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-medium transition-colors w-full'
            >
              Go to Organizations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

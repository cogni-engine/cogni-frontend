'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { Suspense } from 'react';

function AuthErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error =
    searchParams.get('error') || 'An error occurred during authentication';

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 flex items-center justify-center p-4'>
      <div className='text-center max-w-md mx-auto p-6'>
        <XCircle className='w-16 h-16 text-red-400 mx-auto mb-4' />
        <h1 className='text-2xl font-bold text-white mb-2'>
          Verification Failed
        </h1>
        <p className='text-gray-400 mb-6'>{error}</p>
        <div className='space-y-3'>
          <button
            onClick={() => router.push('/login')}
            className='w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors'
          >
            Try Logging In
          </button>
          <button
            onClick={() => router.push('/register')}
            className='w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors'
          >
            Sign Up Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 flex items-center justify-center p-4'>
          <div className='text-center max-w-md mx-auto p-6'>
            <div className='animate-pulse'>Loading...</div>
          </div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}

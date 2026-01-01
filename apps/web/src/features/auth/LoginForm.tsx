'use client';

import { useState } from 'react';
import { useAuth } from '@cogni/api';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPendingInviteToken } from '@cogni/utils';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    handleSignIn,
    handleSignInWithGoogle,
    handleSignInWithApple,
    loading,
    error,
  } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignIn(email, password);

    // Check for invite token in URL or cookie
    const inviteFromUrl = searchParams.get('invite');
    const inviteFromCookie = getPendingInviteToken();
    const inviteToken = inviteFromUrl || inviteFromCookie;

    if (inviteToken) {
      router.push(`/invite/${inviteToken}`);
    } else {
      router.push('/home');
    }
  };

  return (
    <div className='w-full bg-zinc-900/80 rounded-3xl p-8 shadow-2xl backdrop-blur-sm'>
      <h1 className='text-2xl font-semibold mb-6 text-center'>
        Sign in to Cogni Engine
      </h1>

      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          className='bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
          required
        />
        <button
          type='submit'
          disabled={loading}
          className='w-full inline-flex items-center justify-center rounded-full border border-zinc-600 px-6 py-3 font-semibold text-white transition hover:bg-zinc-800 active:scale-95 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] disabled:opacity-60 disabled:cursor-not-allowed'
        >
          {loading ? (
            <span className='inline-flex items-center gap-2'>
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white' />
              <span>Signing in...</span>
            </span>
          ) : (
            'Sign in'
          )}
        </button>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </form>

      <div className='relative my-6'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-zinc-700'></div>
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-zinc-900/80 text-gray-400'>
            Or continue with
          </span>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <button
          type='button'
          onClick={handleSignInWithGoogle}
          disabled={loading}
          className='w-full inline-flex items-center justify-center gap-3 rounded-full border border-zinc-600 px-6 py-3 font-semibold text-white transition hover:bg-zinc-800 active:scale-95 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] disabled:opacity-60 disabled:cursor-not-allowed'
        >
          <svg className='w-5 h-5' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            />
            <path
              fill='currentColor'
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            />
            <path
              fill='currentColor'
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
            />
            <path
              fill='currentColor'
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <button
          type='button'
          onClick={handleSignInWithApple}
          disabled={loading}
          className='w-full inline-flex items-center justify-center gap-3 rounded-full border border-zinc-600 px-6 py-3 font-semibold text-white transition hover:bg-zinc-800 active:scale-95 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] disabled:opacity-60 disabled:cursor-not-allowed'
        >
          <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.16c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z' />
          </svg>
          <span>Continue with Apple</span>
        </button>
      </div>

      <div className='mt-8 text-center'>
        <p className='text-gray-300 mb-3'>Don’t have an account?</p>
        <Link
          href='/register'
          className='text-blue-400 hover:text-blue-300 font-semibold transition-colors'
        >
          Create account
        </Link>
      </div>
    </div>
  );
}

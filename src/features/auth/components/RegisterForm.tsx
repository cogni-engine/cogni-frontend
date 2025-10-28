'use client';

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { handleSignUp, loading, error } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignUp(email, password);
    if (!error) {
      setSubmitted(true);
    }
  };

  // Show email verification message after signup
  if (submitted) {
    return (
      <div className='w-full bg-zinc-900/80 rounded-3xl p-8 shadow-2xl backdrop-blur-sm'>
        <h1 className='text-2xl font-semibold mb-6 text-center'>
          Check your email
        </h1>
        <div className='space-y-4'>
          <div className='bg-blue-500/10 border border-blue-500/20 rounded-lg p-4'>
            <p className='text-gray-300'>
              We&apos;ve sent a verification link to{' '}
              <strong className='text-white'>{email}</strong>
            </p>
            <p className='text-gray-400 text-sm mt-2'>
              Click the link in the email to verify your account and complete
              registration.
            </p>
          </div>
          <p className='text-gray-400 text-sm text-center'>
            Didn&apos;t receive an email? Check your spam folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full bg-zinc-900/80 rounded-3xl p-8 shadow-2xl backdrop-blur-sm'>
      <h1 className='text-2xl font-semibold mb-6 text-center'>
        Create your account
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
              <span>Creating Account...</span>
            </span>
          ) : (
            'Create account'
          )}
        </button>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </form>

      <div className='mt-8 text-center'>
        <p className='text-gray-300 mb-3'>Already have an account?</p>
        <Link
          href='/login'
          className='text-blue-400 hover:text-blue-300 font-semibold transition-colors'
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@cogni/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const { handleResetPassword, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleResetPassword(email);
    if (result.success) {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black px-4'>
        <div className='w-full max-w-md bg-zinc-900/50 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/10'>
          <div className='flex flex-col items-center mb-8'>
            <Image
              src='/favicon.svg'
              alt='Cogno'
              width={40}
              height={40}
              className='rounded-xl mb-6'
            />
            <h1 className='text-2xl font-semibold text-center text-white mb-2'>
              Check your email
            </h1>
            <p className='text-gray-400 text-center'>
              We&apos;ve sent a password reset link to{' '}
              <span className='text-white font-medium'>{email}</span>
            </p>
          </div>

          <div className='text-center'>
            <Link
              href='/login'
              className='text-blue-400 hover:text-blue-300 transition-colors font-medium'
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-black px-4'>
      <div className='w-full max-w-md bg-zinc-900/50 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/10'>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            input:-webkit-autofill:active {
              transition: background-color 5000s ease-in-out 0s;
              -webkit-text-fill-color: white !important;
            }
          `,
          }}
        />
        <div className='flex flex-col items-center mb-8'>
          <Image
            src='/favicon.svg'
            alt='Cogno'
            width={40}
            height={40}
            className='rounded-xl mb-6'
          />
          <h1 className='text-2xl font-semibold text-center text-white mb-2'>
            Reset your password
          </h1>
          <p className='text-gray-400 text-center text-sm'>
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full bg-transparent text-white text-base py-2 border-b border-zinc-700 focus:outline-none placeholder:text-gray-500 caret-white'
              autoComplete='email'
              required
            />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type='submit'
            disabled={loading}
            className='w-full inline-flex items-center justify-center rounded-full bg-white px-6 py-2 font-medium text-black transition hover:bg-gray-100 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? (
              <span className='inline-flex items-center gap-2'>
                <span className='h-4 w-4 animate-spin rounded-full border-2 border-black/40 border-t-black' />
                <span>Sending...</span>
              </span>
            ) : (
              'Send reset link'
            )}
          </button>

          <div className='text-center'>
            <Link
              href='/login'
              className='text-gray-400 hover:text-white transition-colors text-sm'
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

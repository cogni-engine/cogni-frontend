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
      <div className='min-h-screen flex items-center justify-center bg-background px-4'>
        <div className='w-full max-w-md bg-dialog-bg rounded-3xl p-8 shadow-2xl dark:backdrop-blur-sm border border-border-default'>
          <div className='flex flex-col items-center mb-8'>
            <Image
              src='/favicon.svg'
              alt='Cogno'
              width={40}
              height={40}
              className='rounded-xl mb-6'
            />
            <h1 className='text-2xl font-semibold text-center text-text-primary mb-2'>
              Check your email
            </h1>
            <p className='text-text-muted text-center'>
              We&apos;ve sent a password reset link to{' '}
              <span className='text-text-primary font-medium'>{email}</span>
            </p>
          </div>

          <div className='text-center'>
            <Link
              href='/login'
              className='text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium'
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4'>
      <div className='w-full max-w-md bg-dialog-bg rounded-3xl p-8 shadow-2xl dark:backdrop-blur-sm border border-border-default'>
        <div className='flex flex-col items-center mb-8'>
          <Image
            src='/favicon.svg'
            alt='Cogno'
            width={40}
            height={40}
            className='rounded-xl mb-6'
          />
          <h1 className='text-2xl font-semibold text-center text-text-primary mb-2'>
            Reset your password
          </h1>
          <p className='text-text-muted text-center text-sm'>
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
              className='w-full bg-transparent text-text-primary text-base py-2 border-b border-border-default focus:outline-none placeholder:text-input-placeholder caret-text-primary'
              autoComplete='email'
              required
            />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type='submit'
            disabled={loading}
            className='w-full inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2 font-medium text-background transition hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? (
              <span className='inline-flex items-center gap-2'>
                <span className='h-4 w-4 animate-spin rounded-full border-2 border-background/40 border-t-background' />
                <span>Sending...</span>
              </span>
            ) : (
              'Send reset link'
            )}
          </button>

          <div className='text-center'>
            <Link
              href='/login'
              className='text-text-muted hover:text-text-primary transition-colors text-sm'
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

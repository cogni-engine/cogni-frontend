'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth, getClient } from '@cogni/api';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { handleUpdatePassword, loading, error } = useAuth();
  const router = useRouter();
  const [validationError, setValidationError] = useState('');

  // Listen for PASSWORD_RECOVERY event
  useEffect(() => {
    const supabase = getClient();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          console.log('Password recovery event received');
          // User has clicked the reset link and is ready to set a new password
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    const result = await handleUpdatePassword(password);

    if (result.success) {
      // Redirect to login with success message
      router.push('/login?message=password-updated');
    }
  };

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
            Set new password
          </h1>
          <p className='text-gray-400 text-center text-sm'>
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='New password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full bg-transparent text-white text-base py-2 pr-10 border-b border-zinc-700 focus:outline-none placeholder:text-gray-500 caret-white'
              autoComplete='new-password'
              required
            />
          </div>

          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className='w-full bg-transparent text-white text-base py-2 pr-10 border-b border-zinc-700 focus:outline-none placeholder:text-gray-500 caret-white'
              autoComplete='new-password'
              required
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-0 bottom-2 text-gray-400 hover:text-gray-300 p-1'
              tabIndex={-1}
            >
              {showPassword ? (
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  />
                </svg>
              ) : (
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                  />
                </svg>
              )}
            </button>
          </div>

          {(error || validationError) && (
            <p className='text-red-500 text-sm'>{error || validationError}</p>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full inline-flex items-center justify-center rounded-full bg-white px-6 py-2 font-medium text-black transition hover:bg-gray-100 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? (
              <span className='inline-flex items-center gap-2'>
                <span className='h-4 w-4 animate-spin rounded-full border-2 border-black/40 border-t-black' />
                <span>Updating password...</span>
              </span>
            ) : (
              'Update password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

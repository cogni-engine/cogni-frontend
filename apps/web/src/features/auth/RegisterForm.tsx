'use client';

import { useState } from 'react';
import { useAuth } from '@cogni/api';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    handleSignUp,
    handleSignInWithGoogle,
    handleSignInWithApple,
    loading,
    error,
  } = useAuth();

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
      <div className='fixed inset-0 flex items-center justify-center px-4'>
        <div className='w-full max-w-[500px] md:w-[500px] rounded-3xl md:border border-white/10 p-6 md:p-12 shadow-2xl backdrop-blur-sm'>
          {/* Logo */}
          <div className='flex justify-center mb-8'>
            <Image
              src='/favicon.jpg'
              alt='Cogno'
              width={72}
              height={72}
              className='rounded-xl'
            />
          </div>

          {/* Heading */}
          <h1 className='text-3xl md:text-4xl font-bold text-white text-center mb-6 md:mb-8'>
            Verify your email
          </h1>

          {/* Message */}
          <div className='space-y-6 mb-8'>
            <p className='text-gray-300 text-base md:text-lg text-center leading-relaxed px-4'>
              Please verify your email address by clicking the link sent to{' '}
              <strong className='text-white font-semibold'>{email}</strong>
            </p>

            {/* Resend Button */}
            <div className='flex justify-center pt-4 px-4'>
              <button
                type='button'
                onClick={() => {
                  // Handle resend logic here
                }}
                className='w-full max-w-md px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white font-medium text-base md:text-lg'
              >
                Resend Verification Email
              </button>
            </div>
          </div>

          {/* Support */}
          <div className='pt-8 border-t border-white/10'>
            <p className='text-gray-400 text-center text-sm'>
              Questions? Email us at{' '}
              <a
                href='mailto:support@cogno.ai'
                className='text-blue-400 hover:text-blue-300 transition-colors'
              >
                support@cogno.ai
              </a>
            </p>
          </div>

          {/* Footer */}
          <div className='mt-6 pt-8 border-t border-white/10'>
            <p className='text-gray-500 text-center text-sm'>
              Thanks,
              <br />
              <span className='font-medium text-gray-400'>Cogno Team</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full max-w-2xl rounded-3xl p-8 shadow-2xl backdrop-blur-sm'>
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
        <h1 className='text-2xl font-semibold text-center'>
          Create your account
        </h1>
      </div>

      <div className='flex flex-col gap-3 mb-6'>
        <button
          type='button'
          onClick={handleSignInWithGoogle}
          disabled={loading}
          className='w-full inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-2 font-medium text-black transition hover:bg-gray-100 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed'
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
          <span>Sign up with Google</span>
        </button>

        <button
          type='button'
          onClick={handleSignInWithApple}
          disabled={loading}
          className='w-full inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-2 font-medium text-black transition hover:bg-gray-100 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed'
        >
          <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.16c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z' />
          </svg>
          <span>Sign up with Apple</span>
        </button>
      </div>

      <div className='relative my-6'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-zinc-700'></div>
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-zinc-900/80 text-gray-400'>OR</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className='flex flex-col gap-6'>
        <div>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full bg-transparent text-white text-base py-2 border-b border-zinc-700 focus:outline-none placeholder:text-gray-500 caret-white'
            autoComplete='off'
            required
          />
        </div>
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='w-full bg-transparent text-white text-base py-2 pr-10 border-b border-zinc-700 focus:outline-none placeholder:text-gray-500 caret-white'
            autoComplete='off'
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
        <button
          type='submit'
          disabled={loading}
          className='w-full inline-flex items-center justify-center rounded-full bg-white px-6 py-2 font-medium text-black transition hover:bg-gray-100 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed'
        >
          {loading ? (
            <span className='inline-flex items-center gap-2'>
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-black/40 border-t-black' />
              <span>Creating Account...</span>
            </span>
          ) : (
            'Create account'
          )}
        </button>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </form>

      <div className='mt-8 text-center'>
        <p className='text-gray-300'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='text-blue-400 hover:text-blue-300 font-medium transition-colors'
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

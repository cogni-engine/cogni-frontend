import { LoginForm } from '@/features/auth';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className='w-full bg-zinc-900/80 rounded-3xl p-8 shadow-2xl backdrop-blur-sm'>
          <div className='text-center text-gray-400'>Loading...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

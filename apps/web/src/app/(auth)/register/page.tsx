import { RegisterForm } from '@/features/auth';
import { Suspense } from 'react';

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className='w-full bg-dialog-bg rounded-3xl p-8 shadow-2xl dark:backdrop-blur-sm'>
          <div className='text-center text-text-muted'>Loading...</div>
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}

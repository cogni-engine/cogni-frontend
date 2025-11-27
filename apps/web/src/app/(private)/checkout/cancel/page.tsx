'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';
import GlassCard from '@/components/glass-card/GlassCard';
import { Button } from '@/components/ui/button';

export default function CheckoutCancelPage() {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center min-h-screen px-4'>
      <GlassCard className='max-w-md w-full p-8'>
        <div className='space-y-6 text-center'>
          <div className='flex justify-center'>
            <div className='rounded-full bg-red-500/20 p-4'>
              <XCircle className='h-12 w-12 text-red-400' />
            </div>
          </div>

          <div className='space-y-2'>
            <h1 className='text-3xl font-bold text-white'>
              Checkout Cancelled
            </h1>
            <p className='text-white/60'>
              Your checkout was cancelled. No charges were made.
            </p>
          </div>

          <div className='flex flex-col gap-3 pt-4'>
            <Button
              onClick={() => router.push('/home')}
              className='w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white border-transparent'
            >
              Return to Home
            </Button>
            <Button
              onClick={() => router.back()}
              variant='outline'
              className='w-full'
            >
              Try Again
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

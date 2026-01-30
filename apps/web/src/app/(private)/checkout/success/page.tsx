'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Sparkles } from 'lucide-react';
import GlassButton from '@/components/glass-design/GlassButton';

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscriptionPlan = searchParams.get('plan');

  return (
    <div className='flex items-center justify-center min-h-screen px-4'>
      <div className='space-y-6 text-center'>
        <div className='flex justify-center'>
          <div className='rounded-full bg-green-500/20 p-4'>
            <CheckCircle className='h-12 w-12 text-green-400' />
          </div>
        </div>

        <div className='space-y-2'>
          <h1 className='text-3xl font-bold text-white'>Payment Successful!</h1>
          <p className='text-white/60'>
            Your subscription has been activated successfully.
          </p>
        </div>

        {subscriptionPlan && (
          <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
            <p className='text-sm text-white/60 mb-1'>Current Plan</p>
            <div className='flex items-center justify-center gap-2'>
              <p className='text-xl font-semibold text-white capitalize'>
                {subscriptionPlan}
              </p>
              <Sparkles className='h-5 w-5 text-purple-400' />
            </div>
          </div>
        )}

        <div className='flex flex-col gap-3 pt-4'>
          <GlassButton
            onClick={() => router.push('/workspace')}
            className='flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all bg-blue-500/15 text-blue-300 border-blue-500/20 hover:bg-blue-500/25 hover:text-blue-200 hover:border-blue-500/40 hover:scale-105 w-full'
          >
            Get Started
          </GlassButton>
          <GlassButton
            onClick={() => router.push('/user/subscription')}
            variant='outline'
            className='w-full hover:scale-105'
          >
            Manage Subscription
          </GlassButton>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center min-h-screen px-4'>
          <div className='space-y-6 text-center'>
            <div className='flex justify-center'>
              <div className='rounded-full bg-green-500/20 p-4'>
                <CheckCircle className='h-12 w-12 text-green-400' />
              </div>
            </div>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold text-white'>
                Payment Successful!
              </h1>
              <p className='text-white/60'>Loading...</p>
            </div>
          </div>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}

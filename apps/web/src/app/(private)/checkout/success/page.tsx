'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import GlassCard from '@/components/glass-design/GlassCard';
import { Button } from '@/components/ui/button';

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscriptionPlan = searchParams.get('plan');

  return (
    <div className='flex items-center justify-center min-h-screen px-4'>
      <GlassCard className='max-w-md w-full p-8'>
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
            <p className='text-white/60'>
              Your subscription has been activated successfully.
            </p>
          </div>

          {subscriptionPlan && (
            <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
              <p className='text-sm text-white/60 mb-1'>Current Plan</p>
              <p className='text-xl font-semibold text-white capitalize'>
                {subscriptionPlan}
              </p>
            </div>
          )}

          <div className='flex flex-col gap-3 pt-4'>
            <Button
              onClick={() => router.push('/workspace')}
              className='w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white border-transparent'
            >
              Return to Home
            </Button>
            <Button
              onClick={() => router.push('/user/subscription')}
              variant='outline'
              className='w-full'
            >
              Manage Subscription
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center min-h-screen px-4'>
          <GlassCard className='max-w-md w-full p-8'>
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
          </GlassCard>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}

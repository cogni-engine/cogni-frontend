'use client';

import * as React from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type CheckoutFormProps = {
  planName: string;
  planPrice: string;
  onSuccess: () => void;
};

export function CheckoutForm({
  planName,
  planPrice,
  onSuccess,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || 'An error occurred');
        setIsLoading(false);
        return;
      }

      // For subscriptions, confirmPayment works the same way
      // The clientSecret from subscription.latest_invoice.payment_intent is used
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        setError(confirmError.message || 'Payment failed');
        setIsLoading(false);
      } else {
        // Payment succeeded
        onSuccess();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-4'>
        <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
          <PaymentElement />
        </div>
      </div>

      {error && (
        <div className='rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-300'>
          {error}
        </div>
      )}

      <div className='flex flex-col gap-4'>
        <Button
          type='submit'
          disabled={!stripe || !elements || isLoading}
          className='w-full rounded-full bg-blue-500 hover:bg-blue-600 text-white border-transparent'
        >
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Processing...
            </>
          ) : (
            `Confirm Payment - ${planPrice}`
          )}
        </Button>
        <p className='text-xs text-center text-white/60'>
          By confirming, you agree to subscribe to {planName} plan
        </p>
      </div>
    </form>
  );
}

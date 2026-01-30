import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

type SwitchToTeamBillingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitch: () => Promise<string>;
  onCheckoutComplete: () => void;
  isSwitching: boolean;
};

export function SwitchToTeamBillingDialog({
  open,
  onOpenChange,
  onSwitch,
  onCheckoutComplete,
  isSwitching,
}: SwitchToTeamBillingDialogProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleSwitch = async () => {
    try {
      const secret = await onSwitch();
      setClientSecret(secret);
    } catch (error) {
      console.error('Failed to switch to team billing:', error);
    }
  };

  const fetchClientSecret = useCallback(async () => {
    if (clientSecret) {
      return clientSecret;
    }
    throw new Error('Client secret not available');
  }, [clientSecret]);

  const handleClose = (open: boolean) => {
    if (!open) {
      setClientSecret(null);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='bg-gray-900 border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Switch to Team Billing</DialogTitle>
          <DialogDescription className='text-white/60'>
            Switching to team billing will:
            <ul className='list-disc list-inside mt-2 space-y-1'>
              <li>
                Cancel your current Pro subscription at the end of the billing
                period
              </li>
              <li>Create a new team organization with Business plan</li>
              <li>Allow you to invite team members and manage permissions</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        {!clientSecret ? (
          <div className='flex justify-end gap-3 mt-4'>
            <Button
              variant='outline'
              onClick={() => handleClose(false)}
              disabled={isSwitching}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSwitch}
              disabled={isSwitching}
              className='bg-blue-500 hover:bg-blue-600'
            >
              {isSwitching ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Processing...
                </>
              ) : (
                'Continue to Checkout'
              )}
            </Button>
          </div>
        ) : (
          <div className='mt-4'>
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{
                fetchClientSecret,
                onComplete: onCheckoutComplete,
              }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

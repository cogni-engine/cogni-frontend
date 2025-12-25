'use client';

import { useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useServiceWorkerUpdate } from '@/hooks/useServiceWorkerUpdate';
import GlassCard from '@/components/glass-design/GlassCard';

export function ServiceWorkerUpdatePrompt() {
  const { updateAvailable, reloadToUpdate } = useServiceWorkerUpdate();
  const toastIdRef = useRef<string | null>(null);
  const hasShownToastRef = useRef(false);

  useEffect(() => {
    // Only show toast once when update becomes available
    if (updateAvailable && !hasShownToastRef.current) {
      hasShownToastRef.current = true;

      const toastId = toast(
        t => (
          <GlassCard className='flex items-center gap-4 rounded-2xl px-4 py-3 bg-white/10'>
            <div className='flex-1'>
              <p className='font-medium text-sm text-white/90'>
                New version available
              </p>
              <p className='text-xs text-white/40 mt-0.5'>
                Reload when ready to update
              </p>
            </div>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                reloadToUpdate();
              }}
              className='px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-white/20'
            >
              Reload
            </button>
          </GlassCard>
        ),
        {
          duration: Infinity, // Don't auto-dismiss
          position: 'top-center',
        }
      );

      toastIdRef.current = toastId;
    }
  }, [updateAvailable, reloadToUpdate]);

  // Reset the ref when update is no longer available (after reload)
  useEffect(() => {
    if (!updateAvailable) {
      hasShownToastRef.current = false;
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = null;
      }
    }
  }, [updateAvailable]);

  return (
    <Toaster
      containerStyle={{
        top: 20,
      }}
      toastOptions={{
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
        },
      }}
    />
  );
}

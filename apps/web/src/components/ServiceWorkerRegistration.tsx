'use client';

import { useEffect, useState } from 'react';
import { registerServiceWorker } from '@/lib/serviceWorker';

/**
 * Service Worker registration component
 *
 * Registers the Service Worker when the app loads
 * Only renders on client side to prevent hydration mismatches
 */
export function ServiceWorkerRegistration() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    registerServiceWorker();
  }, []);

  // Don't render anything during SSR
  if (!mounted) {
    return null;
  }

  return null;
}

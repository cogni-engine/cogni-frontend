'use client';

import { useEffect, useState, useRef } from 'react';
import { Workbox } from 'workbox-window';

export function useServiceWorkerUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const workboxRef = useRef<Workbox | null>(null);

  useEffect(() => {
    // Only run in browser and in production
    if (
      typeof window === 'undefined' ||
      process.env.NODE_ENV === 'development'
    ) {
      return;
    }

    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
      return;
    }

    // Initialize Workbox and register the service worker
    const wb = new Workbox('/sw.js', { type: 'classic' });
    workboxRef.current = wb;

    // Detect when a service worker is waiting
    const handleWaiting = () => {
      setUpdateAvailable(true);
    };

    // Register event listeners
    wb.addEventListener('waiting', handleWaiting);

    // Register the service worker
    wb.register()
      .then(registration => {
        // Check if there's already a waiting service worker
        if (registration?.waiting) {
          // A service worker is already waiting
          setUpdateAvailable(true);
        }
      })
      .catch(error => {
        // Service worker registration failed (e.g., no service worker file)
        console.debug('Service worker registration failed:', error);
      });

    return () => {
      wb.removeEventListener('waiting', handleWaiting);
    };
  }, []);

  const reloadToUpdate = () => {
    if (workboxRef.current) {
      // Tell the waiting service worker to skip waiting and activate
      workboxRef.current.messageSkipWaiting();
      // Reload the page after a short delay to allow the SW to activate
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  return { updateAvailable, reloadToUpdate };
}

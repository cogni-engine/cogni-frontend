'use client';

import { useOfflineStore } from '@/stores/useOfflineStore';
import { Wifi, WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Offline banner component
 *
 * Displays a banner at the top of the screen when the app is offline.
 * Uses common UI for all offline scenarios (as discussed).
 *
 * Handles two scenarios internally:
 * 1. App starts offline - shows banner immediately
 * 2. Goes offline during use - shows banner with animation
 */
export function OfflineBanner() {
  const { isOnline, scenario, hasMounted } = useOfflineStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Only render on client side (after hydration)
  // This prevents hydration mismatches
  useEffect(() => {
    if (!hasMounted) return;

    if (!isOnline) {
      // If we went offline during use, animate in
      if (scenario === 'offline-during-use') {
        setIsAnimating(true);
        // Small delay for animation
        setTimeout(() => setIsVisible(true), 10);
      } else {
        // If we started offline, show immediately
        setIsVisible(true);
        setIsAnimating(false);
      }
    } else {
      // Hide banner when online
      setIsVisible(false);
      setIsAnimating(false);
    }
  }, [isOnline, scenario, hasMounted]);

  // Don't render until mounted (prevents hydration mismatch)
  if (!hasMounted || isOnline || !isVisible) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed top-2 left-0 right-0 z-[120] flex justify-center transition-all duration-300 ${
        isAnimating || scenario === 'offline-on-mount'
          ? 'translate-y-0 opacity-100'
          : '-translate-y-4 opacity-0'
      }`}
      role='alert'
      aria-live='polite'
    >
      <div className='pointer-events-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400/90 via-amber-300/90 to-yellow-400/90 px-4 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.45)]'>
        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-black/60'>
          <WifiOff className='h-3.5 w-3.5 text-yellow-200' />
        </div>
        <span className='text-xs font-semibold tracking-wide text-black/90'>
          オフラインです · 一部の機能が使えません
        </span>
      </div>
    </div>
  );
}

/**
 * Online indicator component
 *
 * Shows a green banner for a few seconds when connection is restored (only when switching from yellow banner in-app).
 * Hides immediately when going offline so it never overlaps with the yellow banner.
 */
export function OnlineIndicator() {
  const scenario = useOfflineStore(state => state.scenario);
  const hasMounted = useOfflineStore(state => state.hasMounted);
  const isOnline = useOfflineStore(state => state.isOnline);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasMounted) return;
    if (scenario !== 'online-restored' || !isOnline) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [scenario, hasMounted, isOnline]);

  if (!visible) return null;

  return (
    <div
      className='pointer-events-none fixed top-2 left-0 right-0 z-[130] flex justify-center transition-all duration-300'
      role='status'
      aria-live='polite'
    >
      <div className='pointer-events-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400/90 via-teal-300/90 to-emerald-400/90 px-4 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.45)]'>
        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-black/60'>
          <Wifi className='h-3.5 w-3.5 text-emerald-200' />
        </div>
        <span className='text-xs font-semibold tracking-wide text-black/90'>
          オンラインに復帰しました
        </span>
      </div>
    </div>
  );
}

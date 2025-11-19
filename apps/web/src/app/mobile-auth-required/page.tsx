'use client';

import { useEffect } from 'react';

export default function MobileAuthRequiredPage() {
  useEffect(() => {
    // Send message to native app that authentication is required
    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'AUTH_REQUIRED',
          reason: 'Session expired or invalid',
        })
      );
    }
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen bg-black text-white'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
        <h1 className='text-2xl font-bold mb-4'>Authentication Required</h1>
        <p className='text-gray-400'>Redirecting to login...</p>
      </div>
    </div>
  );
}

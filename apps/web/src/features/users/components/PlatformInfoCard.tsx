'use client';

import { useFullPlatformInfo } from '@/stores/usePlatformStore';

export function PlatformInfoCard() {
  const platform = useFullPlatformInfo();

  return (
    <div className='rounded-lg border border-white/10 bg-white/5 p-6'>
      <h2 className='mb-4 text-lg font-semibold text-white'>
        Platform Information
      </h2>
      <div className='space-y-3'>
        <div className='flex justify-between'>
          <span className='text-white/60'>Platform:</span>
          <span className='font-medium text-white capitalize'>
            {platform.platform}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-white/60'>Operating System:</span>
          <span className='font-medium text-white uppercase'>
            {platform.os}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-white/60'>Running in WebView:</span>
          <span className='font-medium text-white'>
            {platform.isInWebView ? 'Yes' : 'No'}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-white/60'>Screen Size:</span>
          <span className='font-medium text-white'>
            {platform.isMobile ? 'Mobile' : 'Desktop'}
          </span>
        </div>
        <div className='mt-4 pt-4 border-t border-white/10'>
          <span className='text-xs text-white/40 block mb-1'>User Agent:</span>
          <span className='text-xs text-white/60 break-all font-mono'>
            {platform.userAgent}
          </span>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useFullPlatformInfo } from '@/stores/usePlatformStore';

export function PlatformInfoCard() {
  const platform = useFullPlatformInfo();

  return (
    <div className='rounded-lg border border-border-default bg-card-bg p-6'>
      <h2 className='mb-4 text-lg font-semibold text-text-primary'>
        Platform Information
      </h2>
      <div className='space-y-3'>
        <div className='flex justify-between'>
          <span className='text-text-secondary'>Platform:</span>
          <span className='font-medium text-text-primary capitalize'>
            {platform.platform}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-text-secondary'>Operating System:</span>
          <span className='font-medium text-text-primary uppercase'>
            {platform.os}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-text-secondary'>Running in WebView:</span>
          <span className='font-medium text-text-primary'>
            {platform.isInWebView ? 'Yes' : 'No'}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-text-secondary'>Screen Size:</span>
          <span className='font-medium text-text-primary'>
            {platform.isMobile ? 'Mobile' : 'Desktop'}
          </span>
        </div>
        <div className='mt-4 pt-4 border-t border-border-default'>
          <span className='text-xs text-text-muted block mb-1'>
            User Agent:
          </span>
          <span className='text-xs text-text-secondary break-all font-mono'>
            {platform.userAgent}
          </span>
        </div>
      </div>
    </div>
  );
}

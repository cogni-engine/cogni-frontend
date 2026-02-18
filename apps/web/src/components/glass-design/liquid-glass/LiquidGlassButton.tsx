'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export type LiquidGlassButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const LiquidGlassButton = React.forwardRef<
  HTMLButtonElement,
  LiquidGlassButtonProps
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'relative flex items-center justify-center bg-transparent rounded-full border-none outline-none cursor-pointer',
      className
    )}
    {...props}
  >
    {/* Glass blur + distortion layer */}
    <div
      className='absolute inset-0 rounded-full overflow-hidden isolate backdrop-saturate-[1.8] backdrop-blur-[2px]'
      style={{
        filter: 'url(#btn-glass)',
        // backgroundColor: 'color-mix(in srgb, white 12%, transparent)',
      }}
    />

    {/* Inner glow border */}
    <div className='liquid-glass-border absolute inset-0 rounded-full overflow-hidden shadow-[inset_2px_2px_0px_-2px_rgba(255,255,255,0.7),inset_0_0_3px_1px_rgba(255,255,255,0.7)] pointer-events-none' />

    {/* Content */}
    <span className='relative z-10'>{children}</span>
  </button>
));

LiquidGlassButton.displayName = 'LiquidGlassButton';

export default LiquidGlassButton;

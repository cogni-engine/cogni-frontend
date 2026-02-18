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
      'liquid-glass-button relative flex items-center justify-center rounded-full border-none outline-none cursor-pointer isolate backdrop-blur-sm',
      className
    )}
    {...props}
  >
    {/* Glass blur + distortion layer */}
    <div
      className='liquid-glass-button-blur absolute inset-0 rounded-full overflow-hidden isolate backdrop-saturate-[1.8] backdrop-blur-[2px]'
      style={{
        filter: 'url(#btn-glass)',
      }}
    />

    {/* White tint layer */}
    <div className='liquid-glass-button-tint absolute inset-0 rounded-full bg-white/5 pointer-events-none' />

    {/* Inner glow border */}
    <div className='liquid-glass-border liquid-glass-button-border absolute inset-0 rounded-full overflow-hidden pointer-events-none' />

    {/* Content */}
    <span className='relative z-10'>{children}</span>
  </button>
));

LiquidGlassButton.displayName = 'LiquidGlassButton';

export default LiquidGlassButton;

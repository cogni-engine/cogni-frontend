'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export type GlassCardProps = React.HTMLAttributes<HTMLDivElement>;

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative isolate backdrop-blur-[4px]', className)}
      {...props}
    >
      {/* Glass blur + distortion layer */}
      {/* <div className='absolute inset-0 -z-10 rounded-[inherit] overflow-hidden isolate liquid-glass-blur' /> */}

      {/* Border layer — not affected by distortion filter */}
      <div className='absolute inset-0 -z-10 rounded-[inherit] pointer-events-none liquid-glass-border' />

      {children}
    </div>
  )
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;

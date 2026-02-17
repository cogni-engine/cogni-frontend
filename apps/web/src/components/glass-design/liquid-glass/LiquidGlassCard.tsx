'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export type GlassCardProps = React.HTMLAttributes<HTMLDivElement>;

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('relative', className)} {...props}>
      {/* Glass blur + distortion layer */}
      <div className='absolute inset-0 rounded-[inherit] overflow-hidden isolate liquid-glass-blur' />

      {/* Border layer — not affected by distortion filter */}
      <div className='absolute inset-0 rounded-[inherit] pointer-events-none liquid-glass-border' />

      {/* Content */}
      <div className='relative z-10'>{children}</div>
    </div>
  )
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;

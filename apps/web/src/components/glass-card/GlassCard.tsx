import * as React from 'react';

import { cn } from '@/lib/utils';

export type GlassCardProps = React.HTMLAttributes<HTMLDivElement>;

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-white/4 backdrop-blur-sm transition-all duration-300 border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]',
        className
      )}
      {...props}
    />
  )
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;

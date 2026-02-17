import * as React from 'react';

import { cn } from '@/lib/utils';

export type GlassCardProps = React.HTMLAttributes<HTMLDivElement>;

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-card-bg dark:backdrop-blur-sm transition-all duration-300 border border-card-border shadow-card hover:shadow-card-hover',
        className
      )}
      {...props}
    />
  )
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;

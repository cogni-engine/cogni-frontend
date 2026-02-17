'use client';

import * as React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type GlassButtonProps = ButtonProps;

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      className={cn(
        `
        bg-surface-primary
        dark:backdrop-blur-sm
        border border-border-default
        rounded-full
        p-2
        text-text-primary

        transition-all
        duration-200
        ease-out

        shadow-card

        hover:bg-interactive-hover
        hover:shadow-card-hover

        active:bg-interactive-active
        active:translate-y-px
        active:scale-[0.97]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-ring
        focus-visible:ring-offset-2
        focus-visible:ring-offset-transparent

        disabled:bg-surface-overlay
        disabled:border-border-subtle
        disabled:pointer-events-none
        disabled:shadow-none
        disabled:cursor-not-allowed
        `,
        className
      )}
      {...props}
    />
  )
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;

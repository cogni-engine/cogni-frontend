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
        bg-white/5
        backdrop-blur-sm
        border border-black/10
        rounded-full
        p-2
        text-black
      
        transition-all
        duration-200
        ease-out
      
        shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]
      
        hover:bg-white/10
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]
      
        active:bg-white/8
        active:translate-y-px
        active:scale-[0.97]
        active:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(0,0,0,0.25)]
      
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-white/30
        focus-visible:ring-offset-2
        focus-visible:ring-offset-transparent
      
        disabled:opacity-40
        disabled:pointer-events-none
        disabled:shadow-none
        `,
        className
      )}
      {...props}
    />
  )
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;

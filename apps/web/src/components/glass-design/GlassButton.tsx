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
        'bg-white/5 backdrop-blur-sm border border-black/10 rounded-full p-2 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/3 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] disabled:hover:shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]',
        className
      )}
      {...props}
    />
  )
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;

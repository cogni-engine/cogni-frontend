'use client';

import * as React from 'react';

import type { ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LiquidGlassButton from './liquid-glass/LiquidGlassButton';

export type GlassButtonProps = ButtonProps;

const sizeClasses: Record<string, string> = {
  default: 'h-9 px-4 py-2 text-sm font-medium',
  sm: 'h-8 px-3 text-sm font-medium',
  lg: 'h-10 px-8 text-sm font-medium',
  icon: 'h-9 w-9',
};

const variantClasses: Record<string, string> = {
  default: '',
  secondary: '',
  outline: 'border border-border-default',
  ghost:
    'shadow-none [&>div:first-child]:bg-transparent [&>div:first-child]:backdrop-saturate-100 [&>div:first-child]:[filter:none]',
  destructive: 'text-red-400',
};

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, size, variant, asChild: _asChild, ...props }, ref) => (
    <LiquidGlassButton
      ref={ref}
      className={cn(
        sizeClasses[size ?? 'default'],
        variantClasses[variant ?? 'default'],
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;

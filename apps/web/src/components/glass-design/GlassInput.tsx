'use client';

import * as React from 'react';
import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type GlassInputProps = InputProps;

const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, ...props }, ref) => (
    <Input
      ref={ref}
      className={cn(
        'bg-input-bg dark:backdrop-blur-sm border border-input-border text-text-primary placeholder:text-input-placeholder focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 transition-all duration-200',
        className
      )}
      {...props}
    />
  )
);

GlassInput.displayName = 'GlassInput';

export default GlassInput;

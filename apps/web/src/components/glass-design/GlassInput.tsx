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
        'bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder:text-white/40 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 transition-all duration-200',
        className
      )}
      {...props}
    />
  )
);

GlassInput.displayName = 'GlassInput';

export default GlassInput;

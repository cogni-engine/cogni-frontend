'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import NextImage from 'next/image';

import { cn } from '@/lib/utils';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/5 text-white',
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

type AvatarImageProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
> & {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
};

const AvatarImageComponent = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(
  (
    {
      className,
      src,
      alt,
      priority = false,
      sizes = '40px',
      quality = 85,
      ...props
    },
    ref
  ) => (
    <AvatarPrimitive.Image
      ref={ref}
      asChild
      src={src}
      alt={alt}
      className={cn('relative block h-full w-full overflow-hidden', className)}
      {...props}
    >
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        loading={priority ? undefined : 'lazy'}
        className='object-cover'
      />
    </AvatarPrimitive.Image>
  )
);

AvatarImageComponent.displayName = AvatarPrimitive.Image.displayName;

const AvatarImage = React.memo(
  AvatarImageComponent,
  (prev, next) =>
    prev.src === next.src &&
    prev.alt === next.alt &&
    prev.priority === next.priority &&
    prev.sizes === next.sizes &&
    prev.quality === next.quality &&
    prev.className === next.className
);

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-white/10 text-sm font-medium',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

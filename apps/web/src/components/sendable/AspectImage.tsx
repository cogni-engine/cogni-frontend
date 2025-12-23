'use client';

import Image from 'next/image';
import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AspectImageProps = {
  src?: string | null;
  alt: string;
  size?: number;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  aspectRatio?: string;
};

export default function AspectImage({
  src,
  alt,
  size = 128,
  isLoading = false,
  onClick,
  className = '',
  aspectRatio = '1/1',
}: AspectImageProps) {
  return (
    <div
      className={cn('relative group cursor-pointer overflow-hidden', className)}
    >
      <div
        data-image-clickable
        onClick={onClick}
        className='relative w-full h-full rounded-lg overflow-hidden border border-white/10 bg-white/5 hover:border-white/20 transition-all'
        style={{
          aspectRatio,
          minWidth: size ? `${size}px` : 'auto',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={size ? `${size}px` : '100vw'}
            className='object-cover pointer-events-none select-none'
            draggable={false}
            loading='lazy'
          />
        ) : isLoading ? (
          <div className='w-full h-full flex items-center justify-center'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white/40'></div>
          </div>
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <ImageIcon className='w-8 h-8 text-white/40' />
          </div>
        )}
        <div className='absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none'>
          <ImageIcon className='w-6 h-6 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity' />
        </div>
      </div>
    </div>
  );
}

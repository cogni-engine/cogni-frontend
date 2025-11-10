'use client';

import Image from 'next/image';

type FeatureImageProps = {
  src: string;
  alt: string;
  focus?: 'center' | 'top' | 'bottom';
  className?: string;
};

const focusMap = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
} satisfies Record<NonNullable<FeatureImageProps['focus']>, string>;

export function FeatureImage({
  src,
  alt,
  focus = 'center',
  className = '',
}: FeatureImageProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/30 aspect-[4/3] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes='(min-width: 768px) 320px, 100vw'
        className={`object-cover ${focusMap[focus]}`}
        priority={false}
      />
    </div>
  );
}

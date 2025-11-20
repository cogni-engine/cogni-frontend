'use client';

import { useEffect, useRef, useState } from 'react';

import { FeatureIcon } from './FeatureIcon';
import { FeatureImage } from './FeatureImage';

type FeatureCardProps = {
  label: string;
  iconType: 'timer' | 'notify' | 'chat' | 'task';
  title: string;
  description: string;
  asset: string;
  focus?: 'center' | 'top' | 'bottom';
};

export function FeatureCard({
  label,
  iconType,
  title,
  description,
  asset,
  focus = 'center',
}: FeatureCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.3, // 30%が見えたら発火
        rootMargin: '0px',
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className='flex h-full w-full flex-col gap-6 lg:flex-row lg:items-center lg:px-8'>
      {/* モバイル・タブレット: 文字上、画像下 / デスクトップ: 文字左、画像右 */}
      <div ref={textRef} className='lg:max-w-lg lg:pr-12'>
        <div className='mb-4 flex items-center gap-2'>
          <FeatureIcon type={iconType} />
          <span className='text-xs font-medium uppercase tracking-wider text-white/70'>
            {label}
          </span>
        </div>
        <h3 className='mb-6 text-3xl font-semibold text-white'>{title}</h3>
        <p className='text-base leading-relaxed text-slate-300'>
          {description}
        </p>
      </div>
      <div
        className={`flex-shrink-0 transition-all duration-700 ease-out lg:ml-auto lg:w-[600px] ${
          isVisible
            ? 'translate-x-0 scale-100 opacity-100'
            : 'translate-x-8 scale-95 opacity-0 lg:translate-x-12'
        }`}
      >
        <FeatureImage src={asset} alt={title} focus={focus} />
      </div>
    </div>
  );
}

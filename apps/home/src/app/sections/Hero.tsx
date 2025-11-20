'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../components/Button';
import { useLanguage } from '../context/language-context';

export function Hero() {
  const { copy } = useLanguage();
  const hero = copy.hero;

  // Featuresセクションの4つの画像
  const featureImages = [
    '/edu/assets/feature_timer.png',
    '/edu/assets/feature_notify.png',
    '/edu/assets/feature_chat.png',
    '/edu/assets/feature_notes.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 画像を順番に切り替える
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % featureImages.length);
    }, 4000); // 4秒ごとに切り替え

    return () => clearInterval(interval);
  }, [featureImages.length]);

  return (
    <section className='relative overflow-hidden bg-[#05060b]'>
      <div className='pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-white/10 blur-3xl' />
      <div className='pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl' />
      <div className='relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 md:px-8 pt-8 pb-8'>
        <div className='space-y-4 text-center'>
          <h1 className='text-3xl font-bold text-white md:text-5xl lg:text-6xl'>
            {hero.title}
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-slate-300 md:text-xl'>
            {hero.description}
          </p>
        </div>
        <div className='flex flex-wrap justify-center gap-4'>
          <Button as='link' href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </Button>
          <Button as='link' href={hero.secondaryCta.href} variant='secondary'>
            {hero.secondaryCta.label}
          </Button>
        </div>
        <div className='relative w-full max-w-3xl'>
          <div className='relative aspect-[4/3] w-full overflow-hidden rounded-3xl'>
            {/* 4つの画像を順番に表示 */}
            {featureImages.map((src, index) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={src}
                  alt={`Feature ${index + 1}`}
                  fill
                  className='object-cover'
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';

import { Button } from '../components/Button';
import { useLanguage } from '../context/language-context';

export function Hero() {
  const { copy } = useLanguage();
  const hero = copy.hero;

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
        <div className='relative w-full max-w-4xl'>
          <div className='relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5'>
            {/* 動画・画像スペース */}
            <Image
              src='/edu/assets/hero.png'
              alt='Cogno workspace'
              fill
              className='object-cover'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

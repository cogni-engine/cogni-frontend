'use client';

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
          <a
            href={hero.primaryCta.href}
            className='inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-slate-950 hover:bg-white/80 hover:text-slate-950 focus-visible:outline-white'
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className='inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border border-white/40 bg-transparent text-white hover:border-white focus-visible:outline-white'
          >
            {hero.secondaryCta.label}
          </a>
        </div>
        <div className='relative w-full max-w-4xl'>
          <div className='relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent'>
            {/* Placeholder for hero image */}
            <div className='flex h-full items-center justify-center text-white/40'>
              <svg
                className='h-24 w-24'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1}
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

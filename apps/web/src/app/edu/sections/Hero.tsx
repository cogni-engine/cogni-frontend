'use client';

import Image from 'next/image';

import { Button } from '../components/Button';
import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/language-context';

export function Hero() {
  const { copy } = useLanguage();
  const hero = copy.hero;

  return (
    <section className='relative overflow-hidden bg-[#05060b]'>
      <div className='pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-white/10 blur-3xl' />
      <div className='pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl' />
      <div className='relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-16 md:flex-row md:items-center'>
        <div className='flex-1 space-y-10'>
          <SectionTitle
            eyebrow={hero.eyebrow}
            title={hero.title}
            description={hero.description}
          />
          <ul className='space-y-3 text-base text-slate-300'>
            {hero.bullets.map(bullet => (
              <li key={bullet} className='flex items-center gap-3'>
                <span className='inline-flex h-2 w-2 rounded-full bg-white/70' />
                {bullet}
              </li>
            ))}
          </ul>
          <div className='flex flex-wrap gap-4'>
            <Button as='link' href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Button>
            <Button as='link' href={hero.secondaryCta.href} variant='secondary'>
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
        <div className='relative flex-1'>
          <div className='pointer-events-none absolute -right-10 -top-10 hidden h-32 w-32 rounded-full bg-white/10 blur-3xl md:block' />
          <Image
            src='/edu/assets/hero.png'
            alt={hero.imageAlt}
            width={540}
            height={420}
            className='relative z-10 w-full rounded-3xl border border-white/10 shadow-[0_25px_80px_-35px_rgba(255,255,255,0.25)]'
          />
        </div>
      </div>
    </section>
  );
}

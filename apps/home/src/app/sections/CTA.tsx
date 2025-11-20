'use client';

import { Button } from '../components/Button';
import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/language-context';

export function CTA() {
  const { copy } = useLanguage();
  const cta = copy.cta;

  return (
    <section className='relative overflow-hidden bg-[#05060b]'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_rgba(5,6,11,0.95))]' />
      <div className='relative mx-auto max-w-4xl space-y-8 px-6 md:px-8 py-24 text-center'>
        <SectionTitle
          title={cta.title}
          description={cta.description}
          align='center'
        />
        <div className='flex flex-wrap justify-center gap-4'>
          <a
            href={cta.primaryCta.href}
            className='inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-slate-950 hover:bg-white/80 hover:text-slate-950 focus-visible:outline-white'
          >
            {cta.primaryCta.label}
          </a>
          <a
            href={cta.secondaryCta.href}
            className='inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border border-white/40 bg-transparent text-white hover:border-white focus-visible:outline-white'
          >
            {cta.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}

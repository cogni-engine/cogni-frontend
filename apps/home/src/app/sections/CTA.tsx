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
          <Button as='link' href={cta.primaryCta.href}>
            {cta.primaryCta.label}
          </Button>
          <Button as='link' href={cta.secondaryCta.href} variant='secondary'>
            {cta.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

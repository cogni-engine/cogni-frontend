'use client';

import { Button } from '../components/Button';
import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/language-context';

export function CTA() {
  const { copy } = useLanguage();
  const cta = copy.cta;

  return (
    <section className='relative overflow-hidden bg-[#05060b]'>
      <div className='pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-white/[0.05] blur-3xl' />
      <div className='pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-white/[0.03] blur-3xl' />
      <div className='relative mx-auto max-w-4xl space-y-8 px-6 md:px-8 py-10 text-center'>
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

'use client';

import { Card } from '../components/Card';
import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/language-context';

export function HowItWorks() {
  const { copy } = useLanguage();
  const howItWorks = copy.howItWorks;

  return (
    <section
      id={howItWorks.id}
      className='relative overflow-hidden bg-[#05060b]'
    >
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white/10 to-transparent' />
      <div className='relative mx-auto max-w-6xl space-y-12 px-6 py-20'>
        <SectionTitle title={howItWorks.title} align='center' />
        <div className='grid gap-6 md:grid-cols-3'>
          {howItWorks.steps.map(step => (
            <Card
              key={step.title}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

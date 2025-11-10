'use client';

import { Card } from '../components/Card';
import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/language-context';

export function UseCases() {
  const { copy } = useLanguage();
  const useCases = copy.useCases;

  return (
    <section className='bg-[#05060b]'>
      <div className='mx-auto max-w-6xl space-y-12 px-6 py-20'>
        <SectionTitle title={useCases.title} align='center' />
        <div className='grid gap-6 md:grid-cols-3'>
          {useCases.cases.map(useCase => (
            <Card
              key={useCase.title}
              title={useCase.title}
              description={useCase.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

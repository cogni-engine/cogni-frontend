'use client';

import Image from 'next/image';

import { Card } from '../components/Card';
import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/language-context';
import { SECTION_IDS } from '../constants/copy';

export function UseCases() {
  const { copy } = useLanguage();
  const useCases = copy.useCases;

  return (
    <section id={SECTION_IDS.solution} className='scroll-mt-24 bg-[#05060b]'>
      <div className='mx-auto max-w-6xl space-y-12 px-6 md:px-8 pt-12 pb-20'>
        <SectionTitle title={useCases.title} align='center' />
        <div className='grid gap-6 md:grid-cols-3'>
          {useCases.cases.map(useCase => (
            <div key={useCase.title} className='flex flex-col gap-4'>
              <Card title={useCase.title} description={useCase.description} />
              {useCase.asset && (
                <div className='relative w-full aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/5'>
                  <Image
                    src={useCase.asset}
                    alt={useCase.title}
                    fill
                    className='object-cover'
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

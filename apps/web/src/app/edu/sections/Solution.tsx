'use client';

import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/language-context';
import { SECTION_IDS } from '../constants/copy';

export function Solution() {
  const { copy } = useLanguage();
  const solution = copy.solution;

  return (
    <section
      id={SECTION_IDS.solution}
      className='relative overflow-hidden bg-[#05060b]'
    >
      <div className='pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/10 to-transparent' />
      <div className='relative mx-auto max-w-5xl space-y-10 px-6 py-20'>
        <SectionTitle
          title={solution.title}
          description={solution.description}
          align='center'
        />
        <div className='grid gap-6 md:grid-cols-3'>
          {solution.highlights.map(highlight => (
            <div
              key={highlight}
              className='rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200'
            >
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

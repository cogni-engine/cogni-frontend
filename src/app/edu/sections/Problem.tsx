'use client';

import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/language-context';

export function Problem() {
  const { copy } = useLanguage();
  const problem = copy.problem;

  return (
    <section className='bg-[#05060b]'>
      <div className='mx-auto max-w-5xl space-y-10 px-6 py-20'>
        <SectionTitle title={problem.title} align='center' />
        <ul className='grid gap-6 md:grid-cols-3'>
          {problem.points.map(point => (
            <li
              key={point}
              className='rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300'
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

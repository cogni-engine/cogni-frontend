'use client';

import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/language-context';
import { SECTION_IDS } from '../constants/copy';

export function Privacy() {
  const { copy, language } = useLanguage();
  const privacy = copy.privacy;

  return (
    <section id={SECTION_IDS.privacy} className='bg-[#05060b]'>
      <div className='mx-auto max-w-4xl space-y-8 px-6 py-20'>
        <SectionTitle title={privacy.title} align='center' />
        <div className='space-y-6 text-sm text-slate-300'>
          <p className='text-center text-slate-400'>{privacy.effectiveDate}</p>
          <p className='leading-relaxed'>{privacy.preamble}</p>
          <div className='space-y-8'>
            {privacy.items.map(item => (
              <div key={item.number} className='space-y-3'>
                <h3 className='text-lg font-semibold text-white'>
                  {item.number}. {item.title}
                </h3>
                <ul className='space-y-2 pl-4'>
                  {item.content.map((paragraph, index) => (
                    <li key={index} className='leading-relaxed'>
                      {paragraph}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

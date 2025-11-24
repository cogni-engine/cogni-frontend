'use client';

import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/language-context';
import { SECTION_IDS } from '../constants/copy';

export function Terms() {
  const { copy, language } = useLanguage();
  const terms = copy.terms;

  return (
    <section id={SECTION_IDS.terms} className='bg-[#05060b]'>
      <div className='mx-auto max-w-4xl space-y-8 px-6 py-20'>
        <SectionTitle title={terms.title} align='center' />
        <div className='space-y-6 text-sm text-slate-300'>
          <p className='text-center text-slate-400'>{terms.effectiveDate}</p>
          <p className='leading-relaxed'>{terms.preamble}</p>
          <div className='space-y-8'>
            {terms.articles.map(article => (
              <div key={article.number} className='space-y-3'>
                <h3 className='text-lg font-semibold text-white'>
                  {language === 'ja'
                    ? `第${article.number}条（${article.title}）`
                    : `Article ${article.number} (${article.title})`}
                </h3>
                <ul className='space-y-2 pl-4'>
                  {article.content.map((paragraph, index) => (
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

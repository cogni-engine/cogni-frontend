'use client';

import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/language-context';

export function CommercialTransaction() {
  const { copy } = useLanguage();
  const commercialTransaction = copy.commercialTransaction;

  return (
    <section className='bg-[#05060b]'>
      <div className='mx-auto max-w-4xl space-y-8 px-6 py-10'>
        <SectionTitle title={commercialTransaction.title} align='center' />
        <div className='space-y-8 text-sm text-slate-300'>
          {commercialTransaction.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className='space-y-6'>
              {section.title && (
                <div className='flex items-center gap-4'>
                  <div className='h-px flex-1 bg-white/20' />
                  <h2 className='text-lg font-semibold text-white'>
                    {section.title}
                  </h2>
                  <div className='h-px flex-1 bg-white/20' />
                </div>
              )}
              <div className='space-y-4'>
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className='space-y-2'>
                    <h3 className='font-semibold text-white'>{item.label}</h3>
                    {Array.isArray(item.value) ? (
                      <ul className='space-y-1 pl-4'>
                        {item.value.map((paragraph, index) => (
                          <li key={index} className='leading-relaxed'>
                            {paragraph}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className='whitespace-pre-line leading-relaxed'>
                        {item.value}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* セクション間の区切りを表示（最初の2つのセクションの後） */}
              {sectionIndex < 2 && (
                <div className='flex items-center justify-center py-4'>
                  <div className='h-px w-full max-w-md bg-white/20' />
                  <span className='px-4 text-slate-400'>⸻</span>
                  <div className='h-px w-full max-w-md bg-white/20' />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

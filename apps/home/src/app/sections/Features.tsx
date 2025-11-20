'use client';

import { FeatureCard } from '../components/FeatureCard';
import { FeatureIcon } from '../components/FeatureIcon';
import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/language-context';
import { SECTION_IDS } from '../constants/copy';

export function Features() {
  const { copy } = useLanguage();
  const features = copy.features;

  return (
    <section id={SECTION_IDS.features} className='bg-[#05060b]'>
      <div className='mx-auto max-w-6xl space-y-12 px-6 md:px-8 pt-8 pb-4'>
        <SectionTitle
          title={features.title}
          description={features.description}
          align='center'
        />
        {/* 4つのアイコンとラベルを横並び（スマホ版では非表示） */}
        <div className='hidden md:grid grid-cols-4 gap-2 md:gap-4'>
          {features.cards.map(card => (
            <div
              key={card.label}
              className='flex flex-row items-center justify-center gap-2'
            >
              <FeatureIcon type={card.iconType} className='w-5 h-5' />
              <span className='text-xs font-medium text-white'>
                {card.label}
              </span>
            </div>
          ))}
        </div>
        {/* 詳細なカードセクション */}
        <div className='space-y-0'>
          {features.cards.map(card => (
            <div
              key={card.title}
              className='min-h-[80vh] flex items-center py-16'
            >
              <FeatureCard
                label={card.label}
                iconType={card.iconType}
                title={card.title}
                description={card.description}
                asset={card.asset}
                focus={card.focus ?? 'center'}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { Card } from '../components/Card';
import { FeatureImage } from '../components/FeatureImage';
import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/language-context';
import { SECTION_IDS } from '../constants/copy';

export function Features() {
  const { copy } = useLanguage();
  const features = copy.features;

  return (
    <section id={SECTION_IDS.features} className='bg-[#05060b]'>
      <div className='mx-auto max-w-6xl space-y-12 px-6 py-20'>
        <SectionTitle
          title={features.title}
          description={features.description}
          align='center'
        />
        <div className='grid gap-6 md:grid-cols-2'>
          {features.cards.map(card => (
            <Card
              key={card.title}
              title={card.title}
              description={card.description}
              icon={
                <FeatureImage
                  src={card.asset}
                  alt={card.title}
                  focus={card.focus ?? 'center'}
                />
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

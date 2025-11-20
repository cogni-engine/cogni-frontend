'use client';

import { useLanguage } from '../context/language-context';
import { PricingCard } from './components/PricingCard';

export default function PricingPage() {
  const { copy } = useLanguage();
  const pricing = copy.pricing;

  return (
    <section className='bg-[#05060b] py-20'>
      <div className='mx-auto max-w-7xl px-6 md:px-8'>
        <div className='mb-16 text-center'>
          <h1 className='mb-4 text-4xl font-bold text-white md:text-5xl'>
            {pricing.title}
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-slate-300'>
            {pricing.description}
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {pricing.plans.map(plan => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

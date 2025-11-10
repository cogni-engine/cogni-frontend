import { CTA } from './sections/CTA';
import { Features } from './sections/Features';
import { Hero } from './sections/Hero';
import { HowItWorks } from './sections/HowItWorks';
import { Problem } from './sections/Problem';
import { Solution } from './sections/Solution';
import { UseCases } from './sections/UseCases';

export default function EduPage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <HowItWorks />
      <UseCases />
      <CTA />
    </>
  );
}

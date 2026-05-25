import { HeroSection } from '../components/HeroSection';
import { OverlappingCards } from '../components/OverlappingCards';
import { HorizontalScrollSections } from '../components/HorizontalScrollSections';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { WhoIsThisFor } from '../components/WhoIsThisFor';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { FinalCTA } from '../components/FinalCTA';

export function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <OverlappingCards />
      <HorizontalScrollSections />
      <ProcessTimeline />
      <WhoIsThisFor />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
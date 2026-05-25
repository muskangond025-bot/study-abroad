import { DestinationsGrid } from './DestinationsGrid';
import { WhyChooseUs } from './WhyChooseUs';
import { TopUniversities } from './TopUniversities';

export function HorizontalScrollSections() {
  return (
    <div className="relative">
      <DestinationsGrid />
      <WhyChooseUs />
      <TopUniversities />
    </div>
  );
}
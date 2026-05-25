import { ConciergeAnimatedBanner } from '../components/ConciergeAnimatedBanner';
import { ConciergeGrid } from '../components/ConciergeGrid';
import { WhoConciergeSupportIsFor } from '../components/WhoConciergeSupportIsFor';
import { RequestConciergeSupport } from '../components/RequestConciergeSupport';
import { ConciergeGuidance } from '../components/ConciergeGuidance';

export function Concierge() {
  return (
    <div className="relative">
      {/* Animated Banner */}
      <ConciergeAnimatedBanner />

      {/* Grid Animation Section - How Concierge Support Works */}
      <ConciergeGrid />

      {/* Who Concierge Support Is For */}
      <WhoConciergeSupportIsFor />

      {/* Request Concierge Support */}
      <RequestConciergeSupport />

      {/* Concierge Guidance - Expectations, Approach & CTA */}
      <ConciergeGuidance />
    </div>
  );
}
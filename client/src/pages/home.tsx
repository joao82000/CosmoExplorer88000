import { HeroSection } from "@/components/hero-section";
import { LiveDashboard } from "@/components/live-dashboard";
import { InteractiveMap } from "@/components/interactive-map";
import { SpaceFacts } from "@/components/space-facts";
import { AsteroidTracker } from "@/components/asteroid-tracker";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LiveDashboard />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SpaceFacts />
          <AsteroidTracker />
        </div>
      </div>
      <InteractiveMap />
    </div>
  );
}

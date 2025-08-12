import { HeroSection } from "@/components/hero-section";
import { LiveDashboard } from "@/components/live-dashboard";
import { InteractiveMap } from "@/components/interactive-map";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LiveDashboard />
      <InteractiveMap />
    </div>
  );
}

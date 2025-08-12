import { Button } from "@/components/ui/button";
import { Play, FileText } from "lucide-react";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <section className="pt-20 pb-12 space-bg relative overflow-hidden min-h-[70vh] flex items-center">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Earth from space" 
          className="w-full h-full object-cover"
          data-testid="hero-background-image"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6" data-testid="hero-title">
            Explore the <span className="gradient-text">Universe</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto" data-testid="hero-description">
            Real-time data from NASA's most advanced space missions and Earth observation systems
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/explore">
              <Button 
                size="lg" 
                className="bg-cosmic-600 hover:bg-cosmic-700 text-white px-8 py-3 font-semibold transition-all duration-200 transform hover:scale-105"
                data-testid="button-start-exploring"
              >
                <Play className="mr-2 h-4 w-4" />
                Start Exploring
              </Button>
            </Link>
            <Link href="/reports">
              <Button 
                variant="outline" 
                size="lg"
                className="border-nebula-500 text-nebula-400 hover:bg-nebula-500 hover:text-white px-8 py-3 font-semibold transition-all duration-200"
                data-testid="button-generate-report"
              >
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

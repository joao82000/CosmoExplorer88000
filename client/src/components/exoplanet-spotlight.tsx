import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Globe, Thermometer, Ruler } from "lucide-react";

interface Exoplanet {
  name: string;
  hostStar: string;
  distance: string;
  discoveryYear: number;
  planetType: "Rocky" | "Gas Giant" | "Ice Giant" | "Super Earth";
  temperature: string;
  orbitalPeriod: string;
  habitableZone: boolean;
  funFact: string;
}

const EXOPLANETS: Exoplanet[] = [
  {
    name: "Kepler-452b",
    hostStar: "Kepler-452",
    distance: "1,400 light-years",
    discoveryYear: 2015,
    planetType: "Super Earth",
    temperature: "-8°C to 32°C",
    orbitalPeriod: "385 days",
    habitableZone: true,
    funFact: "Called 'Earth's Cousin' - it's 60% larger than Earth and orbits in its star's habitable zone"
  },
  {
    name: "Proxima Centauri b",
    hostStar: "Proxima Centauri",
    distance: "4.24 light-years",
    discoveryYear: 2016,
    planetType: "Rocky",
    temperature: "-40°C to 30°C",
    orbitalPeriod: "11.2 days",
    habitableZone: true,
    funFact: "The closest exoplanet to Earth - you could reach it in 73,000 years with current technology"
  },
  {
    name: "HD 209458 b",
    hostStar: "HD 209458",
    distance: "159 light-years",
    discoveryYear: 1999,
    planetType: "Gas Giant",
    temperature: "1,000°C",
    orbitalPeriod: "3.5 days",
    habitableZone: false,
    funFact: "First exoplanet found to have water vapor in its atmosphere and the first observed transiting"
  },
  {
    name: "TRAPPIST-1e",
    hostStar: "TRAPPIST-1",
    distance: "39 light-years",
    discoveryYear: 2016,
    planetType: "Rocky",
    temperature: "-27°C to 0°C",
    orbitalPeriod: "6.1 days",
    habitableZone: true,
    funFact: "Part of a system with 7 Earth-sized planets, and it's the most likely to have liquid water"
  },
  {
    name: "K2-18b",
    hostStar: "K2-18",
    distance: "124 light-years",
    discoveryYear: 2015,
    planetType: "Super Earth",
    temperature: "-73°C to 47°C",
    orbitalPeriod: "33 days",
    habitableZone: true,
    funFact: "James Webb detected water vapor and possibly clouds in its atmosphere - a major discovery!"
  },
  {
    name: "51 Eridani b",
    hostStar: "51 Eridani",
    distance: "28 light-years",
    discoveryYear: 2014,
    planetType: "Gas Giant",
    temperature: "430°C",
    orbitalPeriod: "20-50 years",
    habitableZone: false,
    funFact: "One of the youngest exoplanets known, only 20 million years old - practically a baby in cosmic terms"
  }
];

export function ExoplanetSpotlight() {
  const [currentPlanet, setCurrentPlanet] = useState(EXOPLANETS[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomPlanet = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * EXOPLANETS.length);
      setCurrentPlanet(EXOPLANETS[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  // Auto-rotate planets every 20 seconds
  useEffect(() => {
    const interval = setInterval(getRandomPlanet, 20000);
    return () => clearInterval(interval);
  }, []);

  const getPlanetTypeColor = (type: string) => {
    switch (type) {
      case "Rocky": return "bg-orange-500";
      case "Gas Giant": return "bg-blue-500";
      case "Ice Giant": return "bg-cyan-500";
      case "Super Earth": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="glass-effect border-border/40 bg-gradient-to-br from-purple-900/10 to-blue-900/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-nebula-400">
          <div className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Exoplanet Spotlight
          </div>
          <Button
            onClick={getRandomPlanet}
            size="sm"
            variant="ghost"
            className="text-cosmic-400 hover:text-cosmic-300"
            data-testid="button-refresh-planet"
          >
            <RefreshCw className={`h-4 w-4 ${isAnimating ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
        <p className="text-sm text-gray-400">Discovering worlds beyond our solar system</p>
      </CardHeader>
      
      <CardContent>
        <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{currentPlanet.name}</h3>
            <div className="flex space-x-2">
              <Badge className={`${getPlanetTypeColor(currentPlanet.planetType)} text-white text-xs`}>
                {currentPlanet.planetType}
              </Badge>
              {currentPlanet.habitableZone && (
                <Badge className="bg-green-500 text-white text-xs">
                  Habitable Zone
                </Badge>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-cosmic-400" />
                <span className="text-sm text-gray-400">Host Star:</span>
                <span className="text-sm text-white font-medium">{currentPlanet.hostStar}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Ruler className="h-4 w-4 text-cosmic-400" />
                <span className="text-sm text-gray-400">Distance:</span>
                <span className="text-sm text-white font-medium">{currentPlanet.distance}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Thermometer className="h-4 w-4 text-cosmic-400" />
                <span className="text-sm text-gray-400">Temperature:</span>
                <span className="text-sm text-white font-medium">{currentPlanet.temperature}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-400">Discovery Year:</span>
                <span className="ml-2 text-sm text-white font-medium">{currentPlanet.discoveryYear}</span>
              </div>
              
              <div>
                <span className="text-sm text-gray-400">Orbital Period:</span>
                <span className="ml-2 text-sm text-white font-medium">{currentPlanet.orbitalPeriod}</span>
              </div>
              
              <div>
                <span className="text-sm text-gray-400">Status:</span>
                <span className={`ml-2 text-sm font-medium ${currentPlanet.habitableZone ? 'text-green-400' : 'text-orange-400'}`}>
                  {currentPlanet.habitableZone ? 'Potentially Habitable' : 'Not in Habitable Zone'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
            <h5 className="font-semibold text-purple-300 mb-2">🌟 Amazing Fact</h5>
            <p className="text-sm text-gray-300 leading-relaxed">
              {currentPlanet.funFact}
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-3 rounded-lg bg-cosmic-900/20 border border-cosmic-500/30">
          <p className="text-xs text-gray-400">
            💫 <strong>NASA has discovered over 5,000 exoplanets!</strong> The Kepler and TESS missions continue to find new worlds, 
            with some potentially capable of supporting life as we know it.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
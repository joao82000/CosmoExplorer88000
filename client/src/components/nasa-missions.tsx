import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, Globe, Star, Satellite } from "lucide-react";

interface Mission {
  id: string;
  name: string;
  status: "Active" | "Planned" | "Completed";
  launchDate: string;
  destination: string;
  description: string;
  category: "Mars" | "Moon" | "Deep Space" | "Earth Orbit";
  achievement?: string;
}

const MISSIONS: Mission[] = [
  {
    id: "1",
    name: "Perseverance Rover",
    status: "Active",
    launchDate: "July 30, 2020",
    destination: "Mars - Jezero Crater",
    description: "Searching for signs of ancient microbial life and collecting rock samples for future return to Earth.",
    category: "Mars",
    achievement: "First to successfully create oxygen on Mars"
  },
  {
    id: "2",
    name: "James Webb Space Telescope",
    status: "Active",
    launchDate: "December 25, 2021",
    destination: "L2 Lagrange Point",
    description: "Observing the universe in infrared light to study galaxy formation and exoplanet atmospheres.",
    category: "Deep Space",
    achievement: "Deepest infrared view of the universe ever captured"
  },
  {
    id: "3",
    name: "Artemis III",
    status: "Planned",
    launchDate: "2026 (Planned)",
    destination: "Moon - South Pole",
    description: "First crewed lunar landing mission since Apollo 17, aiming to establish sustainable lunar exploration.",
    category: "Moon"
  },
  {
    id: "4",
    name: "Europa Clipper",
    status: "Active",
    launchDate: "October 14, 2024",
    destination: "Jupiter - Europa Moon",
    description: "Studying Jupiter's moon Europa and its subsurface ocean to assess its potential for harboring life.",
    category: "Deep Space"
  },
  {
    id: "5",
    name: "Parker Solar Probe",
    status: "Active",
    launchDate: "August 12, 2018",
    destination: "Solar Corona",
    description: "Making the closest approach to the Sun ever attempted, studying solar wind and corona.",
    category: "Deep Space",
    achievement: "Fastest human-made object (430,000 mph)"
  },
  {
    id: "6",
    name: "DART Mission",
    status: "Completed",
    launchDate: "November 24, 2021",
    destination: "Asteroid Dimorphos",
    description: "Successfully demonstrated planetary defense by impacting an asteroid to change its trajectory.",
    category: "Deep Space",
    achievement: "First successful asteroid deflection test"
  }
];

export function NASAMissions() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", "Mars", "Moon", "Deep Space", "Earth Orbit"];
  
  const filteredMissions = selectedCategory === "All" 
    ? MISSIONS 
    : MISSIONS.filter(mission => mission.category === selectedCategory);

  const getStatusColor = (status: Mission["status"]) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Planned": return "bg-blue-500";
      case "Completed": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: Mission["category"]) => {
    switch (category) {
      case "Mars": return <Globe className="h-4 w-4" />;
      case "Moon": return <Star className="h-4 w-4" />;
      case "Deep Space": return <Rocket className="h-4 w-4" />;
      case "Earth Orbit": return <Satellite className="h-4 w-4" />;
    }
  };

  return (
    <Card className="glass-effect border-border/40">
      <CardHeader>
        <CardTitle className="flex items-center text-nebula-400">
          <Rocket className="mr-2 h-5 w-5" />
          NASA Missions Timeline
        </CardTitle>
        <p className="text-sm text-gray-400">Current and upcoming space exploration missions</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              size="sm"
              variant={selectedCategory === category ? "default" : "ghost"}
              className={selectedCategory === category 
                ? "bg-cosmic-500 text-white" 
                : "text-gray-400 hover:text-white"
              }
              data-testid={`filter-${category.toLowerCase()}`}
            >
              {category}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredMissions.map((mission) => (
            <div 
              key={mission.id}
              className="p-4 rounded-lg bg-space-800/50 border border-gray-700 hover:bg-space-800/70 transition-colors"
              data-testid={`mission-${mission.id}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(mission.category)}
                  <h4 className="font-semibold text-white">{mission.name}</h4>
                </div>
                <Badge className={`${getStatusColor(mission.status)} text-white text-xs`}>
                  {mission.status}
                </Badge>
              </div>
              
              <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                {mission.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Launch:</span>
                  <span className="ml-2 text-cosmic-300 font-medium">{mission.launchDate}</span>
                </div>
                <div>
                  <span className="text-gray-500">Destination:</span>
                  <span className="ml-2 text-cosmic-300 font-medium">{mission.destination}</span>
                </div>
              </div>
              
              {mission.achievement && (
                <div className="mt-3 p-2 rounded bg-nebula-900/20 border border-nebula-500/30">
                  <p className="text-xs text-nebula-300">
                    🏆 <strong>Achievement:</strong> {mission.achievement}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-cosmic-900/20 to-nebula-900/20 border border-cosmic-500/30">
          <p className="text-sm text-gray-300">
            <strong>Did you know?</strong> NASA currently operates over 100 missions across our solar system, 
            from studying Earth's climate to exploring the outer reaches of our solar system and beyond!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles } from "lucide-react";

const SPACE_FACTS = [
  {
    title: "Black Hole Mystery",
    fact: "The supermassive black hole at the center of our galaxy, Sagittarius A*, has a mass of about 4.15 million times that of our Sun.",
    category: "Black Holes"
  },
  {
    title: "Cosmic Speed Record",
    fact: "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth, traveling at 299,792,458 meters per second.",
    category: "Physics"
  },
  {
    title: "Stellar Nursery",
    fact: "The Eagle Nebula contains pillars of gas and dust where new stars are born, some stretching 4-5 light-years tall.",
    category: "Nebulae"
  },
  {
    title: "Mars Weather",
    fact: "Mars experiences seasons like Earth, but they last twice as long because Mars takes 687 Earth days to orbit the Sun.",
    category: "Planets"
  },
  {
    title: "Cosmic Distance",
    fact: "The nearest star to our solar system, Proxima Centauri, is 4.24 light-years away - that's about 25 trillion miles!",
    category: "Stars"
  },
  {
    title: "Space Debris",
    fact: "There are over 34,000 pieces of space junk larger than 10 cm orbiting Earth, traveling at speeds up to 17,500 mph.",
    category: "Earth Orbit"
  },
  {
    title: "Jupiter's Protection",
    fact: "Jupiter acts as our solar system's vacuum cleaner, using its massive gravity to attract comets and asteroids that might otherwise hit Earth.",
    category: "Planets"
  },
  {
    title: "Neutron Star Density",
    fact: "A teaspoon of neutron star material would weigh about 6 billion tons - as much as Mount Everest!",
    category: "Stellar Objects"
  },
  {
    title: "Voyager's Journey",
    fact: "Voyager 1, launched in 1977, is now over 14 billion miles from Earth and still sending data back to NASA.",
    category: "Space Exploration"
  },
  {
    title: "Moon's Origin",
    fact: "The Moon was likely formed 4.5 billion years ago when a Mars-sized object collided with the early Earth.",
    category: "Solar System"
  },
  {
    title: "Galactic Rotation",
    fact: "Our solar system orbits the center of the Milky Way at about 515,000 mph, completing one orbit every 225-250 million years.",
    category: "Galaxy"
  },
  {
    title: "Cosmic Background",
    fact: "The cosmic microwave background radiation we detect today is the afterglow of the Big Bang from 13.8 billion years ago.",
    category: "Cosmology"
  }
];

export function SpaceFacts() {
  const [currentFact, setCurrentFact] = useState(SPACE_FACTS[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomFact = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * SPACE_FACTS.length);
      setCurrentFact(SPACE_FACTS[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  // Auto-rotate facts every 15 seconds
  useEffect(() => {
    const interval = setInterval(getRandomFact, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-effect border-border/40 bg-gradient-to-br from-cosmic-900/20 to-nebula-900/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-nebula-400" />
            <h3 className="text-lg font-semibold text-nebula-400">Space Curiosity</h3>
          </div>
          <Button
            onClick={getRandomFact}
            size="sm"
            variant="ghost"
            className="text-cosmic-400 hover:text-cosmic-300"
            data-testid="button-refresh-fact"
          >
            <RefreshCw className={`h-4 w-4 ${isAnimating ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="mb-2">
            <span className="text-xs px-2 py-1 rounded-full bg-cosmic-500/20 text-cosmic-300 font-medium">
              {currentFact.category}
            </span>
          </div>
          <h4 className="text-lg font-semibold text-white mb-3">{currentFact.title}</h4>
          <p className="text-gray-300 leading-relaxed">{currentFact.fact}</p>
        </div>
      </CardContent>
    </Card>
  );
}
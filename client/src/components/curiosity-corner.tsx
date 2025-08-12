import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, Lightbulb } from "lucide-react";

interface CuriosityItem {
  question: string;
  answer: string;
  category: "Solar System" | "Deep Space" | "Technology" | "History" | "Physics";
}

const CURIOSITIES: CuriosityItem[] = [
  {
    question: "How long would it take to drive to the Moon?",
    answer: "If you could drive at highway speed (60 mph) non-stop, it would take about 6 months to reach the Moon! The Moon is roughly 240,000 miles away.",
    category: "Solar System"
  },
  {
    question: "What would happen if you cried in space?",
    answer: "Your tears wouldn't fall down your face! In zero gravity, tears form bubbles around your eyes. They can only be removed by wiping them away.",
    category: "Physics"
  },
  {
    question: "How many Earths could fit inside the Sun?",
    answer: "About 1.3 million Earths! The Sun is so massive that it contains 99.86% of all the mass in our solar system.",
    category: "Solar System"
  },
  {
    question: "What's the most distant human-made object?",
    answer: "Voyager 1, launched in 1977, is now over 14 billion miles from Earth in interstellar space. It's still sending signals back to NASA!",
    category: "Technology"
  },
  {
    question: "Why is space completely silent?",
    answer: "Sound needs molecules to travel through, but space is mostly empty vacuum. That's why in movies, space explosions shouldn't make noise!",
    category: "Physics"
  },
  {
    question: "How fast does the International Space Station travel?",
    answer: "The ISS orbits Earth at about 17,500 mph! It completes one orbit around Earth every 90 minutes, giving astronauts 16 sunrises and sunsets per day.",
    category: "Technology"
  },
  {
    question: "What happens to your height in space?",
    answer: "Astronauts grow about 2 inches taller in space! Without gravity compressing their spine, they stretch out. They shrink back to normal when they return.",
    category: "Physics"
  },
  {
    question: "How cold is space?",
    answer: "Space is about -455°F (-270°C), just a few degrees above absolute zero. But in direct sunlight, objects can heat up to over 250°F!",
    category: "Physics"
  },
  {
    question: "What's the largest known star?",
    answer: "UY Scuti is so large that if placed at our Sun's location, it would extend beyond Jupiter's orbit! It's about 1,700 times wider than our Sun.",
    category: "Deep Space"
  },
  {
    question: "How many galaxies are there?",
    answer: "The observable universe contains an estimated 2 trillion galaxies! Each galaxy can contain hundreds of billions of stars.",
    category: "Deep Space"
  },
  {
    question: "What was the first food eaten in space?",
    answer: "Soviet cosmonaut Yuri Gagarin was the first to eat in space in 1961. He squeezed beef and liver paste from a tube, followed by chocolate sauce!",
    category: "History"
  },
  {
    question: "How do rockets work in the vacuum of space?",
    answer: "Rockets work by Newton's third law - they push exhaust out the back, which pushes the rocket forward. They don't need air to 'push against'!",
    category: "Technology"
  }
];

export function CuriosityCorner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextQuestion = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % CURIOSITIES.length);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const currentItem = CURIOSITIES[currentIndex];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Solar System": return "bg-orange-500";
      case "Deep Space": return "bg-purple-500";
      case "Technology": return "bg-blue-500";
      case "History": return "bg-green-500";
      case "Physics": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="glass-effect border-border/40 bg-gradient-to-br from-indigo-900/10 to-purple-900/10">
      <CardHeader>
        <CardTitle className="flex items-center text-nebula-400">
          <Brain className="mr-2 h-5 w-5" />
          Curiosity Corner
        </CardTitle>
        <p className="text-sm text-gray-400">Mind-blowing space facts to spark your curiosity</p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(currentItem.category)} text-white font-medium`}>
              {currentItem.category}
            </span>
            <span className="text-xs text-gray-500">
              Question {currentIndex + 1} of {CURIOSITIES.length}
            </span>
          </div>
          
          <div className="p-4 rounded-lg bg-space-800/50 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Lightbulb className="mr-2 h-4 w-4 text-yellow-400" />
              {currentItem.question}
            </h4>
            
            {showAnswer && (
              <div className="mt-4 p-4 rounded-lg bg-indigo-900/20 border border-indigo-500/30">
                <p className="text-gray-300 leading-relaxed">{currentItem.answer}</p>
              </div>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={toggleAnswer}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
              data-testid="button-toggle-answer"
            >
              {showAnswer ? "Hide Answer" : "Reveal Answer"}
            </Button>
            
            <Button
              onClick={nextQuestion}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              data-testid="button-next-question"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/30">
            <p className="text-xs text-gray-400">
              🚀 <strong>Did you know?</strong> NASA estimates there are more stars in the universe than grains of sand on all the beaches on Earth!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award } from "lucide-react";

export function Credits() {
  const developers = [
    "João Paulo Brusco",
    "Henrique Nardi", 
    "Enzo Ramos",
    "Guilherme Pereira"
  ];

  return (
    <Card className="glass-effect border-border/40 bg-gradient-to-br from-nebula-900/10 to-cosmic-900/10">
      <CardHeader>
        <CardTitle className="flex items-center text-nebula-400">
          <Award className="mr-2 h-5 w-5" />
          Development Team
        </CardTitle>
        <p className="text-sm text-gray-400">
          NASA App Challenge 2025 - Team Submission
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-5 w-5 text-cosmic-400" />
            <h4 className="font-semibold text-white">Developed by:</h4>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {developers.map((developer, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg bg-space-800/50 border border-gray-700"
                data-testid={`developer-${index}`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cosmic-500 to-nebula-500 flex items-center justify-center text-white font-semibold">
                  {developer.split(' ').map(name => name[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-white">{developer}</p>
                  <p className="text-xs text-gray-400">Developer</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-cosmic-900/20 to-nebula-900/20 border border-cosmic-500/30">
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-nebula-300">NASA Space Data Explorer</strong> - A comprehensive web application showcasing 
              real-time NASA data including APOD images, EPIC Earth observations, Near Earth Objects tracking, 
              and interactive space education features. Built with React, TypeScript, and NASA's public APIs.
            </p>
          </div>
          
          <div className="text-center pt-4">
            <p className="text-xs text-gray-500">
              🚀 Submitted to NASA App Challenge 2025
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
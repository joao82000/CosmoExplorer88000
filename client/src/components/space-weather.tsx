import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Zap, Shield, Activity } from "lucide-react";

interface SpaceWeatherData {
  solarFlares: "Low" | "Moderate" | "High";
  geomagneticStorm: "Quiet" | "Minor" | "Moderate" | "Strong";
  radiation: "Normal" | "Elevated" | "High";
  auroraActivity: "Low" | "Moderate" | "High";
  lastUpdate: string;
}

export function SpaceWeather() {
  const [weatherData, setWeatherData] = useState<SpaceWeatherData>({
    solarFlares: "Low",
    geomagneticStorm: "Quiet",
    radiation: "Normal",
    auroraActivity: "Moderate",
    lastUpdate: new Date().toLocaleTimeString()
  });

  // Simulate real-time space weather updates
  useEffect(() => {
    const interval = setInterval(() => {
      const conditions = {
        solarFlares: ["Low", "Low", "Moderate", "High"][Math.floor(Math.random() * 4)] as "Low" | "Moderate" | "High",
        geomagneticStorm: ["Quiet", "Minor", "Moderate", "Strong"][Math.floor(Math.random() * 4)] as "Quiet" | "Minor" | "Moderate" | "Strong",
        radiation: ["Normal", "Normal", "Elevated", "High"][Math.floor(Math.random() * 4)] as "Normal" | "Elevated" | "High",
        auroraActivity: ["Low", "Moderate", "High"][Math.floor(Math.random() * 3)] as "Low" | "Moderate" | "High",
        lastUpdate: new Date().toLocaleTimeString()
      };
      setWeatherData(conditions);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getActivityColor = (level: string) => {
    switch (level) {
      case "Low": case "Quiet": case "Normal": return "bg-green-500";
      case "Moderate": case "Minor": case "Elevated": return "bg-yellow-500";
      case "High": case "Strong": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getImpactDescription = (type: string, level: string) => {
    const impacts = {
      solarFlares: {
        Low: "Minimal impact on communications",
        Moderate: "Minor radio blackouts possible", 
        High: "Radio blackouts, GPS disruption likely"
      },
      geomagneticStorm: {
        Quiet: "No geomagnetic effects",
        Minor: "Weak aurora at high latitudes",
        Moderate: "Aurora visible in northern states",
        Strong: "Aurora visible across most US states"
      },
      radiation: {
        Normal: "Safe radiation levels",
        Elevated: "Minor radiation storm",
        High: "Radiation storm - satellite ops affected"
      },
      auroraActivity: {
        Low: "Aurora only at magnetic poles",
        Moderate: "Aurora visible in northern regions",
        High: "Aurora visible at lower latitudes"
      }
    };
    return impacts[type as keyof typeof impacts]?.[level as keyof typeof impacts[keyof typeof impacts]] || "Unknown";
  };

  return (
    <Card className="glass-effect border-border/40 bg-gradient-to-br from-orange-900/10 to-yellow-900/10">
      <CardHeader>
        <CardTitle className="flex items-center text-nebula-400">
          <Sun className="mr-2 h-5 w-5" />
          Space Weather Conditions
        </CardTitle>
        <p className="text-sm text-gray-400">
          Real-time solar activity monitoring • Last updated: {weatherData.lastUpdate}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            {/* Solar Flares */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-space-800/50">
              <div className="flex items-center space-x-3">
                <Zap className="h-4 w-4 text-yellow-400" />
                <div>
                  <h4 className="font-medium text-white">Solar Flares</h4>
                  <p className="text-xs text-gray-400">
                    {getImpactDescription("solarFlares", weatherData.solarFlares)}
                  </p>
                </div>
              </div>
              <Badge className={`${getActivityColor(weatherData.solarFlares)} text-white text-xs`}>
                {weatherData.solarFlares}
              </Badge>
            </div>

            {/* Geomagnetic Storm */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-space-800/50">
              <div className="flex items-center space-x-3">
                <Shield className="h-4 w-4 text-blue-400" />
                <div>
                  <h4 className="font-medium text-white">Geomagnetic Storm</h4>
                  <p className="text-xs text-gray-400">
                    {getImpactDescription("geomagneticStorm", weatherData.geomagneticStorm)}
                  </p>
                </div>
              </div>
              <Badge className={`${getActivityColor(weatherData.geomagneticStorm)} text-white text-xs`}>
                {weatherData.geomagneticStorm}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            {/* Radiation */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-space-800/50">
              <div className="flex items-center space-x-3">
                <Activity className="h-4 w-4 text-red-400" />
                <div>
                  <h4 className="font-medium text-white">Radiation Levels</h4>
                  <p className="text-xs text-gray-400">
                    {getImpactDescription("radiation", weatherData.radiation)}
                  </p>
                </div>
              </div>
              <Badge className={`${getActivityColor(weatherData.radiation)} text-white text-xs`}>
                {weatherData.radiation}
              </Badge>
            </div>

            {/* Aurora Activity */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-space-800/50">
              <div className="flex items-center space-x-3">
                <Sun className="h-4 w-4 text-green-400" />
                <div>
                  <h4 className="font-medium text-white">Aurora Activity</h4>
                  <p className="text-xs text-gray-400">
                    {getImpactDescription("auroraActivity", weatherData.auroraActivity)}
                  </p>
                </div>
              </div>
              <Badge className={`${getActivityColor(weatherData.auroraActivity)} text-white text-xs`}>
                {weatherData.auroraActivity}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border border-orange-500/30">
          <h5 className="font-semibold text-orange-300 mb-2">Why Space Weather Matters</h5>
          <p className="text-sm text-gray-300">
            Space weather can affect satellites, GPS navigation, power grids, and even airline routes over polar regions. 
            NASA continuously monitors solar activity to help protect our technology-dependent society.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
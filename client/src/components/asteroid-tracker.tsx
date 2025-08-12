import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Zap, Calendar } from "lucide-react";
import { nasaApi } from "@/lib/nasa-api";

export function AsteroidTracker() {
  const { data: neos, isLoading } = useQuery({
    queryKey: ["/api/neo"],
    queryFn: () => nasaApi.getNearEarthObjects(),
  });

  const getDangerLevel = (distance: number) => {
    if (distance < 1000000) return { level: "HIGH", color: "bg-red-500", icon: AlertTriangle };
    if (distance < 5000000) return { level: "MEDIUM", color: "bg-yellow-500", icon: Zap };
    return { level: "LOW", color: "bg-green-500", icon: Calendar };
  };

  const formatDistance = (km: string) => {
    const distance = parseFloat(km);
    if (distance > 1000000) {
      return `${(distance / 1000000).toFixed(2)}M km`;
    }
    return `${distance.toFixed(0)} km`;
  };

  if (isLoading) {
    return (
      <Card className="glass-effect border-border/40">
        <CardHeader>
          <CardTitle className="text-nebula-400">Asteroid Watch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 bg-space-800" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const dangerousAsteroids = neos?.slice(0, 5) || [];

  return (
    <Card className="glass-effect border-border/40">
      <CardHeader>
        <CardTitle className="flex items-center text-nebula-400">
          <AlertTriangle className="mr-2 h-5 w-5" />
          Asteroid Watch
        </CardTitle>
        <p className="text-sm text-gray-400">Current Near-Earth Objects being monitored by NASA</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dangerousAsteroids.map((neo) => {
            const distance = parseFloat(neo.close_approach_data[0]?.miss_distance.kilometers || "0");
            const danger = getDangerLevel(distance);
            const Icon = danger.icon;
            
            return (
              <div 
                key={neo.id} 
                className="flex items-center justify-between p-4 rounded-lg bg-space-800/50 border border-gray-700"
                data-testid={`asteroid-${neo.id}`}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon className="h-4 w-4 text-yellow-400" />
                    <h4 className="font-medium text-white truncate">{neo.name}</h4>
                    <Badge className={`${danger.color} text-white text-xs`}>
                      {danger.level} RISK
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                    <div>
                      <span className="text-gray-500">Distance:</span>
                      <span className="ml-2 text-cosmic-300 font-medium">
                        {formatDistance(neo.close_approach_data[0]?.miss_distance.kilometers || "0")}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Diameter:</span>
                      <span className="ml-2 text-cosmic-300 font-medium">
                        {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(1)} km
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Approach: {new Date(neo.close_approach_data[0]?.close_approach_date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 rounded-lg bg-cosmic-900/20 border border-cosmic-500/30">
          <p className="text-xs text-gray-400">
            💡 <strong>Fun Fact:</strong> NASA tracks over 30,000 near-Earth objects. 
            Even "close" approaches are typically millions of kilometers away - much farther than the Moon!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
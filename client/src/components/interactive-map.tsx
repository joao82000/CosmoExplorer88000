import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, MapPin } from "lucide-react";

export function InteractiveMap() {
  return (
    <section className="py-16 bg-space-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-bold mb-4" data-testid="map-section-title">Global Data Visualization</h3>
        </div>


        <Card className="glass-effect border-border/40">
          <CardContent className="p-6">
            <div className="aspect-video bg-space-900 rounded-lg relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=675" 
                alt="Interactive world map" 
                className="w-full h-full object-cover"
                data-testid="map-background"
              />
              
              {/* Map Controls Overlay */}
              <div className="absolute top-4 left-4 space-y-2">
                <Button
                  size="icon" 
                  className="bg-space-900 bg-opacity-80 hover:bg-opacity-100 transition-all duration-200"
                  data-testid="map-zoom-in"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  size="icon" 
                  className="bg-space-900 bg-opacity-80 hover:bg-opacity-100 transition-all duration-200"
                  data-testid="map-zoom-out"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-space-900 bg-opacity-80 p-4 rounded-lg" data-testid="map-legend">
                <h5 className="font-semibold mb-2">Legend</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cosmic-400 rounded-full"></div>
                    <span>EPIC Image Location</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-nebula-400 rounded-full"></div>
                    <span>Near Earth Objects</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span>Earth Assets</span>
                  </div>
                </div>
              </div>
              
              {/* Sample Markers */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-cosmic-400 rounded-full animate-pulse-slow border-2 border-white" data-testid="marker-epic"></div>
              </div>
              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-nebula-400 rounded-full animate-pulse-slow border-2 border-white" data-testid="marker-neo"></div>
              </div>
              <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
                <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse-slow border-2 border-white" data-testid="marker-earth"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Search } from "lucide-react";
import { nasaApi } from "@/lib/nasa-api";
import { SpaceWeather } from "@/components/space-weather";
import { ExoplanetSpotlight } from "@/components/exoplanet-spotlight";
import { NASAMissions } from "@/components/nasa-missions";

export default function Explore() {
  const [apodDate, setApodDate] = useState("");



  const { data: apod, isLoading: apodLoading, refetch: refetchApod } = useQuery({
    queryKey: ["/api/apod", apodDate],
    queryFn: () => nasaApi.getAPOD(apodDate),
    enabled: false,
  });





  const handleApodSearch = () => {
    if (apodDate) refetchApod();
  };





  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-space-950 to-space-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="explore-title">Explore Space Data</h1>
          <p className="text-gray-400 text-lg" data-testid="explore-subtitle">Discover astronomy pictures from NASA's archives</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Space Weather */}
          <div className="lg:col-span-1">
            <SpaceWeather />
          </div>
          
          {/* Exoplanet Spotlight */}
          <div className="lg:col-span-1">
            <ExoplanetSpotlight />
          </div>
          
          {/* NASA Missions */}
          <div className="lg:col-span-1">
            <NASAMissions />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-12">
          {/* APOD Search */}
          <Card className="glass-effect border-border/40 hover:bg-opacity-80 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-nebula-400">
                <Calendar className="mr-2 h-5 w-5" />
                APOD Time Machine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Select Date</Label>
                <Input
                  type="date"
                  value={apodDate}
                  onChange={(e) => setApodDate(e.target.value)}
                  className="bg-space-900 border-gray-600 text-white focus:border-cosmic-500"
                  data-testid="input-apod-date"
                />
              </div>
              <Button 
                onClick={handleApodSearch}
                className="w-full bg-nebula-500 hover:bg-nebula-600 text-white"
                disabled={!apodDate || apodLoading}
                data-testid="button-search-apod"
              >
                <Search className="mr-2 h-4 w-4" />
                {apodLoading ? "Searching..." : "Explore Date"}
              </Button>
              <div className="text-xs text-gray-400 p-3 bg-space-900 rounded-lg">
                Search through NASA's archive dating back to June 16, 1995
              </div>
            </CardContent>
          </Card>




        </div>

        {/* Results Section */}
        <div className="space-y-8">
          {/* APOD Results */}
          {apod && (
            <Card className="glass-effect border-border/40">
              <CardHeader>
                <CardTitle className="text-nebula-400" data-testid="apod-result-title">APOD for {apod.date}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={apod.url} 
                      alt={apod.title}
                      className="w-full h-full object-cover"
                      data-testid="apod-result-image"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" data-testid="apod-result-title-text">{apod.title}</h3>
                    <p className="text-gray-300" data-testid="apod-result-explanation">{apod.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}




        </div>
      </div>
    </div>
  );
}

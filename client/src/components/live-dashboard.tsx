import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Image, Globe, Haze, ExternalLink, ArrowRight } from "lucide-react";
import { nasaApi } from "@/lib/nasa-api";


export function LiveDashboard() {
  const { data: apod, isLoading: apodLoading, error: apodError } = useQuery({
    queryKey: ["/api/apod"],
    queryFn: () => nasaApi.getAPOD(),
  });

  const { data: epic, isLoading: epicLoading, error: epicError } = useQuery({
    queryKey: ["/api/epic/latest"],
    queryFn: () => nasaApi.getEPICLatest(),
  });

  const { data: neos, isLoading: neosLoading, error: neosError } = useQuery({
    queryKey: ["/api/neo"],
    queryFn: () => nasaApi.getNearEarthObjects(),
  });



  return (
    <section id="dashboard" className="py-16 bg-space-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4" data-testid="dashboard-title">Live NASA Data</h3>
          <p className="text-gray-400 text-lg" data-testid="dashboard-subtitle">Updated in real-time from NASA's public APIs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* APOD Card */}
          <Card className="glass-effect border-border/40 hover:bg-opacity-80 transition-all duration-300 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-nebula-400">
                <div className="flex items-center">
                  <Image className="mr-2 h-5 w-5" />
                  Astronomy Picture of the Day
                </div>
                {apod && (
                  <span className="text-sm text-gray-400" data-testid="apod-date">{apod.date}</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {apodLoading && (
                <div className="space-y-4">
                  <Skeleton className="aspect-video w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              )}
              {apodError && (
                <div className="text-center py-8 text-red-400" data-testid="apod-error">
                  Failed to load APOD data
                </div>
              )}
              {apod && (
                <div>
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <img 
                      src={apod.url} 
                      alt={apod.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      data-testid="apod-image"
                    />
                  </div>
                  <h5 className="font-semibold mb-2" data-testid="apod-title">{apod.title}</h5>
                  <p className="text-gray-300 text-sm line-clamp-3 mb-4" data-testid="apod-explanation">
                    {apod.explanation}
                  </p>
                  <Button variant="ghost" className="text-cosmic-400 hover:text-cosmic-300 p-0" data-testid="apod-read-more">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* EPIC Earth Card */}
          <Card className="glass-effect border-border/40 hover:bg-opacity-80 transition-all duration-300 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-nebula-400">
                <div className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Latest Earth Image (EPIC)
                </div>
                {epic && (
                  <span className="text-sm text-gray-400" data-testid="epic-date">{epic.date}</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {epicLoading && (
                <div className="space-y-4">
                  <Skeleton className="aspect-square w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-16" />
                    <Skeleton className="h-16" />
                  </div>
                </div>
              )}
              {epicError && (
                <div className="text-center py-8" data-testid="epic-error">
                  <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">EPIC service temporarily unavailable</p>
                  <p className="text-xs text-gray-500">NASA's EPIC camera data will be restored shortly</p>
                </div>
              )}
              {epic && (
                <div>
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img 
                      src={`https://api.nasa.gov/EPIC/archive/natural/${epic.date.split(' ')[0].replace(/-/g, '/')}/png/${epic.image}.png?api_key=baGVDjbzqV5wDbt1mcOfgYbgoe5pWso3X5N8mO0r`}
                      alt="EPIC Earth view"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 animate-float"
                      data-testid="epic-image"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Coordinates:</span>
                      <p className="font-semibold" data-testid="epic-coordinates">
                        {epic.centroid_coordinates.lat.toFixed(1)}°N, {epic.centroid_coordinates.lon.toFixed(1)}°W
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Distance:</span>
                      <p className="font-semibold" data-testid="epic-distance">1.5M km</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Near Earth Objects */}
          <Card className="glass-effect border-border/40 hover:bg-opacity-80 transition-all duration-300 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center text-nebula-400">
                <Haze className="mr-2 h-5 w-5" />
                Near Earth Objects
              </CardTitle>
            </CardHeader>
            <CardContent>
              {neosLoading && (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              )}
              {neosError && (
                <div className="text-center py-8 text-red-400" data-testid="neos-error">
                  Failed to load NEO data
                </div>
              )}
              {neos && neos.length === 0 && (
                <div className="text-center py-8 text-gray-400" data-testid="neos-empty">
                  No Near Earth Objects detected today
                </div>
              )}
              {neos && neos.length > 0 && (
                <div className="space-y-3">
                  {neos.slice(0, 3).map((neo) => (
                    <div key={neo.id} className="flex items-center justify-between p-3 bg-space-900 rounded-lg" data-testid={`neo-item-${neo.id}`}>
                      <div>
                        <h5 className="font-semibold" data-testid={`neo-name-${neo.id}`}>{neo.name}</h5>
                        <p className="text-sm text-gray-400" data-testid={`neo-date-${neo.id}`}>
                          {neo.close_approach_data[0]?.close_approach_date || 'No approach data'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-cosmic-400" data-testid={`neo-distance-${neo.id}`}>
                          {neo.close_approach_data[0]?.miss_distance.kilometers 
                            ? `${parseFloat(neo.close_approach_data[0].miss_distance.kilometers).toExponential(1)} km`
                            : 'Unknown'
                          }
                        </p>
                        <p className="text-xs text-gray-400" data-testid={`neo-size-${neo.id}`}>
                          ~{neo.estimated_diameter.meters.estimated_diameter_max.toFixed(0)}m
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </CardContent>
          </Card>


        </div>
      </div>
    </section>
  );
}

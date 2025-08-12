import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Camera, Info, Calendar, MapPin } from "lucide-react";
import { nasaApi } from "@/lib/nasa-api";
import { MarsRoverPhoto } from "@shared/schema";
import { CuriosityCorner } from "@/components/curiosity-corner";

export default function Gallery() {
  const [selectedRover, setSelectedRover] = useState("perseverance");
  const [selectedCamera, setSelectedCamera] = useState("all");

  const { data: photos, isLoading, error } = useQuery({
    queryKey: ["/api/mars/photos", selectedRover, selectedCamera],
    queryFn: () => nasaApi.getMarsPhotos(selectedRover, undefined, selectedCamera === "all" ? undefined : selectedCamera),
  });

  const rovers = [
    { value: "perseverance", label: "Perseverance" },
    { value: "curiosity", label: "Curiosity" },
    { value: "opportunity", label: "Opportunity" },
    { value: "spirit", label: "Spirit" },
  ];

  const cameras = [
    { value: "all", label: "All Cameras" },
    { value: "MAST", label: "Mast Camera" },
    { value: "NAVCAM", label: "Navigation Camera" },
    { value: "FHAZ", label: "Front Hazard Avoidance Camera" },
    { value: "RHAZ", label: "Rear Hazard Avoidance Camera" },
    { value: "MAHLI", label: "Mars Hand Lens Imager" },
    { value: "MARDI", label: "Mars Descent Imager" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 bg-space-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="gallery-title">Mars Rover Photo Gallery</h1>
          <p className="text-gray-400 text-lg" data-testid="gallery-subtitle">Explore stunning images captured by NASA's Mars rovers</p>
        </div>

        {/* Filters */}
        <Card className="glass-effect border-border/40 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-nebula-400">
              <Camera className="mr-2 h-5 w-5" />
              Filter Photos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rover</label>
                <Select value={selectedRover} onValueChange={setSelectedRover}>
                  <SelectTrigger className="bg-space-900 border-gray-600 text-white focus:border-cosmic-500" data-testid="select-gallery-rover">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {rovers.map((rover) => (
                      <SelectItem key={rover.value} value={rover.value}>
                        {rover.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Camera</label>
                <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                  <SelectTrigger className="bg-space-900 border-gray-600 text-white focus:border-cosmic-500" data-testid="select-gallery-camera">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cameras.map((camera) => (
                      <SelectItem key={camera.value} value={camera.value}>
                        {camera.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <Card key={i} className="glass-effect border-border/40">
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="glass-effect border-border/40">
            <CardContent className="text-center py-12">
              <p className="text-red-400" data-testid="gallery-error">Failed to load Mars rover photos</p>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {photos && photos.length === 0 && (
          <Card className="glass-effect border-border/40">
            <CardContent className="text-center py-12">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400" data-testid="gallery-empty">No photos found for the selected filters</p>
            </CardContent>
          </Card>
        )}

        {/* Photo Grid */}
        {photos && photos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo: MarsRoverPhoto) => (
              <Card key={photo.id} className="glass-effect border-border/40 hover:bg-opacity-80 transition-all duration-300 group" data-testid={`gallery-photo-${photo.id}`}>
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img 
                    src={photo.img_src} 
                    alt={`Mars photo by ${photo.rover.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white" data-testid={`photo-rover-${photo.id}`}>{photo.rover.name}</h3>
                      <p className="text-sm text-gray-400" data-testid={`photo-camera-${photo.id}`}>{photo.camera.full_name}</p>
                    </div>
                    <Badge variant="secondary" className="bg-cosmic-600/20 text-cosmic-400" data-testid={`photo-sol-${photo.id}`}>
                      Sol {photo.sol}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span data-testid={`photo-date-${photo.id}`}>{photo.earth_date}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Info className="h-4 w-4 mr-2" />
                      <span data-testid={`photo-status-${photo.id}`}>{photo.rover.status}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-3 text-cosmic-400 hover:text-cosmic-300 p-0"
                    onClick={() => window.open(photo.img_src, '_blank')}
                    data-testid={`button-view-full-${photo.id}`}
                  >
                    View Full Size
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Curiosity Corner */}
        <div className="mt-12 mb-8">
          <CuriosityCorner />
        </div>

        {/* Load More */}
        {photos && photos.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm" data-testid="gallery-count">
              Showing {photos.length} photos from {selectedRover}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

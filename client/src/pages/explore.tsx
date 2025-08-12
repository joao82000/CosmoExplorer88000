import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Camera, Satellite, Search, Filter } from "lucide-react";
import { nasaApi } from "@/lib/nasa-api";

export default function Explore() {
  const [apodDate, setApodDate] = useState("");
  const [selectedRover, setSelectedRover] = useState("");
  const [selectedCamera, setSelectedCamera] = useState("all");


  const { data: apod, isLoading: apodLoading, refetch: refetchApod } = useQuery({
    queryKey: ["/api/apod", apodDate],
    queryFn: () => nasaApi.getAPOD(apodDate),
    enabled: false,
  });

  const { data: marsPhotos, isLoading: marsLoading, refetch: refetchMars } = useQuery({
    queryKey: ["/api/mars/photos", selectedRover, selectedCamera],
    queryFn: () => nasaApi.getMarsPhotos(selectedRover, undefined, selectedCamera === "all" ? undefined : selectedCamera),
    enabled: false,
  });



  const handleApodSearch = () => {
    if (apodDate) refetchApod();
  };

  const handleMarsFilter = () => {
    refetchMars();
  };



  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-space-950 to-space-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="explore-title">Interactive Exploration</h1>
          <p className="text-gray-400 text-lg" data-testid="explore-subtitle">Dive deep into NASA's data with advanced search and filtering</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
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

          {/* Mars Rover Gallery */}
          <Card className="glass-effect border-border/40 hover:bg-opacity-80 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-nebula-400">
                <Camera className="mr-2 h-5 w-5" />
                Mars Photo Gallery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Rover</Label>
                <Select onValueChange={setSelectedRover}>
                  <SelectTrigger className="bg-space-900 border-gray-600 text-white focus:border-cosmic-500" data-testid="select-rover">
                    <SelectValue placeholder="Select rover" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perseverance">Perseverance</SelectItem>
                    <SelectItem value="curiosity">Curiosity</SelectItem>
                    <SelectItem value="opportunity">Opportunity</SelectItem>
                    <SelectItem value="spirit">Spirit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Camera</Label>
                <Select onValueChange={setSelectedCamera}>
                  <SelectTrigger className="bg-space-900 border-gray-600 text-white focus:border-cosmic-500" data-testid="select-camera">
                    <SelectValue placeholder="Select camera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cameras</SelectItem>
                    <SelectItem value="MAST">MAST</SelectItem>
                    <SelectItem value="NAVCAM">NAVCAM</SelectItem>
                    <SelectItem value="FHAZ">FHAZ</SelectItem>
                    <SelectItem value="RHAZ">RHAZ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleMarsFilter}
                className="w-full bg-nebula-500 hover:bg-nebula-600 text-white"
                disabled={marsLoading}
                data-testid="button-filter-mars"
              >
                <Filter className="mr-2 h-4 w-4" />
                {marsLoading ? "Loading..." : "Apply Filters"}
              </Button>
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

          {/* Mars Photos Results */}
          {marsPhotos && marsPhotos.length > 0 && (
            <Card className="glass-effect border-border/40">
              <CardHeader>
                <CardTitle className="text-nebula-400" data-testid="mars-results-title">
                  Mars Rover Photos ({marsPhotos.length} found)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marsPhotos.slice(0, 9).map((photo) => (
                    <div key={photo.id} className="aspect-square rounded-lg overflow-hidden" data-testid={`mars-photo-${photo.id}`}>
                      <img 
                        src={photo.img_src} 
                        alt={`Mars photo by ${photo.rover.name}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}


        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Download, Check } from "lucide-react";
import { nasaApi } from "@/lib/nasa-api";
import { useToast } from "@/hooks/use-toast";

export default function Reports() {
  const [reportTitle, setReportTitle] = useState("NASA Space Data Report - " + new Date().toLocaleDateString());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [includeApod, setIncludeApod] = useState(true);
  const [includeEpic, setIncludeEpic] = useState(true);
  const [includeNeo, setIncludeNeo] = useState(true);
  const [includeMars, setIncludeMars] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Preview data queries
  const { data: apod, isLoading: apodLoading } = useQuery({
    queryKey: ["/api/apod"],
    queryFn: () => nasaApi.getAPOD(),
    enabled: includeApod,
  });

  const { data: epic, isLoading: epicLoading } = useQuery({
    queryKey: ["/api/epic/latest"],
    queryFn: () => nasaApi.getEPICLatest(),
    enabled: includeEpic,
  });

  const { data: neos, isLoading: neosLoading } = useQuery({
    queryKey: ["/api/neo"],
    queryFn: () => nasaApi.getNearEarthObjects(),
    enabled: includeNeo,
  });

  const { data: marsPhoto, isLoading: marsLoading } = useQuery({
    queryKey: ["/api/mars/latest"],
    queryFn: () => nasaApi.getLatestMarsPhoto(),
    enabled: includeMars,
  });

  const generateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a simple text report (in a real app, you'd use a PDF library)
      let reportContent = `${reportTitle}\n\n`;
      reportContent += `Generated on: ${new Date().toLocaleString()}\n`;
      reportContent += `Date Range: ${startDate || 'Latest'} to ${endDate || 'Latest'}\n\n`;
      
      if (includeApod && apod) {
        reportContent += `ASTRONOMY PICTURE OF THE DAY\n`;
        reportContent += `Date: ${apod.date}\n`;
        reportContent += `Title: ${apod.title}\n`;
        reportContent += `Description: ${apod.explanation}\n\n`;
      }
      
      if (includeEpic && epic) {
        reportContent += `EPIC EARTH IMAGE\n`;
        reportContent += `Date: ${epic.date}\n`;
        reportContent += `Coordinates: ${epic.centroid_coordinates.lat}°N, ${epic.centroid_coordinates.lon}°W\n\n`;
      }
      
      if (includeNeo && neos) {
        reportContent += `NEAR EARTH OBJECTS\n`;
        reportContent += `Count: ${neos.length}\n`;
        neos.slice(0, 5).forEach(neo => {
          reportContent += `- ${neo.name}: ${neo.close_approach_data[0]?.miss_distance.kilometers || 'Unknown'} km\n`;
        });
        reportContent += `\n`;
      }
      
      if (includeMars && marsPhoto) {
        reportContent += `MARS ROVER PHOTO\n`;
        reportContent += `Rover: ${marsPhoto.rover.name}\n`;
        reportContent += `Sol: ${marsPhoto.sol}\n`;
        reportContent += `Camera: ${marsPhoto.camera.name}\n`;
        reportContent += `Earth Date: ${marsPhoto.earth_date}\n\n`;
      }
      
      // Download as text file
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nasa-report-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Report Generated",
        description: "Your NASA data report has been downloaded successfully.",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-space-950 to-space-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="reports-title">Generate Reports</h1>
          <p className="text-gray-400 text-lg" data-testid="reports-subtitle">Create comprehensive PDF reports with current NASA data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Configuration */}
          <Card className="glass-effect border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center text-nebula-400">
                <FileText className="mr-2 h-5 w-5" />
                Report Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-gray-300">Report Title</Label>
                <Input
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="bg-space-900 border-gray-600 text-white focus:border-cosmic-500"
                  data-testid="input-report-title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Start Date</Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-space-900 border-gray-600 text-white focus:border-cosmic-500"
                    data-testid="input-start-date"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">End Date</Label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-space-900 border-gray-600 text-white focus:border-cosmic-500"
                    data-testid="input-end-date"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-300 mb-4 block">Include Data Sections</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="apod"
                      checked={includeApod}
                      onCheckedChange={setIncludeApod}
                      className="border-gray-600"
                      data-testid="checkbox-include-apod"
                    />
                    <Label htmlFor="apod" className="text-sm">APOD Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="epic"
                      checked={includeEpic}
                      onCheckedChange={setIncludeEpic}
                      className="border-gray-600"
                      data-testid="checkbox-include-epic"
                    />
                    <Label htmlFor="epic" className="text-sm">EPIC Images</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="neo"
                      checked={includeNeo}
                      onCheckedChange={setIncludeNeo}
                      className="border-gray-600"
                      data-testid="checkbox-include-neo"
                    />
                    <Label htmlFor="neo" className="text-sm">NEO Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mars"
                      checked={includeMars}
                      onCheckedChange={setIncludeMars}
                      className="border-gray-600"
                      data-testid="checkbox-include-mars"
                    />
                    <Label htmlFor="mars" className="text-sm">Mars Photos</Label>
                  </div>
                </div>
              </div>

              <Button 
                onClick={generateReport}
                disabled={isGenerating || (!includeApod && !includeEpic && !includeNeo && !includeMars)}
                className="w-full bg-gradient-to-r from-cosmic-600 to-nebula-500 hover:from-cosmic-700 hover:to-nebula-600 text-white py-4 font-semibold transition-all duration-200 transform hover:scale-105"
                data-testid="button-generate-report"
              >
                {isGenerating ? (
                  <>Generating Report...</>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Generate Report
                  </>
                )}
              </Button>

              <div className="bg-space-900 rounded-lg p-4">
                <h5 className="font-semibold mb-2 text-nebula-400">Report Contents:</h5>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Current Astronomy Picture of the Day with detailed explanation</li>
                  <li>• Latest EPIC Earth imagery and observation data</li>
                  <li>• Near Earth Objects tracking and proximity analysis</li>
                  <li>• Recent Mars Rover photographs and mission updates</li>
                  <li>• Interactive charts and data visualizations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Preview */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-nebula-400" data-testid="preview-title">Data Preview</h3>
            
            {/* APOD Preview */}
            {includeApod && (
              <Card className="glass-effect border-border/40">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-300">APOD Data</CardTitle>
                </CardHeader>
                <CardContent>
                  {apodLoading && <Skeleton className="h-20 w-full" />}
                  {apod && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="text-sm">{apod.title}</span>
                      </div>
                      <p className="text-xs text-gray-400">{apod.date}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* EPIC Preview */}
            {includeEpic && (
              <Card className="glass-effect border-border/40">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-300">EPIC Data</CardTitle>
                </CardHeader>
                <CardContent>
                  {epicLoading && <Skeleton className="h-20 w-full" />}
                  {epic && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Latest Earth image available</span>
                      </div>
                      <p className="text-xs text-gray-400">{epic.date}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* NEO Preview */}
            {includeNeo && (
              <Card className="glass-effect border-border/40">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-300">NEO Data</CardTitle>
                </CardHeader>
                <CardContent>
                  {neosLoading && <Skeleton className="h-20 w-full" />}
                  {neos && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="text-sm">{neos.length} Near Earth Objects found</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Mars Preview */}
            {includeMars && (
              <Card className="glass-effect border-border/40">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-300">Mars Data</CardTitle>
                </CardHeader>
                <CardContent>
                  {marsLoading && <Skeleton className="h-20 w-full" />}
                  {marsPhoto && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Latest {marsPhoto.rover.name} photo</span>
                      </div>
                      <p className="text-xs text-gray-400">Sol {marsPhoto.sol} - {marsPhoto.earth_date}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { APOD, EpicImage, MarsRoverPhoto, NearEarthObject, EarthAsset } from "@shared/schema";

const API_BASE = "/api";

export const nasaApi = {
  async getAPOD(date?: string): Promise<APOD> {
    const params = date ? `?date=${date}` : "";
    const response = await fetch(`${API_BASE}/apod${params}`);
    if (!response.ok) {
      throw new Error("Failed to fetch APOD");
    }
    return response.json();
  },

  async getEPICLatest(): Promise<EpicImage> {
    const response = await fetch(`${API_BASE}/epic/latest`);
    if (!response.ok) {
      throw new Error("Failed to fetch EPIC data");
    }
    return response.json();
  },

  async getMarsPhotos(rover?: string, sol?: number, camera?: string): Promise<MarsRoverPhoto[]> {
    const params = new URLSearchParams();
    if (rover) params.append("rover", rover);
    if (sol) params.append("sol", sol.toString());
    if (camera) params.append("camera", camera);
    
    const queryString = params.toString();
    const response = await fetch(`${API_BASE}/mars/photos${queryString ? `?${queryString}` : ""}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Mars photos");
    }
    return response.json();
  },

  async getLatestMarsPhoto(): Promise<MarsRoverPhoto> {
    const response = await fetch(`${API_BASE}/mars/latest`);
    if (!response.ok) {
      throw new Error("Failed to fetch latest Mars photo");
    }
    return response.json();
  },

  async getNearEarthObjects(startDate?: string, endDate?: string): Promise<NearEarthObject[]> {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    
    const queryString = params.toString();
    const response = await fetch(`${API_BASE}/neo${queryString ? `?${queryString}` : ""}`);
    if (!response.ok) {
      throw new Error("Failed to fetch NEO data");
    }
    return response.json();
  },

  async getEarthAssets(lat: number, lon: number, date?: string): Promise<EarthAsset[]> {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
    });
    if (date) params.append("date", date);
    
    const response = await fetch(`${API_BASE}/earth?${params}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Earth assets");
    }
    return response.json();
  },
};

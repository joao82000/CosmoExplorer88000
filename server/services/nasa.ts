import axios from 'axios';
import { apodSchema, epicImageSchema, marsRoverPhotoSchema, nearEarthObjectSchema, earthAssetSchema } from '@shared/schema';

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const NASA_BASE_URL = 'https://api.nasa.gov';

export class NASAService {
  private apiKey: string;

  constructor() {
    this.apiKey = NASA_API_KEY;
  }

  async getAPOD(date?: string) {
    try {
      const params = new URLSearchParams({
        api_key: this.apiKey,
        ...(date && { date }),
      });

      const response = await axios.get(`${NASA_BASE_URL}/planetary/apod?${params}`);
      return apodSchema.parse(response.data);
    } catch (error) {
      console.error('Error fetching APOD:', error);
      throw new Error('Failed to fetch Astronomy Picture of the Day');
    }
  }

  async getEPICLatest() {
    try {
      const response = await axios.get(
        `${NASA_BASE_URL}/EPIC/api/natural?api_key=${this.apiKey}`
      );
      
      if (response.data && response.data.length > 0) {
        const latestImage = response.data[0];
        return epicImageSchema.parse(latestImage);
      }
      throw new Error('No EPIC images available');
    } catch (error) {
      console.error('Error fetching EPIC latest:', error);
      throw new Error('Failed to fetch latest EPIC Earth image');
    }
  }

  async getMarsRoverPhotos(rover: string = 'perseverance', sol?: number, camera?: string) {
    try {
      let endpoint = `${NASA_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos`;
      
      const params = new URLSearchParams({
        api_key: this.apiKey,
        sol: sol ? sol.toString() : '1000',
        ...(camera && { camera }),
      });

      const response = await axios.get(`${endpoint}?${params}`);
      
      if (response.data && response.data.photos) {
        return response.data.photos.map((photo: any) => marsRoverPhotoSchema.parse(photo));
      }
      return [];
    } catch (error) {
      console.error('Error fetching Mars rover photos:', error);
      throw new Error('Failed to fetch Mars rover photos');
    }
  }

  async getLatestMarsPhoto() {
    try {
      // Get latest photos from Perseverance rover
      const photos = await this.getMarsRoverPhotos('perseverance');
      if (photos.length > 0) {
        return photos[0];
      }
      throw new Error('No Mars photos available');
    } catch (error) {
      console.error('Error fetching latest Mars photo:', error);
      throw new Error('Failed to fetch latest Mars photo');
    }
  }

  async getNearEarthObjects(startDate?: string, endDate?: string) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const params = new URLSearchParams({
        api_key: this.apiKey,
        start_date: startDate || today,
        end_date: endDate || today,
      });

      const response = await axios.get(`${NASA_BASE_URL}/neo/rest/v1/feed?${params}`);
      
      if (response.data && response.data.near_earth_objects) {
        const neos: any[] = [];
        Object.values(response.data.near_earth_objects).forEach((dayObjects: any) => {
          dayObjects.forEach((neo: any) => {
            neos.push(nearEarthObjectSchema.parse(neo));
          });
        });
        return neos;
      }
      return [];
    } catch (error) {
      console.error('Error fetching NEOs:', error);
      throw new Error('Failed to fetch Near Earth Objects');
    }
  }

  async getEarthAssets(lat: number, lon: number, date?: string) {
    try {
      const params = new URLSearchParams({
        api_key: this.apiKey,
        lat: lat.toString(),
        lon: lon.toString(),
        ...(date && { date }),
      });

      const response = await axios.get(`${NASA_BASE_URL}/planetary/earth/assets?${params}`);
      
      if (response.data && response.data.results) {
        return response.data.results.map((asset: any) => earthAssetSchema.parse(asset));
      }
      return [];
    } catch (error) {
      console.error('Error fetching Earth assets:', error);
      throw new Error('Failed to fetch Earth assets');
    }
  }
}

export const nasaService = new NASAService();

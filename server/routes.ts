import type { Express } from "express";
import { createServer, type Server } from "http";
import { nasaService } from "./services/nasa";

export async function registerRoutes(app: Express): Promise<Server> {
  // APOD endpoints
  app.get("/api/apod", async (req, res) => {
    try {
      const { date } = req.query;
      const apod = await nasaService.getAPOD(date as string);
      res.json(apod);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Failed to fetch APOD' 
      });
    }
  });

  // EPIC endpoints
  app.get("/api/epic/latest", async (req, res) => {
    try {
      const epic = await nasaService.getEPICLatest();
      res.json(epic);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Failed to fetch EPIC data' 
      });
    }
  });

  // Mars rover endpoints
  app.get("/api/mars/photos", async (req, res) => {
    try {
      const { rover, sol, camera } = req.query;
      const photos = await nasaService.getMarsRoverPhotos(
        rover as string,
        sol ? parseInt(sol as string) : undefined,
        camera as string
      );
      res.json(photos);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Failed to fetch Mars photos' 
      });
    }
  });

  app.get("/api/mars/latest", async (req, res) => {
    try {
      const photo = await nasaService.getLatestMarsPhoto();
      res.json(photo);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Failed to fetch latest Mars photo' 
      });
    }
  });

  // NEO endpoints
  app.get("/api/neo", async (req, res) => {
    try {
      const { start_date, end_date } = req.query;
      const neos = await nasaService.getNearEarthObjects(
        start_date as string,
        end_date as string
      );
      res.json(neos);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Failed to fetch NEO data' 
      });
    }
  });

  // Earth assets endpoints
  app.get("/api/earth", async (req, res) => {
    try {
      const { lat, lon, date } = req.query;
      
      if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
      }

      const assets = await nasaService.getEarthAssets(
        parseFloat(lat as string),
        parseFloat(lon as string),
        date as string
      );
      res.json(assets);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Failed to fetch Earth assets' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

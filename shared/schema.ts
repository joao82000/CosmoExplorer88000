import { z } from "zod";

export const apodSchema = z.object({
  date: z.string(),
  explanation: z.string(),
  hdurl: z.string().optional(),
  media_type: z.string(),
  service_version: z.string(),
  title: z.string(),
  url: z.string(),
});

export const epicImageSchema = z.object({
  identifier: z.string(),
  caption: z.string(),
  image: z.string(),
  version: z.string(),
  centroid_coordinates: z.object({
    lat: z.number(),
    lon: z.number(),
  }),
  dscovr_j2000_position: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
  lunar_j2000_position: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
  sun_j2000_position: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
  attitude_quaternions: z.object({
    q0: z.number(),
    q1: z.number(),
    q2: z.number(),
    q3: z.number(),
  }),
  date: z.string(),
  coords: z.object({
    centroid_coordinates: z.object({
      lat: z.number(),
      lon: z.number(),
    }),
  }),
});

export const marsRoverPhotoSchema = z.object({
  id: z.number(),
  sol: z.number(),
  camera: z.object({
    id: z.number(),
    name: z.string(),
    rover_id: z.number(),
    full_name: z.string(),
  }),
  img_src: z.string(),
  earth_date: z.string(),
  rover: z.object({
    id: z.number(),
    name: z.string(),
    landing_date: z.string(),
    launch_date: z.string(),
    status: z.string(),
    max_sol: z.number(),
    max_date: z.string(),
    total_photos: z.number(),
  }),
});

export const nearEarthObjectSchema = z.object({
  id: z.string(),
  neo_reference_id: z.string(),
  name: z.string(),
  nasa_jpl_url: z.string(),
  absolute_magnitude_h: z.number(),
  estimated_diameter: z.object({
    kilometers: z.object({
      estimated_diameter_min: z.number(),
      estimated_diameter_max: z.number(),
    }),
    meters: z.object({
      estimated_diameter_min: z.number(),
      estimated_diameter_max: z.number(),
    }),
  }),
  is_potentially_hazardous_asteroid: z.boolean(),
  close_approach_data: z.array(z.object({
    close_approach_date: z.string(),
    close_approach_date_full: z.string(),
    epoch_date_close_approach: z.number(),
    relative_velocity: z.object({
      kilometers_per_second: z.string(),
      kilometers_per_hour: z.string(),
      miles_per_hour: z.string(),
    }),
    miss_distance: z.object({
      astronomical: z.string(),
      lunar: z.string(),
      kilometers: z.string(),
      miles: z.string(),
    }),
    orbiting_body: z.string(),
  })),
});

export const earthAssetSchema = z.object({
  date: z.string(),
  id: z.string(),
  url: z.string(),
});

export type APOD = z.infer<typeof apodSchema>;
export type EpicImage = z.infer<typeof epicImageSchema>;
export type MarsRoverPhoto = z.infer<typeof marsRoverPhotoSchema>;
export type NearEarthObject = z.infer<typeof nearEarthObjectSchema>;
export type EarthAsset = z.infer<typeof earthAssetSchema>;

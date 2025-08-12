# NASA Space Data Explorer

## Overview

NASA Space Data Explorer is a React-based web application that provides real-time access to NASA's space data through their public APIs. The application features an interactive dashboard displaying Astronomy Pictures of the Day (APOD), EPIC Earth images, Mars rover photos, and near-Earth object data. Users can explore space imagery, generate custom reports, and interact with various NASA datasets through an intuitive interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client uses a modern React stack with TypeScript and Vite for fast development. The UI is built with shadcn/ui components and Radix UI primitives, styled with Tailwind CSS using a space-themed design system. State management is handled through TanStack Query for server state and React's built-in state for local UI state. Routing is implemented using Wouter for lightweight client-side navigation.

### Backend Architecture
The backend is an Express.js server that acts as a proxy to NASA's APIs. It provides RESTful endpoints that fetch data from various NASA services including APOD, EPIC, Mars Rover Photos, and Near Earth Objects. The server implements request logging middleware and error handling to provide a consistent API experience.

### Data Architecture
The application uses Drizzle ORM with PostgreSQL for data persistence, though the current implementation includes a memory storage fallback. Database schemas are defined in TypeScript with Zod validation for runtime type safety. The shared schema definitions ensure type consistency between client and server.

### Design System
The application implements a comprehensive space-themed design system with CSS custom properties for colors, consistent spacing using Tailwind's utility classes, and glass morphism effects for modern UI elements. The design emphasizes visual hierarchy with cosmic blues and nebula yellows as accent colors.

### Component Architecture
The frontend follows a component-based architecture with reusable UI components in the `/components/ui` directory. Page components are organized by feature area (home, explore, gallery, reports) with shared components for navigation, hero sections, and data visualization.

## External Dependencies

### NASA APIs
- **APOD API**: Astronomy Picture of the Day service
- **EPIC API**: Earth Polychromatic Imaging Camera data
- **Mars Rover Photos API**: Images from NASA's Mars rovers
- **Near Earth Objects API**: Asteroid and comet tracking data

### Database
- **PostgreSQL**: Primary database for data persistence
- **Neon Database**: Cloud PostgreSQL provider (based on connection string pattern)

### UI and Styling
- **shadcn/ui**: Pre-built component library with Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and enhanced developer experience
- **Drizzle Kit**: Database migrations and schema management

### Runtime and Deployment
- **Node.js**: Server runtime environment
- **Express.js**: Web framework for API routes
- **Replit**: Development and hosting platform (based on Replit-specific configurations)
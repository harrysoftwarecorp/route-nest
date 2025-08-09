// ===========================================
// CORE SCHEMAS
// ===========================================

export interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  preferences: {
    defaultMapCenter: [number, number]; // [lat, lng]
    defaultZoom: number;
    measurementUnit: 'metric' | 'imperial';
    language: string;
  };
}

export interface Trip {
  _id: string;
  name: string;
  description?: string;
  userId: string; // Owner of the trip
  
  // Trip metadata
  createdAt: string;
  updatedAt: string;
  startDate?: string; // When the trip actually starts
  endDate?: string;   // When the trip ends
  estimatedDuration: number; // Duration in days
  
  // Trip settings
  isPublic: boolean;
  isTemplate: boolean; // Can others copy this trip?
  
  // Route data
  stops: Stop[];
  routes: RouteSegment[]; // Generated routes between stops
  
  // Trip statistics (calculated)
  stats: TripStats;
  
  // Categorization
  tags: string[]; // e.g., ["cultural", "food", "historical"]
  category: TripCategory;
  
  // Sharing and collaboration
  sharedWith: string[]; // User IDs who can view/edit
  visibility: 'private' | 'public' | 'shared';
  
  // Rating system
  rating?: number;
  reviewCount?: number;
}

export interface Stop {
  id: number;
  tripId: string;
  
  // Location data
  name: string;
  description?: string;
  lat: number;
  lng: number;
  address?: string;
  placeId?: string; // Google Places ID or OpenStreetMap ID
  
  // Timing
  plannedArrival: string; // ISO datetime
  plannedDeparture?: string; // ISO datetime
  estimatedDuration: number; // Minutes to spend at this stop
  actualArrival?: string; // For trip tracking
  actualDeparture?: string;
  
  // Stop details
  stopType: StopType;
  priority: 'low' | 'medium' | 'high'; // How important is this stop?
  cost?: number; // Estimated cost at this stop
  notes?: string;
  photos?: string[]; // Photo URLs
  
  // Ordering
  order: number; // Position in the trip sequence
  
  // Status
  isCompleted: boolean;
  isSkipped: boolean;
  
  createdAt: string;
  updatedAt: string;
}

export interface RouteSegment {
  id: string;
  fromStopId: number;
  toStopId: number;
  
  // Route geometry
  coordinates: [number, number][]; // Array of [lng, lat] points
  distance: number; // In meters
  estimatedDuration: number; // In seconds
  
  // Transportation
  transportMode: TransportMode;
  
  // Route details
  instructions?: RouteInstruction[];
  elevationProfile?: ElevationPoint[];
  
  createdAt: string;
}

export interface Itinerary {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  
  // Itinerary content
  tripIds: string[]; // Ordered list of trip IDs
  customStops: Stop[]; // Additional stops not part of any trip
  
  // Scheduling
  startDate: string;
  endDate: string;
  totalDuration: number; // Days
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  isActive: boolean; // Currently being executed?
  
  // Sharing
  isPublic: boolean;
  sharedWith: string[];
  
  // Progress tracking
  completedTripIds: string[];
  currentTripId?: string;
  
  tags: string[];
}

// ===========================================
// SUPPORTING TYPES
// ===========================================

export interface TripStats {
  totalDistance: number; // In meters
  estimatedDuration: number; // Total time in minutes
  stopCount: number;
  averageStopDuration: number; // Minutes
  transportModes: TransportMode[];
  estimatedCost?: number;
  difficultyLevel: 'easy' | 'moderate' | 'challenging';
}

export type StopType = 
  | 'attraction' // Tourist sites, landmarks
  | 'food' // Restaurants, cafes, street food
  | 'accommodation' // Hotels, hostels
  | 'transport' // Bus stations, airports
  | 'shopping' // Markets, malls
  | 'nature' // Parks, beaches, mountains
  | 'culture' // Museums, temples, galleries
  | 'activity' // Adventure sports, tours
  | 'rest' // Rest areas, viewpoints
  | 'custom'; // User-defined

export type TripCategory = 
  | 'cultural'
  | 'adventure'
  | 'food_tour'
  | 'nature'
  | 'city_exploration'
  | 'road_trip'
  | 'motorcycle_tour'
  | 'walking_tour'
  | 'business'
  | 'custom';

export type TransportMode = 
  | 'walking'
  | 'cycling'
  | 'motorcycle'
  | 'car'
  | 'public_transport'
  | 'boat'
  | 'flight';

export interface RouteInstruction {
  instruction: string;
  distance: number;
  duration: number;
  coordinates: [number, number];
}

export interface ElevationPoint {
  lat: number;
  lng: number;
  elevation: number; // In meters
}

// ===========================================
// API RESPONSE TYPES
// ===========================================

export interface TripSummary {
  _id: string;
  name: string;
  estimatedDuration: number;
  createdAt: string;
  stopCount: number;
  category: TripCategory;
  tags: string[];
  stats: Pick<TripStats, 'totalDistance' | 'estimatedCost'>;
  thumbnail?: string; // Preview image URL
  isPublic: boolean;
  rating?: number;
}

export interface TripDetail extends Trip {
  // Extended with computed fields for the UI
  nextStop?: Stop;
  progress: {
    completedStops: number;
    totalStops: number;
    percentComplete: number;
  };
}

// ===========================================
// FORM TYPES
// ===========================================

export interface CreateTripRequest {
  name: string;
  description?: string;
  estimatedDuration: number;
  category: TripCategory;
  tags: string[];
  startDate?: string;
  isPublic: boolean;
}

export interface AddStopRequest {
  name: string;
  lat: number;
  lng: number;
  plannedArrival: string;
  plannedDeparture?: string;
  estimatedDuration: number;
  stopType: StopType;
  description?: string;
  cost?: number;
  notes?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface UpdateStopRequest extends Partial<AddStopRequest> {
  id: number;
}

// ===========================================
// UI STATE TYPES
// ===========================================

export interface TripPageState {
  selectedStop?: Stop;
  mapMode: 'view' | 'edit' | 'add_stop';
  showStopDialog: boolean;
  showRouteOptions: boolean;
  clickedCoordinates?: { lat: number; lng: number };
}

export interface MapControls {
  focusStop: (lat: number, lng: number) => void;
  focusAllStops: () => void;
  setMapMode: (mode: 'view' | 'edit' | 'add_stop') => void;
}
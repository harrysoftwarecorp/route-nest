import axios from "axios";
import type { 
  TripSummary, 
  TripDetail, 
  CreateTripRequest, 
  AddStopRequest, 
  UpdateStopRequest,
  Stop 
} from "../types";

const BASE_URL = import.meta.env.VITE_API_SERVER_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
});

// ===========================================
// TRIP MANAGEMENT
// ===========================================

export const getTrips = async (): Promise<TripSummary[]> => {
  const response = await api.get("/api/trips");
  return response.data;
};

export const getTripById = async (tripId: string): Promise<TripDetail> => {
  const response = await api.get(`/api/trips/${tripId}`);
  return response.data;
};

export const createTrip = async (tripData: CreateTripRequest): Promise<TripDetail> => {
  const response = await api.post("/api/trips", tripData);
  return response.data;
};

export const updateTrip = async (
  tripId: string, 
  updates: Partial<CreateTripRequest>
): Promise<TripDetail> => {
  const response = await api.put(`/api/trips/${tripId}`, updates);
  return response.data;
};

export const deleteTripById = async (tripId: string): Promise<void> => {
  await api.delete(`/api/trips/${tripId}`);
};

// ===========================================
// STOP MANAGEMENT
// ===========================================

export const addStopToTrip = async (
  tripId: string,
  stopData: AddStopRequest
): Promise<TripDetail> => {
  const response = await api.post(`/api/trips/${tripId}/stops`, stopData);
  return response.data;
};

export const updateStop = async (
  tripId: string,
  stopData: UpdateStopRequest
): Promise<TripDetail> => {
  const response = await api.put(`/api/trips/${tripId}/stops/${stopData.id}`, stopData);
  return response.data;
};

export const deleteStopFromTrip = async (
  tripId: string, 
  stopId: number
): Promise<TripDetail> => {
  const response = await api.delete(`/api/trips/${tripId}/stops/${stopId}`);
  return response.data;
};

export const reorderStops = async (
  tripId: string,
  stopIds: number[]
): Promise<TripDetail> => {
  const response = await api.put(`/api/trips/${tripId}/stops/reorder`, {
    stopIds,
  });
  return response.data;
};

export const markStopCompleted = async (
  tripId: string,
  stopId: number,
  completed: boolean = true
): Promise<TripDetail> => {
  const response = await api.patch(`/api/trips/${tripId}/stops/${stopId}/status`, {
    isCompleted: completed,
    actualArrival: completed ? new Date().toISOString() : undefined,
  });
  return response.data;
};

// ===========================================
// ROUTE MANAGEMENT
// ===========================================

export const generateRoutes = async (tripId: string): Promise<TripDetail> => {
  const response = await api.post(`/api/trips/${tripId}/routes/generate`);
  return response.data;
};

export const optimizeRoute = async (
  tripId: string,
  options?: {
    startFromFirst?: boolean;
    returnToStart?: boolean;
    transportMode?: string;
  }
): Promise<TripDetail> => {
  const response = await api.post(`/api/trips/${tripId}/routes/optimize`, options);
  return response.data;
};

// ===========================================
// TRIP SHARING & COLLABORATION
// ===========================================

export const shareTrip = async (
  tripId: string,
  shareData: {
    emails?: string[];
    makePublic?: boolean;
    permissions?: 'view' | 'edit';
  }
): Promise<{ shareUrl: string; shareId: string }> => {
  const response = await api.post(`/api/trips/${tripId}/share`, shareData);
  return response.data;
};

export const forkTrip = async (tripId: string): Promise<TripDetail> => {
  const response = await api.post(`/api/trips/${tripId}/fork`);
  return response.data;
};

// ===========================================
// SEARCH & DISCOVERY
// ===========================================

export const searchTrips = async (params: {
  query?: string;
  category?: string;
  tags?: string[];
  location?: [number, number]; // [lat, lng]
  radius?: number; // km
  limit?: number;
}): Promise<TripSummary[]> => {
  const response = await api.get("/api/trips/search", { params });
  return response.data;
};

export const getPopularTrips = async (
  location?: [number, number],
  limit: number = 10
): Promise<TripSummary[]> => {
  const response = await api.get("/api/trips/popular", {
    params: { location, limit },
  });
  return response.data;
};

// ===========================================
// ITINERARY MANAGEMENT
// ===========================================

export const getUserItineraries = async (): Promise<any[]> => {
  const response = await api.get("/api/itineraries");
  return response.data;
};

export const addTripToItinerary = async (
  itineraryId: string,
  tripId: string
): Promise<any> => {
  const response = await api.post(`/api/itineraries/${itineraryId}/trips`, {
    tripId,
  });
  return response.data;
};

export const createItinerary = async (data: {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
}): Promise<any> => {
  const response = await api.post("/api/itineraries", data);
  return response.data;
};

// ===========================================
// BACKWARD COMPATIBILITY
// ===========================================

// Keep existing function signatures for backward compatibility
export const createTripLegacy = async ({
  name,
  length,
}: {
  name: string;
  length: number;
}): Promise<TripDetail> => {
  return createTrip({
    name,
    estimatedDuration: length,
    category: "custom",
    tags: [],
    isPublic: false,
  });
};

// Legacy stop addition (maps to new format)
export const addStopToTripLegacy = async (
  tripId: string,
  stop: Pick<Stop, "name" | "lat" | "lng" | "plannedTime">
): Promise<TripDetail> => {
  return addStopToTrip(tripId, {
    name: stop.name,
    lat: stop.lat,
    lng: stop.lng,
    plannedArrival: stop.plannedTime,
    estimatedDuration: 60, // Default 1 hour
    stopType: "custom",
    priority: "medium",
  });
};
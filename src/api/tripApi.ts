import axios from "axios";

export interface TripSummary {
  id: string;
  name: string;
  createdAt: string;
}

export interface TripDetail {
  stops: Stop[];
  routes: number[][][];
}

export interface Stop {
  id: number;
  name: string;
  lat: number;
  lng: number;
  plannedTime: string;
}

export const getTrips = async (): Promise<TripSummary[]> => {
  const response = await axios.get("/api/trips");
  console.log(response.data)
  return [...response.data];
}

export const getTripById = async (tripId: string): Promise<TripDetail> => {
  const response = await axios.get(`/api/trips/${tripId}`);
  return response.data;
}

export const createTrip = async ({name}): Promise<Response> => {
  const response = await axios.post(`/api/trips`, {name})
  return response.data;
}

export const deleteTripById = async (tripId: string): Promise<Response> => {
  const reponse = await axios.delete(`/api/trips/${tripId}`)
  return reponse.data;
}
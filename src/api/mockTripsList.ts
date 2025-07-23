// Mock API for trips list
export interface TripSummary {
  id: string;
  name: string;
  createdAt: string;
}

let trips: TripSummary[] = [
  { id: "1", name: "East Coast Adventure", createdAt: "2025-07-20T10:00:00Z" },
  { id: "2", name: "West Coast Roadtrip", createdAt: "2025-07-21T14:00:00Z" },
];

export function fetchTrips(): Promise<TripSummary[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...trips]), 300));
}

export function createTrip(name: string): Promise<TripSummary> {
  return new Promise((resolve) => {
    const newTrip = {
      id: (Date.now() + Math.random()).toString(),
      name,
      createdAt: new Date().toISOString(),
    };
    trips.push(newTrip);
    setTimeout(() => resolve(newTrip), 300);
  });
}

export function deleteTrip(id: string): Promise<void> {
  return new Promise((resolve) => {
    trips = trips.filter((t) => t.id !== id);
    setTimeout(() => resolve(), 300);
  });
}

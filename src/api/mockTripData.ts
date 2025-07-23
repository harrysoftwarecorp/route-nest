// Mock trip data API
export const fetchTripData = async () => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));
  // Mock data (matches requirements)
  return {
    stops: [
      { id: 1, name: "New York, NY", lat: 40.7128, lng: -74.006, plannedTime: "2025-07-23T09:00:00Z" },
      { id: 2, name: "Philadelphia, PA", lat: 39.9526, lng: -75.1652, plannedTime: "2025-07-23T12:00:00Z" },
      { id: 3, name: "Washington, DC", lat: 38.9072, lng: -77.0369, plannedTime: "2025-07-23T15:00:00Z" }
    ],
    routes: [
      [[40.7128, -74.006], [40.0, -74.5], [39.9526, -75.1652]],
      [[39.9526, -75.1652], [39.5, -75.5], [38.9072, -77.0369]]
    ]
  };
  // For real backend:
  // return axios.get('https://your-backend-api/trip/123').then(res => res.data);
};

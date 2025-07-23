// Mock trip data API
export const fetchTripData = async () => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));
  // Mock data (matches requirements)
  return {
    stops: [
      { id: 1, name: "Ben Thanh Market", lat: 10.7721, lng: 106.6980, plannedTime: "2025-07-23T09:00:00Z" },
      { id: 2, name: "Landmark 81", lat: 10.7952, lng: 106.7219, plannedTime: "2025-07-23T10:30:00Z" },
      { id: 3, name: "Vincom Thu Duc", lat: 10.8501, lng: 106.7559, plannedTime: "2025-07-23T12:00:00Z" }
    ],
    routes: [
      [[10.7721, 106.6980], [10.7837, 106.7100], [10.7952, 106.7219]],
      [[10.7952, 106.7219], [10.8227, 106.7389], [10.8501, 106.7559]]
    ]
  };
  // For real backend:
  // return axios.get('https://your-backend-api/trip/123').then(res => res.data);
};

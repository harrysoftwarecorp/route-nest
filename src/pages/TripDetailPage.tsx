import React, { useState } from "react";
import { Box } from "@mui/material";
import { TripBottomSheet } from "../components/trip/TripBottomSheet";
import { TripMapView } from "../components/map/TripMapView";
import type { TripDetail, Stop } from "../types";

export const TripDetailPage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Enhanced mock trip data with new schema
  const mockTrip: TripDetail = {
    _id: "trip_001",
    name: "Saigon Discovery Adventure",
    description:
      "A comprehensive cultural and culinary journey through Ho Chi Minh City's most iconic destinations.",
    userId: "user_001",
    createdAt: "2025-08-01T10:00:00Z",
    updatedAt: "2025-08-09T15:30:00Z",
    startDate: "2025-08-15T09:00:00Z",
    endDate: "2025-08-17T18:00:00Z",
    estimatedDuration: 3,
    isPublic: true,
    isTemplate: false,
    category: "city_exploration",
    tags: ["cultural", "food", "historical", "markets"],
    visibility: "public",
    sharedWith: [],
    rating: 4.3,
    reviewCount: 127,

    stops: [
      {
        id: 1,
        tripId: "trip_001",
        name: "Ben Thanh Market",
        description:
          "Historic market in the heart of Saigon, perfect for local souvenirs and street food",
        lat: 10.7722,
        lng: 106.698,
        address: "Bến Thành, Quận 1, Thành phố Hồ Chí Minh",
        plannedArrival: "2025-08-15T09:00:00Z",
        plannedDeparture: "2025-08-15T11:00:00Z",
        estimatedDuration: 120,
        stopType: "shopping",
        priority: "high",
        cost: 200000,
        notes: "Try the bánh mì and fresh fruit stalls on the north side",
        photos: [],
        order: 1,
        isCompleted: false,
        isSkipped: false,
        createdAt: "2025-08-01T10:00:00Z",
        updatedAt: "2025-08-01T10:00:00Z",
      },
      {
        id: 2,
        tripId: "trip_001",
        name: "Saigon Notre-Dame Cathedral",
        description:
          "Neo-Romanesque cathedral built by French colonists in the late 1800s",
        lat: 10.7798,
        lng: 106.699,
        address: "1 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
        plannedArrival: "2025-08-15T11:30:00Z",
        plannedDeparture: "2025-08-15T12:30:00Z",
        estimatedDuration: 60,
        stopType: "culture",
        priority: "medium",
        cost: 0,
        notes: "Free entry, best photos from the front steps",
        photos: [],
        order: 2,
        isCompleted: true,
        isSkipped: false,
        createdAt: "2025-08-01T10:00:00Z",
        updatedAt: "2025-08-01T10:00:00Z",
      },
      {
        id: 3,
        tripId: "trip_001",
        name: "Independence Palace",
        description: "Historic palace and symbol of Vietnamese independence",
        lat: 10.7769,
        lng: 106.6955,
        address:
          "135 Nam Kỳ Khởi Nghĩa, Bến Thành, Quận 1, Thành phố Hồ Chí Minh",
        plannedArrival: "2025-08-15T14:00:00Z",
        plannedDeparture: "2025-08-15T15:30:00Z",
        estimatedDuration: 90,
        stopType: "attraction",
        priority: "high",
        cost: 65000,
        notes: "Don't miss the war room in the basement",
        photos: [],
        order: 3,
        isCompleted: false,
        isSkipped: false,
        createdAt: "2025-08-01T10:00:00Z",
        updatedAt: "2025-08-01T10:00:00Z",
      },
      {
        id: 4,
        tripId: "trip_001",
        name: "Bitexco Financial Tower",
        description:
          "Iconic skyscraper with observation deck offering panoramic city views",
        lat: 10.7714,
        lng: 106.7044,
        address: "2 Hải Triều, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
        plannedArrival: "2025-08-15T16:00:00Z",
        plannedDeparture: "2025-08-15T17:00:00Z",
        estimatedDuration: 60,
        stopType: "attraction",
        priority: "medium",
        cost: 200000,
        notes: "Best sunset views from SkyBar on 50th floor",
        photos: [],
        order: 4,
        isCompleted: false,
        isSkipped: false,
        createdAt: "2025-08-01T10:00:00Z",
        updatedAt: "2025-08-01T10:00:00Z",
      },
    ],

    routes: [],

    stats: {
      totalDistance: 5200, // 5.2 km
      estimatedDuration: 480, // 8 hours total
      stopCount: 4,
      averageStopDuration: 82.5, // Average minutes per stop
      transportModes: ["walking", "motorcycle"],
      estimatedCost: 465000, // Total estimated cost in VND
      difficultyLevel: "easy",
    },

    // Progress tracking
    progress: {
      completedStops: 1,
      totalStops: 4,
      percentComplete: 25,
    },

    nextStop: {
      id: 3,
      tripId: "trip_001",
      name: "Independence Palace",
      description: "Historic palace and symbol of Vietnamese independence",
      lat: 10.7769,
      lng: 106.6955,
      address:
        "135 Nam Kỳ Khởi Nghĩa, Bến Thành, Quận 1, Thành phố Hồ Chí Minh",
      plannedArrival: "2025-08-15T14:00:00Z",
      plannedDeparture: "2025-08-15T15:30:00Z",
      estimatedDuration: 90,
      stopType: "attraction",
      priority: "high",
      cost: 65000,
      notes: "Don't miss the war room in the basement",
      photos: [],
      order: 3,
      isCompleted: false,
      isSkipped: false,
      createdAt: "2025-08-01T10:00:00Z",
      updatedAt: "2025-08-01T10:00:00Z",
    },
  };

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddToItinerary = () => {
    console.log("Adding trip to itinerary...");
    // TODO: Implement itinerary addition logic
  };

  const handleStopClick = (stop: Stop) => {
    console.log("Focusing on stop:", stop.name);
    // TODO: Focus map on specific stop
  };

  const handleAddStop = () => {
    console.log("Opening add stop dialog...");
    // TODO: Open add stop dialog
  };

  const handleShare = () => {
    console.log("Sharing trip...");
    // TODO: Implement share functionality
  };

  const handleFavorite = () => {
    console.log("Adding to favorites...");
    // TODO: Implement favorite functionality
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Full-Screen Map */}
      <TripMapView
        trip={mockTrip}
        height="100vh"
        showControls={true}
        center={[10.7769, 106.7009]}
        zoom={13}
      />

      {/* Collapsible Bottom Sheet */}
      <TripBottomSheet
        trip={mockTrip}
        isExpanded={isExpanded}
        onToggleExpanded={handleToggleExpanded}
        onAddToItinerary={handleAddToItinerary}
        onStopClick={handleStopClick}
        onAddStop={handleAddStop}
        onShare={handleShare}
        onFavorite={handleFavorite}
      />
    </Box>
  );
};

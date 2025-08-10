import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { TripBottomSheet } from "../components/trip/TripBottomSheet";
import { TripMapView } from "../components/map/TripMapView";
import { AddStopDialog } from "../components/stop/AddStopDialog";
import {
  getTripById,
  addStopToTrip,
  deleteStopFromTrip,
  updateStop,
  addTripToItinerary,
  shareTrip,
  markStopCompleted,
} from "../api/tripApi";
import type { TripDetail, Stop, AddStopRequest, MapControls } from "../types";

export const TripDetailPage: React.FC = () => {
  // Route params
  const { tripId } = useParams<{ tripId: string }>();

  // State management
  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddStopDialog, setShowAddStopDialog] = useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);

  // Map controls
  const [mapControls, setMapControls] = useState<MapControls | null>(null);

  const loadTripData = React.useCallback(async () => {
    if (!tripId) return;

    try {
      setLoading(true);
      const tripData = await getTripById(tripId);
      setTrip(tripData);
      setError(null);
    } catch (err) {
      console.error("Failed to load trip:", err);
      setError("Failed to load trip data");
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  // Load trip data on mount
  useEffect(() => {
    loadTripData();
  }, [loadTripData]);

  // Event handlers
  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMapClick = (lat: number, lng: number) => {
    setClickedCoordinates({ lat, lng });
    setShowAddStopDialog(true);
  };

  const handleMapReady = (controls: MapControls) => {
    setMapControls(controls);
  };

  const handleStopClick = (stop: Stop) => {
    console.log("Focusing on stop:", stop.name);
    setSelectedStop(stop);

    // Focus map on the stop
    if (mapControls) {
      mapControls.focusStop(stop.lat, stop.lng);
    }

    // Collapse bottom sheet on mobile for better map view
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  const handleAddStop = () => {
    setClickedCoordinates(null);
    setShowAddStopDialog(true);
  };

  const handleAddStopSubmit = async (stopData: AddStopRequest) => {
    if (!tripId) return;

    try {
      const updatedTrip = await addStopToTrip(tripId, stopData);
      setTrip(updatedTrip);
      setShowAddStopDialog(false);
      setClickedCoordinates(null);

      console.log("Stop added successfully");
    } catch (error) {
      console.error("Failed to add stop:", error);
      // You could add a toast notification here
    }
  };

  const handleDeleteStop = async (stopId: number) => {
    if (!tripId || !trip) return;

    try {
      const updatedTrip = await deleteStopFromTrip(tripId, stopId);
      setTrip(updatedTrip);

      // Clear selected stop if it was deleted
      if (selectedStop?.id === stopId) {
        setSelectedStop(null);
      }

      console.log("Stop deleted successfully");
    } catch (error) {
      console.error("Failed to delete stop:", error);
    }
  };

  const handleEditStop = async (stop: Stop) => {
    // TODO: Implement edit stop functionality
    console.log("Edit stop:", stop.name);
    // You would typically open an edit dialog here
  };

  const handleCompleteStop = async (
    stopId: number,
    completed: boolean = true
  ) => {
    if (!tripId) return;

    try {
      const updatedTrip = await markStopCompleted(tripId, stopId, completed);
      setTrip(updatedTrip);

      console.log(
        `Stop ${completed ? "completed" : "uncompleted"} successfully`
      );
    } catch (error) {
      console.error("Failed to update stop status:", error);
    }
  };

  const handleAddToItinerary = async () => {
    if (!tripId) return;

    try {
      // TODO: Implement proper itinerary selection
      // For now, we'll just log the action
      console.log("Adding trip to itinerary...");

      // You might want to:
      // 1. Show a dialog to select which itinerary to add to
      // 2. Or create a new itinerary
      // 3. Handle the API call properly

      // Example:
      // await addTripToItinerary("default-itinerary-id", tripId);
    } catch (error) {
      console.error("Failed to add trip to itinerary:", error);
    }
  };

  const handleShare = async () => {
    if (!tripId) return;

    try {
      const shareData = await shareTrip(tripId, {
        makePublic: true,
        permissions: "view",
      });

      // Copy share URL to clipboard
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.shareUrl);
        console.log("Share URL copied to clipboard");
      }

      console.log("Trip shared successfully:", shareData.shareUrl);
    } catch (error) {
      console.error("Failed to share trip:", error);
    }
  };

  const handleFavorite = () => {
    // TODO: Implement favorite functionality
    console.log("Adding to favorites...");
  };

  const handleCloseAddStopDialog = () => {
    setShowAddStopDialog(false);
    setClickedCoordinates(null);
  };

  const handleViewAllStops = () => {
    if (mapControls) {
      mapControls.focusAllStops();
    }
    setIsExpanded(true);
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Loading trip data...</div>
      </Box>
    );
  }

  // Error state
  if (error || !trip) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <div>Error: {error || "Trip not found"}</div>
        <button onClick={() => window.history.back()}>Go Back</button>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f8fafc",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Full-Screen Interactive Map */}
        <TripMapView
          trip={trip}
          height="100vh"
          showControls={true}
          center={
            selectedStop
              ? [selectedStop.lat, selectedStop.lng]
              : trip.stops.length > 0
              ? [
                  trip.stops.reduce((sum, stop) => sum + stop.lat, 0) /
                    trip.stops.length,
                  trip.stops.reduce((sum, stop) => sum + stop.lng, 0) /
                    trip.stops.length,
                ]
              : [10.7769, 106.7009]
          }
          zoom={selectedStop ? 16 : 13}
          onMapReady={handleMapReady}
          onMapClick={handleMapClick}
        />

        {/* Enhanced Bottom Sheet with Full Functionality */}
        <TripBottomSheet
          trip={trip}
          isExpanded={isExpanded}
          onToggleExpanded={handleToggleExpanded}
          onAddToItinerary={handleAddToItinerary}
          onStopClick={handleStopClick}
          onAddStop={handleAddStop}
          onDeleteStop={handleDeleteStop}
          onEditStop={handleEditStop}
          onCompleteStop={handleCompleteStop}
          onViewAllStops={handleViewAllStops}
          onShare={handleShare}
          onFavorite={handleFavorite}
        />
      </Box>

      {/* Add Stop Dialog with Map Integration */}
      <AddStopDialog
        open={showAddStopDialog}
        onClose={handleCloseAddStopDialog}
        onSubmit={handleAddStopSubmit}
        prefilledLat={clickedCoordinates?.lat}
        prefilledLng={clickedCoordinates?.lng}
      />
    </>
  );
};

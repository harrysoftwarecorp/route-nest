import { Box, Drawer } from "@mui/material";
import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import {
  getTripById,
  addStopToTrip,
  deleteStopFromTrip,
  type TripDetail,
} from "../api/tripApi";
import TripMap from "../components/TripMap";
import TripSidebar from "../components/TripSidebar";
import AddStopDialog from "../components/AddStopDialog";

export const tripDetailLoader = async ({ params }: { params: any }) => {
  const { tripId } = params;
  return await getTripById(tripId);
};

const TripPage: React.FC = () => {
  const trip = useLoaderData() as TripDetail;
  const { tripId } = useParams();
  const [toggleAddStopForm, setToggleAddStopForm] = useState<boolean>(false);
  const [clickedCoordinates, setClickedCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [mapControls, setMapControls] = useState<{
    focusStop: (lat: number, lng: number) => void;
    focusAllStops: () => void;
  } | null>(null);

  const toggleForm = () => {
    setToggleAddStopForm(!toggleAddStopForm);
    // Clear clicked coordinates when manually opening the form
    if (!toggleAddStopForm) {
      setClickedCoordinates(null);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    // Store the clicked coordinates
    setClickedCoordinates({ lat, lng });
    // Open the add stop dialog
    setToggleAddStopForm(true);
  };

  const handleAddStop = async (stopData: {
    stopName: string;
    latitude: number;
    longitude: number;
    plannedDateTime: Date;
  }) => {
    if (!tripId) return;

    try {
      await addStopToTrip(tripId, {
        name: stopData.stopName,
        lat: stopData.latitude,
        lng: stopData.longitude,
        plannedTime: stopData.plannedDateTime.toISOString(),
      });
      // Clear clicked coordinates after successful addition
      setClickedCoordinates(null);
      // Refresh page to show new stop
      window.location.reload();
    } catch (error) {
      console.error("Failed to add stop:", error);
    }
  };

  const handleDeleteStop = async (stopId: number) => {
    if (!tripId) return;

    try {
      await deleteStopFromTrip(tripId, stopId);
      // Refresh page to show updated stops
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete stop:", error);
    }
  };

  const handleDialogClose = () => {
    setToggleAddStopForm(false);
    // Clear clicked coordinates when dialog is closed
    setClickedCoordinates(null);
  };

  const drawer = trip ? (
    <TripSidebar
      stops={trip.stops}
      onStopClick={mapControls?.focusStop}
      onViewAllClick={mapControls?.focusAllStops}
      toggleForm={toggleForm}
      onDeleteStop={handleDeleteStop}
    />
  ) : null;

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            pt: 0,
            position: "relative",
            height: { xs: "70vh", md: "100%" }, // Adjust height for mobile
          }}
        >
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              height: "100%", // Ensure map container takes full height
            }}
          >
            {trip && (
              <TripMap
                stops={trip.stops}
                routes={trip.routes}
                onMapReady={setMapControls}
                onMapClick={handleMapClick} // Pass the map click handler
              />
            )}
          </Box>
          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            anchor="right"
            open
            sx={{
              display: { xs: "none", md: "block" },
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
              },
            }}
          >
            {drawer}
          </Drawer>
          {/* Mobile Drawer */}
          <Drawer
            variant="permanent"
            anchor="bottom"
            open
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                height: "30vh",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <AddStopDialog
        open={toggleAddStopForm}
        onClose={handleDialogClose}
        onSubmit={handleAddStop}
        prefilledLat={clickedCoordinates?.lat}
        prefilledLng={clickedCoordinates?.lng}
      />
    </>
  );
};

export default TripPage;

import { Box, Drawer } from "@mui/material";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getTripById } from "../api/tripApi";
import TripMap from "../components/TripMap";
import TripSidebar from "../components/TripSidebar";
import AddStopDialog from "../components/AddStopDialog";

export const tripDetailLoader = async ({ params }) => {
  const { tripId } = params;
  const tripDetail = await getTripById(tripId);
  return tripDetail;
};

const TripPage: React.FC = () => {
  const trip = useLoaderData();
  const [toggleAddStopForm, setToggleAddStopForm] = useState<boolean>(false);
  const [mapControls, setMapControls] = useState<{
    focusStop: (lat: number, lng: number) => void;
    focusAllStops: () => void;
  } | null>(null);

  const toggleForm = () => {
    setToggleAddStopForm(!toggleAddStopForm);
  };

  const handleAddStop = (stopData: {
    stopName: string;
    latitude: number;
    longitude: number;
    plannedDateTime: Date;
  }) => {
    console.log(stopData);
    // Add your stop handling logic here
  };

  const drawer = trip ? (
    <TripSidebar
      stops={trip.stops}
      onStopClick={mapControls?.focusStop}
      onViewAllClick={mapControls?.focusAllStops}
      toggleForm={toggleForm}
    />
  ) : null;

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flex: 1, pt: 0 }}>
          <Box sx={{ flex: 1, position: "relative", minWidth: 0 }}>
            {trip && (
              <TripMap
                stops={trip.stops}
                routes={trip.routes}
                onMapReady={setMapControls}
              />
            )}
          </Box>
          <Drawer
            variant="permanent"
            anchor="right"
            open
            sx={{
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <AddStopDialog
        open={toggleAddStopForm}
        onClose={toggleForm}
        onSubmit={handleAddStop}
      />
    </>
  );
};

export default TripPage;

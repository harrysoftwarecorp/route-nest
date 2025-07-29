import { Box, Drawer, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getTripById } from "../api/tripApi";
import TripMap from "../components/TripMap";
import TripSidebar from "../components/TripSidebar";

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
      <Modal
        open={toggleAddStopForm}
        onClose={toggleForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default TripPage;

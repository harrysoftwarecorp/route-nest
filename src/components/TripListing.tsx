import { Box, Typography } from "@mui/material";
import { TripCard } from "./TripCard";

export const TripListing = ({ trips, handleTripDelete }) => {
  return (
    <Box p={2} pt={2}>
      <Typography
        pb={2}
        variant="body1"
        sx={{ fontWeight: "bold" }}
        color="primary.main"
      >
        Your Trips
      </Typography>
      <Box
        sx={{
          height: "60vh",
          overflowY: "auto",
        }}
      >
        {trips.map((trip) => (
          <TripCard trip={trip} handleTripDelete={handleTripDelete} />
        ))}
      </Box>
    </Box>
  );
};

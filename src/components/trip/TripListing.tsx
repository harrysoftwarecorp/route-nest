import { Box, Typography } from "@mui/material";
import { TripCard } from "./TripCard";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import type { TripSummary } from "../../api/tripApi";
import { useEffect, useState } from "react";

interface TripListingProps {
  trips: TripSummary[];
  handleTripDelete: (tripId: string) => void;
}

export const TripListing = ({ trips, handleTripDelete }: TripListingProps) => {
  const [sortedTrips, setSortedTrips] = useState<TripSummary[]>([]);

  useEffect(() => {
    setSortedTrips(
      [...trips].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  }, [trips]);

  return (
    <Box p={2} pt={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          pb={2}
          variant="body1"
          sx={{ fontWeight: "bold" }}
          color="primary.main"
        >
          Your Trips
        </Typography>
        <Box
          color="primary.main"
          // onClick={() => setSortedTrips([...sortedTrips].reverse())}
        >
          <SwapVertIcon />
        </Box>
      </Box>
      {/* Trip Cards */}
      {trips.length > 0 && (
        <Box
          sx={{
            height: "50vh",
            overflowY: "auto",
          }}
        >
          {sortedTrips.map((trip: TripSummary) => (
            <TripCard
              key={trip._id}
              trip={trip}
              handleTripDelete={handleTripDelete}
            />
          ))}
        </Box>
      )}
      {/* No trips message */}
      {trips.length === 0 && (
        <Box
          border={1}
          borderColor="LightGray"
          borderRadius={2}
          p={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No trips found. Start planning your next adventure!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

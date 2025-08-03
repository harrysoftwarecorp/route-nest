import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, Grid, Typography } from "@mui/material";
import type { TripSummary } from "../api/tripApi";

interface TripCardProps {
  trip: TripSummary;
  handleTripDelete: (tripId: string) => void;
}

export const TripCard = ({ trip, handleTripDelete }: TripCardProps) => {
  return (
    <Box border={1} borderRadius={2} borderColor="LightGray" mb={2}>
      {/* Header with Trip ID */}
      <Box
        bgcolor={"primary.main"}
        sx={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
      >
        <Typography
          px={2}
          py={1}
          variant="body2"
          sx={{ fontWeight: "bold" }}
          color="primary.contrastText"
        >
          ID: {trip._id}
        </Typography>
      </Box>
      {/* Trip Details */}
      <Grid container>
        <Grid size={3}>
          <Box
            component="img"
            src="https://images.unsplash.com/flagged/photo-1552470470-959579335ea9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cm9hZHRyaXB8ZW58MHx8MHx8fDA%3D"
            alt="trip-logo"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>
        <Grid size={9}>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontWeight: "bold" }}
            p={2}
          >
            {trip.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" px={2}>
            <CalendarTodayIcon
              fontSize="medium"
              sx={{ verticalAlign: "middle", mr: 0.5 }}
            />
            {new Date(trip.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary" p={2}>
            <ScheduleIcon
              fontSize="medium"
              sx={{ verticalAlign: "middle", mr: 0.5 }}
            />
            3 days
          </Typography>
        </Grid>
      </Grid>
      {/* Action Buttons */}
      <Grid container>
        <Grid
          size={6}
          bgcolor={"primary.main"}
          sx={{
            borderBottomLeftRadius: "8px",
          }}
        >
          <Box onClick={() => console.log("Trip clicked!")}>
            <Typography
              variant="body2"
              color="primary.contrastText"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                p: 1,
                cursor: "pointer",
              }}
            >
              View Details
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={6}
          bgcolor={"error.light"}
          sx={{
            borderBottomRightRadius: "8px",
          }}
        >
          <Box onClick={() => handleTripDelete(trip._id)}>
            <Typography
              variant="body2"
              color="error.contrastText"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                p: 1,
                cursor: "pointer",
              }}
            >
              Delete
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

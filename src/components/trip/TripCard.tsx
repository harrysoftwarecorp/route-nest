import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeleteIcon from "@mui/icons-material/Delete";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, Grid, Typography } from "@mui/material";
import type { TripSummary } from "../../api/tripApi";
import { useNavigate } from "react-router-dom";

interface TripCardProps {
  trip: TripSummary;
  handleTripDelete: (tripId: string) => void;
}

export const TripCard = ({ trip, handleTripDelete }: TripCardProps) => {
  const navigate = useNavigate();

  return (
    <Box border={1} borderRadius={2} borderColor="LightGray" mb={2}>
      {/* Trip Details */}
      <Grid container>
        <Grid size={3}>
          <Box
            component="img"
            src="https://media.istockphoto.com/id/1349388632/video/planes-routes-flying-over-world-map-tourism-and-travel-concept-graphic-animation.jpg?s=640x640&k=20&c=stIhMDocRBI0kAHrEgNtaU6O0uw1RiIFg4yO3N68X1Y="
            alt="trip-logo"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
            }}
          />
        </Grid>
        <Grid size={7} onClick={() => navigate(`/trips/${trip._id}`)}>
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
            {trip.length} days
          </Typography>
        </Grid>
        <Grid size={2} borderLeft={1} borderColor="LightGray">
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            color="error.light"
            onClick={() => handleTripDelete(trip._id)}
          >
            <DeleteIcon />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

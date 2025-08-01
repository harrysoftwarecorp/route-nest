import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  getTrips,
  deleteTripById,
  createTrip,
  type TripSummary,
} from "../api/tripApi";

export const tripLoader = async () => {
  try {
    const trips: TripSummary[] = await getTrips();
    return trips;
  } catch (err) {
    console.error("Error get trips", err);
  }
};

const LandingPage: React.FC = () => {
  const [newTripName, setNewTripName] = useState("");
  const navigate = useNavigate();
  const initialTrips = useLoaderData();

  const [trips, setTrips] = useState(initialTrips);

  const handleCreate = async () => {
    await createTrip({ name: newTripName });
    const updatedTrips = await getTrips();
    setNewTripName("");
    setTrips(updatedTrips);
  };

  const handleDelete = async (id: string) => {
    await deleteTripById(id);
    const updatedTrips = await getTrips();
    setTrips(updatedTrips);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", pb: { xs: 4, sm: 0 } }}>
      <Box
        sx={{
          maxWidth: 480,
          mx: "auto",
          p: { xs: 2, sm: 3 },
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mt: { xs: 2, sm: 3 },
            mb: { xs: 2, sm: 3 },
            textAlign: "center",
            fontSize: { xs: 24, sm: 28 },
            fontWeight: 600,
          }}
        >
          Your Trips
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1.5, sm: 1 },
            mb: { xs: 2, sm: 3 },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            label="New Trip Name"
            value={newTripName}
            onChange={(e) => setNewTripName(e.target.value)}
            fullWidth
            size="small"
            sx={{
              "& .MuiInputBase-root": {
                height: { xs: 48, sm: 40 },
              },
            }}
            inputProps={{
              style: { fontSize: 16 },
              maxLength: 50,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            disabled={!newTripName.trim()}
            sx={{
              minWidth: { xs: "100%", sm: 120 },
              fontSize: 16,
              height: { xs: 48, sm: 40 },
              mt: { xs: 0, sm: 0 },
            }}
          >
            Add
          </Button>
        </Box>
        <List sx={{ width: "100%", gap: { xs: 1.5, sm: 1 } }}>
          {trips.map((trip: TripSummary) => (
            <React.Fragment key={trip._id}>
              <ListItem
                component="div"
                sx={{
                  borderRadius: 2,
                  mb: { xs: 2, sm: 1 },
                  bgcolor: "white",
                  cursor: "pointer",
                  px: { xs: 2, sm: 2 },
                  py: { xs: 2.5, sm: 2 },
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "stretch", sm: "center" },
                  gap: { xs: 1, sm: 0 },
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: { xs: 18, sm: 18 },
                        fontWeight: 500,
                        mb: { xs: 0.5, sm: 0 },
                      }}
                    >
                      {trip.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        fontSize: { xs: 14, sm: 14 },
                        color: "text.secondary",
                      }}
                    >
                      Created: {new Date(trip.createdAt).toLocaleString()}
                    </Typography>
                  }
                  onClick={() => navigate(`/trip/${trip._id}`)}
                  sx={{ flex: 1 }}
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  sx={{
                    touchAction: "manipulation",
                    width: { xs: "100%", sm: "auto" },
                    borderRadius: { xs: 1, sm: "50%" },
                    border: { xs: "1px solid #e0e0e0", sm: "none" },
                    py: { xs: 1, sm: 1 },
                  }}
                  onClick={() => handleDelete(trip._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider sx={{ display: { xs: "none", sm: "block" } }} />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default LandingPage;

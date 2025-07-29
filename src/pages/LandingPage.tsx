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
import type { TripSummary } from "../api/mockTripsList";
import { getTrips, deleteTripById, createTrip } from "../api/tripApi";

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
    createTrip({ name: newTripName });
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
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Box
        sx={{
          maxWidth: 480,
          mx: "auto",
          p: { xs: 1, sm: 2 },
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mt: { xs: 1, sm: 2 },
            mb: { xs: 1, sm: 2 },
            textAlign: "center",
            fontSize: { xs: 20, sm: 28 },
          }}
        >
          Your Trips
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: { xs: 1, sm: 2 },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            label="New Trip Name"
            value={newTripName}
            onChange={(e) => setNewTripName(e.target.value)}
            fullWidth
            size="small"
            inputProps={{ style: { fontSize: 16 } }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            disabled={!newTripName.trim()}
            sx={{
              minWidth: { xs: "100%", sm: 80 },
              fontSize: { xs: 16, sm: 16 },
              mt: { xs: 1, sm: 0 },
            }}
          >
            Add
          </Button>
        </Box>
        <List sx={{ width: "100%" }}>
          {trips.map((trip) => (
            <React.Fragment key={trip.id}>
              <ListItem
                component="div"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  bgcolor: "white",
                  cursor: "pointer",
                  px: { xs: 1, sm: 2 },
                  py: { xs: 1, sm: 2 },
                  fontSize: { xs: 16, sm: 18 },
                }}
              >
                <ListItemText
                  primary={<span style={{ fontSize: 18 }}>{trip.name}</span>}
                  secondary={
                    <span style={{ fontSize: 14 }}>
                      Created: {new Date(trip.createdAt).toLocaleString()}
                    </span>
                  }
                  onClick={() => navigate(`/trip/${trip.id}`)}
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  sx={{ touchAction: "manipulation" }}
                  onClick={() => handleDelete(trip.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default LandingPage;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  AppBar,
  Toolbar,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { fetchTrips, createTrip, deleteTrip } from "../api/mockTripsList";
import type { TripSummary } from "../api/mockTripsList";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const [trips, setTrips] = useState<TripSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTripName, setNewTripName] = useState("");
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadTrips = () => {
    setLoading(true);
    setError(null);
    fetchTrips()
      .then(setTrips)
      .catch(() => setError("Failed to load trips."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const handleCreate = async () => {
    if (!newTripName.trim()) return;
    setCreating(true);
    try {
      await createTrip(newTripName.trim());
      setNewTripName("");
      loadTrips();
    } catch {
      setError("Failed to create trip.");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteTrip(id);
      loadTrips();
    } catch {
      setError("Failed to delete trip.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontSize: { xs: 18, sm: 24 } }}
          >
            RouteNest
          </Typography>
        </Toolbar>
      </AppBar>
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
            disabled={creating}
            inputProps={{ style: { fontSize: 16 } }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            disabled={creating || !newTripName.trim()}
            sx={{
              minWidth: { xs: "100%", sm: 80 },
              fontSize: { xs: 16, sm: 16 },
              mt: { xs: 1, sm: 0 },
            }}
          >
            Add
          </Button>
        </Box>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : trips.length === 0 ? (
          <Alert severity="info">No trips found. Create your first trip!</Alert>
        ) : (
          <List sx={{ width: "100%" }}>
            {trips.map((trip) => (
              <React.Fragment key={trip.id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(trip.id)}
                      disabled={deletingId === trip.id}
                      sx={{ touchAction: "manipulation" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
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
                  onClick={() => navigate(`/trip/${trip.id}`)}
                >
                  <ListItemText
                    primary={<span style={{ fontSize: 18 }}>{trip.name}</span>}
                    secondary={
                      <span style={{ fontSize: 14 }}>
                        Created: {new Date(trip.createdAt).toLocaleString()}
                      </span>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default LandingPage;

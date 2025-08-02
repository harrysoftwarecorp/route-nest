import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Fab,
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
    return [];
  }
};

const LandingPage: React.FC = () => {
  const [newTripName, setNewTripName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();
  const initialTrips = useLoaderData() as TripSummary[];
  const [trips, setTrips] = useState<TripSummary[]>(initialTrips || []);

  const handleCreate = async () => {
    if (!newTripName.trim()) return;

    try {
      await createTrip({ name: newTripName });
      const updatedTrips = await getTrips();
      setNewTripName("");
      setTrips(updatedTrips);
      setShowCreateForm(false);
    } catch (error) {
      console.error("Failed to create trip:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTripById(id);
      const updatedTrips = await getTrips();
      setTrips(updatedTrips);
    } catch (error) {
      console.error("Failed to delete trip:", error);
    }
  };

  const filteredTrips = trips.filter((trip) =>
    trip.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        pb: 10, // Space for FAB
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          pt: 2,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: "0 0 24px 24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
              Welcome to RouteNest 👋
            </Typography>
          </Box>
        </Box>
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "rgba(0,0,0,0.4)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "white",
              borderRadius: 3,
              "& fieldset": { border: "none" },
              "& input": { py: 2 },
            },
          }}
        />
      </Box>

      <Box sx={{ px: 3, mt: 3 }}>
        {/* Your Trips Section */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a202c" }}>
              Your Trips
            </Typography>
          </Box>

          {filteredTrips.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 6,
                bgcolor: "white",
                borderRadius: 3,
                border: "2px dashed #e2e8f0",
              }}
            >
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {searchQuery
                  ? "No trips found for your search."
                  : "No trips yet. Create your first adventure!"}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {filteredTrips.map((trip) => (
                <Card
                  key={trip._id}
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.15)" },
                    transition: "all 0.2s",
                  }}
                  onClick={() => navigate(`/trip/${trip._id}`)}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 2,
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: 600,
                          fontSize: 18,
                        }}
                      >
                        {trip.name.charAt(0).toUpperCase()}
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {trip.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            mb: 1,
                          }}
                        >
                          <CalendarTodayIcon
                            sx={{ fontSize: 14, color: "#64748b" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(trip.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Chip
                          label="Trip Planning"
                          size="small"
                          sx={{
                            bgcolor: "#e0f2fe",
                            color: "#0277bd",
                            height: 24,
                            fontSize: 11,
                          }}
                        />
                      </Box>

                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(trip._id);
                        }}
                        sx={{
                          color: "#f56565",
                          "&:hover": { bgcolor: "#fed7d7" },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Create Trip Dialog */}
      {showCreateForm && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1300,
            p: 3,
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 400,
              borderRadius: 3,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Create New Trip
              </Typography>

              <TextField
                fullWidth
                label="Trip Name"
                value={newTripName}
                onChange={(e) => setNewTripName(e.target.value)}
                placeholder="Enter your adventure name"
                sx={{ mb: 3 }}
                autoFocus
              />

              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewTripName("");
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCreate}
                  disabled={!newTripName.trim()}
                  sx={{
                    borderRadius: 2,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  Create Trip
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
          },
        }}
        onClick={() => setShowCreateForm(true)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default LandingPage;

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CardMedia,
  Chip,
  Grid,
  Avatar,
  IconButton,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { createTripLegacy, deleteTripById, getTrips } from "../api/tripApi";
import type { TripSummary } from "../types";
import { useNavigate } from "react-router-dom";

export const tripLoader = async () => {
  try {
    const trips: TripSummary[] = await getTrips();
    return trips;
  } catch (err) {
    console.error("Error getting trips", err);
    return [];
  }
};

const LandingPage: React.FC = () => {
  const [newTripName, setNewTripName] = useState("");
  const [newTripLength, setNewTripLength] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const initialTrips = useLoaderData() as TripSummary[];
  const [trips, setTrips] = useState<TripSummary[]>(initialTrips || []);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!newTripName.trim()) return;
    if (newTripLength <= 0) return;

    try {
      await createTripLegacy({ name: newTripName, length: newTripLength });
      const updatedTrips = await getTrips();
      setNewTripName("");
      setNewTripLength(0);
      setTrips([...updatedTrips]);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
  };

  // Navigate to TripDetailPage instead of TripPage
  const handleCardClick = (tripId: string) => {
    navigate(`/trip-detail/${tripId}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        pb: 4,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          px: 3,
          bgcolor: "white",
          boxShadow: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            fontSize: { xs: 20, sm: 24 },
          }}
        >
          RouteNest
        </Typography>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <AccountCircleIcon />
        </Avatar>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Search Section */}
        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: "white",
            mb: 4,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "medium",
              color: "text.primary",
            }}
          >
            Ready to plan some awesome adventures together? Where to next?
          </Typography>

          <TextField
            fullWidth
            placeholder="Search destinations, trips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "#f8fafc",
              },
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => setShowCreateForm(true)}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Add New Trip Planning
          </Button>
        </Paper>

        {/* Popular Destinations Section */}
        {/* Removed Popular Destinations section */}

        {/* Your Trips Section */}
        {trips.length > 0 && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Your Trips ({filteredTrips.length})
              </Typography>
            </Box>

            <Box
              sx={{
                maxHeight: "40vh",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: 6,
                },
                "&::-webkit-scrollbar-track": {
                  bgcolor: "grey.100",
                  borderRadius: 3,
                },
                "&::-webkit-scrollbar-thumb": {
                  bgcolor: "grey.400",
                  borderRadius: 3,
                },
              }}
            >
              <Grid>
                {filteredTrips.map((trip) => (
                  <Grid pb={2} key={trip._id}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: 3,
                        },
                      }}
                      onClick={() => handleCardClick(trip._id)}
                    >
                      <CardMedia
                        component="img"
                        height={140}
                        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop"
                        alt={trip.name}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent sx={{ p: 2 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",
                            mb: 1,
                            fontSize: 16,
                          }}
                        >
                          {trip.name}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            mb: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Chip
                            label={`${trip.estimatedDuration} days`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: 10 }}
                          />
                          <Chip
                            label={`${trip.stopCount} stops`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: 10 }}
                          />
                        </Box>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: "block",
                            fontSize: 11,
                          }}
                        >
                          Created:{" "}
                          {new Date(trip.createdAt).toLocaleDateString()}
                        </Typography>

                        {trip.stats?.estimatedCost && (
                          <Typography
                            variant="caption"
                            color="success.main"
                            sx={{
                              display: "block",
                              fontSize: 11,
                              fontWeight: "medium",
                            }}
                          >
                            💰 {formatCurrency(trip.stats.estimatedCost)}
                          </Typography>
                        )}

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            color="error"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(trip._id);
                            }}
                            sx={{ fontSize: 16 }}
                          >
                            🗑️
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}

        {/* Empty State for Trips */}
        {trips.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "grey.50",
              border: "2px dashed",
              borderColor: "grey.300",
              textAlign: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              No trips found. Start planning your next adventure!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowCreateForm(true)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Create Your First Trip
            </Button>
          </Paper>
        )}
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
              boxShadow: 24,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ mb: 3, fontWeight: "bold" }}
                color="primary"
              >
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

              <TextField
                fullWidth
                type="number"
                label="Trip Duration (days)"
                value={newTripLength || ""}
                onChange={(e) =>
                  setNewTripLength(
                    e.target.value ? parseInt(e.target.value) : 0
                  )
                }
                placeholder="How many days?"
                sx={{ mb: 3 }}
              />

              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewTripName("");
                    setNewTripLength(0);
                  }}
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreate}
                  disabled={!newTripName.trim() || newTripLength <= 0}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                  }}
                >
                  Create Trip
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default LandingPage;

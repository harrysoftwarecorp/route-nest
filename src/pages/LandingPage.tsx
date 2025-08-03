import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  createTrip,
  deleteTripById,
  getTrips,
  type TripSummary,
} from "../api/tripApi";
import { Header } from "../components/Header";
import { SearchBox } from "../components/SearchBox";
import { TripListing } from "../components/TripListing";

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
  const [newTripLength, setNewTripLength] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const initialTrips = useLoaderData() as TripSummary[];
  const [trips, setTrips] = useState<TripSummary[]>(initialTrips || []);

  const handleCreate = async () => {
    if (!newTripName.trim()) return;
    if (newTripLength <= 0) return;

    try {
      await createTrip({ name: newTripName, length: newTripLength });
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        pb: 10, // Space for FAB
      }}
      overflow="unset"
    >
      <Header />
      <SearchBox
        searchValue={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        showCreateForm={() => setShowCreateForm(true)}
      />
      <TripListing trips={filteredTrips} handleTripDelete={handleDelete} />

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
              <Typography
                variant="body1"
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
                label="Trip Length"
                value={newTripLength}
                onChange={(e) =>
                  setNewTripLength(
                    e.target.value ? parseInt(e.target.value) : 0
                  )
                }
                placeholder="Enter your adventure length in days"
                sx={{ mb: 3 }}
              />

              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewTripName("");
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

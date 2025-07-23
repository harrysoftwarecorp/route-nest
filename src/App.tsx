import { useState, useEffect } from "react";
import {
  Drawer,
  CssBaseline,
  Box,
  CircularProgress,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TripSidebar from "./components/TripSidebar";
import type { Stop } from "./components/TripSidebar";
import TripMap from "./components/TripMap";
import { fetchTripData } from "./api/mockTripData";

const drawerWidth = 300;

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
  },
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trip, setTrip] = useState<{
    stops: Stop[];
    routes: number[][][];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchTripData()
      .then((data) => {
        setTrip(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load trip data.");
        setLoading(false);
      });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  // Listen for drawer toggle events from TripPage
  useEffect(() => {
    const toggleDrawer = () => handleDrawerToggle();
    window.addEventListener("toggleDrawer", toggleDrawer);
    return () => window.removeEventListener("toggleDrawer", toggleDrawer);
  }, []);

  const [mapControls, setMapControls] = useState<{
    focusStop: (lat: number, lng: number) => void;
    focusAllStops: () => void;
  } | null>(null);

  const drawer = trip ? (
    <TripSidebar
      stops={trip.stops}
      onStopClick={mapControls?.focusStop}
      onViewAllClick={mapControls?.focusAllStops}
    />
  ) : null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flex: 1, pt: isMobile ? 7 : 0 }}>
          {/* Main content: Map */}
          <Box sx={{ flex: 1, position: "relative", minWidth: 0 }}>
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Box sx={{ p: 2 }}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
            {trip && !loading && !error && (
              <TripMap
                stops={trip.stops}
                routes={trip.routes}
                onMapReady={setMapControls}
              />
            )}
          </Box>
          {/* Sidebar/Drawer */}
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                "& .MuiDrawer-paper": { width: drawerWidth, mt: 7 },
              }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              anchor="right"
              open
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            >
              {drawer}
            </Drawer>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;

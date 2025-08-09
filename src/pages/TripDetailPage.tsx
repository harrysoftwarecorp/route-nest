import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapSearchControl } from "../components/MapSearchControl";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DirectionsIcon from "@mui/icons-material/Directions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export const TripDetailPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockStops = [
    {
      id: 1,
      name: "Ben Thanh Market",
      time: "09:00 AM",
      duration: "2 hours",
    },
    {
      id: 2,
      name: "Saigon Notre-Dame Cathedral",
      time: "11:30 AM",
      duration: "1 hour",
    },
    {
      id: 3,
      name: "Independence Palace",
      time: "02:00 PM",
      duration: "1.5 hours",
    },
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", position: "relative" }}>
      {/* Map Section */}
      <Box sx={{ position: "relative", height: "100vh" }}>
        <MapContainer
          style={{ height: "100%", width: "100%", borderRadius: "0" }}
          center={[10.7769, 106.7009]} // Ho Chi Minh City coordinates
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[10.7769, 106.7009]}>
            <Popup>Saigon Trip Route</Popup>
          </Marker>
          <MapSearchControl />
        </MapContainer>

        {/* Collapsible Bottom Sheet */}
        <Card
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
            zIndex: 1000,
            maxHeight: isExpanded ? "80vh" : "auto",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {/* Drag Handle */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 1,
              pb: 0,
              cursor: "pointer",
            }}
            onClick={toggleExpanded}
          >
            <Box
              sx={{
                width: 40,
                height: 4,
                bgcolor: "grey.300",
                borderRadius: 2,
              }}
            />
          </Box>

          <CardContent sx={{ p: 3, pb: isExpanded ? 3 : 2 }}>
            {/* Compact Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                cursor: "pointer",
              }}
              onClick={toggleExpanded}
            >
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "text.primary",
                      fontSize: { xs: 18, sm: 20 },
                    }}
                  >
                    Saigon Discovery Trip
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <StarIcon sx={{ color: "#FFD700", fontSize: 18 }} />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "text.primary" }}
                    >
                      4.3
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <LocationOnIcon
                      sx={{ fontSize: 16, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      10 km from you
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AccessTimeIcon
                      sx={{ fontSize: 16, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      7 Minutes
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton size="small">
                  <ShareIcon />
                </IconButton>
                <IconButton size="small">
                  <FavoriteIcon />
                </IconButton>
                <IconButton size="small">
                  {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
              </Box>
            </Box>

            {/* Expandable Content */}
            <Collapse in={isExpanded} timeout={300}>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, lineHeight: 1.4 }}
                >
                  District 1, Ho Chi Minh City, Vietnam
                  <br />
                  Historic and cultural journey through the heart of Saigon
                </Typography>

                {/* Trip Stats */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    mb: 3,
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    icon={<CalendarTodayIcon />}
                    label={new Date().toLocaleDateString()}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: "primary.main",
                      color: "primary.main",
                      "& .MuiChip-icon": { color: "primary.main" },
                    }}
                  />
                  <Chip
                    icon={<ScheduleIcon />}
                    label="3 days"
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: "primary.main",
                      color: "primary.main",
                      "& .MuiChip-icon": { color: "primary.main" },
                    }}
                  />
                  <Chip
                    icon={<DirectionsIcon />}
                    label={`${mockStops.length} stops`}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: "primary.main",
                      color: "primary.main",
                      "& .MuiChip-icon": { color: "primary.main" },
                    }}
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Trip Stops Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      mb: 2,
                      color: "text.primary",
                    }}
                  >
                    Planned Stops
                  </Typography>

                  <Box
                    sx={{
                      maxHeight: "40vh",
                      overflowY: "auto",
                      pr: 1,
                    }}
                  >
                    <List sx={{ p: 0 }}>
                      {mockStops.map((stop, index) => (
                        <ListItem
                          key={stop.id}
                          sx={{
                            px: 2,
                            py: 1.5,
                            borderRadius: 2,
                            mb: 1,
                            bgcolor: "grey.50",
                            border: "1px solid",
                            borderColor: "grey.200",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              bgcolor: "grey.100",
                              transform: "translateY(-1px)",
                              boxShadow: 2,
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Box
                              sx={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                bgcolor: "primary.main",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 14,
                                fontWeight: "bold",
                              }}
                            >
                              {index + 1}
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "medium", mb: 0.5 }}
                              >
                                {stop.name}
                              </Typography>
                            }
                            secondary={
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 2,
                                  flexWrap: "wrap",
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  🕐 {stop.time}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  ⏱️ {stop.duration}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Box>
            </Collapse>

            {/* Action Button - Always Visible */}
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                borderRadius: 2,
                py: 1.5,
                textTransform: "none",
                fontSize: 16,
                fontWeight: "bold",
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
                mt: isExpanded ? 2 : 0,
              }}
            >
              Add to Itinerary
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

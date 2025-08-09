import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box } from "@mui/material";
import { MapSearchControl } from "./MapSearchControl";
import type { TripDetail, MapControls } from "./../types";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

interface TripMapViewProps {
  trip: TripDetail;
  height?: string;
  showControls?: boolean;
  onMapReady?: (controls: MapControls) => void;
  onMapClick?: (lat: number, lng: number) => void;
  center?: [number, number];
  zoom?: number;
}

export const TripMapView: React.FC<TripMapViewProps> = ({
  trip,
  height = "100vh",
  showControls = true,
  onMapReady,
  onMapClick,
  center,
  zoom = 13,
}) => {
  // Calculate map center from trip stops or use provided center
  const getMapCenter = (): [number, number] => {
    if (center) return center;
    if (trip.stops.length > 0) {
      const avgLat =
        trip.stops.reduce((sum, stop) => sum + stop.lat, 0) / trip.stops.length;
      const avgLng =
        trip.stops.reduce((sum, stop) => sum + stop.lng, 0) / trip.stops.length;
      return [avgLat, avgLng];
    }
    return [10.7769, 106.7009]; // Default to Ho Chi Minh City
  };

  // Get markers for completed and pending stops
  const getStopMarkers = () => {
    return trip.stops.map((stop, index) => (
      <Marker key={stop.id || index} position={[stop.lat, stop.lng]}>
        <Popup>
          <Box sx={{ minWidth: 200 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  bgcolor: stop.isCompleted ? "success.main" : "primary.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {index + 1}
              </Box>
              <strong>{stop.name}</strong>
            </Box>

            <Box sx={{ fontSize: 12, color: "text.secondary", mb: 1 }}>
              📍 {stop.lat.toFixed(4)}, {stop.lng.toFixed(4)}
            </Box>

            <Box sx={{ fontSize: 12, mb: 1 }}>
              🕐 {new Date(stop.plannedArrival).toLocaleString()}
            </Box>

            <Box sx={{ fontSize: 12, mb: 1 }}>
              ⏱️ {Math.floor(stop.estimatedDuration / 60)}h{" "}
              {stop.estimatedDuration % 60}m
            </Box>

            {stop.description && (
              <Box sx={{ fontSize: 12, fontStyle: "italic", mt: 1 }}>
                {stop.description}
              </Box>
            )}

            {stop.cost && (
              <Box sx={{ fontSize: 12, mt: 1, color: "success.main" }}>
                💰 {new Intl.NumberFormat("vi-VN").format(stop.cost)} VND
              </Box>
            )}

            {stop.isCompleted && (
              <Box
                sx={{
                  mt: 1,
                  px: 1,
                  py: 0.5,
                  bgcolor: "success.main",
                  color: "white",
                  borderRadius: 1,
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                ✓ Completed
              </Box>
            )}
          </Box>
        </Popup>
      </Marker>
    ));
  };

  return (
    <Box sx={{ position: "relative", height }}>
      <MapContainer
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "0",
          zIndex: 1,
        }}
        center={getMapCenter()}
        zoom={zoom}
        scrollWheelZoom={true}
        attributionControl={false}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render stop markers */}
        {getStopMarkers()}

        {/* Search Control */}
        {showControls && <MapSearchControl />}
      </MapContainer>

      {/* Map Overlay Info */}
      {trip.stats && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            bgcolor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            p: 1.5,
            boxShadow: 2,
            zIndex: 1000,
            minWidth: 200,
          }}
        >
          <Box sx={{ fontSize: 12, fontWeight: "bold", mb: 0.5 }}>
            Trip Overview
          </Box>
          <Box
            sx={{
              fontSize: 11,
              color: "text.secondary",
              display: "flex",
              flexDirection: "column",
              gap: 0.3,
            }}
          >
            <span>📏 {(trip.stats.totalDistance / 1000).toFixed(1)} km</span>
            <span>
              ⏱️ {Math.floor(trip.stats.estimatedDuration / 60)}h{" "}
              {trip.stats.estimatedDuration % 60}m
            </span>
            <span>📍 {trip.stats.stopCount} stops</span>
            {trip.stats.estimatedCost && (
              <span>
                💰{" "}
                {new Intl.NumberFormat("vi-VN").format(
                  trip.stats.estimatedCost
                )}{" "}
                VND
              </span>
            )}
          </Box>
        </Box>
      )}

      {/* Progress Bar */}
      {trip.progress && trip.progress.totalStops > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            p: 1.5,
            boxShadow: 2,
            zIndex: 1000,
            minWidth: 120,
          }}
        >
          <Box
            sx={{
              fontSize: 11,
              fontWeight: "bold",
              mb: 1,
              textAlign: "center",
            }}
          >
            Progress
          </Box>
          <Box
            sx={{
              width: "100%",
              height: 6,
              bgcolor: "grey.200",
              borderRadius: 3,
              overflow: "hidden",
              mb: 0.5,
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${trip.progress.percentComplete}%`,
                bgcolor: "success.main",
                transition: "width 0.3s ease",
              }}
            />
          </Box>
          <Box
            sx={{ fontSize: 10, textAlign: "center", color: "text.secondary" }}
          >
            {trip.progress.completedStops}/{trip.progress.totalStops} stops
          </Box>
        </Box>
      )}
    </Box>
  );
};

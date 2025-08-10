import React, { useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Box } from "@mui/material";
import type { TripDetail, MapControls } from "../../types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { MapSearchControl } from "./MapSearchControl";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface TripMapViewProps {
  trip: TripDetail;
  height?: string;
  showControls?: boolean;
  onMapReady?: (controls: MapControls) => void;
  onMapClick?: (lat: number, lng: number) => void;
  center?: [number, number];
  zoom?: number;
}

// Map click handler component
const MapClickHandler: React.FC<{
  onMapClick?: (lat: number, lng: number) => void;
}> = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
};

// Map controls component
const MapControlsHandler: React.FC<{
  trip: TripDetail;
  onMapReady?: (controls: MapControls) => void;
}> = ({ trip, onMapReady }) => {
  const map = useMapEvents({});

  useEffect(() => {
    if (onMapReady && map) {
      const controls: MapControls = {
        focusStop: (lat: number, lng: number) => {
          map.setView([lat, lng], 16, {
            animate: true,
            duration: 1,
          });
        },
        focusAllStops: () => {
          if (trip.stops.length > 0) {
            const bounds = L.latLngBounds(
              trip.stops.map((stop) => [stop.lat, stop.lng] as [number, number])
            );
            map.fitBounds(bounds, {
              padding: [40, 40],
              animate: true,
              duration: 1,
            });
          }
        },
        setMapMode: (mode: "view" | "edit" | "add_stop") => {
          // TODO: Implement map mode changes
          console.log("Map mode changed to:", mode);
        },
      };
      onMapReady(controls);
    }
  }, [map, onMapReady, trip.stops]);

  return null;
};

export const TripMapView: React.FC<TripMapViewProps> = ({
  trip,
  height = "100vh",
  showControls = true,
  onMapReady,
  onMapClick,
  center,
  zoom = 13,
}) => {
  const mapRef = useRef<L.Map | null>(null);

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

  // Create custom numbered markers
  const createNumberedIcon = (number: number, isCompleted: boolean = false) => {
    return L.divIcon({
      className: "custom-number-icon",
      html: `<div style="
        background-color: ${isCompleted ? "#4caf50" : "#1976d2"};
        color: white;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        border: 3px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
        ${isCompleted ? "position: relative;" : ""}
      ">${number}${
        isCompleted
          ? '<div style="position: absolute; top: -5px; right: -5px; background: #4caf50; border-radius: 50%; width: 12px; height: 12px; border: 2px solid white;"><div style="color: white; font-size: 8px; line-height: 8px;">✓</div></div>'
          : ""
      }</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
  };

  // Get markers for completed and pending stops
  const getStopMarkers = () => {
    return trip.stops.map((stop, index) => (
      <Marker
        key={stop.id || index}
        position={[stop.lat, stop.lng]}
        icon={createNumberedIcon(index + 1, stop.isCompleted)}
      >
        <Popup>
          <Box sx={{ minWidth: 250, maxWidth: 300 }}>
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
              <strong style={{ fontSize: 16 }}>{stop.name}</strong>
            </Box>

            {stop.description && (
              <Box sx={{ fontSize: 13, mb: 1, color: "text.secondary" }}>
                {stop.description}
              </Box>
            )}

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

            {stop.cost && (
              <Box sx={{ fontSize: 12, mb: 1, color: "success.main" }}>
                💰 {new Intl.NumberFormat("vi-VN").format(stop.cost)} VND
              </Box>
            )}

            {stop.notes && (
              <Box
                sx={{
                  fontSize: 12,
                  fontStyle: "italic",
                  mt: 1,
                  p: 1,
                  bgcolor: "grey.50",
                  borderRadius: 1,
                }}
              >
                📝 {stop.notes}
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
                  fontWeight: "bold",
                }}
              >
                ✓ Completed
              </Box>
            )}

            {stop.priority === "high" && !stop.isCompleted && (
              <Box
                sx={{
                  mt: 1,
                  px: 1,
                  py: 0.5,
                  bgcolor: "error.main",
                  color: "white",
                  borderRadius: 1,
                  fontSize: 10,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                🔥 High Priority
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
        ref={mapRef}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "0",
          zIndex: 1,
          cursor: onMapClick ? "crosshair" : "grab",
        }}
        center={getMapCenter()}
        zoom={zoom}
        scrollWheelZoom={true}
        attributionControl={false}
        zoomControl={true}
        // whenCreated={(mapInstance) => {
        //   mapRef.current = mapInstance;
        // }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Map Click Handler */}
        <MapClickHandler onMapClick={onMapClick} />

        {/* Map Controls Handler */}
        <MapControlsHandler trip={trip} onMapReady={onMapReady} />

        {/* Render stop markers */}
        {getStopMarkers()}

        {/* Search Control */}
        {showControls && <MapSearchControl />}
      </MapContainer>

      {/* Map Overlay Info */}
      {/*
      trip.stats && (
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
            maxWidth: 250,
          }}
        >
          <Box
            sx={{
              fontSize: 12,
              fontWeight: "bold",
              mb: 1,
              color: "primary.main",
            }}
          >
            {trip.name}
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
        */}

      {/* Progress Bar */}
      {/*
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
            minWidth: 140,
          }}
        >
          <Box
            sx={{
              fontSize: 11,
              fontWeight: "bold",
              mb: 1,
              textAlign: "center",
              color: "primary.main",
            }}
          >
            Trip Progress
          </Box>
          <Box
            sx={{
              width: "100%",
              height: 8,
              bgcolor: "grey.200",
              borderRadius: 4,
              overflow: "hidden",
              mb: 1,
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${trip.progress.percentComplete}%`,
                bgcolor: "success.main",
                transition: "width 0.3s ease",
                borderRadius: 4,
              }}
            />
          </Box>
          <Box
            sx={{
              fontSize: 10,
              textAlign: "center",
              color: "text.secondary",
              fontWeight: "medium",
            }}
          >
            {trip.progress.completedStops}/{trip.progress.totalStops} completed
          </Box>
          <Box
            sx={{
              fontSize: 9,
              textAlign: "center",
              color: "success.main",
              fontWeight: "bold",
              mt: 0.5,
            }}
          >
            {trip.progress.percentComplete.toFixed(0)}%
          </Box>
        </Box>
      )}
        */}

      {/* Add Stop Helper Text */}
      {onMapClick && (
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: "rgba(33, 150, 243, 0.9)",
            color: "white",
            px: 2,
            py: 1,
            borderRadius: 2,
            fontSize: 12,
            fontWeight: "medium",
            zIndex: 1000,
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 0.9 },
              "50%": { opacity: 0.6 },
            },
          }}
        >
          📍 Click anywhere on the map to add a new stop
        </Box>
      )}
    </Box>
  );
};

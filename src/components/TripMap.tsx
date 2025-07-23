import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";
import type { Stop } from "./TripSidebar";

interface TripMapProps {
  stops: Stop[];
  routes: number[][][];
}

const TripMap: React.FC<TripMapProps> = ({ stops, routes }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  // Markers and polylines refs for cleanup
  const markerRefs = useRef<L.Marker[]>([]);
  const polylineRefs = useRef<L.Polyline[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!leafletMapRef.current) {
      leafletMapRef.current = L.map(mapRef.current, {
        center: [39.5, -75.0],
        zoom: 6,
        zoomControl: true,
        attributionControl: false,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMapRef.current);
    }
    const map = leafletMapRef.current;
    // Remove old markers and polylines
    markerRefs.current.forEach((m) => m.remove());
    polylineRefs.current.forEach((p) => p.remove());
    markerRefs.current = [];
    polylineRefs.current = [];
    // Add markers
    stops.forEach((stop) => {
      const marker = L.marker([stop.lat, stop.lng]).bindPopup(
        `<b>${stop.name}</b><br/>${new Date(stop.plannedTime).toLocaleString()}`
      );
      marker.addTo(map);
      markerRefs.current.push(marker);
    });
    // Add polylines
    routes.forEach((route) => {
      // Ensure each point is a LatLngTuple (2-element array)
      const latLngs = route.map((pt) => [pt[0], pt[1]] as [number, number]);
      const polyline = L.polyline(latLngs, { color: "#1976d2", weight: 5 });
      polyline.addTo(map);
      polylineRefs.current.push(polyline);
    });
    // Fit map to all stops
    if (stops.length > 0) {
      const bounds = L.latLngBounds(
        stops.map((s) => [s.lat, s.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [40, 40] });
    }
    // Touch support is native in Leaflet
    return () => {
      markerRefs.current.forEach((m) => m.remove());
      polylineRefs.current.forEach((p) => p.remove());
    };
  }, [stops, routes]);

  return (
    <Box
      ref={mapRef}
      sx={{
        width: "100%",
        height: "100%",
        touchAction: "manipulation",
        borderRadius: { xs: 2, sm: 0 },
        boxShadow: { xs: 1, sm: 0 },
      }}
    />
  );
};

export default TripMap;

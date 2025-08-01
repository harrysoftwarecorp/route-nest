import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { Box } from "@mui/material";
import type { Stop } from "./TripSidebar";

interface TripMapProps {
  stops: Stop[];
  routes: number[][][];
  onMapReady?: (controls: {
    focusStop: (lat: number, lng: number) => void;
    focusAllStops: () => void;
  }) => void;
  onMapClick?: (lat: number, lng: number) => void; // New prop for map clicks
}

const TripMap: React.FC<TripMapProps> = ({
  stops,
  routes,
  onMapReady,
  onMapClick,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  // Markers and polylines refs for cleanup
  const markerRefs = useRef<L.Marker[]>([]);
  const polylineRefs = useRef<L.Polyline[]>([]);
  // Temporary click marker ref
  const tempMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!leafletMapRef.current) {
      leafletMapRef.current = L.map(mapRef.current, {
        center: [10.7952, 106.7219], // Center on HCMC
        zoom: 12,
        zoomControl: true,
        attributionControl: false,
      });

      // Add map click handler
      if (onMapClick) {
        leafletMapRef.current.on("click", (e: L.LeafletMouseEvent) => {
          const { lat, lng } = e.latlng;
          console.log("Map clicked at:", lat, lng);

          // Remove previous temporary marker
          if (tempMarkerRef.current) {
            tempMarkerRef.current.remove();
          }

          // Create temporary marker with different style
          const tempIcon = L.divIcon({
            className: "temp-marker-icon",
            html: `<div style="
              background-color: #ff4444;
              color: white;
              border-radius: 50%;
              width: 28px;
              height: 28px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 16px;
              border: 3px solid white;
              box-shadow: 0 0 6px rgba(0,0,0,0.5);
              animation: pulse 1.5s infinite;
            ">+</div>
            <style>
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
              }
            </style>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          });

          // Add temporary marker
          tempMarkerRef.current = L.marker([lat, lng], {
            icon: tempIcon,
          })
            .bindPopup("Click location - Ready to add as stop")
            .addTo(leafletMapRef.current!);

          // Call the callback with coordinates
          onMapClick(lat, lng);
        });
      }

      // Expose map control functions
      if (onMapReady) {
        onMapReady({
          focusStop: (lat: number, lng: number) => {
            leafletMapRef.current?.setView([lat, lng], 16, {
              animate: true,
              duration: 1,
            });
          },
          focusAllStops: () => {
            if (stops.length > 0) {
              const bounds = L.latLngBounds(
                stops.map((s) => [s.lat, s.lng] as [number, number])
              );
              leafletMapRef.current?.fitBounds(bounds, {
                padding: [40, 40],
                animate: true,
                duration: 1,
              });
            }
          },
        });
      }
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
    stops.forEach((stop, index) => {
      // Create custom numbered icon
      const numberIcon = L.divIcon({
        className: "custom-number-icon",
        html: `<div style="
          background-color: #1976d2;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0,0,0,0.3);
        ">${index + 1}</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([stop.lat, stop.lng], {
        icon: numberIcon,
      }).bindPopup(
        `<b>${index + 1}. ${stop.name}</b><br/>${new Date(
          stop.plannedTime
        ).toLocaleString()}`
      );
      marker.addTo(map);
      markerRefs.current.push(marker);
    });

    // Add road-based routing between consecutive stops
    for (let i = 0; i < stops.length - 1; i++) {
      const start = stops[i];
      const end = stops[i + 1];
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: false,
        lineOptions: {
          styles: [
            { color: "#000000", opacity: 0.4, weight: 9 }, // Black outline for contrast
            { color: "#FF3D00", opacity: 1, weight: 6 }, // Bright orange core
            { color: "#FFFF00", opacity: 0.8, weight: 2 }, // Yellow center line for glow effect
          ],
        },
        routeWhileDragging: false,
        createMarker: () => null, // Don't create default markers
      }).addTo(map);

      // Store reference for cleanup
      polylineRefs.current.push(routingControl as any);
    }

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
      // Remove routing controls
      polylineRefs.current.forEach((control: any) => {
        if (control.remove) {
          control.remove();
        }
      });
      // Remove temporary marker
      if (tempMarkerRef.current) {
        tempMarkerRef.current.remove();
      }
    };
  }, [stops, routes, onMapReady, onMapClick]);

  return (
    <Box
      ref={mapRef}
      sx={{
        width: "100%",
        height: { xs: "70vh", md: "95vh" },
        touchAction: "manipulation",
        borderRadius: { xs: 2, sm: 0 },
        boxShadow: { xs: 1, sm: 0 },
        cursor: onMapClick ? "crosshair" : "default", // Change cursor when click handler is active
      }}
    />
  );
};

export default TripMap;

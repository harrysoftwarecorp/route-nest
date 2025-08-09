import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapSearchControl } from "../components/MapSearchControl";
import { Box, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { TripCard } from "../components/TripCard";

export const TripDetailPage = () => {
  return (
    <>
      <MapContainer
        style={{ height: "70vh", width: "100%", position: "relative" }}
        center={[34.052235, -118.243683]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[34.052235, -118.243683]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <MapSearchControl />
      </MapContainer>
      <Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Sai Gon Trip
          </Typography>
        </Box>
        <Box display={"flex"} flexDirection={"row"} alignItems="center" gap={2}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems="center"
            gap={1}
          >
            <CalendarTodayIcon />
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {new Date().toLocaleDateString()}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            gap={1}
          >
            <ScheduleIcon />
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              3 days
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Trip stops
        </Typography>
      </Box>
      <Box>
        <TripCard
          trip={{
            _id: "1",
            name: "Ben Thanh Market",
            createdAt: new Date().toISOString(),
            length: 3,
          }}
          handleTripDelete={(id) => console.log(`Delete trip with id: ${id}`)}
        />
      </Box>
    </>
  );
};

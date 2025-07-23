import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export interface Stop {
  id: number;
  name: string;
  lat: number;
  lng: number;
  plannedTime: string;
}

interface TripSidebarProps {
  stops: Stop[];
}

const TripSidebar: React.FC<TripSidebarProps> = ({ stops }) => (
  <Box
    sx={{ width: { xs: "80vw", sm: 300 }, maxWidth: 360, p: { xs: 1, sm: 2 } }}
  >
    <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: 18, sm: 22 } }}>
      Trip Stops
    </Typography>
    <Divider />
    <List>
      {stops.map((stop, index) => (
        <ListItem
          key={stop.id}
          alignItems="flex-start"
          sx={{ px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 1 } }}
        >
          <ListItemText
            primary={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                  }}
                >
                  {index + 1}
                </Typography>
                <span style={{ fontSize: 16 }}>{stop.name}</span>
              </Box>
            }
            secondary={
              <>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: 13, sm: 14 } }}
                >
                  Lat: {stop.lat.toFixed(4)}, Lng: {stop.lng.toFixed(4)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: 13, sm: 14 } }}
                >
                  Planned: {new Date(stop.plannedTime).toLocaleString()}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default TripSidebar;

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
  onStopClick?: (lat: number, lng: number) => void;
  onViewAllClick?: () => void;
}

const TripSidebar: React.FC<TripSidebarProps> = ({
  stops,
  onStopClick,
  onViewAllClick,
}) => (
  <Box
    sx={{ width: { xs: "80vw", sm: 300 }, maxWidth: 360, p: { xs: 1, sm: 2 } }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontSize: { xs: 18, sm: 22 } }}>
        Trip Stops
      </Typography>
      {onViewAllClick && (
        <Typography
          onClick={onViewAllClick}
          sx={{
            color: "primary.main",
            cursor: "pointer",
            fontSize: { xs: 14, sm: 16 },
            "&:hover": { textDecoration: "underline" },
          }}
        >
          View All
        </Typography>
      )}
    </Box>
    <Divider />
    <List>
      {stops.map((stop, index) => (
        <ListItem
          key={stop.id}
          alignItems="flex-start"
          onClick={() => onStopClick?.(stop.lat, stop.lng)}
          sx={{
            px: { xs: 1, sm: 2 },
            py: { xs: 1, sm: 1 },
            cursor: onStopClick ? "pointer" : "default",
            "&:hover": onStopClick
              ? {
                  bgcolor: "action.hover",
                }
              : {},
          }}
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

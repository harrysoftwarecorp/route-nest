import React from "react";
import { Box, Typography, List, Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { StopListItem } from "./StopListItem";
import type { Stop } from "../types";

interface TripStopsListProps {
  stops: Stop[];
  maxHeight?: string;
  onStopClick?: (stop: Stop) => void;
  showAddButton?: boolean;
  onAddStop?: () => void;
  onDeleteStop?: (stopId: number) => void;
  onEditStop?: (stop: Stop) => void;
  showActions?: boolean;
}

export const TripStopsList: React.FC<TripStopsListProps> = ({
  stops,
  maxHeight = "45vh",
  onStopClick,
  showAddButton = false,
  onAddStop,
  onDeleteStop,
  onEditStop,
  showActions = false,
}) => {
  return (
    <Box>
      {/* Section Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            fontSize: { xs: 16, sm: 18 },
          }}
        >
          Planned Stops ({stops.length})
        </Typography>

        {showAddButton && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onAddStop}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontSize: 12,
            }}
          >
            Add Stop
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Stops List */}
      {stops.length > 0 ? (
        <Box
          sx={{
            maxHeight,
            overflowY: "auto",
            pr: 1,
            // Custom scrollbar styling
            "&::-webkit-scrollbar": {
              width: 6,
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: "grey.100",
              borderRadius: 3,
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "grey.400",
              borderRadius: 3,
              "&:hover": {
                bgcolor: "grey.500",
              },
            },
          }}
        >
          <List sx={{ p: 0 }}>
            {stops.map((stop, index) => (
              <StopListItem
                key={stop.id || index}
                stop={stop}
                index={index}
                onClick={() => onStopClick?.(stop)}
                onDelete={
                  onDeleteStop ? () => onDeleteStop(stop.id!) : undefined
                }
                onEdit={onEditStop ? () => onEditStop(stop) : undefined}
                showActions={showActions}
              />
            ))}
          </List>
        </Box>
      ) : (
        // Empty state
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 4,
            px: 2,
            bgcolor: "grey.50",
            borderRadius: 2,
            border: "2px dashed",
            borderColor: "grey.300",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, textAlign: "center" }}
          >
            No stops planned yet
          </Typography>
          {showAddButton && onAddStop && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddStop}
              sx={{
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Add Your First Stop
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

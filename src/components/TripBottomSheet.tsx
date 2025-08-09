import React from "react";
import { Box, Card, CardContent, Collapse, IconButton } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TripHeader } from "./TripHeader";
import { TripStatsChips } from "./TripStatsChips";
import { TripStopsList } from "./TripStopsList";
import { TripActionButton } from "./TripActionButton";
import type { TripDetail, Stop } from "../types";

interface TripBottomSheetProps {
  trip: TripDetail;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onAddToItinerary: () => void;
  onStopClick?: (stop: Stop) => void;
  onAddStop?: () => void;
  onShare?: () => void;
  onFavorite?: () => void;
}

export const TripBottomSheet: React.FC<TripBottomSheetProps> = ({
  trip,
  isExpanded,
  onToggleExpanded,
  onAddToItinerary,
  onStopClick,
  onAddStop,
  onShare,
  onFavorite,
}) => {
  return (
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
        maxHeight: isExpanded ? "85vh" : "auto",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isExpanded ? "translateY(0)" : "translateY(0)",
      }}
    >
      {/* Drag Handle */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 1.5,
          pb: 0.5,
          cursor: "pointer",
          "&:hover": {
            "& > div": {
              bgcolor: "grey.400",
            },
          },
        }}
        onClick={onToggleExpanded}
      >
        <Box
          sx={{
            width: 40,
            height: 4,
            bgcolor: "grey.300",
            borderRadius: 2,
            transition: "background-color 0.2s ease",
          }}
        />
      </Box>

      <CardContent sx={{ p: 3, pt: 1 }}>
        {/* Always Visible Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            mb: isExpanded ? 2 : 1,
          }}
          onClick={onToggleExpanded}
        >
          <TripHeader
            title={trip.name}
            rating={trip.rating || 0}
            location={`District 1, Ho Chi Minh City, Vietnam`}
            distance="10 km from you"
            duration="7 Minutes"
            isCompact={!isExpanded}
            onShare={onShare}
            onFavorite={onFavorite}
          />

          <IconButton
            size="small"
            sx={{
              ml: 1,
              bgcolor: "grey.100",
              "&:hover": { bgcolor: "grey.200" },
            }}
          >
            {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Box>

        {/* Collapsible Content */}
        <Collapse in={isExpanded} timeout={300}>
          <Box>
            {/* Trip Stats */}
            <Box sx={{ mb: 3 }}>
              <TripStatsChips
                createdDate={trip.createdAt}
                duration={`${trip.estimatedDuration} days`}
                stopCount={trip.stops.length}
                size="small"
              />
            </Box>

            {/* Trip Stops */}
            <TripStopsList
              stops={trip.stops}
              maxHeight="45vh"
              onStopClick={onStopClick}
              showAddButton={true}
              onAddStop={onAddStop}
            />
          </Box>
        </Collapse>

        {/* Action Button - Always Visible */}
        <Box sx={{ mt: isExpanded ? 3 : 2 }}>
          <TripActionButton
            label="Add to Itinerary"
            onClick={onAddToItinerary}
            variant="contained"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

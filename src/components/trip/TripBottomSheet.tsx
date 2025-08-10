import React from "react";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TripHeader } from "./TripHeader";
import { TripStatsChips } from "./TripStatsChips";
import { TripStopsList } from "./TripStopsList";
import { TripActionButton } from "../ui/TripActionButton";
import type { TripDetail, Stop } from "../../types";

interface TripBottomSheetProps {
  trip: TripDetail;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onAddToItinerary: () => void;
  onStopClick?: (stop: Stop) => void;
  onAddStop?: () => void;
  onDeleteStop?: (stopId: number) => void;
  onEditStop?: (stop: Stop) => void;
  onCompleteStop?: (stopId: number, completed: boolean) => void;
  onViewAllStops?: () => void;
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
  onDeleteStop,
  onEditStop,
  // onCompleteStop,
  onViewAllStops,
  onShare,
  onFavorite,
}) => {
  // Calculate location info from trip stops
  const getLocationInfo = () => {
    if (trip.stops.length === 0) {
      return {
        location: "Ho Chi Minh City, Vietnam",
        distance: "Ready to explore",
        duration: "Plan your adventure",
      };
    }

    const firstStop = trip.stops[0];
    const avgLat =
      trip.stops.reduce((sum, stop) => sum + stop.lat, 0) / trip.stops.length;
    const avgLng =
      trip.stops.reduce((sum, stop) => sum + stop.lng, 0) / trip.stops.length;

    // Simple distance calculation (you might want to use a more accurate method)
    const userLat = 10.7769; // Default HCMC coordinates
    const userLng = 106.7009;
    const distance =
      Math.sqrt(Math.pow(avgLat - userLat, 2) + Math.pow(avgLng - userLng, 2)) *
      111; // Rough conversion to km

    return {
      location: firstStop.address || "Ho Chi Minh City, Vietnam",
      distance: `${distance.toFixed(1)} km from you`,
      duration: trip.stats
        ? `${Math.floor(trip.stats.estimatedDuration / 60)}h ${
            trip.stats.estimatedDuration % 60
          }m`
        : "Flexible timing",
    };
  };

  const locationInfo = getLocationInfo();

  // Enhanced stop click handler that includes completion toggle
  const handleStopInteraction = (stop: Stop) => {
    if (onStopClick) {
      onStopClick(stop);
    }
  };

  // Handle stop completion with optimistic UI update
  // const handleStopComplete = (stopId: number) => {
  //   const stop = trip.stops.find((s) => s.id === stopId);
  //   if (stop && onCompleteStop) {
  //     onCompleteStop(stopId, !stop.isCompleted);
  //   }
  // };

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
            location={locationInfo.location}
            distance={locationInfo.distance}
            duration={locationInfo.duration}
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

        {/* Quick Stats - Always Visible */}
        {!isExpanded && trip.stats && (
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  bgcolor: "primary.50",
                  color: "primary.main",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: 12,
                  fontWeight: "medium",
                  border: "1px solid",
                  borderColor: "primary.200",
                }}
              >
                📍 {trip.stats.stopCount} stops
              </Box>
              <Box
                sx={{
                  bgcolor: "success.50",
                  color: "success.main",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: 12,
                  fontWeight: "medium",
                  border: "1px solid",
                  borderColor: "success.200",
                }}
              >
                📏 {(trip.stats.totalDistance / 1000).toFixed(1)} km
              </Box>
              {trip.progress && (
                <Box
                  sx={{
                    bgcolor: "info.50",
                    color: "info.main",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: 12,
                    fontWeight: "medium",
                    border: "1px solid",
                    borderColor: "info.200",
                  }}
                >
                  ✅ {trip.progress.completedStops}/{trip.progress.totalStops}
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Collapsible Content */}
        <Collapse in={isExpanded} timeout={300}>
          <Box>
            {/* Trip Description */}
            {trip.description && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    fontStyle: "italic",
                  }}
                >
                  {trip.description}
                </Typography>
              </Box>
            )}

            {/* Trip Stats */}
            <Box sx={{ mb: 3 }}>
              <TripStatsChips
                createdDate={trip.createdAt}
                duration={`${trip.estimatedDuration} days`}
                stopCount={trip.stops.length}
                size="small"
                showDistance={true}
                distance={
                  trip.stats
                    ? `${(trip.stats.totalDistance / 1000).toFixed(1)} km`
                    : undefined
                }
                showCost={true}
                cost={trip.stats?.estimatedCost}
              />
            </Box>

            {/* Progress Overview */}
            {trip.progress && trip.progress.totalStops > 0 && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: "grey.50",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "grey.200",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", fontSize: 14 }}
                  >
                    Trip Progress
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "success.main",
                      fontWeight: "bold",
                      fontSize: 12,
                    }}
                  >
                    {trip.progress.percentComplete.toFixed(0)}% Complete
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: 8,
                    bgcolor: "grey.200",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${trip.progress.percentComplete}%`,
                      bgcolor: "success.main",
                      transition: "width 0.5s ease",
                      borderRadius: 4,
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.5, display: "block", fontSize: 11 }}
                >
                  {trip.progress.completedStops} of {trip.progress.totalStops}{" "}
                  stops completed
                </Typography>
              </Box>
            )}

            {/* Next Stop Highlight */}
            {trip.nextStop && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: "primary.50",
                  borderRadius: 2,
                  border: "2px solid",
                  borderColor: "primary.200",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  🎯 Next Stop
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "medium", mb: 0.5 }}
                >
                  {trip.nextStop.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: 11 }}
                >
                  📅 {new Date(trip.nextStop.plannedArrival).toLocaleString()}
                </Typography>
              </Box>
            )}

            {/* Trip Stops with Enhanced Actions */}
            <TripStopsList
              stops={trip.stops}
              maxHeight="10vh"
              onStopClick={handleStopInteraction}
              showAddButton={true}
              onAddStop={onAddStop}
              onDeleteStop={onDeleteStop}
              onEditStop={onEditStop}
              showActions={true}
            />

            {/* Additional Actions */}
            {isExpanded && (
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                {onViewAllStops && (
                  <Box
                    onClick={onViewAllStops}
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor: "info.50",
                      color: "info.main",
                      borderRadius: 2,
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: "medium",
                      border: "1px solid",
                      borderColor: "info.200",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "info.100",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    🗺️ View All on Map
                  </Box>
                )}

                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: "warning.50",
                    color: "warning.main",
                    borderRadius: 2,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: "medium",
                    border: "1px solid",
                    borderColor: "warning.200",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "warning.100",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  🔄 Optimize Route
                </Box>
              </Box>
            )}
          </Box>
        </Collapse>

        {/* Action Button - Always Visible */}
        <Box sx={{ mt: isExpanded ? 3 : 2 }}>
          <TripActionButton
            label="Add to Itinerary"
            onClick={onAddToItinerary}
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: 16,
              fontWeight: "bold",
              borderRadius: 3,
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
              boxShadow: "0 3px 5px 2px rgba(25, 118, 210, .3)",
              "&:hover": {
                background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 10px 2px rgba(25, 118, 210, .3)",
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

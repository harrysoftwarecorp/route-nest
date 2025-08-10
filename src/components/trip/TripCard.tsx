import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Rating,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import type { TripSummary } from "../../types";

interface TripCardProps {
  trip: TripSummary;
  handleTripDelete: (tripId: string) => void;
  showActions?: boolean;
}

export const TripCard: React.FC<TripCardProps> = ({
  trip,
  handleTripDelete,
  showActions = true,
}) => {
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
  };

  const getCategoryEmoji = (category: string) => {
    const categoryMap: Record<string, string> = {
      cultural: "🏛️",
      adventure: "🏔️",
      food_tour: "🍜",
      nature: "🌿",
      city_exploration: "🏙️",
      road_trip: "🚗",
      motorcycle_tour: "🏍️",
      walking_tour: "🚶",
      business: "💼",
      custom: "📍",
    };
    return categoryMap[category] || "🗺️";
  };

  const formatDistance = (distance: number) => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(1)} km`;
    }
    return `${distance} m`;
  };

  // Navigate to TripDetailPage instead of TripPage
  const handleCardClick = () => {
    navigate(`/trip-detail/${trip._id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height={140}
        image={
          trip.thumbnail ||
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop"
        }
        alt={trip.name}
        sx={{ objectFit: "cover" }}
      />

      {/* Category Badge */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          bgcolor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 2,
          px: 1,
          py: 0.5,
          backdropFilter: "blur(4px)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: 10,
            fontWeight: "medium",
            color: "text.primary",
          }}
        >
          {getCategoryEmoji(trip.category)} {trip.category.replace("_", " ")}
        </Typography>
      </Box>

      {/* Delete Button */}
      {showActions && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleTripDelete(trip._id);
            }}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(4px)",
              "&:hover": {
                bgcolor: "error.light",
                color: "white",
              },
              width: 28,
              height: 28,
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <CardContent
        sx={{
          p: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              mb: 1,
              fontSize: 16,
              color: "text.primary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {trip.name}
          </Typography>

          {/* Rating */}
          {trip.rating && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mb: 1,
              }}
            >
              <Rating
                value={trip.rating}
                precision={0.1}
                size="small"
                readOnly
                sx={{ fontSize: 14 }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: 10,
                }}
              >
                ({trip.rating})
              </Typography>
            </Box>
          )}

          {/* Trip Stats */}
          <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
            <Chip
              label={`${trip.estimatedDuration} days`}
              size="small"
              variant="outlined"
              color="primary"
              sx={{
                fontSize: 10,
                height: 20,
                "& .MuiChip-label": { px: 1 },
              }}
            />
            <Chip
              label={`${trip.stopCount} stops`}
              size="small"
              variant="outlined"
              color="info"
              sx={{
                fontSize: 10,
                height: 20,
                "& .MuiChip-label": { px: 1 },
              }}
            />
          </Box>

          {/* Distance */}
          {trip.stats?.totalDistance && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                fontSize: 11,
                mb: 0.5,
              }}
            >
              📏 {formatDistance(trip.stats.totalDistance)}
            </Typography>
          )}
        </Box>

        <Box>
          {/* Cost */}
          {trip.stats?.estimatedCost && (
            <Typography
              variant="caption"
              color="success.main"
              sx={{
                display: "block",
                fontSize: 11,
                fontWeight: "medium",
                mb: 0.5,
              }}
            >
              💰 {formatCurrency(trip.stats.estimatedCost)}
            </Typography>
          )}

          {/* Created Date */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              fontSize: 11,
            }}
          >
            Created:{" "}
            {new Date(trip.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>

          {/* Public Badge */}
          {trip.isPublic && (
            <Chip
              label="Public"
              size="small"
              variant="filled"
              color="success"
              sx={{
                fontSize: 9,
                height: 16,
                mt: 0.5,
                "& .MuiChip-label": { px: 0.5 },
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

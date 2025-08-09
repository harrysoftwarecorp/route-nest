import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface TripHeaderProps {
  title: string;
  rating: number;
  location: string;
  distance: string;
  duration: string;
  isCompact?: boolean;
  onShare?: () => void;
  onFavorite?: () => void;
}

export const TripHeader: React.FC<TripHeaderProps> = ({
  title,
  rating,
  location,
  distance,
  duration,
  isCompact = false,
  onShare,
  onFavorite,
}) => {
  return (
    <Box sx={{ flex: 1, mr: 2 }}>
      {/* Title and Rating */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: isCompact ? 0.5 : 1,
        }}
      >
        <Typography
          variant={isCompact ? "h6" : "h5"}
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            fontSize: isCompact ? { xs: 16, sm: 18 } : { xs: 20, sm: 24 },
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        {rating > 0 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <StarIcon
              sx={{
                color: "#FFD700",
                fontSize: isCompact ? 16 : 20,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                fontSize: isCompact ? 12 : 14,
              }}
            >
              {rating.toFixed(1)}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Location - Show in compact mode */}
      {!isCompact && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, lineHeight: 1.4 }}
        >
          {location}
        </Typography>
      )}

      {/* Distance and Duration */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: isCompact ? 1.5 : 2,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <LocationOnIcon
            sx={{
              fontSize: isCompact ? 14 : 18,
              color: "text.secondary",
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: isCompact ? 11 : 14 }}
          >
            {distance}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AccessTimeIcon
            sx={{
              fontSize: isCompact ? 14 : 18,
              color: "text.secondary",
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: isCompact ? 11 : 14 }}
          >
            {duration}
          </Typography>
        </Box>
      </Box>

      {/* Action Buttons - Only show in expanded mode */}
      {!isCompact && (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 2,
            justifyContent: "flex-start",
          }}
        >
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onShare?.();
            }}
            sx={{
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 1,
              "&:hover": {
                bgcolor: "grey.50",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.();
            }}
            sx={{
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 1,
              "&:hover": {
                bgcolor: "grey.50",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <FavoriteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

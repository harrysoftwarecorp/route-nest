import React from "react";
import { Box, Chip } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DirectionsIcon from "@mui/icons-material/Directions";

interface TripStatsChipsProps {
  createdDate: string;
  duration: string;
  stopCount: number;
  size?: "small" | "medium";
  showDistance?: boolean;
  distance?: string;
  showCost?: boolean;
  cost?: number;
}

export const TripStatsChips: React.FC<TripStatsChipsProps> = ({
  createdDate,
  duration,
  stopCount,
  size = "small",
  showDistance = false,
  distance,
  showCost = false,
  cost,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCost = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Chip
        icon={<CalendarTodayIcon />}
        label={formatDate(createdDate)}
        variant="outlined"
        size={size}
        sx={{
          borderColor: "primary.main",
          color: "primary.main",
          "& .MuiChip-icon": { color: "primary.main" },
          "& .MuiChip-label": {
            fontSize: size === "small" ? 12 : 14,
          },
        }}
      />

      <Chip
        icon={<ScheduleIcon />}
        label={duration}
        variant="outlined"
        size={size}
        sx={{
          borderColor: "success.main",
          color: "success.main",
          "& .MuiChip-icon": { color: "success.main" },
          "& .MuiChip-label": {
            fontSize: size === "small" ? 12 : 14,
          },
        }}
      />

      <Chip
        icon={<DirectionsIcon />}
        label={`${stopCount} stops`}
        variant="outlined"
        size={size}
        sx={{
          borderColor: "info.main",
          color: "info.main",
          "& .MuiChip-icon": { color: "info.main" },
          "& .MuiChip-label": {
            fontSize: size === "small" ? 12 : 14,
          },
        }}
      />

      {showDistance && distance && (
        <Chip
          label={distance}
          variant="outlined"
          size={size}
          sx={{
            borderColor: "warning.main",
            color: "warning.main",
            "& .MuiChip-label": {
              fontSize: size === "small" ? 12 : 14,
            },
          }}
        />
      )}

      {showCost && cost && (
        <Chip
          label={formatCost(cost)}
          variant="outlined"
          size={size}
          sx={{
            borderColor: "error.main",
            color: "error.main",
            "& .MuiChip-label": {
              fontSize: size === "small" ? 12 : 14,
            },
          }}
        />
      )}
    </Box>
  );
};

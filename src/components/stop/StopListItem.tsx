import React from "react";
import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { Stop, StopType } from "../../types";

interface StopListItemProps {
  stop: Stop;
  index: number;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  showActions?: boolean;
}

export const StopListItem: React.FC<StopListItemProps> = ({
  stop,
  index,
  onClick,
  onDelete,
  onEdit,
  showActions = false,
}) => {
  const getStopTypeEmoji = (type: StopType): string => {
    const emojiMap: Record<StopType, string> = {
      attraction: "🏛️",
      food: "🍜",
      accommodation: "🏨",
      transport: "🚌",
      shopping: "🛍️",
      nature: "🌳",
      culture: "🎭",
      activity: "🎯",
      rest: "☕",
      custom: "📍",
    };
    return emojiMap[type] || "📍";
  };

  const getPriorityColor = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "high":
        return "error.main";
      case "medium":
        return "warning.main";
      case "low":
        return "success.main";
      default:
        return "grey.500";
    }
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <ListItem
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: 2,
        mb: 1,
        bgcolor: stop.isCompleted ? "success.50" : "grey.50",
        border: "1px solid",
        borderColor: stop.isCompleted ? "success.200" : "grey.200",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s ease",
        position: "relative",
        "&:hover": onClick
          ? {
              bgcolor: stop.isCompleted ? "success.100" : "grey.100",
              transform: "translateY(-1px)",
              boxShadow: 2,
            }
          : {},
      }}
      onClick={onClick}
    >
      {/* Completion Status Icon */}
      <ListItemIcon sx={{ minWidth: 40 }}>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              bgcolor: stop.isCompleted ? "success.main" : "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: "bold",
              transition: "all 0.2s ease",
            }}
          >
            {index + 1}
          </Box>
          {stop.isCompleted && (
            <CheckCircleIcon
              sx={{
                position: "absolute",
                top: -2,
                right: -2,
                fontSize: 16,
                color: "success.main",
                bgcolor: "white",
                borderRadius: "50%",
              }}
            />
          )}
        </Box>
      </ListItemIcon>

      {/* Stop Content */}
      <ListItemText
        sx={{ flex: 1 }}
        primary={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "medium",
                textDecoration: stop.isSkipped ? "line-through" : "none",
                color: stop.isSkipped ? "text.disabled" : "text.primary",
              }}
            >
              {getStopTypeEmoji(stop.stopType)} {stop.name}
            </Typography>

            {/* Priority Indicator */}
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: getPriorityColor(stop.priority),
                opacity: 0.8,
              }}
            />
          </Box>
        }
        secondary={
          <Box>
            {/* Time and Duration */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                🕐 {formatTime(stop.plannedArrival)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ⏱️ {formatDuration(stop.estimatedDuration)}
              </Typography>
              {stop.cost && (
                <Typography variant="body2" color="text.secondary">
                  💰 {new Intl.NumberFormat("vi-VN").format(stop.cost)} VND
                </Typography>
              )}
            </Box>

            {/* Status Chips */}
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              {stop.isCompleted && (
                <Chip
                  label="Completed"
                  size="small"
                  color="success"
                  variant="filled"
                  sx={{ height: 20, fontSize: 10 }}
                />
              )}
              {stop.isSkipped && (
                <Chip
                  label="Skipped"
                  size="small"
                  color="warning"
                  variant="outlined"
                  sx={{ height: 20, fontSize: 10 }}
                />
              )}
              {stop.priority === "high" && !stop.isCompleted && (
                <Chip
                  label="High Priority"
                  size="small"
                  color="error"
                  variant="outlined"
                  sx={{ height: 20, fontSize: 10 }}
                />
              )}
            </Box>

            {/* Notes Preview */}
            {stop.notes && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  fontStyle: "italic",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "200px",
                }}
              >
                📝 {stop.notes}
              </Typography>
            )}
          </Box>
        }
      />

      {/* Action Buttons */}
      {showActions && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            ml: 1,
          }}
        >
          {onEdit && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              sx={{
                bgcolor: "info.50",
                color: "info.main",
                "&:hover": {
                  bgcolor: "info.100",
                  transform: "scale(1.1)",
                },
                width: 28,
                height: 28,
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}

          {onDelete && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              sx={{
                bgcolor: "error.50",
                color: "error.main",
                "&:hover": {
                  bgcolor: "error.100",
                  transform: "scale(1.1)",
                },
                width: 28,
                height: 28,
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      )}
    </ListItem>
  );
};

import React from "react";
import { Button, CircularProgress, Box } from "@mui/material";

interface TripActionButtonProps {
  label: string;
  onClick: () => void;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: "small" | "medium" | "large";
}

export const TripActionButton: React.FC<TripActionButtonProps> = ({
  label,
  onClick,
  variant = "contained",
  color = "primary",
  loading = false,
  disabled = false,
  fullWidth = true,
  startIcon,
  endIcon,
  size = "large",
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      startIcon={loading ? undefined : startIcon}
      endIcon={loading ? undefined : endIcon}
      sx={{
        borderRadius: 2,
        py: size === "large" ? 1.5 : size === "medium" ? 1.2 : 1,
        textTransform: "none",
        fontSize: size === "large" ? 16 : size === "medium" ? 14 : 12,
        fontWeight: "bold",
        position: "relative",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: disabled || loading ? "none" : "translateY(-1px)",
          boxShadow: disabled || loading ? "none" : 3,
        },
        "&:active": {
          transform: disabled || loading ? "none" : "translateY(0)",
        },
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress
            size={20}
            color="inherit"
            sx={{
              color: variant === "contained" ? "white" : color + ".main",
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {label}
      </Box>
    </Button>
  );
};

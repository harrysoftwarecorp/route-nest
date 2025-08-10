import React from "react";
import { Button, type ButtonProps } from "@mui/material";

interface TripActionButtonProps extends Omit<ButtonProps, "onClick"> {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  loading?: boolean;
}

export const TripActionButton: React.FC<TripActionButtonProps> = ({
  label,
  onClick,
  icon,
  loading = false,
  variant = "contained",
  color = "primary",
  size = "large",
  fullWidth = true,
  sx,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={loading}
      startIcon={icon}
      sx={{
        py: 1.5,
        px: 3,
        fontSize: 16,
        fontWeight: "bold",
        borderRadius: 2,
        textTransform: "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
        "&:active": {
          transform: "translateY(0)",
        },
        "&:disabled": {
          opacity: 0.6,
          transform: "none",
        },
        ...sx,
      }}
      {...props}
    >
      {loading ? "Loading..." : label}
    </Button>
  );
};

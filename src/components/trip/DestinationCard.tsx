import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface DestinationCardProps {
  destination: {
    id: string;
    name: string;
    country: string;
    rating: number;
    reviewCount: number;
    distance: string;
    image: string;
    description: string;
    estimatedCost: number;
  };
  onClick?: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onClick,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height={120}
        image={destination.image}
        alt={destination.name}
        sx={{ objectFit: "cover" }}
      />
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
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
              fontSize: 14,
              color: "text.primary",
            }}
          >
            {destination.name}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontSize: 11,
              display: "block",
              mb: 1,
            }}
          >
            {destination.country}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: 1,
            }}
          >
            <StarIcon sx={{ fontSize: 14, color: "#FFD700" }} />
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                fontSize: 11,
              }}
            >
              {destination.rating}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: 10,
              }}
            >
              ({destination.reviewCount})
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              mb: 0.5,
              fontSize: 11,
            }}
          >
            📍 {destination.distance}
          </Typography>

          <Typography
            variant="caption"
            color="success.main"
            sx={{
              display: "block",
              fontSize: 11,
              fontWeight: "medium",
            }}
          >
            💰 {formatCurrency(destination.estimatedCost)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

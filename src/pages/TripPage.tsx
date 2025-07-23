import React from "react";
import App from "../App";
import { useParams, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// This page simply renders the trip planner for a given trip id
const TripPage: React.FC = () => {
  // You can use the tripId param to fetch trip-specific data if needed
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  // For now, just render the main App (which loads mock data)
  // In a real app, you would pass tripId to App or fetch trip data here
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate("/")}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            RouteNest
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ height: "calc(100vh - 64px)", minHeight: 0, overflow: "hidden" }}
      >
        <App />
      </Box>
    </>
  );
};

export default TripPage;

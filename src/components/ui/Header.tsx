import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, IconButton, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={1}
      px={2}
    >
      <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
        RouteNest
      </Typography>
      <IconButton>
        <AccountCircleIcon color="primary" />
      </IconButton>
    </Box>
  );
};

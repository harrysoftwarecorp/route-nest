import { Toolbar, AppBar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontSize: { xs: 18, sm: 24 } }}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            RouteNest
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

export const SearchBox = ({ searchValue, onSearchChange, showCreateForm }) => {
  return (
    <Box m={2} mt={0} p={3} border={1} borderRadius={2} borderColor="LightGray">
      <Typography sx={{ mb: 2 }}>
        Ready to plan some amazing adventure together? Where to next?
      </Typography>
      <TextField
        sx={{ mb: 2 }}
        size="small"
        fullWidth
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchValue}
        onChange={onSearchChange}
      />
      <Button
        sx={{ textTransform: "none" }}
        fullWidth
        variant="contained"
        startIcon={<AddIcon />}
        size="large"
        onClick={showCreateForm}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="body2">
          Add New Trip Planning
        </Typography>
      </Button>
    </Box>
  );
};

import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useRef, useState } from "react";

interface AddStopDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (stopData: {
    stopName: string;
    latitude: number;
    longitude: number;
    plannedDateTime: Date;
  }) => void;
  // New props for auto-populated coordinates
  prefilledLat?: number;
  prefilledLng?: number;
}

const AddStopDialog: React.FC<AddStopDialogProps> = ({
  open,
  onClose,
  onSubmit,
  prefilledLat,
  prefilledLng,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  const stopNameRef = useRef<HTMLInputElement>(null);
  const dateTimeRef = useRef<Date>(new Date());

  // Auto-populate coordinates when they're provided
  useEffect(() => {
    if (prefilledLat !== undefined && prefilledLng !== undefined) {
      setLatitude(prefilledLat.toFixed(6));
      setLongitude(prefilledLng.toFixed(6));
    }
  }, [prefilledLat, prefilledLng]);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      // Reset form when closing
      setLatitude("");
      setLongitude("");
      setSelectedDate(new Date());
      if (stopNameRef.current) {
        stopNameRef.current.value = "";
      }
    }
  }, [open]);

  const handleDateChange = (newValue: Date | null) => {
    setSelectedDate(newValue);
    if (newValue) {
      dateTimeRef.current = newValue;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      stopName: stopNameRef.current?.value || "",
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      plannedDateTime: dateTimeRef.current,
    };
    onSubmit(formData);
    onClose();
  };

  const handleClose = () => {
    // Clear coordinates when manually closing
    setLatitude("");
    setLongitude("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          maxWidth: "100%",
          bgcolor: "background.paper",
          borderRadius: 1,
          border: { xs: "none", sm: "2px solid #000" },
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
          maxHeight: { xs: "90vh", sm: "auto" },
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Add New Stop
        </Typography>

        {prefilledLat !== undefined && prefilledLng !== undefined && (
          <Box
            sx={{
              p: 1.5,
              mb: 2,
              bgcolor: "success.light",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "success.main",
            }}
          >
            <Typography variant="body2" color="success.dark">
              📍 Coordinates captured from map click!
            </Typography>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Stop Name"
            name="stopName"
            inputRef={stopNameRef}
            margin="normal"
            required
            placeholder="Enter a name for this stop"
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "16px", sm: "inherit" },
              },
            }}
          />

          <TextField
            fullWidth
            label="Latitude"
            name="latitude"
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            margin="normal"
            required
            inputProps={{ step: "any" }}
            helperText={
              prefilledLat !== undefined
                ? "Auto-filled from map click"
                : "Enter latitude or click on map"
            }
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "16px", sm: "inherit" },
              },
            }}
          />

          <TextField
            fullWidth
            label="Longitude"
            name="longitude"
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            margin="normal"
            required
            inputProps={{ step: "any" }}
            helperText={
              prefilledLng !== undefined
                ? "Auto-filled from map click"
                : "Enter longitude or click on map"
            }
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "16px", sm: "inherit" },
              },
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Planned Date & Time"
              value={selectedDate}
              onChange={handleDateChange}
              sx={{
                mt: 2,
                width: "100%",
                "& .MuiInputBase-input": {
                  fontSize: { xs: "16px", sm: "inherit" },
                },
              }}
            />
          </LocalizationProvider>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ py: { xs: 1.5, sm: 1 } }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ py: { xs: 1.5, sm: 1 } }}
            >
              Add Stop
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddStopDialog;

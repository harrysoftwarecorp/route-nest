import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useRef, useState } from "react";

interface AddStopDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (stopData: {
    stopName: string;
    latitude: number;
    longitude: number;
    plannedDateTime: Date;
  }) => void;
}

const AddStopDialog: React.FC<AddStopDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const stopNameRef = useRef<HTMLInputElement>(null);
  const latitudeRef = useRef<HTMLInputElement>(null);
  const longitudeRef = useRef<HTMLInputElement>(null);
  const dateTimeRef = useRef<Date>(new Date());

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
      latitude: parseFloat(latitudeRef.current?.value || "0"),
      longitude: parseFloat(longitudeRef.current?.value || "0"),
      plannedDateTime: dateTimeRef.current,
    };
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Add New Stop
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Stop Name"
            name="stopName"
            inputRef={stopNameRef}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Latitude"
            name="latitude"
            type="number"
            inputRef={latitudeRef}
            margin="normal"
            required
            inputProps={{ step: "any" }}
          />
          <TextField
            fullWidth
            label="Longitude"
            name="longitude"
            type="number"
            inputRef={longitudeRef}
            margin="normal"
            required
            inputProps={{ step: "any" }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Planned Date & Time"
              value={selectedDate}
              onChange={handleDateChange}
              sx={{ mt: 2, width: "100%" }}
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
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Add Stop
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddStopDialog;

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Slider,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { StopType, AddStopRequest } from "../types";

interface AddStopDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (stopData: AddStopRequest) => void;
  prefilledLat?: number;
  prefilledLng?: number;
}

const stopTypeOptions: { value: StopType; label: string; emoji: string }[] = [
  { value: "attraction", label: "Tourist Attraction", emoji: "🏛️" },
  { value: "food", label: "Restaurant/Food", emoji: "🍜" },
  { value: "accommodation", label: "Hotel/Stay", emoji: "🏨" },
  { value: "transport", label: "Transport Hub", emoji: "🚌" },
  { value: "shopping", label: "Shopping", emoji: "🛍️" },
  { value: "nature", label: "Nature/Park", emoji: "🌳" },
  { value: "culture", label: "Cultural Site", emoji: "🎭" },
  { value: "activity", label: "Activity/Sport", emoji: "🎯" },
  { value: "rest", label: "Rest Stop", emoji: "☕" },
  { value: "custom", label: "Custom", emoji: "📍" },
];

const priorityOptions = [
  { value: "low", label: "Low Priority", color: "success" },
  { value: "medium", label: "Medium Priority", color: "warning" },
  { value: "high", label: "High Priority", color: "error" },
] as const;

export const AddStopDialog: React.FC<AddStopDialogProps> = ({
  open,
  onClose,
  onSubmit,
  prefilledLat,
  prefilledLng,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [stopType, setStopType] = useState<StopType>("attraction");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [estimatedDuration, setEstimatedDuration] = useState<number>(60); // Default 1 hour
  const [cost, setCost] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const stopNameRef = useRef<HTMLInputElement>(null);

  // Auto-populate coordinates when provided
  useEffect(() => {
    if (prefilledLat !== undefined && prefilledLng !== undefined) {
      setLatitude(prefilledLat.toFixed(6));
      setLongitude(prefilledLng.toFixed(6));
    }
  }, [prefilledLat, prefilledLng]);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setLatitude("");
      setLongitude("");
      setSelectedDate(new Date());
      setDepartureDate(null);
      setStopType("attraction");
      setPriority("medium");
      setEstimatedDuration(60);
      setCost("");
      setNotes("");
      setDescription("");
      if (stopNameRef.current) {
        stopNameRef.current.value = "";
      }
    }
  }, [open]);

  // Auto-calculate departure time when arrival time or duration changes
  useEffect(() => {
    if (selectedDate) {
      const departureTime = new Date(
        selectedDate.getTime() + estimatedDuration * 60000
      );
      setDepartureDate(departureTime);
    }
  }, [selectedDate, estimatedDuration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    const formData: AddStopRequest = {
      name: stopNameRef.current?.value || "",
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
      plannedArrival: selectedDate.toISOString(),
      plannedDeparture: departureDate?.toISOString(),
      estimatedDuration,
      stopType,
      priority,
      description: description.trim() || undefined,
      cost: cost ? parseFloat(cost) : undefined,
      notes: notes.trim() || undefined,
    };

    onSubmit(formData);
    onClose();
  };

  const handleClose = () => {
    setLatitude("");
    setLongitude("");
    onClose();
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-stop-modal-title"
      aria-describedby="add-stop-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: 480 },
          maxWidth: "100%",
          maxHeight: { xs: "95vh", sm: "90vh" },
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: { xs: 2, sm: 3 },
          overflowY: "auto",
        }}
      >
        <Typography
          id="add-stop-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Add New Stop
        </Typography>

        {/* Coordinate Notification */}
        {prefilledLat !== undefined && prefilledLng !== undefined && (
          <Box
            sx={{
              p: 2,
              mb: 3,
              bgcolor: "success.50",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "success.200",
            }}
          >
            <Typography
              variant="body2"
              color="success.dark"
              sx={{ fontWeight: "medium" }}
            >
              📍 Coordinates captured from map click!
            </Typography>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          {/* Stop Name */}
          <TextField
            fullWidth
            label="Stop Name"
            inputRef={stopNameRef}
            margin="normal"
            required
            placeholder="Enter a name for this stop"
            sx={{ mb: 2 }}
          />

          {/* Description */}
          <TextField
            fullWidth
            label="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={2}
            placeholder="Brief description of this stop"
            sx={{ mb: 2 }}
          />

          {/* Stop Type and Priority */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Stop Type</InputLabel>
              <Select
                value={stopType}
                label="Stop Type"
                onChange={(e) => setStopType(e.target.value as StopType)}
              >
                {stopTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.emoji} {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                label="Priority"
                onChange={(e) =>
                  setPriority(e.target.value as "low" | "medium" | "high")
                }
              >
                {priorityOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Chip
                      label={option.label}
                      size="small"
                      color={option.color}
                      variant="outlined"
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Coordinates */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Latitude"
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
              inputProps={{ step: "any" }}
              helperText={
                prefilledLat !== undefined
                  ? "Auto-filled from map"
                  : "Enter latitude"
              }
            />
            <TextField
              fullWidth
              label="Longitude"
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
              inputProps={{ step: "any" }}
              helperText={
                prefilledLng !== undefined
                  ? "Auto-filled from map"
                  : "Enter longitude"
              }
            />
          </Box>

          {/* Timing */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <DateTimePicker
                label="Arrival Time"
                value={selectedDate}
                onChange={setSelectedDate}
                sx={{ flex: 1 }}
              />
              <DateTimePicker
                label="Departure Time"
                value={departureDate}
                onChange={setDepartureDate}
                sx={{ flex: 1 }}
                disabled
                slotProps={{
                  textField: {
                    helperText: "Auto-calculated",
                  },
                }}
              />
            </Box>
          </LocalizationProvider>

          {/* Duration Slider */}
          <Box sx={{ mb: 3 }}>
            <Typography
              gutterBottom
              sx={{ fontSize: 14, fontWeight: "medium" }}
            >
              Estimated Duration: {formatDuration(estimatedDuration)}
            </Typography>
            <Slider
              value={estimatedDuration}
              onChange={(_, newValue) =>
                setEstimatedDuration(newValue as number)
              }
              min={15}
              max={480} // 8 hours max
              step={15}
              marks={[
                { value: 30, label: "30m" },
                { value: 120, label: "2h" },
                { value: 240, label: "4h" },
                { value: 480, label: "8h" },
              ]}
              sx={{
                "& .MuiSlider-markLabel": {
                  fontSize: 10,
                },
              }}
            />
          </Box>

          {/* Cost */}
          <TextField
            fullWidth
            label="Estimated Cost (VND)"
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Optional estimated cost"
            margin="normal"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: cost && (
                <Typography
                  variant="body2"
                  sx={{ mr: 1, color: "text.secondary" }}
                >
                  ₫
                </Typography>
              ),
            }}
          />

          {/* Notes */}
          <TextField
            fullWidth
            label="Notes (Optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            margin="normal"
            multiline
            rows={3}
            placeholder="Any special notes, tips, or reminders for this stop"
            sx={{ mb: 3 }}
          />

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              pt: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                py: 1.5,
                px: 3,
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                py: 1.5,
                px: 3,
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Add Stop
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

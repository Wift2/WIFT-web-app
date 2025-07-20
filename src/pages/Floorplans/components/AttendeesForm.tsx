import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  Chip,
} from '@mui/material';

export interface AttendeesFormData {
  attendees: string;
  screenType: string;
  seatingType: string;
  tableSize: string;
  tableSeats: string;
}

interface AttendeesFormProps {
  formData: AttendeesFormData;
  onFormChange: (data: AttendeesFormData) => void;
}

const AttendeesForm = ({ formData, onFormChange }: AttendeesFormProps) => {
  const handleChange = (field: keyof AttendeesFormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Number of Attendees"
        placeholder="150"
        value={formData.attendees}
        onChange={(e) => handleChange('attendees', e.target.value)}
        fullWidth
        type="number"
      />

      <FormControl fullWidth>
        <InputLabel>Screen Type</InputLabel>
        <Select
          value={formData.screenType}
          label="Screen Type"
          onChange={(e) => handleChange('screenType', e.target.value)}
        >
          <MenuItem value="Front">Front</MenuItem>
          <MenuItem value="Rear">Rear</MenuItem>
          <MenuItem value="Wide">Wide</MenuItem>
          <MenuItem value="LED">LED</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Seating Type</InputLabel>
        <Select
          value={formData.seatingType}
          label="Seating Type"
          onChange={(e) => handleChange('seatingType', e.target.value)}
        >
          <MenuItem value="Full">Full</MenuItem>
          <MenuItem value="Crescent">Crescent</MenuItem>
          <MenuItem value="Classroom">Classroom</MenuItem>
          <MenuItem value="Theatre">Theatre</MenuItem>
        </Select>
      </FormControl>

      <Box>
        <FormLabel component="legend" sx={{ mb: 2 }}>
          Seating Arrangement
        </FormLabel>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Table Size</InputLabel>
            <Select
              value={formData.tableSize}
              label="Table Size"
              onChange={(e) => handleChange('tableSize', e.target.value)}
            >
              <MenuItem value="60">60"</MenuItem>
              <MenuItem value="66">66"</MenuItem>
              <MenuItem value="72">72"</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Seats</InputLabel>
            <Select
              value={formData.tableSeats}
              label="Seats"
              onChange={(e) => handleChange('tableSeats', e.target.value)}
            >
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="8">8</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="12">12</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Automatic Sizing" variant="outlined" size="small" />
          <Chip label="Optimized Layout" variant="outlined" size="small" />
          <Chip label="Capacity Based" variant="outlined" size="small" />
        </Box>
      </Box>
    </Box>
  );
};

export default AttendeesForm;

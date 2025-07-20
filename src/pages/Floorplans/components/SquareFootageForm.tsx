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

export interface SquareFootageFormData {
  length: string;
  width: string;
  height: string;
  screenType: string;
  seatingType: string;
  tableSize: string;
  tableSeats: string;
}

interface SquareFootageFormProps {
  formData: SquareFootageFormData;
  onFormChange: (data: SquareFootageFormData) => void;
}

const SquareFootageForm = ({
  formData,
  onFormChange,
}: SquareFootageFormProps) => {
  const handleChange = (field: keyof SquareFootageFormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Length (ft)"
        placeholder="75 ft"
        value={formData.length}
        onChange={(e) => handleChange('length', e.target.value)}
        fullWidth
      />

      <TextField
        label="Width (ft)"
        placeholder="50 ft"
        value={formData.width}
        onChange={(e) => handleChange('width', e.target.value)}
        fullWidth
      />

      <TextField
        label="Height (ft)"
        placeholder="12 ft"
        value={formData.height}
        onChange={(e) => handleChange('height', e.target.value)}
        fullWidth
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
          <Chip label="Professional Setup" variant="outlined" size="small" />
          <Chip label="Customizable" variant="outlined" size="small" />
          <Chip label="Scalable" variant="outlined" size="small" />
        </Box>
      </Box>
    </Box>
  );
};

export default SquareFootageForm;

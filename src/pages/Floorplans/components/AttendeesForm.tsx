import {
  Box,
  TextField,
  FormLabel,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from '@mui/material';
import {
  Tv as FrontIcon,
  SettingsBackupRestore as RearIcon,
  AspectRatio as WideIcon,
  Lightbulb as LEDIcon,
} from '@mui/icons-material';
import {
  FullSeatingIcon,
  CrescentSeatingIcon,
  ClassroomSeatingIcon,
  TheatreSeatingIcon,
} from '../../../components/SeatingIcons';
import TablePreview from '../../../components/TablePreview';

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

      <Box>
        <FormLabel component="legend" sx={{ mb: 2 }}>
          Screen Type
        </FormLabel>
        <ToggleButtonGroup
          value={formData.screenType}
          exclusive
          onChange={(_, newValue) => {
            if (newValue !== null) {
              handleChange('screenType', newValue);
            }
          }}
          aria-label="screen type"
          sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}
        >
          <ToggleButton
            value="Front"
            aria-label="front screen"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              minWidth: 80,
              p: 1.5,
            }}
          >
            <FrontIcon />
            <Typography variant="caption">Front</Typography>
          </ToggleButton>
          <ToggleButton
            value="Rear"
            aria-label="rear screen"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              minWidth: 80,
              p: 1.5,
            }}
          >
            <RearIcon />
            <Typography variant="caption">Rear</Typography>
          </ToggleButton>
          <ToggleButton
            value="Wide"
            aria-label="wide screen"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              minWidth: 80,
              p: 1.5,
            }}
          >
            <WideIcon />
            <Typography variant="caption">Wide</Typography>
          </ToggleButton>
          <ToggleButton
            value="LED"
            aria-label="LED screen"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              minWidth: 80,
              p: 1.5,
            }}
          >
            <LEDIcon />
            <Typography variant="caption">LED</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box>
        <FormLabel component="legend" sx={{ mb: 2 }}>
          Seating Type
        </FormLabel>
        <ToggleButtonGroup
          value={formData.seatingType}
          exclusive
          onChange={(_, newValue) => {
            if (newValue !== null) {
              handleChange('seatingType', newValue);
            }
          }}
          aria-label="seating type"
          sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}
        >
          <ToggleButton
            value="Full"
            aria-label="full seating"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              minWidth: 80,
              p: 1.5,
            }}
          >
            <FullSeatingIcon />
            <Typography variant="caption">Full</Typography>
          </ToggleButton>
          <ToggleButton
            value="Crescent"
            aria-label="crescent seating"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              minWidth: 80,
              p: 1.5,
            }}
          >
            <CrescentSeatingIcon />
            <Typography variant="caption">Crescent</Typography>
          </ToggleButton>
          <ToggleButton
            value="Classroom"
            aria-label="classroom seating"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              minWidth: 80,
              p: 1.5,
            }}
          >
            <ClassroomSeatingIcon />
            <Typography variant="caption">Classroom</Typography>
          </ToggleButton>
          <ToggleButton
            value="Theatre"
            aria-label="theatre seating"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              minWidth: 80,
              p: 1.5,
            }}
          >
            <TheatreSeatingIcon />
            <Typography variant="caption">Theatre</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box>
        <FormLabel component="legend" sx={{ mb: 2 }}>
          Seating Arrangement
        </FormLabel>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box>
                <FormLabel
                  component="legend"
                  sx={{ mb: 1, fontSize: '0.875rem' }}
                >
                  Table Size
                </FormLabel>
                <ToggleButtonGroup
                  value={formData.tableSize}
                  exclusive
                  onChange={(_, newValue) => {
                    if (newValue !== null) {
                      handleChange('tableSize', newValue);
                    }
                  }}
                  orientation="vertical"
                  aria-label="table size"
                  size="medium"
                  sx={{ minWidth: 80 }}
                >
                  <ToggleButton value="60" aria-label="60 inch table">
                    60"
                  </ToggleButton>
                  <ToggleButton value="66" aria-label="66 inch table">
                    66"
                  </ToggleButton>
                  <ToggleButton value="72" aria-label="72 inch table">
                    72"
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box>
                <FormLabel
                  component="legend"
                  sx={{ mb: 1, fontSize: '0.875rem' }}
                >
                  Seats
                </FormLabel>
                <ToggleButtonGroup
                  value={formData.tableSeats}
                  exclusive
                  onChange={(_, newValue) => {
                    if (newValue !== null) {
                      handleChange('tableSeats', newValue);
                    }
                  }}
                  orientation="vertical"
                  aria-label="number of seats"
                  size="medium"
                  sx={{ minWidth: 60 }}
                >
                  <ToggleButton value="6" aria-label="6 seats">
                    6
                  </ToggleButton>
                  <ToggleButton value="8" aria-label="8 seats">
                    8
                  </ToggleButton>
                  <ToggleButton value="10" aria-label="10 seats">
                    10
                  </ToggleButton>
                  <ToggleButton value="12" aria-label="12 seats">
                    12
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Automatic Sizing" variant="outlined" size="small" />
              <Chip label="Optimized Layout" variant="outlined" size="small" />
              <Chip label="Capacity Based" variant="outlined" size="small" />
            </Box>
          </Box>

          {/* Table Preview */}
          <TablePreview
            tableSize={formData.tableSize || '66'}
            numberOfSeats={formData.tableSeats || '8'}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AttendeesForm;

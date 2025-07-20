import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Paper,
  Alert,
  TextField,
  Drawer,
  IconButton,
  Toolbar,
  Divider,
  Fab,
} from '@mui/material';
import {
  Tv as ProjectorIcon,
  LightMode as LightIcon,
  TableRestaurant as TableIcon,
  Chair as ChairIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Tune as TuneIcon,
} from '@mui/icons-material';

// Venue configuration types
interface Venue {
  id: string;
  name: string;
  dimensions: {
    width: number;
    height: number;
  };
  capacity: number;
  description: string;
  features: string[];
}

interface FloorplanElement {
  id: string;
  type: 'table' | 'chair' | 'projector' | 'light';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
}

// Pre-configured venue options
const VENUES: Venue[] = [
  {
    id: 'boardroom-small',
    name: 'Small Boardroom',
    dimensions: { width: 400, height: 300 },
    capacity: 8,
    description: 'Intimate boardroom perfect for executive meetings',
    features: ['Projector Screen', 'Wall Lights', 'Conference Table'],
  },
  {
    id: 'conference-medium',
    name: 'Medium Conference Room',
    dimensions: { width: 600, height: 400 },
    capacity: 16,
    description: 'Standard conference room for team meetings',
    features: [
      'Projector Screen',
      'Wall Lights',
      'Multiple Tables',
      'Flexible Seating',
    ],
  },
  {
    id: 'auditorium-large',
    name: 'Large Auditorium',
    dimensions: { width: 800, height: 600 },
    capacity: 50,
    description: 'Large presentation space for company-wide meetings',
    features: [
      'Projector Screen',
      'Stage Lighting',
      'Theater Seating',
      'Multiple Projectors',
    ],
  },
  {
    id: 'training-room',
    name: 'Training Room',
    dimensions: { width: 500, height: 350 },
    capacity: 20,
    description: 'Flexible training space with movable furniture',
    features: [
      'Projector Screen',
      'Wall Lights',
      'Modular Tables',
      'Collaborative Setup',
    ],
  },
  {
    id: 'workshop-space',
    name: 'Workshop Space',
    dimensions: { width: 700, height: 500 },
    capacity: 30,
    description: 'Open workshop area for collaborative sessions',
    features: [
      'Multiple Screens',
      'Track Lighting',
      'Flexible Furniture',
      'Breakout Areas',
    ],
  },
];

// Generate initial floorplan layout based on venue
const generateInitialLayout = (venue: Venue): FloorplanElement[] => {
  const elements: FloorplanElement[] = [];
  const { width, height } = venue.dimensions;

  // Add projector screen (always on the front wall)
  elements.push(
    {
      id: 'projector-screen',
      type: 'projector',
      x: width / 2 - 40,
      y: 20,
      width: 80,
      height: 10,
    },
    {
      id: 'light-1',
      type: 'light',
      x: width * 0.25,
      y: 10,
      width: 15,
      height: 15,
    },
    {
      id: 'light-2',
      type: 'light',
      x: width * 0.75,
      y: 10,
      width: 15,
      height: 15,
    }
  );

  // Add round tables and chairs based on venue type
  switch (venue.id) {
    case 'boardroom-small': {
      // Single large round conference table
      const tableRadius = 80;
      elements.push({
        id: 'main-table',
        type: 'table',
        x: width / 2 - tableRadius,
        y: height / 2 - tableRadius,
        width: tableRadius * 2,
        height: tableRadius * 2,
      });

      // Chairs around the round table
      const chairCount = 8;
      const chairRadius = tableRadius + 40; // Distance from table center to chairs
      for (let i = 0; i < chairCount; i++) {
        const angle = (i / chairCount) * 2 * Math.PI;
        elements.push({
          id: `chair-${i}`,
          type: 'chair',
          x: width / 2 + Math.cos(angle) * chairRadius - 15,
          y: height / 2 + Math.sin(angle) * chairRadius - 15,
          width: 30,
          height: 30,
          rotation: (angle * 180) / Math.PI + 90,
        });
      }
      break;
    }
    case 'conference-medium': {
      // Multiple round tables arrangement
      const tableCount = 4;
      const tablesPerRow = 2;
      const tableRadius = 50;

      for (let i = 0; i < tableCount; i++) {
        const row = Math.floor(i / tablesPerRow);
        const col = i % tablesPerRow;
        const tableX = 120 + col * 240;
        const tableY = 120 + row * 160;

        // Round table
        elements.push({
          id: `table-${i}`,
          type: 'table',
          x: tableX - tableRadius,
          y: tableY - tableRadius,
          width: tableRadius * 2,
          height: tableRadius * 2,
        });

        // 6 chairs around each round table
        const chairCount = 6;
        const chairRadius = tableRadius + 35;
        for (let j = 0; j < chairCount; j++) {
          const angle = (j / chairCount) * 2 * Math.PI;
          elements.push({
            id: `chair-${i}-${j}`,
            type: 'chair',
            x: tableX + Math.cos(angle) * chairRadius - 15,
            y: tableY + Math.sin(angle) * chairRadius - 15,
            width: 30,
            height: 30,
            rotation: (angle * 180) / Math.PI + 90,
          });
        }
      }
      break;
    }
    case 'auditorium-large': {
      // Large venue with multiple round tables
      const tableCount = 8;
      const tableRadius = 45;
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < tableCount; i++) {
        const angle = (i / tableCount) * 2 * Math.PI;
        const radius = Math.min(width, height) * 0.25;
        const tableX = centerX + Math.cos(angle) * radius;
        const tableY = centerY + Math.sin(angle) * radius;

        // Round table
        elements.push({
          id: `table-${i}`,
          type: 'table',
          x: tableX - tableRadius,
          y: tableY - tableRadius,
          width: tableRadius * 2,
          height: tableRadius * 2,
        });

        // 6 chairs around each table
        const chairCount = 6;
        const chairRadius = tableRadius + 30;
        for (let j = 0; j < chairCount; j++) {
          const chairAngle = (j / chairCount) * 2 * Math.PI;
          elements.push({
            id: `chair-${i}-${j}`,
            type: 'chair',
            x: tableX + Math.cos(chairAngle) * chairRadius - 15,
            y: tableY + Math.sin(chairAngle) * chairRadius - 15,
            width: 30,
            height: 30,
            rotation: (chairAngle * 180) / Math.PI + 90,
          });
        }
      }
      break;
    }
    default: {
      // Default layout for training room and workshop space
      const tableCount = Math.min(Math.floor(venue.capacity / 6), 6);
      const tableRadius = 45;
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < tableCount; i++) {
        const angle = (i / tableCount) * 2 * Math.PI;
        const radius = Math.min(width, height) * 0.22;
        const tableX = centerX + Math.cos(angle) * radius;
        const tableY = centerY + Math.sin(angle) * radius;

        // Round table
        elements.push({
          id: `table-${i}`,
          type: 'table',
          x: tableX - tableRadius,
          y: tableY - tableRadius,
          width: tableRadius * 2,
          height: tableRadius * 2,
        });

        // 5 chairs around each table
        const chairCount = 5;
        const chairRadius = tableRadius + 32;
        for (let j = 0; j < chairCount; j++) {
          const chairAngle = (j / chairCount) * 2 * Math.PI;
          elements.push({
            id: `chair-${i}-${j}`,
            type: 'chair',
            x: tableX + Math.cos(chairAngle) * chairRadius - 15,
            y: tableY + Math.sin(chairAngle) * chairRadius - 15,
            width: 30,
            height: 30,
            rotation: (chairAngle * 180) / Math.PI + 90,
          });
        }
      }
    }
  }

  return elements;
};

// Helper functions
const getElementColor = (type: string) => {
  switch (type) {
    case 'table': {
      return '#8B4513';
    }
    case 'chair': {
      return '#2196F3';
    }
    case 'projector': {
      return '#9C27B0';
    }
    case 'light': {
      return '#FFC107';
    }
    default: {
      return '#666';
    }
  }
};

const getElementIcon = (type: string) => {
  switch (type) {
    case 'table': {
      return <TableIcon sx={{ fontSize: 16 }} />;
    }
    case 'chair': {
      return <ChairIcon sx={{ fontSize: 12 }} />;
    }
    case 'projector': {
      return <ProjectorIcon sx={{ fontSize: 16 }} />;
    }
    case 'light': {
      return <LightIcon sx={{ fontSize: 12 }} />;
    }
    default: {
      return null;
    }
  }
};

// Floorplan element component
const FloorplanElement: React.FC<{
  element: FloorplanElement;
  scale: number;
}> = ({ element, scale }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: element.x * scale,
        top: element.y * scale,
        width: element.width * scale,
        height: element.height * scale,
        backgroundColor: getElementColor(element.type),
        border: '1px solid #333',
        borderRadius:
          element.type === 'light' || element.type === 'table' ? '50%' : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '12px',
        cursor: 'pointer',
        transform: element.rotation
          ? `rotate(${element.rotation}deg)`
          : undefined,
        '&:hover': {
          opacity: 0.8,
          transform: `scale(1.05) ${element.rotation ? `rotate(${element.rotation}deg)` : ''}`,
        },
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {getElementIcon(element.type)}
    </Box>
  );
};

function CreateFloorplanPage() {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [floorplanName, setFloorplanName] = useState('');
  const [floorplanElements, setFloorplanElements] = useState<
    FloorplanElement[]
  >([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleVenueSelect = useCallback((venueId: string) => {
    const venue = VENUES.find((v) => v.id === venueId);
    if (venue) {
      setSelectedVenue(venue);
      setFloorplanName(`${venue.name} - ${new Date().toLocaleDateString()}`);
      setIsGenerating(true);

      // Simulate generation delay
      setTimeout(() => {
        setFloorplanElements(generateInitialLayout(venue));
        setIsGenerating(false);
      }, 1000);
    }
  }, []);

  // Select Large Auditorium by default on component mount
  useEffect(() => {
    handleVenueSelect('auditorium-large');
  }, [handleVenueSelect]);

  const handleSaveFloorplan = useCallback(() => {
    // TODO: Implement save functionality
    // console.log('Saving floorplan:', {
    //   name: floorplanName,
    //   venue: selectedVenue,
    //   elements: floorplanElements,
    // });
    alert('Floorplan saved successfully!');
  }, []);

  const scale = 0.8; // Scale factor for display
  const drawerWidth = 400;

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create New Floorplan
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Design conference room layouts for meeting planners and event
            organizers
          </Typography>
        </Box>

        {/* Floorplan Preview - Full Width */}
        <Card sx={{ height: 'calc(100vh - 200px)' }}>
          <CardContent sx={{ p: 2, height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h6">Floorplan Preview</Typography>
              <Button
                variant="outlined"
                startIcon={<TuneIcon />}
                onClick={toggleDrawer}
                size="small"
              >
                {drawerOpen ? 'Hide Settings' : 'Show Settings'}
              </Button>
            </Box>

            <Box
              sx={{
                height: 'calc(100% - 60px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {selectedVenue ? (
                isGenerating ? (
                  <Paper
                    sx={{
                      height: '80%',
                      width: '80%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'grey.50',
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Generating floorplan layout...
                    </Typography>
                  </Paper>
                ) : (
                  <Paper
                    sx={{
                      position: 'relative',
                      width: Math.min(
                        selectedVenue.dimensions.width * scale,
                        800
                      ),
                      height: Math.min(
                        selectedVenue.dimensions.height * scale,
                        600
                      ),
                      border: '2px solid #333',
                      backgroundColor: '#f5f5f5',
                      overflow: 'hidden',
                    }}
                  >
                    {floorplanElements.map((element) => (
                      <FloorplanElement
                        key={element.id}
                        element={element}
                        scale={scale}
                      />
                    ))}

                    {/* Room dimensions label */}
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: '2px 6px',
                        borderRadius: 1,
                      }}
                    >
                      {selectedVenue.dimensions.width} ×{' '}
                      {selectedVenue.dimensions.height} ft
                    </Typography>
                  </Paper>
                )
              ) : (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Venue Selected
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Open the settings panel and select a venue to generate a
                    floorplan
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<TuneIcon />}
                    onClick={toggleDrawer}
                    sx={{ mt: 2 }}
                  >
                    Open Settings
                  </Button>
                </Box>
              )}

              {selectedVenue && floorplanElements.length > 0 && (
                <Alert
                  severity="info"
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                  }}
                >
                  <Typography variant="body2">
                    Initial layout generated with{' '}
                    {floorplanElements.filter((e) => e.type === 'table').length}{' '}
                    tables,{' '}
                    {floorplanElements.filter((e) => e.type === 'chair').length}{' '}
                    chairs, and room features.
                  </Typography>
                </Alert>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Settings Drawer */}
      <Drawer
        variant="persistent"
        anchor="right"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? drawerWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? drawerWidth : 0,
            boxSizing: 'border-box',
            transition: (theme) =>
              theme.transitions.create(['width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          },
        }}
      >
        {/* Drawer Header */}
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Floorplan Settings
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Divider />

        {/* Drawer Content */}
        <Box sx={{ overflow: 'auto', p: 2 }}>
          {/* Venue Selection */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Venue
              </Typography>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Choose a venue type</InputLabel>
                <Select
                  value={selectedVenue?.id || ''}
                  label="Choose a venue type"
                  onChange={(e) => handleVenueSelect(e.target.value)}
                >
                  {VENUES.map((venue) => (
                    <MenuItem key={venue.id} value={venue.id}>
                      {venue.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedVenue && (
                <>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Dimensions:</strong>{' '}
                    {selectedVenue.dimensions.width} ×{' '}
                    {selectedVenue.dimensions.height} ft
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Capacity:</strong> {selectedVenue.capacity} people
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedVenue.description}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Features:
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {selectedVenue.features.map((feature) => (
                      <Chip
                        key={feature}
                        label={feature}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>

                  <TextField
                    fullWidth
                    label="Floorplan Name"
                    value={floorplanName}
                    onChange={(e) => setFloorplanName(e.target.value)}
                    sx={{ mb: 2 }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveFloorplan}
                    disabled={!floorplanName || floorplanElements.length === 0}
                  >
                    Save Floorplan
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Legend */}
          {selectedVenue && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Legend
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: '#8B4513',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <TableIcon sx={{ fontSize: 12, color: 'white' }} />
                    </Box>
                    <Typography variant="body2">Round Tables</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: '#2196F3',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ChairIcon sx={{ fontSize: 12, color: 'white' }} />
                    </Box>
                    <Typography variant="body2">Chairs</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: '#9C27B0',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ProjectorIcon sx={{ fontSize: 12, color: 'white' }} />
                    </Box>
                    <Typography variant="body2">Projector Screen</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: '#FFC107',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <LightIcon sx={{ fontSize: 12, color: 'white' }} />
                    </Box>
                    <Typography variant="body2">Wall Lights</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Drawer>

      {/* Floating Action Button for Mobile */}
      {!drawerOpen && (
        <Fab
          color="primary"
          aria-label="settings"
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            display: { sm: 'none' },
          }}
        >
          <TuneIcon />
        </Fab>
      )}
    </Box>
  );
}

export default CreateFloorplanPage;

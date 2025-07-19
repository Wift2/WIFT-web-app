import {
  Typography,
  Box,
  Paper,
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

export default function FloorplansPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Custom Floorplans
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          sx={{ minWidth: 160 }}
        >
          Create New
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Welcome Card */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Welcome to WIFT Floorplan Creator
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Design and create custom floorplans with our intuitive drag-and-drop
            interface. Build detailed layouts for residential and commercial
            properties with precision tools and professional templates.
          </Typography>
        </Paper>

        {/* Quick Actions */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <AddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Create New Floorplan
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Start from scratch or use our professional templates to design
                  your custom floorplan.
                </Typography>
                <Button variant="outlined" fullWidth>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <EditIcon
                  sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Edit Existing Plans
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Modify and enhance your saved floorplans with our
                  comprehensive editing tools.
                </Typography>
                <Button variant="outlined" fullWidth>
                  Browse Plans
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <ViewIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  View Gallery
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Explore our gallery of completed floorplans and get
                  inspiration for your designs.
                </Typography>
                <Button variant="outlined" fullWidth>
                  View Gallery
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Features Coming Soon */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Coming Soon Features
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                • Drag & Drop Designer
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                • 3D Visualization
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                • Collaboration Tools
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                • Export Options
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

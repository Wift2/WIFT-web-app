import { Typography, Box, Paper } from '@mui/material';
import GradientTitle from '../../components/GradientTitle';

const SettingsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <GradientTitle variant="h4" component="h1" gutterBottom>
        Settings
      </GradientTitle>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Settings page coming soon. This page will allow you to configure your
          account preferences and application settings.
        </Typography>
      </Paper>
    </Box>
  );
};

export default SettingsPage;

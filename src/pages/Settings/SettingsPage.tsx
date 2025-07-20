import { Typography, Box, Paper } from '@mui/material';

const SettingsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
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

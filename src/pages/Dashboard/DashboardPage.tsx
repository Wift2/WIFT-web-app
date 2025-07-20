import {
  Typography,
  Box,
  Card,
  CardContent,
  Paper,
  Stack,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome back, {user?.username}!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Here's what's happening with your account today.
      </Typography>

      <Stack spacing={3} sx={{ mt: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h5" component="div">
                1,234
              </Typography>
              <Typography variant="body2">+12% from last month</Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Revenue
              </Typography>
              <Typography variant="h5" component="div">
                $12,345
              </Typography>
              <Typography variant="body2">+8% from last month</Typography>
            </CardContent>
          </Card>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Projects
              </Typography>
              <Typography variant="h5" component="div">
                23
              </Typography>
              <Typography variant="body2">+3 new this week</Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completion Rate
              </Typography>
              <Typography variant="h5" component="div">
                94%
              </Typography>
              <Typography variant="body2">+2% from last month</Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Recent Activity */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body1">
                New user registration: john.doe@example.com
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 hours ago
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">Project "Alpha" completed</Typography>
              <Typography variant="caption" color="text.secondary">
                1 day ago
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                System maintenance scheduled
              </Typography>
              <Typography variant="caption" color="text.secondary">
                3 days ago
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default DashboardPage;

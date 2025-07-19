import {
  Typography,
  Box,
  Card,
  CardContent,
  Paper,
  Stack,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
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
                Active Sessions
              </Typography>
              <Typography variant="h5" component="div">
                89
              </Typography>
              <Typography variant="body2">+23% from last hour</Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Performance
              </Typography>
              <Typography variant="h5" component="div">
                98.2%
              </Typography>
              <Typography variant="body2">+0.1% from yesterday</Typography>
            </CardContent>
          </Card>
        </Stack>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <Typography variant="body1">
            No recent activity to display. Start using the application to see
            your activity here.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
}

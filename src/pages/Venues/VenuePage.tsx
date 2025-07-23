import { Box, Container } from '@mui/material';
import { VenueSearch } from './components';
import GradientTitle from '../../components/GradientTitle';

export function VenuePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <GradientTitle variant="h4" component="h1">
          Venues
        </GradientTitle>
        <VenueSearch />
      </Box>
    </Container>
  );
}

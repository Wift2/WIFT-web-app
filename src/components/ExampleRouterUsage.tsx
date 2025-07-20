import { useEffect, useState } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import type { Router } from '@toolpad/core';

/**
 * EXAMPLE: How to use the real URL router in your components
 *
 * This example shows common patterns for:
 * - Navigation with router.navigate()
 * - Reading URL parameters with router.searchParams
 * - Reacting to parameter changes with useEffect
 */

interface ExampleComponentProps {
  router: Router;
}

const ExampleComponent = ({ router }: ExampleComponentProps) => {
  // State that can be initialized from URL parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Read URL parameters on component mount and when they change
  useEffect(() => {
    const query = router.searchParams.get('q') || '';
    const type = router.searchParams.get('filter') || 'all';

    setSearchQuery(query);
    setFilterType(type);
  }, [router.searchParams]); // Dependencies: re-run when URL params change

  // Helper function to update URL with current state
  const updateURL = (newQuery?: string, newFilter?: string) => {
    const params = new URLSearchParams();

    const query = newQuery ?? searchQuery;
    const filter = newFilter ?? filterType;

    if (query) params.set('q', query);
    if (filter !== 'all') params.set('filter', filter);

    const url = params.toString()
      ? `${router.pathname}?${params}`
      : router.pathname;

    router.navigate(url);
  };

  // Handle form submission - update URL with search parameters
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    updateURL(searchQuery, filterType);
  };

  // Navigation examples
  const handleNavigation = (path: string) => {
    router.navigate(path);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Router Usage Example
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Current URL: {router.pathname}
        {router.searchParams.toString() && `?${router.searchParams.toString()}`}
      </Typography>

      {/* Search Form Example */}
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
        <TextField
          label="Search Query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="contained">
          Search (Updates URL)
        </Button>
      </Box>

      {/* Navigation Examples */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="outlined"
          onClick={() => handleNavigation('/dashboard')}
        >
          Go to Dashboard
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleNavigation('/floorplans')}
        >
          Go to Floorplans
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            handleNavigation('/floorplans/create?type=attendees&attendees=50')
          }
        >
          Create Floorplan (with params)
        </Button>
      </Box>

      {/* Display Current Parameters */}
      <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Current URL Parameters:
        </Typography>
        {[...router.searchParams.entries()].length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No parameters
          </Typography>
        ) : (
          [...router.searchParams.entries()].map(([key, value]) => (
            <Typography key={key} variant="body2">
              <strong>{key}:</strong> {value}
            </Typography>
          ))
        )}
      </Box>

      {/* Common Patterns Section */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Common Router Patterns:
        </Typography>

        <Typography
          variant="body2"
          component="div"
          sx={{ fontFamily: 'monospace', mb: 1 }}
        >
          {`// Navigate to a page`}
          <br />
          {`router.navigate('/dashboard')`}
        </Typography>

        <Typography
          variant="body2"
          component="div"
          sx={{ fontFamily: 'monospace', mb: 1 }}
        >
          {`// Navigate with parameters`}
          <br />
          {`router.navigate('/search?q=test&filter=recent')`}
        </Typography>

        <Typography
          variant="body2"
          component="div"
          sx={{ fontFamily: 'monospace', mb: 1 }}
        >
          {`// Read a parameter`}
          <br />
          {`const query = router.searchParams.get('q')`}
        </Typography>

        <Typography
          variant="body2"
          component="div"
          sx={{ fontFamily: 'monospace' }}
        >
          {`// Check if parameter exists`}
          <br />
          {`if (router.searchParams.has('filter')) { ... }`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ExampleComponent;

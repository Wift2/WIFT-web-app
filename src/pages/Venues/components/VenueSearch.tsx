import { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Rating,
  Chip,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { PickersShortcutsItem } from '@mui/x-date-pickers/PickersShortcuts';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LocationOn as LocationIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as WebsiteIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import {
  venueService,
  type VenueSearchParams,
  type Venue,
} from '../services/venueService';
import { VenueMap } from './VenueMap';

// Zippopotam.us API response types
interface ZippopotamPlace {
  'place name': string;
  state: string;
  'state abbreviation': string;
}

interface ZippopotamResponse {
  'post code': string;
  country: string;
  'country abbreviation': string;
  places: ZippopotamPlace[];
}

// Function to get city from zip code using Zippopotam.us API
const getCityFromZipcode = async (
  zipcode: string
): Promise<string | undefined> => {
  if (!zipcode || zipcode.length !== 5) {
    return undefined;
  }

  try {
    const response = await fetch(`https://api.zippopotam.us/us/${zipcode}`);

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.warn(`ZIP code API error: ${response.status} for ${zipcode}`);
      return undefined;
    }

    const data: ZippopotamResponse = await response.json();

    if (data.places && data.places.length > 0) {
      const place = data.places[0];
      return `${place['place name']}, ${place['state abbreviation']}`;
    }

    return undefined;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to fetch city for ZIP code ${zipcode}:`, error);
    return undefined;
  }
};

// Date shortcuts for the date picker
const getDateShortcuts = (): PickersShortcutsItem<Date | null>[] => {
  const today = new Date();

  return [
    {
      label: 'Today',
      getValue: () => today,
    },
    {
      label: 'Reset',
      getValue: () => null,
    },
  ];
};

// Sorting options for venues
type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'rating-desc'
  | 'rating-asc'
  | 'capacity-desc'
  | 'capacity-asc'
  | 'price-asc'
  | 'price-desc'
  | 'city-asc'
  | 'city-desc';

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'rating-desc', label: 'Rating (High to Low)' },
  { value: 'rating-asc', label: 'Rating (Low to High)' },
  { value: 'capacity-desc', label: 'Capacity (Large to Small)' },
  { value: 'capacity-asc', label: 'Capacity (Small to Large)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'city-asc', label: 'City (A-Z)' },
  { value: 'city-desc', label: 'City (Z-A)' },
] as const;

// Filter interface
interface VenueFilters {
  venueTypes: string[];
  priceRange: string[];
  minRating: number;
  capacityRange: [number, number];
  amenities: string[];
}

// Available filter options
const venueTypeOptions = [
  'hotel',
  'conference_center',
  'meeting_room',
  'event_space',
  'banquet_hall',
  'corporate_venue',
];

const priceRangeOptions = ['$', '$$', '$$$', '$$$$'];

const commonAmenities = [
  'WiFi',
  'Parking',
  'A/V Equipment',
  'Catering',
  'Air Conditioning',
  'Wheelchair Accessible',
  'Kitchen',
  'Bar',
  'Stage',
  'Dance Floor',
  'Outdoor Space',
  'Security',
];

export const VenueSearch = () => {
  const [searchParams, setSearchParams] = useState<VenueSearchParams>({
    zipcode: '',
    attendees: 100,
    radius: 25,
  });
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<VenueFilters>({
    venueTypes: [],
    priceRange: [],
    minRating: 0,
    capacityRange: [0, 1000],
    amenities: [],
  });
  const [searchCity, setSearchCity] = useState<string>();

  // Fetch city name when zipcode changes
  useEffect(() => {
    const fetchCity = async () => {
      if (searchParams.zipcode && searchParams.zipcode.length === 5) {
        const city = await getCityFromZipcode(searchParams.zipcode);
        setSearchCity(city);
      } else {
        setSearchCity(undefined);
      }
    };

    fetchCity();
  }, [searchParams.zipcode]);

  const handleSearch = async () => {
    if (
      !searchParams.zipcode ||
      !searchParams.attendees ||
      !searchParams.radius
    ) {
      setError('Please enter zipcode, number of attendees, and radius');
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const searchWithDate = {
        ...searchParams,
        eventDate: eventDate || undefined,
      };
      const results = await venueService.searchVenues(searchWithDate);
      setVenues(results);
    } catch {
      setError('Failed to search venues. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof VenueSearchParams,
    value: string | number
  ) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleFavorite = (venueId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(venueId)) {
        newFavorites.delete(venueId);
      } else {
        newFavorites.add(venueId);
      }
      return newFavorites;
    });
  };

  const handleShare = async (venue: Venue) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: venue.name,
          text: `Check out ${venue.name} - ${venue.description || 'A great venue for events'}`,
          url: globalThis.location.href,
        });
      } catch {
        // User cancelled or sharing failed
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `${venue.name} - ${venue.address}, ${venue.city}, ${venue.state}`;
      try {
        await navigator.clipboard.writeText(shareText);
        // Successfully copied to clipboard
      } catch {
        // Clipboard operation failed
      }
    }
  };

  // Function to sort venues based on selected criteria
  const sortVenues = (venues: Venue[], sortOption: SortOption): Venue[] => {
    const sorted = [...venues];

    switch (sortOption) {
      case 'name-asc': {
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      }
      case 'name-desc': {
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      }
      case 'rating-desc': {
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }
      case 'rating-asc': {
        return sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      }
      case 'capacity-desc': {
        return sorted.sort((a, b) => b.capacity.max - a.capacity.max);
      }
      case 'capacity-asc': {
        return sorted.sort((a, b) => a.capacity.max - b.capacity.max);
      }
      case 'price-asc': {
        return sorted.sort((a, b) => {
          const priceMap = { $: 1, $$: 2, $$$: 3, $$$$: 4 };
          const aPrice = a.priceRange ? priceMap[a.priceRange] : 0;
          const bPrice = b.priceRange ? priceMap[b.priceRange] : 0;
          return aPrice - bPrice;
        });
      }
      case 'price-desc': {
        return sorted.sort((a, b) => {
          const priceMap = { $: 1, $$: 2, $$$: 3, $$$$: 4 };
          const aPrice = a.priceRange ? priceMap[a.priceRange] : 0;
          const bPrice = b.priceRange ? priceMap[b.priceRange] : 0;
          return bPrice - aPrice;
        });
      }
      case 'city-asc': {
        return sorted.sort((a, b) => a.city.localeCompare(b.city));
      }
      case 'city-desc': {
        return sorted.sort((a, b) => b.city.localeCompare(a.city));
      }
      default: {
        return sorted;
      }
    }
  };

  // Function to filter venues based on selected criteria
  const filterVenues = (venues: Venue[], filters: VenueFilters): Venue[] => {
    return venues.filter((venue) => {
      // Filter by venue type
      if (
        filters.venueTypes.length > 0 &&
        !filters.venueTypes.includes(venue.venueType)
      ) {
        return false;
      }

      // Filter by price range
      if (
        filters.priceRange.length > 0 &&
        venue.priceRange &&
        !filters.priceRange.includes(venue.priceRange)
      ) {
        return false;
      }

      // Filter by minimum rating
      if (
        filters.minRating > 0 &&
        (!venue.rating || venue.rating < filters.minRating)
      ) {
        return false;
      }

      // Filter by capacity range
      const [minCap, maxCap] = filters.capacityRange;
      if (venue.capacity.max < minCap || venue.capacity.min > maxCap) {
        return false;
      }

      // Filter by amenities
      if (filters.amenities.length > 0) {
        const hasRequiredAmenities = filters.amenities.every((amenity) =>
          venue.amenities.some((venueAmenity) =>
            venueAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        );
        if (!hasRequiredAmenities) {
          return false;
        }
      }

      return true;
    });
  };

  // Get filtered and sorted venues using useMemo for performance
  const filteredVenues = useMemo(() => {
    return filterVenues(venues, filters);
  }, [venues, filters]);

  const sortedVenues = useMemo(() => {
    return sortVenues(filteredVenues, sortBy);
  }, [filteredVenues, sortBy]);

  const renderVenueCard = (venue: Venue) => (
    <motion.div
      layout
      layoutId={venue.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        layout: {
          type: 'spring',
          stiffness: 400,
          damping: 25,
          duration: 0.6,
        },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
      key={venue.id}
      style={{ width: '100%' }}
    >
      <Card
        sx={{
          mb: 2,
          height: '100%',
          borderRadius: '16px',
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(124, 58, 237, 0.12)',
            transform: 'translateY(-2px) scale(1.02)',
          },
        }}
      >
        {venue.photos && venue.photos.length > 0 && (
          <Box sx={{ position: 'relative', height: 200 }}>
            <img
              src={venue.photos[0]}
              alt={venue.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                const parentElement = e.currentTarget.parentElement;
                if (parentElement) {
                  parentElement.style.display = 'none';
                }
              }}
            />
            {venue.rating && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  borderRadius: 1,
                  padding: '4px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Rating
                  value={venue.rating}
                  readOnly
                  size="small"
                  sx={{ color: 'white' }}
                />
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {venue.rating}
                </Typography>
              </Box>
            )}
          </Box>
        )}
        <CardContent sx={{ pb: 8 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            {venue.name}
          </Typography>

          {!venue.photos?.length && venue.rating && (
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}
            >
              <Rating value={venue.rating} readOnly size="small" />
              <Typography variant="body2" color="text.secondary">
                {venue.rating}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <LocationIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {venue.address}, {venue.city}, {venue.state}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <PeopleIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Capacity: {venue.capacity.min} - {venue.capacity.max} people
            </Typography>
          </Box>

          {venue.priceRange && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <MoneyIcon color="action" fontSize="small" />
              <Typography
                variant="body2"
                sx={{
                  color: 'secondary.main',
                }}
              >
                {venue.priceRange}
              </Typography>
            </Box>
          )}

          {venue.description && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              {venue.description}
            </Typography>
          )}

          {venue.amenities.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Amenities:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {venue.amenities.map((amenity) => (
                  <Chip
                    key={amenity}
                    label={amenity}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: '#14b8a6',
                      color: '#14b8a6',
                      '&:hover': {
                        backgroundColor: 'rgba(20, 184, 166, 0.08)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {venue.contact.phone && (
              <Button
                size="small"
                startIcon={<PhoneIcon />}
                href={`tel:${venue.contact.phone}`}
              >
                Call
              </Button>
            )}
            {venue.contact.email && (
              <Button
                size="small"
                startIcon={<EmailIcon />}
                href={`mailto:${venue.contact.email}`}
              >
                Email
              </Button>
            )}
            {venue.contact.website && (
              <Button
                size="small"
                startIcon={<WebsiteIcon />}
                href={venue.contact.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </Button>
            )}
          </Box>

          {venue.availability && !venue.availability.available && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Not available. Next available:{' '}
              {venue.availability.nextAvailableDate}
            </Alert>
          )}
        </CardContent>

        {/* Floating Action Buttons */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 14,
            right: 18,
            display: 'flex',
            gap: 1,
            zIndex: 2,
          }}
        >
          <Button
            size="small"
            variant="outlined"
            sx={{
              minWidth: 'auto',
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: 'rgba(158, 158, 158, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(158, 158, 158, 0.2)',
                transform: 'scale(1.05)',
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleShare(venue);
            }}
          >
            <ShareIcon fontSize="small" />
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              minWidth: 'auto',
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: favorites.has(venue.id)
                ? 'rgba(244, 67, 54, 0.1)'
                : 'rgba(158, 158, 158, 0.1)',
              color: favorites.has(venue.id) ? 'error.main' : 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.2)',
                transform: 'scale(1.05)',
                color: 'error.main',
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite(venue.id);
            }}
          >
            {favorites.has(venue.id) ? (
              <FavoriteIcon fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </Button>
        </Box>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
        Find Event Venues
      </Typography>

      {/* Search Form */}
      <Card sx={{ mb: 3, borderRadius: '16px' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <TextField
                label="Zipcode"
                value={searchParams.zipcode}
                onChange={(e) => handleInputChange('zipcode', e.target.value)}
                placeholder="20001"
                required
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <TextField
                label="Radius (miles)"
                type="number"
                value={searchParams.radius}
                onChange={(e) =>
                  handleInputChange('radius', Number(e.target.value))
                }
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 2.5 }}>
              <TextField
                label="Number of Attendees"
                type="number"
                value={searchParams.attendees}
                onChange={(e) =>
                  handleInputChange('attendees', Number(e.target.value))
                }
                required
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Event Date"
                  value={eventDate}
                  onChange={(newValue: Date | null) => setEventDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      placeholder: 'Select date',
                    },
                    shortcuts: {
                      items: getDateShortcuts(),
                    },
                    desktopPaper: {
                      sx: {
                        '& .MuiPickersShortcuts-root': {
                          borderLeft: '1px solid',
                          borderColor: 'divider',
                          marginLeft: 1,
                          paddingLeft: 2,
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                fullWidth
                sx={{ height: 56 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Search Venues'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Filters */}
      {venues.length > 0 && (
        <Card sx={{ mb: 3, borderRadius: '16px' }}>
          <CardContent>
            {/* <Typography variant="h6" sx={{ mb: 3 }}>
              Filters ({filteredVenues.length} of {venues.length} venues)
            </Typography> */}
            <Grid container spacing={3}>
              {/* First Row */}
              {/* Price Range Filter */}
              <Grid size={{ xs: 12, md: 4, lg: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Price Range</InputLabel>
                  <Select
                    multiple
                    value={filters.priceRange}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange:
                          typeof e.target.value === 'string'
                            ? [e.target.value]
                            : e.target.value,
                      }))
                    }
                    input={<OutlinedInput label="Price Range" />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {priceRangeOptions.map((price) => (
                      <MenuItem key={price} value={price}>
                        <Checkbox
                          checked={filters.priceRange.includes(price)}
                        />
                        <ListItemText primary={price} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Venue Type Filter */}
              <Grid size={{ xs: 12, md: 8, lg: 4 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Venue Types</InputLabel>
                  <Select
                    multiple
                    value={filters.venueTypes}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        venueTypes:
                          typeof e.target.value === 'string'
                            ? [e.target.value]
                            : e.target.value,
                      }))
                    }
                    input={<OutlinedInput label="Venue Types" />}
                    renderValue={(selected) =>
                      selected
                        .map((type) =>
                          type
                            .replace('_', ' ')
                            .replaceAll(/\b\w/g, (l) => l.toUpperCase())
                        )
                        .join(', ')
                    }
                  >
                    {venueTypeOptions.map((type) => (
                      <MenuItem key={type} value={type}>
                        <Checkbox checked={filters.venueTypes.includes(type)} />
                        <ListItemText
                          primary={type
                            .replace('_', ' ')
                            .replaceAll(/\b\w/g, (l) => l.toUpperCase())}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Amenities Filter */}
              <Grid size={{ xs: 12, md: 12, lg: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Required Amenities</InputLabel>
                  <Select
                    multiple
                    value={filters.amenities}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        amenities:
                          typeof e.target.value === 'string'
                            ? [e.target.value]
                            : e.target.value,
                      }))
                    }
                    input={<OutlinedInput label="Required Amenities" />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {commonAmenities.map((amenity) => (
                      <MenuItem key={amenity} value={amenity}>
                        <Checkbox
                          checked={filters.amenities.includes(amenity)}
                        />
                        <ListItemText primary={amenity} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Second Row */}
              {/* Rating Filter */}
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Box sx={{ ml: 2 }}>
                  <Typography gutterBottom>
                    Minimum Rating:{' '}
                    {filters.minRating > 0 ? filters.minRating : 'Any'}
                  </Typography>
                  <Slider
                    value={filters.minRating}
                    onChange={(_, newValue) =>
                      setFilters((prev) => ({
                        ...prev,
                        minRating:
                          typeof newValue === 'number' ? newValue : newValue[0],
                      }))
                    }
                    min={0}
                    max={5}
                    step={0.5}
                    marks={[
                      { value: 0, label: 'Any' },
                      { value: 2.5, label: '2.5+' },
                      { value: 5, label: '5' },
                    ]}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </Grid>

              {/* Capacity Range Filter */}
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Box sx={{ ml: 2 }}>
                  <Typography gutterBottom>
                    Capacity: {filters.capacityRange[0]} -{' '}
                    {filters.capacityRange[1]} people
                  </Typography>
                  <Slider
                    value={filters.capacityRange}
                    onChange={(_, newValue) =>
                      setFilters((prev) => ({
                        ...prev,
                        capacityRange: newValue as [number, number],
                      }))
                    }
                    min={0}
                    max={1000}
                    step={25}
                    marks={[
                      { value: 0, label: '0' },
                      { value: 500, label: '500' },
                      { value: 1000, label: '1000+' },
                    ]}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </Grid>

              {/* Clear Filters Button */}
              <Grid size={{ xs: 12, md: 12, lg: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    height: '100%',
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setFilters({
                        venueTypes: [],
                        priceRange: [],
                        minRating: 0,
                        capacityRange: [0, 1000],
                        amenities: [],
                      })
                    }
                    disabled={
                      filters.venueTypes.length === 0 &&
                      filters.priceRange.length === 0 &&
                      filters.minRating === 0 &&
                      filters.capacityRange[0] === 0 &&
                      filters.capacityRange[1] === 1000 &&
                      filters.amenities.length === 0
                    }
                    sx={{ height: 56, width: 231 }}
                  >
                    Clear Filters
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Interactive Map */}
      {sortedVenues.length > 0 && (
        <VenueMap
          venues={sortedVenues}
          searchZipcode={searchParams.zipcode}
          searchCity={searchCity}
        />
      )}

      {/* Sort Controls and Results Count */}
      {sortedVenues.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h5">
            Found {filteredVenues.length} venues
            {filteredVenues.length !== venues.length && (
              <Typography
                component="span"
                variant="body1"
                color="text.secondary"
              >
                {' '}
                (filtered from {venues.length} total)
              </Typography>
            )}
          </Typography>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              label="Sort by"
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Results */}
      {sortedVenues.length > 0 && (
        <Box>
          <AnimatePresence mode="wait">
            <motion.div
              key="venue-grid"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Grid container spacing={2}>
                {sortedVenues.map((venue) => (
                  <Grid size={{ xs: 12, md: 6, lg: 4 }} key={venue.id}>
                    {renderVenueCard(venue)}
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>
        </Box>
      )}

      {/* No Results */}
      {!loading &&
        sortedVenues.length === 0 &&
        hasSearched &&
        searchParams.zipcode && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              {venues.length === 0 ? (
                <>
                  No venues found for {searchParams.attendees} attendees in{' '}
                  {searchParams.zipcode}. Try adjusting your search criteria.
                </>
              ) : (
                <>
                  No venues match your current filters. Try adjusting your
                  filter criteria or clearing some filters.
                </>
              )}
            </Alert>

            {/* "No Results" Image */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                mt: 2,
              }}
            >
              <img
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGpsajF6cHAxd21nOTA1NzRtdGF5bTdzMjdvOWk4dzN6MWgwaDJqOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pPOR2prgwlCyOAlxgH/giphy.gif"
                alt="No results found - Pudgy looking around"
                style={{
                  maxWidth: '300px',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
                onError={(e) => {
                  // Fallback to a data URI SVG if GIF fails to load
                  // Shows a shrug emoji (🤷‍♂️) and "No Results Found" text
                  e.currentTarget.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iOTAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+krz7vv40KICA8dGV4dCB4PSIxNTAiIHk9IjEyMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBSZXN1bHRzIEZvdW5kPC90ZXh0Pgo8L3N2Zz4K';
                  e.currentTarget.alt = 'No results found';
                }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, fontStyle: 'italic' }}
              >
                {venues.length === 0
                  ? 'When the perfect venue is nowhere to be found...'
                  : 'When your filters are too picky...'}
              </Typography>
            </Box>
          </Box>
        )}
    </Box>
  );
};

export default VenueSearch;

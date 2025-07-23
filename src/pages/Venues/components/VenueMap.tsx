import { useEffect, useRef, useState, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ScaleControl,
  useMap,
} from 'react-leaflet';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Rating,
  Chip,
  useTheme,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Autocomplete,
  TextField,
  InputAdornment,
  Divider,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Fullscreen,
  FullscreenExit,
  MyLocation,
  Satellite,
  Map as MapIcon,
  CenterFocusStrong,
  Search,
  LocationOn,
  Business,
  Place,
} from '@mui/icons-material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Note: Enhanced controls will be implemented with basic Leaflet API for better compatibility
import type { Venue } from '../services/venueService';
import { useSidebar } from '../../../hooks/useSidebar'; // Fix for default markers in react-leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface VenueMapProps {
  venues: Venue[];
  searchZipcode?: string;
  searchCity?: string;
}

// Search result types
interface SearchResult {
  id: string;
  name: string;
  type: 'address' | 'venue' | 'landmark';
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description?: string;
  photos?: string[];
}

// Nominatim API response type
interface NominatimResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
}

// Component for adding enhanced map controls
const MapControls = ({ onMapReady }: { onMapReady: (map: L.Map) => void }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Notify parent component that map is ready
    onMapReady(map);

    // Add location found/error handlers
    map.on('locationfound', (e) => {
      L.marker([e.latlng.lat, e.latlng.lng])
        .addTo(map)
        .bindPopup('You are here!')
        .openPopup();
    });

    map.on('locationerror', () => {
      alert('Location access denied or unavailable');
    });

    return () => {
      map.off('locationfound');
      map.off('locationerror');
    };
  }, [map, onMapReady]);

  return null;
};

export const VenueMap = ({
  venues,
  searchZipcode,
  searchCity,
}: VenueMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const theme = useTheme();
  const { isMini } = useSidebar();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapLayer, setMapLayer] = useState<'street' | 'satellite'>('street');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchMarker, setSearchMarker] = useState<L.Marker | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Clean up search marker when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      if (searchMarker && mapRef.current) {
        try {
          mapRef.current.removeLayer(searchMarker);
        } catch {
          // Ignore errors if map is already destroyed
        }
      }
    };
  }, [searchMarker]); // Only depend on searchMarker, not venues

  // Create a stable key for the map - only change on major updates
  // Use a simple count-based key to avoid frequent re-mounting
  const mapKey = `map-${venues.length > 0 ? 'has-venues' : 'no-venues'}`;

  // Reset map ready state when map key changes (map is re-mounting)
  useEffect(() => {
    setIsMapReady(false);
  }, [mapKey]);

  // Calculate map center and bounds using useMemo to prevent recalculation
  const mapBounds = useMemo(() => {
    if (venues.length === 0) return null;

    try {
      const bounds = L.latLngBounds(
        venues.map((venue) => [venue.coordinates.lat, venue.coordinates.lng])
      );

      // Add some padding to the bounds
      return bounds.pad(0.1);
    } catch {
      // If bounds calculation fails, return null
      return null;
    }
  }, [venues]);

  const defaultCenter: [number, number] = useMemo(() => {
    return mapBounds
      ? [mapBounds.getCenter().lat, mapBounds.getCenter().lng]
      : [38.9072, -77.0369]; // Default to Washington DC area
  }, [mapBounds]);

  // Choose tile layer based on theme and selected layer
  const isDarkMode = theme.palette.mode === 'dark';

  const tileLayerProps = useMemo(() => {
    if (mapLayer === 'satellite') {
      return {
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      };
    }

    // Street map with dark/light variants
    return isDarkMode
      ? {
          attribution:
            '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
          url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
        }
      : {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        };
  }, [mapLayer, isDarkMode]);

  useEffect(() => {
    if (mapRef.current && mapBounds && isMapReady) {
      // Fit bounds with some padding and ensure minimum zoom level
      mapRef.current.fitBounds(mapBounds, {
        padding: [20, 20], // Add padding around the bounds
        maxZoom: 15, // Don't zoom in too much for single venues
      });
    }
  }, [mapBounds, isMapReady]); // Depend on both mapBounds and isMapReady

  // Handle sidebar state changes - resize and recenter map
  useEffect(() => {
    if (mapRef.current && isMapReady) {
      // Small delay to allow layout changes to complete
      const timeoutId = setTimeout(() => {
        if (mapRef.current) {
          // Trigger map resize to handle container size changes
          mapRef.current.invalidateSize();

          // Recenter the map if we have venues
          if (mapBounds) {
            mapRef.current.fitBounds(mapBounds, {
              padding: [20, 20],
              maxZoom: 15,
            });
          }
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isMini, mapBounds, isMapReady]); // Listen to sidebar state changes

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleCenterOnVenues = () => {
    if (mapRef.current && mapBounds && isMapReady) {
      mapRef.current.fitBounds(mapBounds, {
        padding: [20, 20],
        maxZoom: 15,
      });
    }
  };

  // Search functionality
  const searchAddresses = async (query: string): Promise<SearchResult[]> => {
    if (!query.trim()) return [];

    try {
      // Use Nominatim (free) as primary provider with proper headers
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&countrycodes=us&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'WIFT-Web-App/1.0',
          },
        }
      );

      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error(
          `Nominatim API error: ${response.status} ${response.statusText}`
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: NominatimResult[] = await response.json();
      // eslint-disable-next-line no-console
      console.log(`Nominatim search for "${query}":`, data);

      return data.map((item: NominatimResult) => ({
        id: `address-${item.place_id}`, // Prefix to ensure uniqueness
        name: item.display_name.split(',')[0],
        type: 'address' as const,
        address: item.display_name,
        coordinates: {
          lat: Number.parseFloat(item.lat),
          lng: Number.parseFloat(item.lon),
        },
        description: item.type,
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Address search failed:', error);
      return [];
    }
  };

  const searchVenues = async (query: string): Promise<SearchResult[]> => {
    // Search in current venues
    const filteredVenues = venues
      .filter(
        (venue) =>
          venue.name.toLowerCase().includes(query.toLowerCase()) ||
          venue.address.toLowerCase().includes(query.toLowerCase()) ||
          venue.city.toLowerCase().includes(query.toLowerCase())
      )
      .map((venue) => ({
        id: `venue-${venue.id}`, // Prefix to ensure uniqueness
        name: venue.name,
        type: 'venue' as const,
        address: `${venue.address}, ${venue.city}, ${venue.state}`,
        coordinates: venue.coordinates,
        description: `${venue.venueType} • Capacity: ${venue.capacity.min}-${venue.capacity.max}`,
        photos: venue.photos,
      }));

    return filteredVenues;
  };

  const performSearch = async (query: string): Promise<SearchResult[]> => {
    if (!query.trim()) return [];

    try {
      // Always search venues first (local, fast)
      const venueResults = await searchVenues(query);

      // Try address search, but don't fail if it doesn't work
      let addressResults: SearchResult[] = [];
      try {
        addressResults = await searchAddresses(query);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Address search unavailable:', error);
        // Continue with venue results only
      }

      // Combine and prioritize venue results
      const combinedResults = [...venueResults, ...addressResults];
      return combinedResults.slice(0, 8); // Limit results
    } catch {
      return [];
    }
  };

  const handleSearchSelect = (result: SearchResult | null) => {
    if (!result || !mapRef.current || !isMapReady) return;

    // Remove previous search marker
    if (searchMarker) {
      mapRef.current.removeLayer(searchMarker);
    }

    // Center map on selected result
    mapRef.current.setView(
      [result.coordinates.lat, result.coordinates.lng],
      15
    );

    // Add new search marker
    const marker = L.marker([result.coordinates.lat, result.coordinates.lng], {
      icon: L.divIcon({
        className: 'search-marker',
        html: '<div style="background: #ff4444; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2-2-.9-2-2zM5 20v2h14v-2H5z"/></svg></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      }),
    })
      .addTo(mapRef.current)
      .bindPopup(
        `
        <div>
          <strong>${result.name}</strong><br/>
          ${result.description ? `<em>${result.description}</em><br/>` : ''}
          ${result.address}
        </div>
      `
      )
      .openPopup();

    setSearchMarker(marker);
  };

  const renderMapToolbar = () => (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 1,
        padding: 1,
        boxShadow: 1,
      }}
    >
      {/* Search Control */}
      <Autocomplete
        size="small"
        options={searchResults}
        loading={searchLoading}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.id}>
            {option.type === 'venue' &&
            option.photos &&
            option.photos.length > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  width: '100%',
                }}
              >
                <img
                  src={option.photos[0]}
                  alt={option.name}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: 'cover',
                    borderRadius: 4,
                    flexShrink: 0,
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <ListItemText
                  primary={option.name}
                  secondary={option.description || option.address}
                  sx={{ flex: 1 }}
                />
              </Box>
            ) : (
              <>
                <ListItemIcon>
                  {option.type === 'venue' ? (
                    <Business fontSize="small" />
                  ) : option.type === 'landmark' ? (
                    <Place fontSize="small" />
                  ) : (
                    <LocationOn fontSize="small" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={option.name}
                  secondary={option.description || option.address}
                />
              </>
            )}
          </Box>
        )}
        onChange={(_, value) => handleSearchSelect(value)}
        onInputChange={async (_, value) => {
          // eslint-disable-next-line no-console
          console.log('Search input changed:', value);
          if (value && value.length > 2) {
            setSearchLoading(true);
            try {
              // Add small delay to avoid API rate limiting
              await new Promise((resolve) => setTimeout(resolve, 300));
              // eslint-disable-next-line no-console
              console.log('Performing search for:', value);
              const results = await performSearch(value);
              // eslint-disable-next-line no-console
              console.log('Search results:', results);
              setSearchResults(results);
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error('Search error:', error);
              setSearchResults([]);
            } finally {
              setSearchLoading(false);
            }
          } else {
            setSearchResults([]);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search venues, addresses..."
            sx={{ minWidth: 309 }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        )}
        noOptionsText="Type to search venues and addresses"
        loadingText="Searching..."
      />

      <Divider orientation="vertical" flexItem />

      {/* Layer Toggle */}
      <ToggleButtonGroup
        value={mapLayer}
        exclusive
        onChange={(_, newLayer) => newLayer && setMapLayer(newLayer)}
        size="small"
      >
        <ToggleButton value="street">
          <Tooltip title="Street Map">
            <MapIcon fontSize="small" />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="satellite">
          <Tooltip title="Satellite View">
            <Satellite fontSize="small" />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>

      {/* My Location - handled by leaflet control */}
      <Tooltip title="Find my location">
        <IconButton
          size="small"
          onClick={() => {
            if (mapRef.current && isMapReady) {
              mapRef.current.locate({ setView: true, maxZoom: 16 });
            }
          }}
        >
          <MyLocation fontSize="small" />
        </IconButton>
      </Tooltip>

      {/* Center on Venues */}
      <Tooltip title="Center on venues">
        <IconButton size="small" onClick={handleCenterOnVenues}>
          <CenterFocusStrong fontSize="small" />
        </IconButton>
      </Tooltip>

      {/* Fullscreen toggle */}
      {isFullscreen ? (
        <Tooltip title="Exit fullscreen">
          <IconButton size="small" onClick={() => setIsFullscreen(false)}>
            <FullscreenExit fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="View fullscreen">
          <IconButton size="small" onClick={handleFullscreenToggle}>
            <Fullscreen fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );

  const renderMap = (height: string | number = 400) => (
    <Box
      sx={{
        height,
        width: '100%',
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <MapContainer
        key={mapKey} // Force re-render when venues change significantly
        center={defaultCenter}
        zoom={mapBounds ? undefined : 10} // Only use default zoom if no bounds
        bounds={mapBounds || undefined} // Use bounds if available
        boundsOptions={{
          padding: [20, 20], // Add padding around the bounds
          maxZoom: 15, // Don't zoom in too much
        }}
        style={{ height: '100%', width: '100%' }}
        ref={(mapInstance) => {
          if (mapInstance) {
            mapRef.current = mapInstance;
          }
        }}
      >
        <TileLayer
          attribution={tileLayerProps.attribution}
          url={tileLayerProps.url}
          key={mapLayer} // Force re-render when layer changes
        />

        {/* Add enhanced controls */}
        <MapControls
          onMapReady={(map) => {
            mapRef.current = map;
            setIsMapReady(true);
          }}
        />

        {/* Add scale control */}
        <ScaleControl position="bottomleft" />

        {isMapReady &&
          venues
            .filter((venue) => {
              // Filter out venues with invalid coordinates
              return (
                venue.coordinates &&
                typeof venue.coordinates.lat === 'number' &&
                typeof venue.coordinates.lng === 'number' &&
                !Number.isNaN(venue.coordinates.lat) &&
                !Number.isNaN(venue.coordinates.lng)
              );
            })
            .map((venue) => (
              <Marker
                key={`${venue.id}-${venue.coordinates.lat}-${venue.coordinates.lng}`}
                position={[venue.coordinates.lat, venue.coordinates.lng]}
              >
                <Popup maxWidth={300}>
                  <Box sx={{ minWidth: 250 }}>
                    {venue.photos && venue.photos.length > 0 && (
                      <Box sx={{ mb: 1 }}>
                        <img
                          src={venue.photos[0]}
                          alt={venue.name}
                          style={{
                            width: '100%',
                            height: 150,
                            objectFit: 'cover',
                            borderRadius: 4,
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </Box>
                    )}
                    <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                      {venue.name}
                    </Typography>

                    {venue.rating && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          mb: 1,
                        }}
                      >
                        <Rating value={venue.rating} readOnly size="small" />
                        <Typography variant="body2">{venue.rating}</Typography>
                      </Box>
                    )}

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {venue.address}, {venue.city}, {venue.state}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Capacity:</strong> {venue.capacity.min} -{' '}
                      {venue.capacity.max} people
                    </Typography>

                    {venue.priceRange && (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Price:</strong> {venue.priceRange}
                      </Typography>
                    )}

                    {venue.amenities.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Amenities:</strong>
                        </Typography>
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                          {venue.amenities.slice(0, 3).map((amenity) => (
                            <Chip
                              key={amenity}
                              label={amenity}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                          {venue.amenities.length > 3 && (
                            <Typography variant="body2" color="text.secondary">
                              +{venue.amenities.length - 3} more
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Popup>
              </Marker>
            ))}
      </MapContainer>
    </Box>
  );

  if (venues.length === 0) {
    return null;
  }

  return (
    <>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6" component="div">
              Venue Locations {searchZipcode && `near ${searchZipcode}`}
              {searchCity && (
                <Typography
                  component="span"
                  variant="body2"
                  color="#14b8a6"
                  sx={{ fontWeight: 'normal' }}
                >
                  {` (${searchCity})`}
                </Typography>
              )}
            </Typography>
            {renderMapToolbar()}
          </Box>
          {renderMap(400)}
        </CardContent>
      </Card>

      {/* Fullscreen Dialog */}
      <Dialog
        open={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        maxWidth={false}
        fullScreen
        PaperProps={{
          sx: {
            margin: 0,
            maxHeight: '100vh',
            maxWidth: '100vw',
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" component="div">
              Venue Locations {searchZipcode && `near ${searchZipcode}`}
              {searchCity && (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 'normal' }}
                >
                  {` (${searchCity})`}
                </Typography>
              )}
            </Typography>
            {renderMapToolbar()}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0, flex: 1 }}>
          {renderMap('100%')}
        </DialogContent>
      </Dialog>
    </>
  );
};

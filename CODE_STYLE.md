# Code Style Guide

This document outlines the coding standards and patterns used throughout the WIFT application.

## Overview

WIFT follows modern JavaScript/TypeScript best practices with strict ESLint and Prettier configuration. The codebase emphasizes consistency, type safety, and maintainability.

## Function Declarations

### Arrow Functions (Preferred)

**Components**: Use arrow function expressions with const declarations
```typescript
// ✅ Preferred - Arrow function component
export const VenueMap = ({
  venues,
  searchZipcode,
  searchCity,
}: VenueMapProps) => {
  // Component logic
  return <div>...</div>;
};

// ✅ Preferred - Internal component
const MapControls = ({ onMapReady }: { onMapReady: (map: L.Map) => void }) => {
  // Component logic
  return null;
};
```

**Handlers and Utilities**: Use arrow functions for event handlers and utility functions
```typescript
// ✅ Preferred - Event handlers
const handleFullscreenToggle = () => {
  setIsFullscreen(!isFullscreen);
};

const handleSearchSelect = (result: SearchResult | null) => {
  if (!result || !mapRef.current || !isMapReady) return;
  // Handler logic
};

// ✅ Preferred - Async functions
const searchAddresses = async (query: string): Promise<SearchResult[]> => {
  // Async logic
  return results;
};
```

**Function Expressions**: Always end with semicolon
```typescript
// ✅ Correct - Semicolon required
const MyComponent = () => {
  return <div>Content</div>;
};

// ❌ Incorrect - Missing semicolon
const MyComponent = () => {
  return <div>Content</div>;
}
```

### When to Use Function Declarations

**React Components with Hoisting Requirements**: Rare cases where hoisting is needed
```typescript
// ⚠️ Only when hoisting is required
function MyComponent() {
  return <div>...</div>;
}
```

**Recursive Functions**: When function needs to reference itself
```typescript
// ⚠️ Only for recursion
function processNestedData(data: any): any {
  if (Array.isArray(data)) {
    return data.map(processNestedData);
  }
  return data;
}
```

## TypeScript Patterns

### Interface Definitions
```typescript
// ✅ Proper interface definition
interface VenueMapProps {
  venues: Venue[];
  searchZipcode?: string;
  searchCity?: string;
}

// ✅ API response types
interface ZippopotamResponse {
  'post code': string;
  country: string;
  'country abbreviation': string;
  places: ZippopotamPlace[];
}
```

### Type Assertions and Guards
```typescript
// ✅ Proper type assertion
const data = await response.json() as ZippopotamResponse;

// ✅ Type guard usage
if (typeof venue.coordinates.lat === 'number' && 
    typeof venue.coordinates.lng === 'number' &&
    !Number.isNaN(venue.coordinates.lat) &&
    !Number.isNaN(venue.coordinates.lng)) {
  // Type-safe coordinate usage
}
```

### Optional Parameters and Props
```typescript
// ✅ Optional props with proper defaults
const getCityFromZipcode = async (
  zipcode: string
): Promise<string | undefined> => {
  if (!zipcode || zipcode.length !== 5) {
    return undefined;
  }
  // Function logic
};
```

## React Patterns

### Component Structure
```typescript
// ✅ Proper component structure
export const MyComponent = ({ prop1, prop2 }: MyComponentProps) => {
  // 1. Hooks at the top
  const [state, setState] = useState<StateType>(initialValue);
  const theme = useTheme();
  
  // 2. Computed values
  const computedValue = useMemo(() => {
    return expensiveCalculation(prop1);
  }, [prop1]);
  
  // 3. Event handlers
  const handleClick = () => {
    setState(newValue);
  };
  
  // 4. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 5. Early returns
  if (loading) {
    return <LoadingSpinner />;
  }
  
  // 6. Main render
  return (
    <Box>
      {/* Component JSX */}
    </Box>
  );
};
```

### State Management
```typescript
// ✅ Proper state typing
const [venues, setVenues] = useState<Venue[]>([]);
const [searchCity, setSearchCity] = useState<string>();
const [loading, setLoading] = useState(false);

// ✅ State updates with proper typing
const updateSearchParams = (newParams: Partial<VenueSearchParams>) => {
  setSearchParams(prev => ({ ...prev, ...newParams }));
};
```

### Effect Patterns
```typescript
// ✅ Proper effect with cleanup
useEffect(() => {
  const fetchCity = async () => {
    if (zipcode && zipcode.length === 5) {
      const city = await getCityFromZipcode(zipcode);
      setSearchCity(city);
    } else {
      setSearchCity(undefined);
    }
  };

  fetchCity();
}, [zipcode]);

// ✅ Effect with cleanup function
useEffect(() => {
  return () => {
    if (searchMarker && mapRef.current) {
      try {
        mapRef.current.removeLayer(searchMarker);
      } catch {
        // Ignore cleanup errors
      }
    }
  };
}, [searchMarker]);
```

## Error Handling

### API Error Handling
```typescript
// ✅ Proper error handling with fallbacks
const fetchData = async () => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.warn(`API error: ${response.status} for ${url}`);
      return fallbackValue;
    }

    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to fetch data:`, error);
    return fallbackValue;
  }
};
```

### Component Error Boundaries
```typescript
// ✅ Safe component rendering
const renderSafeComponent = () => {
  try {
    return <ComplexComponent data={data} />;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Component render error:', error);
    return <ErrorFallback />;
  }
};
```

## Material-UI Patterns

### Component Styling
```typescript
// ✅ Proper MUI component usage
<Typography 
  variant="h6" 
  component="div"
  sx={{ 
    mb: 2,
    fontWeight: 'normal' 
  }}
>
  {title}
  {subtitle && (
    <Typography
      component="span"
      variant="body2"
      color="text.secondary"
      sx={{ fontWeight: 'normal' }}
    >
      {` (${subtitle})`}
    </Typography>
  )}
</Typography>
```

### Theme Integration
```typescript
// ✅ Proper theme usage
const theme = useTheme();
const isDarkMode = theme.palette.mode === 'dark';

// ✅ Theme-aware styling
sx={{
  backgroundColor: 'background.paper',
  color: 'text.primary',
  borderColor: 'divider',
}}
```

## Import/Export Patterns

### Import Organization
```typescript
// 1. React and core libraries
import { useEffect, useRef, useState, useMemo } from 'react';

// 2. Third-party libraries
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import {
  Box,
  Typography,
  Card,
} from '@mui/material';

// 3. Local imports
import type { Venue } from '../services/venueService';
import { useSidebar } from '../../../hooks/useSidebar';
```

### Export Patterns
```typescript
// ✅ Named exports for components
export const VenueMap = () => { ... };

// ✅ Default export when single main export
export default VenueSearch;

// ✅ Type-only exports
export type { VenueMapProps, SearchResult };
```

## Performance Patterns

### Memoization
```typescript
// ✅ Proper useMemo usage
const mapBounds = useMemo(() => {
  if (venues.length === 0) return null;
  
  try {
    const bounds = L.latLngBounds(
      venues.map((venue) => [venue.coordinates.lat, venue.coordinates.lng])
    );
    return bounds.pad(0.1);
  } catch {
    return null;
  }
}, [venues]);

// ✅ Expensive calculations only
const sortedAndFilteredVenues = useMemo(() => {
  return filterVenues(venues, filters)
    .sort(getSortFunction(sortBy));
}, [venues, filters, sortBy]);
```

### Callback Optimization
```typescript
// ✅ Stable callback references
const handleSearchSelect = useCallback((result: SearchResult | null) => {
  if (!result || !mapRef.current || !isMapReady) return;
  // Handler logic
}, [isMapReady]);
```

## ESLint Configuration

### Enabled Rules
- **@typescript-eslint/explicit-function-return-type**: Enforce return types
- **prefer-arrow-callback**: Prefer arrow functions for callbacks
- **func-style**: Enforce arrow function expressions
- **no-console**: Prevent console.log (use eslint-disable-next-line when needed)
- **unicorn/**: Modern JavaScript patterns and best practices

### Console Usage
```typescript
// ✅ Proper console usage with disable comment
// eslint-disable-next-line no-console
console.warn(`API error: ${response.status}`);

// ✅ Development-only logging
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.log('Debug info:', data);
}
```

## File Organization

### Component Files
```
ComponentName.tsx
├── Imports (React, libraries, local)
├── Type definitions and interfaces
├── Constants and utilities
├── Main component export
└── Default export (if applicable)
```

### Service Files
```
serviceName.ts
├── Type definitions
├── Constants and configuration
├── Utility functions
├── Main service functions
└── Named exports
```

## Testing Patterns

### Component Testing
```typescript
// ✅ Proper test structure
describe('VenueMap', () => {
  const defaultProps: VenueMapProps = {
    venues: mockVenues,
    searchZipcode: '20001',
    searchCity: 'Washington, DC',
  };

  it('renders venue markers correctly', () => {
    render(<VenueMap {...defaultProps} />);
    expect(screen.getByText('Venue Name')).toBeInTheDocument();
  });
});
```

This style guide ensures consistency across the WIFT codebase and promotes maintainable, type-safe code following modern React and TypeScript best practices.

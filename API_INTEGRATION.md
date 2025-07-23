# API Integration Guide

This document outlines the external APIs integrated into the WIFT application and their usage patterns.

## Overview

WIFT integrates with several external APIs to provide real-time location services and enhanced venue search capabilities:

- **Zippopotam.us** - ZIP code to city/state resolution
- **Nominatim OpenStreetMap** - Address geocoding and search
- **AWS Cognito** - User authentication and management

## Location Services APIs

### Zippopotam.us API

**Purpose**: Real-time ZIP code to city/state name resolution

**Integration**: `src/pages/Venues/components/VenueSearch.tsx`

**Usage**:
```typescript
const getCityFromZipcode = async (zipcode: string): Promise<string | undefined> => {
  const response = await fetch(`https://api.zippopotam.us/us/${zipcode}`);
  const data: ZippopotamResponse = await response.json();
  
  if (data.places && data.places.length > 0) {
    const place = data.places[0];
    return `${place['place name']}, ${place['state abbreviation']}`;
  }
  
  return undefined;
};
```

**Features**:
- ✅ **Free Service** - No API key required
- ✅ **Comprehensive Coverage** - All US ZIP codes
- ✅ **Reliable Data** - Official postal service information
- ✅ **Fast Response** - Low latency for real-time UI updates
- ✅ **Error Handling** - Graceful fallbacks when unavailable

**API Response Format**:
```json
{
  "post code": "20001",
  "country": "United States",
  "country abbreviation": "US",
  "places": [
    {
      "place name": "Washington",
      "state": "District of Columbia",
      "state abbreviation": "DC"
    }
  ]
}
```

**Rate Limiting**: No documented limits, but requests are debounced to 300ms

**Error Handling**:
- Network failures: Return `undefined`, UI continues without city names
- Invalid ZIP codes: Return `undefined`, no error thrown to user
- API unavailable: Console warning logged, graceful degradation

### Nominatim OpenStreetMap API

**Purpose**: Address geocoding and venue/location search

**Integration**: `src/pages/Venues/components/VenueMap.tsx`

**Usage**:
```typescript
const searchAddresses = async (query: string): Promise<SearchResult[]> => {
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
  
  const data: NominatimResult[] = await response.json();
  return data.map((item) => ({
    id: `address-${item.place_id}`,
    name: item.display_name.split(',')[0],
    type: 'address' as const,
    address: item.display_name,
    coordinates: {
      lat: Number.parseFloat(item.lat),
      lng: Number.parseFloat(item.lon),
    },
    description: item.type,
  }));
};
```

**Features**:
- ✅ **Free Service** - OpenStreetMap data, no API key required
- ✅ **Global Coverage** - Worldwide address database
- ✅ **Real-time Search** - As-you-type address suggestions
- ✅ **Detailed Results** - Full address breakdowns with coordinates
- ✅ **User-Agent Required** - Proper attribution headers

**Parameters**:
- `format=json` - JSON response format
- `q=<query>` - Search query (URL encoded)
- `limit=5` - Maximum results returned
- `countrycodes=us` - Restrict to US addresses
- `addressdetails=1` - Include detailed address components

**Rate Limiting**: 
- 1 request per second per IP
- Application uses 300ms debouncing to respect limits
- User-Agent header required for identification

**Error Handling**:
- Network failures: Return empty array, search continues with venue-only results
- Invalid queries: Return empty array, no user-facing errors
- Rate limiting: Console warnings, automatic retry with backoff

## Authentication APIs

### AWS Cognito

**Purpose**: User authentication, OAuth, and session management

**Integration**: `src/auth/AuthProvider.tsx`, `src/lib/amplify.ts`

**Features**:
- ✅ **Secure Authentication** - AWS-managed user pools
- ✅ **Google OAuth** - Federated identity provider
- ✅ **Session Management** - Automatic token refresh
- ✅ **Multi-environment** - Development, sandbox, and production modes

**Development Mode**:
```typescript
// Mock authentication for local development
const mockUser = {
  userId: 'dev-user-123',
  username: 'developer@wift.com',
  email: 'developer@wift.com',
  signInDetails: { loginId: 'developer@wift.com' }
};
```

**Production Mode**:
```typescript
// Real Cognito integration via Amplify
const session = await fetchAuthSession();
const userAttributes = await fetchUserAttributes();
```

## API Error Handling Strategy

### Graceful Degradation
All external APIs are designed to fail gracefully:

1. **Location APIs Unavailable**: 
   - ZIP code lookup fails → Continue without city names
   - Address search fails → Show venue-only results
   - Map tiles fail → Fallback to basic map tiles

2. **Rate Limiting**:
   - Implement request debouncing (300ms)
   - Show loading states during API calls
   - Cache results when possible

3. **Network Failures**:
   - Console warnings for debugging
   - No user-facing error dialogs for optional features
   - Core functionality remains operational

### Performance Optimization

**Request Debouncing**:
```typescript
// Debounce API calls to prevent excessive requests
await new Promise((resolve) => setTimeout(resolve, 300));
```

**Async State Management**:
```typescript
// Non-blocking API calls with loading states
const [searchCity, setSearchCity] = useState<string>();

useEffect(() => {
  const fetchCity = async () => {
    const city = await getCityFromZipcode(zipcode);
    setSearchCity(city);
  };
  fetchCity();
}, [zipcode]);
```

**Error Boundaries**:
- All API failures are contained within components
- Main application functionality never breaks due to API issues
- Fallback UI states provide clear user feedback

## Security Considerations

### API Keys
- **Zippopotam.us**: No API key required
- **Nominatim**: No API key required, User-Agent header for identification
- **AWS Cognito**: Managed through Amplify configuration

### Headers and CORS
```typescript
// Required headers for Nominatim
headers: {
  'User-Agent': 'WIFT-Web-App/1.0',
}
```

### Data Privacy
- No user data sent to external location APIs
- Only search queries and ZIP codes transmitted
- All authentication data handled by AWS Cognito
- No sensitive information exposed in API calls

## Future API Integrations

### Planned Enhancements
- **Google Maps API**: Enhanced mapping features with Places API
- **Venue Database APIs**: Integration with real venue booking platforms
- **Weather APIs**: Event planning weather information
- **Transport APIs**: Public transit and parking information

### API Integration Best Practices
1. **Error Handling**: Always implement graceful fallbacks
2. **Rate Limiting**: Respect API limits with debouncing
3. **Caching**: Cache results when appropriate to reduce calls
4. **Loading States**: Provide user feedback during API calls
5. **Type Safety**: Use TypeScript interfaces for all API responses
6. **Security**: Never expose API keys in client-side code
7. **Documentation**: Document all API integrations and error scenarios

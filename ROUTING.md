# Real URL Routing Implementation

This document explains the custom real URL routing implementation that replaces MUI Toolpad's default simulated router.

## 🚨 Problem Solved

**Original Issue**: MUI Toolpad's default router was simulated and didn't support:
- Real URL changes in the browser address bar
- Search parameters / query strings
- Bookmarkable URLs
- Browser back/forward button functionality
- Page refresh loading correct content

**Solution**: Custom router implementation with real browser history integration.

## 🏗️ Architecture

### Core Components

1. **`DashboardLayoutDemo.tsx`** - Main router implementation
2. **`PageContent`** - Route-to-component mapping
3. **Real Browser Integration** - URLSearchParams, history API, popstate events

### Key Features

- ✅ **Real URL Changes** - Address bar updates on navigation
- ✅ **Search Parameters** - Full URLSearchParams support
- ✅ **Bookmarkable URLs** - Copy/paste URLs work
- ✅ **Browser Navigation** - Back/forward buttons work
- ✅ **Page Refresh** - Loads correct content after refresh
- ✅ **Deep Linking** - Direct URL access works

## 📝 Usage Examples

### Basic Navigation
```typescript
// Navigate to different pages
router.navigate('/dashboard');
router.navigate('/venues');
router.navigate('/floorplans');
router.navigate('/settings');
```

### Navigation with Parameters
```typescript
// Venue search examples
router.navigate('/venues?zipcode=20001&attendees=100&radius=25');

// Form data example
router.navigate('/floorplans/create?type=squareFootage&length=50&width=30&height=12');

// Attendee count example
router.navigate('/floorplans/create?type=attendees&attendees=100&screenType=LED');
```

### Reading Parameters
```typescript
// In your component
function MyComponent({ router }: { router: Router }) {
  // Venue search parameters
  const zipcode = router.searchParams.get('zipcode');
  const attendees = router.searchParams.get('attendees');
  const radius = router.searchParams.get('radius');
  
  // Floorplan parameters
  const formType = router.searchParams.get('type');
  const screenType = router.searchParams.get('screenType');
  
  // Use parameters to initialize state
  useEffect(() => {
    if (zipcode && attendees) {
      setSearchParams({ zipcode, attendees: parseInt(attendees), radius: parseInt(radius || '25') });
    }
    if (formType === 'attendees' && attendees) {
      setAttendeeCount(parseInt(attendees));
    }
  }, [router.searchParams]);
}
```

## 🔧 Adding New Routes

### Step 1: Add Route to PageContent
```typescript
// In DashboardLayoutDemo.tsx
function PageContent({ pathname, router }) {
  switch (pathname) {
    // ... existing routes
    case '/my-new-page': {
      return <MyNewPage router={router} />;
    }
  }
}
```

### Step 2: Import New Component
```typescript
import MyNewPage from '../pages/MyNewPage';
```

### Step 3: Add Navigation Link
```typescript
// In your navigation component
<Button onClick={() => router.navigate('/my-new-page')}>
  Go to New Page
</Button>
```

## 🔍 Search Parameters Guide

### Setting Parameters
```typescript
// Multiple parameters
const params = new URLSearchParams();
params.set('type', 'squareFootage');
params.set('length', '50');
params.set('width', '30');
router.navigate(`/floorplans/create?${params.toString()}`);

// Single parameter
router.navigate('/search?query=floorplans');
```

### Reading Parameters
```typescript
// Get single parameter
const type = router.searchParams.get('type');

// Get all parameters
router.searchParams.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// Check if parameter exists
if (router.searchParams.has('attendees')) {
  // Handle attendees parameter
}
```

### Clearing Parameters
```typescript
// Navigate without parameters
router.navigate('/floorplans/create');

// Or manually clear specific parameter
const newParams = new URLSearchParams(router.searchParams);
newParams.delete('type');
router.navigate(`/floorplans/create?${newParams.toString()}`);
```

## 🧪 Testing URLs

### Manual Testing URLs
```
# Basic pages
http://localhost:5173/
http://localhost:5173/dashboard
http://localhost:5173/venues
http://localhost:5173/floorplans
http://localhost:5173/settings

# Venue search with parameters
http://localhost:5173/venues?zipcode=20001&attendees=100&radius=25
http://localhost:5173/venues?zipcode=10001&attendees=50&radius=10

# Floorplan creation with parameters
http://localhost:5173/floorplans/create?type=squareFootage&length=50&width=30&height=12&screenType=Front&seatingType=Full&tableSize=60&tableSeats=6

http://localhost:5173/floorplans/create?type=attendees&attendees=75&screenType=LED&seatingType=Theatre
```

### Test Checklist
- [ ] URL changes when navigating
- [ ] Parameters appear in address bar
- [ ] Browser back/forward works
- [ ] Page refresh loads correct content
- [ ] Copy/paste URLs work
- [ ] Direct URL access works

## 🐛 Troubleshooting

### Common Issues

**URLs not updating**
- Check if `globalThis.history.pushState` is being called
- Verify useEffect dependencies include `[pathname, searchParams]`

**Parameters not working**
- Ensure component receives `router` prop
- Check if `router.searchParams.get()` is used correctly
- Verify parameter names match exactly

**Browser navigation broken**
- Check if `popstate` event listener is attached
- Verify cleanup function removes event listener

**Page refresh issues**
- Ensure initial state reads from `globalThis.location`
- Check fallback logic in pathname initialization

### Debug Helper
```typescript
// Add to your component for debugging
useEffect(() => {
  console.log('Current pathname:', router.pathname);
  console.log('Current search params:', Array.from(router.searchParams.entries()));
}, [router.pathname, router.searchParams]);
```

## 🚀 Performance Notes

- Router object is memoized to prevent unnecessary re-renders
- URL synchronization only happens when state actually changes
- Event listeners are properly cleaned up to prevent memory leaks

## �️ Development Notes

- Uses `globalThis` instead of `window` for ESLint compliance
- Synchronizes internal state with browser URL automatically  
- Handles edge cases like missing pathname gracefully
- Only updates URL if it actually changed to prevent infinite loops
- Initial state reads from current browser URL with fallback to dashboard

## �🔮 Future Enhancements

Potential improvements:
- Route guards / authentication checks
- Nested routing support
- Route animations/transitions
- TypeScript route type safety
- Route-based code splitting

---

This implementation provides a solid foundation for real URL routing while maintaining compatibility with MUI Toolpad's layout system.

/**
 * Venue Service - Integration with venue APIs for meeting planners
 *
 * This service provides functionality to search for meeting venues
 * based on attendee count, location, and other criteria.
 */

// Types for venue data
export interface VenueSearchParams {
  zipcode: string;
  attendees: number;
  radius: number; // miles
  eventDate?: Date; // optional date/time for the event
  venueTypes?: VenueType[];
  budget?: {
    min?: number;
    max?: number;
  };
  amenities?: string[];
}

export type VenueType =
  | 'hotel'
  | 'conference_center'
  | 'meeting_room'
  | 'event_space'
  | 'banquet_hall'
  | 'corporate_venue';

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  capacity: {
    min: number;
    max: number;
  };
  venueType: VenueType;
  rating?: number;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  amenities: string[];
  photos?: string[];
  description?: string;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  availability?: {
    available: boolean;
    nextAvailableDate?: string;
  };
}

// Google Places API response types
interface GooglePlacePhoto {
  photo_reference: string;
  height: number;
  width: number;
}

interface GooglePlaceGeometry {
  location: {
    lat: number;
    lng: number;
  };
}

interface GooglePlace {
  place_id: string;
  name: string;
  vicinity?: string;
  formatted_address?: string;
  types: string[];
  rating?: number;
  price_level?: number;
  photos?: GooglePlacePhoto[];
  geometry: GooglePlaceGeometry;
}

/**
 * Google Places API Integration
 * Note: Requires GOOGLE_PLACES_API_KEY environment variable
 */
class GooglePlacesVenueService {
  private apiKey: string;
  private baseUrl = 'https://maps.googleapis.com/maps/api/place';

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY || '';
    if (!this.apiKey) {
      // eslint-disable-next-line no-console
      console.warn('Google Places API key not configured. Using mock data.');
    }
  }

  async searchVenues(params: VenueSearchParams): Promise<Venue[]> {
    if (!this.apiKey) {
      return this.getMockVenues(params);
    }

    try {
      // Step 1: Get coordinates from zipcode
      const coordinates = await this.geocodeZipcode(params.zipcode);

      // Step 2: Search for venues near coordinates
      const venues = await this.searchNearbyVenues(coordinates, params);

      return venues;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching venues:', error);
      return this.getMockVenues(params);
    }
  }

  private async geocodeZipcode(
    zipcode: string
  ): Promise<{ lat: number; lng: number }> {
    const response = await fetch(
      `${this.baseUrl}/textsearch/json?query=${zipcode}&key=${this.apiKey}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    }

    throw new Error('Could not geocode zipcode');
  }

  private async searchNearbyVenues(
    coordinates: { lat: number; lng: number },
    params: VenueSearchParams
  ): Promise<Venue[]> {
    const radius = (params.radius || 25) * 1609.34; // Convert miles to meters
    const types = this.getGooglePlaceTypes(params.venueTypes);

    const venues: Venue[] = [];

    // Search for different venue types
    for (const type of types) {
      const response = await fetch(
        `${this.baseUrl}/nearbysearch/json?` +
          `location=${coordinates.lat},${coordinates.lng}&` +
          `radius=${radius}&` +
          `type=${type}&` +
          `key=${this.apiKey}`
      );

      const data = await response.json();

      if (data.results) {
        const mappedVenues = data.results
          .map((place: GooglePlace) =>
            this.mapGooglePlaceToVenue(place, params.attendees)
          )
          .filter((venue: Venue) => venue.capacity.max >= params.attendees);

        venues.push(...mappedVenues);
      }
    }

    return venues.slice(0, 20); // Limit results
  }

  private getGooglePlaceTypes(venueTypes?: VenueType[]): string[] {
    const typeMapping: Record<VenueType, string> = {
      hotel: 'lodging',
      conference_center: 'meeting_room',
      meeting_room: 'meeting_room',
      event_space: 'event_venue',
      banquet_hall: 'banquet_hall',
      corporate_venue: 'corporate_venue',
    };

    if (!venueTypes || venueTypes.length === 0) {
      return ['lodging', 'meeting_room'];
    }

    return venueTypes.map((type) => typeMapping[type] || 'meeting_room');
  }

  private mapGooglePlaceToVenue(place: GooglePlace, attendees: number): Venue {
    // Estimate capacity based on place type and attendees
    const estimatedCapacity = this.estimateCapacity(place.types, attendees);

    return {
      id: place.place_id,
      name: place.name,
      address: place.vicinity || place.formatted_address || '',
      city: '', // Would need additional API call for details
      state: '',
      zipcode: '',
      capacity: estimatedCapacity,
      venueType: this.mapGoogleTypeToVenueType(place.types),
      rating: place.rating,
      priceRange: this.mapPriceLevel(place.price_level),
      amenities: this.extractAmenities(place.types),
      photos:
        place.photos?.map(
          (photo: GooglePlacePhoto) =>
            `${this.baseUrl}/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${this.apiKey}`
        ) || [],
      contact: {
        // Would need Place Details API call for contact info
      },
      coordinates: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
    };
  }

  private estimateCapacity(
    types: string[],
    minAttendees: number
  ): { min: number; max: number } {
    // Basic capacity estimation based on place types
    if (types.includes('lodging')) {
      return { min: 50, max: 500 };
    }
    if (types.includes('meeting_room')) {
      return { min: 10, max: 100 };
    }

    // Default: ensure it meets minimum requirement
    return { min: minAttendees, max: minAttendees * 2 };
  }

  private mapGoogleTypeToVenueType(types: string[]): VenueType {
    if (types.includes('lodging')) return 'hotel';
    if (types.includes('meeting_room')) return 'meeting_room';
    return 'event_space';
  }

  private mapPriceLevel(
    priceLevel?: number
  ): '$' | '$$' | '$$$' | '$$$$' | undefined {
    const mapping: Record<number, '$' | '$$' | '$$$' | '$$$$'> = {
      0: '$',
      1: '$',
      2: '$$',
      3: '$$$',
      4: '$$$$',
    };
    return priceLevel === undefined ? undefined : mapping[priceLevel];
  }

  private extractAmenities(types: string[]): string[] {
    const amenities: string[] = [];

    if (types.includes('parking')) amenities.push('Parking');
    if (types.includes('wifi')) amenities.push('WiFi');
    if (types.includes('restaurant')) amenities.push('Catering');

    return amenities;
  }

  /**
   * Mock data for development/testing when API key is not available
   */
  private getMockVenues(params: VenueSearchParams): Venue[] {
    const mockVenues: Venue[] = [
      // National Harbor, Maryland
      {
        id: 'mock-1',
        name: 'Gaylord National Resort & Convention Center',
        address: '201 Waterfront St',
        city: 'National Harbor',
        state: 'MD',
        zipcode: '20745',
        capacity: { min: 100, max: 2000 },
        venueType: 'conference_center' as VenueType,
        rating: 4.6,
        priceRange: '$$$$',
        amenities: [
          'WiFi',
          'Parking',
          'Catering',
          'A/V Equipment',
          'Waterfront Views',
          'Resort Amenities',
        ],
        photos: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', // Conference room
          'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&h=600&fit=crop', // Modern meeting room
          'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=800&h=600&fit=crop', // Conference presentation
        ],
        description:
          'Premier waterfront resort and convention center with stunning Potomac River views.',
        contact: {
          phone: '(301) 965-4000',
          email: 'events@gaylordnational.com',
          website: 'https://marriott.com/gaylordnational',
        },
        coordinates: { lat: 38.7876, lng: -77.0177 },
        availability: { available: true },
      },
      // Washington DC - Location 1
      {
        id: 'mock-2',
        name: 'Walter E. Washington Convention Center',
        address: '801 Mt Vernon Pl NW',
        city: 'Washington',
        state: 'DC',
        zipcode: '20001',
        capacity: { min: 50, max: 4000 },
        venueType: 'conference_center' as VenueType,
        rating: 4.4,
        priceRange: '$$$',
        amenities: [
          'WiFi',
          'Parking',
          'Catering',
          'A/V Equipment',
          'Metro Accessible',
          'Exhibition Space',
        ],
        photos: [
          'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop', // Large conference hall
          'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&h=600&fit=crop', // Exhibition meeting space
          'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop', // Professional conference room
        ],
        description:
          'Premier convention center in the heart of downtown Washington DC.',
        contact: {
          phone: '(202) 249-3000',
          email: 'events@dcconvention.com',
          website: 'https://dcconvention.com',
        },
        coordinates: { lat: 38.9059, lng: -77.0229 },
        availability: { available: true, nextAvailableDate: '2025-02-15' },
      },
      // Washington DC - Location 2
      {
        id: 'mock-3',
        name: 'The Hay-Adams Hotel',
        address: '800 16th St NW',
        city: 'Washington',
        state: 'DC',
        zipcode: '20006',
        capacity: { min: 20, max: 300 },
        venueType: 'hotel' as VenueType,
        rating: 4.8,
        priceRange: '$$$$',
        amenities: [
          'WiFi',
          'Valet Parking',
          'Fine Dining',
          'White House Views',
          'Historic Elegance',
          'Concierge Services',
        ],
        photos: [
          'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&h=600&fit=crop', // Elegant hotel exterior
          'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&h=600&fit=crop', // Luxury hotel meeting space
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', // Professional conference room
        ],
        description:
          'Luxury historic hotel with elegant meeting spaces and White House views.',
        contact: {
          phone: '(202) 638-6600',
          email: 'events@hayadams.com',
          website: 'https://hayadams.com',
        },
        coordinates: { lat: 38.9007, lng: -77.0365 },
        availability: { available: false, nextAvailableDate: '2025-02-20' },
      },
      // Northern Virginia - Location 1
      {
        id: 'mock-4',
        name: 'Tysons Corner Marriott',
        address: '8028 Leesburg Pike',
        city: 'Vienna',
        state: 'VA',
        zipcode: '22182',
        capacity: { min: 25, max: 800 },
        venueType: 'hotel' as VenueType,
        rating: 4.3,
        priceRange: '$$$',
        amenities: [
          'WiFi',
          'Parking',
          'Restaurant',
          'Business Center',
          'Metro Accessible',
          'Fitness Center',
        ],
        photos: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', // Professional office building
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', // Contemporary conference space
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop', // Modern business meeting room
        ],
        description:
          'Full-service hotel in Tysons Corner with extensive meeting facilities.',
        contact: {
          phone: '(703) 734-3200',
          email: 'meetings@tysonsmarriott.com',
          website: 'https://marriott.com/tysons',
        },
        coordinates: { lat: 38.9187, lng: -77.2311 },
        availability: { available: true },
      },
      // Northern Virginia - Location 2
      {
        id: 'mock-5',
        name: 'Reston Town Center Conference Center',
        address: '11921 Freedom Dr',
        city: 'Reston',
        state: 'VA',
        zipcode: '20190',
        capacity: { min: 40, max: 500 },
        venueType: 'conference_center' as VenueType,
        rating: 4.5,
        priceRange: '$$',
        amenities: [
          'WiFi',
          'Parking',
          'Catering',
          'A/V Equipment',
          'Modern Design',
          'Town Center Location',
        ],
        photos: [
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop', // Modern office meeting space
          'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=800&h=600&fit=crop', // Conference presentation room
          'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop', // Professional conference setup
        ],
        description: 'Modern conference center in vibrant Reston Town Center.',
        contact: {
          phone: '(703) 709-6000',
          email: 'events@restontownconference.com',
          website: 'https://restontownconference.com',
        },
        coordinates: { lat: 38.9586, lng: -77.3571 },
        availability: { available: true, nextAvailableDate: '2025-01-30' },
      },
      // Northern Virginia - Location 3
      {
        id: 'mock-6',
        name: 'Arlington Crystal Gateway Marriott',
        address: '1700 Jefferson Davis Hwy',
        city: 'Arlington',
        state: 'VA',
        zipcode: '22202',
        capacity: { min: 30, max: 600 },
        venueType: 'hotel' as VenueType,
        rating: 4.2,
        priceRange: '$$',
        amenities: [
          'WiFi',
          'Parking',
          'Restaurant',
          'Business Center',
          'Airport Shuttle',
          'Metro Accessible',
        ],
        photos: [
          'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=800&h=600&fit=crop', // Business presentation room
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop', // Hotel conference room
          'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&h=600&fit=crop', // Modern meeting room
        ],
        description:
          'Convenient hotel near Reagan National Airport with flexible meeting spaces.',
        contact: {
          phone: '(703) 413-5500',
          email: 'meetings@crystalgateway.com',
          website: 'https://marriott.com/crystalgateway',
        },
        coordinates: { lat: 38.8367, lng: -77.0505 },
        availability: { available: true },
      },
    ];

    return mockVenues.filter((venue) => venue.capacity.max >= params.attendees);
  }
}

// Export service instance
export const venueService = new GooglePlacesVenueService();

/**
 * Usage example:
 *
 * const venues = await venueService.searchVenues({
 *   zipcode: '60601',
 *   attendees: 100,
 *   radius: 25,
 *   venueTypes: ['hotel', 'conference_center'],
 *   amenities: ['WiFi', 'Parking']
 * });
 */

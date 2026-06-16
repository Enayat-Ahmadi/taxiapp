# OSRM Integration & Distance-Based Pricing

## Overview
Integrated Open Source Routing Machine (OSRM) to calculate real-time distances between pickup and destination locations, enabling accurate price estimation based on actual route distances.

## Files Created/Modified

### New Files
1. **`lib/osrm.ts`** - Core OSRM integration
   - `geocodeAddress()` - Convert addresses to GPS coordinates using Nominatim
   - `calculateRoute()` - Get distance and duration from OSRM
   - `getDistance()` - Simplified function to get distance only

2. **`app/api/bookings/distance/route.ts`** - Server-side API endpoint
   - POST endpoint to calculate distance
   - Accepts `pickupLocation` and `destination`
   - Returns distance (km), duration (minutes), and estimated time

### Modified Files
1. **`components/booking/BookingStep2.tsx`**
   - Fetches real distance from API on location change
   - Displays distance and estimated travel time
   - Calculates accurate estimated price based on actual distance
   - Shows loading/error states

2. **`types/index.ts`**
   - Added `distance` and `estimatedTime` fields to IBooking interface

3. **`models/booking.ts`**
   - Added `distance` (Number, optional) field
   - Added `estimatedTime` (Number, optional) field

## How It Works

### Flow
1. User enters pickup location and destination in Step 1
2. User proceeds to Step 2 (Vehicle Selection)
3. When locations are loaded, component calls `/api/bookings/distance`
4. API receives locations, geocodes them to coordinates, calls OSRM
5. Real distance is returned and displayed
6. Price is calculated based on actual distance × vehicle base price

### Distance Calculation Steps
```
User enters address
  ↓
Geocode to coordinates (Nominatim OpenStreetMap)
  ↓
Request route from OSRM (https://router.project-osrm.org)
  ↓
Extract distance in km
  ↓
Calculate price: distance × basePricePerKm
```

## Price Calculation Formula
```
estimatedPrice = distance × vehicle.basePricePerKm

Examples:
- Comfort car: 10 km × €2/km = €20
- Premium car: 10 km × €2.5/km = €25
```

## API Endpoint

### POST `/api/bookings/distance`
**Request:**
```json
{
  "pickupLocation": "Eidsvoll, Norway",
  "destination": "Oslo, Norway"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "distance": 65.4,
    "duration": 52,
    "estimatedTime": "52 min 65.4 km"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "No route found"
}
```

## External Services Used

1. **Nominatim (OpenStreetMap)**
   - Free geocoding service
   - No authentication required
   - Rate limited but suitable for production with proper handling

2. **OSRM (Open Source Routing Machine)**
   - Free routing engine
   - Public instance: https://router.project-osrm.org
   - Returns accurate distances and travel times

## Error Handling

- Location not found → Error message displayed
- No route available → Error message displayed
- Vehicle selection disabled until distance is calculated
- Continue button disabled on error or while loading

## Future Enhancements

1. **Caching** - Cache geocoding results for repeated locations
2. **Alternative routes** - Show multiple route options
3. **Traffic data** - Include real-time traffic for better ETAs
4. **Pricing adjustments** - Add surge pricing, discounts, etc.
5. **Custom base prices** - Allow per-location pricing
6. **Self-hosted OSRM** - Deploy own OSRM instance for reliability

## Testing

To test the integration:
1. Enter a pickup location (e.g., "Eidsvoll, Norway")
2. Enter a destination (e.g., "Oslo, Norway")
3. Proceed to Step 2
4. Watch distance calculate and prices update
5. Verify prices match: distance × €2/km (comfort) or €2.5/km (premium)

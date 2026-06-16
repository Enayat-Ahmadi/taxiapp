/**
 * OSRM - Open Source Routing Machine
 * Calculate distances and travel times between locations
 */

interface GeocodeResult {
  lat: number;
  lon: number;
}

interface OSRMResponse {
  routes: Array<{
    distance: number; // in meters
    duration: number; // in seconds
  }>;
}

interface RouteInfo {
  distance: number; // in km
  duration: number; // in minutes
  estimatedTime: string;
}

/**
 * Geocode an address to coordinates using OpenStreetMap Nominatim
 */
export async function geocodeAddress(address: string): Promise<GeocodeResult> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          "User-Agent": "Eidsvoll-Taxi-App",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Geocoding failed");
    }

    const results = await response.json();

    if (!results || results.length === 0) {
      throw new Error(`No results found for: ${address}`);
    }

    return {
      lat: parseFloat(results[0].lat),
      lon: parseFloat(results[0].lon),
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
}

/**
 * Calculate distance and duration between two locations using OSRM
 */
export async function calculateRoute(
  pickupLocation: string,
  destination: string
): Promise<RouteInfo> {
  try {
    // Geocode both locations
    const [pickup, dest] = await Promise.all([
      geocodeAddress(pickupLocation),
      geocodeAddress(destination),
    ]);

    // Call OSRM API
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${pickup.lon},${pickup.lat};${dest.lon},${dest.lat}?overview=false`;

    const response = await fetch(osrmUrl);

    if (!response.ok) {
      throw new Error("OSRM request failed");
    }

    const data: OSRMResponse = await response.json();

    if (!data.routes || data.routes.length === 0) {
      throw new Error("No route found");
    }

    const route = data.routes[0];
    const distanceKm = Math.round((route.distance / 1000) * 100) / 100; // Convert meters to km
    const durationMinutes = Math.round(route.duration / 60); // Convert seconds to minutes

    return {
      distance: distanceKm,
      duration: durationMinutes,
      estimatedTime: `${durationMinutes} min${distanceKm} km`,
    };
  } catch (error) {
    console.error("Route calculation error:", error);
    throw error;
  }
}

/**
 * Get distance between two locations (returns km)
 */
export async function getDistance(
  pickupLocation: string,
  destination: string
): Promise<number> {
  const route = await calculateRoute(pickupLocation, destination);
  return route.distance;
}

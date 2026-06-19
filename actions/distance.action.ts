"use server";
import { calculateRoute } from "@/lib/osrm";

export interface RouteInfo {
  distance: number;
  duration: number;
  estimatedTime: string;
}
type ActionResult =
  | { success: true; data: RouteInfo }
  | { success: false; error: string };

const routeCache = new Map<string, RouteInfo>();

export async function getDistanceAction(
  pickup: string,
  destination: string,
): Promise<ActionResult> {
  const normalizedPickup = pickup?.trim();
  const normalizedDestination = destination?.trim();

  if (!normalizedPickup || !normalizedDestination) {
    return { success: false, error: "Missing pickup and destination location" };
  }

  const cacheKey = `${normalizedPickup} | ${normalizedDestination}`;

  if (routeCache.has(cacheKey)) {
    return { success: true, data: routeCache.get(cacheKey)! };
  }

  try {
    const { distance, duration, estimatedTime } = await calculateRoute(
      normalizedPickup,
      normalizedDestination,
    );

    const data = { distance, duration, estimatedTime };
    routeCache.set(cacheKey, data);
    return { success: true, data };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return { success: false, error: message };
  }
}

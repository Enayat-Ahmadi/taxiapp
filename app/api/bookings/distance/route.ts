import { NextRequest, NextResponse } from "next/server";
import { calculateRoute } from "@/lib/osrm";

export async function POST(request: NextRequest) {
  try {
    const { pickupLocation, destination } = await request.json();

    if (!pickupLocation || !destination) {
      return NextResponse.json(
        {
          success: false,
          error: "Pickup location and destination are required",
        },
        { status: 400 },
      );
    }

    const route = await calculateRoute(pickupLocation, destination);

    return NextResponse.json({
      success: true,
      data: {
        distance: route.distance,
        duration: route.duration,
      },
    });
  } catch (error) {
    console.error("Distance calculation error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to calculate distance",
      },
      { status: 500 },
    );
  }
}

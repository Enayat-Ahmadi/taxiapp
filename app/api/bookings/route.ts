import { getAllBookings } from "@/services/booking.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bookings = await getAllBookings();
    return NextResponse.json(
      {
        success: true,
        data: bookings,
        message: "Bookings fetched successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Route GET /api/bookings caught error: ", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch bookings";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}

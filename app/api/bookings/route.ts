import { getAllBookings } from "@/services/booking.service";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "admin") {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

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
    if (process.env.NODE_ENV === "development") {
      console.error("API Route GET /api/bookings caught error: ", error);
    }
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/services/booking.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await createBooking(body);

    return NextResponse.json(
      {
        success: true,
        data: result,
        message: "Booking created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create booking";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}

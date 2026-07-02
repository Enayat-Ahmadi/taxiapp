import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/services/booking.service";
import { BookingSchema } from "@/lib/validations/bookings";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = BookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid data",
        },
        { status: 400 },
      );
    }
    const result = await createBooking(parsed.data);

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

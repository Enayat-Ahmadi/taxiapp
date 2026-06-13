"use server";
import { IBooking, ApiResponse } from "@/types";
import { createBooking } from "@/services/booking.service";
import { revalidatePath } from "next/cache";

/**
 * Server action to create a booking.
 * This delegates to the API route for consistent error handling and validation.
 */
export async function createBookingAction(
  bookingData: IBooking,
): Promise<ApiResponse<IBooking & { _id: string }>> {
  try {
    const result = await createBooking(bookingData);
    revalidatePath("/booking/create");
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create booking";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

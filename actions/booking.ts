"use server";
import { IBooking, ApiResponse, BookingStatus } from "@/types";
import { createBooking, updateBookingStatus } from "@/services/booking.service";
import { revalidatePath } from "next/cache";

/**
 * Server action to create a booking.
 * This delegates to the API route for consistent error handling and validation.
 */
export async function createBookingAction(
  bookingData: IBooking,
): Promise<ApiResponse<IBooking>> {
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
export async function updateBookingStatusAction(
  bookingId: string,
  status: BookingStatus,
): Promise<ApiResponse<IBooking>> {
  try {
    const result = await updateBookingStatus(bookingId, status);
    revalidatePath("/admin/bookings");
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to update booking status";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

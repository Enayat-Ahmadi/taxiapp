"use server";
import { IBooking, ApiResponse, BookingStatus } from "@/types/booking";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  updateBookingStatus,
} from "@/services/booking.service";
import { revalidatePath } from "next/cache";
import { getBookingStats, BookingStats } from "@/services/booking.service";

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

export async function getAllBookingsAction(
  status?: BookingStatus | "all",
): Promise<ApiResponse<IBooking[]>> {
  try {
    const data = await getAllBookings(status);
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch bookings";
    return { success: false, error: errorMessage };
  }
}

export async function deleteBookingAction(
  bookingId: string,
): Promise<ApiResponse<null>> {
  try {
    await deleteBooking(bookingId);
    return {
      success: true,
      data: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete booking";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function getBookingStatsAction(): Promise<
  ActionResponse<BookingStats>
> {
  try {
    const stats = await getBookingStats();

    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch booking statistics",
    };
  }
}

"use server";
import { IBooking, ApiResponse, BookingStatus } from "@/types/booking";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  updateBookingStatus,
  getBookingStats,
  BookingStats,
} from "@/services/booking.service";
import { revalidatePath } from "next/cache";
import { errorResponse } from "@/lib/errors";

/**
 * Server action for creating a booking.
 * Delegates the business logic to the booking service.
 */

export async function createBookingAction(
  bookingData: IBooking,
): Promise<ApiResponse<IBooking>> {
  try {
    const result = await createBooking(bookingData);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return errorResponse(error);
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
    return errorResponse(error);
  }
}

export async function getAllBookingsAction(
  status?: BookingStatus | "all",
): Promise<ApiResponse<IBooking[]>> {
  try {
    const data = await getAllBookings(status);
    return { success: true, data };
  } catch (error) {
    return errorResponse(error);
  }
}

export async function deleteBookingAction(
  bookingId: string,
): Promise<ApiResponse<void>> {
  try {
    await deleteBooking(bookingId);
    revalidatePath("/admin/bookings");

    return {
      success: true,
    };
  } catch (error) {
    return errorResponse(error);
  }
}

export async function getBookingStatsAction(): Promise<
  ApiResponse<BookingStats>
> {
  try {
    const stats = await getBookingStats();

    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    return errorResponse(error);
  }
}

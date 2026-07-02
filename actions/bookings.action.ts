"use server";

import {
  IBooking,
  ApiResponse,
  BookingStatus,
  CreateBookingInput,
} from "@/types/booking";
import { BookingSchema } from "@/lib/validations/bookings";
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
import { requireAdmin } from "@/lib/auth-guard";
import { auth } from "@/auth";
import { calculateServerPrice } from "@/lib/constants/vehicles";

/**
 * Server action for creating a booking.
 * Delegates the business logic to the booking service.
 */

export async function createBookingAction(
  bookingData: CreateBookingInput,
): Promise<ApiResponse<IBooking>> {
  const validatedResult = BookingSchema.safeParse(bookingData);
  if (!validatedResult.success) {
    return {
      success: false,
      error: validatedResult.error.issues[0]?.message ?? "Invalid booking data",
    };
  }

  try {
    const session = await auth();
    const userId = session?.user?.id ?? undefined;
    const { vehicleType, distance, estimatedTime } = validatedResult.data;
    const estimatedPrice = calculateServerPrice(
      vehicleType,
      distance ?? 0,
      estimatedTime ?? 0,
    );
    const result = await createBooking({
      ...validatedResult.data,
      estimatedPrice,
      userId,
    });

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
    await requireAdmin();

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
    await requireAdmin();

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
    await requireAdmin();

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
    await requireAdmin();

    const stats = await getBookingStats();
    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    return errorResponse(error);
  }
}

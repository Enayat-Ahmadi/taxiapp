import { ApiResponse } from "@/types/booking";

export function errorResponse<T>(
  error: unknown,
  fallbackMessage = "Something went wrong",
): ApiResponse<T> {
  if (process.env.NODE_ENV === "development" && error instanceof Error) {
    console.error(error);
  }
  return {
    success: false,
    error: fallbackMessage,
  };
}

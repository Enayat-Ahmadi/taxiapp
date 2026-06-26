import { ApiResponse } from "@/types/booking";

export function errorResponse<T>(
  error: unknown,
  fallbackMessage = "Somthing went wrong",
): ApiResponse<T> {
  return {
    success: false,
    error: error instanceof Error ? error.message : fallbackMessage,
  };
}

"use server";

import { VehicleFormData, vehicleSchema } from "@/lib/validations/vehicles";
import {
  addVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
} from "@/services/vehicle.service";
import { revalidatePath } from "next/cache";
import { VehicleDto } from "@/types/vehicle";
import { errorResponse } from "@/lib/errors";

type ActionResult<T> =
  | { success: true; data?: T }
  | { success: false; error: string };

function validateVehicleInput(data: VehicleFormData):
  | { success: true; data: VehicleFormData }
  | { success: false; error: string } {
  const validatedResult = vehicleSchema.safeParse(data);
  if (!validatedResult.success) {
    return {
      success: false,
      error:
        validatedResult.error?.issues[0]?.message ?? "Invalid vehicle data",
    };
  }

  return {
    success: true,
    data: validatedResult.data,
  };
}

export async function getVehiclesAction(): Promise<ActionResult<VehicleDto[]>> {
  try {
    const result = await getVehicles();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    return errorResponse(error);
  }
}

export async function addVehicleAction(
  data: VehicleFormData,
): Promise<ActionResult<VehicleDto>> {
  const validatedResult = validateVehicleInput(data);
  if (!validatedResult.success) {
    return validatedResult;
  }

  try {
    const vehicle = await addVehicle(validatedResult.data);
    revalidatePath("/admin/vehicles");
    return {
      success: true,
      data: vehicle,
    };
  } catch (error) {
    console.error(error);
    return errorResponse(error);
  }
}

export async function updateVehicleAction(
  id: string,
  data: VehicleFormData,
): Promise<ActionResult<VehicleDto>> {
  const validatedResult = validateVehicleInput(data);
  if (!validatedResult.success) {
    return validatedResult;
  }

  try {
    const vehicle = await updateVehicle(id, validatedResult.data);
    revalidatePath("/admin/vehicles");
    revalidatePath(`/admin/vehicles/${id}`);
    return {
      success: true,
      data: vehicle,
    };
  } catch (error) {
    console.error(error);
    return errorResponse(error);
  }
}

export async function deleteVehicleAction(
  id: string,
): Promise<ActionResult<void>> {
  try {
    await deleteVehicle(id);
    revalidatePath("/admin/vehicles");
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return errorResponse(error);
  }
}

"use server";

import { DriverFormData, driverSchema } from "@/lib/validations/drivers";
import {
  addDriver,
  deleteDriver,
  getDrivers,
  updateDriver,
} from "@/services/driver.service";
import { revalidatePath } from "next/cache";
import { DriverDto } from "@/types/driver";

type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

export async function getDriversAction() {
  try {
    const drivers = await getDrivers();
    return {
      success: true,
      data: drivers,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch drivers",
    };
  }
}

export async function addDriverAction(
  data: DriverFormData,
): Promise<ActionResult<DriverDto>> {
  try {
    const result = await addDriver(data);
    revalidatePath("/admin/drivers");

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (!(error instanceof Error)) {
      console.error(error);
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add driver",
    };
  }
}

export async function updateDriverAction(
  id: string,
  data: DriverFormData,
): Promise<ActionResult<DriverDto>> {
  const validatedResult = driverSchema.safeParse(data);
  if (!validatedResult.success) {
    return {
      success: false,
      error: validatedResult.error?.issues[0]?.message ?? "Invalid driver data",
    };
  }

  try {
    const driver = await updateDriver(id, validatedResult.data);
    revalidatePath("/admin/drivers");
    return {
      success: true,
      data: driver,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update driver",
    };
  }
}

export async function deleteDriverAction(
  id: string,
): Promise<ActionResult<void>> {
  try {
    await deleteDriver(id);
    revalidatePath("/admin/drivers");
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete driver",
    };
  }
}

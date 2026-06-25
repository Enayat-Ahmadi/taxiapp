import { DriverFormData } from "@/lib/validations/drivers";
import { IDriver } from "@/models/driver";
import { addDriver } from "@/services/driver.service";
import { revalidatePath } from "next/cache";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function addDriverAction(
  data: DriverFormData,
): Promise<ActionResult<IDriver>> {
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

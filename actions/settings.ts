import { updateSettings } from "@/services/settings.service";
import { SettingsFormData } from "@/lib/validations/settings";

type ActionResponse =
  | { success: true; data: unknown }
  | { success: false; error: string };

export async function updateSettingsAction(
  data: SettingsFormData,
): Promise<ActionResponse> {
  try {
    const result = await updateSettings(data);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update settings";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

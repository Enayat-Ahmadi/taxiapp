"use server";

import { updateSettings } from "@/services/settings.service";
import { SettingsFormData, settingsSchema } from "@/lib/validations/settings";
import { getSettings } from "@/services/settings.service";
import { ISettings } from "@/models/settings";

type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function getSettingsAction(): Promise<
  ActionResponse<ISettings | null>
> {
  try {
    const result = await getSettings();

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch settings";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function updateSettingsAction(
  data: SettingsFormData,
): Promise<ActionResponse<SettingsFormData>> {
  try {
    const validated = settingsSchema.parse(data);
    const result = await updateSettings(validated);

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

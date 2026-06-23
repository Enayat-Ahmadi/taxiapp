import { connectDB } from "@/lib/db";
import { Settings } from "@/models/settings";
import { SettingsFormData } from "@/lib/validations/settings";

export async function updateSettings(data: SettingsFormData) {
  await connectDB();
  const updateSettings = await Settings.findOneAndUpdate({}, data, {
    new: true,
    runValidators: true,
    upsert: true,
  });
  if (!updateSettings) {
    throw new Error("Failed to update settings");
  }
  return updateSettings.toObject();
}

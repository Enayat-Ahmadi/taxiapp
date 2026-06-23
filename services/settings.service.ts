import { connectDB } from "@/lib/db";
import { Settings } from "@/models/settings";
import { SettingsFormData } from "@/lib/validations/settings";

export async function getSettings() {
  await connectDB();
  const settings = await Settings.findOne().lean();
  if (!settings) return null;
  return {
    ...settings,
    _id: settings._id.toString(),
  };
}

export async function updateSettings(data: SettingsFormData) {
  await connectDB();
  const updatedSettings = await Settings.findOneAndUpdate({}, data, {
    new: true,
    runValidators: true,
    upsert: true,
  });
  if (!updateSettings) throw new Error("Failed to update settings");

  return {
    ...updatedSettings.toObject(),
    _id: updatedSettings._id.toString(),
    createdAt: updatedSettings.createdAt.toISOString(),
    updatedAt: updatedSettings.updatedAt.toISOString(),
  };
}

import { getSettingsAction } from "@/actions/settings";
import SettingsForm from "./SettingsForm";

export default async function Settings() {
  const settings = await getSettingsAction();
  console.log(settings);
  return (
    <div>
      <h1 className="text-3xl font-bold text-ink mb-2">Settings</h1>
      <p className="text-ink">Configure your company information and pricing</p>
      <SettingsForm />
    </div>
  );
}

import { getSettingsAction } from "@/actions/settings.action";
import SettingsForm from "./SettingsForm";

export default async function Settings() {
  const result = await getSettingsAction();

  if (!result.success) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-ink mb-2">Settings</h1>
        <p className="text-red-500">{result.error}</p>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-ink mb-2">Settings</h1>
      <p className="text-ink">Configure your company information and pricing</p>
      <SettingsForm settings={result.data} />
    </div>
  );
}

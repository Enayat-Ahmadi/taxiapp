import SettingsForm from "./SettingsForm";

export default function Settings() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-ink mb-2">Settings</h1>
      <p className="text-ink">Configure your company information and pricing</p>
      <SettingsForm />
    </div>
  );
}

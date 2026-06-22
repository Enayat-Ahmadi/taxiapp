import { Button, Card, Input } from "@/components/ui";
import { Save } from "lucide-react";

export default function Settings() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-ink mb-2">Settings</h1>
      <p className="text-ink">Configure your company information and pricing</p>
      <form>
        <Card className="mt-4">
          <h2 className="text-xl font-bold mb-4">Company Information</h2>
          <div className="grid md:grid-cols-2 gap-4 m-2">
            <Input label="Company Name" />
            <Input label="Phone" />
            <Input label="Email" />
            <Input label="City" />
          </div>
          <Input label="Address" />
        </Card>
        <Card className="mt-4">
          <h2 className="text-xl font-bold text-ink mb-4">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-4 m-2">
            <Input label="Currency" type="text" />
            <Input label="Base Price" type="number" step="0.01" />
            <Input label="Price per KM" type="number" step="0.01" />
            <Input label="Price per Minute" type="number" step="0.01" />
            <Input label="Minimum Fare" type="number" step="0.01" />
            <Input label="Cancellation Fee" type="number" step="0.01" />
            <Input label="Platform Fee %" type="number" step="0.01" />
          </div>
        </Card>
        <Button
          type="submit"
          className="flex items-center gap-2 bg-teal mt-2 text-cloud-light"
        >
          <Save className="w-5 h-5" />
          Save Settings
        </Button>
      </form>
    </div>
  );
}

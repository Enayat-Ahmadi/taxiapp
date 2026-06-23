"use client";

import { Button, Card } from "@/components/ui";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  settingsSchema,
  type SettingsFormData,
} from "@/lib/validations/settings";
import CompanySection from "./CompanySection";
import PricingSection from "./PricingSection";
import { updateSettingsAction } from "@/actions/settings";
import { ISettings } from "@/models/settings";

type SettingsProps = {
  settings?: ISettings | null;
};
export default function SettingsForm({ settings }: SettingsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings ?? undefined,
  });

  const onSubmit = async (data: SettingsFormData) => {
    const result = await updateSettingsAction(data);

    if (result.success) {
      alert("Settings updated successfully");
    } else {
      alert(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-2">
      <Card>
        <CompanySection register={register} errors={errors} />
      </Card>
      <Card className="mt-4">
        <PricingSection register={register} errors={errors} />
      </Card>
      <Button
        disabled={isSubmitting}
        type="submit"
        className="flex items-center gap-2 bg-teal mt-2 text-cloud-light"
      >
        <Save className="w-5 h-5" />
        {isSubmitting ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}

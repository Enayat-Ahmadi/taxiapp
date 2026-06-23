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

export default function SettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  });

  const handleFormSubmit = (data: SettingsFormData) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2 mt-2">
      <Card>
        <CompanySection register={register} errors={errors} />
      </Card>
      <Card className="mt-4">
        <PricingSection register={register} errors={errors} />
      </Card>
      <Button
        type="submit"
        className="flex items-center gap-2 bg-teal mt-2 text-cloud-light"
      >
        <Save className="w-5 h-5" />
        Save Settings
      </Button>
    </form>
  );
}

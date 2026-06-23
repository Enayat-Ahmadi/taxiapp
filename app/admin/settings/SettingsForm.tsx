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
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  });

  const onSubmit = (data: SettingsFormData) => {
    console.log(data);
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

"use client";

import { Button, Card, Input } from "@/components/ui";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  settingsSchema,
  type SettingsFormData,
} from "@/lib/validations/settings";

export default function Settings() {
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
    <div className="">
      <h1 className="text-3xl font-bold text-ink mb-2">Settings</h1>
      <p className="text-ink">Configure your company information and pricing</p>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-2 mt-2"
      >
        <Card>
          <h2 className="text-xl font-bold mb-4">Company Information</h2>
          <div className="grid md:grid-cols-2 gap-4 m-2">
            <Input
              {...register("companyName")}
              label="Company Name"
              error={errors.companyName?.message}
            />
            <Input
              {...register("companyPhone")}
              label="Phone"
              error={errors.companyPhone?.message}
            />
            <Input
              {...register("companyEmail")}
              label="Email"
              error={errors.companyEmail?.message}
            />
            <Input
              {...register("city")}
              label="City"
              error={errors.city?.message}
            />
          </div>
          <Input
            {...register("companyAddress")}
            label="Address"
            error={errors.companyAddress?.message}
          />
        </Card>
        <Card className="mt-4">
          <h2 className="text-xl font-bold text-ink mb-4">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-4 m-2">
            <Input
              {...register("currency")}
              label="Currency"
              type="text"
              error={errors.currency?.message}
            />
            <Input
              {...register("basePrice", {
                valueAsNumber: true,
              })}
              label="Base Price"
              type="number"
              step="0.01"
              error={errors.basePrice?.message}
            />
            <Input
              {...register("pricePerKm", {
                valueAsNumber: true,
              })}
              label="Price per KM"
              type="number"
              step="0.01"
              error={errors.pricePerKm?.message}
            />
            <Input
              {...register("pricePerMinute", {
                valueAsNumber: true,
              })}
              label="Price per Minute"
              type="number"
              step="0.01"
              error={errors.pricePerMinute?.message}
            />
            <Input
              {...register("minimumFare", {
                valueAsNumber: true,
              })}
              label="Minimum Fare"
              type="number"
              step="0.01"
              error={errors.minimumFare?.message}
            />
            <Input
              {...register("cancellationFee", {
                valueAsNumber: true,
              })}
              label="Cancellation Fee"
              type="number"
              step="0.01"
              error={errors.cancellationFee?.message}
            />
            <Input
              {...register("platformFeePercentage", {
                valueAsNumber: true,
              })}
              label="Platform Fee %"
              type="number"
              step="0.01"
              error={errors.platformFeePercentage?.message}
            />
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

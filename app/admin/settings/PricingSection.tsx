import { Input } from "@/components/ui";
import { SettingsFormData } from "@/lib/validations/settings";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface PricingSectionProps {
  register: UseFormRegister<SettingsFormData>;
  errors: FieldErrors<SettingsFormData>;
}
export default function PricingSection({
  register,
  errors,
}: PricingSectionProps) {
  return (
    <div>
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
    </div>
  );
}

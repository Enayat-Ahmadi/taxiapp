import { Input } from "@/components/ui";
import { SettingsFormData } from "@/lib/validations/settings";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface CompanySectionProps {
  register: UseFormRegister<SettingsFormData>;
  errors: FieldErrors<SettingsFormData>;
}
export default function CompanySection({
  register,
  errors,
}: CompanySectionProps) {
  return (
    <div>
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
    </div>
  );
}

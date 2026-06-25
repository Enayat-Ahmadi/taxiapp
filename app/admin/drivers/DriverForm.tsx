"use client";

import { Button, Card, Input, Select } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DriverFormData, driverSchema } from "@/lib/validations/drivers";
import { DriverDto } from "@/types/driver";

const DRIVER_STATUS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

interface DriverFormProps {
  initialData?: DriverDto;
  onSubmit: (data: DriverFormData) => Promise<void>;
}

export default function DriverForm({ onSubmit, initialData }: DriverFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(driverSchema),
    defaultValues: initialData,
  });
  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            {...register("fullName")}
            label="Full Name"
            type="text"
            error={errors.fullName?.message}
          />
          <Input
            {...register("phoneNumber")}
            label="Phone Number"
            type="tel"
            error={errors.phoneNumber?.message}
          />
          <Input
            {...register("email")}
            label="Email"
            type="email"
            error={errors.email?.message}
          />
          <Input
            {...register("licenseNumber")}
            label="License Number"
            type="text"
            error={errors.licenseNumber?.message}
          />
          <Input
            {...register("licenseExpire")}
            label="License Expiry"
            type="date"
            error={errors.licenseExpire?.message}
          />
          <Select
            {...register("status")}
            label="Status"
            options={DRIVER_STATUS}
            error={errors.status?.message}
          />
        </div>
        <Button type="submit" variant="teal" className="my-2">
          {isSubmitting ? "loading..." : "Add Driver"}
        </Button>
      </form>
    </Card>
  );
}

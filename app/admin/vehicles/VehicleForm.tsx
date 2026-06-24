"use client";

import { Button, Card, Input, Select } from "@/components/ui";
import { vehicleSchema, VehicleFormData } from "@/lib/validations/vehicles";
import { VehicleType } from "@/types/vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IVEHICLE_TYPES {
  value: VehicleType;
  label: string;
}
const VEHICLE_TYPES: IVEHICLE_TYPES[] = [
  { value: "standard", label: "Standard" },
  { value: "comfort", label: "Comfort" },
  { value: "premium", label: "Premium" },
];

interface VehicleFormProps {
  initialData?: VehicleFormData;
  onSubmit: (data: VehicleFormData) => Promise<void>;
  isEditing?: boolean;
}
export default function VehicleForm({
  initialData,
  onSubmit,
}: VehicleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: initialData,
  });

  const submitHandler = async (data: VehicleFormData) => {
    if (!isDirty) {
      toast("No changes");
      return;
    }

    await onSubmit(data);
  };
  const isEditing = !!initialData;

  const buttonText = !isDirty
    ? isEditing
      ? "No changes"
      : "FillForm"
    : isSubmitting
      ? isEditing
        ? "Updating..."
        : "Adding..."
      : isEditing
        ? "Update Vehicle"
        : "Add Vehicle";
  return (
    <Card>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Registration Number"
            {...register("registrationNumber")}
            error={errors.registrationNumber?.message}
          />

          <Input
            label="Manufacturer"
            {...register("manufacturer")}
            error={errors.manufacturer?.message}
          />

          <Input
            label="Model"
            {...register("vehicleModel")}
            error={errors.vehicleModel?.message}
          />

          <Input
            type="number"
            label="Year"
            {...register("year", { valueAsNumber: true })}
            error={errors.year?.message}
          />

          <Input
            label="Color"
            {...register("color")}
            error={errors.color?.message}
          />

          <Select
            label="Vehicle Type"
            options={VEHICLE_TYPES}
            {...register("type")}
            error={errors.type?.message}
          />

          <Input
            type="number"
            label="Seats"
            {...register("seats", { valueAsNumber: true })}
            error={errors.seats?.message}
          />

          <Input
            type="number"
            label="Luggage Capacity"
            {...register("luggageCapacity", { valueAsNumber: true })}
            error={errors.luggageCapacity?.message}
          />

          <Input
            type="number"
            step="0.01"
            label="Base Price per KM"
            {...register("basePricePerKm", { valueAsNumber: true })}
            error={errors.basePricePerKm?.message}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || (isEditing && !isDirty)}
          className="bg-teal text-cloud-light hover:bg-teal/60"
        >
          {buttonText}
        </Button>
      </form>
    </Card>
  );
}

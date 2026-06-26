"use client";

import { VehicleFormData } from "@/lib/validations/vehicles";
import { toast } from "sonner";
import { updatedVehicleAction } from "@/actions/vehicles.action";
import { VehicleDto } from "@/types/vehicle";
import VehicleForm from "../VehicleForm";

export default function EditVehicleClient({
  vehicle,
}: {
  vehicle: VehicleDto;
}) {
  const handleUpdateVehicle = async (data: VehicleFormData) => {
    const result = await updatedVehicleAction(vehicle._id, data);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Vehicle updated successfully");
  };
  return (
    <VehicleForm
      initialData={vehicle}
      onSubmit={handleUpdateVehicle}
    />
  );
}

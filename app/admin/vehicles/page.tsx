"use client";

import { addVehicleAction } from "@/actions/vehicel.action";
import VehicleForm from "./VehicleForm";
import { VehicleFormData } from "@/lib/validations/vehicles";

export default function Vehicles() {
  const handleAddVehicle = async (data: VehicleFormData) => {
    const res = await addVehicleAction(data);
    if (res.success) {
      alert("vehicle added successfully");
    } else {
      alert("somthing went wrong");
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-ink">Vehicles Management</h1>
      <VehicleForm onSubmit={handleAddVehicle} />
    </div>
  );
}

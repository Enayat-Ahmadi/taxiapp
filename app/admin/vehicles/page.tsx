"use client";

import { addVehicleAction } from "@/actions/vehicel.action";
import VehicleForm from "./VehicleForm";
import { VehicleFormData } from "@/lib/validations/vehicles";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";

export default function Vehicles() {
  const [showForm, setShowForm] = useState(false);
  const handleAddVehicle = async (data: VehicleFormData) => {
    const res = await addVehicleAction(data);
    if (res.success) {
      alert("vehicle added successfully");
      console.log(res.data);
    } else {
      alert("somthing went wrong");
    }
  };
  return (
    <div className="space-y-6">
      <div className="md:flex items-center justify-between">
        <h1 className="text-3xl font-bold text-ink">Vehicles Management</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-teal"
        >
          {!showForm && <Plus className="w-5 h-5" />}
          {showForm ? "Cancel" : "Add Vehicle"}
        </Button>
      </div>
      {showForm && <VehicleForm onSubmit={handleAddVehicle} />}
    </div>
  );
}

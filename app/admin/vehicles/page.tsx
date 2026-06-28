"use client";

import {
  addVehicleAction,
  getVehiclesAction,
  deleteVehicleAction,
} from "@/actions/vehicles.action";
import VehicleForm from "./VehicleForm";
import { VehicleFormData } from "@/lib/validations/vehicles";
import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { toast } from "sonner";
import VehicleTable from "./VehicleList";
import { VehicleDto } from "@/types/vehicle";

import { ConfirmModal } from "@/components/ui/DeleteConfirmModal";
import Spinner from "@/components/ui/Spinner";
import useDeleteModal from "@/hooks/useDeleteModal";

export default function Vehicles() {
  const [showForm, setShowForm] = useState(false);
  const [vehicels, setVehicles] = useState<VehicleDto[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVehicles = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getVehiclesAction();
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      setVehicles(result.data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  const handleCreateVehicle = async (data: VehicleFormData) => {
    try {
      const res = await addVehicleAction(data);
      if (!res.success) {
        toast.error(res.error ?? "Failed to add vehicle");
        return;
      }
      setShowForm(false);
      await loadVehicles();
      toast.success("Vehicle added successfully");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const deleteModal = useDeleteModal<string>(async (id) => {
    const res = await deleteVehicleAction(id);
    if (!res.success) {
      toast.error(res.error ?? "Failed to delete vehicle");
    }
    setVehicles((prev) => prev.filter((vehicel) => vehicel._id !== id));
    toast.success("Vehicle deleted successfully");
  });

  if (loading) {
    return <Spinner size="lg" text="Loading vehicles..." />;
  }

  return (
    <div className="space-y-6">
      <div className="md:flex items-center justify-between">
        <h1 className="text-3xl font-bold text-ink">Vehicles Management</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-teal mt-2"
        >
          {!showForm && <Plus className="w-5 h-5" />}
          {showForm ? "Cancel" : "Add Vehicle"}
        </Button>
      </div>
      {showForm && <VehicleForm onSubmit={handleCreateVehicle} />}
      <VehicleTable
        vehicles={vehicels}
        onRequestDelete={deleteModal.requestDelete}
      />

      <ConfirmModal
        title="Delete Vehicle?"
        description="This vehicle will be permanently removed."
        confirmText="Delete"
        isOpen={deleteModal.isOpen}
        isLoading={deleteModal.isDeleting}
        onCancel={deleteModal.cancelDelete}
        onConfirm={deleteModal.confirmDelete}
      />
    </div>
  );
}

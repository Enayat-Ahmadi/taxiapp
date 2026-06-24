"use client";

import {
  addVehicleAction,
  getVehiclesAction,
  deleteVehicleAction,
} from "@/actions/vehicel.action";
import VehicleForm from "./VehicleForm";
import { VehicleFormData } from "@/lib/validations/vehicles";
import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button,} from "@/components/ui";
import { toast } from "sonner";
import VehicleTable from "./VehicleList";
import { VehicleDto } from "@/types/vehicle";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";

export default function Vehicles() {
  const [showForm, setShowForm] = useState(false);
  const [vehicels, setVehicles] = useState<VehicleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const selectedVehicle = vehicels.find((v) => v._id === selectedVehicleId);

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

  const handleRequestDelete = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (vehicleId: string) => {
    setIsDeleting(true);
    try {
      const result = await deleteVehicleAction(vehicleId);
      if (!result.success) {
        toast.error(result.error ?? "Failed to delete vehicle");
        return;
      }
      setVehicles((prev) => prev.filter((v) => v._id !== vehicleId));
      setDeleteModalOpen(false);
      setSelectedVehicleId(null);
      toast.success("Vehicle deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedVehicleId(null);
  };

  if (loading) {
    return <div>Loading vehicles...</div>;
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
      <VehicleTable vehicles={vehicels} onRequestDelete={handleRequestDelete} />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        itemName={selectedVehicle?.registrationNumber ?? "this vehicle"}
        isDeleting={isDeleting}
        onConfirm={() =>
          selectedVehicleId && handleConfirmDelete(selectedVehicleId)
        }
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

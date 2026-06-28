"use client";

import { Button } from "@/components/ui";
import DriverForm from "./DriverForm";
import { addDriverAction, deleteDriverAction } from "@/actions/drivers.action";
import { Plus } from "lucide-react";
import { DriverFormData } from "@/lib/validations/drivers";
import { toast } from "sonner";
import { getDriversAction } from "@/actions/drivers.action";
import { useCallback, useEffect, useState } from "react";
import { DriverDto } from "@/types/driver";
import DriverTable from "./DriverList";
import { ConfirmModal } from "@/components/ui/DeleteConfirmModal";
import useDeleteModal from "@/hooks/useDeleteModal";

export default function DriverPage() {
  const [showForm, setShowForm] = useState(false);
  const [drivers, setDrivers] = useState<DriverDto[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDrivers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getDriversAction();
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setDrivers(res.data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const handleCreateDriver = async (data: DriverFormData) => {
    try {
      const res = await addDriverAction(data);
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setShowForm(false);
      await fetchDrivers();
      toast.success("Driver added successfully");
    } catch {
      toast.error("somthing went wrong");
    }
  };

  const deleteModal = useDeleteModal<string>(async (id) => {
    const res = await deleteDriverAction(id);
    if (!res.success) {
      toast.error(res.error || "Failed to delete driver");
      return;
    }
    setDrivers((prev) => prev.filter((driver) => driver.id !== id));
    toast.success("Driver successfully deleted");
  });

  if (loading) {
    return <div>Loading drivers...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-ink">Drivers Management</h1>
        <Button
          onClick={() => setShowForm((prev) => !prev)}
          variant="teal"
          className=""
        >
          {!showForm && <Plus className="w-5 h-5" />}
          {showForm ? "Cancel" : "Add Driver"}
        </Button>
      </div>
      {showForm && <DriverForm onSubmit={handleCreateDriver} />}
      <DriverTable
        drivers={drivers}
        onRequestDelete={deleteModal.requestDelete}
      />
      <ConfirmModal
        title="Delete DRiver?"
        description="This driver will be permanently removed."
        confirmText="Delete"
        isOpen={deleteModal.isOpen}
        isLoading={deleteModal.isDeleting}
        onCancel={deleteModal.cancelDelete}
        onConfirm={deleteModal.confirmDelete}
      />
    </div>
  );
}

"use client";

import { Button } from "@/components/ui";
import DriverForm from "./DriverForm";
import { addDriverAction } from "@/actions/driver.action";
import { DriverFormData } from "@/lib/validations/drivers";
import { toast } from "sonner";

export default function DriverPage() {
  const handleCreateDriver = async (data: DriverFormData) => {
    try {
      const res = await addDriverAction(data);
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success("Driver added successfully");
    } catch {
      toast.error("somthing went wrong");
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-ink">Drivers Management</h1>
        <Button
          variant="teal"
          className="flex items-center px-4 py-2 rounded-lg font-medium hover:bg-[#FFD772] transition-colors"
        >
          Add Driver
        </Button>
      </div>
      <DriverForm onSubmit={handleCreateDriver} />
    </div>
  );
}

"use client";

import { DriverFormData } from "@/lib/validations/drivers";
import DriverForm from "../DriverForm";
import { updateDriverAction } from "@/actions/driver.action";
import { DriverDto } from "@/types/driver";
import { toast } from "sonner";

export default function EditDriverClient({ driver }: { driver: DriverDto }) {
  const handleUpdateDriver = async (data: DriverFormData) => {
    const result = await updateDriverAction(driver.id, data);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Driver updated successfully");
  };
  return <DriverForm initialData={driver} onSubmit={handleUpdateDriver} />;
}

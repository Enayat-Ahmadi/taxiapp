import VehicleForm from "../VehicleForm";
import { getVehicleById } from "@/services/vehicle.service";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);
  if (!vehicle) {
    return <div>vehicel not found</div>;
  }

  return <VehicleForm initialData={vehicle} isEditing />;
}

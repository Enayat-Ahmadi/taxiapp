import { getVehicleById } from "@/services/vehicle.service";
import EditVehicleClient from "./EditVehicleClient";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("params", params);
  const vehicle = await getVehicleById(id);
  if (!vehicle) {
    return <div>vehicel not found</div>;
  }

  return <EditVehicleClient vehicle={vehicle} />;
}

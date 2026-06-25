import { getDriverByID } from "@/services/driver.service";
import EditDriverClient from "./EditDriverClient";

export default async function EditDriverPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const driver = await getDriverByID(id);
  if (!driver) {
    return <div>Driver not found</div>;
  }
  return (
    <div>
      <EditDriverClient driver={driver} />
    </div>
  );
}

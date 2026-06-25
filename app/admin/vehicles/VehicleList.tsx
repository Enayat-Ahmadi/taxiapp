"use client";

import { VehicleDto } from "@/types/vehicle";
import { Card } from "@/components/ui";
import MobileVehicleCard from "@/components/admin/vehicle/MobileVehicleCard";
import DesktopVehicleTable from "@/components/admin/vehicle/DesktopVehicleTable";

interface VehicleTableProps {
  vehicles: VehicleDto[];
  onRequestDelete: (vehicleId: string) => void;
}

export default function VehicleTable({
  vehicles,
  onRequestDelete,
}: VehicleTableProps) {
  if (!vehicles.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-center text-warning">No vehicles found</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 md:p-6">
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {vehicles.map((vehicle) => (
          <MobileVehicleCard
            key={vehicle._id}
            vehicle={vehicle}
            onRequestDelete={onRequestDelete}
          />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <DesktopVehicleTable
          vehicles={vehicles}
          onRequestDelete={onRequestDelete}
        />
      </div>
    </Card>
  );
}

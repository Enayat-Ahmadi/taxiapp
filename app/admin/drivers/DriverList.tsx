"use client";

import { DriverDto } from "@/types/driver";
import { Card } from "@/components/ui";
import MobileDriverCard from "@/components/admin/driver/MobileDriverCard";
import DesktopDriverCard from "@/components/admin/driver/DesktopDriverCard";

interface DriverTableProps {
  drivers: DriverDto[];
  onRequestDelete: (driverId: string) => void;
}

export default function DriverTable({
  drivers,
  onRequestDelete,
}: DriverTableProps) {
  if (!drivers.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-center text-warning">No drivers found</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 md:p-6">
      {/* Mobile Card View */}
      <div className="space-y-4 lg:hidden">
        {drivers.map((driver) => (
          <MobileDriverCard
            key={driver.id}
            driver={driver}
            onRequestDelete={onRequestDelete}
          />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto lg:block">
        <DesktopDriverCard
          drivers={drivers}
          onRequestDelete={onRequestDelete}
        />
      </div>
    </Card>
  );
}

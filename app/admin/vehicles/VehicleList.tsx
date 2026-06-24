"use client";

import { VehicleDto } from "@/types/vehicle";
import { Button } from "@/components/ui";
import Link from "next/link";

interface VehicleTableProps {
  vehicles: VehicleDto[];
}

export default function VehicleTable({ vehicles }: VehicleTableProps) {
  if (!vehicles.length) {
    return (
      <div className="rounded-lg border p-8 text-center">No vehicles found</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted">
            <th className="px-4 py-3 text-left">Registration</th>
            <th className="px-4 py-3 text-left">Manufacturer</th>
            <th className="px-4 py-3 text-left">Model</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Year</th>
            <th className="px-4 py-3 text-left">Color</th>
            <th className="px-4 py-3 text-left">Seats</th>
            <th className="px-4 py-3 text-left">Luggage</th>
            <th className="px-4 py-3 text-left">Price/KM</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id} className="border-b hover:bg-muted/50">
              <td className="px-4 py-3">{vehicle.registrationNumber}</td>

              <td className="px-4 py-3">{vehicle.manufacturer}</td>

              <td className="px-4 py-3">{vehicle.vehicleModel}</td>

              <td className="px-4 py-3 capitalize">{vehicle.type}</td>

              <td className="px-4 py-3">{vehicle.year}</td>

              <td className="px-4 py-3">{vehicle.color}</td>

              <td className="px-4 py-3">{vehicle.seats}</td>

              <td className="px-4 py-3">{vehicle.luggageCapacity}</td>

              <td className="px-4 py-3">€{vehicle.basePricePerKm}</td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/vehicles/${vehicle._id}`}>
                    <Button size="sm">Edit</Button>
                  </Link>

                  <Button size="sm" variant="primary">
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

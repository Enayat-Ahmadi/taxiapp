import { Button } from "@/components/ui";
import { VehicleDto } from "@/types/vehicle";
import Link from "next/link";
import { buttonVariants } from "@/lib/buttonVariants";
import { Edit2, Trash2 } from "lucide-react";

interface DesktopVehicleTableProps {
  vehicles: VehicleDto[];
  onRequestDelete: (vehicleId: string) => void;
}

export default function DesktopVehicleTable({
  vehicles,
  onRequestDelete,
}: DesktopVehicleTableProps) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b bg-muted">
          <th className="px-4 py-3 text-left font-semibold">Registration</th>
          <th className="px-4 py-3 text-left font-semibold">Manufacturer</th>
          <th className="px-4 py-3 text-left font-semibold">Model</th>
          <th className="px-4 py-3 text-left font-semibold">Type</th>
          <th className="px-4 py-3 text-left font-semibold">Year</th>
          <th className="px-4 py-3 text-left font-semibold">Color</th>
          <th className="px-4 py-3 text-left font-semibold">Seats</th>
          <th className="px-4 py-3 text-left font-semibold">Luggage</th>
          <th className="px-4 py-3 text-left font-semibold">Price/KM</th>
          <th className="px-4 py-3 text-right font-semibold">Actions</th>
        </tr>
      </thead>

      <tbody>
        {vehicles.map((vehicle) => (
          <tr
            key={vehicle._id}
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <td className="px-4 py-3 text-gray-900">
              {vehicle.registrationNumber}
            </td>

            <td className="px-4 py-3 text-gray-900">{vehicle.manufacturer}</td>

            <td className="px-4 py-3 text-gray-900">{vehicle.vehicleModel}</td>

            <td className="px-4 py-3 capitalize text-gray-900">
              {vehicle.type}
            </td>

            <td className="px-4 py-3 text-gray-900">{vehicle.year}</td>

            <td className="px-4 py-3 text-gray-900">{vehicle.color}</td>

            <td className="px-4 py-3 text-gray-900">{vehicle.seats}</td>

            <td className="px-4 py-3 text-gray-900">
              {vehicle.luggageCapacity}
            </td>

            <td className="px-4 py-3 text-gray-900">
              €{vehicle.basePricePerKm}
            </td>

            <td className="px-4 py-3">
              <div className="flex justify-end gap-2">
                <Link
                  href={`/admin/vehicles/${vehicle._id}`}
                  className={buttonVariants("outline", "md", "rounded-full")}
                >
                  <Edit2 className="w-4 h-4" />
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRequestDelete(vehicle._id)}
                  className="hover:bg-error hover:text-cloud-light rounded-full"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

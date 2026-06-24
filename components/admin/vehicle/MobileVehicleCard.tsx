import { Button } from "@/components/ui";
import { VehicleDto } from "@/types/vehicle";
import Link from "next/link";

interface MobileVehicleCardProps {
  vehicle: VehicleDto;
  onRequestDelete: (vehicleId: string) => void;
}

export default function MobileVehicleCard({
  vehicle,
  onRequestDelete,
}: MobileVehicleCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-teal/60 text-ink">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Registration
          </p>
          <p className="font-semibold text-gray-900">
            {vehicle.registrationNumber}
          </p>
        </div>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded capitalize">
          {vehicle.type}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Manufacturer
          </p>
          <p className="text-sm font-medium text-gray-900">
            {vehicle.manufacturer}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Model</p>
          <p className="text-sm font-medium text-gray-900">
            {vehicle.vehicleModel}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Year</p>
          <p className="text-sm font-medium text-gray-900">{vehicle.year}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Color</p>
          <p className="text-sm font-medium text-gray-900">{vehicle.color}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Seats</p>
          <p className="text-sm font-medium text-gray-900">{vehicle.seats}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Luggage
          </p>
          <p className="text-sm font-medium text-gray-900">
            {vehicle.luggageCapacity}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          Price/KM
        </p>
        <p className="text-sm font-medium text-gray-900">
          €{vehicle.basePricePerKm}
        </p>
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
        <Link href={`/admin/vehicles/${vehicle._id}`}>
          <Button size="sm">Edit</Button>
        </Link>
        <Button
          size="sm"
          variant="primary"
          onClick={() => onRequestDelete(vehicle._id)}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

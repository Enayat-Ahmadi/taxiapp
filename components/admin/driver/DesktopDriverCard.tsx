import { Button } from "@/components/ui";
import { DriverDto } from "@/types/driver";
import Link from "next/link";
import { buttonVariants } from "@/lib/buttonVariants";
import { Edit2, Trash2 } from "lucide-react";

interface DesktopDriverTableProps {
  drivers: DriverDto[];
  onRequestDelete: (driverId: string) => void;
}

export default function DesktopDriverTable({
  drivers,
  onRequestDelete,
}: DesktopDriverTableProps) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b bg-muted">
          <th className="px-4 py-3 text-left font-semibold">Full Name</th>
          <th className="px-4 py-3 text-left font-semibold">Phone Number</th>
          <th className="px-4 py-3 text-left font-semibold">Email</th>
          <th className="px-4 py-3 text-left font-semibold">
            License Number
          </th>
          <th className="px-4 py-3 text-left font-semibold">
            License Expiry
          </th>
          <th className="px-4 py-3 text-left font-semibold">Status</th>
          <th className="px-4 py-3 text-right font-semibold">Actions</th>
        </tr>
      </thead>

      <tbody>
        {drivers.map((driver) => (
          <tr
            key={driver.id}
            className="border-b border-gray-100 transition-colors hover:bg-gray-50"
          >
            <td className="px-4 py-3 text-gray-900">
              {driver.fullName}
            </td>

            <td className="px-4 py-3 text-gray-900">
              {driver.phoneNumber}
            </td>

            <td className="px-4 py-3 text-gray-900">
              {driver.email}
            </td>

            <td className="px-4 py-3 text-gray-900">
              {driver.licenseNumber}
            </td>

            <td className="px-4 py-3 text-gray-900">
              {new Date(driver.licenseExpiry).toLocaleDateString()}
            </td>

            <td className="px-4 py-3">
              <span
                className={`rounded px-2 py-1 text-xs font-semibold capitalize ${
                  driver.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {driver.status}
              </span>
            </td>

            <td className="px-4 py-3">
              <div className="flex justify-end gap-2">
                <Link
                  href={`/admin/drivers/${driver.id}`}
                  className={buttonVariants(
                    "outline",
                    "md",
                    "rounded-full",
                  )}
                >
                  <Edit2 className="h-4 w-4" />
                </Link>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRequestDelete(driver.id)}
                  className="rounded-full hover:bg-error hover:text-cloud-light"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
"use client";

import Link from "next/link";
import { Edit2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui";
import { buttonVariants } from "@/lib/buttonVariants";
import { DriverDto } from "@/types/driver";

interface MobileDriverCardProps {
  driver: DriverDto;
  onRequestDelete: (driverId: string) => void;
}

export default function MobileDriverCard({
  driver,
  onRequestDelete,
}: MobileDriverCardProps) {
  const statusClasses =
    driver.status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-700";

  return (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-teal/60 p-4 text-ink">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Full Name
          </p>
          <p className="font-semibold text-gray-900">{driver.fullName}</p>
        </div>

        <span
          className={`rounded px-2 py-1 text-xs font-semibold capitalize ${statusClasses}`}
        >
          {driver.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Phone Number
          </p>
          <p className="text-sm font-medium text-gray-900">
            {driver.phoneNumber}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
          <p className="break-all text-sm font-medium text-gray-900">
            {driver.email}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            License Number
          </p>
          <p className="text-sm font-medium text-gray-900">
            {driver.licenseNumber}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            License Expiry
          </p>
          <p className="text-sm font-medium text-gray-900">
            {new Date(driver.licenseExpire).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-gray-100 pt-3">
        <Link
          href={`/admin/drivers/${driver.id}`}
          className={buttonVariants("outline", "md", "rounded-full")}
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
    </div>
  );
}

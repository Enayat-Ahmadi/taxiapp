"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Settings, Car, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/bookings", label: "Bookings", icon: FileText },
  { href: "/admin/vehicles", label: "Vehicles", icon: Car },
  { href: "/admin/drivers", label: "Drivers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];
export default function AdminNav({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-2">
      {ADMIN_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive =
          pathname === href || (href !== "/admin" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              isActive
                ? "bg-success text-cloud-light font-medium"
                : "hover:bg-success/30",
            )}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

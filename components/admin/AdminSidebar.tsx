"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/bookings", label: "Bookings", icon: FileText },
];
export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 bg-teal/60 border-r border-slate-700 min-h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
            <span className="text-ink font-bold text-lg">T</span>
          </div>
          <span className="font-bold text-ink">Eidsvoll Taxi</span>
        </Link>
        <nav className="space-y-2">
          {ADMIN_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
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
      </div>
    </aside>
  );
}

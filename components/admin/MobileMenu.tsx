"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Settings, Car, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/bookings", label: "Bookings", icon: FileText },
  { href: "/admin/vehicles", label: "Vehicles", icon: Car },
  { href: "/admin/drivers", label: "Drivers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function MobileMenu() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-sky border-t border-slate-700 safe-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {ADMIN_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href ||
            (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center gap-1 py-2 px-3 flex-1"
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab-pill"
                  className="absolute inset-0 rounded-lg bg-success/80"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative z-10"
              >
                <Icon
                  className={cn("w-5 h-5", isActive ? "text-cloud-light" : "")}
                />
              </motion.div>
              <span
                className={cn(
                  "text-[10px] leading-none relative z-10",
                  isActive ? "text-cloud-light font-medium" : "",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

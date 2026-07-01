"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/bookings": "Bookings",
  "/admin/vehicles": "Vehicles",
  "/admin/drivers": "Drivers",
  "/admin/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  for (const [route, title] of Object.entries(PAGE_TITLES)) {
    if (route !== "/admin" && pathname.startsWith(route)) return title;
  }
  return "Admin";
}

export default function AdminHeader() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-40 bg-sky border-b border-slate-700 h-14 flex items-center px-4 sm:px-6 gap-4">
      {/* Logo — visible only on mobile (desktop sidebar already shows it) */}
      <Link href="/" className="flex items-center gap-2 lg:hidden shrink-0">
        <div className="w-7 h-7 bg-teal rounded-lg flex items-center justify-center">
          <span className="text-ink font-bold">T</span>
        </div>
        <span className="font-bold text-ink">Eidsvoll Taxi</span>
      </Link>

      <h1 className="text-sm font-semibold text-foreground tracking-wide uppercase opacity-70 hidden lg:block">
        {title}
      </h1>
    </header>
  );
}

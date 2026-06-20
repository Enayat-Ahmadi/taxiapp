"use client";

import Link from "next/link";
import { buttonVariants } from "@/lib/buttonVariants";
import { ROUTES } from "@/lib/routes";

const liknStyles = buttonVariants("teal", "sm");
export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-sky backdrop-blur-md border-b border-slate-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
              <span className="font-bold text-black">T</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">
              Eidsvoll Taxi
            </span>
          </Link>
          <div className="flex gap-2">
            <Link href={ROUTES.booking} className={liknStyles}>
              Book Now
            </Link>
            <Link href={ROUTES.admin} className={liknStyles}>
              Bookings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

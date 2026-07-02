"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { buttonVariants } from "@/lib/buttonVariants";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 bg-sky backdrop-blur-md border-b border-slate-700/30 safe-top">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 safe-x">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
              <span className="font-bold text-black">T</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">
              Eidsvoll Taxi
            </span>
          </Link>

          <div className="flex gap-2">
            <Link
              href={ROUTES.profile}
              className={buttonVariants("outline", "sm", "rounded-full")}
            >
              <User />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

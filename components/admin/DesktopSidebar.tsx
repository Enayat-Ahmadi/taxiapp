"use client";
import Link from "next/link";
import AdminNav from "./AdminNav";

export default function DesktopSidebar() {
  return (
    <aside className="hidden lg:block w-64 bg-sky border-r border-slate-700 min-h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
            <span className="text-ink font-bold text-lg">T</span>
          </div>
          <span className="font-bold text-ink">Eidsvoll Taxi</span>
        </Link>
        <AdminNav />
      </div>
    </aside>
  );
}

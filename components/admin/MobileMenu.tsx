"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AdminNav from "./AdminNav";
import { Button } from "../ui";

export default function MobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden border-b border-slate-700 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
              <span className="text-ink font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-ink text-sm sm:text-base">
              Eidsvoll Taxi
            </span>
          </Link>
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-ink" />
            ) : (
              <Menu className="w-6 h-6 text-ink" />
            )}
          </Button>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 top-15"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "lg:hidden fixed top-15 right-0 h-[calc(100vh-57px)] w-64 bg-teal/60 border-l border-slate-700 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-4">
          <AdminNav onClick={() => setMobileMenuOpen(false)} />
        </div>
      </div>
    </>
  );
}

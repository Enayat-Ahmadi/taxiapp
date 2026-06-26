"use client";

import StatCard from "@/components/admin/StatCard";
import { formatPrice } from "@/lib/utils";
import { BarChart3, FileText, Car, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getBookingStatsAction } from "@/actions/booking";
import { BookingStats } from "@/services/booking.service";

export default function Dashboard() {
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getBookingStatsAction();
        if (!result.success) {
          setError(result.error);
          return;
        }
        setStats(result.data ?? null);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load booking statistics",
        );
      }
    };
    fetchStats();
  }, []);
  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
        {error}
      </div>
    );
  }
  if (!stats) {
    return <p>Loading...</p>;
  }
  return (
    <div className="space-y-8 ">
      <div>
        <h1 className="text-4xl font-bold text-ink mb-2">Welcome back!</h1>
        <p className="">Here&apos;s your business overview</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          title="Total Bookings"
          value={stats?.totalBookings}
        />
        <StatCard
          icon={<BarChart3 className="w-6 h-6" />}
          title="Total Revenue"
          value={formatPrice(3000.5)}
        />
        <StatCard
          icon={<Car className="w-6 h-6" />}
          title="Active Vehicles"
          value="10"
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Active Drivers"
          value="3"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          title="Bookings Today"
          value="5"
          trend="Since last week"
        />
        <StatCard
          icon={<BarChart3 className="w-6 h-6" />}
          title="Completed Bookings"
          value={stats?.completedBookings}
          trend={`${((stats?.completedBookings / stats.totalBookings) * 100).toFixed(1)}% completion`}
          trendUp
        />
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          title="Pending Bookings"
          value={stats?.pendingBookings}
        />
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          title="Cancelled Bookings"
          value={stats?.cancelledBookings}
          trend={`${((stats.cancelledBookings / stats.totalBookings) * 100).toFixed(1)}% cancellation rate`}
        />
      </div>
    </div>
  );
}

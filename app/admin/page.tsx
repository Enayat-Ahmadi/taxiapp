import StatCard from "@/components/admin/StatCard";
import { formatPrice } from "@/lib/utils";
import { BarChart3, FileText, Car, Users } from "lucide-react";

export default function Dashboard() {
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
          value="10"
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
          value="10"
          trend={`${((10 / 20) * 100).toFixed(1)}% completion`}
          trendUp
        />
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          title="Pending Bookings"
          value="10"
        />
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          title="Cancelled Bookings"
          value="3"
          trend={`${((3 / 10) * 100).toFixed(1)}% cancellation rate`}
        />
      </div>
    </div>
  );
}

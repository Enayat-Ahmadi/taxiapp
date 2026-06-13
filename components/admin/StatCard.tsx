"use client";

interface StateCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({
  title,
  value,
  trend,
  trendUp,
  icon,
}: StateCardProps) {
  return (
    <div className="bg-teal/60 border border-slate-700 rounded-lg p-5 hover:border-warning transition-colors">
      <div className="flex items-start text-sm justify-between">
        <p className="text-ink text-sm mb-2">{title}</p>
        <div className="text-ink bg-teal bg-opacity-10 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      <p className="text-xl font-bold text-cloud-light">{value}</p>
      {trend && (
        <p
          className={`text-sm mt-2 ${trendUp ? "text-green-400" : "text-red-400"}`}
        >
          {trend}
        </p>
      )}
    </div>
  );
}

import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trendValue?: string;
  trendPositive?: boolean;
  subtitle?: string;
  iconBg?: string;
  iconColor?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trendValue,
  trendPositive,
  subtitle,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
}: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-white p-4 shadow-sm">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-zinc-500">{title}</p>
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-zinc-900">{value}</span>
          {trendValue && (
            <span
              className={`text-xs font-semibold ${
                trendPositive ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {trendValue}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="mt-0.5 text-[11px] text-zinc-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

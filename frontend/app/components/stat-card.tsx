import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: "blue" | "green" | "amber" | "red" | "zinc";
}

const colorMap = {
  blue: "bg-blue-500/10 text-blue-500",
  green: "bg-emerald-500/10 text-emerald-500",
  amber: "bg-amber-500/10 text-amber-500",
  red: "bg-red-500/10 text-red-500",
  zinc: "bg-zinc-500/10 text-zinc-400",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  color = "blue",
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </p>
        <div className={`rounded-lg p-2 ${colorMap[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
        {value}
      </p>
      {trend && (
        <p
          className={`mt-1 text-xs font-medium ${
            trendUp ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {trend}
        </p>
      )}
    </div>
  );
}

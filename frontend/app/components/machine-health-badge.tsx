interface HealthBadgeProps {
  score: number;
  size?: "sm" | "md";
}

export default function MachineHealthBadge({
  score,
  size = "md",
}: HealthBadgeProps) {
  let color: string;
  let label: string;

  if (score >= 80) {
    color = "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    label = "Healthy";
  } else if (score >= 60) {
    color = "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    label = "Warning";
  } else {
    color = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    label = "Critical";
  }

  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${color} ${sizeClass}`}>
      <span
        className={`inline-block rounded-full ${
          score >= 80
            ? "bg-emerald-500"
            : score >= 60
            ? "bg-amber-500"
            : "bg-red-500"
        } ${size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2"}`}
      />
      {label} ({score}%)
    </span>
  );
}

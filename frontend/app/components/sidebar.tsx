"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Server,
  Zap,
  Target,
  Bell,
  Wrench,
  FileBarChart,
  Database,
  Activity,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/equipment", label: "Equipment", icon: Server },
  { href: "/anomaly-detection", label: "Anomaly Detection", icon: Zap },
  { href: "/failure-prediction", label: "Failure Prediction", icon: Target },
  { href: "/alerts", label: "Alerts & Notifications", icon: Bell, badge: 3 },
  { href: "/maintenance", label: "Maintenance", icon: Wrench },
  { href: "/reports", label: "Reports", icon: FileBarChart },
  { href: "/data-explorer", label: "Data Explorer", icon: Database },
  { href: "/model-performance", label: "Model Performance", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[250px] shrink-0 flex-col bg-[#0f1a2e]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-wide text-white">
            PredictAI
          </h1>
          <p className="text-[11px] text-slate-500">Industrial Maintenance</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="custom-scrollbar flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Branding */}
      <div className="border-t border-white/10 px-5 py-4">
        <p className="text-[13px] font-semibold text-white">
          AI for Reliable
        </p>
        <p className="text-[13px] font-semibold text-white">Operations</p>
        <p className="mt-1 text-[11px] text-slate-500">
          Predict • Prevent • Optimize
        </p>
        <p className="mt-3 text-[10px] text-slate-600">v1.0.0</p>
      </div>
    </aside>
  );
}

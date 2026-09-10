"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  Activity,
  Settings,
  Factory,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/maintenance", label: "Maintenance", icon: Wrench },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-200 bg-zinc-950 text-zinc-300 dark:border-zinc-800">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-zinc-800 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
          <Factory className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-wide text-white">
            Industrial AI
          </h1>
          <p className="text-[11px] text-zinc-500">Maintenance System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600/15 text-blue-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-800 px-3 py-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-zinc-500">
          <Activity className="h-4 w-4 text-green-500" />
          <span>System Online</span>
        </div>
      </div>
    </aside>
  );
}

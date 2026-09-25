"use client";

import { Menu, Search, Bell } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function TopBar() {
  const { profileName, avatarUrl } = useUser();
  const initials = profileName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <header className="flex h-[60px] items-center justify-between border-b border-zinc-200 bg-white px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100">
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search equipment, alerts, reports..."
            className="w-80 rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-4 text-sm text-zinc-700 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Plant Status */}
        <div className="hidden items-center gap-2 text-sm md:flex">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
          <span className="font-medium text-zinc-700">Plant Online</span>
        </div>

        {/* Notification Bell */}
        <button className="relative rounded-lg p-2 text-zinc-400 hover:bg-zinc-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-xs font-bold text-white overflow-hidden relative">
            {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="object-cover w-full h-full" />
              ) : (
                initials
              )}
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-zinc-800">
              {profileName}
            </p>
            <p className="text-[11px] text-zinc-500">Operations Team</p>
          </div>
        </div>
      </div>
    </header>
  );
}

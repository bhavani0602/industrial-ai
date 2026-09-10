"use client";

import { useState, useMemo } from "react";
import {
  ClipboardList,
  CalendarClock,
  Loader2,
  CheckCircle2,
  AlertOctagon,
  Search,
  Filter,
} from "lucide-react";
import StatCard from "../components/stat-card";
import { maintenanceRecords, getMaintenanceKPIs } from "@/lib/mock-data";
import type { MaintenanceRecord } from "@/lib/types";

const statusColors: Record<string, string> = {
  Scheduled:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "In Progress":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Overdue: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const priorityColors: Record<string, string> = {
  Low: "text-zinc-500 dark:text-zinc-400",
  Medium: "text-blue-600 dark:text-blue-400",
  High: "text-amber-600 dark:text-amber-400",
  Critical: "text-red-600 dark:text-red-400",
};

const priorityDot: Record<string, string> = {
  Low: "bg-zinc-400",
  Medium: "bg-blue-500",
  High: "bg-amber-500",
  Critical: "bg-red-500",
};

type StatusFilter = "All" | MaintenanceRecord["status"];

export default function MaintenancePage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const kpis = getMaintenanceKPIs();

  const filteredRecords = useMemo(() => {
    let records = maintenanceRecords;

    if (statusFilter !== "All") {
      records = records.filter((r) => r.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      records = records.filter(
        (r) =>
          r.machine_name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.technician.toLowerCase().includes(q) ||
          r.maintenance_type.toLowerCase().includes(q)
      );
    }

    return records;
  }, [statusFilter, searchQuery]);

  const upcomingRecords = maintenanceRecords
    .filter((r) => r.status === "Scheduled" || r.status === "In Progress")
    .sort(
      (a, b) =>
        new Date(a.maintenance_date).getTime() -
        new Date(b.maintenance_date).getTime()
    );

  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Machine Maintenance
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Track, schedule, and manage maintenance work orders across all
          equipment.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Records"
          value={kpis.total}
          icon={ClipboardList}
          color="zinc"
        />
        <StatCard
          title="Scheduled"
          value={kpis.scheduled}
          icon={CalendarClock}
          color="blue"
        />
        <StatCard
          title="In Progress"
          value={kpis.inProgress}
          icon={Loader2}
          color="amber"
        />
        <StatCard
          title="Completed"
          value={kpis.completed}
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title="Overdue"
          value={kpis.overdue}
          icon={AlertOctagon}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Main Table */}
        <section className="xl:col-span-2 rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {/* Filter Bar */}
          <div className="flex flex-col gap-3 border-b border-zinc-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-zinc-400" />
              <div className="flex gap-1">
                {(
                  [
                    "All",
                    "Scheduled",
                    "In Progress",
                    "Completed",
                    "Overdue",
                  ] as StatusFilter[]
                ).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      statusFilter === s
                        ? "bg-blue-600 text-white"
                        : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 sm:w-64"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="px-5 py-3">Machine</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3">Technician</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Priority</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-zinc-400"
                    >
                      No maintenance records found.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((r) => (
                    <tr
                      key={r.id}
                      className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="whitespace-nowrap px-5 py-3 font-medium text-zinc-900 dark:text-white">
                        {r.machine_name}
                      </td>
                      <td className="px-5 py-3">
                        <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-semibold dark:bg-zinc-800">
                          {r.maintenance_type}
                        </span>
                      </td>
                      <td className="max-w-xs truncate px-5 py-3 text-zinc-500 dark:text-zinc-400">
                        {r.description}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-zinc-600 dark:text-zinc-300">
                        {r.technician}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-zinc-500 dark:text-zinc-400">
                        {new Date(r.maintenance_date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                            priorityColors[r.priority]
                          }`}
                        >
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${
                              priorityDot[r.priority]
                            }`}
                          />
                          {r.priority}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            statusColors[r.status]
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Upcoming Maintenance Timeline */}
        <section className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
              Upcoming Schedule
            </h2>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {upcomingRecords.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-zinc-400">
                No upcoming maintenance.
              </div>
            ) : (
              upcomingRecords.map((r) => (
                <div key={r.id} className="flex gap-4 px-5 py-4">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        r.status === "In Progress"
                          ? "bg-amber-500 ring-4 ring-amber-500/20"
                          : "bg-blue-500 ring-4 ring-blue-500/20"
                      }`}
                    />
                    <div className="mt-1 flex-1 w-px bg-zinc-200 dark:bg-zinc-700" />
                  </div>
                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {r.machine_name}
                      </p>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          statusColors[r.status]
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                      {r.description}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400">
                      <span>
                        {new Date(r.maintenance_date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                      <span>•</span>
                      <span>{r.technician}</span>
                      <span>•</span>
                      <span
                        className={`font-semibold ${
                          priorityColors[r.priority]
                        }`}
                      >
                        {r.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

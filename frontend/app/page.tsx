"use client";

import {
  Factory,
  AlertTriangle,
  HeartPulse,
  CalendarClock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import StatCard from "./components/stat-card";
import MachineHealthBadge from "./components/machine-health-badge";
import {
  machines,
  sensorTimeSeries,
  recentAnomalies,
  predictions,
  riskDistribution,
  getDashboardKPIs,
} from "@/lib/mock-data";

const statusColors: Record<string, string> = {
  Active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Idle: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  "Under Maintenance":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Offline: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const anomalyStatusColors: Record<string, string> = {
  Unresolved:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Investigating:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Resolved:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export default function DashboardPage() {
  const kpis = getDashboardKPIs();

  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Real-time overview of your industrial equipment health and
          predictions.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Machines"
          value={kpis.totalMachines}
          icon={Factory}
          trend="+2 this quarter"
          trendUp
          color="blue"
        />
        <StatCard
          title="Active Alerts"
          value={kpis.activeAlerts}
          icon={AlertTriangle}
          trend="3 unresolved"
          trendUp={false}
          color="red"
        />
        <StatCard
          title="Avg Machine Health"
          value={`${kpis.avgHealth}%`}
          icon={HeartPulse}
          trend="+2% vs last week"
          trendUp
          color="green"
        />
        <StatCard
          title="Upcoming Maintenance"
          value={kpis.upcomingMaintenance}
          icon={CalendarClock}
          trend="Next: tomorrow"
          trendUp
          color="amber"
        />
      </div>

      {/* Machine Health Overview */}
      <section className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            Machine Health Overview
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="px-5 py-3">Machine</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Health</th>
                <th className="px-5 py-3">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {machines.map((m) => {
                const pred = predictions.find((p) => p.machine_id === m.id);
                return (
                  <tr
                    key={m.id}
                    className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <td className="whitespace-nowrap px-5 py-3 font-medium text-zinc-900 dark:text-white">
                      {m.machine_name}
                    </td>
                    <td className="px-5 py-3">
                      <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-semibold dark:bg-zinc-800">
                        {m.machine_type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-zinc-500 dark:text-zinc-400">
                      {m.location}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          statusColors[m.status]
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <MachineHealthBadge score={m.health_score} size="sm" />
                    </td>
                    <td className="px-5 py-3">
                      {pred && (
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            pred.risk_level === "HIGH"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              : pred.risk_level === "MEDIUM"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          }`}
                        >
                          {pred.risk_level}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Sensor Trends */}
        <div className="xl:col-span-2 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-zinc-900 dark:text-white">
            Sensor Trends (Last 24h)
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={sensorTimeSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: "#a1a1aa" }}
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 11, fill: "#a1a1aa" }} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#fafafa",
                }}
              />
              <Line
                type="monotone"
                dataKey="air_temperature"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Air Temp (K)"
              />
              <Line
                type="monotone"
                dataKey="process_temperature"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Process Temp (K)"
              />
              <Line
                type="monotone"
                dataKey="torque"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                name="Torque (Nm)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-zinc-900 dark:text-white">
            Failure Risk Distribution
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={riskDistribution} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "#a1a1aa" }}
                tickLine={false}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="level"
                tick={{ fontSize: 12, fill: "#a1a1aa", fontWeight: 600 }}
                tickLine={false}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#fafafa",
                }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={28}>
                {riskDistribution.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Anomalies */}
      <section className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            Recent Anomalies
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="px-5 py-3">Machine</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Score</th>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3">Detected</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {recentAnomalies.map((a) => (
                <tr
                  key={a.id}
                  className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  <td className="whitespace-nowrap px-5 py-3 font-medium text-zinc-900 dark:text-white">
                    {a.machine_name}
                  </td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-300">
                    {a.anomaly_type}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`font-mono font-bold ${
                        a.anomaly_score >= 0.8
                          ? "text-red-500"
                          : a.anomaly_score >= 0.6
                          ? "text-amber-500"
                          : "text-emerald-500"
                      }`}
                    >
                      {a.anomaly_score.toFixed(2)}
                    </span>
                  </td>
                  <td className="max-w-xs truncate px-5 py-3 text-zinc-500 dark:text-zinc-400">
                    {a.description}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-zinc-500 dark:text-zinc-400">
                    {new Date(a.detected_at).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        anomalyStatusColors[a.status]
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

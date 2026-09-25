"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Settings,
  AlertTriangle,
  ShieldAlert,
  CheckCircle,
  ChevronRight,
  Lightbulb,
  Wrench,
  Search,
  Thermometer,
  ChevronDown,
  AlertCircle,
  Info,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
} from "recharts";
import StatCard from "./components/stat-card";


// ── Risk badge colors ────────────────────────────────────────────
const riskColors: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

// ── Alert severity config ────────────────────────────────────────
const severityConfig: Record<string, { bg: string; icon: typeof AlertCircle }> = {
  critical: { bg: "bg-red-100 text-red-600", icon: AlertCircle },
  warning: { bg: "bg-amber-100 text-amber-600", icon: AlertTriangle },
  info: { bg: "bg-blue-100 text-blue-600", icon: Info },
};

// ── Sensor chart tabs ────────────────────────────────────────────
const sensorTabs = ["Vibration", "Temperature", "Pressure", "Flow Rate"];

export default function DashboardPage() {
  const [activeSensorTab, setActiveSensorTab] = useState("Vibration");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [dropdownMachines, setDropdownMachines] = useState<any[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<number>(1);

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://127.0.0.1:8000/api/dashboard/summary?machine_id=${selectedMachine}`)
        .then((res) => res.json())
        .then((data) => setDashboardData(data))
        .catch((err) => console.error("Error fetching dashboard data:", err));

      fetch("http://127.0.0.1:8000/api/machines?limit=10")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setDropdownMachines(data);
          }
        })
        .catch((err) => console.error("Error fetching machines:", err));
    };

    fetchData(); // Fetch immediately
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [selectedMachine]);

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

  const realTotalEquipment = dashboardData ? dashboardData.stats.total_machines : 0;

  const realEquipmentHealth = dashboardData ? [
    { name: "Healthy", value: dashboardData.health_status.healthy, percentage: `${Math.round((dashboardData.health_status.healthy / realTotalEquipment) * 100) || 0}%`, color: "#22c55e" },
    { name: "Warning", value: dashboardData.health_status.warning, percentage: `${Math.round((dashboardData.health_status.warning / realTotalEquipment) * 100) || 0}%`, color: "#f59e0b" },
    { name: "Critical", value: dashboardData.health_status.critical, percentage: `${Math.round((dashboardData.health_status.critical / realTotalEquipment) * 100) || 0}%`, color: "#ef4444" },
    { name: "Offline", value: dashboardData.health_status.offline, percentage: `${Math.round((dashboardData.health_status.offline / realTotalEquipment) * 100) || 0}%`, color: "#94a3b8" },
  ] : [];

  return (
    <div className="space-y-5 p-6">
      {/* ─── Welcome Banner ─────────────────────────────────────── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">
            Welcome back, Bhavani! 👋
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Monitor equipment health, detect anomalies and prevent failures with
            AI.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <select className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 font-medium text-zinc-700 shadow-sm focus:outline-none">
            <option>Chennai Plant</option>
            <option>Mumbai Plant</option>
            <option>Delhi Plant</option>
          </select>
          <span suppressHydrationWarning>{dateStr}</span>
          <span suppressHydrationWarning className="font-medium text-zinc-700">{timeStr}</span>
        </div>
      </div>

      {/* ─── KPI Stat Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Equipment"
          value={dashboardData ? dashboardData.stats.total_machines : "..."}
          icon={Settings}
          trendValue="↑ 12%"
          trendPositive
          subtitle="vs last month"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active Anomalies"
          value={dashboardData ? dashboardData.stats.active_anomalies : "..."}
          icon={AlertTriangle}
          trendValue="↑ 150%"
          trendPositive={false}
          subtitle="vs last week"
          iconBg="bg-red-50"
          iconColor="text-red-500"
        />
        <StatCard
          title="Predicted Failures"
          value={dashboardData ? dashboardData.stats.predicted_failures : "..."}
          icon={ShieldAlert}
          trendValue="↑ 50%"
          trendPositive={false}
          subtitle="in next 7 days"
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Uptime"
          value={dashboardData ? `${dashboardData.stats.uptime_percentage}%` : "..."}
          icon={CheckCircle}
          trendValue="↑ 2.4%"
          trendPositive
          subtitle="vs last month"
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
      </div>

      {/* ─── Row 2: Health Donut | Predicted Failures | Alerts ── */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Equipment Health Donut */}
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-800">
              Equipment Health Status
            </h2>
            <Link href="/equipment" className="flex items-center gap-0.5 text-xs font-medium text-blue-600 hover:underline">
              View All <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-6">
            {/* Donut Chart */}
            <div className="relative h-[170px] w-[170px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={realEquipmentHealth}
                    innerRadius={52}
                    outerRadius={75}
                    dataKey="value"
                    strokeWidth={0}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {realEquipmentHealth.map((entry: any, i: number) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-zinc-900">
                  {realTotalEquipment}
                </span>
                <span className="text-[11px] text-zinc-500">Equipment</span>
              </div>
            </div>
            {/* Legend */}
            <div className="space-y-2.5">
              {realEquipmentHealth.map((item: any) => (
                <div key={item.name} className="flex items-center gap-2.5">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-zinc-600">{item.name}</span>
                  <span className="text-sm font-semibold text-zinc-800">
                    {item.value} ({item.percentage})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Predicted Failures */}
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-800">
              AI Predicted Failures (Next 7 Days)
            </h2>
            <Link href="/failure-prediction" className="flex items-center gap-0.5 text-xs font-medium text-blue-600 hover:underline">
              View All <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                <th className="pb-2">Equipment</th>
                <th className="pb-2">Failure Probability</th>
                <th className="pb-2">Predicted In</th>
                <th className="pb-2">Risk</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData?.predicted_failures_list?.length > 0 ? (
                dashboardData.predicted_failures_list.map((pf: any) => (
                  <tr key={pf.id} className="border-t border-zinc-50">
                    <td className="py-2 text-zinc-700">{pf.equipment}</td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-zinc-100">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pf.failureProbability}%`,
                              backgroundColor:
                                pf.failureProbability >= 70
                                  ? "#ef4444"
                                  : pf.failureProbability >= 50
                                  ? "#f59e0b"
                                  : "#22c55e",
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-zinc-700">
                          {pf.failureProbability}%
                        </span>
                      </div>
                    </td>
                    <td className="py-2 text-zinc-500">{pf.predictedIn}</td>
                    <td className="py-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${riskColors[pf.risk] || riskColors["Low"]}`}
                      >
                        {pf.risk}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-zinc-400">
                    No predicted failures
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Alerts */}
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-800">
              Recent Alerts
            </h2>
            <Link href="/alerts" className="text-xs font-medium text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="mt-3 space-y-3">
            {dashboardData?.recent_alerts?.length > 0 ? (
              dashboardData.recent_alerts.map((alert: any) => {
                const config = severityConfig[alert.severity.toLowerCase()] || severityConfig.info;
                const IconComp = config.icon;
                return (
                  <div key={alert.id} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${config.bg}`}
                    >
                      <IconComp className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-zinc-800 leading-snug">
                        {alert.message}
                      </p>
                      <p className="text-[11px] text-zinc-400">{alert.time_ago}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-4 text-center text-zinc-400">
                No recent alerts
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Row 3: Sensor Chart | Failure Trend | Anomaly Bars ── */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Sensor Data & Anomaly Detection */}
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-semibold text-zinc-800">
              Sensor Data & Anomaly Detection
            </h2>
            <div className="flex items-center gap-2">
              <select 
                className="rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 focus:outline-none bg-white"
                value={selectedMachine}
                onChange={(e) => setSelectedMachine(Number(e.target.value))}
              >
                {dropdownMachines.length > 0 ? (
                  dropdownMachines.map((m) => (
                    <option key={m.id} value={m.id}>{m.machine_name}</option>
                  ))
                ) : (
                  <>
                    <option>Pump P-101</option>
                    <option>Motor M-204</option>
                    <option>Compressor C-07</option>
                  </>
                )}
              </select>
              <select className="rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 focus:outline-none bg-white">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
          </div>
          {/* Tabs */}
          <div className="mt-3 flex gap-1">
            {sensorTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSensorTab(tab)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  activeSensorTab === tab
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:bg-zinc-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Chart */}
          <div className="mt-3">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={dashboardData?.sensor_data?.length > 0 ? dashboardData.sensor_data : []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10, fill: "#a1a1aa" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#a1a1aa" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "11px",
                    color: "#fafafa",
                  }}
                />
                <ReferenceLine
                  y={
                    activeSensorTab === "Vibration" ? 18 :
                    activeSensorTab === "Temperature" ? 310 :
                    activeSensorTab === "Pressure" ? 45 :
                    55
                  }
                  stroke="#ef4444"
                  strokeDasharray="8 4"
                  strokeWidth={1.5}
                />
                <Line
                  type="monotone"
                  dataKey={activeSensorTab}
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  name={activeSensorTab}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-1 flex items-center gap-4 text-[10px] text-zinc-400">
              <span className="flex items-center gap-1">
                <span className="inline-block h-0.5 w-4 bg-blue-500" /> {activeSensorTab} (Actual)
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-0.5 w-4 border-t-2 border-dashed border-red-500" />{" "}
                Anomaly Threshold
              </span>
            </div>
          </div>
        </div>

        {/* Failure Probability Trend */}
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-800">
              Failure Probability Trend
            </h2>
            <select className="rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 focus:outline-none bg-white">
              {dropdownMachines.length > 0 ? (
                dropdownMachines.map((m) => (
                  <option key={m.id}>{m.machine_name}</option>
                ))
              ) : (
                <>
                  <option>Compressor C-07</option>
                  <option>Pump P-101</option>
                  <option>Heat Exchanger HX-21</option>
                </>
              )}
            </select>
          </div>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dashboardData?.sensor_data || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#a1a1aa" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#a1a1aa" }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  unit="%"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "11px",
                    color: "#fafafa",
                  }}
                  formatter={(value: number) => [`${value}%`, "Probability"]}
                />
                <Line
                  type="monotone"
                  dataKey="probability"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={(props: Record<string, unknown>) => {
                    const { cx, cy, payload } = props as {
                      cx: number;
                      cy: number;
                      payload: { probability: number };
                    };
                    const p = payload.probability;
                    const color =
                      p >= 60 ? "#ef4444" : p >= 30 ? "#f59e0b" : "#22c55e";
                    return (
                      <circle
                        key={`dot-${cx}-${cy}`}
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill={color}
                        stroke="white"
                        strokeWidth={2}
                      />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Anomalies by Equipment Type */}
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-zinc-800">
            Top Anomalies by Equipment Type
          </h2>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={dashboardData?.anomalies_by_equipment || []}
                layout="vertical"
                margin={{ left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#a1a1aa" }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#71717a" }}
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "11px",
                    color: "#fafafa",
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={16}>
                  {(dashboardData?.anomalies_by_equipment || []).map((entry: any, idx: number) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ─── Row 4: Recommended Actions | Maintenance Calendar ── */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Recommended Actions */}
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <h2 className="text-sm font-semibold text-zinc-800">
                Recommended Actions (AI Insights)
              </h2>
            </div>
            <Link href="/maintenance" className="flex items-center gap-0.5 text-xs font-medium text-blue-600 hover:underline">
              View All <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 space-y-4">
            {dashboardData?.recommended_actions?.length > 0 ? (
              dashboardData.recommended_actions.map((action: any, i: number) => {
                const isWrench = action.icon === "Wrench";
                const iconBg = isWrench ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600";
                const IconComp = isWrench ? Wrench : Lightbulb;
                return (
                  <div
                    key={action.id}
                    className="flex items-center gap-4 rounded-lg border border-zinc-50 p-3"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                    >
                      <IconComp className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-zinc-800">
                        {action.title}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {action.description}
                      </p>
                    </div>
                    <button onClick={(e) => { e.currentTarget.textContent = "Scheduled"; e.currentTarget.classList.add("bg-green-50", "text-green-600", "border-green-200"); e.currentTarget.disabled = true; }} className="shrink-0 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50">
                      {action.actionLabel}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="py-4 text-center text-zinc-400">
                No recommended actions
              </div>
            )}
          </div>
        </div>

        {/* Maintenance Calendar */}
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-800">
              Maintenance Calendar
            </h2>
            <Link href="/maintenance" className="flex items-center gap-0.5 text-xs font-medium text-blue-600 hover:underline">
              View All <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {dashboardData?.calendar_items?.length > 0 ? (
              dashboardData.calendar_items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-lg border border-zinc-50 p-3"
                >
                  {/* Date box */}
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-zinc-50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      {item.date.split(" ")[1]}
                    </span>
                    <span className="text-lg font-bold leading-none text-zinc-800">
                      {item.date.split(" ")[0]}
                    </span>
                  </div>
                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-800">
                      {item.title}
                    </p>
                    <p className="text-xs text-zinc-500">{item.type}</p>
                  </div>
                  {/* Tag */}
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${
                      item.status === "Scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-zinc-400">
                No calendar items
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

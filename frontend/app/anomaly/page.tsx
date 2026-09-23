"use client";

import {
    AlertTriangle,
    CheckCircle2,
    Clock3,
    Filter,
    Search,
    Activity,
    Thermometer,
    Gauge,
    RotateCw,
    Zap,
} from "lucide-react";
import { useState } from "react";

type Anomaly = {
    id: number;
    machine: string;
    sensor: string;
    anomaly: string;
    value: string;
    threshold: string;
    severity: "Critical" | "High" | "Medium";
    status: "Unresolved" | "Investigating" | "Resolved";
    time: string;
};

const anomalies: Anomaly[] = [
    {
        id: 1,
        machine: "CNC-Mill-01",
        sensor: "Vibration",
        anomaly: "Abnormal Vibration",
        value: "7.2 mm/s",
        threshold: "≤ 4.5 mm/s",
        severity: "Critical",
        status: "Unresolved",
        time: "10 min ago",
    },
    {
        id: 2,
        machine: "Lathe-02",
        sensor: "Temperature",
        anomaly: "High Temperature",
        value: "91.6 °C",
        threshold: "≤ 85 °C",
        severity: "High",
        status: "Investigating",
        time: "24 min ago",
    },
    {
        id: 3,
        machine: "Press-03",
        sensor: "Pressure",
        anomaly: "Pressure Deviation",
        value: "9.1 bar",
        threshold: "6–8 bar",
        severity: "High",
        status: "Unresolved",
        time: "42 min ago",
    },
    {
        id: 4,
        machine: "Grinder-04",
        sensor: "Power",
        anomaly: "Power Consumption Spike",
        value: "48.7 kW",
        threshold: "≤ 43 kW",
        severity: "Medium",
        status: "Investigating",
        time: "1 hr ago",
    },
    {
        id: 5,
        machine: "Drill-05",
        sensor: "RPM",
        anomaly: "Abnormal RPM",
        value: "2350 rpm",
        threshold: "≤ 2100 rpm",
        severity: "Medium",
        status: "Resolved",
        time: "2 hrs ago",
    },
];

const sensorIcons = {
    Vibration: Activity,
    Temperature: Thermometer,
    Pressure: Gauge,
    RPM: RotateCw,
    Power: Zap,
};

export default function AnomalyDetectionPage() {
    const [search, setSearch] = useState("");
    const [severityFilter, setSeverityFilter] = useState("All");

    const filteredAnomalies = anomalies.filter((item) => {
        const matchesSearch =
            item.machine.toLowerCase().includes(search.toLowerCase()) ||
            item.sensor.toLowerCase().includes(search.toLowerCase()) ||
            item.anomaly.toLowerCase().includes(search.toLowerCase());

        const matchesSeverity =
            severityFilter === "All" || item.severity === severityFilter;

        return matchesSearch && matchesSeverity;
    });

    const criticalCount = anomalies.filter(
        (item) => item.severity === "Critical"
    ).length;

    const highCount = anomalies.filter(
        (item) => item.severity === "High"
    ).length;

    const unresolvedCount = anomalies.filter(
        (item) => item.status === "Unresolved"
    ).length;

    const resolvedCount = anomalies.filter(
        (item) => item.status === "Resolved"
    ).length;

    return (
        <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Anomaly Detection
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Monitor and analyze abnormal machine behavior detected by the AI
                            system.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
                        <Activity className="h-4 w-4 text-blue-600" />
                        Real-time Monitoring
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Total */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Total Anomalies
                            </p>
                            <p className="mt-2 text-3xl font-bold text-slate-900">
                                {anomalies.length}
                            </p>
                        </div>

                        <div className="rounded-lg bg-blue-50 p-3">
                            <Activity className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                        Detected recently
                    </p>
                </div>

                {/* Critical */}
                <div className="rounded-xl border border-red-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Critical
                            </p>
                            <p className="mt-2 text-3xl font-bold text-red-600">
                                {criticalCount}
                            </p>
                        </div>

                        <div className="rounded-lg bg-red-50 p-3">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                    </div>

                    <p className="mt-3 text-xs text-red-600">
                        Requires immediate attention
                    </p>
                </div>

                {/* High */}
                <div className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                High Severity
                            </p>
                            <p className="mt-2 text-3xl font-bold text-amber-600">
                                {highCount}
                            </p>
                        </div>

                        <div className="rounded-lg bg-amber-50 p-3">
                            <AlertTriangle className="h-6 w-6 text-amber-600" />
                        </div>
                    </div>

                    <p className="mt-3 text-xs text-amber-600">
                        Needs investigation
                    </p>
                </div>

                {/* Unresolved */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Unresolved
                            </p>
                            <p className="mt-2 text-3xl font-bold text-slate-900">
                                {unresolvedCount}
                            </p>
                        </div>

                        <div className="rounded-lg bg-slate-100 p-3">
                            <Clock3 className="h-6 w-6 text-slate-600" />
                        </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                        {resolvedCount} anomalies resolved
                    </p>
                </div>
            </div>

            {/* Main Table */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                {/* Table Header */}
                <div className="border-b border-slate-200 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Detected Anomalies
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Review abnormal sensor readings and their current status.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="text"
                                    placeholder="Search machine or sensor..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white sm:w-64"
                                />
                            </div>

                            {/* Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                <select
                                    value={severityFilter}
                                    onChange={(e) => setSeverityFilter(e.target.value)}
                                    className="rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-sm outline-none focus:border-blue-500"
                                >
                                    <option value="All">All Severity</option>
                                    <option value="Critical">Critical</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">
                        <thead className="bg-slate-50">
                            <tr className="border-b border-slate-200">
                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Machine
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Sensor
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Anomaly
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Reading
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Severity
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Status
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Detected
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredAnomalies.map((item) => {
                                const SensorIcon =
                                    sensorIcons[item.sensor as keyof typeof sensorIcons] ||
                                    Activity;

                                return (
                                    <tr
                                        key={item.id}
                                        className="border-b border-slate-100 transition hover:bg-slate-50"
                                    >
                                        {/* Machine */}
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-slate-900">
                                                {item.machine}
                                            </p>
                                        </td>

                                        {/* Sensor */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="rounded-md bg-blue-50 p-2">
                                                    <SensorIcon className="h-4 w-4 text-blue-600" />
                                                </div>

                                                <span className="text-sm text-slate-700">
                                                    {item.sensor}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Anomaly */}
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-slate-800">
                                                {item.anomaly}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-400">
                                                Threshold: {item.threshold}
                                            </p>
                                        </td>

                                        {/* Reading */}
                                        <td className="px-5 py-4">
                                            <span className="font-semibold text-slate-800">
                                                {item.value}
                                            </span>
                                        </td>

                                        {/* Severity */}
                                        <td className="px-5 py-4">
                                            <SeverityBadge severity={item.severity} />
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            <StatusBadge status={item.status} />
                                        </td>

                                        {/* Time */}
                                        <td className="px-5 py-4 text-sm text-slate-500">
                                            {item.time}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {filteredAnomalies.length === 0 && (
                        <div className="py-12 text-center">
                            <CheckCircle2 className="mx-auto h-10 w-10 text-green-500" />

                            <p className="mt-3 font-medium text-slate-700">
                                No anomalies found
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                Try changing your search or filter.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Info */}
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-2">
                            <Activity className="h-5 w-5 text-blue-600" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-slate-900">
                                AI Anomaly Monitoring
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Sensor readings are continuously monitored to identify
                                abnormal machine behavior.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-green-50 p-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-slate-900">
                                Detection Status
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                {resolvedCount} detected anomalies have been resolved by the
                                maintenance team.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

/* Severity Badge */
function SeverityBadge({
    severity,
}: {
    severity: "Critical" | "High" | "Medium";
}) {
    const styles = {
        Critical: "bg-red-50 text-red-700 border-red-200",
        High: "bg-orange-50 text-orange-700 border-orange-200",
        Medium: "bg-amber-50 text-amber-700 border-amber-200",
    };

    return (
        <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[severity]}`}
        >
            {severity}
        </span>
    );
}

/* Status Badge */
function StatusBadge({
    status,
}: {
    status: "Unresolved" | "Investigating" | "Resolved";
}) {
    const styles = {
        Unresolved: "bg-red-50 text-red-700 border-red-200",
        Investigating: "bg-blue-50 text-blue-700 border-blue-200",
        Resolved: "bg-green-50 text-green-700 border-green-200",
    };

    return (
        <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
        >
            {status}
        </span>
    );
}
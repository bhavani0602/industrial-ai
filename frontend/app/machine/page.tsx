"use client";

import { useState } from "react";

const sensorData = [
    {
        name: "Temperature",
        value: "85.4",
        unit: "°C",
        status: "High",
        icon: "🌡️",
    },
    {
        name: "Vibration",
        value: "7.2",
        unit: "mm/s",
        status: "Critical",
        icon: "〽️",
    },
    {
        name: "Pressure",
        value: "6.8",
        unit: "bar",
        status: "Normal",
        icon: "◉",
    },
    {
        name: "RPM",
        value: "1800",
        unit: "rpm",
        status: "Normal",
        icon: "⚙️",
    },
    {
        name: "Power Consumption",
        value: "42.6",
        unit: "kW",
        status: "Normal",
        icon: "⚡",
    },
];

const trendData = [
    { time: "12 PM", temp: 72, vibration: 4.2, pressure: 6.1 },
    { time: "2 PM", temp: 75, vibration: 4.8, pressure: 6.3 },
    { time: "4 PM", temp: 78, vibration: 5.1, pressure: 6.4 },
    { time: "6 PM", temp: 80, vibration: 5.8, pressure: 6.5 },
    { time: "8 PM", temp: 83, vibration: 6.2, pressure: 6.6 },
    { time: "10 PM", temp: 81, vibration: 6.5, pressure: 6.7 },
    { time: "12 AM", temp: 85, vibration: 7.2, pressure: 6.8 },
];

export default function MachineDetails() {
    const [activeTab, setActiveTab] = useState("Overview");

    return (
        <main className="min-h-screen bg-slate-100 text-slate-900">

            {/* ================= HEADER ================= */}
            <header className="border-b bg-white px-6 py-4">
                <div className="mx-auto max-w-7xl">

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Dashboard / Machines / M-003
                            </p>

                            <h1 className="mt-1 text-2xl font-bold text-slate-900">
                                Machine Details
                            </h1>
                        </div>

                        <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50">
                            ← Back to Machines
                        </button>
                    </div>

                </div>
            </header>


            {/* ================= MAIN CONTENT ================= */}
            <div className="mx-auto max-w-7xl space-y-6 p-6">

                {/* ================= MACHINE OVERVIEW ================= */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="flex flex-col gap-6 md:flex-row">

                        {/* MACHINE IMAGE */}
                        <div className="flex h-52 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-200 md:w-72">
                            <img
                                src="/machinery.jpg"
                                alt="Industrial machine"
                                className="h-full w-full object-cover"
                            />
                        </div>


                        {/* MACHINE INFORMATION */}
                        <div className="flex-1">

                            <div className="flex flex-col justify-between gap-4 sm:flex-row">

                                <div>
                                    <p className="text-sm font-medium text-blue-600">
                                        MACHINE ID: M-003
                                    </p>

                                    <h2 className="mt-1 text-3xl font-bold">
                                        Compressor C
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Industrial Air Compressor
                                    </p>
                                </div>


                                {/* STATUS */}
                                <div className="flex h-fit items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                                    Critical
                                </div>

                            </div>


                            {/* MACHINE DETAILS */}
                            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">

                                <div>
                                    <p className="text-xs text-slate-500">Location</p>
                                    <p className="mt-1 font-semibold">Plant 1 - Unit 3</p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">Machine Type</p>
                                    <p className="mt-1 font-semibold">Compressor</p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">Last Updated</p>
                                    <p className="mt-1 font-semibold">2 minutes ago</p>
                                </div>

                            </div>

                        </div>

                    </div>
                </section>


                {/* ================= TABS ================= */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                    <div className="flex min-w-max">

                        {[
                            "Overview",
                            "Sensors",
                            "Alerts",
                            "AI Prediction",
                            "Maintenance History",
                        ].map((tab) => (

                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 text-sm font-medium transition ${activeTab === tab
                                        ? "border-b-2 border-blue-600 text-blue-600"
                                        : "text-slate-500 hover:text-slate-900"
                                    }`}
                            >
                                {tab}
                            </button>

                        ))}

                    </div>
                </div>


                {/* ================= OVERVIEW ================= */}
                {activeTab === "Overview" && (
                    <div className="space-y-6">

                        {/* SENSOR CARDS */}
                        <section>

                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">
                                        Live Sensor Data
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Current readings from machine sensors
                                    </p>
                                </div>

                                <span className="text-xs text-slate-500">
                                    ● Updated 2 min ago
                                </span>
                            </div>


                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

                                {sensorData.map((sensor) => (

                                    <div
                                        key={sensor.name}
                                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                                    >

                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl">
                                                {sensor.icon}
                                            </span>

                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-medium ${sensor.status === "Critical"
                                                        ? "bg-red-100 text-red-600"
                                                        : sensor.status === "High"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-green-100 text-green-600"
                                                    }`}
                                            >
                                                {sensor.status}
                                            </span>
                                        </div>

                                        <p className="mt-4 text-sm text-slate-500">
                                            {sensor.name}
                                        </p>

                                        <p className="mt-1 text-2xl font-bold">
                                            {sensor.value}
                                            <span className="ml-1 text-sm font-medium text-slate-500">
                                                {sensor.unit}
                                            </span>
                                        </p>

                                    </div>

                                ))}

                            </div>

                        </section>


                        {/* CHART + MACHINE INFO */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                            {/* SENSOR TREND */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <h2 className="text-lg font-bold">
                                            Sensor Trends
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            Last 12 hours
                                        </p>
                                    </div>

                                    <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                                        <option>Last 12 hours</option>
                                        <option>Last 24 hours</option>
                                        <option>Last 7 days</option>
                                    </select>

                                </div>


                                {/* SIMPLE CHART */}
                                <div className="mt-6">

                                    <div className="relative h-64 w-full border-l border-b border-slate-300">

                                        {/* Horizontal grid lines */}
                                        <div className="absolute left-0 right-0 top-0 border-t border-dashed border-slate-200"></div>
                                        <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-slate-200"></div>
                                        <div className="absolute left-0 right-0 top-2/4 border-t border-dashed border-slate-200"></div>
                                        <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-slate-200"></div>


                                        {/* SVG LINE CHART */}
                                        <svg
                                            viewBox="0 0 700 250"
                                            className="h-full w-full"
                                            preserveAspectRatio="none"
                                        >

                                            {/* Temperature */}
                                            <polyline
                                                points="0,175 115,160 230,145 345,125 460,95 575,110 700,70"
                                                fill="none"
                                                stroke="currentColor"
                                                className="text-red-500"
                                                strokeWidth="3"
                                            />

                                            {/* Vibration */}
                                            <polyline
                                                points="0,205 115,190 230,180 345,165 460,145 575,135 700,105"
                                                fill="none"
                                                stroke="currentColor"
                                                className="text-blue-500"
                                                strokeWidth="3"
                                            />

                                            {/* Pressure */}
                                            <polyline
                                                points="0,220 115,215 230,205 345,200 460,190 575,185 700,175"
                                                fill="none"
                                                stroke="currentColor"
                                                className="text-green-500"
                                                strokeWidth="3"
                                            />

                                        </svg>

                                    </div>


                                    {/* TIME LABELS */}
                                    <div className="mt-2 flex justify-between text-xs text-slate-400">
                                        {trendData.map((item) => (
                                            <span key={item.time}>{item.time}</span>
                                        ))}
                                    </div>


                                    {/* LEGEND */}
                                    <div className="mt-5 flex flex-wrap gap-5 text-sm">

                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                                            Temperature
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                                            Vibration
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                                            Pressure
                                        </div>

                                    </div>

                                </div>

                            </section>


                            {/* MACHINE HEALTH */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                <h2 className="text-lg font-bold">
                                    Machine Health
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Current machine condition
                                </p>


                                {/* HEALTH SCORE */}
                                <div className="mt-6 flex items-center justify-center">

                                    <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border-[12px] border-red-500">

                                        <span className="text-4xl font-bold">
                                            38%
                                        </span>

                                        <span className="text-xs text-red-500">
                                            Health Score
                                        </span>

                                    </div>

                                </div>


                                <div className="mt-6 space-y-4">

                                    <div className="flex justify-between">
                                        <span className="text-sm text-slate-500">
                                            Operating Hours
                                        </span>

                                        <span className="font-semibold">
                                            8,426 hrs
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-sm text-slate-500">
                                            Last Maintenance
                                        </span>

                                        <span className="font-semibold">
                                            18 Aug 2026
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-sm text-slate-500">
                                            Next Maintenance
                                        </span>

                                        <span className="font-semibold">
                                            12 Sep 2026
                                        </span>
                                    </div>

                                </div>

                            </section>

                        </div>


                        {/* ALERTS + PREDICTION */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                            {/* RECENT ALERTS */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <h2 className="text-lg font-bold">
                                        Recent Alerts
                                    </h2>

                                    <button className="text-sm font-medium text-blue-600">
                                        View All
                                    </button>

                                </div>


                                <div className="mt-5 space-y-4">

                                    <div className="flex gap-4 rounded-lg bg-red-50 p-4">

                                        <div className="text-xl">🔴</div>

                                        <div>
                                            <p className="font-semibold text-red-700">
                                                High Vibration Detected
                                            </p>

                                            <p className="mt-1 text-sm text-slate-600">
                                                Vibration exceeded the recommended threshold.
                                            </p>

                                            <p className="mt-2 text-xs text-slate-400">
                                                2 minutes ago
                                            </p>
                                        </div>

                                    </div>


                                    <div className="flex gap-4 rounded-lg bg-yellow-50 p-4">

                                        <div className="text-xl">⚠️</div>

                                        <div>
                                            <p className="font-semibold text-yellow-700">
                                                Temperature Warning
                                            </p>

                                            <p className="mt-1 text-sm text-slate-600">
                                                Temperature is above the normal operating range.
                                            </p>

                                            <p className="mt-2 text-xs text-slate-400">
                                                15 minutes ago
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </section>


                            {/* AI PREDICTION */}
                            <section className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <h2 className="text-lg font-bold">
                                            AI Failure Prediction
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            Latest ML model prediction
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                                        High Risk
                                    </span>

                                </div>


                                <div className="mt-5 rounded-xl bg-slate-50 p-5">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Predicted Failure
                                            </p>

                                            <p className="mt-1 text-xl font-bold">
                                                Bearing Failure
                                            </p>
                                        </div>

                                        <div className="text-right">

                                            <p className="text-sm text-slate-500">
                                                Confidence
                                            </p>

                                            <p className="text-2xl font-bold text-red-600">
                                                92%
                                            </p>

                                        </div>

                                    </div>


                                    <div className="mt-5 border-t pt-4">

                                        <p className="text-sm font-semibold">
                                            Possible Cause
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            High vibration and increased temperature have
                                            been detected for a prolonged period. This
                                            pattern may indicate bearing wear or damage.
                                        </p>

                                    </div>


                                    <div className="mt-5 border-t pt-4">

                                        <p className="text-sm font-semibold">
                                            Recommended Action
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            Inspect the bearing and lubrication system.
                                            Replace the bearing if severe wear is found.
                                        </p>

                                    </div>

                                </div>


                                <button className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                                    View Full AI Prediction
                                </button>

                            </section>

                        </div>

                    </div>
                )}


                {/* ================= SENSORS TAB ================= */}
                {activeTab === "Sensors" && (

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <h2 className="text-xl font-bold">
                            Machine Sensors
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Detailed information about connected sensors
                        </p>

                        <div className="mt-6 overflow-x-auto">

                            <table className="w-full text-left text-sm">

                                <thead className="border-b bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3">Sensor</th>
                                        <th className="px-4 py-3">Current Value</th>
                                        <th className="px-4 py-3">Unit</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {sensorData.map((sensor) => (

                                        <tr
                                            key={sensor.name}
                                            className="border-b last:border-0"
                                        >

                                            <td className="px-4 py-4 font-medium">
                                                {sensor.name}
                                            </td>

                                            <td className="px-4 py-4 font-semibold">
                                                {sensor.value}
                                            </td>

                                            <td className="px-4 py-4 text-slate-500">
                                                {sensor.unit}
                                            </td>

                                            <td className="px-4 py-4">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${sensor.status === "Critical"
                                                            ? "bg-red-100 text-red-600"
                                                            : sensor.status === "High"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-green-100 text-green-600"
                                                        }`}
                                                >
                                                    {sensor.status}
                                                </span>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </section>

                )}


                {/* ================= ALERTS TAB ================= */}
                {activeTab === "Alerts" && (

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <h2 className="text-xl font-bold">
                            Machine Alerts
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Recent alerts generated for this machine
                        </p>

                        <div className="mt-6 space-y-4">

                            <div className="rounded-xl border border-red-200 bg-red-50 p-5">

                                <div className="flex gap-4">

                                    <span className="text-xl">🔴</span>

                                    <div>

                                        <h3 className="font-semibold text-red-700">
                                            High Vibration Detected
                                        </h3>

                                        <p className="mt-2 text-sm text-slate-600">
                                            Current vibration level is 7.2 mm/s,
                                            which is above the recommended threshold.
                                        </p>

                                        <p className="mt-2 text-xs text-slate-400">
                                            2 minutes ago
                                        </p>

                                    </div>

                                </div>

                            </div>


                            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">

                                <div className="flex gap-4">

                                    <span className="text-xl">⚠️</span>

                                    <div>

                                        <h3 className="font-semibold text-yellow-700">
                                            High Temperature
                                        </h3>

                                        <p className="mt-2 text-sm text-slate-600">
                                            Temperature has reached 85.4°C.
                                        </p>

                                        <p className="mt-2 text-xs text-slate-400">
                                            15 minutes ago
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                )}


                {/* ================= AI PREDICTION TAB ================= */}
                {activeTab === "AI Prediction" && (

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="flex flex-col justify-between gap-4 sm:flex-row">

                            <div>
                                <h2 className="text-xl font-bold">
                                    AI Failure Prediction
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Prediction generated from machine sensor data
                                </p>
                            </div>

                            <span className="w-fit rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                                HIGH RISK
                            </span>

                        </div>


                        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">

                            <div className="rounded-xl bg-red-50 p-5">

                                <p className="text-sm text-slate-500">
                                    Failure Risk
                                </p>

                                <p className="mt-2 text-3xl font-bold text-red-600">
                                    92%
                                </p>

                            </div>

                            <div className="rounded-xl bg-slate-50 p-5">

                                <p className="text-sm text-slate-500">
                                    Predicted Failure
                                </p>

                                <p className="mt-2 text-xl font-bold">
                                    Bearing Failure
                                </p>

                            </div>

                            <div className="rounded-xl bg-slate-50 p-5">

                                <p className="text-sm text-slate-500">
                                    Estimated Downtime
                                </p>

                                <p className="mt-2 text-xl font-bold">
                                    4 - 6 Hours
                                </p>

                            </div>

                        </div>


                        <div className="mt-6 rounded-xl bg-slate-50 p-6">

                            <h3 className="font-semibold">
                                Recommended Action
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Inspect the bearing and lubrication system.
                                Check alignment and replace the bearing if
                                severe wear is detected.
                            </p>

                        </div>

                    </section>

                )}


                {/* ================= MAINTENANCE TAB ================= */}
                {activeTab === "Maintenance History" && (

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <h2 className="text-xl font-bold">
                            Maintenance History
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Previous maintenance activities for this machine
                        </p>


                        <div className="mt-6 space-y-5">

                            <div className="border-l-4 border-blue-500 pl-5">

                                <p className="text-sm text-slate-500">
                                    18 August 2026
                                </p>

                                <h3 className="mt-1 font-semibold">
                                    Routine Inspection
                                </h3>

                                <p className="mt-1 text-sm text-slate-600">
                                    General inspection and lubrication performed.
                                </p>

                            </div>


                            <div className="border-l-4 border-green-500 pl-5">

                                <p className="text-sm text-slate-500">
                                    10 July 2026
                                </p>

                                <h3 className="mt-1 font-semibold">
                                    Bearing Check
                                </h3>

                                <p className="mt-1 text-sm text-slate-600">
                                    Bearing condition inspected. No critical
                                    issues detected.
                                </p>

                            </div>


                            <div className="border-l-4 border-slate-400 pl-5">

                                <p className="text-sm text-slate-500">
                                    22 May 2026
                                </p>

                                <h3 className="mt-1 font-semibold">
                                    Filter Replacement
                                </h3>

                                <p className="mt-1 text-sm text-slate-600">
                                    Air filter replaced during scheduled maintenance.
                                </p>

                            </div>

                        </div>

                    </section>

                )}

            </div>

        </main>
    );
}
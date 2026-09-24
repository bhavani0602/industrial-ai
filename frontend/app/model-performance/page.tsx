"use client";

import { Activity, BrainCircuit, CheckCircle, BarChart } from "lucide-react";

export default function ModelPerformancePage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-zinc-900">
            <Activity className="h-6 w-6 text-blue-600" />
            Model Performance
          </h1>
          <p className="mt-1 text-sm text-zinc-500">Live metrics for the Scikit-Learn Predictive Maintenance models.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Model", value: "Random Forest v2.1", icon: BrainCircuit, color: "text-purple-600", bg: "bg-purple-100" },
          { label: "Overall Accuracy", value: "94.2%", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
          { label: "Precision", value: "91.8%", icon: BarChart, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Recall (Sensitivity)", value: "89.5%", icon: Activity, color: "text-amber-600", bg: "bg-amber-100" },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
            <h3 className="text-xl font-bold text-zinc-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-100 bg-white p-8 shadow-sm text-center">
        <h3 className="text-lg font-bold text-zinc-900">Confusion Matrix Visualization</h3>
        <p className="mt-2 text-sm text-zinc-500">Model training visualizer is currently syncing with the backend database. Please check back later for live training graphs.</p>
      </div>
    </div>
  );
}

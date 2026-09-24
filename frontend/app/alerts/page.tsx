"use client";

import { Bell, AlertCircle, Info, CheckCircle2 } from "lucide-react";

export default function AlertsPage() {
  const alerts = [
    { id: 1, title: "High Vibration Detected", machine: "CNC-Mill-01", time: "10 mins ago", type: "critical" },
    { id: 2, title: "Temperature Exceeds Threshold", machine: "Lathe-02", time: "1 hour ago", type: "warning" },
    { id: 3, title: "Routine Maintenance Due", machine: "Press-03", time: "3 hours ago", type: "info" },
    { id: 4, title: "Tool Wear approaching limit", machine: "Grinder-04", time: "5 hours ago", type: "warning" },
    { id: 5, title: "System Update Complete", machine: "All Systems", time: "1 day ago", type: "success" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-zinc-900">
            <Bell className="h-6 w-6 text-blue-600" />
            Alerts & Notifications
          </h1>
          <p className="mt-1 text-sm text-zinc-500">System-wide alerts and maintenance notifications.</p>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              alert.type === 'critical' ? 'bg-red-100 text-red-600' :
              alert.type === 'warning' ? 'bg-amber-100 text-amber-600' :
              alert.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              {alert.type === 'critical' && <AlertCircle className="h-5 w-5" />}
              {alert.type === 'warning' && <AlertCircle className="h-5 w-5" />}
              {alert.type === 'info' && <Info className="h-5 w-5" />}
              {alert.type === 'success' && <CheckCircle2 className="h-5 w-5" />}
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-zinc-900">{alert.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">Asset: <span className="font-semibold text-zinc-700">{alert.machine}</span></p>
            </div>
            <span className="text-xs font-medium text-zinc-400">{alert.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

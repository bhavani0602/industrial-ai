"use client";

import { useEffect, useState } from "react";
import { Zap, AlertTriangle, Clock, Target } from "lucide-react";

interface Anomaly {
  id: number;
  machine_id: number;
  anomaly_score: number;
  anomaly_type: string;
  description: string;
  detected_at: string;
  status: string;
}

export default function AnomalyDetectionPage() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnomalies() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/anomalies");
        if (!response.ok) {
          throw new Error("Failed to fetch anomalies");
        }
        const data = await response.json();
        setAnomalies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchAnomalies();
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-zinc-900">
            <Zap className="h-6 w-6 text-blue-600" />
            Anomaly Detection Log
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Real-time tracking of machine failures and irregular sensor patterns detected by the ETL pipeline.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Anomalies</p>
              <h3 className="text-2xl font-bold text-zinc-900">{anomalies.length}</h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Pending Investigation</p>
              <h3 className="text-2xl font-bold text-zinc-900">
                {anomalies.filter((a) => a.status !== "resolved").length}
              </h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Avg Anomaly Score</p>
              <h3 className="text-2xl font-bold text-zinc-900">
                {anomalies.length > 0 
                  ? (anomalies.reduce((acc, curr) => acc + curr.anomaly_score, 0) / anomalies.length).toFixed(2) 
                  : "0.00"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-xl border border-zinc-100 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-zinc-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-zinc-800">Detected Events</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50/50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-5 py-3">Machine ID</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3">Score</th>
                <th className="px-5 py-3">Detected At</th>
                <th className="px-5 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-zinc-500">
                    Loading anomalies from backend API...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : anomalies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-zinc-500">
                    No anomalies detected in the database.
                  </td>
                </tr>
              ) : (
                anomalies.map((anomaly) => (
                  <tr key={anomaly.id} className="transition-colors hover:bg-zinc-50/50">
                    <td className="px-5 py-3 font-bold text-zinc-900">
                      #{anomaly.machine_id}
                    </td>
                    <td className="px-5 py-3">
                      <span className="rounded-md bg-red-50 px-2 py-1 text-[11px] font-bold text-red-700">
                        {anomaly.anomaly_type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-zinc-600">
                      {anomaly.description}
                    </td>
                    <td className="px-5 py-3 font-mono text-zinc-700">
                      {anomaly.anomaly_score.toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-zinc-500 text-xs">
                      {new Date(anomaly.detected_at).toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                          anomaly.status === "investigating" || anomaly.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {anomaly.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

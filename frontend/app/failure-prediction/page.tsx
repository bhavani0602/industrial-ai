"use client";

import { useEffect, useState } from "react";
import { Target, Activity, ShieldAlert, TrendingUp } from "lucide-react";

interface Prediction {
  id: number;
  machine_id: number;
  failure_probability: number;
  predicted_failure: boolean;
  risk_level: string;
  model_version: string;
  created_at: string;
}

export default function FailurePredictionPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPredictions() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/predictions");
        if (response.ok) {
          const data = await response.json();
          setPredictions(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPredictions();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-zinc-900">
            <Target className="h-6 w-6 text-blue-600" />
            Failure Prediction
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            AI-driven forecasts identifying which machines are most likely to fail based on historical sensor data.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">High Risk Assets</p>
              <h3 className="text-2xl font-bold text-zinc-900">
                {predictions.filter(p => p.risk_level.toLowerCase() === 'high').length}
              </h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Active Predictions</p>
              <h3 className="text-2xl font-bold text-zinc-900">{predictions.length}</h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Model Accuracy</p>
              <h3 className="text-2xl font-bold text-zinc-900">94.2%</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-100 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-zinc-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-zinc-800">Forecasted Failures</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50/50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-5 py-3">Machine ID</th>
                <th className="px-5 py-3">Probability</th>
                <th className="px-5 py-3">Risk Level</th>
                <th className="px-5 py-3">Model Version</th>
                <th className="px-5 py-3 text-right">Predicted On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-zinc-500">Loading AI predictions...</td>
                </tr>
              ) : predictions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-zinc-500">No predictions found in the database.</td>
                </tr>
              ) : (
                predictions.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-zinc-50/50">
                    <td className="px-5 py-3 font-bold text-zinc-900">#{p.machine_id}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-zinc-100">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${p.failure_probability}%`,
                              backgroundColor: p.failure_probability >= 70 ? "#ef4444" : p.failure_probability >= 40 ? "#f59e0b" : "#22c55e",
                            }}
                          />
                        </div>
                        <span className="text-xs font-bold text-zinc-700">{p.failure_probability.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${
                        p.risk_level.toLowerCase() === 'high' ? 'bg-red-100 text-red-700' :
                        p.risk_level.toLowerCase() === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {p.risk_level}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-zinc-500 font-mono text-xs">{p.model_version}</td>
                    <td className="px-5 py-3 text-right text-zinc-500 text-xs">{new Date(p.created_at).toLocaleDateString()}</td>
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

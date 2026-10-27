"use client";

import { useState } from "react";
import { Target } from "lucide-react";

export default function PredictPage() {
  const [form, setForm] = useState({
    machine_type: "H",
    air_temperature: "303.4",
    process_temperature: "313.5",
    rpm: "1300",
    torque: "65",
    tool_wear: "230",
  });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handlePredict() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          machine_type: form.machine_type,
          air_temperature: Number(form.air_temperature),
          process_temperature: Number(form.process_temperature),
          rpm: Number(form.rpm),
          torque: Number(form.torque),
          tool_wear: Number(form.tool_wear),
        }),
      });
      if (!res.ok) throw new Error("Prediction failed. Check the values.");
      setResult(await res.json());
    } catch (e: any) {
      setResult(null);
      setError(e.message || "Could not reach the backend.");
    } finally {
      setLoading(false);
    }
  }

  const risk = result?.risk_level;
  const riskStyle =
    risk === "High"
      ? "bg-red-100 text-red-700"
      : risk === "Medium"
      ? "bg-amber-100 text-amber-700"
      : "bg-emerald-100 text-emerald-700";
  const barColor =
    risk === "High" ? "#ef4444" : risk === "Medium" ? "#f59e0b" : "#22c55e";
  const textColor =
    risk === "High" ? "text-red-600" : risk === "Medium" ? "text-amber-600" : "text-emerald-600";

  const inputClass =
    "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "mb-1 mt-4 block text-xs font-semibold text-zinc-600";

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-zinc-900">
          <Target className="h-6 w-6 text-blue-600" />
          Predict Machine Failure
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Enter a machine&apos;s sensor values and the trained Random Forest model estimates its failure risk.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-100 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-zinc-800">Machine inputs</h2>

          <label className={labelClass}>Machine type</label>
          <select
            className={inputClass}
            value={form.machine_type}
            onChange={(e) => update("machine_type", e.target.value)}
          >
            <option value="L">L (Low quality)</option>
            <option value="M">M (Medium quality)</option>
            <option value="H">H (High quality)</option>
          </select>

          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label className={labelClass}>Air temperature (K)</label>
              <input className={inputClass} type="number" step="any" value={form.air_temperature} onChange={(e) => update("air_temperature", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Process temperature (K)</label>
              <input className={inputClass} type="number" step="any" value={form.process_temperature} onChange={(e) => update("process_temperature", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Rotational speed (rpm)</label>
              <input className={inputClass} type="number" step="any" value={form.rpm} onChange={(e) => update("rpm", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Torque (Nm)</label>
              <input className={inputClass} type="number" step="any" value={form.torque} onChange={(e) => update("torque", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Tool wear (min)</label>
              <input className={inputClass} type="number" step="any" value={form.tool_wear} onChange={(e) => update("tool_wear", e.target.value)} />
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Predicting..." : "Predict failure risk"}
          </button>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>

        <div className="rounded-xl border border-zinc-100 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-zinc-800">Result</h2>
          {!result ? (
            <p className="mt-6 text-sm text-zinc-500">
              Fill in the values and click &quot;Predict failure risk&quot; to see the model&apos;s result here.
            </p>
          ) : (
            <div>
              <p className="mt-4 text-sm text-zinc-500">Failure probability</p>
              <p className={`mt-1 text-5xl font-extrabold ${textColor}`}>
                {result.failure_probability}%
              </p>
              <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase ${riskStyle}`}>
                {risk} risk
              </span>
              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${result.failure_probability}%`, backgroundColor: barColor }}
                />
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                Low &lt; 30% &nbsp;·&nbsp; Medium 30–70% &nbsp;·&nbsp; High &gt; 70%
              </p>
              <div className="mt-6 flex justify-between border-t border-zinc-100 pt-4 text-sm text-zinc-800">
                <span>Machine health</span>
                <b>{result.machine_health} / 100</b>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import { Server, Activity, Power, AlertTriangle, ShieldCheck } from "lucide-react";

interface Machine {
  id: number;
  machine_name: string;
  machine_type: string;
  location: string | null;
  status: string;
  installation_date: string | null;
}

export default function EquipmentPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMachines() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/machines");
        if (!response.ok) {
          throw new Error("Failed to fetch machines");
        }
        const data = await response.json();
        setMachines(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchMachines();
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-zinc-900">
            <Server className="h-6 w-6 text-blue-600" />
            Equipment Inventory
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Real-time status of all active machinery across the plant floor.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Machines</p>
              <h3 className="text-2xl font-bold text-zinc-900">{machines.length}</h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Active</p>
              <h3 className="text-2xl font-bold text-zinc-900">
                {machines.filter((m) => m.status && m.status.toLowerCase().includes("active")).length}
              </h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Inactive / Maint.</p>
              <h3 className="text-2xl font-bold text-zinc-900">
                {machines.filter((m) => !m.status || !m.status.toLowerCase().includes("active")).length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-xl border border-zinc-100 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-zinc-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-zinc-800">All Equipment</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50/50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-5 py-3">Machine ID</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-zinc-500">
                    Loading equipment data from your database...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : (
                machines.map((machine) => (
                  <tr key={machine.id} className="transition-colors hover:bg-zinc-50/50">
                    <td className="px-5 py-3 font-medium text-zinc-900">
                      #{machine.id}
                    </td>
                    <td className="px-5 py-3 text-zinc-700">{machine.machine_name}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-medium text-zinc-600">
                        {machine.machine_type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-zinc-500">
                      {machine.location || "Unassigned"}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${
                          machine.status.toLowerCase() === "active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            machine.status.toLowerCase() === "active"
                              ? "bg-emerald-500"
                              : "bg-red-500"
                          }`}
                        />
                        {machine.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link 
                        href="/machine"
                        className="text-xs font-medium text-blue-600 hover:underline"
                      >
                        View Details
                      </Link>
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

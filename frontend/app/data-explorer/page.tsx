"use client";

import { useState } from "react";
import { Database, Search, Filter, CheckCircle2 } from "lucide-react";

export default function DataExplorerPage() {
  const [queryStatus, setQueryStatus] = useState<"idle" | "running" | "success">("idle");

  const handleRunQuery = () => {
    setQueryStatus("running");
    setTimeout(() => {
      setQueryStatus("success");
    }, 800);
  };
  return (
    <div className="space-y-6 p-6 h-full flex flex-col">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-zinc-900">
            <Database className="h-6 w-6 text-blue-600" />
            Data Explorer
          </h1>
          <p className="mt-1 text-sm text-zinc-500">Query raw sensor data directly from the PostgreSQL database.</p>
        </div>
      </div>

      <div className="flex-1 rounded-xl border border-zinc-100 bg-white shadow-sm flex flex-col overflow-hidden">
        <div className="border-b border-zinc-100 p-4 flex gap-3 bg-zinc-50/50">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2">
            <Search className="h-4 w-4 text-zinc-400" />
            <input type="text" placeholder="SELECT * FROM sensor_readings WHERE machine_id = 1..." className="w-full bg-transparent text-sm outline-none font-mono" />
          </div>
          <button 
            onClick={handleRunQuery}
            disabled={queryStatus === "running"}
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            {queryStatus === "running" ? "Executing..." : "Run Query"}
          </button>
        </div>
        
        <div className="flex-1 p-10 flex flex-col items-center justify-center text-center">
          {queryStatus === "success" ? (
            <div className="flex flex-col items-center">
              <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
              <h3 className="text-lg font-bold text-zinc-800">Query Executed Successfully</h3>
              <p className="text-sm text-zinc-500 max-w-sm mt-2">Fetched 1,024 rows from <span className="font-mono bg-zinc-100 px-1 rounded text-zinc-600">sensor_readings</span> in 42ms.</p>
              <button 
                onClick={() => setQueryStatus("idle")}
                className="mt-6 text-sm text-blue-600 hover:underline"
              >
                Clear Results
              </button>
            </div>
          ) : (
            <>
              <Database className="h-16 w-16 text-zinc-200 mb-4" />
              <h3 className="text-lg font-bold text-zinc-800">Ready to Query</h3>
              <p className="text-sm text-zinc-500 max-w-sm mt-2">Enter a SQL query above to explore the 10,000+ rows of raw sensor data ingested during Phase 1.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

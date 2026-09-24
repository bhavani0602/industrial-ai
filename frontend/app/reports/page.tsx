"use client";

import { FileBarChart, Download, FileText, Calendar } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { id: 1, name: "Q3 Maintenance Summary", date: "Sept 15, 2026", size: "2.4 MB", type: "PDF" },
    { id: 2, name: "Anomaly Detection Log - August", date: "Sept 01, 2026", size: "1.1 MB", type: "CSV" },
    { id: 3, name: "Predictive Model Accuracy Report", date: "Aug 28, 2026", size: "4.5 MB", type: "PDF" },
    { id: 4, name: "Factory Floor Power Consumption", date: "Aug 15, 2026", size: "3.2 MB", type: "XLSX" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-zinc-900">
            <FileBarChart className="h-6 w-6 text-blue-600" />
            Generated Reports
          </h1>
          <p className="mt-1 text-sm text-zinc-500">Download and view historical maintenance and AI performance reports.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
          <Calendar className="h-4 w-4" /> Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reports.map((report) => (
          <div key={report.id} className="flex flex-col justify-between rounded-xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-zinc-900 line-clamp-2">{report.name}</h3>
              <p className="mt-2 text-xs text-zinc-500">{report.date} • {report.size}</p>
            </div>
            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900">
              <Download className="h-4 w-4" /> Download {report.type}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

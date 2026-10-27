"use client";

import { MessageSquare } from "lucide-react";

const RAG_URL = "http://localhost:8501";

export default function AssistantPage() {
  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-zinc-900">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            Maintenance Assistant
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Ask questions about industrial maintenance. Answers come from the project&apos;s documents (RAG module).
          </p>
        </div>
        <a
          href={RAG_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50"
        >
          Open in new tab
        </a>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-sm">
        <iframe
          src={`${RAG_URL}/?embed=true`}
          title="Maintenance Assistant"
          className="w-full"
          style={{ height: "calc(100vh - 220px)", minHeight: 480, border: 0 }}
        />
      </div>

      <p className="text-xs text-zinc-400">
        If this area is blank, start the RAG app first: activate its environment in the rag folder and run{" "}
        <code>streamlit run app.py</code>.
      </p>
    </div>
  );
}
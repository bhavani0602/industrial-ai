import { Wrench, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UnderConstruction({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100/50 text-blue-600 shadow-inner">
        <Wrench className="h-10 w-10" />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900">
        {title} — Coming Soon
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-zinc-500">
        This module is currently in active development for Phase 2. The Backend
        and Machine Learning teams are currently wiring up the data pipelines for
        this feature.
      </p>
      <Link
        href="/"
        className="mt-8 flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Dashboard
      </Link>
    </div>
  );
}

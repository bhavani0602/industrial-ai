"use client";

import {
    AlertTriangle,
    ArrowLeft,
    CheckCircle2,
    Clock,
    Gauge,
    Thermometer,
    Activity,
    Wrench,
    Zap,
    ShieldAlert,
} from "lucide-react";

export default function PredictionPage() {
    return (
        <div className="min-h-screen space-y-6 bg-zinc-50 p-6 lg:p-8 dark:bg-zinc-950">
            {/* Header */}
            <div>
                <div className="mb-3 flex items-center gap-2 text-sm text-zinc-500">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Machine Details</span>
                    <span>/</span>
                    <span>AI Prediction</span>
                </div>

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                            AI Prediction & Recommendation
                        </h1>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            AI-powered failure prediction and maintenance recommendation.
                        </p>
                    </div>

                    <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-xs text-zinc-500">Machine</p>
                        <p className="font-semibold text-zinc-900 dark:text-white">
                            M-003 · Compressor C
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Prediction Summary */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Risk Card */}
                <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-900/40 dark:bg-zinc-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-zinc-500">
                                Failure Risk
                            </p>
                            <h2 className="mt-2 text-4xl font-bold text-red-600 dark:text-red-400">
                                HIGH
                            </h2>
                        </div>

                        <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                            <ShieldAlert className="h-7 w-7 text-red-600 dark:text-red-400" />
                        </div>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <div className="h-full w-[92%] rounded-full bg-red-500" />
                    </div>

                    <p className="mt-2 text-right text-sm font-semibold text-red-600">
                        92% Risk
                    </p>
                </div>

                {/* Confidence Card */}
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-zinc-500">
                                Model Confidence
                            </p>
                            <h2 className="mt-2 text-4xl font-bold text-zinc-900 dark:text-white">
                                92%
                            </h2>
                        </div>

                        <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                            <Gauge className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>

                    <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
                        Prediction generated from current machine sensor readings.
                    </p>
                </div>

                {/* Predicted Failure */}
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-zinc-500">
                                Predicted Failure
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
                                Bearing Failure
                            </h2>
                        </div>

                        <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
                            <AlertTriangle className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                        </div>
                    </div>

                    <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
                        Immediate inspection is recommended.
                    </p>
                </div>
            </div>

            {/* Sensor Evidence */}
            <section className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
                    <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
                        Sensor Evidence
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Current readings contributing to the prediction.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-5">
                    {/* Temperature */}
                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
                        <div className="flex items-center gap-2">
                            <Thermometer className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-zinc-500">Temperature</span>
                        </div>
                        <p className="mt-2 text-xl font-bold text-red-600">85.4°C</p>
                        <p className="text-xs text-red-500">High</p>
                    </div>

                    {/* Vibration */}
                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
                        <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-zinc-500">Vibration</span>
                        </div>
                        <p className="mt-2 text-xl font-bold text-red-600">7.2 mm/s</p>
                        <p className="text-xs text-red-500">Critical</p>
                    </div>

                    {/* Pressure */}
                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
                        <div className="flex items-center gap-2">
                            <Gauge className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm text-zinc-500">Pressure</span>
                        </div>
                        <p className="mt-2 text-xl font-bold text-zinc-900 dark:text-white">
                            6.8 bar
                        </p>
                        <p className="text-xs text-emerald-500">Normal</p>
                    </div>

                    {/* RPM */}
                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
                        <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm text-zinc-500">RPM</span>
                        </div>
                        <p className="mt-2 text-xl font-bold text-zinc-900 dark:text-white">
                            1800
                        </p>
                        <p className="text-xs text-emerald-500">Normal</p>
                    </div>

                    {/* Power */}
                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
                        <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm text-zinc-500">Power</span>
                        </div>
                        <p className="mt-2 text-xl font-bold text-zinc-900 dark:text-white">
                            42.6 kW
                        </p>
                        <p className="text-xs text-emerald-500">Normal</p>
                    </div>
                </div>
            </section>

            {/* Explanation + Causes */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* AI Explanation */}
                <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
                            AI Explanation
                        </h2>
                    </div>

                    <p className="mt-4 leading-7 text-sm text-zinc-600 dark:text-zinc-300">
                        The system detected abnormal machine conditions. Elevated
                        temperature and high vibration levels indicate increased stress
                        around the bearing assembly. Combined sensor patterns suggest a
                        high probability of bearing-related failure.
                    </p>

                    <div className="mt-5 rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
                        <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                            Why this matters
                        </p>
                        <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                            Continuing operation without inspection may increase the risk of
                            equipment downtime.
                        </p>
                    </div>
                </section>

                {/* Possible Causes */}
                <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-red-500" />
                        <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
                            Possible Causes
                        </h2>
                    </div>

                    <div className="mt-5 space-y-3">
                        {[
                            "Abnormally high vibration",
                            "Elevated operating temperature",
                            "Bearing wear or degradation",
                            "Prolonged machine operation under stress",
                        ].map((cause, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50"
                            >
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                    {index + 1}
                                </span>

                                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                                    {cause}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Recommendation */}
            <section className="rounded-xl border border-emerald-200 bg-white shadow-sm dark:border-emerald-900/40 dark:bg-zinc-900">
                <div className="border-b border-emerald-100 px-6 py-4 dark:border-emerald-900/30">
                    <div className="flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-emerald-600" />
                        <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
                            Recommended Maintenance Action
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            Inspect and service the bearing assembly
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                            Perform a bearing inspection, check for abnormal wear, and
                            replace the component if degradation is confirmed. Verify
                            vibration and temperature levels after maintenance.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                <ShieldAlert className="h-3.5 w-3.5" />
                                Priority: Critical
                            </span>

                            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                <Clock className="h-3.5 w-3.5" />
                                Recommended: Immediate
                            </span>
                        </div>
                    </div>

                    <div className="rounded-lg bg-emerald-50 p-5 dark:bg-emerald-900/20">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            <p className="font-semibold text-emerald-800 dark:text-emerald-300">
                                Action Recommended
                            </p>
                        </div>

                        <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">
                            Schedule maintenance before continued operation causes further
                            damage.
                        </p>
                    </div>
                </div>
            </section>

            {/* Model Information */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-5 py-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div>
                    <span className="text-zinc-500">Prediction Model: </span>
                    <span className="font-semibold text-zinc-900 dark:text-white">
                        Predictive Maintenance Model v1.2
                    </span>
                </div>

                <div className="text-zinc-500">
                    Last prediction: Just now
                </div>
            </div>
        </div>
    );
}
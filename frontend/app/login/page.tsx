"use client";

import { useState } from "react";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-950">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/machinery.jpg')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-2xl">

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-white">
            Industrial AI
          </h1>

          <p className="mt-1 text-lg text-gray-300">
            Predictive Maintenance
          </p>

          <p className="mt-2 text-sm text-gray-300">
            Sign in to your Dashboard
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 pr-20 text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-400 hover:text-blue-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                className="h-4 w-4 rounded"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-blue-400 hover:text-blue-300"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Industrial AI • Predictive Maintenance & Process Optimization
        </p>
      </div>
    </main>
  );
}
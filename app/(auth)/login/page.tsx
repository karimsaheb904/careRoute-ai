"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Stethoscope,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setRole, t } = useCareRoute();
  const [email, setEmail] = useState("venkata.rao@example.com");
  const [password, setPassword] = useState("••••••••••••");
  const [roleSelection, setRoleSelection] = useState<"patient" | "clinic_staff">("patient");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(roleSelection);
    if (roleSelection === "patient") {
      router.push("/dashboard");
    } else {
      router.push("/clinic/dashboard");
    }
  };

  const handleQuickDemoLogin = (roleToSelect: "patient" | "clinic_staff") => {
    setRole(roleToSelect);
    if (roleToSelect === "patient") {
      router.push("/dashboard");
    } else {
      router.push("/clinic/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-teal-500/20">
              <Activity className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              CareRoute <span className="text-teal-400">AI</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400">
            Sign in to access your secure bilingual health portal
          </p>
        </div>

        {/* Quick Demo Mode Buttons */}
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Quick Demo Login:
            </span>
            <span className="text-[10px]">No password required</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("patient")}
              className="p-3 rounded-2xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold flex flex-col items-center gap-1 transition-all"
            >
              <UserCheck className="w-4 h-4" />
              <span>Patient (Venkata)</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("clinic_staff")}
              className="p-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex flex-col items-center gap-1 transition-all"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Clinic Staff (Priya)</span>
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Email Address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Role:</label>
              <select
                value={roleSelection}
                onChange={(e) => setRoleSelection(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
              >
                <option value="patient">Patient (Personal Care)</option>
                <option value="clinic_staff">Clinic Staff / Clinician</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Sign In to CareRoute</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-teal-400 hover:underline font-semibold">
              Create an account
            </Link>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          <span>Encrypted with PostgreSQL RLS & HIPAA compliant protocols</span>
        </div>
      </div>
    </div>
  );
}

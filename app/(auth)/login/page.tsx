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
  Shield,
  Globe,
} from "lucide-react";
import { UserRole } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const { switchAccount, login, lang, setLanguage } = useCareRoute();
  const [email, setEmail] = useState("venkata.rao@example.com");
  const [password, setPassword] = useState("••••••••••••");
  const [roleSelection, setRoleSelection] = useState<UserRole>("patient");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, roleSelection);
    if (roleSelection === "patient") {
      router.push("/dashboard");
    } else {
      router.push("/clinic/dashboard");
    }
  };

  const handleQuickDemoLogin = (userId: string, targetPath: string) => {
    switchAccount(userId);
    router.push(targetPath);
  };

  const isTe = lang === "te";

  return (
    <div className="min-h-screen bg-[#080D1B] text-[#F4F7FC] flex flex-col justify-center items-center p-4 selection:bg-[#16D6C1] selection:text-[#080D1B]">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setLanguage(isTe ? "en" : "te")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121C30] hover:bg-[#18253A] border border-[#1E2B45] text-xs font-semibold text-[#F4F7FC] transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-[#16D6C1]" />
          <span>{isTe ? "English" : "తెలుగు"}</span>
        </button>
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#16D6C1] to-[#35BDF5] flex items-center justify-center text-[#080D1B] font-bold shadow-lg shadow-[#16D6C1]/20">
              <Activity className="w-5 h-5 text-[#080D1B] stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#F4F7FC]">
              CareRoute <span className="text-[#16D6C1]">AI</span>
            </span>
          </Link>
          <p className="text-xs text-[#9AA9BE]">
            {isTe
              ? "మీ సురక్షిత ద్విభాషా ఆరోగ్య పోర్టల్‌లోకి ప్రవేశించండి"
              : "Sign in to access your secure bilingual health portal"}
          </p>
        </div>

        {/* Quick Demo Mode Buttons with 4 Separate Account Personas */}
        <div className="p-4 rounded-3xl bg-[#121C30] border border-[#1E2B45] space-y-2.5 shadow-xl">
          <div className="flex items-center justify-between text-xs text-[#9AA9BE]">
            <span className="font-bold uppercase tracking-wider text-[#16D6C1] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {isTe ? "శీఘ్ర డెమో ఖాతాలు:" : "Quick Demo Accounts:"}
            </span>
            <span className="text-[10px] text-[#9AA9BE]">{isTe ? "పాస్‌వర్డ్ అవసరం లేదు" : "No password required"}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Patient A */}
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("patient-venkata-rao", "/dashboard")}
              className="p-3 rounded-2xl bg-[#16D6C1]/10 hover:bg-[#16D6C1]/20 text-[#16D6C1] border border-[#16D6C1]/30 font-bold flex flex-col items-center gap-1 transition-all text-center"
            >
              <UserCheck className="w-4 h-4" />
              <span>{isTe ? "రోగి A (వెంకట రావు)" : "Patient A (Venkata)"}</span>
              <span className="text-[10px] text-[#9AA9BE] font-normal">Apollo Clinic A</span>
            </button>

            {/* Patient B */}
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("patient-lakshmi-devi", "/dashboard")}
              className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex flex-col items-center gap-1 transition-all text-center"
            >
              <UserCheck className="w-4 h-4 text-emerald-300" />
              <span>{isTe ? "రోగి B (లక్ష్మీ దేవి)" : "Patient B (Lakshmi)"}</span>
              <span className="text-[10px] text-[#9AA9BE] font-normal">Care Clinic B</span>
            </button>

            {/* Clinic Staff */}
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("staff-priya-sharma", "/clinic/dashboard")}
              className="p-3 rounded-2xl bg-[#35BDF5]/10 hover:bg-[#35BDF5]/20 text-[#35BDF5] border border-[#35BDF5]/30 font-bold flex flex-col items-center gap-1 transition-all text-center"
            >
              <Stethoscope className="w-4 h-4" />
              <span>{isTe ? "క్లినిక్ సిబ్బంది (ప్రియా)" : "Clinic Staff (Priya)"}</span>
              <span className="text-[10px] text-[#9AA9BE] font-normal">Care Coordinator</span>
            </button>

            {/* Clinic Admin */}
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("admin-suresh-reddy", "/clinic/dashboard")}
              className="p-3 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold flex flex-col items-center gap-1 transition-all text-center"
            >
              <Shield className="w-4 h-4 text-purple-400" />
              <span>{isTe ? "అడ్మినిస్ట్రేటర్ (సురేష్)" : "Clinic Admin (Suresh)"}</span>
              <span className="text-[10px] text-purple-300 font-normal">Full Privileges</span>
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <div className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] shadow-2xl space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#9AA9BE]">
                {isTe ? "ఈమెయిల్ చిరునామా:" : "Email Address:"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#9AA9BE]">
                {isTe ? "పాస్‌వర్డ్:" : "Password:"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#9AA9BE]">
                {isTe ? "ఖాతా రకం / పాత్ర:" : "Account Role:"}
              </label>
              <select
                value={roleSelection}
                onChange={(e) => setRoleSelection(e.target.value as UserRole)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
              >
                <option value="patient">{isTe ? "రోగి (వ్యక్తిగత సంరక్షణ)" : "Patient (Personal Care)"}</option>
                <option value="clinic_staff">{isTe ? "క్లినిక్ సిబ్బంది / కేర్ కోఆర్డినేటర్" : "Clinic Staff / Care Coordinator"}</option>
                <option value="admin">{isTe ? "క్లినిక్ అడ్మినిస్ట్రేటర్ (పూర్తి యాక్సెస్)" : "Clinic Administrator (Full Access)"}</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] hover:opacity-90 text-[#080D1B] font-bold text-xs shadow-md shadow-[#16D6C1]/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>{isTe ? "కేర్‌రూట్‌లోకి లాగిన్ అవ్వండి" : "Sign In to CareRoute AI"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-[#9AA9BE]">
            {isTe ? "ఖాతా లేదా? " : "Don't have an account? "}
            <Link href="/register" className="text-[#16D6C1] hover:underline font-semibold">
              {isTe ? "కొత్త ఖాతాను సృష్టించండి" : "Create an account"}
            </Link>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center space-x-2 text-[11px] text-[#9AA9BE]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16D6C1]" />
          <span>
            {isTe
              ? "PostgreSQL RLS & రోల్-బేస్డ్ యాక్సెస్ కంట్రోల్ ద్వారా రక్షించబడింది"
              : "Encrypted with PostgreSQL RLS & Role-Based Access Control"}
          </span>
        </div>
      </div>
    </div>
  );
}

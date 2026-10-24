"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCareRoute } from "@/components/CareRouteProvider";
import { Activity, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import { UserRole } from "@/types";

export default function RegisterPage() {
  const router = useRouter();
  const { login, lang, setLanguage } = useCareRoute();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleSelection, setRoleSelection] = useState<UserRole>("patient");

  const isTe = lang === "te";

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, roleSelection);
    if (roleSelection === "patient") {
      router.push("/dashboard");
    } else {
      router.push("/clinic/dashboard");
    }
  };

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
              ? "కేర్‌రూట్ AI లో చేరడానికి మీ ఖాతాను సృష్టించండి"
              : "Create an account to join CareRoute AI"}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] shadow-2xl space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#9AA9BE]">
                {isTe ? "పూర్తి పేరు:" : "Full Name:"}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={isTe ? "ఉదాహరణ: వెంకట రావు" : "e.g. Venkata Rao"}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#9AA9BE]">
                {isTe ? "ఈమెయిల్ చిరునామా:" : "Email Address:"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
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
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#9AA9BE]">
                {isTe ? "నేను రిజిస్టర్ అవుతున్న పాత్ర:" : "I am registering as:"}
              </label>
              <select
                value={roleSelection}
                onChange={(e) => setRoleSelection(e.target.value as UserRole)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
              >
                <option value="patient">{isTe ? "రోగి (వ్యక్తిగత ఆరోగ్య పోర్టల్)" : "Patient (Personal Health Portal)"}</option>
                <option value="clinic_staff">{isTe ? "క్లినిక్ సిబ్బంది / నర్సింగ్ కోఆర్డినేటర్" : "Clinic Staff / Care Coordinator"}</option>
                <option value="admin">{isTe ? "క్లినిక్ అడ్మినిస్ట్రేటర్" : "Clinic Administrator"}</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] hover:opacity-90 text-[#080D1B] font-bold text-xs shadow-md shadow-[#16D6C1]/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>{isTe ? "రిజిస్ట్రేషన్ పూర్తి చేయండి" : "Complete Registration"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-[#9AA9BE]">
            {isTe ? "ఇప్పటికే ఖాతా ఉందా? " : "Already have an account? "}
            <Link href="/login" className="text-[#16D6C1] hover:underline font-semibold">
              {isTe ? "ఇక్కడ లాగిన్ అవ్వండి" : "Sign in here"}
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 text-[11px] text-[#9AA9BE]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16D6C1]" />
          <span>
            {isTe
              ? "వ్యక్తిగత డేటా రక్షణ & క్లినిక్ అనుమతి నియమావళి"
              : "Protected by HIPAA standards and patient consent policies"}
          </span>
        </div>
      </div>
    </div>
  );
}

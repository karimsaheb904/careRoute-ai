"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCareRoute } from "@/components/CareRouteProvider";
import { DemoTourModal } from "@/components/layout/DemoTourModal";
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  FileText,
  Pill,
  Calendar,
  Stethoscope,
  Globe,
  HeartPulse,
  Clock,
  Compass,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  UserCheck,
} from "lucide-react";

export default function LandingPage() {
  const { setRole, lang, setLanguage, t } = useCareRoute();
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);

  const features = [
    {
      icon: FileText,
      title: "Prescription Safety Verification",
      titleTe: "ప్రిస్క్రిప్షన్ భద్రత & ధృవీకరణ",
      desc: "Extracts medicine names and instructions, flags unclear handwriting numerals, and enforces clinician verification before dose scheduling.",
      descTe: "చేతిరాత అస్పష్టతను గుర్తించి, సిబ్బంది ధృవీకరించిన తర్వాత మాత్రమే రిమైండర్లను సృష్టిస్తుంది.",
      badge: "Module 1",
      color: "teal",
    },
    {
      icon: Pill,
      title: "Dose Tracking & Reminders",
      titleTe: "మందుల రిమైండర్లు & మోతాదు ట్రాకింగ్",
      desc: "Daily adherence timelines with taken/missed/skipped status. Built-in clinical warnings against doubling doses.",
      descTe: "రోజువారీ మోతాదు సమయాలు. మిస్ అయిన డోస్ కోసం రెట్టింపు తీసుకోకుండా భద్రతా హెచ్చరికలు.",
      badge: "Module 2",
      color: "cyan",
    },
    {
      icon: Activity,
      title: "AI Medical Report Explanation",
      titleTe: "AI మెడికల్ రిపోర్ట్ వివరణలు",
      desc: "Compares test values against laboratory reference ranges in plain English and Telugu, generating targeted questions for your doctor.",
      descTe: "ల్యాబ్ పరీక్ష ఫలితాలను ప్రామాణిక పరిధులతో పోల్చి సులభ తెలుగు మరియు ఆంగ్లంలో వివరిస్తుంది.",
      badge: "Module 3",
      color: "mint",
    },
    {
      icon: Compass,
      title: "Previous Report Comparison",
      titleTe: "నివేదికల పోలిక & ట్రెండ్స్",
      desc: "Side-by-side longitudinal comparison with interactive biomarker charts (HbA1c & Blood Sugar trends over time).",
      descTe: "మునుపటి మరియు ప్రస్తుత నివేదికల మధ్య పోలిక, గ్రాఫ్‌లతో మార్పులను స్పష్టంగా చూపుతుంది.",
      badge: "Module 4",
      color: "blue",
    },
    {
      icon: Calendar,
      title: "Smart Conflict Detection",
      titleTe: "స్మార్ట్ అపాయింట్‌మెంట్ ఘర్షణ గుర్తింపు",
      desc: "True collision detection across doctor, room, and patient schedules with verified non-conflicting slot suggestions.",
      descTe: "డాక్టర్ మరియు గది సమయ ఘర్షణలను స్వయంచాలకంగా గుర్తించి ప్రత్యామ్నాయ సమయాలను సూచిస్తుంది.",
      badge: "Module 5",
      color: "amber",
    },
    {
      icon: Stethoscope,
      title: "Clinic Follow-Up Dashboard",
      titleTe: "క్లినిక్ సిబ్బంది & ఫాలో-అప్ డ్యాష్‌బోర్డ్",
      desc: "Dedicated clinical staff workspace to triage pending lab reviews, overdue follow-ups, and open care tasks with full audit trail.",
      descTe: "బకాయి ఉన్న పరీక్షల సమీక్షలు, మిస్ అయిన అపాయింట్‌మెంట్లు మరియు సిబ్బంది కేర్ పనుల సమన్వయం.",
      badge: "Module 6 & 7",
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-teal-500/20">
              <Activity className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">CareRoute</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                {t.common.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Bilingual Switcher */}
            <button
              onClick={() => setLanguage(lang === "en" ? "te" : "en")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>{lang === "en" ? "తెలుగులోకి మార్చు" : "Switch to English"}</span>
            </button>

            {/* Quick Tour Button */}
            <button
              onClick={() => setIsDemoTourOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 text-xs font-bold hover:opacity-90 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Judge Tour</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,148,136,0.25),rgba(255,255,255,0))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-teal-500/30 text-teal-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>B.Tech Hackathon Edition — Bilingual Healthcare Assistant (EN / తెలుగు)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Connecting the Complete <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-200">
              Patient Care Journey
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {lang === "te"
              ? "ప్రిస్క్రిప్షన్ల పరిశీలన, మందుల రిమైండర్లు, ల్యాబ్ రిపోర్టుల తెలుగు వివరణ మరియు సమయ ఘర్షణ లేని అపాయింట్‌మెంట్లతో కూడిన ఒకే ఒక సమగ్ర వేదిక."
              : "Prescription verification, medication adherence tracking, bilingual lab report explanations, smart conflict-free appointments, and clinic staff follow-up coordination."}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              onClick={() => setRole("patient")}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/25 flex items-center gap-2 transition-all active:scale-95"
            >
              <UserCheck className="w-4 h-4" />
              <span>Enter Patient Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/clinic/dashboard"
              onClick={() => setRole("clinic_staff")}
              className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 flex items-center gap-2 transition-all"
            >
              <Stethoscope className="w-4 h-4 text-cyan-400" />
              <span>Enter Clinic Staff Workspace</span>
            </Link>

            <button
              onClick={() => setIsDemoTourOpen(true)}
              className="px-5 py-3.5 rounded-2xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Guided Demo Walkthrough</span>
            </button>
          </div>

          {/* Clinical Guardrail Alert Card */}
          <div className="max-w-3xl mx-auto mt-8 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left flex items-start space-x-3 shadow-lg">
            <ShieldCheck className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-200">
                {t.common.disclaimerTitle}
              </span>
              <p className="text-slate-400 leading-relaxed">
                {t.common.medicalDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-16 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Complete End-to-End Care Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Built with Next.js 15, TypeScript, Supabase PostgreSQL, and Google Gemini AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 transition-all card-hover flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-teal-300">
                        {f.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {lang === "te" ? f.titleTe : f.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {lang === "te" ? f.descTe : f.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-teal-400 font-medium">
                    <span>Explore module</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Judge Demo Test Links */}
      <section className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Hackathon Verification Checklist
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Ready for Live Demonstration
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <Link
              href="/prescriptions"
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white"
            >
              <div className="font-bold text-teal-400">1. Prescriptions</div>
              <div className="text-[11px] text-slate-400 mt-0.5">OCR & Clarity Flags</div>
            </Link>
            <Link
              href="/reports"
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white"
            >
              <div className="font-bold text-teal-400">2. Lab Reports</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Telugu Explanations</div>
            </Link>
            <Link
              href="/reports/compare"
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white"
            >
              <div className="font-bold text-teal-400">3. Report Compare</div>
              <div className="text-[11px] text-slate-400 mt-0.5">HbA1c Biomarker Trend</div>
            </Link>
            <Link
              href="/appointments"
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white"
            >
              <div className="font-bold text-teal-400">4. Conflict Engine</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Smart Slot Checker</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-900/90 py-6 text-center text-xs text-slate-500">
        <p>CareRoute AI — B.Tech Hackathon Project. Designed for patient safety and clinical workflow efficiency.</p>
        <p className="mt-1 text-[11px] text-slate-600">Built with Next.js 15 App Router, React 19, Supabase, and Gemini AI.</p>
      </footer>

      {/* Judge Demo Tour Modal */}
      <DemoTourModal
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
      />
    </div>
  );
}

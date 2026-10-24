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
  Compass,
  CheckCircle2,
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
    },
    {
      icon: Pill,
      title: "Dose Tracking & Reminders",
      titleTe: "మందుల రిమైండర్లు & మోతాదు ట్రాకింగ్",
      desc: "Daily adherence timelines with taken/missed/skipped status. Built-in clinical warnings against doubling doses.",
      descTe: "రోజువారీ మోతాదు సమయాలు. మిస్ అయిన డోస్ కోసం రెట్టింపు తీసుకోకుండా భద్రతా హెచ్చరికలు.",
      badge: "Module 2",
    },
    {
      icon: Activity,
      title: "AI Medical Report Explanation",
      titleTe: "AI మెడికల్ రిపోర్ట్ వివరణలు",
      desc: "Compares test values against laboratory reference ranges in plain English and Telugu, generating targeted questions for your doctor.",
      descTe: "ల్యాబ్ పరీక్ష ఫలితాలను ప్రామాణిక పరిధులతో పోల్చి సులభ తెలుగు మరియు ఆంగ్లంలో వివరిస్తుంది.",
      badge: "Module 3",
    },
    {
      icon: Compass,
      title: "Previous Report Comparison",
      titleTe: "నివేదికల పోలిక & ట్రెండ్స్",
      desc: "Side-by-side longitudinal comparison with interactive biomarker charts (HbA1c & Blood Sugar trends over time).",
      descTe: "మునుపటి మరియు ప్రస్తుత నివేదికల మధ్య పోలిక, గ్రాఫ్‌లతో మార్పులను స్పష్టంగా చూపుతుంది.",
      badge: "Module 4",
    },
    {
      icon: Calendar,
      title: "Smart Conflict Detection",
      titleTe: "స్మార్ట్ అపాయింట్‌మెంట్ ఘర్షణ గుర్తింపు",
      desc: "True collision detection across doctor, room, and patient schedules with verified non-conflicting slot suggestions.",
      descTe: "డాక్టర్ మరియు గది సమయ ఘర్షణలను స్వయంచాలకంగా గుర్తించి ప్రత్యామ్నాయ సమయాలను సూచిస్తుంది.",
      badge: "Module 5",
    },
    {
      icon: Stethoscope,
      title: "Clinic Follow-Up Dashboard",
      titleTe: "క్లినిక్ సిబ్బంది & ఫాలో-అప్ డ్యాష్‌బోర్డ్",
      desc: "Dedicated clinical staff workspace to triage pending lab reviews, overdue follow-ups, and open care tasks with full audit trail.",
      descTe: "బకాయి ఉన్న పరీక్షల సమీక్షలు, మిస్ అయిన అపాయింట్‌మెంట్లు మరియు సిబ్బంది కేర్ పనుల సమన్వయం.",
      badge: "Module 6 & 7",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080D1B] text-[#F4F7FC] flex flex-col font-sans">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-[#10182B]/95 backdrop-blur-md border-b border-[#1E2B45] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#16D6C1] to-[#35BDF5] flex items-center justify-center text-[#080D1B] font-bold shadow-lg shadow-[#16D6C1]/20">
              <Activity className="w-5 h-5 text-[#080D1B] stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#F4F7FC]">CareRoute</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-[#16D6C1]/20 text-[#16D6C1] border border-[#16D6C1]/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-[#9AA9BE] hidden sm:block">
                {t.common.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Bilingual Switcher */}
            <button
              onClick={() => setLanguage(lang === "en" ? "te" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121C30] hover:bg-[#18253A] border border-[#1E2B45] text-xs font-semibold text-[#F4F7FC] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#16D6C1]" />
              <span>{lang === "en" ? "తెలుగులోకి మార్చు" : "Switch to English"}</span>
            </button>

            {/* Quick Tour Button */}
            <button
              onClick={() => setIsDemoTourOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] text-[#080D1B] text-xs font-bold hover:opacity-90 shadow-md shadow-[#16D6C1]/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === "te" ? "డెమో టూర్" : "Judge Tour"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(22,214,193,0.18),rgba(8,13,27,0))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121C30] border border-[#16D6C1]/30 text-[#16D6C1] text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#16D6C1]" />
            <span>{lang === "te" ? "హ్యాకథాన్ ఎడిషన్ — ద్విభాషా ఆరోగ్య సహాయకుడు (EN / తెలుగు)" : "Hackathon Edition — Bilingual Healthcare Assistant (EN / తెలుగు)"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F4F7FC] max-w-4xl mx-auto leading-tight">
            {lang === "te" ? (
              <>
                సంపూర్ణ రోగి కేర్ ప్రయాణాన్ని <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16D6C1] via-[#35BDF5] to-teal-200">
                  అనుసంధానించే ఏకైక AI వేదిక
                </span>
              </>
            ) : (
              <>
                Connecting the Complete <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16D6C1] via-[#35BDF5] to-teal-200">
                  Patient Care Journey
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-[#9AA9BE] max-w-2xl mx-auto leading-relaxed">
            {lang === "te"
              ? "ప్రిస్క్రిప్షన్ల పరిశీలన, మందుల రిమైండర్లు, ల్యాబ్ రిపోర్టుల తెలుగు వివరణ మరియు సమయ ఘర్షణ లేని అపాయింట్‌మెంట్లతో కూడిన ఒకే ఒక సమగ్ర వేదిక."
              : "Prescription verification, medication adherence tracking, bilingual lab report explanations, smart conflict-free appointments, and clinic staff follow-up coordination."}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              onClick={() => setRole("patient")}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] hover:opacity-90 text-[#080D1B] font-extrabold text-sm shadow-xl shadow-[#16D6C1]/25 flex items-center gap-2 transition-all active:scale-95"
            >
              <UserCheck className="w-4 h-4" />
              <span>{lang === "te" ? "రోగి డ్యాష్‌బోర్డ్ తెరవండి" : "Enter Patient Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/clinic/dashboard"
              onClick={() => setRole("clinic_staff")}
              className="px-6 py-3.5 rounded-2xl bg-[#121C30] hover:bg-[#18253A] text-[#F4F7FC] font-semibold text-sm border border-[#1E2B45] flex items-center gap-2 transition-all"
            >
              <Stethoscope className="w-4 h-4 text-[#35BDF5]" />
              <span>{lang === "te" ? "క్లినిక్ సిబ్బంది డ్యాష్‌బోర్డ్" : "Enter Clinic Staff Workspace"}</span>
            </Link>

            <button
              onClick={() => setIsDemoTourOpen(true)}
              className="px-5 py-3.5 rounded-2xl bg-[#16D6C1]/10 hover:bg-[#16D6C1]/20 text-[#16D6C1] border border-[#16D6C1]/30 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#16D6C1]" />
              <span>{lang === "te" ? "న్యాయనిర్ణేత గైడెడ్ టూర్" : "Guided Demo Walkthrough"}</span>
            </button>
          </div>

          {/* Clinical Guardrail Alert Card */}
          <div className="max-w-3xl mx-auto mt-8 p-4 rounded-2xl bg-[#121C30]/80 border border-[#1E2B45] text-left flex items-start space-x-3 shadow-lg">
            <ShieldCheck className="w-5 h-5 text-[#16D6C1] flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#F4F7FC]">
                {t.common.disclaimerTitle}
              </span>
              <p className="text-[#9AA9BE] leading-relaxed">
                {t.common.medicalDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-16 bg-[#10182B]/60 border-t border-[#1E2B45]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FC]">
              {lang === "te" ? "సమగ్ర ఎండ్-టు-ఎండ్ కేర్ ఆర్కిటెక్చర్" : "Complete End-to-End Care Architecture"}
            </h2>
            <p className="text-xs sm:text-sm text-[#9AA9BE] max-w-xl mx-auto">
              Built with Next.js App Router, TypeScript, Supabase PostgreSQL, and Google Gemini AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] hover:border-[#16D6C1]/40 transition-all card-healthcare flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-[#16D6C1]/10 text-[#16D6C1] border border-[#16D6C1]/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#18253A] text-[#16D6C1] border border-[#1E2B45]">
                        {f.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#F4F7FC]">
                      {lang === "te" ? f.titleTe : f.title}
                    </h3>
                    <p className="text-xs text-[#9AA9BE] leading-relaxed">
                      {lang === "te" ? f.descTe : f.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#1E2B45] flex items-center justify-between text-xs text-[#16D6C1] font-semibold">
                    <span>{lang === "te" ? "మాడ్యూల్ చూడండి" : "Explore module"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Judge Demo Test Links */}
      <section className="py-12 bg-[#080D1B] border-t border-[#1E2B45]">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#35BDF5]/10 text-[#35BDF5] border border-[#35BDF5]/25 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#35BDF5]" />
            <span>{lang === "te" ? "హ్యాకథాన్ తనిఖీ జాబితా" : "Hackathon Verification Checklist"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F4F7FC]">
            {lang === "te" ? "ప్రత్యక్ష ప్రదర్శనకు సిద్ధంగా ఉన్న మాడ్యూల్స్" : "Ready for Live Demonstration"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <Link
              href="/prescriptions"
              className="p-3.5 rounded-2xl bg-[#121C30] border border-[#1E2B45] hover:border-[#16D6C1]/40 text-xs transition-colors"
            >
              <div className="font-bold text-[#16D6C1]">{lang === "te" ? "1. ప్రిస్క్రిప్షన్లు" : "1. Prescriptions"}</div>
              <div className="text-[11px] text-[#9AA9BE] mt-0.5">{lang === "te" ? "చేతిరాత అస్పష్టత OCR" : "OCR & Clarity Flags"}</div>
            </Link>
            <Link
              href="/reports"
              className="p-3.5 rounded-2xl bg-[#121C30] border border-[#1E2B45] hover:border-[#16D6C1]/40 text-xs transition-colors"
            >
              <div className="font-bold text-[#16D6C1]">{lang === "te" ? "2. ల్యాబ్ రిపోర్టులు" : "2. Lab Reports"}</div>
              <div className="text-[11px] text-[#9AA9BE] mt-0.5">{lang === "te" ? "తెలుగు AI వివరణలు" : "Telugu Explanations"}</div>
            </Link>
            <Link
              href="/reports/compare"
              className="p-3.5 rounded-2xl bg-[#121C30] border border-[#1E2B45] hover:border-[#16D6C1]/40 text-xs transition-colors"
            >
              <div className="font-bold text-[#16D6C1]">{lang === "te" ? "3. నివేదికల పోలిక" : "3. Report Compare"}</div>
              <div className="text-[11px] text-[#9AA9BE] mt-0.5">{lang === "te" ? "HbA1c బయోమార్కర్ ట్రెండ్" : "HbA1c Biomarker Trend"}</div>
            </Link>
            <Link
              href="/appointments"
              className="p-3.5 rounded-2xl bg-[#121C30] border border-[#1E2B45] hover:border-[#16D6C1]/40 text-xs transition-colors"
            >
              <div className="font-bold text-[#16D6C1]">{lang === "te" ? "4. అపాయింట్‌మెంట్లు" : "4. Conflict Engine"}</div>
              <div className="text-[11px] text-[#9AA9BE] mt-0.5">{lang === "te" ? "సమయ ఘర్షణ గుర్తింపు" : "Smart Slot Checker"}</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#1E2B45] bg-[#10182B]/90 py-6 text-center text-xs text-[#9AA9BE]">
        <p>CareRoute AI — Bilingual Healthcare Assistant (English & తెలుగు). Designed for patient safety and clinical efficiency.</p>
        <p className="mt-1 text-[11px] text-slate-500">Built with Next.js App Router, React 19, Supabase, and Google Gemini AI.</p>
      </footer>

      {/* Judge Demo Tour Modal */}
      <DemoTourModal
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
      />
    </div>
  );
}

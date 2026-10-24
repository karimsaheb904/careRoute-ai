"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Sparkles,
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileText,
  ShieldAlert,
  Calendar,
  Stethoscope,
  Activity,
  Languages,
  Clock,
  Compass,
} from "lucide-react";

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoTourModal({ isOpen, onClose }: DemoTourModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { setRole, setLanguage } = useCareRoute();

  if (!isOpen) return null;

  const demoSteps = [
    {
      step: 1,
      title: "Step 1: Patient Dashboard Overview",
      desc: "Experience the unified patient command center displaying daily medication schedules, upcoming clinic consultations, pending lab result reviews, and biomarker trends.",
      targetUrl: "/dashboard",
      role: "patient" as const,
      lang: "en" as const,
      icon: Activity,
      highlight: "Unified patient overview with real-time adherence indicators.",
    },
    {
      step: 2,
      title: "Step 2: AI Prescription Safety Verification & OCR",
      desc: "Inspect uploaded handwritten prescriptions. The AI extracts medicine names, dosages, and timings, while actively detecting ambiguous handwriting numerals.",
      targetUrl: "/prescriptions",
      role: "patient" as const,
      lang: "en" as const,
      icon: FileText,
      highlight: "Safety guardrail flags ambiguous handwriting and halts automatic scheduling.",
    },
    {
      step: 3,
      title: "Step 3: Authorized Clinician Verification & Dose Generation",
      desc: "Simulate a clinician or nurse verifying prescription items. Once verified, dose reminders and schedules are automatically and safely activated.",
      targetUrl: "/prescriptions",
      role: "patient" as const,
      lang: "en" as const,
      icon: CheckCircle2,
      highlight: "Enforces strict human-in-the-loop clinical sign-off before scheduling.",
    },
    {
      step: 4,
      title: "Step 4: AI Medical Report Explanation (English)",
      desc: "Open a Comprehensive Metabolic Panel report. See values compared to laboratory reference ranges, key findings, and questions to ask your doctor.",
      targetUrl: "/reports",
      role: "patient" as const,
      lang: "en" as const,
      icon: FileText,
      highlight: "Out-of-range biomarkers flagged with easy-to-understand explanations.",
    },
    {
      step: 5,
      title: "Step 5: Bilingual Telugu Translation (తెలుగు వివరణ)",
      desc: "Toggle between English and Telugu explanations instantly. Complex medical terms like HbA1c and LDL are simplified for Telugu-speaking patients.",
      targetUrl: "/reports",
      role: "patient" as const,
      lang: "te" as const,
      icon: Languages,
      highlight: "Culturally sensitive bilingual healthcare explanations for regional patients.",
    },
    {
      step: 6,
      title: "Step 6: Previous Report Comparison & Trends",
      desc: "Compare reports across dates (January vs October 2026). Visualize HbA1c dropping from 8.2% to 7.4% and LDL improvements using interactive Recharts.",
      targetUrl: "/reports/compare",
      role: "patient" as const,
      lang: "en" as const,
      icon: Compass,
      highlight: "Side-by-side compatible biomarker delta comparison with trend charts.",
    },
    {
      step: 7,
      title: "Step 7: Smart Appointment Conflict & Overlap Detection",
      desc: "Attempt to schedule an appointment during an occupied doctor, room, or equipment slot. The system detects conflicts and recommends verified alternative slots.",
      targetUrl: "/appointments",
      role: "patient" as const,
      lang: "en" as const,
      icon: Calendar,
      highlight: "True collision detection across doctor, room, and patient schedules.",
    },
    {
      step: 8,
      title: "Step 8: Clinic Staff Workspace & Follow-Up Dashboard",
      desc: "Switch to the Clinic Staff view. Triage pending lab reviews, overdue follow-ups, and open care tasks prioritized by clinical risk rules.",
      targetUrl: "/clinic/dashboard",
      role: "clinic_staff" as const,
      lang: "en" as const,
      icon: Stethoscope,
      highlight: "Role-aware clinic interface with priority-sorted care task queues.",
    },
    {
      step: 9,
      title: "Step 9: Missed Appointment Clinical Recovery Workflow",
      desc: "Manage patients who missed scheduled visits. Clinic staff can initiate well-being contact, offer rebooking, and record notes into the audit trail.",
      targetUrl: "/clinic/follow-ups",
      role: "clinic_staff" as const,
      lang: "en" as const,
      icon: Clock,
      highlight: "Proactive care retention preventing patients from falling through the cracks.",
    },
    {
      step: 10,
      title: "Step 10: Healthy Lifestyle Guidance & Dose Adherence",
      desc: "Review daily hydration, sleep targets, and doctor-provided restrictions. Log medication adherence to see weekly compliance statistics.",
      targetUrl: "/medications",
      role: "patient" as const,
      lang: "en" as const,
      icon: Activity,
      highlight: "Complete closed-loop healthcare journey from prescription to recovery.",
    },
  ];

  const current = demoSteps[currentStep];
  const StepIcon = current.icon;

  const handleApplyStep = () => {
    setRole(current.role);
    setLanguage(current.lang);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-teal-900/60 via-slate-900 to-cyan-900/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Sparkles className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Hackathon Judge Guided Tour
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-normal">
                  Step {currentStep + 1} of {demoSteps.length}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                10-step sequential demonstration of CareRoute AI capabilities
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5">
          <div
            className="bg-gradient-to-r from-teal-400 to-cyan-400 h-1.5 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
          />
        </div>

        {/* Step Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-teal-400 flex-shrink-0">
              <StepIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">{current.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{current.desc}</p>
            </div>
          </div>

          {/* Key Feature Highlight Pill */}
          <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/25 flex items-center space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <span className="text-xs text-teal-200 font-medium">
              <strong className="text-teal-300 font-bold">Clinical Feature: </strong>
              {current.highlight}
            </span>
          </div>

          {/* Mode Context Notice */}
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
            <span>
              Target Mode:{" "}
              <strong className="text-slate-200 uppercase font-semibold">
                {current.role.replace("_", " ")}
              </strong>
            </span>
            <span>
              Language:{" "}
              <strong className="text-slate-200 font-semibold">
                {current.lang === "te" ? "తెలుగు (Telugu)" : "English (EN)"}
              </strong>
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          <div className="flex items-center space-x-2">
            <Link
              href={current.targetUrl}
              onClick={() => {
                handleApplyStep();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-teal-500/20 active:scale-95 transition-all"
            >
              <span>Jump to this Feature</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {currentStep < demoSteps.length - 1 ? (
              <button
                onClick={() => {
                  handleApplyStep();
                  setCurrentStep((prev) => prev + 1);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center gap-1 border border-slate-700 transition-colors"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-colors"
              >
                Close Tour
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

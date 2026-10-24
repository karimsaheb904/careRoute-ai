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
  const { setRole, lang, setLanguage, t } = useCareRoute();

  if (!isOpen) return null;

  const demoSteps = [
    {
      step: 1,
      title: "Step 1: Patient Dashboard Overview",
      titleTe: "దశ 1: రోగి డ్యాష్‌బోర్డ్ సమగ్ర పరిశీలన",
      desc: "Experience the unified patient command center displaying daily medication schedules, upcoming clinic consultations, pending lab result reviews, and biomarker trends.",
      descTe: "రోజువారీ మందుల సమయాలు, రాబోయే అపాయింట్‌మెంట్లు మరియు బయోమార్కర్ ట్రెండ్‌లను చూపే సమగ్ర రోగి కమాండ్ సెంటర్.",
      targetUrl: "/dashboard",
      role: "patient" as const,
      lang: "en" as const,
      icon: Activity,
      highlight: "Unified patient overview with real-time adherence indicators.",
      highlightTe: "నిజ-సమయ మందుల పాటించే శాతంతో కూడిన సమగ్ర రోగి అవలోకనం.",
    },
    {
      step: 2,
      title: "Step 2: AI Prescription Safety Verification & OCR",
      titleTe: "దశ 2: ప్రిస్క్రిప్షన్ భద్రత & చేతిరాత అస్పష్టత గుర్తింపు",
      desc: "Inspect uploaded handwritten prescriptions. The AI extracts medicine names, dosages, and timings, while actively detecting ambiguous handwriting numerals.",
      descTe: "అస్పష్టమైన చేతిరాత అంకెలను (ఉదా: 1mg vs 2mg గ్లైమిపైరైడ్) AI స్వయంచాలకంగా గుర్తించి హెచ్చరిస్తుంది.",
      targetUrl: "/prescriptions",
      role: "patient" as const,
      lang: "en" as const,
      icon: FileText,
      highlight: "Safety guardrail flags ambiguous handwriting and halts automatic scheduling.",
      highlightTe: "చేతిరాత అస్పష్టత ఉంటే రిమైండర్ల షెడ్యూలింగ్ ఆపివేయబడుతుంది.",
    },
    {
      step: 3,
      title: "Step 3: Authorized Clinician Verification & Dose Generation",
      titleTe: "దశ 3: క్లినికల్ సిబ్బంది ధృవీకరణ & రిమైండర్ల సృష్టి",
      desc: "Simulate a clinician or nurse verifying prescription items. Once verified, dose reminders and schedules are automatically and safely activated.",
      descTe: "సిబ్బంది మోతాదును ధృవీకరించిన తర్వాత మాత్రమే సురక్షితంగా రోజువారీ మందుల రిమైండర్లు సృష్టించబడతాయి.",
      targetUrl: "/prescriptions",
      role: "patient" as const,
      lang: "en" as const,
      icon: CheckCircle2,
      highlight: "Enforces strict human-in-the-loop clinical sign-off before scheduling.",
      highlightTe: "వైద్య సిబ్బంది అనుమతి తర్వాతే షెడ్యూలింగ్ నియమం అమలు చేయబడింది.",
    },
    {
      step: 4,
      title: "Step 4: AI Medical Report Explanation (English)",
      titleTe: "దశ 4: AI మెడికల్ రిపోర్ట్ వివరణ (ఇంగ్లీష్)",
      desc: "Open a Comprehensive Metabolic Panel report. See values compared to laboratory reference ranges, key findings, and questions to ask your doctor.",
      descTe: "ల్యాబ్ రిపోర్టులోని రక్తంలో చక్కెర మరియు కొలెస్ట్రాల్ ఫలితాలను సాధారణ పరిధులతో పోల్చి విశ్లేషిస్తుంది.",
      targetUrl: "/reports",
      role: "patient" as const,
      lang: "en" as const,
      icon: FileText,
      highlight: "Out-of-range biomarkers flagged with easy-to-understand explanations.",
      highlightTe: "పరిధి దాటిన బయోమార్కర్లు సులభ వివరణలతో హెచ్చరించబడతాయి.",
    },
    {
      step: 5,
      title: "Step 5: Bilingual Telugu Translation (తెలుగు వివరణ)",
      titleTe: "దశ 5: పూర్తి తెలుగు అనువాదం (తెలుగు వివరణ)",
      desc: "Toggle between English and Telugu explanations instantly. Complex medical terms like HbA1c and LDL are simplified for Telugu-speaking patients.",
      descTe: "HbA1c, LDL కొలెస్ట్రాల్, క్రియాటినిన్ వంటి సంక్లిష్ట పదాలను సరళమైన తెలుగులో సులభంగా అర్థం చేసుకోండి.",
      targetUrl: "/reports",
      role: "patient" as const,
      lang: "te" as const,
      icon: Languages,
      highlight: "Culturally sensitive bilingual healthcare explanations for regional patients.",
      highlightTe: "ఆంధ్రప్రదేశ్ & తెలంగాణ రోగుల కోసం సహజమైన తెలుగులో రూపొందించబడింది.",
    },
    {
      step: 6,
      title: "Step 6: Previous Report Comparison & Trends",
      titleTe: "దశ 6: మునుపటి మరియు ప్రస్తుత నివేదికల పోలిక",
      desc: "Compare reports across dates (January vs October 2026). Visualize HbA1c dropping from 8.2% to 7.4% and LDL improvements using interactive Recharts.",
      descTe: "HbA1c 8.2% నుండి 7.4% కి తగ్గిన క్రమాన్ని Recharts గ్రాఫ్‌లతో పక్కపక్కనే పోల్చి చూడండి.",
      targetUrl: "/reports/compare",
      role: "patient" as const,
      lang: "en" as const,
      icon: Compass,
      highlight: "Side-by-side compatible biomarker delta comparison with trend charts.",
      highlightTe: "మార్పుల శాతం (Δ) మరియు పురోగతిని తెలిపే పోలిక చార్టులు.",
    },
    {
      step: 7,
      title: "Step 7: Smart Appointment Conflict & Overlap Detection",
      titleTe: "దశ 7: స్మార్ట్ అపాయింట్‌మెంట్ సమయ ఘర్షణ గుర్తింపు",
      desc: "Attempt to schedule an appointment during an occupied doctor, room, or equipment slot. The system detects conflicts and recommends verified alternative slots.",
      descTe: "డాక్టర్ లేదా గది సమయ ఘర్షణను గుర్తించి, ఖాళీగా ఉన్న ప్రత్యామ్నాయ సమయాలను సూచిస్తుంది.",
      targetUrl: "/appointments",
      role: "patient" as const,
      lang: "en" as const,
      icon: Calendar,
      highlight: "True collision detection across doctor, room, and patient schedules.",
      highlightTe: "షెడ్యూల్ ఘర్షణలను నివారించే ఆధునిక కొలిషన్ ఇంజిన్.",
    },
    {
      step: 8,
      title: "Step 8: Clinic Staff Workspace & Follow-Up Dashboard",
      titleTe: "దశ 8: క్లినిక్ సిబ్బంది కమాండ్ సెంటర్ & ఫాలో-అప్",
      desc: "Switch to the Clinic Staff view. Triage pending lab reviews, overdue follow-ups, and open care tasks prioritized by clinical risk rules.",
      descTe: "వైద్య సిబ్బంది కోసం బకాయి పనులు, గడువు ముగిసిన ఫాలో-అప్‌లు మరియు ప్రాధాన్యత వారీ టాస్క్ క్యూ.",
      targetUrl: "/clinic/dashboard",
      role: "clinic_staff" as const,
      lang: "en" as const,
      icon: Stethoscope,
      highlight: "Role-aware clinic interface with priority-sorted care task queues.",
      highlightTe: "క్లినికల్ ప్రాధాన్యత ఆధారంగా క్రమబద్ధీకరించబడిన సిబ్బంది వర్క్‌స్పేస్.",
    },
    {
      step: 9,
      title: "Step 9: Missed Appointment Clinical Recovery Workflow",
      titleTe: "దశ 9: రాలేకపోయిన అపాయింట్‌మెంట్ల రికవరీ ప్రక్రియ",
      desc: "Manage patients who missed scheduled visits. Clinic staff can initiate well-being contact, offer rebooking, and record notes into the audit trail.",
      descTe: "మిస్ అయిన రోగులను సంప్రదించి, తిరిగి అపాయింట్‌మెంట్ రీబుక్ చేయడానికి ఆడిట్ రికార్డులతో కూడిన విధానం.",
      targetUrl: "/clinic/follow-ups",
      role: "clinic_staff" as const,
      lang: "en" as const,
      icon: Clock,
      highlight: "Proactive care retention preventing patients from falling through the cracks.",
      highlightTe: "రోగుల నిరంతర సంరక్షణను కాపాడే ముందస్తు ఫాలో-అప్ వ్యవస్థ.",
    },
    {
      step: 10,
      title: "Step 10: Healthy Lifestyle Guidance & Dose Adherence",
      titleTe: "దశ 10: జీవనశైలి మార్గదర్శకాలు & మందుల అలవాట్లు",
      desc: "Review daily hydration, sleep targets, and doctor-provided restrictions. Log medication adherence to see weekly compliance statistics.",
      descTe: "రోజువారీ నీటి లక్ష్యం, నిద్ర మరియు వైద్యుల రికవరీ పరిమితులతో కూడిన సమగ్ర ఆరోగ్య సాధన.",
      targetUrl: "/medications",
      role: "patient" as const,
      lang: "en" as const,
      icon: Activity,
      highlight: "Complete closed-loop healthcare journey from prescription to recovery.",
      highlightTe: "ప్రిస్క్రిప్షన్ నుండి రికవరీ వరకు పూర్తి అనుసంధాన ఆరోగ్య వేదిక.",
    },
  ];

  const current = demoSteps[currentStep];
  const StepIcon = current.icon;

  const handleApplyStep = () => {
    setRole(current.role);
    setLanguage(current.lang);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1B]/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#121C30] border border-[#1E2B45] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#10182B] border-b border-[#1E2B45] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#16D6C1]/15 text-[#16D6C1] border border-[#16D6C1]/30">
              <Sparkles className="w-5 h-5 text-[#16D6C1]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F4F7FC] flex items-center gap-2">
                {lang === "te" ? "హ్యాకథాన్ న్యాయనిర్ణేత గైడెడ్ టూర్" : "Hackathon Judge Guided Tour"}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#16D6C1]/15 text-[#16D6C1] font-semibold border border-[#16D6C1]/30">
                  {lang === "te" ? `దశ ${currentStep + 1} / ${demoSteps.length}` : `Step ${currentStep + 1} of ${demoSteps.length}`}
                </span>
              </h2>
              <p className="text-xs text-[#9AA9BE]">
                {lang === "te" ? "కేర్ రూట్ AI సామర్థ్యాల 10-దశల ప్రత్యక్ష ప్రదర్శన" : "10-step sequential demonstration of CareRoute AI capabilities"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#18253A] text-[#9AA9BE] hover:text-[#F4F7FC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#080D1B] h-1.5">
          <div
            className="bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] h-1.5 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
          />
        </div>

        {/* Step Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-3.5 rounded-2xl bg-[#18253A] border border-[#1E2B45] text-[#16D6C1] flex-shrink-0">
              <StepIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#F4F7FC]">
                {lang === "te" ? current.titleTe : current.title}
              </h3>
              <p className="text-xs text-[#9AA9BE] leading-relaxed">
                {lang === "te" ? current.descTe : current.desc}
              </p>
            </div>
          </div>

          {/* Key Feature Highlight Pill */}
          <div className="p-3.5 rounded-2xl bg-[#16D6C1]/10 border border-[#16D6C1]/30 flex items-center space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#16D6C1] flex-shrink-0" />
            <span className="text-xs text-[#16D6C1] font-medium leading-relaxed">
              <strong className="font-bold text-[#F4F7FC]">
                {lang === "te" ? "క్లినికల్ ఫీచర్: " : "Clinical Feature: "}
              </strong>
              {lang === "te" ? current.highlightTe : current.highlight}
            </span>
          </div>

          {/* Mode Context Notice */}
          <div className="flex items-center justify-between text-xs text-[#9AA9BE] bg-[#080D1B] p-3 rounded-2xl border border-[#1E2B45]">
            <span>
              {lang === "te" ? "లక్ష్య మోడ్: " : "Target Mode: "}
              <strong className="text-[#F4F7FC] uppercase font-semibold">
                {current.role.replace("_", " ")}
              </strong>
            </span>
            <span>
              {lang === "te" ? "భాష: " : "Language: "}
              <strong className="text-[#F4F7FC] font-semibold">
                {current.lang === "te" ? "తెలుగు (Telugu)" : "English (EN)"}
              </strong>
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#10182B] border-t border-[#1E2B45] flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#9AA9BE] hover:text-[#F4F7FC] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.common.previous}
          </button>

          <div className="flex items-center space-x-2">
            <Link
              href={current.targetUrl}
              onClick={() => {
                handleApplyStep();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] hover:opacity-90 text-[#080D1B] font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#16D6C1]/20 active:scale-95 transition-all"
            >
              <span>{t.tour.jumpToFeatureBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#080D1B]" />
            </Link>

            {currentStep < demoSteps.length - 1 ? (
              <button
                onClick={() => {
                  handleApplyStep();
                  setCurrentStep((prev) => prev + 1);
                }}
                className="px-3.5 py-2 rounded-xl bg-[#18253A] hover:bg-[#1E2B45] text-[#F4F7FC] font-semibold text-xs flex items-center gap-1 border border-[#1E2B45] transition-colors"
              >
                <span>{t.common.next}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl bg-[#18253A] hover:bg-[#1E2B45] text-[#F4F7FC] font-semibold text-xs border border-[#1E2B45] transition-colors"
              >
                {t.tour.closeTourBtn}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  ListTodo,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

export default function ClinicFollowUpsPage() {
  const { lang, t } = useCareRoute();

  const workflowSteps = [
    {
      step: 1,
      title: lang === "te" ? "1. పరీక్ష లేదా రెఫరల్ ఆదేశం" : "1. Order Test or Referral",
      desc: lang === "te" ? "బయోమార్కర్ ప్యానెల్ లేదా స్పెషలిస్ట్ రెఫరల్ నమోదు చేయబడుతుంది." : "Record ordered diagnostic biomarker panel or specialist referral.",
      status: lang === "te" ? "పూర్తయింది" : "Completed",
    },
    {
      step: 2,
      title: lang === "te" ? "2. ఫలితాల రాక ట్రాకింగ్" : "2. Result Arrival Tracking",
      desc: lang === "te" ? "విజయ డయాగ్నస్టిక్ సెంటర్ నుండి డేటా సురక్షితంగా అందుతుంది." : "System receives lab data from diagnostic centre (e.g. Vijaya Diagnostic).",
      status: lang === "te" ? "అందింది" : "Received",
    },
    {
      step: 3,
      title: lang === "te" ? "3. క్లినికల్ సమీక్ష కేటాయింపు" : "3. Assign Clinical Review",
      desc: lang === "te" ? "కేర్ సమన్వయకర్త (ప్రియా శర్మ, RN) కు టాస్క్ కేటాయించబడుతుంది." : "Assign task to nurse coordinator or clinician (e.g. Priya Sharma, RN).",
      status: lang === "te" ? "కేటాయించబడింది" : "Assigned",
    },
    {
      step: 4,
      title: lang === "te" ? "4. వైద్యుల తదుపరి చర్య నమోదు" : "4. Record Clinician Next Step",
      desc: lang === "te" ? "మందుల మోతాదు మార్పు లేదా అదనపు పరీక్షల అవసరాన్ని నమోదు చేస్తారు." : "Document whether medication dosage needs adjustment or extra tests needed.",
      status: lang === "te" ? "సమీక్షలో ఉంది" : "In Review",
    },
    {
      step: 5,
      title: lang === "te" ? "5. రోగి సంప్రదింపు & చర్య" : "5. Patient Contact & Action",
      desc: lang === "te" ? "రోగికి ఇన్-యాప్ లేదా ఫోన్ ద్వారా అపాయింట్‌మెంట్ ఏర్పాటు చేస్తారు." : "Reach out to patient via in-app notification, telephone, or arrange consultation.",
      status: lang === "te" ? "చర్య బకాయి" : "Pending Action",
    },
    {
      step: 6,
      title: lang === "te" ? "6. పూర్తి చేయడం / ఎస్కలేషన్" : "6. Mark Completed / Escalated",
      desc: lang === "te" ? "టాస్క్ పూర్తి చేసి ఆడిట్ ట్రయిల్‌లో శాశ్వతంగా భద్రపరుస్తారు." : "Sign off or escalate to primary physician. Persist into audit trail.",
      status: lang === "te" ? "సిద్ధంగా ఉంది" : "Ready",
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2B45]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#35BDF5]/10 text-[#35BDF5] border border-[#35BDF5]/30 text-xs font-semibold">
              <ListTodo className="w-3.5 h-3.5" />
              <span>{lang === "te" ? "మాడ్యూల్ 7 — క్లినికల్ ఫాలో-అప్ వర్క్‌ఫ్లో" : "Module 7 — AI-Assisted Clinical Follow-Up Workflow"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FC] mt-1.5">
              {t.followups.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#9AA9BE] max-w-2xl mt-0.5 leading-relaxed">
              {t.followups.subtitle}
            </p>
          </div>

          <Link
            href="/clinic/dashboard"
            className="px-3.5 py-2 rounded-xl bg-[#121C30] hover:bg-[#18253A] text-[#9AA9BE] hover:text-[#F4F7FC] border border-[#1E2B45] text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.common.back}</span>
          </Link>
        </div>

        {/* Safety Rule Card */}
        <div className="p-4 rounded-3xl bg-[#121C30] border border-[#16D6C1]/40 flex items-start space-x-3 text-xs shadow-md">
          <ShieldCheck className="w-5 h-5 text-[#16D6C1] flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="text-[#F4F7FC] font-bold">
              {lang === "te" ? "ఖచ్చితమైన క్లినికల్ భద్రతా నియమం:" : "Strict Clinical Safety Constraint:"}
            </strong>
            <p className="text-[#9AA9BE] leading-relaxed">
              {t.followups.safetyConstraint}
            </p>
          </div>
        </div>

        {/* 6-Step Workflow Visual Timeline */}
        <div className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] space-y-4">
          <h3 className="text-sm font-bold text-[#F4F7FC] uppercase tracking-wider">
            {t.followups.workflowSequenceTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {workflowSteps.map((ws, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#080D1B] border border-[#1E2B45] space-y-1.5 card-healthcare"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#F4F7FC] text-xs">{ws.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#16D6C1]/15 text-[#16D6C1] font-semibold">
                    {ws.status}
                  </span>
                </div>
                <p className="text-[11px] text-[#9AA9BE] leading-relaxed">{ws.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Patient Follow-Up Case Study */}
        <div className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2B45]">
            <div>
              <span className="text-xs font-bold text-[#16D6C1] uppercase tracking-wider">
                {t.followups.activeCaseTitle}
              </span>
              <h3 className="text-base font-bold text-[#F4F7FC] mt-0.5">
                {lang === "te"
                  ? "వెంకట రావు (వయస్సు 52) — అధిక HbA1c & రక్తంలో చక్కెర ఫాలో-అప్"
                  : "Venkata Rao (Age 52) — Elevated HbA1c & Fasting Glucose Follow-Up"}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 text-xs font-bold">
              {lang === "te" ? "చర్య అవసరం" : "Action Required"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45] space-y-1">
              <span className="text-[#9AA9BE] font-medium">{t.followups.diagnosticPanelLabel}</span>
              <div className="font-bold text-[#F4F7FC]">Comprehensive Metabolic Panel</div>
              <div className="text-[11px] text-[#16D6C1]">HbA1c: 7.4% • Fasting Glucose: 138 mg/dL</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45] space-y-1">
              <span className="text-[#9AA9BE] font-medium">{t.followups.assignedCoordinatorLabel}</span>
              <div className="font-bold text-[#F4F7FC]">Priya Sharma, RN</div>
              <div className="text-[11px] text-[#9AA9BE]">{lang === "te" ? "కేర్ సమన్వయకర్త, అపోలో క్లినిక్" : "Care Coordinator, Apollo Clinic"}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45] space-y-1">
              <span className="text-[#9AA9BE] font-medium">{t.followups.targetCompletionLabel}</span>
              <div className="font-bold text-[#F4F7FC]">October 26, 2026</div>
              <div className="text-[11px] text-amber-300">{lang === "te" ? "ఫలితాలు వచ్చిన 48 గంటల్లోపు" : "Within 48 hours of result arrival"}</div>
            </div>
          </div>

          {/* Action History Log */}
          <div className="pt-3 border-t border-[#1E2B45] space-y-2">
            <span className="text-xs font-bold text-[#9AA9BE] uppercase tracking-wider">
              {t.followups.auditTrailTitle}
            </span>
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-[#080D1B] border border-[#1E2B45] text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16D6C1] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#F4F7FC]">{lang === "te" ? "అక్టోబర్ 15 (11:00 AM) — ల్యాబ్ ఫలితం అందింది: " : "Oct 15, 2026 (11:00 AM) — Result Ingested: "}</strong>
                  <span className="text-[#9AA9BE]">{lang === "te" ? "విజయ డయాగ్నస్టిక్ సెంటర్ నుండి డేటా అందింది. HbA1c 7.4% వద్ద గుర్తించబడింది." : "Diagnostic results received from Vijaya Diagnostic Centre. HbA1c flagged at 7.4%."}</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-[#080D1B] border border-[#1E2B45] text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#35BDF5] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#F4F7FC]">{lang === "te" ? "అక్టోబర్ 16 (09:15 AM) — టాస్క్ కేటాయించబడింది: " : "Oct 16, 2026 (09:15 AM) — Task Assigned: "}</strong>
                  <span className="text-[#9AA9BE]">{lang === "te" ? "నర్సు ప్రియకు రోగి మందుల పాటింపును పరిశీలించి వైద్యుల సమీక్షకు సమన్వయం చేయమని కేటాయించారు." : "Nurse Priya assigned to check adherence and coordinate physician follow-up review."}</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-[#080D1B] border border-[#1E2B45] text-xs flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#F4F7FC]">{lang === "te" ? "అక్టోబర్ 24 (ప్రస్తుతం) — సంప్రదింపు ఏర్పాటు చేయబడింది: " : "Oct 24, 2026 (Current) — In-App Consultation Arranged: "}</strong>
                  <span className="text-[#9AA9BE]">{lang === "te" ? "డాక్టర్ అనితా శర్మ గారితో నవంబర్ 5 ఉదయం 10:00 గంటలకు గది 302లో అపాయింట్‌మెంట్ ఖరారైంది." : "Appointment confirmed with Dr. Anita Sharma for Nov 5 at 10:00 AM in Room 302."}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

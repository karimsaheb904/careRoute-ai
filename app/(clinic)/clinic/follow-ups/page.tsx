"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  ListTodo,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Plus,
  ArrowLeft,
  ChevronRight,
  UserCheck,
  FileText,
} from "lucide-react";

export default function ClinicFollowUpsPage() {
  const { careTasks, updateCareTaskStatus, currentUser, lang, t } = useCareRoute();
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);

  const workflowSteps = [
    {
      step: 1,
      title: "1. Order Test or Referral",
      desc: "Record ordered diagnostic biomarker panel or specialist referral.",
      status: "Completed",
    },
    {
      step: 2,
      title: "2. Result Arrival Tracking",
      desc: "System receives lab data from diagnostic centre (e.g. Vijaya Diagnostic).",
      status: "Received",
    },
    {
      step: 3,
      title: "3. Assign Clinical Review",
      desc: "Assign task to nurse coordinator or clinician (e.g. Priya Sharma, RN).",
      status: "Assigned",
    },
    {
      step: 4,
      title: "4. Record Clinician Next Step",
      desc: "Document whether medication dosage needs adjustment or extra tests needed.",
      status: "In Review",
    },
    {
      step: 5,
      title: "5. Patient Contact & Action",
      desc: "Reach out to patient via in-app notification, telephone, or arrange consultation.",
      status: "Pending Action",
    },
    {
      step: 6,
      title: "6. Mark Completed / Escalated",
      desc: "Sign off or escalate to primary physician. Persist into audit trail.",
      status: "Ready",
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold">
              <ListTodo className="w-3.5 h-3.5 text-cyan-400" />
              <span>Module 7 — AI-Assisted Clinical Follow-Up Workflow</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Patient Care Follow-Up & Referral Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-0.5">
              Closed-loop care coordination tracking ordered tests from laboratory arrival to clinician sign-off.
            </p>
          </div>

          <Link
            href="/clinic/dashboard"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Safety Rule Card */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-teal-500/30 flex items-start space-x-3 text-xs shadow-md">
          <ShieldCheck className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="text-white font-bold">Strict Clinical Safety Constraint:</strong>
            <p className="text-slate-300 leading-relaxed">
              CareRoute AI never treats an uploaded or unreviewed test result as a completed clinical decision.
              Every step requires authorized staff coordination and audit trail persistence.
            </p>
          </div>
        </div>

        {/* 6-Step Workflow Visual Timeline */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Standard Care Coordination Workflow Sequence
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {workflowSteps.map((ws, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5 card-hover"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{ws.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 font-semibold">
                    {ws.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{ws.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Patient Follow-Up Case Study */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Active Coordination Case
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Venkata Rao (Age 52) — Elevated HbA1c & Fasting Glucose Follow-Up
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 text-xs font-bold">
              Action Required
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-medium">Diagnostic Panel:</span>
              <div className="font-bold text-white">Comprehensive Metabolic Panel</div>
              <div className="text-[11px] text-teal-300">HbA1c: 7.4% • Glucose: 138 mg/dL</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-medium">Assigned Coordinator:</span>
              <div className="font-bold text-white">Priya Sharma, RN</div>
              <div className="text-[11px] text-slate-400">Care Coordinator, Apollo Clinic</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-medium">Target Completion Date:</span>
              <div className="font-bold text-white">October 26, 2026</div>
              <div className="text-[11px] text-amber-300">Within 48 hours of result arrival</div>
            </div>
          </div>

          {/* Action History Log */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Audit Trail & Status Progression
            </span>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Oct 15, 2026 (11:00 AM) — Result Ingested: </strong>
                  <span className="text-slate-300">Diagnostic results received from Vijaya Diagnostic Centre. HbA1c flagged at 7.4%.</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Oct 16, 2026 (09:15 AM) — Task Assigned: </strong>
                  <span className="text-slate-300">Nurse Priya assigned to check adherence and coordinate physician follow-up review.</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Oct 24, 2026 (Current) — In-App Consultation Arranged: </strong>
                  <span className="text-slate-300">Appointment confirmed with Dr. Anita Sharma for Nov 5 at 10:00 AM in Room 302.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

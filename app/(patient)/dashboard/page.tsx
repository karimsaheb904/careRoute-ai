"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Activity,
  Calendar,
  Pill,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  PlusCircle,
  RotateCcw,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PatientDashboardPage() {
  const {
    currentUser,
    role,
    lang,
    t,
    schedules,
    medLogs,
    logMedicationStatus,
    appointments,
    reports,
    careTasks,
  } = useCareRoute();

  const [filterDate, setFilterDate] = useState("today");

  // Biomarker trend data (HbA1c & Fasting Glucose over 3 quarters)
  const biomarkerTrendData = [
    { period: "Jan 2026", hba1c: 8.2, glucose: 165, ldl: 154 },
    { period: "May 2026", hba1c: 7.8, glucose: 148, ldl: 142 },
    { period: "Oct 2026", hba1c: 7.4, glucose: 138, ldl: 132 },
  ];

  const pendingDoses = schedules.filter((s) => s.active);
  const upcomingApt = appointments.find((a) => a.status === "confirmed" || a.status === "scheduled");
  const recentReport = reports[0];
  const activeTasks = careTasks.filter((t) => t.status !== "completed");

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Greeting & Patient Profile Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 p-6 sm:p-8 border border-slate-800 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>
                  {lang === "te" ? "వ్యక్తిగత ఆరోగ్య కేంద్రం" : "Personal Health Command Center"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t.dashboard.welcome}, {currentUser.fullName}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                {t.dashboard.welcomeSub}
              </p>
            </div>

            {/* Quick Profile Summary Badge */}
            <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-xs">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
                VR
              </div>
              <div>
                <div className="font-semibold text-white">Venkata Rao (Age 52)</div>
                <div className="text-[11px] text-slate-400">
                  Apollo Clinic • Type 2 Diabetes Care
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3 card-hover">
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">{pendingDoses.length}</div>
              <div className="text-xs text-slate-400">{t.dashboard.todayMedications}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3 card-hover">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">
                {appointments.filter((a) => a.status === "confirmed").length}
              </div>
              <div className="text-xs text-slate-400">{t.dashboard.upcomingAppointments}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3 card-hover">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">
                {reports.filter((r) => r.hasAbnormalValues).length}
              </div>
              <div className="text-xs text-slate-400">{t.dashboard.pendingReports}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3 card-hover">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">{activeTasks.length}</div>
              <div className="text-xs text-slate-400">{t.dashboard.activeCareTasks}</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Medications + Upcoming Appointment */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Dose Schedule (2 Cols) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Pill className="w-5 h-5 text-teal-400" />
                <h2 className="text-base font-bold text-white">
                  {lang === "te" ? "ఈరోజు మందుల సమయాలు" : "Today's Verified Medication Timeline"}
                </h2>
              </div>
              <Link
                href="/medications"
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
              >
                <span>{lang === "te" ? "మొత్తం చూడండి" : "View All"}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {schedules.slice(0, 3).map((sched, idx) => {
                const isTaken = medLogs.some(
                  (l) => l.medicationId === sched.id && l.status === "taken"
                );
                return (
                  <div
                    key={sched.id}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isTaken
                            ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {sched.scheduledTimes[0] || "09:00"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">
                            {sched.medicineName}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-teal-300 font-mono">
                            {sched.dosage}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {lang === "te" ? sched.instructionsTe : sched.instructionsEn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                      {isTaken ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/10 text-teal-300 border border-teal-500/30 text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                          <span>{t.medications.statusTaken}</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => logMedicationStatus(sched.id, "taken", "Logged from dashboard")}
                          className="px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.medications.markTaken}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dose Adherence Safety Guardrail */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span>{t.medications.safetyMissedDoseWarning}</span>
            </div>
          </div>

          {/* Next Consultation Card & Quick Actions (1 Col) */}
          <div className="space-y-6">
            {/* Next Consultation */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">Next Clinic Visit</h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 font-semibold">
                  Confirmed
                </span>
              </div>

              {upcomingApt ? (
                <div className="space-y-3">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {upcomingApt.clinicianName}
                    </h4>
                    <p className="text-xs text-slate-400">{upcomingApt.specialty}</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Date & Time:</span>
                      <strong className="text-teal-300">
                        {upcomingApt.date} • {upcomingApt.startTime}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Location:</span>
                      <span>{upcomingApt.room}</span>
                    </div>
                  </div>

                  <Link
                    href="/appointments"
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Manage Appointment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  No upcoming visits scheduled.
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-2.5">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t.dashboard.quickActions}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/prescriptions"
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-200 hover:text-teal-300 flex flex-col items-center justify-center text-center gap-1.5 transition-all"
                >
                  <FileText className="w-4 h-4 text-teal-400" />
                  <span>Upload Rx Slip</span>
                </Link>
                <Link
                  href="/reports"
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-200 hover:text-teal-300 flex flex-col items-center justify-center text-center gap-1.5 transition-all"
                >
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Lab Report AI</span>
                </Link>
                <Link
                  href="/reports/compare"
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-200 hover:text-teal-300 flex flex-col items-center justify-center text-center gap-1.5 transition-all"
                >
                  <TrendingDown className="w-4 h-4 text-mint-400 text-emerald-400" />
                  <span>Compare Trends</span>
                </Link>
                <Link
                  href="/appointments"
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-200 hover:text-teal-300 flex flex-col items-center justify-center text-center gap-1.5 transition-all"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Book Visit</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Longitudinal Biomarker Trend Chart (Module 4 Integration) */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold text-white">
                  {t.dashboard.vitalTrends}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === "te"
                  ? "గత 3 త్రైమాసికాలలో రక్తంలో చక్కెర మరియు HbA1c తగ్గుముఖం పట్టిన క్రమం."
                  : "3-Quarter progression showing positive response to Metformin & lifestyle adjustments."}
              </p>
            </div>
            <Link
              href="/reports/compare"
              className="text-xs text-teal-400 hover:underline font-semibold flex items-center gap-1 self-start sm:self-auto"
            >
              <span>{t.reports.compareWithPrevious}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={biomarkerTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="period" stroke="#64748b" fontSize={12} />
                <YAxis
                  yAxisId="left"
                  stroke="#14b8a6"
                  fontSize={12}
                  domain={[6.5, 9.0]}
                  unit="%"
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#38bdf8"
                  fontSize={12}
                  domain={[120, 180]}
                  unit=" mg"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="hba1c"
                  name="HbA1c (%)"
                  stroke="#14b8a6"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#14b8a6" }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="glucose"
                  name="Fasting Glucose (mg/dL)"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#38bdf8" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-between">
              <span className="text-teal-200">HbA1c (3-Month Average)</span>
              <strong className="text-teal-300 font-bold">8.2% ➔ 7.4% (-9.8% Improvement)</strong>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
              <span className="text-cyan-200">Fasting Blood Glucose</span>
              <strong className="text-cyan-300 font-bold">165 ➔ 138 mg/dL (-16.3% Drop)</strong>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

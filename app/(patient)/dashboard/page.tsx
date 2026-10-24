"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import confetti from "canvas-confetti";
import {
  Activity,
  Calendar,
  Pill,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingDown,
  ChevronRight,
  ShieldCheck,
  ListTodo,
  MapPin,
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
    lang,
    t,
    schedules,
    medLogs,
    logMedicationStatus,
    appointments,
    reports,
    careTasks,
    formatLocalDate,
    formatLocalTime,
    localizeDoctor,
    localizeSpecialty,
    localizeRoom,
    localizeClinic,
    localizePatientName,
    getGreeting,
  } = useCareRoute();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleTakeDose = (schedId: string, medName: string) => {
    logMedicationStatus(
      schedId,
      "taken",
      lang === "te" ? "డ్యాష్‌బోర్డ్ నుండి నమోదు చేయబడింది" : "Logged from patient dashboard"
    );

    // Trigger subtle celebratory confetti burst
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#16D6C1", "#35BDF5", "#10B981"],
      });
    } catch {
      // Ignore if confetti not supported in environment
    }

    showToast(
      lang === "te"
        ? `${medName} మోతాదు తీసుకున్నట్లు విజయవంతంగా నమోదు చేయబడింది!`
        : `Dose of ${medName} marked as taken!`
    );
  };

  // Biomarker trend data localized
  const biomarkerTrendData = [
    {
      period: lang === "te" ? "జనవరి 2026" : "Jan 2026",
      hba1c: 8.2,
      glucose: 165,
      ldl: 154,
    },
    {
      period: lang === "te" ? "మే 2026" : "May 2026",
      hba1c: 7.8,
      glucose: 148,
      ldl: 142,
    },
    {
      period: lang === "te" ? "అక్టోబర్ 2026" : "Oct 2026",
      hba1c: 7.4,
      glucose: 138,
      ldl: 132,
    },
  ];

  const pendingDoses = schedules.filter((s) => s.active);
  const upcomingApt = appointments.find(
    (a) => a.status === "confirmed" || a.status === "scheduled"
  );
  const activeTasks = careTasks.filter((task) => task.status !== "completed");
  const abnormalReports = reports.filter((r) => r.hasAbnormalValues);

  // Today's adherence calculation:
  const todayDate = React.useSyncExternalStore(
    () => () => {},
    () => new Date().toISOString().split("T")[0],
    () => "2026-10-24"
  );

  const todayLogs = medLogs.filter((l) => l.date === "2026-10-24" || l.date === todayDate);
  const takenCount = todayLogs.filter((l) => l.status === "taken").length;
  const totalTodayDoses = Math.max(schedules.length, 3);
  const adherencePercentage = Math.min(100, Math.round((takenCount / totalTodayDoses) * 100));

  return (
    <AppShell>
      <div className="space-y-6 pb-12">
        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="fixed top-20 right-5 z-50 p-4 rounded-2xl bg-[#121C30] border border-[#16D6C1]/50 text-[#F4F7FC] shadow-2xl shadow-black/80 flex items-center space-x-3 animate-in slide-in-from-top-4 duration-300">
            <div className="p-1.5 rounded-xl bg-[#16D6C1]/20 text-[#16D6C1]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* =========================================================================
            SECTION C: Welcome and Patient Overview Command Center
        ========================================================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#10182B] via-[#121C30] to-[#0d2238] p-6 sm:p-8 border border-[#1E2B45] shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-[#16D6C1]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 rounded-full bg-[#35BDF5]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              {/* AI Assistant Guardrail Status */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080D1B]/80 border border-[#16D6C1]/30 text-[#16D6C1] text-xs font-semibold shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[#16D6C1] animate-ping" />
                <span>{t.dashboard.aiCoPilotActive}</span>
                <span className="text-[10px] text-[#9AA9BE] border-l border-[#1E2B45] pl-2 hidden sm:inline">
                  {t.dashboard.aiSafetyVerified}
                </span>
              </div>

              {/* Greeting & Patient Name */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F4F7FC] tracking-tight">
                  {getGreeting()}, {localizePatientName(currentUser.fullName)}!
                </h1>
                <p className="text-xs sm:text-sm text-[#9AA9BE] max-w-2xl mt-1 leading-relaxed">
                  {t.dashboard.welcomeSub}
                </p>
              </div>

              {/* Program & Care Clinic Tag */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="px-3 py-1 rounded-xl bg-[#18253A] text-[#16D6C1] border border-[#1E2B45] font-medium flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#16D6C1]" />
                  <span>{t.dashboard.careProgram}</span>
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#080D1B] text-[#9AA9BE] border border-[#1E2B45] font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#35BDF5]" />
                  <span>{localizeClinic("Apollo Health City, Jubilee Hills")}</span>
                </span>
              </div>
            </div>

            {/* Patient Profile Card Pill */}
            <div className="flex items-center gap-4 bg-[#080D1B]/90 p-4 rounded-2xl border border-[#1E2B45] text-xs shadow-xl flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#16D6C1] to-[#35BDF5] text-[#080D1B] flex items-center justify-center font-black text-lg shadow-lg shadow-[#16D6C1]/20 flex-shrink-0">
                VR
              </div>
              <div className="space-y-1">
                <div className="font-bold text-[#F4F7FC] text-sm flex items-center gap-2">
                  <span>{localizePatientName(currentUser.fullName)}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#18253A] text-[#16D6C1] border border-[#1E2B45]">
                    ID: #VR-7414
                  </span>
                </div>
                <div className="text-[11px] text-[#9AA9BE] flex items-center gap-2">
                  <span>{t.dashboard.patientAge}: <strong className="text-[#F4F7FC]">52</strong></span>
                  <span>•</span>
                  <span>{t.dashboard.patientGender}: <strong className="text-[#F4F7FC]">{lang === "te" ? "పురుషుడు" : "Male"}</strong></span>
                  <span>•</span>
                  <span>{t.dashboard.bloodGroup}: <strong className="text-rose-400">B+</strong></span>
                </div>
                <div className="text-[11px] text-[#16D6C1] flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === "te" ? "ప్రైమరీ డాక్టర్: అనితా శర్మ, MD" : "Physician: Dr. Anita Sharma, MD"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION D: Health Summary Cards (4 Metric Cards)
        ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Today's Medications */}
          <Link
            href="/medications"
            className="p-5 rounded-3xl bg-[#121C30] border border-[#1E2B45] card-healthcare flex flex-col justify-between space-y-4 group hover:border-[#16D6C1]/50 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-[#16D6C1]/15 text-[#16D6C1] border border-[#16D6C1]/30">
                <Pill className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#18253A] text-[#16D6C1] border border-[#1E2B45]">
                {adherencePercentage}% {lang === "te" ? "పూర్తయింది" : "Done"}
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#F4F7FC]">
                {takenCount} / {pendingDoses.length}
              </div>
              <div className="text-xs text-[#9AA9BE] font-medium mt-1">
                {t.dashboard.todayMedications}
              </div>
              {/* Mini Adherence Progress Bar */}
              <div className="w-full bg-[#080D1B] rounded-full h-1.5 mt-3 overflow-hidden border border-[#1E2B45]">
                <div
                  className="bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] h-1.5 rounded-full transition-all"
                  style={{ width: `${adherencePercentage}%` }}
                />
              </div>
            </div>
          </Link>

          {/* Card 2: Upcoming Appointments */}
          <Link
            href="/appointments"
            className="p-5 rounded-3xl bg-[#121C30] border border-[#1E2B45] card-healthcare flex flex-col justify-between space-y-4 group hover:border-[#35BDF5]/50 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-[#35BDF5]/15 text-[#35BDF5] border border-[#35BDF5]/30">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                {upcomingApt ? t.dashboard.confirmedStatus : "None"}
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#F4F7FC]">
                {appointments.filter((a) => a.status === "confirmed").length}
              </div>
              <div className="text-xs text-[#9AA9BE] font-medium mt-1">
                {t.dashboard.upcomingAppointments}
              </div>
              <div className="text-[11px] text-[#35BDF5] mt-2 font-semibold truncate">
                {upcomingApt ? `${formatLocalDate(upcomingApt.date)} • ${upcomingApt.startTime}` : t.dashboard.noUpcomingVisits}
              </div>
            </div>
          </Link>

          {/* Card 3: Pending Lab Report Reviews */}
          <Link
            href="/reports"
            className="p-5 rounded-3xl bg-[#121C30] border border-[#1E2B45] card-healthcare flex flex-col justify-between space-y-4 group hover:border-amber-500/50 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {lang === "te" ? "పరిశీలనలో ఉంది" : "Needs Review"}
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#F4F7FC]">
                {abnormalReports.length}
              </div>
              <div className="text-xs text-[#9AA9BE] font-medium mt-1">
                {t.dashboard.pendingReports}
              </div>
              <div className="text-[11px] text-amber-300/80 mt-2 font-medium truncate">
                {lang === "te" ? "HbA1c & ఉపవాస గ్లూకోజ్ నివేదిక" : "HbA1c & Fasting Glucose panel"}
              </div>
            </div>
          </Link>

          {/* Card 4: Active Care Tasks */}
          <Link
            href="/clinic/dashboard"
            className="p-5 rounded-3xl bg-[#121C30] border border-[#1E2B45] card-healthcare flex flex-col justify-between space-y-4 group hover:border-purple-500/50 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-purple-500/15 text-purple-300 border border-purple-500/30">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                {lang === "te" ? "కేర్ సమన్వయం" : "Active Care"}
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#F4F7FC]">
                {activeTasks.length}
              </div>
              <div className="text-xs text-[#9AA9BE] font-medium mt-1">
                {t.dashboard.activeCareTasks}
              </div>
              <div className="text-[11px] text-purple-300/80 mt-2 font-medium truncate">
                {lang === "te" ? "నర్స్ ప్రియా శర్మ కేటాయించబడ్డారు" : "Nurse Priya Sharma assigned"}
              </div>
            </div>
          </Link>
        </div>

        {/* =========================================================================
            SECTION E & F: Medication Timeline & Next Consultation Grid
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section E: Medication Schedule Timeline (2 Columns) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#1E2B45]">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-[#16D6C1]/15 text-[#16D6C1] border border-[#16D6C1]/30">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#F4F7FC]">
                    {t.dashboard.medicationTimeline}
                  </h2>
                  <p className="text-[11px] text-[#9AA9BE]">
                    {lang === "te"
                      ? "డాక్టర్ అనితా శర్మ సూచించిన రోజువారీ మోతాదుల వివరాలు"
                      : "Verified regimen prescribed by Dr. Anita Sharma, MD"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-auto">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#16D6C1]/10 text-[#16D6C1] border border-[#16D6C1]/30">
                  {takenCount} {t.dashboard.dosesCompleted}
                </span>
                <Link
                  href="/medications"
                  className="text-xs text-[#16D6C1] hover:underline font-bold flex items-center gap-1"
                >
                  <span>{t.common.viewAll}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* List of Scheduled Doses */}
            <div className="space-y-3.5">
              {schedules.map((sched) => {
                // Determine if this specific medicine is already logged as taken today
                const isTaken = medLogs.some(
                  (l) => l.medicationId === sched.id && l.status === "taken" && l.date === "2026-10-24"
                );
                const displayTime = sched.scheduledTimes[0] || "09:00";

                return (
                  <div
                    key={sched.id}
                    className={`p-4 sm:p-5 rounded-2xl bg-[#080D1B]/90 border transition-all ${
                      isTaken
                        ? "border-emerald-500/30 bg-[#080D1B]/60"
                        : "border-[#1E2B45] hover:border-[#16D6C1]/40"
                    } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                  >
                    {/* Time & Medicine Details */}
                    <div className="flex items-start space-x-4">
                      {/* Formatted Time Badge */}
                      <div
                        className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-mono flex-shrink-0 ${
                          isTaken
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-[#18253A] text-[#16D6C1] border border-[#1E2B45]"
                        }`}
                      >
                        <span className="text-xs font-bold leading-none">{displayTime}</span>
                        <span className="text-[10px] text-[#9AA9BE] mt-1 font-sans">
                          {formatLocalTime(displayTime).includes("సాయంత్రం") || formatLocalTime(displayTime).includes("PM")
                            ? (lang === "te" ? "సాయంత్రం" : "PM")
                            : (lang === "te" ? "ఉదయం" : "AM")}
                        </span>
                      </div>

                      {/* Medicine Name, Dosage, Instructions */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-[#F4F7FC] text-sm sm:text-base">
                            {sched.medicineName}
                          </span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#18253A] text-[#16D6C1] font-mono border border-[#1E2B45]">
                            {sched.dosage}
                          </span>
                          {/* Timing Instruction Tag */}
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#080D1B] text-[#9AA9BE] border border-[#1E2B45]">
                            {sched.timing === "after_food"
                              ? (lang === "te" ? "భోజనం తర్వాత" : "After food")
                              : sched.timing === "before_food"
                              ? (lang === "te" ? "భోజనానికి ముందు" : "Before food")
                              : (lang === "te" ? "పడుకునే ముందు" : "Bedtime")}
                          </span>
                        </div>

                        <p className="text-xs text-[#9AA9BE] leading-relaxed">
                          {lang === "te" ? sched.instructionsTe : sched.instructionsEn}
                        </p>
                      </div>
                    </div>

                    {/* Action Button: Mark as Taken */}
                    <div className="flex items-center space-x-2 self-end sm:self-auto flex-shrink-0">
                      {isTaken ? (
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{t.dashboard.doseTaken}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleTakeDose(sched.id, sched.medicineName)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] hover:opacity-90 text-[#080D1B] text-xs font-bold shadow-md shadow-[#16D6C1]/20 transition-all active:scale-95 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t.dashboard.markAsTaken}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dose Adherence Safety Guardrail Alert */}
            <div className="p-4 rounded-2xl bg-[#080D1B] border border-[#1E2B45] text-xs text-[#9AA9BE] flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-[#16D6C1] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#F4F7FC] block">
                  {lang === "te" ? "వైద్య భద్రతా నియమం:" : "Clinical Regimen Safety Rule:"}
                </strong>
                <p className="mt-0.5 leading-relaxed">
                  {t.dashboard.doseAdherenceWarning}
                </p>
              </div>
            </div>
          </div>

          {/* Section F: Next Clinic Visit & Quick Actions (1 Column) */}
          <div className="space-y-6">
            {/* Next Consultation Card */}
            <div className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2B45]">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#35BDF5]" />
                  <h3 className="text-sm font-bold text-[#F4F7FC]">
                    {t.dashboard.nextConsultationTitle}
                  </h3>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                  {t.dashboard.confirmedStatus}
                </span>
              </div>

              {upcomingApt ? (
                <div className="space-y-4">
                  {/* Doctor Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#18253A] border border-[#1E2B45] text-[#35BDF5] flex items-center justify-center font-bold text-sm flex-shrink-0">
                      AS
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#F4F7FC]">
                        {localizeDoctor(upcomingApt.clinicianName)}
                      </h4>
                      <p className="text-xs text-[#35BDF5] font-medium mt-0.5">
                        {localizeSpecialty(upcomingApt.specialty)}
                      </p>
                    </div>
                  </div>

                  {/* Consultation Details */}
                  <div className="p-4 rounded-2xl bg-[#080D1B] border border-[#1E2B45] text-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[#9AA9BE]">{t.dashboard.dateTimeLabel}</span>
                      <strong className="text-[#16D6C1] font-bold">
                        {formatLocalDate(upcomingApt.date)} • {formatLocalTime(upcomingApt.startTime)}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9AA9BE]">{t.dashboard.locationLabel}</span>
                      <span className="text-[#F4F7FC] font-medium">{localizeRoom(upcomingApt.room)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#1E2B45]/60 text-[#9AA9BE]">
                      <span>{lang === "te" ? "కారణం:" : "Purpose:"}</span>
                      <span className="text-slate-300 italic truncate max-w-[160px]">
                        {lang === "te" ? "HbA1c త్రైమాసిక సమీక్ష" : "3-Month HbA1c Review"}
                      </span>
                    </div>
                  </div>

                  {/* Manage / Reschedule Button */}
                  <Link
                    href="/appointments"
                    className="w-full py-2.5 rounded-xl bg-[#18253A] hover:bg-[#1E2B45] text-[#F4F7FC] text-xs font-bold flex items-center justify-center gap-2 transition-all border border-[#1E2B45] hover:border-[#35BDF5]/40"
                  >
                    <span>{t.dashboard.manageAppointment}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#35BDF5]" />
                  </Link>
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-[#9AA9BE]">
                  {t.dashboard.noUpcomingVisits}
                </div>
              )}
            </div>

            {/* Section G: Quick Actions Hub */}
            <div className="p-5 rounded-3xl bg-[#121C30] border border-[#1E2B45] shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F4F7FC] uppercase tracking-wider">
                  {t.dashboard.quickActions}
                </span>
                <span className="text-[10px] text-[#16D6C1] font-mono">6 Workflows</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/prescriptions"
                  className="p-3.5 rounded-2xl bg-[#080D1B] hover:bg-[#18253A] text-xs font-semibold text-[#F4F7FC] hover:text-[#16D6C1] flex flex-col items-center justify-center text-center gap-2 transition-all border border-[#1E2B45] hover:border-[#16D6C1]/40"
                >
                  <div className="p-2 rounded-xl bg-[#16D6C1]/10 text-[#16D6C1]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span>{t.dashboard.uploadRx}</span>
                </Link>

                <Link
                  href="/reports"
                  className="p-3.5 rounded-2xl bg-[#080D1B] hover:bg-[#18253A] text-xs font-semibold text-[#F4F7FC] hover:text-[#35BDF5] flex flex-col items-center justify-center text-center gap-2 transition-all border border-[#1E2B45] hover:border-[#35BDF5]/40"
                >
                  <div className="p-2 rounded-xl bg-[#35BDF5]/10 text-[#35BDF5]">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span>{t.dashboard.labReportAi}</span>
                </Link>

                <Link
                  href="/reports/compare"
                  className="p-3.5 rounded-2xl bg-[#080D1B] hover:bg-[#18253A] text-xs font-semibold text-[#F4F7FC] hover:text-emerald-400 flex flex-col items-center justify-center text-center gap-2 transition-all border border-[#1E2B45] hover:border-emerald-500/40"
                >
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <span>{t.dashboard.compareTrends}</span>
                </Link>

                <Link
                  href="/appointments"
                  className="p-3.5 rounded-2xl bg-[#080D1B] hover:bg-[#18253A] text-xs font-semibold text-[#F4F7FC] hover:text-amber-400 flex flex-col items-center justify-center text-center gap-2 transition-all border border-[#1E2B45] hover:border-amber-500/40"
                >
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span>{t.dashboard.bookAppointment}</span>
                </Link>

                <Link
                  href="/medications"
                  className="p-3.5 rounded-2xl bg-[#080D1B] hover:bg-[#18253A] text-xs font-semibold text-[#F4F7FC] hover:text-[#16D6C1] flex flex-col items-center justify-center text-center gap-2 transition-all border border-[#1E2B45] hover:border-[#16D6C1]/40"
                >
                  <div className="p-2 rounded-xl bg-[#16D6C1]/10 text-[#16D6C1]">
                    <Pill className="w-4 h-4" />
                  </div>
                  <span>{t.dashboard.medicationSchedule}</span>
                </Link>

                <Link
                  href="/clinic/dashboard"
                  className="p-3.5 rounded-2xl bg-[#080D1B] hover:bg-[#18253A] text-xs font-semibold text-[#F4F7FC] hover:text-purple-400 flex flex-col items-center justify-center text-center gap-2 transition-all border border-[#1E2B45] hover:border-purple-500/40"
                >
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                    <ListTodo className="w-4 h-4" />
                  </div>
                  <span>{t.dashboard.viewCareTasks}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION H: Longitudinal Biomarker Trends & Laboratory Progress
        ========================================================================= */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#121C30] border border-[#1E2B45] shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E2B45]">
            <div>
              <div className="flex items-center space-x-2.5">
                <div className="p-2.5 rounded-xl bg-[#16D6C1]/15 text-[#16D6C1] border border-[#16D6C1]/30">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#F4F7FC]">
                    {t.dashboard.biomarkerSectionTitle}
                  </h3>
                  <p className="text-xs text-[#9AA9BE] mt-0.5 leading-relaxed">
                    {t.dashboard.biomarkerSectionDesc}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/reports/compare"
              className="text-xs text-[#16D6C1] hover:underline font-bold flex items-center gap-1.5 self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-[#16D6C1]/10 border border-[#16D6C1]/30"
            >
              <span>{t.dashboard.deepDiveCompare}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Interactive Recharts Graph */}
          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={biomarkerTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2B45" />
                <XAxis dataKey="period" stroke="#9AA9BE" fontSize={12} tickLine={false} />
                <YAxis
                  yAxisId="left"
                  stroke="#16D6C1"
                  fontSize={12}
                  domain={[6.5, 9.0]}
                  unit="%"
                  tickLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#35BDF5"
                  fontSize={12}
                  domain={[120, 180]}
                  unit=" mg"
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#10182B",
                    borderColor: "#1E2B45",
                    borderRadius: "16px",
                    color: "#F4F7FC",
                    fontSize: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="hba1c"
                  name={lang === "te" ? "HbA1c సగటు (%)" : "HbA1c Average (%)"}
                  stroke="#16D6C1"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#16D6C1", stroke: "#080D1B", strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="glucose"
                  name={lang === "te" ? "రక్తంలో చక్కెర (mg/dL)" : "Fasting Glucose (mg/dL)"}
                  stroke="#35BDF5"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#35BDF5", stroke: "#080D1B", strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Biomarker Improvement Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-xs">
            <div className="p-4 rounded-2xl bg-[#080D1B] border border-[#16D6C1]/30 space-y-1">
              <span className="text-[#16D6C1] font-semibold flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5" />
                {t.dashboard.hba1cAverage}
              </span>
              <div className="text-sm font-bold text-[#F4F7FC]">
                {t.dashboard.relativeImprovement}
              </div>
              <span className="text-[10px] text-[#9AA9BE] block">
                {lang === "te" ? "లక్ష్యం: < 7.0% (సానుకూల ప్రతిస్పందన)" : "Target: < 7.0% (Positive response)"}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#080D1B] border border-[#35BDF5]/30 space-y-1">
              <span className="text-[#35BDF5] font-semibold flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5" />
                {t.dashboard.fastingBloodSugar}
              </span>
              <div className="text-sm font-bold text-[#F4F7FC]">
                {t.dashboard.dropPercentage}
              </div>
              <span className="text-[10px] text-[#9AA9BE] block">
                {lang === "te" ? "లక్ష్యం: 70 - 99 mg/dL" : "Target: 70 - 99 mg/dL"}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#080D1B] border border-emerald-500/30 space-y-1">
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5" />
                {lang === "te" ? "LDL చెడు కొలెస్ట్రాల్" : "LDL Bad Cholesterol"}
              </span>
              <div className="text-sm font-bold text-[#F4F7FC]">
                154 ➔ 132 mg/dL (-14.2%)
              </div>
              <span className="text-[10px] text-[#9AA9BE] block">
                {lang === "te" ? "అటోర్వాస్టాటిన్ 10mg తో నియంత్రణ" : "Stabilized with Atorvastatin 10mg"}
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION I: Clinical Safety & AI Governance Footer Card
        ========================================================================= */}
        <div className="p-5 rounded-3xl bg-[#080D1B] border border-[#1E2B45] text-xs space-y-2">
          <div className="flex items-center space-x-2 text-[#16D6C1] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.dashboard.clinicalSafetyNotice}</span>
          </div>
          <p className="text-[#9AA9BE] leading-relaxed">
            {t.dashboard.clinicalSafetyNoticeDesc}
          </p>
        </div>
      </div>
    </AppShell>
  );
}

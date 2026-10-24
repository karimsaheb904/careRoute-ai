"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Pill,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Calendar,
  ShieldCheck,
  Plus,
  HelpCircle,
  TrendingUp,
} from "lucide-react";

export default function MedicationsPage() {
  const {
    schedules,
    medLogs,
    logMedicationStatus,
    lang,
    t,
  } = useCareRoute();

  const [activeTab, setActiveTab] = useState<"today" | "history">("today");
  const [selectedMedId, setSelectedMedId] = useState<string | null>(null);
  const [logStatus, setLogStatus] = useState<"taken" | "skipped" | "missed">("taken");
  const [logNotes, setLogNotes] = useState("");
  const [showLogModal, setShowLogModal] = useState(false);

  // Adherence calculation
  const totalLogs = medLogs.length;
  const takenLogs = medLogs.filter((l) => l.status === "taken").length;
  const adherenceRate = totalLogs > 0 ? Math.round((takenLogs / totalLogs) * 100) : 89;

  const handleOpenLogModal = (medId: string, status: "taken" | "skipped" | "missed") => {
    setSelectedMedId(medId);
    setLogStatus(status);
    setLogNotes(
      status === "skipped"
        ? "Felt slight nausea, skipped one dose."
        : status === "taken"
        ? "Taken on time with water."
        : "Missed dose due to traffic."
    );
    setShowLogModal(true);
  };

  const handleConfirmLog = () => {
    if (!selectedMedId) return;
    logMedicationStatus(selectedMedId, logStatus, logNotes);
    setShowLogModal(false);
    setSelectedMedId(null);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-semibold">
              <Pill className="w-3.5 h-3.5 text-teal-400" />
              <span>Module 2 — Adherence & Dose Tracking</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {t.medications.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-0.5">
              {t.medications.subtitle}
            </p>
          </div>

          {/* Adherence Rate Pill */}
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl self-start sm:self-auto">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
              {adherenceRate}%
            </div>
            <div>
              <div className="text-xs font-bold text-white">{t.medications.weeklyAdherence}</div>
              <div className="text-[10px] text-teal-300">Verified doctor regimen</div>
            </div>
          </div>
        </div>

        {/* Safety Warning Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-xs text-amber-200">
          <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="text-amber-300 font-bold">Important Clinical Safety Instruction:</strong>
            <p className="text-slate-300 leading-relaxed">
              {t.medications.safetyMissedDoseWarning}
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "today"
                ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {t.medications.todaySchedule}
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "history"
                ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            Dose History Log ({medLogs.length})
          </button>
        </div>

        {/* Today's Schedule View */}
        {activeTab === "today" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {schedules.map((sched) => {
                const logsForToday = medLogs.filter((l) => l.medicationId === sched.id);
                const isTaken = logsForToday.some((l) => l.status === "taken");
                const isSkipped = logsForToday.some((l) => l.status === "skipped");

                return (
                  <div
                    key={sched.id}
                    className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 card-hover flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex flex-col items-center justify-center font-bold text-xs">
                        <span>{sched.scheduledTimes[0] || "09:00"}</span>
                        <span className="text-[9px] text-slate-400 uppercase">
                          {parseInt(sched.scheduledTimes[0] || "9") >= 12 ? "PM" : "AM"}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">
                            {sched.medicineName}
                          </h3>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 font-mono text-xs">
                            {sched.dosage}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">
                          {lang === "te" ? sched.instructionsTe : sched.instructionsEn}
                        </p>
                        <div className="text-[11px] text-slate-500 flex items-center gap-3 pt-1">
                          <span>Timing: {sched.timing.replace("_", " ")}</span>
                          <span>•</span>
                          <span>Start: {sched.startDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                      {isTaken ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/15 text-teal-300 border border-teal-500/30 text-xs font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-teal-400" />
                          <span>Dose Taken</span>
                        </div>
                      ) : isSkipped ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                          <span>Skipped</span>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleOpenLogModal(sched.id, "taken")}
                            className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Take Dose</span>
                          </button>
                          <button
                            onClick={() => handleOpenLogModal(sched.id, "skipped")}
                            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-colors"
                          >
                            Skip
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* History Log View */}
        {activeTab === "history" && (
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">
              Patient-Reported Dose Adherence History
            </h3>

            <div className="divide-y divide-slate-800 rounded-2xl bg-slate-950/60 border border-slate-800 overflow-hidden">
              {medLogs.map((log) => (
                <div key={log.id} className="p-4 text-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-white">{log.medicineName}</div>
                    <div className="text-slate-400 text-[11px]">
                      Scheduled: {log.date} at {log.scheduledTime}
                    </div>
                    {log.notes && (
                      <p className="text-slate-500 italic text-[11px]">
                        Note: &quot;{log.notes}&quot;
                      </p>
                    )}
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                      log.status === "taken"
                        ? "bg-teal-500/15 text-teal-300 border border-teal-500/30"
                        : log.status === "skipped"
                        ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Log Confirmation Modal */}
        {showLogModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">
                Log Dose Status: <span className="capitalize text-teal-400">{logStatus}</span>
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Optional notes or symptoms (e.g. food timing, side effects):
                </label>
                <textarea
                  rows={2}
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                Notice: Dose logging distinguishes patient reminders from clinical proof of administration.
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLog}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 active:scale-95 transition-all"
                >
                  Save Log Entry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

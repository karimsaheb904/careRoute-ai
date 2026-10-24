"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Pill,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export default function MedicationsPage() {
  const {
    schedules,
    medLogs,
    logMedicationStatus,
    lang,
    formatLocalDate,
    formatLocalTime,
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
        ? (lang === "te" ? "కొద్దిగా వికారం అనిపించింది, ఒక మోతాదు దాటవేశాను." : "Felt slight nausea, skipped one dose.")
        : status === "taken"
        ? (lang === "te" ? "సమయానికి నీటితో తీసుకున్నాను." : "Taken on time with water.")
        : (lang === "te" ? "ప్రయాణం వల్ల సమయానికి తీసుకోలేకపోయాను." : "Missed dose due to travel.")
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2B45]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16D6C1]/10 text-[#16D6C1] border border-[#16D6C1]/30 text-xs font-semibold">
              <Pill className="w-3.5 h-3.5" />
              <span>{lang === "te" ? "మాడ్యూల్ 2 — మందుల రిమైండర్లు & ట్రాకింగ్" : "Module 2 — Adherence & Dose Tracking"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FC] mt-1.5">
              {t.medications.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#9AA9BE] max-w-2xl mt-0.5 leading-relaxed">
              {t.medications.subtitle}
            </p>
          </div>

          {/* Adherence Rate Pill */}
          <div className="flex items-center gap-3.5 bg-[#121C30] border border-[#1E2B45] p-3.5 rounded-2xl self-start sm:self-auto shadow-md">
            <div className="w-11 h-11 rounded-2xl bg-[#16D6C1]/15 text-[#16D6C1] border border-[#16D6C1]/30 flex items-center justify-center font-black text-sm">
              {adherenceRate}%
            </div>
            <div>
              <div className="text-xs font-bold text-[#F4F7FC]">{t.medications.weeklyAdherence}</div>
              <div className="text-[11px] text-[#16D6C1]">{t.medications.verifiedDoctorRegimen}</div>
            </div>
          </div>
        </div>

        {/* Safety Warning Banner */}
        <div className="p-4 rounded-3xl bg-[#121C30] border border-amber-500/40 flex items-start space-x-3 text-xs text-amber-200 shadow-md">
          <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="text-amber-300 font-bold">{lang === "te" ? "ముఖ్యమైన భద్రతా మార్గదర్శకం:" : "Important Clinical Safety Instruction:"}</strong>
            <p className="text-[#9AA9BE] leading-relaxed">
              {t.medications.safetyMissedDoseWarning}
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center space-x-2 border-b border-[#1E2B45] pb-2">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "today"
                ? "bg-[#16D6C1] text-[#080D1B] shadow-md shadow-[#16D6C1]/20"
                : "text-[#9AA9BE] hover:text-[#F4F7FC] hover:bg-[#121C30]"
            }`}
          >
            {t.medications.todaySchedule}
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "history"
                ? "bg-[#16D6C1] text-[#080D1B] shadow-md shadow-[#16D6C1]/20"
                : "text-[#9AA9BE] hover:text-[#F4F7FC] hover:bg-[#121C30]"
            }`}
          >
            {lang === "te" ? `మోతాదు చరిత్ర రికార్డు (${medLogs.length})` : `Dose History Log (${medLogs.length})`}
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
                    className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] card-healthcare flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-12 rounded-2xl bg-[#18253A] text-[#16D6C1] border border-[#1E2B45] flex flex-col items-center justify-center font-bold text-xs flex-shrink-0 text-center px-1">
                        <span className="text-[11px] leading-tight font-mono">{formatLocalTime(sched.scheduledTimes[0] || "09:00")}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-[#F4F7FC]">
                            {sched.medicineName}
                          </h3>
                          <span className="px-2 py-0.5 rounded bg-[#18253A] text-[#16D6C1] font-mono text-xs border border-[#1E2B45]">
                            {sched.dosage}
                          </span>
                        </div>
                        <p className="text-xs text-[#9AA9BE] leading-relaxed">
                          {lang === "te" ? sched.instructionsTe : sched.instructionsEn}
                        </p>
                        <div className="text-[11px] text-[#9AA9BE] flex items-center gap-3 pt-1">
                          <span>{t.prescriptions.timing}: {sched.timing.replace("_", " ")}</span>
                          <span>•</span>
                          <span>{lang === "te" ? "ప్రారంభం: " : "Start: "}{formatLocalDate(sched.startDate)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 self-end sm:self-auto flex-shrink-0">
                      {isTaken ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#16D6C1]/15 text-[#16D6C1] border border-[#16D6C1]/30 text-xs font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-[#16D6C1]" />
                          <span>{t.medications.statusTaken}</span>
                        </div>
                      ) : isSkipped ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                          <span>{t.medications.statusSkipped}</span>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleOpenLogModal(sched.id, "taken")}
                            className="px-3.5 py-2 rounded-xl bg-[#16D6C1] hover:bg-[#14b8a6] text-[#080D1B] font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#16D6C1]/20 active:scale-95 transition-all"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{t.medications.markTaken}</span>
                          </button>
                          <button
                            onClick={() => handleOpenLogModal(sched.id, "skipped")}
                            className="px-3 py-2 rounded-xl bg-[#18253A] hover:bg-[#1E2B45] text-[#9AA9BE] hover:text-[#F4F7FC] font-medium text-xs transition-colors border border-[#1E2B45]"
                          >
                            {t.medications.markSkipped}
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
          <div className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] space-y-4">
            <h3 className="text-sm font-bold text-[#F4F7FC]">
              {t.medications.historyTitle}
            </h3>

            <div className="divide-y divide-[#1E2B45] rounded-2xl bg-[#080D1B] border border-[#1E2B45] overflow-hidden">
              {medLogs.map((log) => (
                <div key={log.id} className="p-4 text-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#F4F7FC]">{log.medicineName}</div>
                    <div className="text-[#9AA9BE] text-[11px]">
                      {lang === "te" ? "షెడ్యూల్ సమయం: " : "Scheduled: "}{formatLocalDate(log.date)} • {log.scheduledTime}
                    </div>
                    {log.notes && (
                      <p className="text-[#9AA9BE] italic text-[11px] mt-0.5">
                        {lang === "te" ? "గమనిక: " : "Note: "}&quot;{log.notes}&quot;
                      </p>
                    )}
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                      log.status === "taken"
                        ? "bg-[#16D6C1]/15 text-[#16D6C1] border border-[#16D6C1]/30"
                        : log.status === "skipped"
                        ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {log.status === "taken" ? t.medications.statusTaken : log.status === "skipped" ? t.medications.statusSkipped : t.medications.statusMissed}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Log Confirmation Modal */}
        {showLogModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1B]/85 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-md bg-[#121C30] border border-[#1E2B45] rounded-3xl shadow-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-[#F4F7FC]">
                {t.medications.logDoseTitle}: <span className="capitalize text-[#16D6C1]">{logStatus}</span>
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F4F7FC]">
                  {t.medications.logDoseNotes}
                </label>
                <textarea
                  rows={2}
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                />
              </div>

              <div className="p-3 rounded-2xl bg-[#080D1B] border border-[#1E2B45] text-[11px] text-[#9AA9BE]">
                {t.medications.logDoseNotice}
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#1E2B45]">
                <button
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#9AA9BE] hover:text-[#F4F7FC]"
                >
                  {t.common.cancel}
                </button>
                <button
                  onClick={handleConfirmLog}
                  className="px-5 py-2.5 rounded-2xl bg-[#16D6C1] hover:bg-[#14b8a6] text-[#080D1B] font-bold text-xs shadow-md shadow-[#16D6C1]/20 active:scale-95 transition-all"
                >
                  {t.medications.saveLogEntry}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

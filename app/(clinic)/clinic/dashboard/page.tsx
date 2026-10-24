"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Stethoscope,
  ListTodo,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import { ClinicCareTask } from "@/types";

export default function ClinicDashboardPage() {
  const {
    careTasks,
    updateCareTaskStatus,
    appointments,
    reports,
    prescriptions,
    currentUser,
    lang,
    formatLocalDate,
    t,
  } = useCareRoute();

  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<ClinicCareTask | null>(null);
  const [actionNote, setActionNote] = useState("");
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<"completed" | "escalated">("completed");

  const overdueTasks = careTasks.filter((task) => task.status === "action_required" || task.status === "pending");
  const missedApts = appointments.filter((a) => a.status === "missed");
  const pendingRx = prescriptions.filter((r) => r.status === "flagged_ambiguity" || r.status === "pending_verification");

  const filteredTasks = careTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const handleOpenActionModal = (task: ClinicCareTask, type: "completed" | "escalated") => {
    setSelectedTask(task);
    setActionType(type);
    setActionNote(
      type === "completed"
        ? (lang === "te"
            ? "రోగిని సంప్రదించాను. ల్యాబ్ ఫలితాలు సమీక్షించబడ్డాయి మరియు మందుల నియమావళి స్థిరంగా ఉంది."
            : "Contacted patient. Confirmed lab values reviewed and medication adherence stable.")
        : (lang === "te"
            ? "బయోమార్కర్ విలువలు పరిధి దాటినందున ముఖ్య వైద్యుడికి ఎస్కలేట్ చేయబడింది."
            : "Escalated to attending physician due to elevated biomarker thresholds.")
    );
    setShowActionModal(true);
  };

  const handleConfirmAction = () => {
    if (!selectedTask) return;
    updateCareTaskStatus(selectedTask.id, actionType, actionNote, currentUser.fullName);
    setShowActionModal(false);
    setSelectedTask(null);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2B45]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#35BDF5]/10 text-[#35BDF5] border border-[#35BDF5]/30 text-xs font-semibold">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{lang === "te" ? "మాడ్యూల్ 6 — క్లినిక్ సిబ్బంది కమాండ్ సెంటర్" : "Module 6 — Clinic Staff Command Center"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FC] mt-1.5">
              {t.clinic.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#9AA9BE] max-w-2xl mt-0.5 leading-relaxed">
              {t.clinic.subtitle} • {lang === "te" ? "లాగిన్ అయిన సిబ్బంది: " : "Logged in as: "}{currentUser.fullName}
            </p>
          </div>

          <Link
            href="/clinic/follow-ups"
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] hover:opacity-90 text-[#080D1B] font-bold text-xs flex items-center gap-2 shadow-md shadow-[#16D6C1]/20 transition-all active:scale-95 self-start sm:self-auto"
          >
            <ListTodo className="w-4 h-4" />
            <span>{lang === "te" ? "కేర్ ఫాలో-అప్ వర్క్‌ఫ్లో" : "Care Follow-Up Workflow"}</span>
          </Link>
        </div>

        {/* 4 Clinical Triage Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-[#121C30] border border-[#1E2B45] card-healthcare">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9AA9BE] font-medium">{t.clinic.overdueTasks}</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-[#F4F7FC] mt-2">
              {overdueTasks.length}
            </div>
            <div className="text-[11px] text-rose-400 mt-1">{lang === "te" ? "చర్య అవసరం" : "Action required"}</div>
          </div>

          <div className="p-5 rounded-3xl bg-[#121C30] border border-[#1E2B45] card-healthcare">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9AA9BE] font-medium">{t.clinic.missedAppointments}</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-[#F4F7FC] mt-2">
              {missedApts.length}
            </div>
            <div className="text-[11px] text-amber-300 mt-1">{lang === "te" ? "రికవరీ క్యూలో ఉంది" : "Recovery queued"}</div>
          </div>

          <div className="p-5 rounded-3xl bg-[#121C30] border border-[#1E2B45] card-healthcare">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9AA9BE] font-medium">{lang === "te" ? "అస్పష్టమైన ప్రిస్క్రిప్షన్లు" : "Ambiguous Prescriptions"}</span>
              <ShieldAlert className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-[#F4F7FC] mt-2">
              {pendingRx.length}
            </div>
            <div className="text-[11px] text-purple-300 mt-1">{lang === "te" ? "ధృవీకరణ బకాయి" : "Verification pending"}</div>
          </div>

          <div className="p-5 rounded-3xl bg-[#121C30] border border-[#1E2B45] card-healthcare">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9AA9BE] font-medium">{t.clinic.pendingReviews}</span>
              <CheckCircle2 className="w-4 h-4 text-[#16D6C1]" />
            </div>
            <div className="text-2xl font-black text-[#F4F7FC] mt-2">
              {reports.filter((r) => r.hasAbnormalValues).length}
            </div>
            <div className="text-[11px] text-[#16D6C1] mt-1">{lang === "te" ? "పరిధి దాటినవి" : "Out-of-range flagged"}</div>
          </div>
        </div>

        {/* Search & Priority Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-3xl bg-[#121C30] border border-[#1E2B45]">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#9AA9BE] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={t.clinic.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-2xl bg-[#080D1B] border border-[#1E2B45] text-xs text-[#F4F7FC] placeholder-[#9AA9BE] focus:outline-none focus:border-[#16D6C1]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#9AA9BE]">{t.clinic.priorityLabel}</span>
            {["all", "high", "medium", "low"].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  priorityFilter === p
                    ? "bg-[#16D6C1] text-[#080D1B] font-bold"
                    : "bg-[#080D1B] text-[#9AA9BE] hover:text-[#F4F7FC] border border-[#1E2B45]"
                }`}
              >
                {p === "all" ? (lang === "te" ? "అన్నీ" : "All") : p}
              </button>
            ))}
          </div>
        </div>

        {/* Task Queue List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#F4F7FC]">
            {t.clinic.taskQueue} ({filteredTasks.length})
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {filteredTasks.map((task) => {
              const isHigh = task.priority === "high";
              const isCompleted = task.status === "completed";
              const isEscalated = task.status === "escalated";

              return (
                <div
                  key={task.id}
                  className={`p-6 rounded-3xl bg-[#121C30] border transition-all ${
                    isCompleted
                      ? "border-[#16D6C1]/30 opacity-75"
                      : isEscalated
                      ? "border-purple-500/50 bg-purple-950/10"
                      : isHigh
                      ? "border-rose-500/40"
                      : "border-[#1E2B45]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2B45]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#F4F7FC] text-base">
                          {task.title}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isHigh
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {task.priority} {lang === "te" ? "ప్రాధాన్యత" : "Priority"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#18253A] text-[#9AA9BE] border border-[#1E2B45] uppercase">
                          {task.status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="text-xs text-[#9AA9BE] flex flex-wrap items-center gap-3">
                        <span>{t.common.patient}: <strong className="text-[#F4F7FC]">{task.patientName}</strong></span>
                        <span>•</span>
                        <span>{t.clinic.assignedToLabel} <strong className="text-[#16D6C1]">{task.assignedTo}</strong> ({task.assignedStaffRole})</span>
                        <span>•</span>
                        <span>{t.clinic.dueDateLabel} {formatLocalDate(task.dueDate)}</span>
                      </div>
                    </div>

                    {/* Completion & Escalation Actions */}
                    {!isCompleted && (
                      <div className="flex items-center space-x-2 self-start sm:self-auto flex-shrink-0">
                        <button
                          onClick={() => handleOpenActionModal(task, "completed")}
                          className="px-3.5 py-2 rounded-xl bg-[#16D6C1] hover:bg-[#14b8a6] text-[#080D1B] font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.clinic.completeTask}</span>
                        </button>
                        <button
                          onClick={() => handleOpenActionModal(task, "escalated")}
                          className="px-3.5 py-2 rounded-xl bg-[#18253A] hover:bg-[#1E2B45] text-purple-300 border border-purple-500/30 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>{t.clinic.escalateTask}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-xs space-y-1">
                    <div className="text-[#F4F7FC]">
                      <strong className="text-[#16D6C1]">{t.clinic.nextActionLabel} </strong>
                      {task.nextAction}
                    </div>

                    {/* Audit History Expansion */}
                    {task.history.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[#1E2B45] space-y-1.5">
                        <span className="text-[11px] font-bold text-[#9AA9BE] uppercase tracking-wider">
                          {t.clinic.actionHistory}:
                        </span>
                        <div className="space-y-1">
                          {task.history.map((h) => (
                            <div key={h.id} className="text-[11px] text-[#9AA9BE] flex items-start gap-2">
                              <span className="text-[#9AA9BE] font-mono flex-shrink-0">{h.timestamp}</span>
                              <span>•</span>
                              <strong className="text-[#F4F7FC]">{h.actor} ({h.action}):</strong>
                              <span>{h.note}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Action Modal */}
        {showActionModal && selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1B]/85 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-md bg-[#121C30] border border-[#1E2B45] rounded-3xl shadow-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-[#F4F7FC] capitalize">
                {actionType === "completed" ? t.clinic.modalCompleteTitle : t.clinic.modalEscalateTitle}
              </h3>

              <div className="text-xs text-[#9AA9BE]">
                {lang === "te" ? "టాస్క్: " : "Task: "}<strong className="text-[#F4F7FC]">{selectedTask.title}</strong>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F4F7FC]">
                  {t.clinic.modalNoteLabel}
                </label>
                <textarea
                  rows={3}
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#1E2B45]">
                <button
                  onClick={() => setShowActionModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#9AA9BE] hover:text-[#F4F7FC]"
                >
                  {t.common.cancel}
                </button>
                <button
                  onClick={handleConfirmAction}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] text-[#080D1B] font-bold text-xs shadow-md shadow-[#16D6C1]/20 active:scale-95 transition-all"
                >
                  {t.clinic.recordAuditBtn}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

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
  Calendar,
  Search,
  Filter,
  User,
  ArrowUpRight,
  ShieldAlert,
  ChevronRight,
  RotateCcw,
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
    t,
  } = useCareRoute();

  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<ClinicCareTask | null>(null);
  const [actionNote, setActionNote] = useState("");
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<"completed" | "escalated">("completed");

  const overdueTasks = careTasks.filter((t) => t.status === "action_required" || t.status === "pending");
  const missedApts = appointments.filter((a) => a.status === "missed");
  const pendingRx = prescriptions.filter((r) => r.status === "flagged_ambiguity" || r.status === "pending_verification");

  const filteredTasks = careTasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const handleOpenActionModal = (task: ClinicCareTask, type: "completed" | "escalated") => {
    setSelectedTask(task);
    setActionType(type);
    setActionNote(
      type === "completed"
        ? "Contacted patient. Confirmed lab values reviewed and medication adherence stable."
        : "Escalated to attending physician due to elevated biomarker thresholds."
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold">
              <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
              <span>Module 6 — Clinic Staff Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {t.clinic.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-0.5">
              {t.clinic.subtitle} Logged in as: {currentUser.fullName}
            </p>
          </div>

          <Link
            href="/clinic/follow-ups"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-teal-500/20 transition-all active:scale-95 self-start sm:self-auto"
          >
            <ListTodo className="w-4 h-4" />
            <span>AI Care Follow-Up Workflow</span>
          </Link>
        </div>

        {/* 4 Clinical Triage Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 card-hover">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Overdue Follow-Ups</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">
              {overdueTasks.length}
            </div>
            <div className="text-[11px] text-rose-400 mt-1">Action required</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 card-hover">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Missed Appointments</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">
              {missedApts.length}
            </div>
            <div className="text-[11px] text-amber-300 mt-1">Recovery queued</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 card-hover">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Ambiguous Prescriptions</span>
              <ShieldAlert className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">
              {pendingRx.length}
            </div>
            <div className="text-[11px] text-purple-300 mt-1">Verification pending</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 card-hover">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Pending Lab Reviews</span>
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">
              {reports.filter((r) => r.hasAbnormalValues).length}
            </div>
            <div className="text-[11px] text-teal-300 mt-1">Out-of-range flagged</div>
          </div>
        </div>

        {/* Search & Priority Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by task title, patient name, or assignee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Priority:</span>
            {["all", "high", "medium", "low"].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                  priorityFilter === p
                    ? "bg-teal-500 text-slate-950 font-bold"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Task Queue List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white">
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
                  className={`p-6 rounded-3xl bg-slate-900/90 border transition-all ${
                    isCompleted
                      ? "border-teal-500/30 opacity-75"
                      : isEscalated
                      ? "border-purple-500/50 bg-purple-950/10"
                      : isHigh
                      ? "border-rose-500/40"
                      : "border-slate-800"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">
                          {task.title}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isHigh
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {task.priority} Priority
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                          {task.status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                        <span>Patient: <strong className="text-slate-200">{task.patientName}</strong></span>
                        <span>•</span>
                        <span>Assigned to: <strong className="text-teal-300">{task.assignedTo}</strong> ({task.assignedStaffRole})</span>
                        <span>•</span>
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>

                    {/* Completion & Escalation Actions */}
                    {!isCompleted && (
                      <div className="flex items-center space-x-2 self-start sm:self-auto">
                        <button
                          onClick={() => handleOpenActionModal(task, "completed")}
                          className="px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all active:scale-95"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.clinic.completeTask}</span>
                        </button>
                        <button
                          onClick={() => handleOpenActionModal(task, "escalated")}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 font-semibold text-xs flex items-center gap-1 transition-colors"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>{t.clinic.escalateTask}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-xs space-y-1">
                    <div className="text-slate-300">
                      <strong className="text-teal-300">Next Action: </strong>
                      {task.nextAction}
                    </div>

                    {/* Audit History Expansion */}
                    {task.history.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Audit Trail & Action History:
                        </span>
                        <div className="space-y-1">
                          {task.history.map((h) => (
                            <div key={h.id} className="text-[11px] text-slate-400 flex items-start gap-2">
                              <span className="text-slate-500 font-mono flex-shrink-0">{h.timestamp}</span>
                              <span>•</span>
                              <strong className="text-slate-300">{h.actor} ({h.action}):</strong>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white capitalize">
                {actionType === "completed" ? "Mark Task Completed" : "Escalate to Attending Physician"}
              </h3>

              <div className="text-xs text-slate-300">
                Task: <strong className="text-white">{selectedTask.title}</strong>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Clinical Action Note & Reason:
                </label>
                <textarea
                  rows={3}
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  onClick={() => setShowActionModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 active:scale-95 transition-all"
                >
                  Record into Audit Log
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

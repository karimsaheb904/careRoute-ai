"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Sparkles,
  RotateCcw,
  X,
} from "lucide-react";
import { Appointment, AppointmentConflict } from "@/types";

export default function AppointmentsPage() {
  const {
    appointments,
    checkAppointmentConflict,
    scheduleAppointment,
    currentUser,
    lang,
    formatLocalDate,
    t,
  } = useCareRoute();

  const [showBookModal, setShowBookModal] = useState(false);
  const [date, setDate] = useState("2026-11-05");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:30");
  const [doctorName, setDoctorName] = useState("Dr. Anita Sharma, MD");
  const [specialty, setSpecialty] = useState("Endocrinology");
  const [room, setRoom] = useState("Room 302 (Consultation Suite)");
  const appointmentType: Appointment["appointmentType"] = "Follow-up Review";
  const [reason, setReason] = useState(
    lang === "te" ? "సాధారణ డయాబెటిస్ తనిఖీ" : "Routine diabetes review"
  );

  // Conflict state
  const [conflictResult, setConflictResult] = useState<AppointmentConflict | null>(null);
  const [showConflictModal, setShowConflictModal] = useState(false);

  const handleAttemptBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const conflict = checkAppointmentConflict(date, startTime, endTime, doctorName, room);

    if (conflict.hasConflict) {
      setConflictResult(conflict);
      setShowConflictModal(true);
      return;
    }

    scheduleAppointment({
      patientId: currentUser.id,
      patientName: currentUser.fullName,
      patientPhone: "+91 98765 43210",
      clinicianId: "doc-anita-sharma",
      clinicianName: doctorName,
      specialty,
      appointmentType,
      date,
      startTime,
      endTime,
      room,
      status: "confirmed",
      reasonForVisit: reason,
    });

    setShowBookModal(false);
  };

  const handleSelectAlternativeSlot = (slot: {
    date: string;
    startTime: string;
    endTime: string;
    room: string;
  }) => {
    setDate(slot.date);
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);
    setRoom(slot.room);
    setShowConflictModal(false);

    scheduleAppointment({
      patientId: currentUser.id,
      patientName: currentUser.fullName,
      patientPhone: "+91 98765 43210",
      clinicianId: "doc-anita-sharma",
      clinicianName: doctorName,
      specialty,
      appointmentType,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      room: slot.room,
      status: "confirmed",
      reasonForVisit: reason,
    });

    setShowBookModal(false);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2B45]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16D6C1]/10 text-[#16D6C1] border border-[#16D6C1]/30 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>{lang === "te" ? "మాడ్యూల్ 5 — స్మార్ట్ కొలిషన్ ఇంజిన్" : "Module 5 — Smart Collision Engine"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FC] mt-1.5">
              {t.appointments.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#9AA9BE] max-w-2xl mt-0.5 leading-relaxed">
              {t.appointments.subtitle}
            </p>
          </div>

          <button
            onClick={() => {
              setConflictResult(null);
              setShowBookModal(true);
            }}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] hover:opacity-90 text-[#080D1B] font-bold text-xs flex items-center gap-2 shadow-md shadow-[#16D6C1]/20 transition-all active:scale-95 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{t.appointments.bookNew}</span>
          </button>
        </div>

        {/* Demo Tip Banner for Judges */}
        <div className="p-4 rounded-3xl bg-[#121C30] border border-[#16D6C1]/40 flex items-start space-x-3 text-xs shadow-md">
          <Sparkles className="w-5 h-5 text-[#16D6C1] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-[#16D6C1] font-bold">
              {lang === "te" ? "న్యాయనిర్ణేత డెమో ఘర్షణ పరీక్ష:" : "Judge Demo Conflict Test:"}
            </strong>
            <p className="text-[#9AA9BE] leading-relaxed">
              {t.appointments.scheduleConflictDemoTip}
            </p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#F4F7FC]">
            {t.appointments.scheduleListTitle} ({appointments.length})
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {appointments.map((apt) => {
              const isMissed = apt.status === "missed";
              const isConfirmed = apt.status === "confirmed";

              return (
                <div
                  key={apt.id}
                  className={`p-6 rounded-3xl bg-[#121C30] border transition-all ${
                    isMissed
                      ? "border-amber-500/40 bg-amber-950/10"
                      : isConfirmed
                      ? "border-[#16D6C1]/40"
                      : "border-[#1E2B45]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E2B45]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#F4F7FC] text-base">
                          {apt.clinicianName}
                        </span>
                        <span className="text-xs text-[#16D6C1]">({apt.specialty})</span>
                        {isConfirmed && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#16D6C1]/15 text-[#16D6C1] border border-[#16D6C1]/30">
                            {t.common.confirmedBadge}
                          </span>
                        )}
                        {isMissed && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            {t.common.missedBadge}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-[#9AA9BE] flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1 text-[#F4F7FC] font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-[#16D6C1]" />
                          {formatLocalDate(apt.date)} • {apt.startTime} - {apt.endTime}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#35BDF5]" />
                          {apt.room}
                        </span>
                        <span>•</span>
                        <span>{apt.appointmentType}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    {isMissed && (
                      <button
                        onClick={() => {
                          setDate("2026-11-06");
                          setStartTime("11:30");
                          setEndTime("12:00");
                          setDoctorName(apt.clinicianName);
                          setSpecialty(apt.specialty);
                          setRoom(apt.room);
                          setShowBookModal(true);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#080D1B] font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all self-start sm:self-auto"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{t.appointments.recoverMissedBtn}</span>
                      </button>
                    )}
                  </div>

                  <div className="mt-3 text-xs text-[#9AA9BE]">
                    <strong className="text-[#F4F7FC]">{t.appointments.reasonForVisitLabel} </strong>
                    {apt.reasonForVisit}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule Appointment Form Modal */}
        {showBookModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1B]/85 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-lg bg-[#121C30] border border-[#1E2B45] rounded-3xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2B45]">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-[#16D6C1]" />
                  <h3 className="text-base font-bold text-[#F4F7FC]">
                    {t.appointments.bookNew}
                  </h3>
                </div>
                <button
                  onClick={() => setShowBookModal(false)}
                  className="p-1 rounded-lg text-[#9AA9BE] hover:text-[#F4F7FC]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAttemptBooking} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#F4F7FC]">{t.appointments.formDate}</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#F4F7FC]">{t.appointments.formTime}</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-2 py-2 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs text-center focus:outline-none focus:border-[#16D6C1]"
                        required
                      />
                      <span className="text-xs text-[#9AA9BE]">-</span>
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-2 py-2 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs text-center focus:outline-none focus:border-[#16D6C1]"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#F4F7FC]">{t.appointments.formDoctor}</label>
                    <select
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                    >
                      <option value="Dr. Anita Sharma, MD">Dr. Anita Sharma, MD (Endocrinology)</option>
                      <option value="Dr. Rajesh Varma, MD">Dr. Rajesh Varma, MD (Cardiology)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#F4F7FC]">{t.appointments.formRoom}</label>
                    <select
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                    >
                      <option value="Room 302 (Consultation Suite)">Room 302 (Consultation Suite)</option>
                      <option value="Cardio Suite 204">Cardio Suite 204</option>
                      <option value="General Clinic Suite 101">General Clinic Suite 101</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#F4F7FC]">{t.appointments.formReason}</label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                    required
                  />
                </div>

                <div className="p-3 rounded-2xl bg-[#080D1B] border border-[#1E2B45] text-[11px] text-[#9AA9BE]">
                  {lang === "te"
                    ? "కేర్ రూట్ AI డబుల్ బుకింగ్‌లను నివారించడానికి వైద్యులు, గది మరియు రోగి షెడ్యూల్‌లను స్కాన్ చేస్తుంది."
                    : "CareRoute AI scans stored physician, room, and patient schedules to prevent double bookings."}
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#1E2B45]">
                  <button
                    type="button"
                    onClick={() => setShowBookModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-[#9AA9BE] hover:text-[#F4F7FC]"
                  >
                    {t.common.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] text-[#080D1B] font-bold text-xs shadow-md shadow-[#16D6C1]/20 active:scale-95 transition-all"
                  >
                    {t.appointments.validateAndConfirmBtn}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Schedule Conflict Alert Modal */}
        {showConflictModal && conflictResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1B]/85 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-lg bg-[#121C30] border border-rose-500/50 rounded-3xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3 text-rose-400">
                <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/25">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F4F7FC]">
                    {t.appointments.conflictDetected}
                  </h3>
                  <p className="text-xs text-rose-300">
                    {t.appointments.conflictSubtitle}
                  </p>
                </div>
              </div>

              {/* Conflict Message */}
              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-200 leading-relaxed">
                {lang === "te" ? conflictResult.messageTe : conflictResult.messageEn}
              </div>

              {/* Recommended Available Slots */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#16D6C1] uppercase tracking-wider">
                  {t.appointments.alternativeSlots}:
                </span>
                <div className="space-y-2">
                  {conflictResult.suggestedSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAlternativeSlot(slot)}
                      className="w-full p-3.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45] hover:border-[#16D6C1]/50 hover:bg-[#18253A] flex items-center justify-between text-xs text-[#F4F7FC] transition-all text-left group"
                    >
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#16D6C1] flex-shrink-0" />
                        <div>
                          <strong className="text-[#F4F7FC]">
                            {formatLocalDate(slot.date)} • {slot.startTime} - {slot.endTime}
                          </strong>
                          <div className="text-[11px] text-[#9AA9BE] mt-0.5">{slot.room}</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#16D6C1] group-hover:translate-x-1 transition-transform">
                        {lang === "te" ? "ఈ సమయాన్ని ఎంచుకోండి ➔" : "Select Slot ➔"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#1E2B45]">
                <button
                  onClick={() => setShowConflictModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#9AA9BE] hover:text-[#F4F7FC]"
                >
                  {lang === "te" ? "సమయాన్ని మార్చు" : "Adjust Manually"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

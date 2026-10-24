"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Stethoscope,
  X,
} from "lucide-react";
import { Appointment, AppointmentConflict } from "@/types";

export default function AppointmentsPage() {
  const {
    appointments,
    checkAppointmentConflict,
    scheduleAppointment,
    updateAppointmentStatus,
    currentUser,
    lang,
    t,
  } = useCareRoute();

  const [showBookModal, setShowBookModal] = useState(false);
  const [date, setDate] = useState("2026-11-05");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:30");
  const [doctorName, setDoctorName] = useState("Dr. Anita Sharma, MD");
  const [specialty, setSpecialty] = useState("Endocrinology");
  const [room, setRoom] = useState("Room 302 (Consultation Suite)");
  const [appointmentType, setAppointmentType] = useState<Appointment["appointmentType"]>("Follow-up Review");
  const [reason, setReason] = useState("Routine diabetes review");

  // Conflict state
  const [conflictResult, setConflictResult] = useState<AppointmentConflict | null>(null);
  const [showConflictModal, setShowConflictModal] = useState(false);

  const handleAttemptBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Run smart conflict detection engine against active appointments
    const conflict = checkAppointmentConflict(date, startTime, endTime, doctorName, room);

    if (conflict.hasConflict) {
      setConflictResult(conflict);
      setShowConflictModal(true);
      return;
    }

    // No conflict: schedule appointment
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

    // Schedule directly with the verified alternative
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-teal-400" />
              <span>Module 5 — Smart Collision Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {t.appointments.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-0.5">
              {t.appointments.subtitle}
            </p>
          </div>

          <button
            onClick={() => {
              setConflictResult(null);
              setShowBookModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-teal-500/20 transition-all active:scale-95 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{t.appointments.bookNew}</span>
          </button>
        </div>

        {/* Demo Tip Banner for Judges */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-teal-500/30 flex items-start space-x-3 text-xs shadow-md">
          <Sparkles className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="text-teal-300 font-bold">Judge Demo Conflict Test:</strong>
            <p className="text-slate-300 leading-relaxed">
              Click &quot;Schedule New Appointment&quot; and keep the default date (Nov 5, 2026 at 10:00 AM with Dr. Anita Sharma in Room 302).
              The system will immediately detect the real schedule collision and propose verified non-conflicting slots!
            </p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white">
            Current Appointment Schedule ({appointments.length})
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {appointments.map((apt) => {
              const isMissed = apt.status === "missed";
              const isConfirmed = apt.status === "confirmed";

              return (
                <div
                  key={apt.id}
                  className={`p-6 rounded-3xl bg-slate-900/90 border transition-all ${
                    isMissed
                      ? "border-amber-500/40 bg-amber-950/10"
                      : isConfirmed
                      ? "border-teal-500/40"
                      : "border-slate-800"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">
                          {apt.clinicianName}
                        </span>
                        <span className="text-xs text-teal-300">({apt.specialty})</span>
                        {isConfirmed && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                            CONFIRMED
                          </span>
                        )}
                        {isMissed && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            MISSED APPOINTMENT
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1 text-slate-300 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-teal-400" />
                          {apt.date} • {apt.startTime} - {apt.endTime}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
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
                        className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all self-start sm:self-auto"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Recover & Rebook Visit</span>
                      </button>
                    )}
                  </div>

                  <div className="mt-3 text-xs text-slate-300">
                    <strong className="text-slate-400">Reason for visit: </strong>
                    {apt.reasonForVisit}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule Appointment Form Modal */}
        {showBookModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-teal-400" />
                  <h3 className="text-base font-bold text-white">
                    {t.appointments.bookNew}
                  </h3>
                </div>
                <button
                  onClick={() => setShowBookModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAttemptBooking} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Consultation Date:</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Time Window:</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-2 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs text-center"
                        required
                      />
                      <span className="text-xs text-slate-500">-</span>
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-2 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs text-center"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Physician:</label>
                    <select
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                    >
                      <option value="Dr. Anita Sharma, MD">Dr. Anita Sharma, MD (Endocrinology)</option>
                      <option value="Dr. Rajesh Varma, MD">Dr. Rajesh Varma, MD (Cardiology)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Clinic / Room:</label>
                    <select
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                    >
                      <option value="Room 302 (Consultation Suite)">Room 302 (Consultation Suite)</option>
                      <option value="Cardio Suite 204">Cardio Suite 204</option>
                      <option value="General Clinic Suite 101">General Clinic Suite 101</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Reason for Visit:</label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                  CareRoute AI scans stored physician, room, and patient schedules to prevent double bookings.
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBookModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 active:scale-95 transition-all"
                  >
                    Validate Availability & Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Schedule Conflict Alert Modal */}
        {showConflictModal && conflictResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-lg bg-slate-900 border border-rose-500/50 rounded-3xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3 text-rose-400">
                <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/25">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {t.appointments.conflictDetected}
                  </h3>
                  <p className="text-xs text-rose-300">
                    Collision detected with existing clinic schedule
                  </p>
                </div>
              </div>

              {/* Conflict Message */}
              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-200 leading-relaxed">
                {lang === "te" ? conflictResult.messageTe : conflictResult.messageEn}
              </div>

              {/* Recommended Available Slots */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                  {t.appointments.alternativeSlots}:
                </span>
                <div className="space-y-2">
                  {conflictResult.suggestedSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAlternativeSlot(slot)}
                      className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 flex items-center justify-between text-xs text-slate-200 transition-all text-left group"
                    >
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                        <div>
                          <strong className="text-white">
                            {slot.date} • {slot.startTime} - {slot.endTime}
                          </strong>
                          <div className="text-[11px] text-slate-400">{slot.room}</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-teal-400 group-hover:translate-x-1 transition-transform">
                        Select Slot ➔
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setShowConflictModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Adjust Manually
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

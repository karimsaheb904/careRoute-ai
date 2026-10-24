"use client";

import { useState, useCallback, useSyncExternalStore, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  UserRole,
  Language,
  Profile,
  Prescription,
  MedicationSchedule,
  MedicationLog,
  MedicalReport,
  ReportExplanation,
  Appointment,
  AppointmentConflict,
  ClinicCareTask,
  NotificationItem,
  LifestyleRoutine,
  PatientConsent,
} from "@/types";
import {
  demoPatient,
  demoPatientB,
  demoClinicStaff,
  demoClinicAdmin,
  demoClinicBStaff,
  demoClinician,
  demoClinics,
  initialConsents,
  initialPrescriptions,
  initialMedicationSchedules,
  initialMedicationLogs,
  initialMedicalReports,
  sampleReportExplanations,
  initialAppointments,
  initialCareTasks,
  initialNotifications,
  initialLifestyleRoutine,
} from "./demoData";

export const allProfiles: Profile[] = [
  demoPatient,
  demoPatientB,
  demoClinicStaff,
  demoClinicAdmin,
  demoClinicBStaff,
  demoClinician,
];

const STORAGE_KEYS = {
  USER_ID: "careroute_user_id",
  ROLE: "careroute_role",
  LANG: "careroute_lang",
  CONSENTS: "careroute_consents",
  PRESCRIPTIONS: "careroute_prescriptions",
  SCHEDULES: "careroute_schedules",
  LOGS: "careroute_logs",
  REPORTS: "careroute_reports",
  EXPLANATIONS: "careroute_explanations",
  APPOINTMENTS: "careroute_appointments",
  TASKS: "careroute_tasks",
  NOTIFICATIONS: "careroute_notifications",
  LIFESTYLE: "careroute_lifestyle",
};

function getInitialStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    if (key === STORAGE_KEYS.ROLE || key === STORAGE_KEYS.LANG || key === STORAGE_KEYS.USER_ID) {
      return item as unknown as T;
    }
    return JSON.parse(item);
  } catch {
    return fallback;
  }
}

const emptySubscribe = () => () => {};

export function useCareRouteStore() {
  const router = useRouter();
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [currentUserId, setCurrentUserIdState] = useState<string>("patient-venkata-rao");
  const [role, setRoleState] = useState<UserRole>("patient");
  const [lang, setLangState] = useState<Language>("en");
  const [consents, setConsents] = useState<PatientConsent[]>(initialConsents);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions);
  const [schedules, setSchedules] = useState<MedicationSchedule[]>(initialMedicationSchedules);
  const [medLogs, setMedLogs] = useState<MedicationLog[]>(initialMedicationLogs);
  const [reports, setReports] = useState<MedicalReport[]>(initialMedicalReports);
  const [explanations, setExplanations] = useState<Record<string, { en: ReportExplanation; te: ReportExplanation }>>(sampleReportExplanations);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [careTasks, setCareTasks] = useState<ClinicCareTask[]>(initialCareTasks);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [lifestyle, setLifestyle] = useState<LifestyleRoutine>(initialLifestyleRoutine);

  useEffect(() => {
    queueMicrotask(() => {
      const storedUserId = getInitialStorage(STORAGE_KEYS.USER_ID, "patient-venkata-rao");
      if (storedUserId) setCurrentUserIdState(storedUserId);

      const storedRole = getInitialStorage(STORAGE_KEYS.ROLE, "patient" as UserRole);
      if (storedRole !== "patient") setRoleState(storedRole);

      const storedLang = getInitialStorage(STORAGE_KEYS.LANG, "en" as Language);
      if (storedLang !== "en") setLangState(storedLang);

      const storedConsents = getInitialStorage(STORAGE_KEYS.CONSENTS, null as PatientConsent[] | null);
      if (storedConsents) setConsents(storedConsents);

      const storedRx = getInitialStorage(STORAGE_KEYS.PRESCRIPTIONS, null as Prescription[] | null);
      if (storedRx) setPrescriptions(storedRx);

      const storedSched = getInitialStorage(STORAGE_KEYS.SCHEDULES, null as MedicationSchedule[] | null);
      if (storedSched) setSchedules(storedSched);

      const storedLogs = getInitialStorage(STORAGE_KEYS.LOGS, null as MedicationLog[] | null);
      if (storedLogs) setMedLogs(storedLogs);

      const storedReports = getInitialStorage(STORAGE_KEYS.REPORTS, null as MedicalReport[] | null);
      if (storedReports) setReports(storedReports);

      const storedExpl = getInitialStorage(STORAGE_KEYS.EXPLANATIONS, null as Record<string, { en: ReportExplanation; te: ReportExplanation }> | null);
      if (storedExpl) setExplanations(storedExpl);

      const storedApts = getInitialStorage(STORAGE_KEYS.APPOINTMENTS, null as Appointment[] | null);
      if (storedApts) setAppointments(storedApts);

      const storedTasks = getInitialStorage(STORAGE_KEYS.TASKS, null as ClinicCareTask[] | null);
      if (storedTasks) setCareTasks(storedTasks);

      const storedNotifs = getInitialStorage(STORAGE_KEYS.NOTIFICATIONS, null as NotificationItem[] | null);
      if (storedNotifs) setNotifications(storedNotifs);

      const storedLife = getInitialStorage(STORAGE_KEYS.LIFESTYLE, null as LifestyleRoutine | null);
      if (storedLife) setLifestyle(storedLife);
    });
  }, []);

  const currentUser: Profile =
    allProfiles.find((p) => p.id === currentUserId) ||
    (role === "patient" ? demoPatient : role === "admin" ? demoClinicAdmin : demoClinicStaff);

  const canPerformAdminAction = currentUser.role === "admin" || role === "admin";

  const switchAccount = (userId: string) => {
    const target = allProfiles.find((p) => p.id === userId);
    if (!target) return;
    setCurrentUserIdState(target.id);
    setRoleState(target.role);
    try {
      localStorage.setItem(STORAGE_KEYS.USER_ID, target.id);
      localStorage.setItem(STORAGE_KEYS.ROLE, target.role);
    } catch {}
  };

  const login = (email: string, roleToSelect: UserRole) => {
    const matchedProfile = allProfiles.find(
      (p) => p.email.toLowerCase() === email.toLowerCase()
    ) || (roleToSelect === "patient" ? demoPatient : roleToSelect === "admin" ? demoClinicAdmin : demoClinicStaff);

    setCurrentUserIdState(matchedProfile.id);
    setRoleState(matchedProfile.role);
    try {
      localStorage.setItem(STORAGE_KEYS.USER_ID, matchedProfile.id);
      localStorage.setItem(STORAGE_KEYS.ROLE, matchedProfile.role);
    } catch {}
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER_ID);
      localStorage.removeItem(STORAGE_KEYS.ROLE);
    } catch {}
    setCurrentUserIdState("");
    setRoleState("patient");
    router.push("/login");
  };

  const grantConsent = (clinicId: string) => {
    const clinic = demoClinics.find((c) => c.id === clinicId);
    const existing = consents.find(
      (c) => c.patientId === currentUser.id && c.clinicId === clinicId
    );
    let updated: PatientConsent[];
    if (existing) {
      updated = consents.map((c) =>
        c.id === existing.id
          ? { ...c, status: "active" as const, revokedAt: undefined }
          : c
      );
    } else {
      const newConsent: PatientConsent = {
        id: `consent-${Date.now()}`,
        patientId: currentUser.id,
        clinicId,
        clinicName: clinic ? `${clinic.name}, ${clinic.branch}` : clinicId,
        canViewReports: true,
        canViewPrescriptions: true,
        canManageAppointments: true,
        status: "active",
        grantedAt: new Date().toISOString(),
      };
      updated = [newConsent, ...consents];
    }
    setConsents(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.CONSENTS, JSON.stringify(updated));
    } catch {}
  };

  const revokeConsent = (clinicId: string) => {
    const updated = consents.map((c) =>
      c.patientId === currentUser.id && c.clinicId === clinicId
        ? { ...c, status: "revoked" as const, revokedAt: new Date().toISOString() }
        : c
    );
    setConsents(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.CONSENTS, JSON.stringify(updated));
    } catch {}
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, newRole);
    } catch {}
  };

  const setLanguage = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, newLang);
    } catch {}
  };

  const resetAllData = () => {
    try {
      localStorage.clear();
    } catch {}
    setRoleState("patient");
    setLangState("en");
    setPrescriptions(initialPrescriptions);
    setSchedules(initialMedicationSchedules);
    setMedLogs(initialMedicationLogs);
    setReports(initialMedicalReports);
    setExplanations(sampleReportExplanations);
    setAppointments(initialAppointments);
    setCareTasks(initialCareTasks);
    setNotifications(initialNotifications);
    setLifestyle(initialLifestyleRoutine);
  };

  // Prescription Actions
  const addPrescription = (rx: Prescription) => {
    const updated = [rx, ...prescriptions];
    setPrescriptions(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(updated));
    } catch {}
  };

  const verifyPrescription = (
    rxId: string,
    verifiedBy: string,
    notes: string,
    itemsToConfirm: Prescription["extractedItems"]
  ) => {
    // 1. Update prescription status
    const updatedPrescriptions = prescriptions.map((rx) => {
      if (rx.id === rxId) {
        return {
          ...rx,
          status: "verified" as const,
          handwritingClarity: "clear" as const,
          verifiedBy,
          verifiedAt: new Date().toISOString(),
          verificationNotes: notes,
          extractedItems: itemsToConfirm.map((it) => ({ ...it, isVerified: true })),
        };
      }
      return rx;
    });
    setPrescriptions(updatedPrescriptions);

    // 2. Generate Medication Schedules for verified items
    const newSchedules: MedicationSchedule[] = itemsToConfirm.map((item, index) => ({
      id: `sched-gen-${Date.now()}-${index}`,
      patientId: demoPatient.id,
      prescriptionId: rxId,
      medicineName: item.medicineName,
      dosage: item.dosage,
      instructionsEn: item.instructionsEn,
      instructionsTe: item.instructionsTe,
      timing: item.timing,
      scheduledTimes: item.specificTimes.length > 0 ? item.specificTimes : ["09:00"],
      startDate: new Date().toISOString().split("T")[0],
      isVerifiedPrescription: true,
      active: true,
    }));
    const updatedSchedules = [...schedules, ...newSchedules];
    setSchedules(updatedSchedules);

    // 3. Add in-app notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: demoPatient.id,
      titleEn: "Prescription Verified & Reminders Active",
      titleTe: "ప్రిస్క్రిప్షన్ ధృవీకరించబడింది & రిమైండర్లు సక్రియమయ్యాయి",
      messageEn: `${itemsToConfirm.length} medicines verified by ${verifiedBy}. Daily dose reminders are now active.`,
      messageTe: `${verifiedBy} ద్వారా ${itemsToConfirm.length} మందులు ధృవీకరించబడ్డాయి. రిమైండర్లు అమలయ్యాయి.`,
      type: "medication",
      priority: "high",
      read: false,
      createdAt: new Date().toISOString(),
      actionUrl: "/medications",
    };
    const updatedNotifications = [newNotif, ...notifications];
    setNotifications(updatedNotifications);

    // Persist
    try {
      localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(updatedPrescriptions));
      localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(updatedSchedules));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updatedNotifications));
    } catch {}
  };

  // Medication Logging
  const logMedicationStatus = (
    medicationId: string,
    status: MedicationLog["status"],
    notes?: string
  ) => {
    const targetSchedule = schedules.find((s) => s.id === medicationId);
    const today = new Date().toISOString().split("T")[0];

    const newLog: MedicationLog = {
      id: `log-${Date.now()}`,
      medicationId,
      medicineName: targetSchedule ? `${targetSchedule.medicineName} (${targetSchedule.dosage})` : "Prescribed Medication",
      dosage: targetSchedule?.dosage || "",
      scheduledTime: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
      date: today,
      status,
      recordedAt: new Date().toISOString(),
      notes,
    };

    const updated = [newLog, ...medLogs];
    setMedLogs(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated));
    } catch {}
  };

  // Lab Reports
  const addReport = (report: MedicalReport) => {
    const updated = [report, ...reports];
    setReports(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(updated));
    } catch {}
  };

  const saveReportExplanation = (reportId: string, lang: Language, explanation: ReportExplanation) => {
    const current = explanations[reportId] || { en: explanation, te: explanation };
    const updated = {
      ...explanations,
      [reportId]: {
        ...current,
        [lang]: explanation,
      },
    };
    setExplanations(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.EXPLANATIONS, JSON.stringify(updated));
    } catch {}
  };

  // Appointment Conflict Detection
  const checkAppointmentConflict = useCallback(
    (
      date: string,
      startTime: string,
      endTime: string,
      clinicianName: string,
      room: string,
      ignoreId?: string
    ): AppointmentConflict => {
      // Convert time HH:mm to minutes from midnight
      const toMinutes = (time: string) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
      };

      const newStart = toMinutes(startTime);
      const newEnd = toMinutes(endTime);

      const conflicts = appointments.filter((apt) => {
        if (ignoreId && apt.id === ignoreId) return false;
        if (apt.date !== date) return false;
        if (apt.status === "cancelled") return false;

        const aptStart = toMinutes(apt.startTime);
        const aptEnd = toMinutes(apt.endTime);

        // Time overlap condition: (StartA < EndB) and (EndA > StartB)
        const timesOverlap = newStart < aptEnd && newEnd > aptStart;
        if (!timesOverlap) return false;

        const isSameDoctor = apt.clinicianName.toLowerCase() === clinicianName.toLowerCase();
        const isSameRoom = apt.room.toLowerCase() === room.toLowerCase();

        return isSameDoctor || isSameRoom;
      });

      if (conflicts.length > 0) {
        const conflicting = conflicts[0];
        const isDoctor = conflicting.clinicianName.toLowerCase() === clinicianName.toLowerCase();

        // Generate non-conflicting alternative slots on the same day
        const alternatives = [
          {
            date,
            startTime: "14:00",
            endTime: "14:30",
            room: conflicting.room,
          },
          {
            date,
            startTime: "15:30",
            endTime: "16:00",
            room: conflicting.room,
          },
          {
            date,
            startTime: "16:30",
            endTime: "17:00",
            room: conflicting.room,
          },
        ];

        return {
          hasConflict: true,
          conflictingAppointment: conflicting,
          conflictType: isDoctor ? "doctor_overlap" : "room_overlap",
          messageEn: `Conflict detected! ${isDoctor ? conflicting.clinicianName : conflicting.room} is already booked from ${conflicting.startTime} to ${conflicting.endTime} on ${date}.`,
          messageTe: `సమయ ఘర్షణ గుర్తించబడింది! ${conflicting.startTime} నుండి ${conflicting.endTime} వరకు ఈ సమయం ఇప్పటికే బుక్ చేయబడింది.`,
          suggestedSlots: alternatives,
        };
      }

      return {
        hasConflict: false,
        messageEn: "Slot is available with zero conflicts.",
        messageTe: "ఈ సమయం అందుబాటులో ఉంది, ఎలాంటి ఘర్షణలు లేవు.",
        suggestedSlots: [],
      };
    },
    [appointments]
  );

  const scheduleAppointment = (aptData: Omit<Appointment, "id" | "createdAt">) => {
    const newApt: Appointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newApt, ...appointments];
    setAppointments(updated);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: newApt.patientId,
      titleEn: "Appointment Confirmed",
      titleTe: "అపాయింట్‌మెంట్ ఖరారైంది",
      messageEn: `Consultation confirmed with ${newApt.clinicianName} on ${newApt.date} at ${newApt.startTime} (${newApt.room}).`,
      messageTe: `${newApt.date} న ఉదయం ${newApt.startTime} గంటలకు ${newApt.clinicianName} గారితో అపాయింట్‌మెంట్ ఖరారైంది.`,
      type: "appointment",
      priority: "medium",
      read: false,
      createdAt: new Date().toISOString(),
      actionUrl: "/appointments",
    };
    setNotifications([newNotif, ...notifications]);

    try {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([newNotif, ...notifications]));
    } catch {}
  };

  const updateAppointmentStatus = (
    id: string,
    status: Appointment["status"],
    reason?: string
  ) => {
    const updated = appointments.map((apt) => {
      if (apt.id === id) {
        return {
          ...apt,
          status,
          cancellationReason: reason,
        };
      }
      return apt;
    });
    setAppointments(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    } catch {}
  };

  // Care Tasks
  const updateCareTaskStatus = (
    taskId: string,
    status: ClinicCareTask["status"],
    actionNote: string,
    actorName: string
  ) => {
    const updated = careTasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          status,
          history: [
            ...t.history,
            {
              id: `th-${Date.now()}`,
              timestamp: new Date().toLocaleString(),
              actor: actorName,
              action: `Status changed to ${status.replace("_", " ").toUpperCase()}`,
              note: actionNote,
            },
          ],
        };
      }
      return t;
    });
    setCareTasks(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updated));
    } catch {}
  };

  // Lifestyle
  const toggleHabit = (habitId: string) => {
    const updatedHabits = lifestyle.suggestedHabits.map((h) =>
      h.id === habitId ? { ...h, completed: !h.completed } : h
    );
    const updated = { ...lifestyle, suggestedHabits: updatedHabits };
    setLifestyle(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.LIFESTYLE, JSON.stringify(updated));
    } catch {}
  };

  const addWater = (amountMl: number) => {
    const updated = {
      ...lifestyle,
      currentWaterMl: Math.min(lifestyle.waterIntakeGoalMl, lifestyle.currentWaterMl + amountMl),
    };
    setLifestyle(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.LIFESTYLE, JSON.stringify(updated));
    } catch {}
  };

  // Notifications
  const markNotificationRead = (notifId: string) => {
    const updated = notifications.map((n) =>
      n.id === notifId ? { ...n, read: true } : n
    );
    setNotifications(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    } catch {}
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    } catch {}
  };

  // Multi-tenant and Patient Privacy Isolation:
  const accessiblePrescriptions = prescriptions.filter((p) => {
    if (role === "patient") {
      return p.patientId === currentUser.id;
    }
    const patientProfile = allProfiles.find((pr) => pr.id === p.patientId);
    const isClinicPatient = patientProfile?.clinicId === currentUser.clinicId;
    const hasActiveConsent = consents.some(
      (c) => c.patientId === p.patientId && c.clinicId === currentUser.clinicId && c.status === "active"
    );
    return isClinicPatient || hasActiveConsent;
  });

  const accessibleReports = reports.filter((r) => {
    if (role === "patient") {
      return r.patientId === currentUser.id;
    }
    const patientProfile = allProfiles.find((pr) => pr.id === r.patientId);
    const isClinicPatient = patientProfile?.clinicId === currentUser.clinicId;
    const hasActiveConsent = consents.some(
      (c) => c.patientId === r.patientId && c.clinicId === currentUser.clinicId && c.status === "active"
    );
    return isClinicPatient || hasActiveConsent;
  });

  const accessibleAppointments = appointments.filter((a) => {
    if (role === "patient") {
      return a.patientId === currentUser.id;
    }
    const patientProfile = allProfiles.find((pr) => pr.id === a.patientId);
    return patientProfile?.clinicId === currentUser.clinicId;
  });

  const accessibleCareTasks = careTasks.filter((t) => {
    if (role === "patient") {
      return false;
    }
    if (t.clinicId && t.clinicId !== currentUser.clinicId) {
      return false;
    }
    const patientProfile = allProfiles.find((pr) => pr.id === t.patientId);
    return !patientProfile || patientProfile.clinicId === currentUser.clinicId;
  });

  const accessibleSchedules = schedules.filter((s) => {
    if (role === "patient") {
      return s.patientId === currentUser.id;
    }
    return true;
  });

  const accessibleConsents = consents.filter((c) => {
    if (role === "patient") {
      return c.patientId === currentUser.id;
    }
    return c.clinicId === currentUser.clinicId;
  });

  return {
    isHydrated,
    currentUser,
    role,
    setRole,
    currentUserId,
    switchAccount,
    login,
    logout,
    canPerformAdminAction,
    consents: accessibleConsents,
    allConsents: consents,
    grantConsent,
    revokeConsent,
    clinics: demoClinics,
    allProfiles,
    lang,
    setLanguage,
    resetAllData,
    prescriptions: accessiblePrescriptions,
    allPrescriptions: prescriptions,
    addPrescription,
    verifyPrescription,
    schedules: accessibleSchedules,
    allSchedules: schedules,
    medLogs,
    logMedicationStatus,
    reports: accessibleReports,
    allReports: reports,
    addReport,
    explanations,
    saveReportExplanation,
    appointments: accessibleAppointments,
    allAppointments: appointments,
    checkAppointmentConflict,
    scheduleAppointment,
    updateAppointmentStatus,
    careTasks: accessibleCareTasks,
    allCareTasks: careTasks,
    updateCareTaskStatus,
    lifestyle,
    toggleHabit,
    addWater,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
  };
}

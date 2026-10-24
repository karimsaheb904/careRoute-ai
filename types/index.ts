export type UserRole = "patient" | "clinic_staff" | "clinician" | "admin";

export type Language = "en" | "te";

export interface Profile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  preferredLanguage: Language;
  dateOfBirth?: string;
  gender?: string;
  clinicId?: string;
}

export type HandwritingClarity = "clear" | "minor_ambiguity" | "flagged" | "illegible";

export interface ExtractedPrescriptionItem {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  timing: "before_food" | "after_food" | "with_food" | "empty_stomach" | "bedtime";
  durationDays: number;
  specificTimes: string[]; // e.g. ["08:00", "20:00"]
  instructionsEn: string;
  instructionsTe: string;
  clarityStatus: HandwritingClarity;
  flagReason?: string;
  isVerified: boolean;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  clinicName: string;
  issueDate: string;
  fileUrl?: string;
  rawText?: string;
  status: "pending_verification" | "verified" | "flagged_ambiguity" | "rejected";
  handwritingClarity: HandwritingClarity;
  extractedItems: ExtractedPrescriptionItem[];
  verifiedBy?: string;
  verifiedAt?: string;
  verificationNotes?: string;
  createdAt: string;
}

export interface MedicationSchedule {
  id: string;
  patientId: string;
  prescriptionId?: string;
  medicineName: string;
  dosage: string;
  instructionsEn: string;
  instructionsTe: string;
  timing: string;
  scheduledTimes: string[]; // e.g. ["09:00", "21:00"]
  startDate: string;
  endDate?: string;
  isVerifiedPrescription: boolean;
  active: boolean;
}

export interface MedicationLog {
  id: string;
  medicationId: string;
  medicineName: string;
  dosage: string;
  scheduledTime: string; // HH:mm or ISO
  date: string; // YYYY-MM-DD
  status: "taken" | "missed" | "skipped" | "pending";
  recordedAt?: string;
  notes?: string;
}

export type BiomarkerFlag = "normal" | "borderline_high" | "high" | "low" | "critical";

export interface ReportMeasurement {
  id: string;
  testName: string;
  category: "Hematology" | "Metabolic" | "Lipids" | "Renal" | "Liver" | "Endocrine" | "General";
  value: string;
  numericValue?: number;
  unit: string;
  referenceRangeMin?: number;
  referenceRangeMax?: number;
  referenceRangeText: string;
  flag: BiomarkerFlag;
  clinicalSignificanceEn: string;
  clinicalSignificanceTe: string;
}

export interface MedicalReport {
  id: string;
  patientId: string;
  patientName: string;
  reportName: string;
  reportDate: string;
  reportType: "Comprehensive Metabolic Panel" | "Lipid Profile" | "Complete Blood Count (CBC)" | "Diabetes Panel (HbA1c)" | "Renal Function Panel";
  laboratory: string;
  fileUrl?: string;
  measurements: ReportMeasurement[];
  hasAbnormalValues: boolean;
  status: "uploaded" | "analyzed" | "clinician_reviewed";
  createdAt: string;
}

export interface ReportExplanation {
  reportId: string;
  language: Language;
  simpleSummary: string;
  importantFindings: string[];
  unfamiliarTerms: Array<{
    term: string;
    explanation: string;
  }>;
  questionsForDoctor: string[];
  recommendedFollowUp: string;
  safetyDisclaimer: string;
  isLiveAi: boolean;
  generatedAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  clinicianId: string;
  clinicianName: string;
  specialty: string;
  appointmentType: "In-Person Consultation" | "Follow-up Review" | "Lab Sample Collection" | "Specialist Referral";
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  room: string;
  equipmentRequired?: string[];
  status: "scheduled" | "confirmed" | "completed" | "missed" | "cancelled" | "reschedule_requested";
  reasonForVisit: string;
  notes?: string;
  cancellationReason?: string;
  createdAt: string;
}

export interface AppointmentConflict {
  hasConflict: boolean;
  conflictingAppointment?: Appointment;
  conflictType?: "doctor_overlap" | "patient_overlap" | "room_overlap" | "equipment_unavailable";
  messageEn: string;
  messageTe: string;
  suggestedSlots: Array<{
    date: string;
    startTime: string;
    endTime: string;
    room: string;
  }>;
}

export interface ClinicCareTask {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  title: string;
  type: "lab_review" | "referral_tracking" | "missed_appointment_recovery" | "prescription_verification" | "patient_inquiry";
  priority: "high" | "medium" | "low";
  status: "pending" | "in_review" | "action_required" | "completed" | "escalated";
  relatedItemId?: string;
  relatedItemType?: "report" | "prescription" | "appointment" | "referral";
  assignedTo: string;
  assignedStaffRole: string;
  dateOrdered: string;
  dueDate: string;
  nextAction: string;
  history: Array<{
    id: string;
    timestamp: string;
    actor: string;
    action: string;
    note: string;
  }>;
}

export interface NotificationItem {
  id: string;
  userId: string;
  titleEn: string;
  titleTe: string;
  messageEn: string;
  messageTe: string;
  type: "medication" | "appointment" | "report" | "followup" | "alert";
  priority: "high" | "medium" | "low";
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface LifestyleRoutine {
  patientId: string;
  waterIntakeGoalMl: number;
  currentWaterMl: number;
  sleepTargetHours: number;
  lastSleepDurationHours?: number;
  walkingStepGoal: number;
  currentSteps: number;
  clinicianRestrictions: string[];
  suggestedHabits: Array<{
    id: string;
    titleEn: string;
    titleTe: string;
    category: "sleep" | "hydration" | "nutrition" | "activity";
    guidanceEn: string;
    guidanceTe: string;
    completed: boolean;
  }>;
}

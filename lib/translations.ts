import { Language } from "@/types";

export interface TranslationDictionary {
  common: {
    appName: string;
    tagline: string;
    demoMode: string;
    demoNotice: string;
    judgeTour: string;
    patientView: string;
    clinicView: string;
    switchRole: string;
    switchLanguage: string;
    notifications: string;
    unread: string;
    markAllRead: string;
    noNotifications: string;
    search: string;
    save: string;
    cancel: string;
    close: string;
    delete: string;
    edit: string;
    confirm: string;
    verify: string;
    upload: string;
    loading: string;
    success: string;
    error: string;
    status: string;
    date: string;
    time: string;
    location: string;
    doctor: string;
    patient: string;
    disclaimerTitle: string;
    medicalDisclaimer: string;
    liveAiBadge: string;
    sampleAiBadge: string;
    confirmedBadge: string;
    missedBadge: string;
    pendingBadge: string;
    verifiedBadge: string;
    viewAll: string;
    back: string;
    next: string;
    previous: string;
    resetDemoData: string;
    resetConfirm: string;
  };
  nav: {
    dashboard: string;
    prescriptions: string;
    medications: string;
    reports: string;
    compareReports: string;
    appointments: string;
    lifestyle: string;
    clinicWorkspace: string;
    followUps: string;
    consent: string;
    clinicAdmin: string;
    notifications: string;
    clinicalSafetyTitle: string;
    clinicalSafetyDesc: string;
    version: string;
  };
  dashboard: {
    welcome: string;
    welcomeSub: string;
    personalHealthOverview: string;
    patientProfileTag: string;
    careProgram: string;
    todayMedications: string;
    upcomingAppointments: string;
    pendingReports: string;
    activeCareTasks: string;
    medicationTimeline: string;
    nextClinicVisit: string;
    confirmedStatus: string;
    dateTimeLabel: string;
    locationLabel: string;
    manageAppointment: string;
    noUpcomingVisits: string;
    quickActions: string;
    uploadRx: string;
    labReportAi: string;
    compareTrends: string;
    bookAppointment: string;
    medicationSchedule: string;
    viewCareTasks: string;
    biomarkerTrendsTitle: string;
    biomarkerTrendsSubtitle: string;
    hba1cAverage: string;
    fastingBloodSugar: string;
    relativeImprovement: string;
    dropPercentage: string;
    viewReportCompare: string;
    doseTaken: string;
    dosePending: string;
    markAsTaken: string;
    doseAdherenceWarning: string;
    greetingMorning: string;
    greetingAfternoon: string;
    greetingEvening: string;
    patientAge: string;
    patientGender: string;
    bloodGroup: string;
    aiCoPilotActive: string;
    aiSafetyVerified: string;
    weeklyAdherenceScore: string;
    todayAdherence: string;
    dosesCompleted: string;
    allDosesCompleted: string;
    nextScheduledDose: string;
    takeDoseBtn: string;
    doseLoggedSuccess: string;
    nextConsultationTitle: string;
    confirmedAppointment: string;
    rescheduleSlot: string;
    directionsGuide: string;
    biomarkerSectionTitle: string;
    biomarkerSectionDesc: string;
    deepDiveCompare: string;
    recentLabActivity: string;
    careTaskFollowup: string;
    viewFullSchedule: string;
    clinicalSafetyNotice: string;
    clinicalSafetyNoticeDesc: string;
  };
  prescriptions: {
    title: string;
    subtitle: string;
    uploadTitle: string;
    uploadDesc: string;
    handwritingAlert: string;
    unverifiedNotice: string;
    verificationSuccess: string;
    extracting: string;
    verifiedByClinician: string;
    scheduleAfterVerification: string;
    safetyRule: string;
    medicineName: string;
    dosage: string;
    frequency: string;
    timing: string;
    duration: string;
    instructions: string;
    recordsTitle: string;
    authorizeBtn: string;
    reviewSignOffBtn: string;
    modalTitle: string;
    modalSubtitle: string;
    reviewerName: string;
    reviewerNotes: string;
    signOffAction: string;
  };
  medications: {
    title: string;
    subtitle: string;
    todaySchedule: string;
    weeklyAdherence: string;
    verifiedDoctorRegimen: string;
    markTaken: string;
    markSkipped: string;
    markMissed: string;
    statusTaken: string;
    statusMissed: string;
    statusSkipped: string;
    statusPending: string;
    safetyMissedDoseWarning: string;
    historyTitle: string;
    logDoseTitle: string;
    logDoseNotes: string;
    logDoseNotice: string;
    saveLogEntry: string;
  };
  reports: {
    title: string;
    subtitle: string;
    uploadReport: string;
    abnormalFlag: string;
    normalFlag: string;
    referenceRange: string;
    unit: string;
    findingsSummary: string;
    unfamiliarTerms: string;
    questionsForDoctor: string;
    compareWithPrevious: string;
    generateLiveGemini: string;
    generatingAi: string;
    tableBiomarker: string;
    tablePatientValue: string;
    tableRefRange: string;
    tableStatus: string;
    section1Summary: string;
    section2Findings: string;
    section5Terms: string;
    section6Questions: string;
    section7FollowUp: string;
  };
  compare: {
    title: string;
    subtitle: string;
    selectBaseline: string;
    selectCurrent: string;
    chartTitle: string;
    chartSubtitle: string;
    compatibleBadge: string;
    tableTitle: string;
    deltaChange: string;
    trendImproved: string;
    trendStable: string;
    trendElevated: string;
    disclaimer: string;
  };
  appointments: {
    title: string;
    subtitle: string;
    bookNew: string;
    doctorName: string;
    specialty: string;
    conflictDetected: string;
    conflictSubtitle: string;
    alternativeSlots: string;
    recheckSlot: string;
    confirmedSuccess: string;
    scheduleListTitle: string;
    recoverMissedBtn: string;
    reasonForVisitLabel: string;
    formDate: string;
    formTime: string;
    formDoctor: string;
    formRoom: string;
    formReason: string;
    validateAndConfirmBtn: string;
    scheduleConflictDemoTip: string;
  };
  clinic: {
    title: string;
    subtitle: string;
    taskQueue: string;
    overdueTasks: string;
    missedAppointments: string;
    pendingReviews: string;
    escalateTask: string;
    completeTask: string;
    actionHistory: string;
    searchPlaceholder: string;
    priorityLabel: string;
    nextActionLabel: string;
    assignedToLabel: string;
    dueDateLabel: string;
    modalCompleteTitle: string;
    modalEscalateTitle: string;
    modalNoteLabel: string;
    recordAuditBtn: string;
  };
  followups: {
    title: string;
    subtitle: string;
    safetyConstraint: string;
    workflowSequenceTitle: string;
    activeCaseTitle: string;
    diagnosticPanelLabel: string;
    assignedCoordinatorLabel: string;
    targetCompletionLabel: string;
    auditTrailTitle: string;
  };
  lifestyle: {
    title: string;
    subtitle: string;
    waterIntake: string;
    sleepRoutine: string;
    activityGoals: string;
    clinicianRestrictions: string;
    healthyHabits: string;
    precedenceNotice: string;
    addWaterBtn: string;
    waterTargetLabel: string;
    sleepTargetDesc: string;
    activityTargetDesc: string;
    completedCount: string;
  };
  tour: {
    modalTitle: string;
    modalSubtitle: string;
    stepIndicator: string;
    clinicalFeatureLabel: string;
    targetModeLabel: string;
    languageLabel: string;
    jumpToFeatureBtn: string;
    nextStepBtn: string;
    closeTourBtn: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    common: {
      appName: "CareRoute AI",
      tagline: "Your Healthcare Journey, Connected.",
      demoMode: "Hackathon Demo Mode",
      demoNotice: "Synthetic patient data for demonstration. Connect Supabase & Gemini in .env.local for production.",
      judgeTour: "Judge Demo Tour (10 Steps)",
      patientView: "Patient Workspace",
      clinicView: "Clinic Staff Workspace",
      switchRole: "Switch Active Role",
      switchLanguage: "Language",
      notifications: "Notifications",
      unread: "unread",
      markAllRead: "Mark all as read",
      noNotifications: "No new notifications",
      search: "Search records, doctors, tests...",
      save: "Save Changes",
      cancel: "Cancel",
      close: "Close",
      delete: "Delete",
      edit: "Edit",
      confirm: "Confirm",
      verify: "Verify Instructions",
      upload: "Upload Document",
      loading: "Processing with AI...",
      success: "Action completed successfully",
      error: "An error occurred",
      status: "Status",
      date: "Date",
      time: "Time",
      location: "Location",
      doctor: "Doctor / Clinician",
      patient: "Patient",
      disclaimerTitle: "Clinical Safety & AI Disclaimer",
      medicalDisclaimer: "CareRoute AI assists with understanding and organization. It does not independently diagnose conditions, prescribe medications, alter dosages, or replace qualified healthcare practitioners.",
      liveAiBadge: "Gemini Live Analysis",
      sampleAiBadge: "Simulated Clinical Demo",
      confirmedBadge: "CONFIRMED",
      missedBadge: "MISSED",
      pendingBadge: "PENDING",
      verifiedBadge: "VERIFIED",
      viewAll: "View All",
      back: "Back",
      next: "Next",
      previous: "Previous",
      resetDemoData: "Reset to clean demo data",
      resetConfirm: "Reset CareRoute AI demo data back to baseline?",
    },
    nav: {
      dashboard: "Dashboard",
      prescriptions: "Prescriptions",
      medications: "Medication Reminders",
      reports: "Lab Reports",
      compareReports: "Compare Reports",
      appointments: "Appointments",
      lifestyle: "Lifestyle & Recovery",
      clinicWorkspace: "Clinic Dashboard",
      followUps: "Care Follow-Ups",
      consent: "Consent & Permissions",
      clinicAdmin: "Clinic Admin Roster",
      notifications: "Notifications",
      clinicalSafetyTitle: "Clinical AI Safety Guardrail",
      clinicalSafetyDesc: "Assists understanding. No independent diagnoses or dosage alters.",
      version: "v1.0 • Hackathon Edition",
    },
    dashboard: {
      welcome: "Welcome back",
      welcomeSub: "Here is your health overview, daily medication schedule, and pending clinical tasks.",
      personalHealthOverview: "Personal Health Command Center",
      patientProfileTag: "Patient Profile",
      careProgram: "Apollo Health Clinic • Type 2 Diabetes & Hypertension Care",
      todayMedications: "Today's Medications",
      upcomingAppointments: "Upcoming Appointments",
      pendingReports: "Pending Report Reviews",
      activeCareTasks: "Active Care Tasks",
      medicationTimeline: "Today's Verified Medication Timeline",
      nextClinicVisit: "Next Clinic Visit",
      confirmedStatus: "Confirmed",
      dateTimeLabel: "Date & Time:",
      locationLabel: "Location:",
      manageAppointment: "Manage Appointment",
      noUpcomingVisits: "No upcoming visits scheduled.",
      quickActions: "Quick Actions",
      uploadRx: "Upload Prescription",
      labReportAi: "AI Lab Report Analysis",
      compareTrends: "Compare Trends",
      bookAppointment: "Schedule Appointment",
      medicationSchedule: "Medication Schedule",
      viewCareTasks: "View Care Tasks",
      biomarkerTrendsTitle: "Biomarker Trends (HbA1c & Fasting Glucose)",
      biomarkerTrendsSubtitle: "3-Quarter progression showing positive response to Metformin & lifestyle adjustments.",
      hba1cAverage: "HbA1c (3-Month Average)",
      fastingBloodSugar: "Fasting Blood Glucose",
      relativeImprovement: "8.2% ➔ 7.4% (-9.8% Improvement)",
      dropPercentage: "165 ➔ 138 mg/dL (-16.3% Drop)",
      viewReportCompare: "Compare Reports",
      doseTaken: "Taken",
      dosePending: "Pending",
      markAsTaken: "Mark as Taken",
      doseAdherenceWarning: "Safety Notice: Never double up on a dose to make up for a missed one. Contact your doctor or pharmacist if unsure.",
      greetingMorning: "Good morning",
      greetingAfternoon: "Good afternoon",
      greetingEvening: "Good evening",
      patientAge: "Age",
      patientGender: "Gender",
      bloodGroup: "Blood Group",
      aiCoPilotActive: "Gemini AI Clinical Co-Pilot Active",
      aiSafetyVerified: "Zero-Hallucination Guardrail Enforced",
      weeklyAdherenceScore: "Weekly Adherence Rate",
      todayAdherence: "Today's Medication Adherence",
      dosesCompleted: "doses completed",
      allDosesCompleted: "All scheduled medications completed for today!",
      nextScheduledDose: "Next Scheduled Dose",
      takeDoseBtn: "Take Dose Now",
      doseLoggedSuccess: "Dose logged successfully!",
      nextConsultationTitle: "Next Clinic Consultation",
      confirmedAppointment: "Confirmed In-Person Visit",
      rescheduleSlot: "Reschedule / Change Slot",
      directionsGuide: "Clinic & Room Guide",
      biomarkerSectionTitle: "Biomarker Trends (HbA1c & Fasting Glucose)",
      biomarkerSectionDesc: "Longitudinal tracking showing measurable clinical improvement over the last 9 months.",
      deepDiveCompare: "Deep-Dive Comparative Analysis",
      recentLabActivity: "Recent Lab Panel",
      careTaskFollowup: "Care Team Coordination",
      viewFullSchedule: "View Full Medication Regimen",
      clinicalSafetyNotice: "Clinical AI Safety Architecture",
      clinicalSafetyNoticeDesc: "CareRoute AI assists patients and clinic staff with understanding and coordination. It does not replace clinical judgment or prescribe medications independently.",
    },
    prescriptions: {
      title: "Prescription Safety & Verification",
      subtitle: "Digitize, verify with authorized staff, and convert prescriptions safely into dose reminders.",
      uploadTitle: "Upload Prescription Slip",
      uploadDesc: "Supports JPEG, PNG, and PDF slips. AI extracts instructions for professional review.",
      handwritingAlert: "Handwriting Ambiguity Detected: Requires Authorized Human Verification Before Scheduling.",
      unverifiedNotice: "Dose reminders can only be generated after confirmed prescription verification.",
      verificationSuccess: "Prescription instructions verified successfully. Medication schedule generated.",
      extracting: "Extracting medicines and instructions with optical safety validation...",
      verifiedByClinician: "Clinician Verified",
      scheduleAfterVerification: "Create Medication Schedule",
      safetyRule: "Never guess an illegible medicine name or alter dosages without doctor consultation.",
      medicineName: "Medicine Name",
      dosage: "Dosage",
      frequency: "Frequency",
      timing: "Timing",
      duration: "Duration",
      instructions: "Instructions",
      recordsTitle: "Uploaded Prescription Records",
      authorizeBtn: "Authorize / Verify Instructions",
      reviewSignOffBtn: "Review Sign-Off",
      modalTitle: "Clinical Verification Sign-Off",
      modalSubtitle: "CareRoute AI requires authorized personnel to confirm extracted dosages before activating medication reminders.",
      reviewerName: "Reviewer Name & Professional Role:",
      reviewerNotes: "Clinical Verification Notes:",
      signOffAction: "Sign-Off & Activate Reminders",
    },
    medications: {
      title: "Medication Reminders & Dose Tracking",
      subtitle: "Stay on track with verified doctor instructions and log dose adherence.",
      todaySchedule: "Today's Dose Timeline",
      weeklyAdherence: "Weekly Adherence Rate",
      verifiedDoctorRegimen: "Verified doctor regimen",
      markTaken: "Take Dose",
      markSkipped: "Skip",
      markMissed: "Mark Missed",
      statusTaken: "Dose Taken",
      statusMissed: "Missed",
      statusSkipped: "Skipped",
      statusPending: "Pending",
      safetyMissedDoseWarning: "Important Safety Notice: Never double up on a dose to make up for a missed one. Contact your doctor or pharmacist if unsure.",
      historyTitle: "Patient-Reported Dose Adherence History",
      logDoseTitle: "Log Dose Status",
      logDoseNotes: "Optional notes or symptoms (e.g. food timing, side effects):",
      logDoseNotice: "Notice: Dose logging distinguishes patient reminders from clinical proof of administration.",
      saveLogEntry: "Save Log Entry",
    },
    reports: {
      title: "AI Medical Report Explanations",
      subtitle: "Understand test values, ranges, and prepare meaningful questions for your doctor.",
      uploadReport: "Upload Diagnostic Report",
      abnormalFlag: "Outside Reference Range",
      normalFlag: "Within Reference Range",
      referenceRange: "Standard Lab Range",
      unit: "Unit",
      findingsSummary: "Summary of Key Findings",
      unfamiliarTerms: "Medical Terminology Explained",
      questionsForDoctor: "Helpful Questions for Your Doctor",
      compareWithPrevious: "Compare with Previous Report",
      generateLiveGemini: "Generate Live Gemini Explanation",
      generatingAi: "Generating AI Explanation...",
      tableBiomarker: "Biomarker / Test",
      tablePatientValue: "Patient Value",
      tableRefRange: "Reference Range",
      tableStatus: "Status Flag",
      section1Summary: "1. Simple Summary",
      section2Findings: "2. Important Findings",
      section5Terms: "5. Medical Terminology Explained",
      section6Questions: "6. Questions to Discuss with Your Doctor",
      section7FollowUp: "7. Recommended Professional Follow-Up",
    },
    compare: {
      title: "Previous Medical Report Comparison",
      subtitle: "Compare diagnostic biomarker progression over time. Validates compatible measurement units and highlights clinical deltas.",
      selectBaseline: "Select Baseline Report (Earlier Date)",
      selectCurrent: "Select Current Report (Recent Date)",
      chartTitle: "Biomarker Comparison Chart",
      chartSubtitle: "Side-by-side values for compatible biomarkers with matching clinical units.",
      compatibleBadge: "Compatible Units Verified",
      tableTitle: "Measurement-by-Measurement Delta Analysis",
      deltaChange: "Change (Δ)",
      trendImproved: "Improved",
      trendStable: "Stable",
      trendElevated: "Elevated",
      disclaimer: "Clinical Interpretation Disclaimer: Numerical biomarker changes illustrate trends over time and do not replace personalized evaluation by your physician.",
    },
    appointments: {
      title: "Smart Appointment Scheduling",
      subtitle: "Schedule clinic visits with automated conflict and overlap detection.",
      bookNew: "Schedule New Appointment",
      doctorName: "Specialist",
      specialty: "Department",
      conflictDetected: "Schedule Conflict Detected!",
      conflictSubtitle: "Collision detected with existing clinic schedule",
      alternativeSlots: "Recommended Available Slots",
      recheckSlot: "Recheck Availability",
      confirmedSuccess: "Appointment confirmed and added to calendar.",
      scheduleListTitle: "Current Appointment Schedule",
      recoverMissedBtn: "Recover & Rebook Visit",
      reasonForVisitLabel: "Reason for visit:",
      formDate: "Consultation Date:",
      formTime: "Time Window:",
      formDoctor: "Physician:",
      formRoom: "Clinic / Room:",
      formReason: "Reason for Visit:",
      validateAndConfirmBtn: "Validate Availability & Confirm",
      scheduleConflictDemoTip: "Judge Demo Conflict Test: Click 'Schedule New Appointment' and keep the default date (Nov 5 at 10:00 AM with Dr. Anita Sharma in Room 302). The system will detect the real collision and suggest verified slots!",
    },
    clinic: {
      title: "Clinic Staff & Follow-Up Workspace",
      subtitle: "Review pending patient reports, overdue follow-ups, and coordinate patient care.",
      taskQueue: "Patient Care Task Queue",
      overdueTasks: "Overdue Follow-Ups",
      missedAppointments: "Missed Appointments",
      pendingReviews: "Pending Lab Reviews",
      escalateTask: "Escalate to Physician",
      completeTask: "Mark as Completed",
      actionHistory: "Audit Trail & Action History",
      searchPlaceholder: "Search by task title, patient name, or assignee...",
      priorityLabel: "Priority:",
      nextActionLabel: "Next Action:",
      assignedToLabel: "Assigned to:",
      dueDateLabel: "Due:",
      modalCompleteTitle: "Mark Task Completed",
      modalEscalateTitle: "Escalate to Attending Physician",
      modalNoteLabel: "Clinical Action Note & Reason:",
      recordAuditBtn: "Record into Audit Log",
    },
    followups: {
      title: "Patient Care Follow-Up & Referral Management",
      subtitle: "Closed-loop care coordination tracking ordered tests from laboratory arrival to clinician sign-off.",
      safetyConstraint: "Strict Clinical Safety Constraint: CareRoute AI never treats an uploaded or unreviewed test result as a completed clinical decision. Every step requires authorized staff coordination and audit trail persistence.",
      workflowSequenceTitle: "Standard Care Coordination Workflow Sequence",
      activeCaseTitle: "Active Coordination Case",
      diagnosticPanelLabel: "Diagnostic Panel:",
      assignedCoordinatorLabel: "Assigned Coordinator:",
      targetCompletionLabel: "Target Completion Date:",
      auditTrailTitle: "Audit Trail & Status Progression",
    },
    lifestyle: {
      title: "Healthy Lifestyle & Recovery Guidance",
      subtitle: "Daily wellness support aligned with clinician recovery restrictions.",
      waterIntake: "Daily Hydration Goal",
      sleepRoutine: "Sleep & Rest Schedule",
      activityGoals: "Safe Physical Activity",
      clinicianRestrictions: "Doctor-Provided Recovery Restrictions (Dr. Anita Sharma, MD)",
      healthyHabits: "Daily Healthy Habits",
      precedenceNotice: "Notice: Doctor-directed clinical recovery restrictions take strict precedence over general lifestyle education.",
      addWaterBtn: "+250 mL",
      waterTargetLabel: "of daily target",
      sleepTargetDesc: "Optimal restorative sleep supports regular insulin sensitivity and blood pressure stability.",
      activityTargetDesc: "Low-impact brisk walking after meals helps blunt glucose spikes safely.",
      completedCount: "Completed",
    },
    tour: {
      modalTitle: "Hackathon Judge Guided Tour",
      modalSubtitle: "10-step sequential demonstration of CareRoute AI capabilities",
      stepIndicator: "Step",
      clinicalFeatureLabel: "Clinical Feature:",
      targetModeLabel: "Target Mode:",
      languageLabel: "Language:",
      jumpToFeatureBtn: "Jump to this Feature",
      nextStepBtn: "Next Step",
      closeTourBtn: "Close Tour",
    },
  },
  te: {
    common: {
      appName: "కేర్ రూట్ AI (CareRoute AI)",
      tagline: "మీ ఆరోగ్య ప్రయాణం, సురక్షితంగా అనుసంధానించబడింది.",
      demoMode: "హ్యాకథాన్ డెమో మోడ్",
      demoNotice: "డెమో కోసం నమూనా డేటా. లైవ్ AI కొరకు .env.local లో వివరాలు అందించండి.",
      judgeTour: "న్యాయనిర్ణేత డెమో టూర్ (10 దశలు)",
      patientView: "రోగి డ్యాష్‌బోర్డ్",
      clinicView: "క్లినిక్ సిబ్బంది డ్యాష్‌బోర్డ్",
      switchRole: "పాత్రను మార్చండి",
      switchLanguage: "భాష",
      notifications: "నోటిఫికేషన్లు",
      unread: "చదవనివి",
      markAllRead: "అన్నీ చదివినట్లు గుర్తించు",
      noNotifications: "కొత్త నోటిఫికేషన్లు ఏవీ లేవు",
      search: "రికార్డులు, వైద్యులు, పరీక్షల కోసం వెతకండి...",
      save: "మార్పులను భద్రపరచు",
      cancel: "రద్దు చేయి",
      close: "మూసివేయి",
      delete: "తొలగించు",
      edit: "సవరించు",
      confirm: "ధృవీకరించు",
      verify: "సూచనలను పరిశీలించి ధృవీకరించు",
      upload: "పత్రం అప్‌లోడ్ చేయండి",
      loading: "AI ద్వారా విశ్లేషణ జరుగుతోంది...",
      success: "చర్య విజయవంతంగా పూర్తయింది",
      error: "లోపం సంభవించింది",
      status: "స్థితి",
      date: "తేదీ",
      time: "సమయం",
      location: "స్థలం",
      doctor: "వైద్యులు / క్లినీషియన్",
      patient: "రోగి",
      disclaimerTitle: "వైద్య భద్రత & AI హెచ్చరిక",
      medicalDisclaimer: "కేర్ రూట్ AI సమాచార అవగాహన మరియు సమన్వయానికి మాత్రమే సహాయపడుతుంది. ఇది వ్యాధి నిర్ధారణ చేయదు, మందులు సూచించదు మరియు అర్హత కలిగిన వైద్యులకు ప్రత్యామ్నాయం కాదు.",
      liveAiBadge: "జెమిని లైవ్ విశ్లేషణ",
      sampleAiBadge: "నమూనా క్లినికల్ డెమో",
      confirmedBadge: "ఖరారైంది",
      missedBadge: "రాలేకపోయారు",
      pendingBadge: "పరిశీలనలో ఉంది",
      verifiedBadge: "ధృవీకరించబడింది",
      viewAll: "మొత్తం చూడండి",
      back: "వెనుకకు",
      next: "తదుపరి",
      previous: "మునుపటి",
      resetDemoData: "క్లీన్ డెమో డేటాకు రీసెట్ చేయండి",
      resetConfirm: "కేర్ రూట్ AI డెమో డేటాను ప్రారంభ స్థితికి రీసెట్ చేయాలా?",
    },
    nav: {
      dashboard: "డ్యాష్‌బోర్డ్",
      prescriptions: "ప్రిస్క్రిప్షన్లు",
      medications: "మందుల రిమైండర్లు",
      reports: "ల్యాబ్ నివేదికలు",
      compareReports: "నివేదికల పోలిక",
      appointments: "అపాయింట్‌మెంట్లు",
      lifestyle: "జీవనశైలి & రికవరీ",
      clinicWorkspace: "క్లినిక్ డ్యాష్‌బోర్డ్",
      followUps: "కేర్ ఫాలో-అప్‌లు",
      consent: "సమ్మతి & అనుమతులు",
      clinicAdmin: "క్లినిక్ అడ్మిన్ రోస్టర్",
      notifications: "నోటిఫికేషన్లు",
      clinicalSafetyTitle: "క్లినికల్ AI భద్రతా ప్రమాణాలు",
      clinicalSafetyDesc: "సమాచార అవగాహన కొరకు మాత్రమే. వైద్య చికిత్సలకు ప్రత్యామ్నాయం కాదు.",
      version: "v1.0 • హ్యాకథాన్ ఎడిషన్",
    },
    dashboard: {
      welcome: "తిరిగి స్వాగతం",
      welcomeSub: "మీ రోజువారీ మందుల సమయాలు, రాబోయే అపాయింట్‌మెంట్లు మరియు నివేదికల వివరాలు ఇక్కడ ఉన్నాయి.",
      personalHealthOverview: "వ్యక్తిగత ఆరోగ్య కమాండ్ సెంటర్",
      patientProfileTag: "రోగి ప్రొఫైల్",
      careProgram: "అపోలో హెల్త్ క్లినిక్ • టైప్ 2 డయాబెటిస్ & రక్తపోటు కేర్ ప్రోగ్రామ్",
      todayMedications: "ఈరోజు మందులు",
      upcomingAppointments: "రాబోయే అపాయింట్‌మెంట్లు",
      pendingReports: "పరిశీలనలో ఉన్న నివేదికలు",
      activeCareTasks: "యాక్టివ్ కేర్ పనులు",
      medicationTimeline: "ఈరోజు ధృవీకరించబడిన మందుల సమయ పట్టిక",
      nextClinicVisit: "తదుపరి క్లినిక్ అపాయింట్‌మెంట్",
      confirmedStatus: "ఖరారైంది",
      dateTimeLabel: "తేదీ & సమయం:",
      locationLabel: "స్థలం:",
      manageAppointment: "అపాయింట్‌మెంట్ నిర్వహణ",
      noUpcomingVisits: "రాబోయే అపాయింట్‌మెంట్లు ఏవీ లేవు.",
      quickActions: "త్వరిత చర్యలు",
      uploadRx: "ప్రిస్క్రిప్షన్ అప్‌లోడ్",
      labReportAi: "ల్యాబ్ రిపోర్ట్ AI విశ్లేషణ",
      compareTrends: "ట్రెండ్‌ల పోలిక",
      bookAppointment: "అపాయింట్‌మెంట్ బుకింగ్",
      medicationSchedule: "మందుల సమయ పట్టిక",
      viewCareTasks: "కేర్ పనుల జాబితా",
      biomarkerTrendsTitle: "కీలక బయోమార్కర్ ట్రెండ్‌లు (HbA1c & రక్తంలో చక్కెర)",
      biomarkerTrendsSubtitle: "గత 3 త్రైమాసికాలలో మెట్‌ఫార్మిన్ ఔషధం మరియు జీవనశైలి మార్పులతో వచ్చిన సానుకూల పురోగతి.",
      hba1cAverage: "HbA1c (3 నెలల సగటు చక్కెర)",
      fastingBloodSugar: "ఉపవాస రక్తంలో చక్కెర (Fasting Glucose)",
      relativeImprovement: "8.2% ➔ 7.4% (-9.8% సానుకూల మెరుగుదల)",
      dropPercentage: "165 ➔ 138 mg/dL (-16.3% తగ్గుదల)",
      viewReportCompare: "రిపోర్టులను పోల్చండి",
      doseTaken: "తీసుకున్నారు",
      dosePending: "సమయం ఆసన్నం కాలేదు",
      markAsTaken: "తీసుకున్నట్లు గుర్తించు",
      doseAdherenceWarning: "ముఖ్యమైన భద్రతా హెచ్చరిక: మిస్ అయిన డోస్ కోసం ఒకేసారి రెట్టింపు మోతాదు తీసుకోకండి. సందేహం ఉంటే వైద్యుడిని సంప్రదించండి.",
      greetingMorning: "శుభోదయం",
      greetingAfternoon: "శుభ మధ్యాహ్నం",
      greetingEvening: "శుభ సాయంత్రం",
      patientAge: "వయస్సు",
      patientGender: "లింగం",
      bloodGroup: "రక్త వర్గం",
      aiCoPilotActive: "జెమిని AI క్లినికల్ సహాయం సక్రియంగా ఉంది",
      aiSafetyVerified: "ఖచ్చితమైన వైద్య భద్రతా ప్రమాణాలు అమలులో ఉన్నాయి",
      weeklyAdherenceScore: "వారం మోతాదు పాటించిన శాతం",
      todayAdherence: "ఈరోజు మందుల మోతాదుల పురోగతి",
      dosesCompleted: "మోతాదులు పూర్తయ్యాయి",
      allDosesCompleted: "ఈరోజుకు సూచించిన మందులన్నీ పూర్తి అయ్యాయి!",
      nextScheduledDose: "తదుపరి షెడ్యూల్ చేసిన మోతాదు",
      takeDoseBtn: "ఇప్పుడే తీసుకోండి",
      doseLoggedSuccess: "మోతాదు విజయవంతంగా నమోదు చేయబడింది!",
      nextConsultationTitle: "తదుపరి క్లినిక్ సంప్రదింపు",
      confirmedAppointment: "ఖరారైన కన్సల్టేషన్",
      rescheduleSlot: "సమయాన్ని మార్చుకోండి",
      directionsGuide: "గది & చిరునామా మార్గదర్శి",
      biomarkerSectionTitle: "కీలక బయోమార్కర్ ట్రెండ్‌లు (HbA1c & చక్కెర)",
      biomarkerSectionDesc: "గత 9 నెలలలో మెట్‌ఫార్మిన్ మరియు జీవనశైలి మార్పులతో వచ్చిన సానుకూల వైద్య పురోగతి.",
      deepDiveCompare: "నివేదికల సమగ్ర పోలిక చూడండి",
      recentLabActivity: "ఇటీవలి ల్యాబ్ నివేదికలు",
      careTaskFollowup: "కేర్ సమన్వయకర్త ఫాలో-అప్",
      viewFullSchedule: "పూర్తి మందుల షెడ్యూల్ చూడండి",
      clinicalSafetyNotice: "క్లినికల్ AI భద్రతా ప్రమాణాలు",
      clinicalSafetyNoticeDesc: "కేర్ రూట్ AI వైద్యుల అనుమతి లేకుండా మోతాదులను మార్చదు లేదా స్వతంత్రంగా ప్రిస్క్రిప్షన్లు ఇవ్వదు. ప్రతి మార్పుకు వైద్యుల ధృవీకరణ తప్పనిసరి.",
    },
    prescriptions: {
      title: "ప్రిస్క్రిప్షన్ భద్రత & ధృవీకరణ",
      subtitle: "ప్రిస్క్రిప్షన్‌ను డిజిటైజ్ చేసి, సిబ్బందితో ధృవీకరించిన తర్వాత సురక్షితంగా రిమైండర్‌లుగా మార్చండి.",
      uploadTitle: "ప్రిస్క్రిప్షన్ కాపీ అప్‌లోడ్ చేయండి",
      uploadDesc: "చిత్రం లేదా PDF స్లిప్‌ను అప్‌లోడ్ చేయవచ్చు. AI వివరాలను సేకరించి సమీక్షకు అందిస్తుంది.",
      handwritingAlert: "చేతిరాత అస్పష్టంగా ఉంది: షెడ్యూల్ చేయడానికి ముందు అధికృత సిబ్బంది ధృవీకరణ తప్పనిసరి.",
      unverifiedNotice: "అధికారికంగా ధృవీకరించిన తర్వాత మాత్రమే మందుల రిమైండర్లు సృష్టించబడతాయి.",
      verificationSuccess: "ప్రిస్క్రిప్షన్ విజయవంతంగా ధృవీకరించబడింది. మందుల షెడ్యూల్ సిద్ధమైంది.",
      extracting: "AI ద్వారా మందుల వివరాలు సేకరించబడుతున్నాయి...",
      verifiedByClinician: "క్లినీషియన్ ద్వారా ధృవీకరించబడింది",
      scheduleAfterVerification: "మందుల షెడ్యూల్ సృష్టించండి",
      safetyRule: "అస్పష్టమైన మందుల పేర్లను ఊహించకూడదు లేదా వైద్యుడి సంప్రదింపు లేకుండా మోతాదు మార్చకూడదు.",
      medicineName: "మందు పేరు",
      dosage: "మోతాదు",
      frequency: "ఫ్రీక్వెన్సీ",
      timing: "సమయం",
      duration: "వ్యవధి",
      instructions: "సూచనలు",
      recordsTitle: "అప్‌లోడ్ చేసిన ప్రిస్క్రిప్షన్ రికార్డులు",
      authorizeBtn: "పరిశీలించి ధృవీకరించండి",
      reviewSignOffBtn: "సమీక్ష రికార్డు చూడండి",
      modalTitle: "క్లినికల్ ధృవీకరణ సంతకం (Sign-Off)",
      modalSubtitle: "రిమైండర్లను ప్రారంభించే ముందు వైద్య సిబ్బంది మోతాదును ధృవీకరించడం తప్పనిసరి.",
      reviewerName: "సమీక్షించిన అధికారి పేరు & హోదా:",
      reviewerNotes: "క్లినికల్ ధృవీకరణ గమనికలు:",
      signOffAction: "సంతకం చేసి రిమైండర్లు ప్రారంభించండి",
    },
    medications: {
      title: "మందుల రిమైండర్లు & మోతాదు ట్రాకింగ్",
      subtitle: "వైద్యులు ధృవీకరించిన సూచనల ప్రకారం మందులను సకాలంలో తీసుకోండి.",
      todaySchedule: "ఈరోజు మందుల సమయాలు",
      weeklyAdherence: "వారం పాటించిన శాతం",
      verifiedDoctorRegimen: "వైద్యులు ధృవీకరించిన నియమావళి",
      markTaken: "మందు తీసుకున్నాను",
      markSkipped: "దాటవేయి",
      markMissed: "మిస్ అయినట్లు గుర్తించు",
      statusTaken: "తీసుకున్నారు",
      statusMissed: "మిస్ అయ్యారు",
      statusSkipped: "దాటవేశారు",
      statusPending: "సమయం ఆసన్నం కాలేదు",
      safetyMissedDoseWarning: "ముఖ్యమైన భద్రతా హెచ్చరిక: మిస్ అయిన డోస్ కోసం ఒకేసారి రెట్టింపు మోతాదు తీసుకోకండి. సందేహం ఉంటే మీ వైద్యుడిని లేదా ఫార్మసిస్ట్‌ను సంప్రదించండి.",
      historyTitle: "రోగి నివేదించిన మందుల వినియోగ చరిత్ర",
      logDoseTitle: "మోతాదు స్థితి నమోదు",
      logDoseNotes: "లక్షణాలు లేదా గమనికలు (ఉదా: భోజన సమయం, వికారం మొదలైనవి):",
      logDoseNotice: "గమనిక: ఈ నమోదు రోగి జ్ఞాపకార్థం మాత్రమే, అధికారిక ఆసుపత్రి ధృవీకరణ కాదు.",
      saveLogEntry: "నమోదును భద్రపరచు",
    },
    reports: {
      title: "AI మెడికల్ రిపోర్ట్ వివరణలు",
      subtitle: "పరీక్ష ఫలితాలు, సూచన శ్రేణులను సులభంగా అర్థం చేసుకోండి మరియు వైద్యుడిని అడగవలసిన ప్రశ్నలను తెలుసుకోండి.",
      uploadReport: "ల్యాబ్ రిపోర్ట్ అప్‌లోడ్ చేయండి",
      abnormalFlag: "సాధారణ శ్రేణికి భిన్నంగా ఉంది",
      normalFlag: "సాధారణ పరిధిలోనే ఉంది",
      referenceRange: "ప్రామాణిక ల్యాబ్ పరిధి",
      unit: "యూనిట్",
      findingsSummary: "ముఖ్యమైన ఫలితాల సారాంశం",
      unfamiliarTerms: "వైద్య పదాల సులభ వివరణ",
      questionsForDoctor: "మీ వైద్యుడిని అడగవలసిన ప్రశ్నలు",
      compareWithPrevious: "మునుపటి రిపోర్టుతో పోల్చండి",
      generateLiveGemini: "జెమిని లైవ్ వివరణను పొందండి",
      generatingAi: "AI వివరణ రూపొందించబడుతోంది...",
      tableBiomarker: "బయోమార్కర్ / పరీక్ష",
      tablePatientValue: "రోగి ఫలితం",
      tableRefRange: "ప్రామాణిక పరిధి",
      tableStatus: "స్థితి",
      section1Summary: "1. సులభ సారాంశం",
      section2Findings: "2. ముఖ్యమైన పరిశీలనలు",
      section5Terms: "5. వైద్య పదాల సులభ వివరణ",
      section6Questions: "6. మీ వైద్యుడిని అడగవలసిన ప్రశ్నలు",
      section7FollowUp: "7. వైద్యుల తదుపరి సంప్రదింపు సూచన",
    },
    compare: {
      title: "మునుపటి మరియు ప్రస్తుత నివేదికల పోలిక",
      subtitle: "కాలక్రమేణా మార్పులను సరిపోల్చండి. కొలమానాలను ధృవీకరించి మార్పులను సులభంగా విశ్లేషిస్తుంది.",
      selectBaseline: "ప్రారంభ నివేదికను ఎంచుకోండి (మునుపటి తేదీ)",
      selectCurrent: "ప్రస్తుత నివేదికను ఎంచుకోండి (ఇటీవలి తేదీ)",
      chartTitle: "బయోమార్కర్ పోలిక చార్ట్",
      chartSubtitle: "సరిపోలే యూనిట్లు కలిగిన కొలతల పక్కపక్క విశ్లేషణ.",
      compatibleBadge: "యూనిట్లు సరిపోలాయి",
      tableTitle: "విలువ వారీ మార్పుల విశ్లేషణ",
      deltaChange: "మార్పు (Δ)",
      trendImproved: "మెరుగైంది",
      trendStable: "స్థిరంగా ఉంది",
      trendElevated: "ఎక్కువైంది",
      disclaimer: "క్లినికల్ వివరణ హెచ్చరిక: గణాంక మార్పులు కాలక్రమేణా ట్రెండ్‌లను చూపుతాయి, వైద్యుల ప్రత్యక్ష పరీక్షకు ప్రత్యామ్నాయం కాదు.",
    },
    appointments: {
      title: "స్మార్ట్ అపాయింట్‌మెంట్ షెడ్యూలింగ్",
      subtitle: "సమయ ఘర్షణలను స్వయంచాలకంగా గుర్తించే అపాయింట్‌మెంట్ వ్యవస్థ.",
      bookNew: "కొత్త అపాయింట్‌మెంట్ తీసుకోండి",
      doctorName: "స్పెషలిస్ట్ వైద్యులు",
      specialty: "విభాగం",
      conflictDetected: "సమయ ఘర్షణ గుర్తించబడింది!",
      conflictSubtitle: "ఎంచుకున్న సమయంలో వైద్యులు లేదా గది అందుబాటులో లేరు",
      alternativeSlots: "అందుబాటులో ఉన్న ప్రత్యామ్నాయ సమయాలు",
      recheckSlot: "లభ్యతను మళ్లీ తనిఖీ చేయండి",
      confirmedSuccess: "అపాయింట్‌మెంట్ ఖరారైంది.",
      scheduleListTitle: "ప్రస్తుత అపాయింట్‌మెంట్ల జాబితా",
      recoverMissedBtn: "తిరిగి అపాయింట్‌మెంట్ తీసుకోండి",
      reasonForVisitLabel: "సందర్శనకు కారణం:",
      formDate: "అపాయింట్‌మెంట్ తేదీ:",
      formTime: "సమయ వ్యవధి:",
      formDoctor: "వైద్యులు:",
      formRoom: "క్లినిక్ గది:",
      formReason: "కారణం:",
      validateAndConfirmBtn: "లభ్యతను తనిఖీ చేసి ఖరారు చేయండి",
      scheduleConflictDemoTip: "న్యాయనిర్ణేత డెమో పరీక్ష: 'కొత్త అపాయింట్‌మెంట్ తీసుకోండి' పై క్లిక్ చేసి నవంబర్ 5 ఉదయం 10:00 సమయాన్ని అలాగే ఉంచండి. సిస్టమ్ ఘర్షణను గుర్తించి ఖాళీ సమయాలను సూచిస్తుంది!",
    },
    clinic: {
      title: "క్లినిక్ సిబ్బంది & ఫాలో-అప్ డ్యాష్‌బోర్డ్",
      subtitle: "రోగి నివేదికల సమీక్ష, బకాయి ఉన్న ఫాలో-అప్‌లు మరియు వైద్య సేవల సమన్వయం.",
      taskQueue: "రోగి కేర్ టాస్క్ క్యూ",
      overdueTasks: "గడువు ముగిసిన ఫాలో-అప్‌లు",
      missedAppointments: "రాలేకపోయిన అపాయింట్‌మెంట్లు",
      pendingReviews: "సమీక్షించాల్సిన ల్యాబ్ ఫలితాలు",
      escalateTask: "వైద్యుడికి ఎస్కలేట్ చేయండి",
      completeTask: "పూర్తయినట్లు గుర్తించండి",
      actionHistory: "ఆడిట్ చరిత్ర & చర్యల రికార్డు",
      searchPlaceholder: "టాస్క్ శీర్షిక, రోగి పేరు లేదా సిబ్బంది ద్వారా వెతకండి...",
      priorityLabel: "ప్రాధాన్యత:",
      nextActionLabel: "తదుపరి చర్య:",
      assignedToLabel: "కేటాయించబడింది:",
      dueDateLabel: "గడువు:",
      modalCompleteTitle: "టాస్క్ పూర్తయినట్లు నమోదు చేయండి",
      modalEscalateTitle: "ముఖ్య వైద్యుడికి ఎస్కలేట్ చేయండి",
      modalNoteLabel: "క్లినికల్ చర్య వివరాలు & గమనిక:",
      recordAuditBtn: "ఆడిట్ లాగ్‌లో భద్రపరచు",
    },
    followups: {
      title: "రోగి కేర్ ఫాలో-అప్ & రెఫరల్ నిర్వహణ",
      subtitle: "ల్యాబ్ ఫలితాల రాక నుండి వైద్యుల సంప్రదింపు వరకు సమగ్ర కేర్ సమన్వయం.",
      safetyConstraint: "ఖచ్చితమైన భద్రతా నియమం: కేర్ రూట్ AI సమీక్షించని ల్యాబ్ ఫలితాన్ని తుది వైద్య నిర్ణయంగా పరిగణించదు. ప్రతి దశలో అధికృత సిబ్బంది సమీక్ష అవసరం.",
      workflowSequenceTitle: "ప్రామాణిక కేర్ సమన్వయ ప్రక్రియ",
      activeCaseTitle: "ప్రస్తుత సమన్వయ కేసు",
      diagnosticPanelLabel: "ల్యాబ్ పరీక్ష ప్యానెల్:",
      assignedCoordinatorLabel: "కేర్ సమన్వయకర్త:",
      targetCompletionLabel: "లక్ష్య గడువు తేదీ:",
      auditTrailTitle: "ఆడిట్ ట్రయిల్ & స్థితి పురోగతి",
    },
    lifestyle: {
      title: "ఆరోగ్యకరమైన జీవనశైలి & రికవరీ",
      subtitle: "వైద్యుల సూచనలకు అనుగుణంగా రోజువారీ ఆరోగ్య అలవాట్లు మరియు రికవరీ మద్దతు.",
      waterIntake: "రోజువారీ నీటి లక్ష్యం",
      sleepRoutine: "నిద్ర & విశ్రాంతి సమయం",
      activityGoals: "సురక్షితమైన వ్యాయామం",
      clinicianRestrictions: "వైద్యులు సూచించిన రికవరీ పరిమితులు (డాక్టర్ అనితా శర్మ)",
      healthyHabits: "రోజువారీ ఆరోగ్య అలవాట్లు",
      precedenceNotice: "గమనిక: వైద్యులు సూచించిన రికవరీ పరిమితులు సాధారణ సలహాల కంటే అత్యంత ప్రాధాన్యమైనవి.",
      addWaterBtn: "+250 మి.లీ",
      waterTargetLabel: "రోజువారీ లక్ష్యంలో",
      sleepTargetDesc: "తగినంత నిద్ర ఇన్సులిన్ సున్నితత్వాన్ని మరియు రక్తపోటును అదుపులో ఉంచడానికి సహాయపడుతుంది.",
      activityTargetDesc: "భోజనం తర్వాత తేలికపాటి నడక రక్తంలో చక్కెర స్థాయిలు అకస్మాత్తుగా పెరగకుండా కాపాడుతుంది.",
      completedCount: "పూర్తయ్యాయి",
    },
    tour: {
      modalTitle: "హ్యాకథాన్ న్యాయనిర్ణేత గైడెడ్ టూర్",
      modalSubtitle: "కేర్ రూట్ AI సామర్థ్యాల 10-దశల ప్రత్యక్ష ప్రదర్శన",
      stepIndicator: "దశ",
      clinicalFeatureLabel: "క్లినికల్ ఫీచర్:",
      targetModeLabel: "లక్ష్య మోడ్:",
      languageLabel: "భాష:",
      jumpToFeatureBtn: "ఈ ఫీచర్‌ను ప్రత్యక్షంగా చూడండి",
      nextStepBtn: "తదుపరి దశ",
      closeTourBtn: "టూర్ ముగించు",
    },
  },
};

import { Language } from "@/types";

export interface TranslationDictionary {
  common: {
    appName: string;
    tagline: string;
    demoMode: string;
    demoNotice: string;
    patientView: string;
    clinicView: string;
    language: string;
    notifications: string;
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
    doctor: string;
    patient: string;
    disclaimerTitle: string;
    medicalDisclaimer: string;
    liveAiBadge: string;
    sampleAiBadge: string;
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
    notifications: string;
  };
  dashboard: {
    welcome: string;
    welcomeSub: string;
    todayMedications: string;
    upcomingAppointments: string;
    pendingReports: string;
    activeCareTasks: string;
    quickActions: string;
    uploadPrescription: string;
    uploadReport: string;
    bookAppointment: string;
    viewHistory: string;
    recentReports: string;
    vitalTrends: string;
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
  };
  medications: {
    title: string;
    subtitle: string;
    todaySchedule: string;
    weeklyAdherence: string;
    markTaken: string;
    markSkipped: string;
    markMissed: string;
    statusTaken: string;
    statusMissed: string;
    statusSkipped: string;
    statusPending: string;
    safetyMissedDoseWarning: string;
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
  };
  appointments: {
    title: string;
    subtitle: string;
    bookNew: string;
    doctorName: string;
    specialty: string;
    conflictDetected: string;
    alternativeSlots: string;
    recheckSlot: string;
    confirmedSuccess: string;
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
  };
  lifestyle: {
    title: string;
    subtitle: string;
    waterIntake: string;
    sleepRoutine: string;
    activityGoals: string;
    clinicianRestrictions: string;
    healthyHabits: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    common: {
      appName: "CareRoute AI",
      tagline: "Your Healthcare Journey, Connected.",
      demoMode: "Demonstration Mode",
      demoNotice: "Synthetic data for demonstration. Connect Supabase & Gemini in .env.local for production.",
      patientView: "Patient Workspace",
      clinicView: "Clinic Staff Workspace",
      language: "Language",
      notifications: "Notifications",
      search: "Search records, doctors, tests...",
      save: "Save Changes",
      cancel: "Cancel",
      close: "Close",
      delete: "Delete",
      edit: "Edit",
      confirm: "Confirm",
      verify: "Verify Instructions",
      upload: "Upload Document",
      loading: "Processing...",
      success: "Action completed successfully",
      error: "An error occurred",
      status: "Status",
      date: "Date",
      time: "Time",
      doctor: "Doctor / Clinician",
      patient: "Patient",
      disclaimerTitle: "Clinical Safety & AI Disclaimer",
      medicalDisclaimer: "CareRoute AI assists with understanding and organization. It does not independently diagnose conditions, prescribe medications, alter dosages, or replace qualified healthcare practitioners.",
      liveAiBadge: "Gemini Live Analysis",
      sampleAiBadge: "Simulated Clinical Demo",
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
      notifications: "Notifications",
    },
    dashboard: {
      welcome: "Welcome back",
      welcomeSub: "Here is your health overview, daily medication schedule, and pending tasks.",
      todayMedications: "Today's Medications",
      upcomingAppointments: "Upcoming Appointments",
      pendingReports: "Pending Report Reviews",
      activeCareTasks: "Active Care Tasks",
      quickActions: "Quick Actions",
      uploadPrescription: "Upload Prescription",
      uploadReport: "Upload Lab Report",
      bookAppointment: "Schedule Appointment",
      viewHistory: "View Care History",
      recentReports: "Recent Diagnostic Reports",
      vitalTrends: "Biomarker Trends (HbA1c & Fasting Glucose)",
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
    },
    medications: {
      title: "Medication Reminders & Dose Tracking",
      subtitle: "Stay on track with verified doctor instructions and log dose adherence.",
      todaySchedule: "Today's Dose Timeline",
      weeklyAdherence: "Weekly Adherence Rate",
      markTaken: "Mark as Taken",
      markSkipped: "Skip Dose",
      markMissed: "Mark Missed",
      statusTaken: "Taken",
      statusMissed: "Missed",
      statusSkipped: "Skipped",
      statusPending: "Pending",
      safetyMissedDoseWarning: "Safety Notice: Never double up on a dose to make up for a missed one. Contact your doctor or pharmacist if unsure.",
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
    },
    appointments: {
      title: "Smart Appointment Scheduling",
      subtitle: "Schedule clinic visits with automated conflict and overlap detection.",
      bookNew: "Schedule New Appointment",
      doctorName: "Specialist",
      specialty: "Department",
      conflictDetected: "Schedule Conflict Detected!",
      alternativeSlots: "Recommended Available Slots",
      recheckSlot: "Recheck Availability",
      confirmedSuccess: "Appointment confirmed and added to calendar.",
    },
    clinic: {
      title: "Clinic Staff & Follow-Up Workspace",
      subtitle: "Review pending patient reports, overdue follow-ups, and coordinate patient care.",
      taskQueue: "Patient Care Task Queue",
      overdueTasks: "Overdue Follow-Ups",
      missedAppointments: "Missed Appointments to Recover",
      pendingReviews: "Pending Lab Result Reviews",
      escalateTask: "Escalate to Physician",
      completeTask: "Mark as Completed",
      actionHistory: "Audit History",
    },
    lifestyle: {
      title: "Healthy Lifestyle & Recovery Guidance",
      subtitle: "Daily wellness support aligned with clinician recovery restrictions.",
      waterIntake: "Daily Hydration Goal",
      sleepRoutine: "Sleep & Rest Schedule",
      activityGoals: "Safe Physical Activity",
      clinicianRestrictions: "Doctor-Provided Recovery Restrictions",
      healthyHabits: "Daily Healthy Habits",
    },
  },
  te: {
    common: {
      appName: "కేర్ రూట్ AI (CareRoute AI)",
      tagline: "మీ ఆరోగ్య ప్రయాణం, సురక్షితంగా అనుసంధానించబడింది.",
      demoMode: "డెమో మోడ్",
      demoNotice: "డెమో కోసం నమూనా డేటా. లైవ్ AI కొరకు .env.local లో వివరాలు అందించండి.",
      patientView: "రోగి డ్యాష్‌బోర్డ్",
      clinicView: "క్లినిక్ సిబ్బంది డ్యాష్‌బోర్డ్",
      language: "భాష",
      notifications: "నోటిఫికేషన్లు",
      search: "రికార్డులు, వైద్యులు, పరీక్షల కోసం వెతకండి...",
      save: "మార్పులను భద్రపరచు",
      cancel: "రద్దు చేయి",
      close: "మూసివేయి",
      delete: "తొలగించు",
      edit: "సవరించు",
      confirm: "ధృవీకరించు",
      verify: "సూచనలను పరిశీలించి ధృవీకరించు",
      upload: "పత్రం అప్‌లోడ్ చేయండి",
      loading: "ప్రాసెస్ జరుగుతోంది...",
      success: "విజయవంతంగా పూర్తయింది",
      error: "లోపం సంభవించింది",
      status: "స్థితి",
      date: "తేదీ",
      time: "సమయం",
      doctor: "వైద్యులు / క్లినీషియన్",
      patient: "రోగి",
      disclaimerTitle: "వైద్య భద్రత & AI హెచ్చరిక",
      medicalDisclaimer: "కేర్ రూట్ AI సమాచార అవగాహన మరియు సమన్వయానికి మాత్రమే సహాయపడుతుంది. ఇది వ్యాధి నిర్ధారణ చేయదు, మందులు సూచించదు మరియు అర్హత కలిగిన వైద్యులకు ప్రత్యామ్నాయం కాదు.",
      liveAiBadge: "జెమిని లైవ్ విశ్లేషణ",
      sampleAiBadge: "నమూనా క్లినికల్ డెమో",
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
      notifications: "నోటిఫికేషన్లు",
    },
    dashboard: {
      welcome: "తిరిగి స్వాగతం",
      welcomeSub: "మీ రోజువారీ మందుల సమయాలు, అపాయింట్‌మెంట్లు మరియు నివేదికల వివరాలు ఇక్కడ ఉన్నాయి.",
      todayMedications: "ఈరోజు మందులు",
      upcomingAppointments: "రాబోయే అపాయింట్‌మెంట్లు",
      pendingReports: "పరిశీలనలో ఉన్న నివేదికలు",
      activeCareTasks: "యాక్టివ్ కేర్ పనులు",
      quickActions: "త్వరిత చర్యలు",
      uploadPrescription: "ప్రిస్క్రిప్షన్ అప్‌లోడ్ చేయండి",
      uploadReport: "ల్యాబ్ రిపోర్ట్ అప్‌లోడ్ చేయండి",
      bookAppointment: "అపాయింట్‌మెంట్ బుక్ చేయండి",
      viewHistory: "కేర్ చరిత్ర చూడండి",
      recentReports: "ఇటీవలి ల్యాబ్ నివేదికలు",
      vitalTrends: "కీలక బయోమార్కర్ ట్రెండ్‌లు (HbA1c & గ్లూకోజ్)",
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
    },
    medications: {
      title: "మందుల రిమైండర్లు & మోతాదు ట్రాకింగ్",
      subtitle: "వైద్యులు ధృవీకరించిన సూచనల ప్రకారం మందులను సకాలంలో తీసుకోండి.",
      todaySchedule: "ఈరోజు మందుల సమయాలు",
      weeklyAdherence: "వారం పాటించిన శాతం",
      markTaken: "తీసుకున్నట్లు గుర్తించండి",
      markSkipped: "దాటవేయి",
      markMissed: "మిస్ అయినట్లు గుర్తించండి",
      statusTaken: "తీసుకున్నారు",
      statusMissed: "మిస్ అయ్యారు",
      statusSkipped: "దాటవేశారు",
      statusPending: "సమయం ఆసన్నం కాలేదు",
      safetyMissedDoseWarning: "భద్రతా హెచ్చరిక: మిస్ అయిన డోస్ కోసం ఒకేసారి రెట్టింపు మోతాదు తీసుకోకండి. సందేహం ఉంటే మీ వైద్యుడిని లేదా ఫార్మసిస్ట్‌ను సంప్రదించండి.",
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
    },
    appointments: {
      title: "స్మార్ట్ అపాయింట్‌మెంట్ షెడ్యూలింగ్",
      subtitle: "సమయ ఘర్షణలను స్వయంచాలకంగా గుర్తించే అపాయింట్‌మెంట్ వ్యవస్థ.",
      bookNew: "కొత్త అపాయింట్‌మెంట్ తీసుకోండి",
      doctorName: "స్పెషలిస్ట్ వైద్యులు",
      specialty: "విభాగం",
      conflictDetected: "సమయ ఘర్షణ గుర్తించబడింది!",
      alternativeSlots: "అందుబాటులో ఉన్న ప్రత్యామ్నాయ సమయాలు",
      recheckSlot: "లభ్యతను మళ్లీ తనిఖీ చేయండి",
      confirmedSuccess: "అపాయింట్‌మెంట్ ఖరారైంది.",
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
      actionHistory: "ఆడిట్ చరిత్ర",
    },
    lifestyle: {
      title: "ఆరోగ్యకరమైన జీవనశైలి & రికవరీ",
      subtitle: "వైద్యుల సూచనలకు అనుగుణంగా రోజువారీ ఆరోగ్య అలవాట్లు మరియు రికవరీ మద్దతు.",
      waterIntake: "రోజువారీ నీటి లక్ష్యం",
      sleepRoutine: "నిద్ర & విశ్రాంతి సమయం",
      activityGoals: "సురక్షితమైన వ్యాయామం",
      clinicianRestrictions: "వైద్యులు సూచించిన రికవరీ పరిమితులు",
      healthyHabits: "రోజువారీ ఆరోగ్య అలవాట్లు",
    },
  },
};

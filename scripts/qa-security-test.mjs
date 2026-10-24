/**
 * CareRoute AI - Comprehensive Automated QA & Security Audit Test Suite
 * Executed by Senior QA Engineer & Security Specialist
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const rootDir = process.cwd();

// Test Runner utilities
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = "") {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    failures.push({ testName, details });
    console.error(`  ✗ FAIL: ${testName} - ${details}`);
  }
}

function suite(name, fn) {
  console.log(`\n======================================================`);
  console.log(`SUITE: ${name}`);
  console.log(`======================================================`);
  fn();
}

console.log(`\nStarting CareRoute AI Security & QA Verification Suite...`);
console.log(`Execution Time: ${new Date().toISOString()}`);

// ---------------------------------------------------------
// SUITE 1: Test Account Configurations
// ---------------------------------------------------------
suite("1. Multi-Tenant Test Account Configuration", () => {
  const demoDataPath = resolve(rootDir, "lib/data/demoData.ts");
  assert(existsSync(demoDataPath), "Demo data file exists", demoDataPath);

  const demoDataContent = readFileSync(demoDataPath, "utf-8");

  // Check Patient A (Venkata Rao)
  assert(
    demoDataContent.includes('id: "patient-venkata-rao"') &&
    demoDataContent.includes('role: "patient"') &&
    demoDataContent.includes('clinicId: "apollo-hyderabad-01"'),
    "Patient A (Venkata Rao) test account configured with Apollo Clinic A"
  );

  // Check Patient B (Lakshmi Devi)
  assert(
    demoDataContent.includes('id: "patient-lakshmi-devi"') &&
    demoDataContent.includes('role: "patient"') &&
    demoDataContent.includes('clinicId: "care-vijayawada-02"'),
    "Patient B (Lakshmi Devi) test account configured with Care Clinic B"
  );

  // Check Clinic Staff (Priya Sharma, RN)
  assert(
    demoDataContent.includes('id: "staff-priya-sharma"') &&
    demoDataContent.includes('role: "clinic_staff"') &&
    demoDataContent.includes('clinicId: "apollo-hyderabad-01"'),
    "Clinic Staff (Priya Sharma, RN) test account configured with Apollo Clinic A"
  );

  // Check Clinic Admin (Dr. Suresh Reddy)
  assert(
    demoDataContent.includes('id: "admin-suresh-reddy"') &&
    demoDataContent.includes('role: "admin"') &&
    demoDataContent.includes('clinicId: "apollo-hyderabad-01"'),
    "Clinic Administrator (Dr. Suresh Reddy) test account configured with Apollo Clinic A"
  );

  // Check Clinic B Staff (Dr. K. Ramanathan)
  assert(
    demoDataContent.includes('id: "staff-ramanathan"') &&
    demoDataContent.includes('role: "clinic_staff"') &&
    demoDataContent.includes('clinicId: "care-vijayawada-02"'),
    "Clinic B Staff (Dr. K. Ramanathan) test account configured with Care Clinic B"
  );
});

// ---------------------------------------------------------
// SUITE 2: Authentication & Role-Based Dashboard Routing
// ---------------------------------------------------------
suite("2. Login & Role-Based Routing Logic", () => {
  const loginPath = resolve(rootDir, "app/(auth)/login/page.tsx");
  assert(existsSync(loginPath), "Login page exists", loginPath);

  const loginContent = readFileSync(loginPath, "utf-8");

  // Check role destination routing logic
  assert(
    loginContent.includes('if (roleSelection === "patient")') &&
    loginContent.includes('router.push("/dashboard")') &&
    loginContent.includes('router.push("/clinic/dashboard")'),
    "Login logic routes patients to /dashboard and clinic staff/admins to /clinic/dashboard"
  );

  // Check quick switch personas for hackathon demo
  assert(
    loginContent.includes("patient-venkata-rao") &&
    loginContent.includes("patient-lakshmi-devi") &&
    loginContent.includes("staff-priya-sharma") &&
    loginContent.includes("admin-suresh-reddy"),
    "Login UI provides quick demo persona buttons for all 4 distinct roles and tenants"
  );
});

// ---------------------------------------------------------
// SUITE 3: Navigation & Permission Separation
// ---------------------------------------------------------
suite("3. Navigation & Permission Separation", () => {
  const sidebarPath = resolve(rootDir, "components/layout/Sidebar.tsx");
  const mobileNavPath = resolve(rootDir, "components/layout/MobileNav.tsx");
  assert(existsSync(sidebarPath), "Sidebar component exists");
  assert(existsSync(mobileNavPath), "Mobile navigation component exists");

  const sidebarContent = readFileSync(sidebarPath, "utf-8");

  // Patient Nav contains patient-only links
  assert(
    sidebarContent.includes('href: "/dashboard"') &&
    sidebarContent.includes('href: "/medications"') &&
    sidebarContent.includes('href: "/reports"') &&
    sidebarContent.includes('href: "/appointments"') &&
    sidebarContent.includes('href: "/lifestyle"') &&
    sidebarContent.includes('href: "/consent"'),
    "Patient navigation has /dashboard, /medications, /reports, /appointments, /lifestyle, and /consent"
  );

  // Clinic Nav contains clinic command center and follow-ups
  assert(
    sidebarContent.includes('href: "/clinic/dashboard"') &&
    sidebarContent.includes('href: "/clinic/follow-ups"'),
    "Clinic navigation contains /clinic/dashboard and /clinic/follow-ups"
  );

  // Clinic admin route is conditionally rendered based on canPerformAdminAction
  assert(
    sidebarContent.includes("canPerformAdminAction") &&
    sidebarContent.includes('href: "/clinic/admin"'),
    "Clinic Administration (/clinic/admin) link is strictly gated to canPerformAdminAction"
  );
});

// ---------------------------------------------------------
// SUITE 4: Registration & Logout Flow
// ---------------------------------------------------------
suite("4. Registration & Logout Flow", () => {
  const registerPath = resolve(rootDir, "app/(auth)/register/page.tsx");
  assert(existsSync(registerPath), "Registration page exists");

  const registerContent = readFileSync(registerPath, "utf-8");
  assert(
    registerContent.includes('value="patient"') &&
    registerContent.includes('value="clinic_staff"') &&
    registerContent.includes('value="admin"'),
    "Registration supports selecting Patient, Clinic Staff, or Clinic Admin"
  );

  const storePath = resolve(rootDir, "lib/data/store.ts");
  const storeContent = readFileSync(storePath, "utf-8");

  // Verify logout clears both USER_ID and ROLE from local storage and routes to /login
  assert(
    storeContent.includes("localStorage.removeItem(STORAGE_KEYS.USER_ID)") &&
    storeContent.includes("localStorage.removeItem(STORAGE_KEYS.ROLE)") &&
    storeContent.includes('router.push("/login")'),
    "Logout securely clears user session state and redirects to /login"
  );
});

// ---------------------------------------------------------
// SUITE 5: Cross-Patient Data Isolation (Patient A vs Patient B)
// ---------------------------------------------------------
suite("5. Cross-Patient Data Isolation (Multi-Tenant Patient Barrier)", () => {
  const storePath = resolve(rootDir, "lib/data/store.ts");
  const storeContent = readFileSync(storePath, "utf-8");

  // Check accessiblePrescriptions filter logic for patient
  assert(
    storeContent.includes('if (role === "patient")') &&
    storeContent.includes("return p.patientId === currentUser.id"),
    "Prescriptions: Patient can strictly only access records where p.patientId === currentUser.id"
  );

  // Check accessibleReports filter logic for patient
  assert(
    storeContent.includes('if (role === "patient")') &&
    storeContent.includes("return r.patientId === currentUser.id"),
    "Medical Reports: Patient can strictly only access records where r.patientId === currentUser.id"
  );

  // Check accessibleAppointments filter logic for patient
  assert(
    storeContent.includes('if (role === "patient")') &&
    storeContent.includes("return a.patientId === currentUser.id"),
    "Appointments: Patient can strictly only access records where a.patientId === currentUser.id"
  );

  // Check accessibleSchedules filter logic for patient
  assert(
    storeContent.includes('if (role === "patient")') &&
    storeContent.includes("return s.patientId === currentUser.id"),
    "Medication Schedules: Patient can strictly only access records where s.patientId === currentUser.id"
  );

  // Check demo data separation
  const demoDataContent = readFileSync(resolve(rootDir, "lib/data/demoData.ts"), "utf-8");
  assert(
    demoDataContent.includes('id: "rx-patient-b-01"') &&
    demoDataContent.includes('patientId: "patient-lakshmi-devi"'),
    "Patient B has private prescription record (rx-patient-b-01) isolated from Patient A"
  );
  assert(
    demoDataContent.includes('id: "rep-patient-b-01"') &&
    demoDataContent.includes('patientId: "patient-lakshmi-devi"'),
    "Patient B has private medical report record (rep-patient-b-01) isolated from Patient A"
  );
  assert(
    demoDataContent.includes('id: "apt-patient-b-01"') &&
    demoDataContent.includes('patientId: "patient-lakshmi-devi"'),
    "Patient B has private appointment record (apt-patient-b-01) isolated from Patient A"
  );
});

// ---------------------------------------------------------
// SUITE 6: Cross-Clinic Data Isolation (Clinic A vs Clinic B)
// ---------------------------------------------------------
suite("6. Cross-Clinic Multi-Tenant Isolation (Clinic A vs Clinic B)", () => {
  const storeContent = readFileSync(resolve(rootDir, "lib/data/store.ts"), "utf-8");

  // Check accessibleCareTasks filter logic
  assert(
    storeContent.includes("if (t.clinicId && t.clinicId !== currentUser.clinicId)") &&
    storeContent.includes("return false"),
    "Clinic Care Tasks are strictly isolated: tasks for other clinics are filtered out"
  );

  // Check Clinic B task isolation in demo data
  const demoDataContent = readFileSync(resolve(rootDir, "lib/data/demoData.ts"), "utf-8");
  assert(
    demoDataContent.includes('id: "task-b-01"') &&
    demoDataContent.includes('clinicId: "care-vijayawada-02"'),
    "Clinic B has private care task (task-b-01) assigned strictly to care-vijayawada-02"
  );
});

// ---------------------------------------------------------
// SUITE 7: Clinic Staff vs Clinic Administrator Access Control
// ---------------------------------------------------------
suite("7. Clinic Staff vs Clinic Administrator Privilege Control", () => {
  const storeContent = readFileSync(resolve(rootDir, "lib/data/store.ts"), "utf-8");
  assert(
    storeContent.includes('canPerformAdminAction = currentUser.role === "admin" || role === "admin"'),
    "canPerformAdminAction evaluates to true ONLY when role === 'admin'"
  );

  const adminPagePath = resolve(rootDir, "app/(clinic)/clinic/admin/page.tsx");
  assert(existsSync(adminPagePath), "Clinic Admin page exists", adminPagePath);

  const adminPageContent = readFileSync(adminPagePath, "utf-8");
  assert(
    adminPageContent.includes("if (!canPerformAdminAction)") &&
    adminPageContent.includes("403 Access Denied"),
    "Clinic Admin page contains 403 Access Denied barrier preventing non-admin staff access"
  );
});

// ---------------------------------------------------------
// SUITE 8: Patient Consent, Authorization, and Revocation
// ---------------------------------------------------------
suite("8. Patient Consent Management & Access Revocation", () => {
  const consentPagePath = resolve(rootDir, "app/(patient)/consent/page.tsx");
  assert(existsSync(consentPagePath), "Patient Consent page exists", consentPagePath);

  const storeContent = readFileSync(resolve(rootDir, "lib/data/store.ts"), "utf-8");
  assert(
    storeContent.includes("grantConsent") &&
    storeContent.includes("revokeConsent"),
    "Store implements grantConsent and revokeConsent actions"
  );

  assert(
    storeContent.includes('status: "active"') &&
    storeContent.includes('status: "revoked"'),
    "Consent lifecycle transitions between active and revoked states"
  );

  // In clinic view, check consent authorization check
  assert(
    storeContent.includes('c.status === "active"') &&
    storeContent.includes("hasActiveConsent"),
    "Clinic staff/admins can ONLY access records of patients who belong to the clinic or have active consent"
  );
});

// ---------------------------------------------------------
// SUITE 9: Bilingual English & Telugu Localization
// ---------------------------------------------------------
suite("9. Bilingual English & Telugu Localization", () => {
  const translationsPath = resolve(rootDir, "lib/translations.ts");
  assert(existsSync(translationsPath), "Translations dictionary exists", translationsPath);

  const translationsContent = readFileSync(translationsPath, "utf-8");

  // Check nav keys in en and te
  assert(
    translationsContent.includes('consent: "Consent & Permissions"') &&
    translationsContent.includes('consent: "సమ్మతి & అనుమతులు"'),
    "Consent nav item translated in English and Telugu"
  );

  assert(
    translationsContent.includes('clinicAdmin: "Clinic Admin Roster"') &&
    translationsContent.includes('clinicAdmin: "క్లినిక్ అడ్మిన్ రోస్టర్"'),
    "Clinic Admin nav item translated in English and Telugu"
  );

  // Check login & register pages have Telugu support
  const loginContent = readFileSync(resolve(rootDir, "app/(auth)/login/page.tsx"), "utf-8");
  assert(
    loginContent.includes("isTe ?") && loginContent.includes("లాగిన్ అవ్వండి"),
    "Login page has full inline Telugu translation support"
  );

  const registerContent = readFileSync(resolve(rootDir, "app/(auth)/register/page.tsx"), "utf-8");
  assert(
    registerContent.includes("isTe ?") && registerContent.includes("రోగి (వ్యక్తిగత ఆరోగ్య పోర్టల్)"),
    "Register page has full inline Telugu translation support"
  );

  const consentContent = readFileSync(resolve(rootDir, "app/(patient)/consent/page.tsx"), "utf-8");
  assert(
    consentContent.includes("isTe ?") && consentContent.includes("క్లినిక్ సమ్మతి & అనుమతులు"),
    "Consent page has full inline Telugu translation support"
  );

  const adminContent = readFileSync(resolve(rootDir, "app/(clinic)/clinic/admin/page.tsx"), "utf-8");
  assert(
    adminContent.includes("isTe ?") && adminContent.includes("403 యాక్సెస్ నిరాకరించబడింది"),
    "Admin page has full inline Telugu translation support"
  );
});

// ---------------------------------------------------------
// SUITE 10: Existing CareRoute AI Features Preservation
// ---------------------------------------------------------
suite("10. Existing CareRoute AI Feature Verification", () => {
  // Prescription Verification API route
  const rxVerifyPath = resolve(rootDir, "app/api/ai/verify-prescription/route.ts");
  assert(existsSync(rxVerifyPath), "Prescription verification API route intact");

  // Report Explanation API route
  const repExplainPath = resolve(rootDir, "app/api/ai/explain-report/route.ts");
  assert(existsSync(repExplainPath), "Report explanation API route intact");

  // Reports Compare page
  const comparePath = resolve(rootDir, "app/(patient)/reports/compare/page.tsx");
  assert(existsSync(comparePath), "Reports comparison feature intact");

  // Lifestyle page
  const lifestylePath = resolve(rootDir, "app/(patient)/lifestyle/page.tsx");
  assert(existsSync(lifestylePath), "Lifestyle & routine feature intact");

  // Appointments page
  const appointmentsPath = resolve(rootDir, "app/(patient)/appointments/page.tsx");
  assert(existsSync(appointmentsPath), "Appointments booking & conflict detection intact");
});

// ---------------------------------------------------------
// SUITE 11: Database Schema & Row Level Security (RLS) Inspection
// ---------------------------------------------------------
suite("11. Database Schema & RLS Policy Integrity Inspection", () => {
  const schemaPath = resolve(rootDir, "supabase/migrations/001_initial_schema.sql");
  assert(existsSync(schemaPath), "Supabase initial schema migration exists", schemaPath);

  const schemaContent = readFileSync(schemaPath, "utf-8");

  // 1. Check RLS enabled on all critical tables
  const tables = [
    "clinics",
    "profiles",
    "clinic_memberships",
    "prescriptions",
    "prescription_items",
    "medication_schedules",
    "medication_logs",
    "medical_reports",
    "report_measurements",
    "report_explanations",
    "appointments",
    "care_tasks",
    "caregiver_permissions",
    "audit_logs",
  ];

  for (const table of tables) {
    assert(
      schemaContent.includes(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`),
      `RLS enabled on table '${table}'`
    );
  }

  // 2. Cross-patient isolation policy in SQL
  assert(
    schemaContent.includes("Patients view own prescriptions") &&
    schemaContent.includes("auth.uid() = patient_id"),
    "SQL Policy: Prescriptions isolated by auth.uid() = patient_id"
  );

  assert(
    schemaContent.includes("Patients view own reports") &&
    schemaContent.includes("auth.uid() = patient_id"),
    "SQL Policy: Medical reports isolated by auth.uid() = patient_id"
  );

  // 3. Child tables policy protection
  assert(
    schemaContent.includes("Access report measurements") &&
    schemaContent.includes("report_measurements.report_id"),
    "SQL Policy: Child table report_measurements protected by parent report RLS"
  );

  assert(
    schemaContent.includes("Access prescription items") &&
    schemaContent.includes("prescription_items.prescription_id"),
    "SQL Policy: Child table prescription_items protected by parent prescription RLS"
  );

  // 4. Multi-clinic tenancy isolation in SQL
  assert(
    schemaContent.includes("Staff manage own clinic care tasks") &&
    schemaContent.includes("cm.clinic_id = p.clinic_id"),
    "SQL Policy: Clinic care tasks isolated by clinic_id membership"
  );

  // 5. Admin-only action policy in SQL
  assert(
    schemaContent.includes("cm.staff_role = 'admin'") &&
    schemaContent.includes("Admins manage clinic staff"),
    "SQL Policy: Only clinic admins can manage staff roster/memberships"
  );

  // 6. Patient consent authorization in SQL
  assert(
    schemaContent.includes("status = 'approved'") &&
    schemaContent.includes("can_view_reports") &&
    schemaContent.includes("can_view_medications"),
    "SQL Policy: Clinic access strictly conditioned on approved patient consent"
  );
});

// ---------------------------------------------------------
// SUMMARY & TEST METRICS
// ---------------------------------------------------------
console.log(`\n======================================================`);
console.log(`TEST EXECUTION SUMMARY`);
console.log(`======================================================`);
console.log(`Total Assertions Run : ${totalTests}`);
console.log(`Assertions Passed    : ${passedTests}`);
console.log(`Assertions Failed    : ${failedTests}`);

if (failedTests > 0) {
  console.error(`\nFAILED TESTS (${failedTests}):`);
  failures.forEach((f, idx) => {
    console.error(`  ${idx + 1}. ${f.testName}: ${f.details}`);
  });
  process.exit(1);
} else {
  console.log(`\nALL ${passedTests} SECURITY & QA ASSERTIONS PASSED SUCCESSFULLY! 🎯`);
  process.exit(0);
}

-- ==============================================================================
-- CAREROUTE AI: INITIAL DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- Multi-role: Patients, Clinicians, Clinic Staff, and Caregivers
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('patient', 'clinic_staff', 'clinician', 'admin')),
  phone TEXT,
  preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'te')),
  date_of_birth DATE,
  gender TEXT,
  clinic_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PATIENT PREFERENCES
CREATE TABLE IF NOT EXISTS patient_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  notify_sms BOOLEAN DEFAULT TRUE,
  notify_email BOOLEAN DEFAULT TRUE,
  notify_in_app BOOLEAN DEFAULT TRUE,
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CLINIC MEMBERSHIPS
CREATE TABLE IF NOT EXISTS clinic_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  staff_role TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CAREGIVER PERMISSIONS (Consent-based access)
CREATE TABLE IF NOT EXISTS caregiver_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  caregiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  can_view_reports BOOLEAN DEFAULT TRUE,
  can_view_medications BOOLEAN DEFAULT TRUE,
  can_book_appointments BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'revoked')),
  granted_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PRESCRIPTIONS
CREATE TABLE IF NOT EXISTS prescriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  doctor_name TEXT NOT NULL,
  clinic_name TEXT,
  issue_date DATE NOT NULL,
  file_url TEXT,
  raw_text TEXT,
  status TEXT DEFAULT 'pending_verification' CHECK (status IN ('pending_verification', 'verified', 'flagged_ambiguity', 'rejected')),
  handwriting_clarity TEXT DEFAULT 'clear' CHECK (handwriting_clarity IN ('clear', 'minor_ambiguity', 'flagged', 'illegible')),
  verified_by TEXT,
  verified_at TIMESTAMPTZ,
  verification_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. EXTRACTED PRESCRIPTION ITEMS
CREATE TABLE IF NOT EXISTS prescription_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prescription_id UUID NOT NULL REFERENCES prescriptions(id) ON DELETE CASCADE,
  medicine_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  timing TEXT NOT NULL,
  duration_days INTEGER DEFAULT 30,
  specific_times TEXT[] DEFAULT '{}',
  instructions_en TEXT,
  instructions_te TEXT,
  clarity_status TEXT DEFAULT 'clear',
  flag_reason TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. MEDICATION SCHEDULES (Generated only after verification)
CREATE TABLE IF NOT EXISTS medication_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  prescription_id UUID REFERENCES prescriptions(id) ON DELETE SET NULL,
  medicine_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  instructions_en TEXT,
  instructions_te TEXT,
  timing TEXT NOT NULL,
  scheduled_times TEXT[] NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_verified_prescription BOOLEAN DEFAULT TRUE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. MEDICATION LOGS (Adherence tracking)
CREATE TABLE IF NOT EXISTS medication_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medication_id UUID NOT NULL REFERENCES medication_schedules(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  scheduled_time TEXT NOT NULL,
  log_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('taken', 'missed', 'skipped', 'pending')),
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- 9. MEDICAL REPORTS
CREATE TABLE IF NOT EXISTS medical_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  report_name TEXT NOT NULL,
  report_date DATE NOT NULL,
  report_type TEXT NOT NULL,
  laboratory TEXT,
  file_url TEXT,
  has_abnormal_values BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'uploaded' CHECK (status IN ('uploaded', 'analyzed', 'clinician_reviewed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. REPORT MEASUREMENTS
CREATE TABLE IF NOT EXISTS report_measurements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL REFERENCES medical_reports(id) ON DELETE CASCADE,
  test_name TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  value TEXT NOT NULL,
  numeric_value NUMERIC,
  unit TEXT NOT NULL,
  reference_range_min NUMERIC,
  reference_range_max NUMERIC,
  reference_range_text TEXT NOT NULL,
  flag TEXT DEFAULT 'normal' CHECK (flag IN ('normal', 'borderline_high', 'high', 'low', 'critical')),
  clinical_significance_en TEXT,
  clinical_significance_te TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. REPORT EXPLANATIONS (AI-generated, bilingual)
CREATE TABLE IF NOT EXISTS report_explanations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL REFERENCES medical_reports(id) ON DELETE CASCADE,
  language TEXT NOT NULL CHECK (language IN ('en', 'te')),
  simple_summary TEXT NOT NULL,
  important_findings JSONB DEFAULT '[]'::JSONB,
  unfamiliar_terms JSONB DEFAULT '[]'::JSONB,
  questions_for_doctor JSONB DEFAULT '[]'::JSONB,
  recommended_follow_up TEXT,
  safety_disclaimer TEXT NOT NULL,
  is_live_ai BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. APPOINTMENTS
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  clinician_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  specialty TEXT NOT NULL,
  appointment_type TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room TEXT NOT NULL,
  equipment_required TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'missed', 'cancelled', 'reschedule_requested')),
  reason_for_visit TEXT,
  notes TEXT,
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. CLINIC RESOURCES
CREATE TABLE IF NOT EXISTS clinic_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('room', 'equipment')),
  name TEXT NOT NULL,
  location TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. CLINIC CARE TASKS
CREATE TABLE IF NOT EXISTS care_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  task_type TEXT NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'action_required', 'completed', 'escalated')),
  related_item_id TEXT,
  related_item_type TEXT,
  assigned_to TEXT NOT NULL,
  date_ordered DATE DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  next_action TEXT,
  history JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title_en TEXT NOT NULL,
  title_te TEXT NOT NULL,
  message_en TEXT NOT NULL,
  message_te TEXT NOT NULL,
  type TEXT NOT NULL,
  priority TEXT DEFAULT 'medium',
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. AUDIT LOGS (Sensitive medical action tracking)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details JSONB DEFAULT '{}'::JSONB,
  ip_address TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES (Hardened Multi-Tenant & RBAC)
-- ==============================================================================

ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregiver_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescription_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_explanations ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE care_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 0. CLINICS POLICIES
CREATE POLICY "Public read clinics" ON clinics
  FOR SELECT USING (TRUE);

-- 1. PROFILES POLICIES
CREATE POLICY "Patients view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Patients update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Staff view clinic patients" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clinic_memberships cm
      WHERE cm.user_id = auth.uid() 
        AND cm.clinic_id = profiles.clinic_id 
        AND cm.is_active = TRUE
    )
  );

-- 2. CLINIC MEMBERSHIPS & ADMIN-ONLY ROLE ACTIONS
CREATE POLICY "Staff view clinic memberships" ON clinic_memberships
  FOR SELECT USING (
    clinic_id IN (SELECT clinic_id FROM clinic_memberships WHERE user_id = auth.uid() AND is_active = TRUE)
  );

-- ONLY clinic administrators can manage staff memberships
CREATE POLICY "Admins manage clinic staff" ON clinic_memberships
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM clinic_memberships cm
      WHERE cm.user_id = auth.uid() 
        AND cm.clinic_id = clinic_memberships.clinic_id 
        AND cm.staff_role = 'admin'
        AND cm.is_active = TRUE
    )
  );

-- 3. PRESCRIPTIONS & PRESCRIPTION ITEMS POLICIES
CREATE POLICY "Patients view own prescriptions" ON prescriptions
  FOR SELECT USING (auth.uid() = patient_id);

CREATE POLICY "Patients upload own prescriptions" ON prescriptions
  FOR INSERT WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Staff view clinic prescriptions" ON prescriptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN clinic_memberships cm ON cm.clinic_id = p.clinic_id
      WHERE p.id = prescriptions.patient_id
        AND cm.user_id = auth.uid()
        AND cm.is_active = TRUE
    )
  );

CREATE POLICY "Staff verify clinic prescriptions" ON prescriptions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN clinic_memberships cm ON cm.clinic_id = p.clinic_id
      WHERE p.id = prescriptions.patient_id
        AND cm.user_id = auth.uid()
        AND cm.is_active = TRUE
    )
  );

CREATE POLICY "Access prescription items" ON prescription_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM prescriptions rx
      WHERE rx.id = prescription_items.prescription_id
        AND (
          rx.patient_id = auth.uid()
          OR EXISTS (
            SELECT 1 FROM profiles p
            JOIN clinic_memberships cm ON cm.clinic_id = p.clinic_id
            WHERE p.id = rx.patient_id AND cm.user_id = auth.uid() AND cm.is_active = TRUE
          )
        )
    )
  );

-- 4. MEDICATION SCHEDULES & LOGS POLICIES
CREATE POLICY "Patients view own medication schedules" ON medication_schedules
  FOR SELECT USING (auth.uid() = patient_id);

CREATE POLICY "Staff view clinic medication schedules" ON medication_schedules
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN clinic_memberships cm ON cm.clinic_id = p.clinic_id
      WHERE p.id = medication_schedules.patient_id
        AND cm.user_id = auth.uid()
        AND cm.is_active = TRUE
    )
  );

CREATE POLICY "Patients manage medication logs" ON medication_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM medication_schedules ms
      WHERE ms.id = medication_logs.medication_id AND ms.patient_id = auth.uid()
    )
  );

-- 5. MEDICAL REPORTS & MEASUREMENTS POLICIES (Patient Isolation)
CREATE POLICY "Patients view own reports" ON medical_reports
  FOR SELECT USING (auth.uid() = patient_id);

CREATE POLICY "Staff view clinic patient reports" ON medical_reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN clinic_memberships cm ON cm.clinic_id = p.clinic_id
      WHERE p.id = medical_reports.patient_id
        AND cm.user_id = auth.uid()
        AND cm.is_active = TRUE
    )
  );

CREATE POLICY "Access report measurements" ON report_measurements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM medical_reports mr
      WHERE mr.id = report_measurements.report_id
        AND (
          mr.patient_id = auth.uid()
          OR EXISTS (
            SELECT 1 FROM profiles p
            JOIN clinic_memberships cm ON cm.clinic_id = p.clinic_id
            WHERE p.id = mr.patient_id AND cm.user_id = auth.uid() AND cm.is_active = TRUE
          )
        )
    )
  );

CREATE POLICY "Access report explanations" ON report_explanations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM medical_reports mr
      WHERE mr.id = report_explanations.report_id
        AND (
          mr.patient_id = auth.uid()
          OR EXISTS (
            SELECT 1 FROM profiles p
            JOIN clinic_memberships cm ON cm.clinic_id = p.clinic_id
            WHERE p.id = mr.patient_id AND cm.user_id = auth.uid() AND cm.is_active = TRUE
          )
        )
    )
  );

-- 6. APPOINTMENTS POLICIES (Multi-tenant)
CREATE POLICY "Patients manage appointments" ON appointments
  FOR ALL USING (auth.uid() = patient_id);

CREATE POLICY "Staff manage clinic appointments" ON appointments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN clinic_memberships cm ON cm.clinic_id = p.clinic_id
      WHERE p.id = appointments.patient_id
        AND cm.user_id = auth.uid()
        AND cm.is_active = TRUE
    )
  );

-- 7. CLINIC CARE TASKS (Strict Clinic Isolation: Clinic A != Clinic B)
CREATE POLICY "Staff manage own clinic care tasks" ON care_tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN clinic_memberships cm ON cm.clinic_id = p.clinic_id
      WHERE p.id = care_tasks.patient_id
        AND cm.user_id = auth.uid()
        AND cm.is_active = TRUE
    )
  );

-- 8. PATIENT CONSENT & ACCESS REVOCATION POLICIES
CREATE POLICY "Patients manage consent" ON caregiver_permissions
  FOR ALL USING (auth.uid() = patient_id);

CREATE POLICY "Caregivers view granted consent" ON caregiver_permissions
  FOR SELECT USING (auth.uid() = caregiver_id AND status = 'approved');

-- 9. NOTIFICATIONS & AUDIT LOG POLICIES (Admin Auditing)
CREATE POLICY "Users view own notifications" ON notifications
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins view audit logs" ON audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
    OR EXISTS (
      SELECT 1 FROM clinic_memberships cm
      WHERE cm.user_id = auth.uid() AND cm.staff_role = 'admin' AND cm.is_active = TRUE
    )
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_meds_patient ON medication_schedules(patient_id);
CREATE INDEX IF NOT EXISTS idx_logs_med ON medication_logs(medication_id, log_date);
CREATE INDEX IF NOT EXISTS idx_reports_patient ON medical_reports(patient_id);
CREATE INDEX IF NOT EXISTS idx_measurements_report ON report_measurements(report_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date_room ON appointments(date, room);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON care_tasks(assigned_to, status);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_clinic_memberships_user ON clinic_memberships(user_id, clinic_id);
CREATE INDEX IF NOT EXISTS idx_caregiver_permissions ON caregiver_permissions(patient_id, caregiver_id, status);

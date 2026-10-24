"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Shield,
  ShieldAlert,
  Users,
  Building2,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Globe,
} from "lucide-react";

export default function ClinicAdminPage() {
  const {
    canPerformAdminAction,
    currentUser,
    allProfiles,
    clinics,
    lang,
    setLanguage,
  } = useCareRoute();

  const isTe = lang === "te";

  // Filter staff by current clinic
  const clinicStaffMembers = allProfiles.filter(
    (p) => p.clinicId === currentUser.clinicId && p.role !== "patient"
  );

  const activeClinic = clinics.find((c) => c.id === currentUser.clinicId) || clinics[0];

  // Mock security audit log records
  const [auditLogs] = useState([
    {
      id: "audit-01",
      actor: "Priya Sharma, RN",
      action: "Prescription Verification",
      resource: "Rx #rx-001 (Venkata Rao)",
      timestamp: "2026-10-24 10:15 AM",
      status: "authorized",
    },
    {
      id: "audit-02",
      actor: "Dr. Suresh Reddy (Admin)",
      action: "Role Permission Modification",
      resource: "Staff Roster Audit",
      timestamp: "2026-10-24 09:30 AM",
      status: "authorized",
    },
    {
      id: "audit-03",
      actor: "Dr. K. Ramanathan, MD (Clinic B)",
      action: "Cross-Tenant Access Attempt",
      resource: "Patient Venkata Rao Records",
      timestamp: "2026-10-24 08:45 AM",
      status: "blocked_policy",
    },
  ]);

  // Requirement 7: Non-admin clinic staff cannot perform administrator actions
  if (!canPerformAdminAction) {
    return (
      <AppShell>
        <div className="p-8 rounded-3xl bg-[#121C30] border border-rose-500/30 text-center max-w-xl mx-auto my-12 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black text-[#F4F7FC]">
            {isTe ? "403 యాక్సెస్ నిరాకరించబడింది" : "403 Access Denied: Administrator Privileges Required"}
          </h1>
          <p className="text-xs text-[#9AA9BE] leading-relaxed">
            {isTe
              ? `ప్రస్తుత వినియోగదారు (${currentUser.fullName} - ${currentUser.role}) అడ్మినిస్ట్రేటర్ అనుమతులను కలిగి లేరు. ఈ విభాగం కేవలం క్లినిక్ అడ్మినిస్ట్రేటర్‌లకు మాత్రమే అందుబాటులో ఉంటుంది.`
              : `Current user (${currentUser.fullName} - ${currentUser.role}) does not have administrative privileges. Only Clinic Administrators can manage staff rosters and tenant security configurations.`}
          </p>
          <div className="pt-2">
            <Link
              href="/clinic/dashboard"
              className="px-4 py-2 rounded-xl bg-[#18253A] hover:bg-[#1E2B45] text-[#16D6C1] border border-[#16D6C1]/30 text-xs font-bold inline-block"
            >
              {isTe ? "క్లినిక్ డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి" : "Return to Clinic Dashboard"}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6 pb-12">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2B45]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>
                {isTe
                  ? "మాడ్యూల్ 7 — క్లినిక్ అడ్మినిస్ట్రేషన్ & భద్రతా నియంత్రణలు"
                  : "Module 7 — Clinic Administration & Security Roster"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FC] mt-1.5">
              {isTe ? "క్లినిక్ అడ్మినిస్ట్రేటర్ కంట్రోల్ సెంటర్" : "Clinic Administrator Control Center"}
            </h1>
            <p className="text-xs sm:text-sm text-[#9AA9BE] max-w-2xl mt-0.5 leading-relaxed">
              {isTe
                ? `సిబ్బంది యాక్సెస్ రోస్టర్, మల్టీ-టెనెంట్ విభజన మరియు ఆడిట్ లాగ్స్ నిర్వహణ. లాగిన్ అయిన అడ్మిన్: ${currentUser.fullName}`
                : `Manage staff access, multi-tenant clinic partition, and security audit logs. Logged in Admin: ${currentUser.fullName}`}
            </p>
          </div>

          <button
            onClick={() => setLanguage(isTe ? "en" : "te")}
            className="px-3.5 py-2.5 rounded-2xl bg-[#121C30] hover:bg-[#18253A] text-[#F4F7FC] border border-[#1E2B45] text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Globe className="w-4 h-4 text-[#16D6C1]" />
            <span>{isTe ? "English" : "తెలుగు"}</span>
          </button>
        </div>

        {/* Tenant Details Card */}
        <div className="p-6 rounded-3xl bg-[#121C30] border border-purple-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-purple-400" />
              <h2 className="text-base font-bold text-[#F4F7FC]">
                {isTe ? "క్లినిక్ టెనెంట్ సమాచారం" : "Clinic Tenant Isolation Scope"}
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {isTe ? "టెనెంట్ RLS యాక్టివ్" : "TENANT RLS ENFORCED"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45]">
              <span className="text-[#9AA9BE] text-[10px] uppercase font-bold">
                {isTe ? "క్లినిక్ పేరు:" : "Clinic Organization:"}
              </span>
              <div className="font-bold text-[#F4F7FC] text-sm mt-0.5">
                {activeClinic?.name}
              </div>
              <div className="text-[#9AA9BE] text-[11px]">{activeClinic?.branch}, {activeClinic?.city}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45]">
              <span className="text-[#9AA9BE] text-[10px] uppercase font-bold">
                {isTe ? "టెనెంట్ ID:" : "Clinic Tenant ID:"}
              </span>
              <div className="font-mono font-bold text-[#16D6C1] text-xs mt-0.5">
                {activeClinic?.id}
              </div>
              <div className="text-[11px] text-[#9AA9BE]">{isTe ? "విభజించబడిన డేటాబేస్ స్కోప్" : "Isolated PostgreSQL Scope"}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45]">
              <span className="text-[#9AA9BE] text-[10px] uppercase font-bold">
                {isTe ? "మీ అధికార పరిధి:" : "Your Authority:"}
              </span>
              <div className="font-bold text-purple-300 text-xs mt-0.5">
                Clinic Administrator
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold">{isTe ? "పూర్తి యాక్సెస్ మంజూరు" : "Full Access Granted"}</div>
            </div>
          </div>
        </div>

        {/* Staff Roster */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F4F7FC] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#16D6C1]" />
              <span>{isTe ? `సిబ్బంది రోస్టర్ (${clinicStaffMembers.length})` : `Clinic Staff Roster (${clinicStaffMembers.length})`}</span>
            </h2>
            <span className="text-xs text-[#9AA9BE]">
              {isTe ? "క్లినిక్ అడ్మినిస్ట్రేటర్ మాత్రమే నియంత్రించగలరు" : "Administrator-only management"}
            </span>
          </div>

          <div className="divide-y divide-[#1E2B45] rounded-3xl bg-[#121C30] border border-[#1E2B45] overflow-hidden">
            {clinicStaffMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#18253A] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#080D1B] border border-[#1E2B45] flex items-center justify-center font-bold text-xs text-[#16D6C1]">
                    {member.fullName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-[#F4F7FC] text-sm flex items-center gap-2">
                      <span>{member.fullName}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#18253A] text-purple-300 border border-purple-500/30 uppercase">
                        {member.role}
                      </span>
                    </div>
                    <div className="text-xs text-[#9AA9BE]">{member.email} • {member.phone}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ACTIVE
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Audit Log */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F4F7FC] flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>{isTe ? "భద్రతా ఆడిట్ లాగ్స్ (RLS ధృవీకరణ)" : "Security Audit Logs (RLS Enforcement)"}</span>
            </h2>
            <span className="text-[11px] text-[#9AA9BE]">
              {isTe ? "అనధికార యాక్సెస్ ప్రయత్నాలు నమోదు చేయబడతాయి" : "Cross-clinic access attempts are audited"}
            </span>
          </div>

          <div className="divide-y divide-[#1E2B45] rounded-3xl bg-[#121C30] border border-[#1E2B45] overflow-hidden">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-[#18253A] transition-colors"
              >
                <div>
                  <div className="font-bold text-[#F4F7FC] flex items-center gap-2">
                    <span>{log.action}</span>
                    <span className="text-[#9AA9BE] font-normal">• {log.resource}</span>
                  </div>
                  <div className="text-[11px] text-[#9AA9BE] mt-0.5">
                    {isTe ? "నిర్వహించిన వ్యక్తి: " : "Actor: "}
                    <strong className="text-[#F4F7FC]">{log.actor}</strong> • {log.timestamp}
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  {log.status === "authorized" ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>AUTHORIZED</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      <span>BLOCKED (RLS POLICY)</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

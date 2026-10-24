"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  XCircle,
  Globe,
  Plus,
} from "lucide-react";

export default function PatientConsentPage() {
  const {
    consents,
    grantConsent,
    revokeConsent,
    clinics,
    currentUser,
    lang,
    setLanguage,
    formatLocalDate,
    t,
  } = useCareRoute();

  const [selectedClinicId, setSelectedClinicId] = useState(clinics[0]?.id || "");
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isTe = lang === "te";

  const handleGrant = (clinicId: string) => {
    grantConsent(clinicId);
    setShowGrantModal(false);
    setSuccessMessage(
      isTe
        ? "క్లినిక్ యాక్సెస్ అనుమతి విజయవంతంగా మంజూరు చేయబడింది."
        : "Clinic access authorization granted successfully."
    );
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleRevoke = (clinicId: string, clinicName: string) => {
    if (
      confirm(
        isTe
          ? `${clinicName} కోసం మీ మెడికల్ రికార్డుల యాక్సెస్‌ను రద్దు చేయాలనుకుంటున్నారా? సిబ్బంది ఇకపై మీ నివేదికలు చూడలేరు.`
          : `Revoke all medical record access for ${clinicName}? Clinic staff will immediately lose access to your reports and prescriptions.`
      )
    ) {
      revokeConsent(clinicId);
      setSuccessMessage(
        isTe
          ? `${clinicName} యాక్సెస్ రద్దు చేయబడింది.`
          : `Access revoked for ${clinicName}.`
      );
      setTimeout(() => setSuccessMessage(null), 4000);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-12">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2B45]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16D6C1]/10 text-[#16D6C1] border border-[#16D6C1]/30 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>
                {isTe
                  ? "రోగి డేటా గోప్యత & క్లినిక్ అనుమతుల నియంత్రణ"
                  : "Patient Privacy & Clinic Access Authorization"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FC] mt-1.5">
              {isTe ? "క్లినిక్ సమ్మతి & అనుమతులు" : "Clinic Access & Consent Controls"}
            </h1>
            <p className="text-xs sm:text-sm text-[#9AA9BE] max-w-2xl mt-0.5 leading-relaxed">
              {isTe
                ? `మీ రికార్డులను ఏయే ఆసుపత్రులు మరియు వైద్యులు చూడవచ్చో మీరే నియంత్రించండి. లాగిన్ అయిన రోగి: ${currentUser.fullName}`
                : `You have full ownership of your health records. Authorize or revoke clinic access at any time. Active Patient: ${currentUser.fullName}`}
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={() => setShowGrantModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] hover:opacity-90 text-[#080D1B] font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#16D6C1]/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{isTe ? "కొత్త క్లినిక్ అనుమతించండి" : "Authorize New Clinic"}</span>
            </button>

            <button
              onClick={() => setLanguage(isTe ? "en" : "te")}
              className="px-3.5 py-2.5 rounded-2xl bg-[#121C30] hover:bg-[#18253A] text-[#F4F7FC] border border-[#1E2B45] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Globe className="w-4 h-4 text-[#16D6C1]" />
              <span>{isTe ? "English" : "తెలుగు"}</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {successMessage && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Active Patient Consents List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F4F7FC]">
              {isTe
                ? `మంజూరు చేయబడిన అనుమతులు (${consents.length})`
                : `Configured Clinic Authorizations (${consents.length})`}
            </h2>
            <span className="text-[11px] text-[#9AA9BE]">
              {isTe
                ? "రద్దు చేయబడిన క్లినిక్‌లకు మీ డేటా బ్లాక్ చేయబడుతుంది"
                : "Revoked clinics are instantly blocked from accessing your records"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {consents.map((consent) => {
              const isActive = consent.status === "active";

              return (
                <div
                  key={consent.id}
                  className={`p-6 rounded-3xl bg-[#121C30] border transition-all space-y-4 ${
                    isActive
                      ? "border-[#16D6C1]/40 shadow-sm"
                      : "border-rose-500/30 bg-rose-950/10 opacity-80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#1E2B45]">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                          isActive
                            ? "bg-[#16D6C1]/20 text-[#16D6C1]"
                            : "bg-rose-500/20 text-rose-400"
                        }`}
                      >
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#F4F7FC] text-sm">
                          {consent.clinicName}
                        </h3>
                        <div className="text-[11px] text-[#9AA9BE] font-mono">
                          ID: {consent.clinicId}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isActive
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      }`}
                    >
                      {isActive ? (isTe ? "యాక్టివ్" : "ACTIVE") : (isTe ? "రద్దు చేయబడింది" : "REVOKED")}
                    </span>
                  </div>

                  {/* Scopes */}
                  <div className="space-y-2 text-xs">
                    <span className="text-[11px] font-bold text-[#9AA9BE] uppercase tracking-wider">
                      {isTe ? "మంజూరు చేయబడిన పరిధులు:" : "Authorized Access Scopes:"}
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="flex items-center gap-1.5 text-[#F4F7FC]">
                        {isActive ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16D6C1]" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                        )}
                        <span>{isTe ? "ల్యాబ్ నివేదికలు" : "Lab Reports"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#F4F7FC]">
                        {isActive ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16D6C1]" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                        )}
                        <span>{isTe ? "ప్రిస్క్రిప్షన్లు" : "Prescriptions"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#F4F7FC]">
                        {isActive ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16D6C1]" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                        )}
                        <span>{isTe ? "అపాయింట్‌మెంట్లు" : "Appointments"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#9AA9BE] pt-2 border-t border-[#1E2B45] flex items-center justify-between">
                    <span>
                      {isTe ? "మంజూరు తేదీ: " : "Granted: "}
                      {formatLocalDate(consent.grantedAt)}
                    </span>

                    {isActive ? (
                      <button
                        onClick={() => handleRevoke(consent.clinicId, consent.clinicName)}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-[11px] font-bold transition-all active:scale-95"
                      >
                        {isTe ? "యాక్సెస్ రద్దు చేయండి" : "Revoke Access"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleGrant(consent.clinicId)}
                        className="px-3 py-1.5 rounded-xl bg-[#16D6C1]/15 hover:bg-[#16D6C1]/25 text-[#16D6C1] border border-[#16D6C1]/30 text-[11px] font-bold transition-all active:scale-95"
                      >
                        {isTe ? "తిరిగి అనుమతించండి" : "Re-authorize"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal: Authorize Clinic */}
        {showGrantModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1B]/80 backdrop-blur-sm">
            <div className="w-full max-w-md p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2B45]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#16D6C1]" />
                  <h3 className="font-bold text-[#F4F7FC] text-base">
                    {isTe ? "క్లినిక్‌కు అనుమతి మంజూరు చేయండి" : "Authorize Clinic Access"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowGrantModal(false)}
                  className="p-1 rounded-lg text-[#9AA9BE] hover:text-[#F4F7FC]"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <label className="font-semibold text-[#9AA9BE]">
                  {isTe ? "క్లినిక్‌ను ఎంచుకోండి:" : "Select Clinic / Hospital Network:"}
                </label>
                <select
                  value={selectedClinicId}
                  onChange={(e) => setSelectedClinicId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                >
                  {clinics.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.branch}, {c.city}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-[11px] text-[#9AA9BE] leading-relaxed">
                {isTe
                  ? "ఈ అనుమతి ద్వారా ఎంచుకున్న క్లినిక్ వైద్యులు మరియు సిబ్బంది మీ ప్రిస్క్రిప్షన్లను ధృవీకరించగలరు మరియు ల్యాబ్ నివేదికలను పరిశీలించగలరు."
                  : "By authorizing access, medical clinicians and care coordinators from this clinic can review your reports and verify prescriptions."}
              </p>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#1E2B45]">
                <button
                  onClick={() => setShowGrantModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#9AA9BE] hover:text-[#F4F7FC]"
                >
                  {t.common.cancel}
                </button>
                <button
                  onClick={() => handleGrant(selectedClinicId)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] hover:opacity-90 text-[#080D1B] font-bold text-xs shadow-md shadow-[#16D6C1]/20 active:scale-95 transition-all"
                >
                  {isTe ? "ధృవీకరించండి & మంజూరు చేయండి" : "Confirm Authorization"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

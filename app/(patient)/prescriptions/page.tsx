"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Clock,
  Sparkles,
  UserCheck,
  X,
  FileCheck,
} from "lucide-react";
import { Prescription, ExtractedPrescriptionItem } from "@/types";

export default function PrescriptionsPage() {
  const {
    prescriptions,
    addPrescription,
    verifyPrescription,
    role,
    lang,
    formatLocalDate,
    t,
  } = useCareRoute();

  const [selectedRx, setSelectedRx] = useState<Prescription | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifierNotes, setVerifierNotes] = useState("");
  const [verifierName, setVerifierName] = useState(
    role === "clinic_staff"
      ? (lang === "te" ? "ప్రియా శర్మ, RN" : "Priya Sharma, RN")
      : (lang === "te" ? "డాక్టర్ అనితా శర్మ, MD" : "Dr. Anita Sharma, MD")
  );
  const [itemsToVerify, setItemsToVerify] = useState<ExtractedPrescriptionItem[]>([]);

  // New Prescription Upload / Manual Entry state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [manualDoctor, setManualDoctor] = useState("Dr. Anita Sharma, MD");
  const [manualText, setManualText] = useState(
    "Rx: Metformin 500mg BD after meals; Telmisartan 40mg OD morning."
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleOpenVerifyModal = (rx: Prescription) => {
    setSelectedRx(rx);
    setItemsToVerify([...rx.extractedItems]);
    setVerifierNotes(rx.verificationNotes || "");
    setIsVerifying(true);
  };

  const handleConfirmVerification = () => {
    if (!selectedRx) return;
    verifyPrescription(selectedRx.id, verifierName, verifierNotes, itemsToVerify);
    setIsVerifying(false);
    setSelectedRx(null);
  };

  const handleSimulateUpload = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/ai/verify-prescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawText: manualText,
          language: lang,
        }),
      });
      const data = await res.json();
      const extractedMedicines: ExtractedPrescriptionItem[] = data.data.medicines.map(
        (m: Record<string, unknown>, idx: number) => ({
          id: `item-${Date.now()}-${idx}`,
          medicineName: m.medicineName,
          dosage: m.dosage,
          frequency: m.frequency,
          timing: m.timing,
          durationDays: m.durationDays || 30,
          specificTimes: m.specificTimes || ["09:00"],
          instructionsEn: m.instructionsEn,
          instructionsTe: m.instructionsTe,
          clarityStatus: m.clarityStatus,
          flagReason: m.flagReason,
          isVerified: false,
        })
      );

      const newRx: Prescription = {
        id: `rx-${Date.now()}`,
        patientId: "patient-venkata-rao",
        patientName: "Venkata Rao",
        doctorName: manualDoctor,
        clinicName: "Apollo Health City",
        issueDate: new Date().toISOString().split("T")[0],
        status: data.data.hasAmbiguityAlert ? "flagged_ambiguity" : "pending_verification",
        handwritingClarity: data.data.overallHandwritingClarity,
        extractedItems: extractedMedicines,
        createdAt: new Date().toISOString(),
      };

      addPrescription(newRx);
      setShowUploadModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2B45]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16D6C1]/10 text-[#16D6C1] border border-[#16D6C1]/30 text-xs font-semibold">
              <FileCheck className="w-3.5 h-3.5" />
              <span>{lang === "te" ? "మాడ్యూల్ 1 — క్లినికల్ భద్రతా ధృవీకరణ" : "Module 1 — Clinical Safety Verification"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FC] mt-1.5">
              {t.prescriptions.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#9AA9BE] max-w-2xl mt-0.5 leading-relaxed">
              {t.prescriptions.subtitle}
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] hover:opacity-90 text-[#080D1B] font-bold text-xs flex items-center gap-2 shadow-md shadow-[#16D6C1]/20 transition-all active:scale-95 self-start sm:self-auto"
          >
            <Upload className="w-4 h-4 text-[#080D1B]" />
            <span>{t.prescriptions.uploadTitle}</span>
          </button>
        </div>

        {/* Safety Rule Alert Banner */}
        <div className="p-4 rounded-3xl bg-[#121C30] border border-[#16D6C1]/40 flex items-start space-x-3.5 shadow-md">
          <ShieldAlert className="w-5 h-5 text-[#16D6C1] flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-bold text-[#F4F7FC]">
              {lang === "te" ? "కఠినమైన వైద్య ధృవీకరణ నియమం సక్రియంగా ఉంది" : "Strict Medical Verification Guardrail Active"}
            </span>
            <p className="text-[#9AA9BE] leading-relaxed">
              {t.prescriptions.safetyRule} {t.prescriptions.unverifiedNotice}
            </p>
          </div>
        </div>

        {/* Prescription List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#F4F7FC]">
            {t.prescriptions.recordsTitle} ({prescriptions.length})
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {prescriptions.map((rx) => {
              const isFlagged = rx.status === "flagged_ambiguity";
              const isVerified = rx.status === "verified";

              return (
                <div
                  key={rx.id}
                  className={`p-6 rounded-3xl bg-[#121C30] border transition-all ${
                    isFlagged
                      ? "border-rose-500/50 shadow-rose-950/20"
                      : isVerified
                      ? "border-[#16D6C1]/40"
                      : "border-[#1E2B45]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E2B45]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#F4F7FC] text-base">
                          {rx.doctorName}
                        </span>
                        {isVerified ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#16D6C1]/15 text-[#16D6C1] border border-[#16D6C1]/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#16D6C1]" />
                            {t.prescriptions.verifiedByClinician}
                          </span>
                        ) : isFlagged ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-rose-400" />
                            {lang === "te" ? "చేతిరాత అస్పష్టత గుర్తించబడింది" : "Handwriting Ambiguity Flagged"}
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-400" />
                            {t.common.pendingBadge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#9AA9BE] flex items-center gap-3">
                        <span>{t.common.location}: {rx.clinicName}</span>
                        <span>•</span>
                        <span>{t.common.date}: {formatLocalDate(rx.issueDate)}</span>
                      </div>
                    </div>

                    {/* Action Button: Verify Instructions */}
                    <button
                      onClick={() => handleOpenVerifyModal(rx)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto ${
                        isVerified
                          ? "bg-[#18253A] hover:bg-[#1E2B45] text-[#F4F7FC] border border-[#1E2B45]"
                          : "bg-[#16D6C1] hover:bg-[#14b8a6] text-[#080D1B] shadow-md shadow-[#16D6C1]/20 active:scale-95"
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{isVerified ? t.prescriptions.reviewSignOffBtn : t.prescriptions.authorizeBtn}</span>
                    </button>
                  </div>

                  {/* Flag Reason Alert if present */}
                  {isFlagged && (
                    <div className="mt-3 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 flex items-start space-x-2.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="font-bold">{lang === "te" ? "భద్రతా హెచ్చరిక: " : "Safety Alert: "}</strong>
                        {rx.verificationNotes || t.prescriptions.handwritingAlert}
                      </div>
                    </div>
                  )}

                  {/* Extracted Medicines Table */}
                  <div className="mt-4 space-y-2">
                    <span className="text-xs font-bold text-[#9AA9BE] uppercase tracking-wider">
                      {lang === "te" ? "సేకరించిన మందులు" : "Extracted Medicines"} ({rx.extractedItems.length})
                    </span>
                    <div className="divide-y divide-[#1E2B45] rounded-2xl bg-[#080D1B] border border-[#1E2B45] overflow-hidden">
                      {rx.extractedItems.map((item) => (
                        <div key={item.id} className="p-3.5 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#F4F7FC] text-sm">
                                {item.medicineName}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-[#18253A] text-[#16D6C1] font-mono border border-[#1E2B45]">
                                {item.dosage}
                              </span>
                              <span className="text-[#9AA9BE]">
                                ({item.frequency} • {item.timing.replace("_", " ")})
                              </span>
                            </div>
                            {item.clarityStatus === "flagged" ? (
                              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                                {lang === "te" ? "అస్పష్టమైనది" : "Ambiguous"}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-[#16D6C1]/20 text-[#16D6C1] text-[10px] font-semibold">
                                {lang === "te" ? "స్పష్టమైనది" : "Clear"}
                              </span>
                            )}
                          </div>
                          <p className="text-[#9AA9BE] text-[11px]">
                            <strong className="text-[#F4F7FC]">EN: </strong> {item.instructionsEn}
                          </p>
                          <p className="text-[#16D6C1] text-[11px]">
                            <strong className="text-[#16D6C1]">తెలుగు: </strong> {item.instructionsTe}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verification Sign-Off Footer */}
                  {isVerified && rx.verifiedBy && (
                    <div className="mt-4 pt-3 border-t border-[#1E2B45] flex items-center justify-between text-xs text-[#9AA9BE]">
                      <div className="flex items-center gap-1.5 text-[#16D6C1]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>
                          {lang === "te" ? "ధృవీకరించినవారు: " : "Signed off by: "}
                          {rx.verifiedBy}
                        </span>
                      </div>
                      <span>
                        {lang === "te" ? "తేదీ: " : "Verified: "}
                        {rx.verifiedAt}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Modal Dialog */}
        {isVerifying && selectedRx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1B]/85 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-2xl bg-[#121C30] border border-[#1E2B45] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              <div className="px-6 py-4 bg-[#10182B] border-b border-[#1E2B45] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-5 h-5 text-[#16D6C1]" />
                  <h3 className="text-base font-bold text-[#F4F7FC]">
                    {t.prescriptions.modalTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setIsVerifying(false)}
                  className="p-1 rounded-lg text-[#9AA9BE] hover:text-[#F4F7FC]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="p-3.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45] text-xs text-[#9AA9BE]">
                  <div className="font-semibold text-[#F4F7FC]">
                    {t.common.patient}: {selectedRx.patientName} | {t.common.doctor}: {selectedRx.doctorName}
                  </div>
                  <div className="text-[#9AA9BE] mt-1 leading-relaxed">
                    {t.prescriptions.modalSubtitle}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#F4F7FC]">
                    {lang === "te" ? "మందుల వివరాలను ధృవీకరించండి:" : "Verify & Confirm Extracted Instructions:"}
                  </label>
                  {itemsToVerify.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#F4F7FC] text-xs">
                          {item.medicineName}
                        </span>
                        <input
                          type="text"
                          value={item.dosage}
                          onChange={(e) => {
                            const updated = [...itemsToVerify];
                            updated[index].dosage = e.target.value;
                            updated[index].clarityStatus = "clear";
                            setItemsToVerify(updated);
                          }}
                          className="px-2.5 py-1 rounded-xl bg-[#18253A] border border-[#1E2B45] text-[#16D6C1] text-xs font-mono w-28 text-center"
                          title="Edit dosage if correcting OCR ambiguity"
                        />
                      </div>
                      <p className="text-[11px] text-[#9AA9BE]">{item.instructionsEn}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#F4F7FC]">
                    {t.prescriptions.reviewerName}
                  </label>
                  <input
                    type="text"
                    value={verifierName}
                    onChange={(e) => setVerifierName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#F4F7FC]">
                    {t.prescriptions.reviewerNotes}
                  </label>
                  <textarea
                    rows={2}
                    value={verifierNotes}
                    onChange={(e) => setVerifierNotes(e.target.value)}
                    placeholder={
                      lang === "te"
                        ? "ఉదా: ప్రిస్క్రిప్షన్ స్లిప్‌ను సరిచూశాను. మోతాదు 1mg అని ధృవీకరించబడింది."
                        : "e.g., Confirmed with prescription slip. Glimepiride dosage clarified as 1mg."
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                  />
                </div>
              </div>

              <div className="px-6 py-4 bg-[#10182B] border-t border-[#1E2B45] flex items-center justify-between">
                <button
                  onClick={() => setIsVerifying(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#9AA9BE] hover:text-[#F4F7FC]"
                >
                  {t.common.cancel}
                </button>
                <button
                  onClick={handleConfirmVerification}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] text-[#080D1B] font-bold text-xs shadow-md shadow-[#16D6C1]/20 active:scale-95 transition-all"
                >
                  {t.prescriptions.signOffAction}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Prescription Simulation Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1B]/85 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-lg bg-[#121C30] border border-[#1E2B45] rounded-3xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2B45]">
                <div className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-[#16D6C1]" />
                  <h3 className="text-base font-bold text-[#F4F7FC]">
                    {t.prescriptions.uploadTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1 rounded-lg text-[#9AA9BE] hover:text-[#F4F7FC]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 rounded-2xl border-2 border-dashed border-[#1E2B45] hover:border-[#16D6C1]/50 bg-[#080D1B] text-center space-y-2 cursor-pointer transition-colors">
                <FileText className="w-8 h-8 text-[#16D6C1] mx-auto" />
                <div className="text-xs font-semibold text-[#F4F7FC]">
                  {lang === "te"
                    ? "ప్రిస్క్రిప్షన్ స్లిప్‌ను లాగండి లేదా బ్రౌజ్ చేయడానికి క్లిక్ చేయండి"
                    : "Drag & drop prescription slip or click to browse"}
                </div>
                <div className="text-[10px] text-[#9AA9BE]">
                  {t.prescriptions.uploadDesc}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#F4F7FC]">
                  {t.common.doctor}:
                </label>
                <input
                  type="text"
                  value={manualDoctor}
                  onChange={(e) => setManualDoctor(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#F4F7FC]">
                  {lang === "te" ? "ప్రిస్క్రిప్షన్ నోట్:" : "Prescription Text / Extracted Note:"}
                </label>
                <textarea
                  rows={3}
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs focus:outline-none focus:border-[#16D6C1]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#1E2B45]">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#9AA9BE] hover:text-[#F4F7FC]"
                >
                  {t.common.cancel}
                </button>
                <button
                  onClick={handleSimulateUpload}
                  disabled={isAnalyzing}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] text-[#080D1B] font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#16D6C1]/20 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>{t.prescriptions.extracting}</span>
                    </>
                  ) : (
                    <span>{lang === "te" ? "విశ్లేషించి సేకరించు" : "Analyze & Extract"}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

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
  ChevronRight,
  UserCheck,
  Stethoscope,
  X,
  Plus,
  HelpCircle,
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
    t,
  } = useCareRoute();

  const [selectedRx, setSelectedRx] = useState<Prescription | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifierNotes, setVerifierNotes] = useState("");
  const [verifierName, setVerifierName] = useState(
    role === "clinic_staff" ? "Priya Sharma, RN" : "Dr. Anita Sharma, MD"
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
        (m: any, idx: number) => ({
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
        {/* Module Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-semibold">
              <FileCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Module 1 — Clinical Safety Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {t.prescriptions.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-0.5">
              {t.prescriptions.subtitle}
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-teal-500/20 transition-all active:scale-95 self-start sm:self-auto"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Prescription Slip</span>
          </button>
        </div>

        {/* Safety Rule Alert Banner */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-teal-500/30 flex items-start space-x-3 shadow-md">
          <ShieldAlert className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-bold text-white">
              Strict Medical Verification Guardrail Active
            </span>
            <p className="text-slate-300 leading-relaxed">
              {t.prescriptions.safetyRule} {t.prescriptions.unverifiedNotice}
            </p>
          </div>
        </div>

        {/* Prescription List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white">
            {lang === "te" ? "రికార్డుల్లో ఉన్న ప్రిస్క్రిప్షన్లు" : "Uploaded Prescription Records"} ({prescriptions.length})
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {prescriptions.map((rx) => {
              const isFlagged = rx.status === "flagged_ambiguity";
              const isVerified = rx.status === "verified";

              return (
                <div
                  key={rx.id}
                  className={`p-6 rounded-3xl bg-slate-900/90 border transition-all ${
                    isFlagged
                      ? "border-rose-500/50 shadow-rose-950/20"
                      : isVerified
                      ? "border-teal-500/40"
                      : "border-slate-800"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">
                          {rx.doctorName}
                        </span>
                        {isVerified ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-teal-400" />
                            Verified by Clinician
                          </span>
                        ) : isFlagged ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-rose-400" />
                            Handwriting Ambiguity Flagged
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-400" />
                            Pending Review
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-3">
                        <span>Clinic: {rx.clinicName}</span>
                        <span>•</span>
                        <span>Date: {rx.issueDate}</span>
                      </div>
                    </div>

                    {/* Action Button: Verify Instructions */}
                    <button
                      onClick={() => handleOpenVerifyModal(rx)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto ${
                        isVerified
                          ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                          : "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/20 active:scale-95"
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{isVerified ? "Review Sign-Off" : "Authorize / Verify Instructions"}</span>
                    </button>
                  </div>

                  {/* Flag Reason Alert if present */}
                  {isFlagged && (
                    <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Safety Alert: </strong>
                        {rx.verificationNotes || t.prescriptions.handwritingAlert}
                      </div>
                    </div>
                  )}

                  {/* Extracted Medicines Table */}
                  <div className="mt-4 space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Extracted Medicines ({rx.extractedItems.length})
                    </span>
                    <div className="divide-y divide-slate-800/80 rounded-2xl bg-slate-950/60 border border-slate-800 overflow-hidden">
                      {rx.extractedItems.map((item) => (
                        <div key={item.id} className="p-3.5 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">
                                {item.medicineName}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 font-mono">
                                {item.dosage}
                              </span>
                              <span className="text-slate-400">
                                ({item.frequency} • {item.timing.replace("_", " ")})
                              </span>
                            </div>
                            {item.clarityStatus === "flagged" ? (
                              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                                Ambiguous
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-semibold">
                                Clear
                              </span>
                            )}
                          </div>
                          <p className="text-slate-300 text-[11px]">
                            <strong className="text-slate-400">EN: </strong> {item.instructionsEn}
                          </p>
                          <p className="text-teal-200 text-[11px]">
                            <strong className="text-teal-400">తెలుగు: </strong> {item.instructionsTe}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verification Sign-Off Footer */}
                  {isVerified && rx.verifiedBy && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 text-teal-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Signed off by: {rx.verifiedBy}</span>
                      </div>
                      <span>Verified: {rx.verifiedAt}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Modal Dialog (Human-in-the-loop review) */}
        {isVerifying && selectedRx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-5 h-5 text-teal-400" />
                  <h3 className="text-base font-bold text-white">
                    Clinical Verification Sign-Off
                  </h3>
                </div>
                <button
                  onClick={() => setIsVerifying(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <div className="font-semibold text-white">
                    Patient: {selectedRx.patientName} | Doctor: {selectedRx.doctorName}
                  </div>
                  <div className="text-slate-400 mt-0.5">
                    CareRoute AI requires authorized personnel to confirm extracted dosages before activating medication reminders.
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-300">
                    Verify & Confirm Extracted Instructions:
                  </label>
                  {itemsToVerify.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">
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
                          className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-teal-300 text-xs font-mono w-28 text-center"
                          title="Edit dosage if correcting OCR ambiguity"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">{item.instructionsEn}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Reviewer Name & Professional Role:
                  </label>
                  <input
                    type="text"
                    value={verifierName}
                    onChange={(e) => setVerifierName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Clinical Verification Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={verifierNotes}
                    onChange={(e) => setVerifierNotes(e.target.value)}
                    placeholder="e.g., Confirmed with prescription slip. Glimepiride dosage clarified as 1mg."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setIsVerifying(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmVerification}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 active:scale-95 transition-all"
                >
                  Sign-Off & Activate Reminders
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Prescription Upload Simulation Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-teal-400" />
                  <h3 className="text-base font-bold text-white">
                    {t.prescriptions.uploadTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-700 hover:border-teal-500/50 bg-slate-950/40 text-center space-y-2 cursor-pointer transition-colors">
                <FileText className="w-8 h-8 text-teal-400 mx-auto" />
                <div className="text-xs font-semibold text-slate-200">
                  Drag & drop prescription slip or click to browse
                </div>
                <div className="text-[10px] text-slate-500">
                  {t.prescriptions.uploadDesc}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Physician Name:
                </label>
                <input
                  type="text"
                  value={manualDoctor}
                  onChange={(e) => setManualDoctor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Prescription Text / Extracted Note:
                </label>
                <textarea
                  rows={3}
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSimulateUpload}
                  disabled={isAnalyzing}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-teal-500/20 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>{t.prescriptions.extracting}</span>
                    </>
                  ) : (
                    <span>Analyze & Extract</span>
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

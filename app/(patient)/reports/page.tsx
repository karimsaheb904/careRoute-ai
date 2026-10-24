"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Activity,
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Globe,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  Layers,
  FileCheck2,
} from "lucide-react";
import { MedicalReport, ReportExplanation } from "@/types";

export default function ReportsPage() {
  const {
    reports,
    explanations,
    saveReportExplanation,
    lang,
    setLanguage,
    t,
  } = useCareRoute();

  const [selectedReportId, setSelectedReportId] = useState<string>(reports[0]?.id || "");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const selectedReport = reports.find((r) => r.id === selectedReportId) || reports[0];
  const activeExplanation = explanations[selectedReport?.id]?.[lang] || explanations[selectedReport?.id]?.en;

  const handleGenerateLiveAi = async () => {
    if (!selectedReport) return;
    setIsGeneratingAi(true);

    try {
      const res = await fetch("/api/ai/explain-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportName: selectedReport.reportName,
          reportType: selectedReport.reportType,
          reportDate: selectedReport.reportDate,
          language: lang,
          measurements: selectedReport.measurements.map((m) => ({
            testName: m.testName,
            value: m.value,
            unit: m.unit,
            referenceRangeText: m.referenceRangeText,
            flag: m.flag,
          })),
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        const newExplanation: ReportExplanation = {
          reportId: selectedReport.id,
          language: lang,
          simpleSummary: json.data.simpleSummary,
          importantFindings: json.data.importantFindings,
          unfamiliarTerms: json.data.unfamiliarTerms,
          questionsForDoctor: json.data.questionsForDoctor,
          recommendedFollowUp: json.data.recommendedFollowUp,
          safetyDisclaimer: json.data.safetyDisclaimer,
          isLiveAi: json.data.isLiveAi,
          generatedAt: new Date().toISOString(),
        };

        saveReportExplanation(selectedReport.id, lang, newExplanation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-semibold">
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              <span>Module 3 — AI Medical Report Explanation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {t.reports.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-0.5">
              {t.reports.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <Link
              href="/reports/compare"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <FileCheck2 className="w-4 h-4 text-teal-400" />
              <span>Compare Reports</span>
            </Link>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(lang === "en" ? "te" : "en")}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Globe className="w-4 h-4 text-teal-400" />
              <span>{lang === "en" ? "తెలుగు వివరణ" : "English Explanation"}</span>
            </button>
          </div>
        </div>

        {/* Report Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {reports.map((rep) => (
            <button
              key={rep.id}
              onClick={() => setSelectedReportId(rep.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedReportId === rep.id
                  ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md shadow-teal-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{rep.reportName}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-950/40 font-mono">
                {rep.reportDate}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Report Details Card */}
        {selectedReport && (
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-white">
                  {selectedReport.reportName}
                </h2>
                <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                  <span>Lab: {selectedReport.laboratory}</span>
                  <span>•</span>
                  <span>Date: {selectedReport.reportDate}</span>
                  <span>•</span>
                  <span>Type: {selectedReport.reportType}</span>
                </div>
              </div>

              {/* Live Gemini Generate / Re-generate Button */}
              <button
                onClick={handleGenerateLiveAi}
                disabled={isGeneratingAi}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 text-xs font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>
                  {isGeneratingAi
                    ? "Generating AI Explanation..."
                    : "Generate Live Gemini Explanation"}
                </span>
              </button>
            </div>

            {/* Section 3 & 4: Measurement Details & Laboratory Reference Ranges Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Laboratory Measurement Values & Reference Ranges
              </span>

              <div className="divide-y divide-slate-800 rounded-2xl bg-slate-950/60 border border-slate-800 overflow-hidden">
                <div className="p-3 bg-slate-950 grid grid-cols-12 text-[11px] font-bold text-slate-400 uppercase">
                  <div className="col-span-4 sm:col-span-3">Biomarker / Test</div>
                  <div className="col-span-3 sm:col-span-2 text-right">Patient Value</div>
                  <div className="col-span-3 sm:col-span-4 text-center">Reference Range</div>
                  <div className="col-span-2 sm:col-span-3 text-right">Status Flag</div>
                </div>

                {selectedReport.measurements.map((m) => {
                  const isAbnormal = m.flag && m.flag !== "normal";

                  return (
                    <div
                      key={m.id}
                      className="p-3 grid grid-cols-12 text-xs items-center hover:bg-slate-900/50 transition-colors"
                    >
                      <div className="col-span-4 sm:col-span-3 font-semibold text-white">
                        {m.testName}
                        <div className="text-[10px] text-slate-500 font-normal">{m.category}</div>
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-right font-mono font-bold text-slate-200">
                        {m.value} <span className="text-[10px] text-slate-400 font-normal">{m.unit}</span>
                      </div>
                      <div className="col-span-3 sm:col-span-4 text-center text-[11px] text-slate-400">
                        {m.referenceRangeText}
                      </div>
                      <div className="col-span-2 sm:col-span-3 text-right">
                        {isAbnormal ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                            {m.flag?.replace("_", " ").toUpperCase()}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                            NORMAL
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Explanation 7 Sections */}
            {activeExplanation && (
              <div className="space-y-6 pt-4 border-t border-slate-800">
                {/* AI Header & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-teal-400" />
                    <h3 className="text-base font-bold text-white">
                      {lang === "te"
                        ? "తెలుగు AI నివేదిక వివరణ & అవగాహన"
                        : "AI Clinical Report Explanation"}
                    </h3>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      activeExplanation.isLiveAi
                        ? "bg-teal-500/15 text-teal-300 border-teal-500/30"
                        : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                    }`}
                  >
                    {activeExplanation.isLiveAi ? t.common.liveAiBadge : t.common.sampleAiBadge}
                  </span>
                </div>

                {/* Section 1: Simple Summary */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                    1. {lang === "te" ? "సులభ సారాంశం" : "Simple Summary"}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeExplanation.simpleSummary}
                  </p>
                </div>

                {/* Section 2: Important Findings */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                    2. {lang === "te" ? "ముఖ్యమైన పరిశీలనలు" : "Important Findings"}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {activeExplanation.importantFindings.map((finding, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 5: Unfamiliar Medical Terminology Explained */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                    5. {lang === "te" ? "వైద్య పదాల సులభ వివరణ" : "Medical Terminology Explained"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeExplanation.unfamiliarTerms.map((tItem, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1"
                      >
                        <strong className="text-teal-300">{tItem.term}</strong>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {tItem.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 6: Questions Patients Can Discuss with Their Doctor */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                    6. {lang === "te" ? "వైద్యుడిని అడగవలసిన ప్రశ్నలు" : "Questions to Discuss with Your Doctor"}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {activeExplanation.questionsForDoctor.map((q, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <HelpCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 7: Recommended Professional Follow-Up & Safety Disclaimer */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/20 space-y-2">
                  <div className="flex items-start space-x-2.5 text-xs text-slate-300">
                    <ShieldAlert className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">
                        7. {lang === "te" ? "వైద్యుల తదుపరి సంప్రదింపు సూచన" : "Recommended Professional Follow-Up"}:
                      </strong>
                      <p className="mt-0.5 text-slate-300">
                        {activeExplanation.recommendedFollowUp}
                      </p>
                      <p className="mt-2 text-[11px] text-slate-500 italic">
                        {activeExplanation.safetyDisclaimer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}

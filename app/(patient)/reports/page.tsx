"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Activity,
  FileText,
  CheckCircle2,
  Sparkles,
  Globe,
  HelpCircle,
  ShieldAlert,
  FileCheck2,
} from "lucide-react";
import { ReportExplanation } from "@/types";

export default function ReportsPage() {
  const {
    reports,
    explanations,
    saveReportExplanation,
    lang,
    setLanguage,
    formatLocalDate,
    t,
  } = useCareRoute();

  const [selectedReportId, setSelectedReportId] = useState<string>(reports[0]?.id || "");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const selectedReport = reports.find((r) => r.id === selectedReportId) || reports[0];
  const activeExplanation =
    explanations[selectedReport?.id]?.[lang] || explanations[selectedReport?.id]?.en;

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2B45]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16D6C1]/10 text-[#16D6C1] border border-[#16D6C1]/30 text-xs font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>{lang === "te" ? "మాడ్యూల్ 3 — AI మెడికల్ రిపోర్ట్ వివరణ" : "Module 3 — AI Medical Report Explanation"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FC] mt-1.5">
              {t.reports.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#9AA9BE] max-w-2xl mt-0.5 leading-relaxed">
              {t.reports.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <Link
              href="/reports/compare"
              className="px-3.5 py-2 rounded-xl bg-[#121C30] hover:bg-[#18253A] text-[#16D6C1] border border-[#1E2B45] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <FileCheck2 className="w-4 h-4 text-[#16D6C1]" />
              <span>{t.reports.compareWithPrevious}</span>
            </Link>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(lang === "en" ? "te" : "en")}
              className="px-3.5 py-2 rounded-xl bg-[#121C30] hover:bg-[#18253A] text-[#F4F7FC] border border-[#1E2B45] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Globe className="w-4 h-4 text-[#16D6C1]" />
              <span>{lang === "en" ? "తెలుగు వివరణ" : "English Explanation"}</span>
            </button>
          </div>
        </div>

        {/* Report Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2.5">
          {reports.map((rep) => (
            <button
              key={rep.id}
              onClick={() => setSelectedReportId(rep.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedReportId === rep.id
                  ? "bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] text-[#080D1B] shadow-md shadow-[#16D6C1]/20 font-black"
                  : "bg-[#121C30] text-[#9AA9BE] hover:text-[#F4F7FC] border border-[#1E2B45] hover:bg-[#18253A]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{rep.reportName}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#080D1B]/40 font-mono">
                {formatLocalDate(rep.reportDate)}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Report Details Card */}
        {selectedReport && (
          <div className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2B45]">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-[#F4F7FC]">
                  {selectedReport.reportName}
                </h2>
                <div className="text-xs text-[#9AA9BE] flex flex-wrap items-center gap-3">
                  <span>{lang === "te" ? "ల్యాబ్: " : "Lab: "}{selectedReport.laboratory}</span>
                  <span>•</span>
                  <span>{t.common.date}: {formatLocalDate(selectedReport.reportDate)}</span>
                  <span>•</span>
                  <span>{selectedReport.reportType}</span>
                </div>
              </div>

              {/* Live Gemini Generate / Re-generate Button */}
              <button
                onClick={handleGenerateLiveAi}
                disabled={isGeneratingAi}
                className="px-4 py-2 rounded-xl bg-[#18253A] hover:bg-[#1E2B45] text-[#16D6C1] border border-[#16D6C1]/30 text-xs font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-[#16D6C1]" />
                <span>
                  {isGeneratingAi ? t.reports.generatingAi : t.reports.generateLiveGemini}
                </span>
              </button>
            </div>

            {/* Measurement Details Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#9AA9BE] uppercase tracking-wider">
                {lang === "te" ? "ల్యాబ్ కొలతలు & ప్రామాణిక శ్రేణులు" : "Laboratory Measurement Values & Reference Ranges"}
              </span>

              <div className="divide-y divide-[#1E2B45] rounded-2xl bg-[#080D1B] border border-[#1E2B45] overflow-hidden">
                <div className="p-3.5 bg-[#10182B] grid grid-cols-12 text-[11px] font-bold text-[#9AA9BE] uppercase">
                  <div className="col-span-4 sm:col-span-3">{t.reports.tableBiomarker}</div>
                  <div className="col-span-3 sm:col-span-2 text-right">{t.reports.tablePatientValue}</div>
                  <div className="col-span-3 sm:col-span-4 text-center">{t.reports.tableRefRange}</div>
                  <div className="col-span-2 sm:col-span-3 text-right">{t.reports.tableStatus}</div>
                </div>

                {selectedReport.measurements.map((m) => {
                  const isAbnormal = m.flag && m.flag !== "normal";

                  return (
                    <div
                      key={m.id}
                      className="p-3.5 grid grid-cols-12 text-xs items-center hover:bg-[#121C30] transition-colors"
                    >
                      <div className="col-span-4 sm:col-span-3 font-semibold text-[#F4F7FC]">
                        {m.testName}
                        <div className="text-[10px] text-[#9AA9BE] font-normal">{m.category}</div>
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-right font-mono font-bold text-[#F4F7FC]">
                        {m.value} <span className="text-[10px] text-[#9AA9BE] font-normal">{m.unit}</span>
                      </div>
                      <div className="col-span-3 sm:col-span-4 text-center text-[11px] text-[#9AA9BE]">
                        {m.referenceRangeText}
                      </div>
                      <div className="col-span-2 sm:col-span-3 text-right">
                        {isAbnormal ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                            {lang === "te" ? "పరిధి దాటింది" : m.flag?.replace("_", " ").toUpperCase()}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#16D6C1]/15 text-[#16D6C1] border border-[#16D6C1]/30">
                            {lang === "te" ? "సాధారణం" : "NORMAL"}
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
              <div className="space-y-5 pt-4 border-t border-[#1E2B45]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-[#16D6C1]" />
                    <h3 className="text-base font-bold text-[#F4F7FC]">
                      {lang === "te"
                        ? "తెలుగు AI నివేదిక సమగ్ర వివరణ & అవగాహన"
                        : "AI Clinical Report Explanation"}
                    </h3>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      activeExplanation.isLiveAi
                        ? "bg-[#16D6C1]/15 text-[#16D6C1] border-[#16D6C1]/30"
                        : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                    }`}
                  >
                    {activeExplanation.isLiveAi ? t.common.liveAiBadge : t.common.sampleAiBadge}
                  </span>
                </div>

                {/* Section 1: Simple Summary */}
                <div className="p-4 rounded-2xl bg-[#080D1B] border border-[#1E2B45] space-y-1.5">
                  <span className="text-xs font-bold text-[#16D6C1] uppercase tracking-wider">
                    {t.reports.section1Summary}
                  </span>
                  <p className="text-xs sm:text-sm text-[#F4F7FC] leading-relaxed">
                    {activeExplanation.simpleSummary}
                  </p>
                </div>

                {/* Section 2: Important Findings */}
                <div className="p-4 rounded-2xl bg-[#080D1B] border border-[#1E2B45] space-y-2">
                  <span className="text-xs font-bold text-[#16D6C1] uppercase tracking-wider">
                    {t.reports.section2Findings}
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#F4F7FC]">
                    {activeExplanation.importantFindings.map((finding, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16D6C1] flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 5: Unfamiliar Medical Terminology */}
                <div className="p-4 rounded-2xl bg-[#080D1B] border border-[#1E2B45] space-y-2">
                  <span className="text-xs font-bold text-[#16D6C1] uppercase tracking-wider">
                    {t.reports.section5Terms}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeExplanation.unfamiliarTerms.map((tItem, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#121C30] border border-[#1E2B45] text-xs space-y-1"
                      >
                        <strong className="text-[#16D6C1] font-bold">{tItem.term}</strong>
                        <p className="text-[#9AA9BE] text-[11px] leading-relaxed mt-0.5">
                          {tItem.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 6: Questions for Doctor */}
                <div className="p-4 rounded-2xl bg-[#080D1B] border border-[#1E2B45] space-y-2">
                  <span className="text-xs font-bold text-[#16D6C1] uppercase tracking-wider">
                    {t.reports.section6Questions}
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#F4F7FC]">
                    {activeExplanation.questionsForDoctor.map((q, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <HelpCircle className="w-3.5 h-3.5 text-[#35BDF5] flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 7: Recommended Follow-Up & Disclaimer */}
                <div className="p-4 rounded-2xl bg-[#080D1B] border border-[#16D6C1]/30 space-y-2">
                  <div className="flex items-start space-x-2.5 text-xs text-[#F4F7FC]">
                    <ShieldAlert className="w-4 h-4 text-[#16D6C1] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#F4F7FC] font-bold">
                        {t.reports.section7FollowUp}:
                      </strong>
                      <p className="mt-0.5 text-[#9AA9BE] leading-relaxed">
                        {activeExplanation.recommendedFollowUp}
                      </p>
                      <p className="mt-2 text-[11px] text-[#9AA9BE] italic">
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Compass,
  ArrowLeft,
  TrendingDown,
  TrendingUp,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ReportComparisonPage() {
  const { reports, lang, formatLocalDate, t } = useCareRoute();

  const [baselineReportId, setBaselineReportId] = useState(reports[1]?.id || reports[0]?.id);
  const [currentReportId, setCurrentReportId] = useState(reports[0]?.id);

  const baselineReport = reports.find((r) => r.id === baselineReportId) || reports[1] || reports[0];
  const currentReport = reports.find((r) => r.id === currentReportId) || reports[0];

  // Match compatible measurements between the two selected reports
  const matchedMeasurements = currentReport.measurements.map((curr) => {
    const base = baselineReport.measurements.find((b) => b.testName === curr.testName);
    const hasCompatibleMatch = !!base && base.unit === curr.unit;

    let delta = 0;
    let percentage = 0;
    let isImproved = false;

    if (hasCompatibleMatch && curr.numericValue !== undefined && base.numericValue !== undefined) {
      delta = curr.numericValue - base.numericValue;
      percentage = Math.round((delta / base.numericValue) * 100 * 10) / 10;

      // In diabetes/lipids: decrease in HbA1c, glucose, LDL, total cholesterol is an improvement
      if (
        curr.testName.includes("Glucose") ||
        curr.testName.includes("HbA1c") ||
        curr.testName.includes("Cholesterol") ||
        curr.testName.includes("LDL")
      ) {
        isImproved = delta < 0;
      } else {
        isImproved = delta >= 0;
      }
    }

    return {
      testName: curr.testName,
      unit: curr.unit,
      baselineValue: base ? base.value : "N/A",
      currentValue: curr.value,
      hasCompatibleMatch,
      delta,
      percentage,
      isImproved,
      referenceRangeText: curr.referenceRangeText,
      currFlag: curr.flag,
    };
  });

  // Recharts comparison data
  const chartData = matchedMeasurements
    .filter((m) => m.hasCompatibleMatch && m.delta !== 0)
    .map((m) => ({
      name: m.testName.replace(" (HbA1c)", "").replace(" (Direct)", ""),
      Baseline: parseFloat(m.baselineValue),
      Current: parseFloat(m.currentValue),
      unit: m.unit,
    }));

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2B45]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16D6C1]/10 text-[#16D6C1] border border-[#16D6C1]/30 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>{lang === "te" ? "మాడ్యూల్ 4 — నివేదికల పోలిక & విశ్లేషణ" : "Module 4 — Longitudinal Report Comparison"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FC] mt-1.5">
              {t.compare.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#9AA9BE] max-w-2xl mt-0.5 leading-relaxed">
              {t.compare.subtitle}
            </p>
          </div>

          <Link
            href="/reports"
            className="px-3.5 py-2 rounded-xl bg-[#121C30] hover:bg-[#18253A] text-[#9AA9BE] hover:text-[#F4F7FC] border border-[#1E2B45] text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.common.back}</span>
          </Link>
        </div>

        {/* Report Selectors */}
        <div className="p-5 rounded-3xl bg-[#121C30] border border-[#1E2B45] grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#F4F7FC] uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#35BDF5]" />
              <span>{t.compare.selectBaseline}</span>
            </label>
            <select
              value={baselineReportId}
              onChange={(e) => setBaselineReportId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs font-medium focus:outline-none focus:border-[#16D6C1]"
            >
              {reports.map((r) => (
                <option key={r.id} value={r.id}>
                  {formatLocalDate(r.reportDate)} — {r.reportName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#F4F7FC] uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#16D6C1]" />
              <span>{t.compare.selectCurrent}</span>
            </label>
            <select
              value={currentReportId}
              onChange={(e) => setCurrentReportId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45] text-[#F4F7FC] text-xs font-medium focus:outline-none focus:border-[#16D6C1]"
            >
              {reports.map((r) => (
                <option key={r.id} value={r.id}>
                  {formatLocalDate(r.reportDate)} — {r.reportName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recharts Visual Comparison Bar Chart */}
        <div className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E2B45]">
            <div>
              <h3 className="text-sm font-bold text-[#F4F7FC]">
                {t.compare.chartTitle} ({formatLocalDate(baselineReport.reportDate)} vs {formatLocalDate(currentReport.reportDate)})
              </h3>
              <p className="text-[11px] text-[#9AA9BE] mt-0.5">
                {t.compare.chartSubtitle}
              </p>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#16D6C1]/10 text-[#16D6C1] border border-[#16D6C1]/30 font-semibold">
              {t.compare.compatibleBadge}
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2B45" />
                <XAxis dataKey="name" stroke="#9AA9BE" fontSize={11} />
                <YAxis stroke="#9AA9BE" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#121C30",
                    borderColor: "#1E2B45",
                    borderRadius: "16px",
                    color: "#F4F7FC",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#F4F7FC" }} />
                <Bar
                  dataKey="Baseline"
                  fill="#35BDF5"
                  name={`${lang === "te" ? "ప్రారంభం" : "Baseline"} (${formatLocalDate(baselineReport.reportDate)})`}
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="Current"
                  fill="#16D6C1"
                  name={`${lang === "te" ? "ప్రస్తుతం" : "Current"} (${formatLocalDate(currentReport.reportDate)})`}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Measurement-by-Measurement Delta Table */}
        <div className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E2B45]">
            <h3 className="text-sm font-bold text-[#F4F7FC]">
              {t.compare.tableTitle}
            </h3>
            <span className="text-xs text-[#9AA9BE] font-mono">
              {matchedMeasurements.length} {lang === "te" ? "బయోమార్కర్లు" : "Biomarkers"}
            </span>
          </div>

          <div className="divide-y divide-[#1E2B45] rounded-2xl bg-[#080D1B] border border-[#1E2B45] overflow-hidden">
            <div className="p-3.5 bg-[#10182B] grid grid-cols-12 text-[11px] font-bold text-[#9AA9BE] uppercase">
              <div className="col-span-4 sm:col-span-3">{t.reports.tableBiomarker}</div>
              <div className="col-span-2 text-right">{lang === "te" ? "ప్రారంభ విలువ" : "Baseline"}</div>
              <div className="col-span-2 text-right">{lang === "te" ? "ప్రస్తుత విలువ" : "Current"}</div>
              <div className="col-span-2 text-center">{t.compare.deltaChange}</div>
              <div className="col-span-2 sm:col-span-3 text-right">{lang === "te" ? "ట్రెండ్" : "Trend"}</div>
            </div>

            {matchedMeasurements.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 grid grid-cols-12 text-xs items-center hover:bg-[#121C30] transition-colors"
              >
                <div className="col-span-4 sm:col-span-3 font-semibold text-[#F4F7FC]">
                  {m.testName}
                  <div className="text-[10px] text-[#9AA9BE] font-normal">{m.referenceRangeText}</div>
                </div>

                <div className="col-span-2 text-right font-mono text-[#9AA9BE]">
                  {m.baselineValue} <span className="text-[10px] text-[#9AA9BE]">{m.unit}</span>
                </div>

                <div className="col-span-2 text-right font-mono font-bold text-[#F4F7FC]">
                  {m.currentValue} <span className="text-[10px] text-[#9AA9BE]">{m.unit}</span>
                </div>

                <div className="col-span-2 text-center font-mono font-bold">
                  {m.hasCompatibleMatch && m.delta !== 0 ? (
                    <span
                      className={`inline-flex items-center gap-0.5 text-xs ${
                        m.isImproved ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {m.delta > 0 ? "+" : ""}
                      {m.delta} ({m.percentage}%)
                    </span>
                  ) : (
                    <span className="text-[#9AA9BE] text-xs">—</span>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-3 text-right">
                  {m.isImproved ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
                      <TrendingDown className="w-3 h-3 text-emerald-400" />
                      {t.compare.trendImproved}
                    </span>
                  ) : m.delta === 0 ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#18253A] text-[#9AA9BE] border border-[#1E2B45]">
                      {t.compare.trendStable}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 inline-flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-rose-400" />
                      {t.compare.trendElevated}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Safety Guardrail Note */}
          <div className="p-3.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45] flex items-start space-x-2.5 text-xs text-[#9AA9BE]">
            <ShieldCheck className="w-4 h-4 text-[#16D6C1] flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              {t.compare.disclaimer}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

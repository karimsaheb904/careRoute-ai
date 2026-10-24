"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Compass,
  ArrowLeft,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Minus,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  FileCheck2,
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
  const { reports, lang, t } = useCareRoute();

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-teal-400" />
              <span>Module 4 — Longitudinal Report Comparison</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {lang === "te" ? "మునుపటి మరియు ప్రస్తుత నివేదికల పోలిక" : "Previous Medical Report Comparison"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-0.5">
              Compare diagnostic biomarker progression over time. Validates compatible measurement units and highlights clinical deltas.
            </p>
          </div>

          <Link
            href="/reports"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Reports</span>
          </Link>
        </div>

        {/* Report Selectors */}
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Select Baseline Report (Earlier Date)</span>
            </label>
            <select
              value={baselineReportId}
              onChange={(e) => setBaselineReportId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-teal-500"
            >
              {reports.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.reportDate} — {r.reportName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-400" />
              <span>Select Current Report (Recent Date)</span>
            </label>
            <select
              value={currentReportId}
              onChange={(e) => setCurrentReportId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-teal-500"
            >
              {reports.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.reportDate} — {r.reportName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recharts Visual Comparison Bar Chart */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">
                Biomarker Comparison Chart ({baselineReport.reportDate} vs {currentReport.reportDate})
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Side-by-side values for compatible biomarkers with matching clinical units.
              </p>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold">
              Compatible Units Verified
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="Baseline" fill="#0284c7" name={`Baseline (${baselineReport.reportDate})`} radius={[6, 6, 0, 0]} />
                <Bar dataKey="Current" fill="#0d9488" name={`Current (${currentReport.reportDate})`} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side-by-Side Detailed Measurement Comparison Table */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">
              Measurement-by-Measurement Delta Analysis
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {matchedMeasurements.length} Biomarkers Analyzed
            </span>
          </div>

          <div className="divide-y divide-slate-800 rounded-2xl bg-slate-950/60 border border-slate-800 overflow-hidden">
            <div className="p-3 bg-slate-950 grid grid-cols-12 text-[11px] font-bold text-slate-400 uppercase">
              <div className="col-span-4 sm:col-span-3">Biomarker</div>
              <div className="col-span-2 text-right">Baseline ({baselineReport.reportDate.slice(5)})</div>
              <div className="col-span-2 text-right">Current ({currentReport.reportDate.slice(5)})</div>
              <div className="col-span-2 text-center">Change (Δ)</div>
              <div className="col-span-2 sm:col-span-3 text-right">Clinical Trend</div>
            </div>

            {matchedMeasurements.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 grid grid-cols-12 text-xs items-center hover:bg-slate-900/50 transition-colors"
              >
                <div className="col-span-4 sm:col-span-3 font-semibold text-white">
                  {m.testName}
                  <div className="text-[10px] text-slate-500 font-normal">{m.referenceRangeText}</div>
                </div>

                <div className="col-span-2 text-right font-mono text-slate-300">
                  {m.baselineValue} <span className="text-[10px] text-slate-500">{m.unit}</span>
                </div>

                <div className="col-span-2 text-right font-mono font-bold text-white">
                  {m.currentValue} <span className="text-[10px] text-slate-500">{m.unit}</span>
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
                    <span className="text-slate-500 text-xs">—</span>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-3 text-right">
                  {m.isImproved ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
                      <TrendingDown className="w-3 h-3 text-emerald-400" />
                      Improved
                    </span>
                  ) : m.delta === 0 ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                      Stable
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 inline-flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-rose-400" />
                      Elevated
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Safety Guardrail Note */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-2.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300">Clinical Interpretation Disclaimer: </strong>
              Numerical biomarker changes illustrate trends over time and do not replace personalized evaluation by your physician.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

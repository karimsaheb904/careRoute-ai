"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  HeartPulse,
  Droplet,
  Moon,
  Footprints,
  ShieldAlert,
  CheckCircle2,
  Plus,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

export default function LifestylePage() {
  const { lifestyle, toggleHabit, addWater, lang, t } = useCareRoute();

  const waterPercentage = Math.min(
    100,
    Math.round((lifestyle.currentWaterMl / lifestyle.waterIntakeGoalMl) * 100)
  );

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-semibold">
              <HeartPulse className="w-3.5 h-3.5 text-teal-400" />
              <span>Module 8 — Wellness & Clinician Restrictions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {t.lifestyle.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-0.5">
              {t.lifestyle.subtitle}
            </p>
          </div>
        </div>

        {/* Clinician-Provided Restrictions Alert (Strict distinction from general education) */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-rose-500/40 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-rose-400">
            <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {t.lifestyle.clinicianRestrictions} (Dr. Anita Sharma, MD)
            </h2>
          </div>
          <div className="space-y-2">
            {lifestyle.clinicianRestrictions.map((restriction, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-950/70 border border-rose-950/40 text-xs text-rose-200 flex items-start space-x-2.5"
              >
                <span className="w-2 h-2 rounded-full bg-rose-400 flex-shrink-0 mt-1.5" />
                <span className="leading-relaxed">{restriction}</span>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-slate-400 italic">
            Notice: Doctor-directed clinical recovery restrictions take strict precedence over general lifestyle education.
          </div>
        </div>

        {/* 3 Metric Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Hydration Tracker */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Droplet className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">{t.lifestyle.waterIntake}</h3>
              </div>
              <span className="text-xs font-bold text-cyan-300 font-mono">
                {lifestyle.currentWaterMl} / {lifestyle.waterIntakeGoalMl} mL
              </span>
            </div>

            <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-teal-400 to-cyan-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${waterPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{waterPercentage}% of daily target</span>
              <button
                onClick={() => addWater(250)}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold text-xs flex items-center gap-1 transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+250 mL</span>
              </button>
            </div>
          </div>

          {/* Sleep Target */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Moon className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white">{t.lifestyle.sleepRoutine}</h3>
              </div>
              <span className="text-xs font-bold text-purple-300 font-mono">
                {lifestyle.lastSleepDurationHours} / {lifestyle.sleepTargetHours} hrs
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
              Optimal restorative sleep supports regular insulin sensitivity and blood pressure stability.
            </div>

            <div className="text-[11px] text-slate-400">
              Target bedtime: 10:30 PM • Dim blue screens by 9:45 PM
            </div>
          </div>

          {/* Physical Activity */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Footprints className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">{t.lifestyle.activityGoals}</h3>
              </div>
              <span className="text-xs font-bold text-emerald-300 font-mono">
                {lifestyle.currentSteps} / {lifestyle.walkingStepGoal} steps
              </span>
            </div>

            <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-emerald-400 to-teal-400 h-3 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round((lifestyle.currentSteps / lifestyle.walkingStepGoal) * 100)
                  )}%`,
                }}
              />
            </div>

            <div className="text-[11px] text-slate-400">
              Low-impact brisk walking after meals helps blunt glucose spikes safely.
            </div>
          </div>
        </div>

        {/* Daily Healthy Habits Checklist */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">{t.lifestyle.healthyHabits}</h3>
            <span className="text-xs text-slate-400 font-mono">
              {lifestyle.suggestedHabits.filter((h) => h.completed).length} of{" "}
              {lifestyle.suggestedHabits.length} Completed
            </span>
          </div>

          <div className="space-y-3">
            {lifestyle.suggestedHabits.map((habit) => (
              <div
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  habit.completed
                    ? "bg-teal-950/20 border-teal-500/40"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-bold ${
                        habit.completed ? "text-teal-300 line-through" : "text-white"
                      }`}
                    >
                      {lang === "te" ? habit.titleTe : habit.titleEn}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-800 text-slate-400">
                      {habit.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {lang === "te" ? habit.guidanceTe : habit.guidanceEn}
                  </p>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                    habit.completed
                      ? "bg-teal-500 border-teal-500 text-slate-950"
                      : "border-slate-600"
                  }`}
                >
                  {habit.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

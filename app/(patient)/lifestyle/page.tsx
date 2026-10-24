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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2B45]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16D6C1]/10 text-[#16D6C1] border border-[#16D6C1]/30 text-xs font-semibold">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>{lang === "te" ? "మాడ్యూల్ 8 — జీవనశైలి & రికవరీ నియమావళి" : "Module 8 — Wellness & Clinician Restrictions"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FC] mt-1.5">
              {t.lifestyle.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#9AA9BE] max-w-2xl mt-0.5 leading-relaxed">
              {t.lifestyle.subtitle}
            </p>
          </div>
        </div>

        {/* Clinician-Provided Restrictions Alert (Strict distinction from general education) */}
        <div className="p-6 rounded-3xl bg-[#121C30] border border-rose-500/40 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-rose-400">
            <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <h2 className="text-sm font-bold text-[#F4F7FC] uppercase tracking-wider">
              {t.lifestyle.clinicianRestrictions}
            </h2>
          </div>
          <div className="space-y-2">
            {lifestyle.clinicianRestrictions.map((restriction, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#080D1B] border border-rose-950/40 text-xs text-rose-200 flex items-start space-x-2.5"
              >
                <span className="w-2 h-2 rounded-full bg-rose-400 flex-shrink-0 mt-1.5" />
                <span className="leading-relaxed">{restriction}</span>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-[#9AA9BE] italic">
            {t.lifestyle.precedenceNotice}
          </div>
        </div>

        {/* 3 Metric Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Hydration Tracker */}
          <div className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Droplet className="w-5 h-5 text-[#35BDF5]" />
                <h3 className="text-sm font-bold text-[#F4F7FC]">{t.lifestyle.waterIntake}</h3>
              </div>
              <span className="text-xs font-bold text-[#35BDF5] font-mono">
                {lifestyle.currentWaterMl} / {lifestyle.waterIntakeGoalMl} mL
              </span>
            </div>

            <div className="w-full bg-[#080D1B] rounded-full h-3 overflow-hidden border border-[#1E2B45]">
              <div
                className="bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] h-3 rounded-full transition-all duration-300"
                style={{ width: `${waterPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#9AA9BE]">{waterPercentage}% {t.lifestyle.waterTargetLabel}</span>
              <button
                onClick={() => addWater(250)}
                className="px-3.5 py-1.5 rounded-xl bg-[#35BDF5]/20 hover:bg-[#35BDF5]/30 text-[#35BDF5] border border-[#35BDF5]/40 font-bold text-xs flex items-center gap-1 transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.lifestyle.addWaterBtn}</span>
              </button>
            </div>
          </div>

          {/* Sleep Target */}
          <div className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Moon className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-[#F4F7FC]">{t.lifestyle.sleepRoutine}</h3>
              </div>
              <span className="text-xs font-bold text-purple-300 font-mono">
                {lifestyle.lastSleepDurationHours} / {lifestyle.sleepTargetHours} {lang === "te" ? "గంటలు" : "hrs"}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45] text-xs text-[#9AA9BE] leading-relaxed">
              {t.lifestyle.sleepTargetDesc}
            </div>

            <div className="text-[11px] text-[#9AA9BE]">
              {lang === "te" ? "లక్ష్య నిద్ర సమయం: 10:30 PM • 9:45 PM నాటికి ఫోన్ స్క్రీన్ ఆపండి" : "Target bedtime: 10:30 PM • Dim blue screens by 9:45 PM"}
            </div>
          </div>

          {/* Physical Activity */}
          <div className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Footprints className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-[#F4F7FC]">{t.lifestyle.activityGoals}</h3>
              </div>
              <span className="text-xs font-bold text-emerald-300 font-mono">
                {lifestyle.currentSteps} / {lifestyle.walkingStepGoal} {lang === "te" ? "అడుగులు" : "steps"}
              </span>
            </div>

            <div className="w-full bg-[#080D1B] rounded-full h-3 overflow-hidden border border-[#1E2B45]">
              <div
                className="bg-gradient-to-r from-emerald-400 to-[#16D6C1] h-3 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round((lifestyle.currentSteps / lifestyle.walkingStepGoal) * 100)
                  )}%`,
                }}
              />
            </div>

            <div className="text-[11px] text-[#9AA9BE] leading-relaxed">
              {t.lifestyle.activityTargetDesc}
            </div>
          </div>
        </div>

        {/* Daily Healthy Habits Checklist */}
        <div className="p-6 rounded-3xl bg-[#121C30] border border-[#1E2B45] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E2B45]">
            <h3 className="text-sm font-bold text-[#F4F7FC]">{t.lifestyle.healthyHabits}</h3>
            <span className="text-xs text-[#9AA9BE] font-mono">
              {lifestyle.suggestedHabits.filter((h) => h.completed).length} /{" "}
              {lifestyle.suggestedHabits.length} {t.lifestyle.completedCount}
            </span>
          </div>

          <div className="space-y-3">
            {lifestyle.suggestedHabits.map((habit) => (
              <div
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  habit.completed
                    ? "bg-[#16D6C1]/10 border-[#16D6C1]/40"
                    : "bg-[#080D1B] border-[#1E2B45] hover:border-[#16D6C1]/30"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-bold ${
                        habit.completed ? "text-[#16D6C1] line-through" : "text-[#F4F7FC]"
                      }`}
                    >
                      {lang === "te" ? habit.titleTe : habit.titleEn}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#18253A] text-[#9AA9BE] border border-[#1E2B45]">
                      {habit.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#9AA9BE]">
                    {lang === "te" ? habit.guidanceTe : habit.guidanceEn}
                  </p>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                    habit.completed
                      ? "bg-[#16D6C1] border-[#16D6C1] text-[#080D1B]"
                      : "border-[#1E2B45] bg-[#18253A]"
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Activity,
  Bell,
  Globe,
  RotateCcw,
  Sparkles,
  UserCheck,
  Stethoscope,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
} from "lucide-react";

interface NavbarProps {
  onOpenDemoTour?: () => void;
}

export function Navbar({ onOpenDemoTour }: NavbarProps) {
  const {
    role,
    setRole,
    lang,
    setLanguage,
    currentUser,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    resetAllData,
    t,
  } = useCareRoute();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 text-white backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white">CareRoute</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block leading-none">
                {t.common.tagline}
              </p>
            </div>
          </Link>

          {/* Quick Demo Mode Badge */}
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Hackathon Demo Mode
          </span>
        </div>

        {/* Center / Right Control Panel */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Interactive Demo Tour Button for Judges */}
          {onOpenDemoTour && (
            <button
              onClick={onOpenDemoTour}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 text-xs font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Judge Demo Tour (10 Steps)</span>
            </button>
          )}

          {/* Role Switcher (Patient vs Clinic Staff) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium transition-colors"
              title="Switch user workspace view"
            >
              {role === "patient" ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-teal-300 hidden sm:inline">Patient: Venkata</span>
                </>
              ) : (
                <>
                  <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-cyan-300 hidden sm:inline">Staff: Nurse Priya</span>
                </>
              )}
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Role
                </div>
                <button
                  onClick={() => {
                    setRole("patient");
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 ${
                    role === "patient" ? "text-teal-400 font-semibold bg-teal-500/10" : "text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-teal-400" />
                    <div>
                      <div className="font-medium">Patient Workspace</div>
                      <div className="text-[10px] text-slate-400">Venkata Rao (Age 52)</div>
                    </div>
                  </div>
                  {role === "patient" && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />}
                </button>
                <button
                  onClick={() => {
                    setRole("clinic_staff");
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 ${
                    role === "clinic_staff" ? "text-cyan-400 font-semibold bg-cyan-500/10" : "text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="font-medium">Clinic Staff Workspace</div>
                      <div className="text-[10px] text-slate-400">Priya Sharma, RN (Care Team)</div>
                    </div>
                  </div>
                  {role === "clinic_staff" && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Bilingual Language Switcher (EN / తెలుగు) */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>{lang === "en" ? "English" : "తెలుగు"}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1.5 z-50">
                <button
                  onClick={() => {
                    setLanguage("en");
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 ${
                    lang === "en" ? "text-teal-400 font-bold bg-teal-500/10" : "text-slate-300"
                  }`}
                >
                  <span>English (EN)</span>
                  {lang === "en" && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setLanguage("te");
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 ${
                    lang === "te" ? "text-teal-400 font-bold bg-teal-500/10" : "text-slate-300"
                  }`}
                >
                  <span>తెలుగు (Telugu)</span>
                  {lang === "te" && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95">
                <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {t.common.notifications} ({notifications.length})
                    </span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-teal-400 hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => markNotificationRead(item.id)}
                        className={`p-3 text-xs cursor-pointer hover:bg-slate-800/70 transition-colors ${
                          !item.read ? "bg-teal-950/20" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                            {!item.read && (
                              <span className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
                            )}
                            <span>{lang === "te" ? item.titleTe : item.titleEn}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 flex-shrink-0">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                          {lang === "te" ? item.messageTe : item.messageEn}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={() => {
              if (confirm("Reset CareRoute AI demo data back to baseline?")) {
                resetAllData();
              }
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-amber-300 transition-colors"
            title="Reset to clean demo data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

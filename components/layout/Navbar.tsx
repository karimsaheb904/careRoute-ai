"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Calendar,
  Pill,
  Clock,
  User,
  LogOut,
  Shield,
  Building2,
} from "lucide-react";

interface NavbarProps {
  onOpenDemoTour?: () => void;
}

export function Navbar({ onOpenDemoTour }: NavbarProps) {
  const {
    role,
    currentUserId,
    switchAccount,
    logout,
    lang,
    setLanguage,
    currentUser,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    resetAllData,
    formatLocalDate,
    localizePatientName,
    localizeDoctor,
    t,
  } = useCareRoute();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifMenu(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setShowRoleMenu(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotifIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <Pill className="w-3.5 h-3.5 text-[#16D6C1]" />;
      case "appointment":
        return <Calendar className="w-3.5 h-3.5 text-[#35BDF5]" />;
      case "followup":
        return <Clock className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-[#16D6C1]" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#10182B]/95 text-[#F4F7FC] backdrop-blur-md border-b border-[#1E2B45] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/dashboard" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#16D6C1] to-[#35BDF5] flex items-center justify-center text-[#080D1B] font-bold shadow-lg shadow-[#16D6C1]/20 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-[#080D1B] stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight text-[#F4F7FC]">
                  {t.common.appName}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#16D6C1]/15 text-[#16D6C1] border border-[#16D6C1]/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-[#9AA9BE] hidden sm:block leading-none">
                {t.common.tagline}
              </p>
            </div>
          </Link>

          {/* Quick Demo Mode Badge */}
          <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t.common.demoMode}
          </span>
        </div>

        {/* Center / Right Control Panel */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Interactive Demo Tour Button for Judges */}
          {onOpenDemoTour && (
            <button
              onClick={onOpenDemoTour}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#16D6C1] to-[#35BDF5] text-[#080D1B] text-xs font-bold shadow-md shadow-[#16D6C1]/20 hover:opacity-90 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#080D1B]" />
              <span>{t.common.judgeTour}</span>
            </button>
          )}

          {/* Patient Selector / Role Switcher */}
          <div className="relative" ref={roleRef}>
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121C30] hover:bg-[#18253A] border border-[#1E2B45] text-xs font-medium transition-colors"
              title={t.common.switchRole}
              aria-label={t.common.switchRole}
              suppressHydrationWarning
            >
              <div
                className={`w-5 h-5 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                  role === "admin"
                    ? "bg-purple-500/20 text-purple-300"
                    : role === "clinic_staff"
                    ? "bg-[#35BDF5]/20 text-[#35BDF5]"
                    : "bg-[#16D6C1]/20 text-[#16D6C1]"
                }`}
              >
                {currentUserId === "patient-lakshmi-devi"
                  ? "LD"
                  : currentUserId === "admin-suresh-reddy"
                  ? "SR"
                  : currentUserId === "staff-ramanathan"
                  ? "KR"
                  : role === "patient"
                  ? "VR"
                  : "PS"}
              </div>
              <span className="text-[#F4F7FC] font-semibold hidden sm:inline">
                {currentUser.fullName}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#9AA9BE]" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#121C30] border border-[#1E2B45] shadow-2xl py-2 z-50">
                <div className="px-3.5 py-1.5 border-b border-[#1E2B45] text-[11px] font-semibold text-[#9AA9BE] uppercase tracking-wider flex justify-between">
                  <span>{t.common.switchRole}</span>
                  <span className="text-[#16D6C1] text-[10px]">Multi-Tenant Test</span>
                </div>

                {/* Patient A */}
                <button
                  onClick={() => {
                    switchAccount("patient-venkata-rao");
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-[#18253A] transition-colors ${
                    currentUserId === "patient-venkata-rao"
                      ? "text-[#16D6C1] font-semibold bg-[#16D6C1]/10"
                      : "text-[#F4F7FC]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <UserCheck className="w-4 h-4 text-[#16D6C1]" />
                    <div>
                      <div className="font-bold">{lang === "te" ? "రోగి A: వెంకట రావు" : "Patient A: Venkata Rao"}</div>
                      <div className="text-[10px] text-[#9AA9BE]">Apollo Health City • Age 52</div>
                    </div>
                  </div>
                  {currentUserId === "patient-venkata-rao" && <CheckCircle2 className="w-4 h-4 text-[#16D6C1]" />}
                </button>

                {/* Patient B */}
                <button
                  onClick={() => {
                    switchAccount("patient-lakshmi-devi");
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-[#18253A] transition-colors ${
                    currentUserId === "patient-lakshmi-devi"
                      ? "text-[#16D6C1] font-semibold bg-[#16D6C1]/10"
                      : "text-[#F4F7FC]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-bold">{lang === "te" ? "రోగి B: లక్ష్మీ దేవి" : "Patient B: Lakshmi Devi"}</div>
                      <div className="text-[10px] text-[#9AA9BE]">Care Medical Center • Age 58</div>
                    </div>
                  </div>
                  {currentUserId === "patient-lakshmi-devi" && <CheckCircle2 className="w-4 h-4 text-[#16D6C1]" />}
                </button>

                <div className="my-1 border-t border-[#1E2B45]/60" />

                {/* Clinic A Staff */}
                <button
                  onClick={() => {
                    switchAccount("staff-priya-sharma");
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-[#18253A] transition-colors ${
                    currentUserId === "staff-priya-sharma"
                      ? "text-[#35BDF5] font-semibold bg-[#35BDF5]/10"
                      : "text-[#F4F7FC]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Stethoscope className="w-4 h-4 text-[#35BDF5]" />
                    <div>
                      <div className="font-bold">{lang === "te" ? "క్లినిక్ సిబ్బంది: ప్రియా శర్మ, RN" : "Clinic Staff: Priya Sharma, RN"}</div>
                      <div className="text-[10px] text-[#9AA9BE]">Care Coordinator • Apollo Clinic A</div>
                    </div>
                  </div>
                  {currentUserId === "staff-priya-sharma" && <CheckCircle2 className="w-4 h-4 text-[#35BDF5]" />}
                </button>

                {/* Clinic A Administrator */}
                <button
                  onClick={() => {
                    switchAccount("admin-suresh-reddy");
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-[#18253A] transition-colors ${
                    currentUserId === "admin-suresh-reddy"
                      ? "text-purple-400 font-semibold bg-purple-500/10"
                      : "text-[#F4F7FC]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="font-bold">{lang === "te" ? "క్లినిక్ అడ్మిన్: డాక్టర్ సురేష్ రెడ్డి" : "Clinic Admin: Dr. Suresh Reddy"}</div>
                      <div className="text-[10px] text-purple-300 font-medium">Administrator Privileges • Apollo Clinic A</div>
                    </div>
                  </div>
                  {currentUserId === "admin-suresh-reddy" && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                </button>

                {/* Clinic B Staff */}
                <button
                  onClick={() => {
                    switchAccount("staff-ramanathan");
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-[#18253A] transition-colors ${
                    currentUserId === "staff-ramanathan"
                      ? "text-cyan-400 font-semibold bg-cyan-500/10"
                      : "text-[#F4F7FC]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="font-bold">{lang === "te" ? "క్లినిక్ B: డాక్టర్ కె. రామనాథన్" : "Clinic B: Dr. K. Ramanathan, MD"}</div>
                      <div className="text-[10px] text-[#9AA9BE]">Care Medical Center B • Vijayawada</div>
                    </div>
                  </div>
                  {currentUserId === "staff-ramanathan" && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Bilingual Language Selector with English & తెలుగు */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121C30] hover:bg-[#18253A] border border-[#1E2B45] text-xs font-bold text-[#F4F7FC] transition-colors"
              title={t.common.switchLanguage}
              aria-label={t.common.switchLanguage}
              suppressHydrationWarning
            >
              <Globe className="w-3.5 h-3.5 text-[#16D6C1]" />
              <span>{lang === "en" ? "English" : "తెలుగు"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#9AA9BE]" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#121C30] border border-[#1E2B45] shadow-2xl py-1.5 z-50">
                <div className="px-3 py-1 border-b border-[#1E2B45] text-[10px] font-semibold text-[#9AA9BE] uppercase tracking-wider">
                  {t.common.switchLanguage}
                </div>
                <button
                  onClick={() => {
                    setLanguage("en");
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#18253A] transition-colors ${
                    lang === "en" ? "text-[#16D6C1] font-bold bg-[#16D6C1]/10" : "text-[#F4F7FC]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">🇬🇧</span>
                    <span>English (EN)</span>
                  </div>
                  {lang === "en" && <CheckCircle2 className="w-3.5 h-3.5 text-[#16D6C1]" />}
                </button>
                <button
                  onClick={() => {
                    setLanguage("te");
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#18253A] transition-colors ${
                    lang === "te" ? "text-[#16D6C1] font-bold bg-[#16D6C1]/10" : "text-[#F4F7FC]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">🇮🇳</span>
                    <span>తెలుగు (Telugu)</span>
                  </div>
                  {lang === "te" && <CheckCircle2 className="w-3.5 h-3.5 text-[#16D6C1]" />}
                </button>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-xl bg-[#121C30] hover:bg-[#18253A] border border-[#1E2B45] text-[#9AA9BE] hover:text-[#F4F7FC] transition-colors"
              title={t.common.notifications}
              aria-label={t.common.notifications}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-[#10182B]">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#121C30] border border-[#1E2B45] shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95">
                <div className="p-3 bg-[#080D1B] border-b border-[#1E2B45] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-[#16D6C1]" />
                    <span className="text-xs font-bold text-[#F4F7FC] uppercase tracking-wider">
                      {t.common.notifications} ({notifications.length})
                    </span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-[#16D6C1] hover:underline font-semibold"
                    >
                      {t.common.markAllRead}
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-[#1E2B45]">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-[#9AA9BE]">
                      {t.common.noNotifications}
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => markNotificationRead(item.id)}
                        className={`p-3 text-xs cursor-pointer hover:bg-[#18253A] transition-colors ${
                          !item.read ? "bg-[#16D6C1]/5" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 font-semibold text-[#F4F7FC]">
                            <div className="p-1.5 rounded-lg bg-[#080D1B] border border-[#1E2B45] flex-shrink-0">
                              {getNotifIcon(item.type)}
                            </div>
                            <span className="leading-snug">
                              {lang === "te" ? item.titleTe : item.titleEn}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#9AA9BE] flex-shrink-0">
                            {formatLocalDate(item.createdAt)}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[11px] text-[#9AA9BE] leading-relaxed pl-7">
                          {lang === "te" ? item.messageTe : item.messageEn}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Info Modal Toggle */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-1.5 rounded-xl bg-[#121C30] hover:bg-[#18253A] border border-[#1E2B45] text-[#9AA9BE] hover:text-[#F4F7FC] transition-colors"
              title="User Profile & Settings"
              aria-label="User Profile"
            >
              <User className="w-4 h-4" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#121C30] border border-[#1E2B45] shadow-2xl p-4 z-50 text-xs space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-[#1E2B45]">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#16D6C1] to-[#35BDF5] text-[#080D1B] flex items-center justify-center font-black text-sm shadow-md">
                    {role === "patient" ? "VR" : "PS"}
                  </div>
                  <div>
                    <div className="font-bold text-[#F4F7FC]">
                      {role === "patient"
                        ? localizePatientName(currentUser.fullName)
                        : localizeDoctor(currentUser.fullName)}
                    </div>
                    <div className="text-[11px] text-[#9AA9BE]">{currentUser.email}</div>
                  </div>
                </div>

                <div className="space-y-1.5 text-[#9AA9BE] text-[11px]">
                  <div className="flex justify-between">
                    <span>{lang === "te" ? "పాత్ర:" : "Role:"}</span>
                    <strong className="text-[#16D6C1]">
                      {role === "patient" ? t.common.patientView : t.common.clinicView}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === "te" ? "భాష:" : "Language:"}</span>
                    <strong className="text-[#F4F7FC]">
                      {lang === "en" ? "English (EN)" : "తెలుగు (TE)"}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === "te" ? "క్లినిక్:" : "Clinic:"}</span>
                    <strong className="text-[#F4F7FC]">
                      {currentUser.clinicId === "care-vijayawada-02"
                        ? "Care Medical Center, Vijayawada"
                        : "Apollo Health City, Hyderabad"}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1E2B45] space-y-2">
                  <button
                    onClick={() => {
                      if (confirm(t.common.resetConfirm)) {
                        resetAllData();
                        setShowProfileMenu(false);
                      }
                    }}
                    className="w-full py-2 rounded-xl bg-[#080D1B] hover:bg-[#18253A] text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.common.resetDemoData}</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="w-full py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{lang === "te" ? "లాగౌట్ / నిష్క్రమించండి" : "Log Out / Sign Out"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

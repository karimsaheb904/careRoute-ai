"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Pill,
  Activity,
  Calendar,
  HeartPulse,
  Stethoscope,
  ListTodo,
  FileCheck2,
  Bell,
  Globe,
  UserCheck,
  ShieldCheck,
  Shield,
} from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { role, setRole, lang, setLanguage, notifications, t, canPerformAdminAction } = useCareRoute();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const patientNavItems = [
    { name: t.nav.dashboard, href: "/dashboard", icon: LayoutDashboard },
    { name: t.nav.prescriptions, href: "/prescriptions", icon: FileText },
    { name: t.nav.medications, href: "/medications", icon: Pill },
    { name: t.nav.reports, href: "/reports", icon: Activity },
    { name: t.nav.compareReports, href: "/reports/compare", icon: FileCheck2 },
    { name: t.nav.appointments, href: "/appointments", icon: Calendar },
    { name: t.nav.lifestyle, href: "/lifestyle", icon: HeartPulse },
    { name: t.nav.consent, href: "/consent", icon: ShieldCheck },
    { name: t.nav.notifications, href: "/notifications", icon: Bell, badge: unreadCount },
  ];

  const clinicNavItems = [
    { name: t.nav.clinicWorkspace, href: "/clinic/dashboard", icon: Stethoscope },
    { name: t.nav.followUps, href: "/clinic/follow-ups", icon: ListTodo },
    { name: t.nav.prescriptions, href: "/prescriptions", icon: FileText },
    { name: t.nav.appointments, href: "/appointments", icon: Calendar },
    { name: t.nav.reports, href: "/reports", icon: Activity },
    ...(canPerformAdminAction
      ? [{ name: t.nav.clinicAdmin, href: "/clinic/admin", icon: Shield }]
      : []),
    { name: t.nav.notifications, href: "/notifications", icon: Bell, badge: unreadCount },
  ];

  const navItems = role === "patient" ? patientNavItems : clinicNavItems;

  return (
    <div className="md:hidden">
      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3.5 rounded-2xl bg-gradient-to-tr from-[#16D6C1] to-[#35BDF5] text-[#080D1B] font-bold shadow-2xl shadow-[#16D6C1]/40 flex items-center justify-center active:scale-95 transition-all"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <Menu className="w-6 h-6 stroke-[2.5]" />}
        </button>
      </div>

      {/* Slide-over Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#080D1B]/80 backdrop-blur-md animate-in fade-in">
          <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-[#10182B] border-l border-[#1E2B45] shadow-2xl p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#1E2B45]">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#16D6C1] to-[#35BDF5] flex items-center justify-center text-[#080D1B] font-bold">
                    <Activity className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="font-bold text-[#F4F7FC] text-base">
                    {t.common.appName}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-[#121C30] text-[#9AA9BE] hover:text-[#F4F7FC]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Language Toggle */}
              <div className="p-2.5 rounded-2xl bg-[#121C30] border border-[#1E2B45] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#9AA9BE]">
                  <Globe className="w-4 h-4 text-[#16D6C1]" />
                  <span>{t.common.switchLanguage}:</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      lang === "en" ? "bg-[#16D6C1] text-[#080D1B]" : "text-[#9AA9BE] hover:text-white"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage("te")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      lang === "te" ? "bg-[#16D6C1] text-[#080D1B]" : "text-[#9AA9BE] hover:text-white"
                    }`}
                  >
                    తెలుగు
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-[#16D6C1]/15 text-[#16D6C1] border border-[#16D6C1]/30 font-bold"
                          : "text-[#9AA9BE] hover:bg-[#121C30] hover:text-[#F4F7FC]"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4 text-[#16D6C1]" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Role Toggle & Safety */}
            <div className="pt-4 border-t border-[#1E2B45] space-y-3">
              <button
                onClick={() => {
                  setRole(role === "patient" ? "clinic_staff" : "patient");
                  setIsOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-2xl bg-[#121C30] hover:bg-[#18253A] border border-[#1E2B45] text-xs font-bold text-[#F4F7FC] flex items-center justify-center gap-2"
              >
                {role === "patient" ? (
                  <>
                    <Stethoscope className="w-4 h-4 text-[#35BDF5]" />
                    <span>{t.common.switchRole}: Clinic</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 text-[#16D6C1]" />
                    <span>{t.common.switchRole}: Patient</span>
                  </>
                )}
              </button>

              <div className="text-[10px] text-[#9AA9BE] flex items-center gap-1.5 leading-tight">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16D6C1] flex-shrink-0" />
                <span>{t.nav.clinicalSafetyDesc}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

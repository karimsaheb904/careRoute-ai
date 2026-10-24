"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  LayoutDashboard,
  FileText,
  Pill,
  Activity,
  FileCheck2,
  Calendar,
  HeartPulse,
  Bell,
  Stethoscope,
  ListTodo,
  ShieldCheck,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { role, t, notifications, reports, schedules, canPerformAdminAction } = useCareRoute();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const abnormalReportsCount = reports.filter((r) => r.hasAbnormalValues).length;
  const activeSchedulesCount = schedules.filter((s) => s.active).length;

  const patientNavItems = [
    {
      name: t.nav.dashboard,
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: t.nav.prescriptions,
      href: "/prescriptions",
      icon: FileText,
    },
    {
      name: t.nav.medications,
      href: "/medications",
      icon: Pill,
      badge: activeSchedulesCount > 0 ? activeSchedulesCount : undefined,
      badgeColor: "bg-teal-500/20 text-[#16D6C1] border border-[#16D6C1]/30",
    },
    {
      name: t.nav.reports,
      href: "/reports",
      icon: Activity,
      badge: abnormalReportsCount > 0 ? abnormalReportsCount : undefined,
      badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    },
    {
      name: t.nav.compareReports,
      href: "/reports/compare",
      icon: FileCheck2,
    },
    {
      name: t.nav.appointments,
      href: "/appointments",
      icon: Calendar,
    },
    {
      name: t.nav.lifestyle,
      href: "/lifestyle",
      icon: HeartPulse,
    },
    {
      name: t.nav.consent,
      href: "/consent",
      icon: ShieldCheck,
    },
    {
      name: t.nav.notifications,
      href: "/notifications",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
      badgeColor: "bg-rose-500 text-white",
    },
  ];

  const clinicNavItems = [
    {
      name: t.nav.clinicWorkspace,
      href: "/clinic/dashboard",
      icon: Stethoscope,
    },
    {
      name: t.nav.followUps,
      href: "/clinic/follow-ups",
      icon: ListTodo,
    },
    {
      name: t.nav.prescriptions,
      href: "/prescriptions",
      icon: FileText,
    },
    {
      name: t.nav.appointments,
      href: "/appointments",
      icon: Calendar,
    },
    {
      name: t.nav.reports,
      href: "/reports",
      icon: Activity,
    },
    ...(canPerformAdminAction
      ? [
          {
            name: t.nav.clinicAdmin,
            href: "/clinic/admin",
            icon: Shield,
            badge: "Admin",
            badgeColor: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
          },
        ]
      : []),
    {
      name: t.nav.notifications,
      href: "/notifications",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
      badgeColor: "bg-rose-500 text-white",
    },
  ];

  const navItems = role === "patient" ? patientNavItems : clinicNavItems;

  return (
    <aside
      className={`hidden md:flex flex-col bg-[#10182B] border-r border-[#1E2B45] h-[calc(100vh-4rem)] sticky top-16 select-none shadow-xl transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Role Indicator Banner & Collapse Toggle */}
      <div className="p-3.5 border-b border-[#1E2B45] bg-[#080D1B]/60 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2 min-w-0">
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                role === "patient" ? "bg-[#16D6C1]" : "bg-[#35BDF5]"
              } animate-ping`}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F4F7FC] truncate">
              {role === "patient" ? t.common.patientView : t.common.clinicView}
            </span>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-xl bg-[#121C30] hover:bg-[#18253A] border border-[#1E2B45] text-[#9AA9BE] hover:text-[#F4F7FC] transition-colors ${
            isCollapsed ? "mx-auto" : ""
          }`}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Nav Links */}
      <nav className="flex-1 px-2.5 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center ${
                isCollapsed ? "justify-center px-2 py-3" : "justify-between px-3.5 py-2.5"
              } rounded-2xl text-xs font-semibold transition-all relative group ${
                isActive
                  ? "bg-gradient-to-r from-[#16D6C1]/20 to-[#35BDF5]/10 text-[#16D6C1] border border-[#16D6C1]/40 shadow-sm font-bold"
                  : "text-[#9AA9BE] hover:text-[#F4F7FC] hover:bg-[#121C30]"
              }`}
            >
              {/* Active illuminated bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#16D6C1] rounded-r-full shadow-sm shadow-[#16D6C1]" />
              )}

              <div className="flex items-center space-x-3 min-w-0">
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    isActive ? "text-[#16D6C1]" : "text-[#9AA9BE] group-hover:text-[#F4F7FC]"
                  }`}
                />
                {!isCollapsed && <span className="truncate leading-tight">{item.name}</span>}
              </div>

              {!isCollapsed && item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.badgeColor || "bg-[#18253A] text-[#16D6C1]"
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Collapsed Badge Dot */}
              {isCollapsed && item.badge !== undefined && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Safety Disclaimer */}
      <div className="p-3 border-t border-[#1E2B45] bg-[#080D1B]/50">
        {!isCollapsed ? (
          <div className="p-3 rounded-2xl bg-[#121C30] border border-[#1E2B45] space-y-1">
            <div className="flex items-center space-x-2 text-[11px] font-bold text-[#F4F7FC]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16D6C1] flex-shrink-0" />
              <span>{t.nav.clinicalSafetyTitle}</span>
            </div>
            <p className="text-[10px] text-[#9AA9BE] leading-relaxed">
              {t.nav.clinicalSafetyDesc}
            </p>
          </div>
        ) : (
          <div className="flex justify-center" title={t.nav.clinicalSafetyTitle}>
            <div className="p-2 rounded-xl bg-[#121C30] border border-[#1E2B45] text-[#16D6C1]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

"use client";

import React from "react";
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
  Sparkles,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { role, t, notifications } = useCareRoute();
  const unreadCount = notifications.filter((n) => !n.read).length;

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
    },
    {
      name: t.nav.reports,
      href: "/reports",
      icon: Activity,
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
      name: t.nav.notifications,
      href: "/notifications",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
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
    {
      name: t.nav.notifications,
      href: "/notifications",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
  ];

  const navItems = role === "patient" ? patientNavItems : clinicNavItems;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-[calc(100vh-4rem)] sticky top-16 select-none">
      {/* Role Indicator Banner */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                role === "patient" ? "bg-teal-400" : "bg-cyan-400"
              } animate-ping`}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {role === "patient" ? t.common.patientView : t.common.clinicView}
            </span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
            v1.0
          </span>
        </div>
      </div>

      {/* Main Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/10 text-teal-300 border border-teal-500/30 shadow-sm"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-teal-400" : "text-slate-400"
                  }`}
                />
                <span>{item.name}</span>
              </div>
              {item.badge !== undefined && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Safety Disclaimer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-start space-x-2.5 text-[11px] text-slate-400 leading-tight">
          <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-300">Clinical AI Safety</span>
            <p className="mt-0.5 text-[10px] text-slate-500">
              Assists understanding. No independent diagnoses or dosage alters.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

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
} from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { role, t } = useCareRoute();

  const patientNavItems = [
    { name: t.nav.dashboard, href: "/dashboard", icon: LayoutDashboard },
    { name: t.nav.prescriptions, href: "/prescriptions", icon: FileText },
    { name: t.nav.medications, href: "/medications", icon: Pill },
    { name: t.nav.reports, href: "/reports", icon: Activity },
    { name: t.nav.compareReports, href: "/reports/compare", icon: FileCheck2 },
    { name: t.nav.appointments, href: "/appointments", icon: Calendar },
    { name: t.nav.lifestyle, href: "/lifestyle", icon: HeartPulse },
  ];

  const clinicNavItems = [
    { name: t.nav.clinicWorkspace, href: "/clinic/dashboard", icon: Stethoscope },
    { name: t.nav.followUps, href: "/clinic/follow-ups", icon: ListTodo },
    { name: t.nav.prescriptions, href: "/prescriptions", icon: FileText },
    { name: t.nav.appointments, href: "/appointments", icon: Calendar },
    { name: t.nav.reports, href: "/reports", icon: Activity },
  ];

  const navItems = role === "patient" ? patientNavItems : clinicNavItems;

  return (
    <div className="md:hidden">
      {/* Mobile Floating Menu Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold shadow-xl shadow-teal-500/30 flex items-center justify-center active:scale-95 transition-all"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Slide-over Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="fixed inset-y-0 right-0 w-72 bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="font-bold text-white text-base">CareRoute AI Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive
                          ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-teal-400" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
              {role === "patient" ? "Patient Workspace" : "Clinic Staff Workspace"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

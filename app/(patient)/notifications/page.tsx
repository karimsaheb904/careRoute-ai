"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Bell,
  CheckCircle2,
  Calendar,
  Pill,
  Activity,
  AlertTriangle,
  RotateCcw,
  Clock,
  ArrowRight,
  Filter,
} from "lucide-react";
import { NotificationItem } from "@/types";

export default function NotificationsPage() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    lang,
    t,
  } = useCareRoute();

  const [filterType, setFilterType] = useState<string>("all");

  const filtered = notifications.filter((n) => {
    if (filterType === "all") return true;
    return n.type === filterType;
  });

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "medication":
        return <Pill className="w-4 h-4 text-teal-400" />;
      case "appointment":
        return <Calendar className="w-4 h-4 text-cyan-400" />;
      case "followup":
        return <Clock className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-teal-400" />;
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-semibold">
              <Bell className="w-3.5 h-3.5 text-teal-400" />
              <span>Module 9 — Notification Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {t.common.notifications}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-0.5">
              Automated in-app delivery for medication alerts, clinic appointment reminders, and missed care recovery.
            </p>
          </div>

          <button
            onClick={markAllNotificationsRead}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 text-xs font-semibold transition-colors self-start sm:self-auto"
          >
            Mark all as read
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {["all", "medication", "appointment", "followup"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                filterType === type
                  ? "bg-teal-500 text-slate-950 font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {type === "all" ? "All Reminders" : type}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400 bg-slate-900 rounded-3xl border border-slate-800">
              No notifications matching current filter.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => markNotificationRead(item.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  !item.read
                    ? "bg-slate-900 border-teal-500/40 shadow-sm"
                    : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex-shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">
                        {lang === "te" ? item.titleTe : item.titleEn}
                      </span>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                      )}
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                      {lang === "te" ? item.messageTe : item.messageEn}
                    </p>
                    <div className="text-[10px] text-slate-500">
                      Delivered: {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                {item.actionUrl && (
                  <Link
                    href={item.actionUrl}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold flex items-center gap-1.5 self-end sm:self-auto transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}

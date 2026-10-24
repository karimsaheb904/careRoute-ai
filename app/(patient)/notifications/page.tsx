"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useCareRoute } from "@/components/CareRouteProvider";
import {
  Bell,
  Calendar,
  Pill,
  Clock,
  ArrowRight,
} from "lucide-react";
import { NotificationItem } from "@/types";

export default function NotificationsPage() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    lang,
    formatLocalDate,
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
        return <Pill className="w-4 h-4 text-[#16D6C1]" />;
      case "appointment":
        return <Calendar className="w-4 h-4 text-[#35BDF5]" />;
      case "followup":
        return <Clock className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-[#16D6C1]" />;
    }
  };

  const getFilterLabel = (type: string) => {
    if (lang === "te") {
      switch (type) {
        case "all":
          return "అన్ని రిమైండర్లు";
        case "medication":
          return "మందులు";
        case "appointment":
          return "అపాయింట్‌మెంట్లు";
        case "followup":
          return "ఫాలో-అప్‌లు";
        default:
          return type;
      }
    }
    return type === "all" ? "All Reminders" : type;
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2B45]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16D6C1]/10 text-[#16D6C1] border border-[#16D6C1]/30 text-xs font-semibold">
              <Bell className="w-3.5 h-3.5" />
              <span>{lang === "te" ? "మాడ్యూల్ 9 — నోటిఫికేషన్ ఆర్కిటెక్చర్" : "Module 9 — Notification Architecture"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FC] mt-1.5">
              {t.common.notifications}
            </h1>
            <p className="text-xs sm:text-sm text-[#9AA9BE] max-w-2xl mt-0.5 leading-relaxed">
              {lang === "te"
                ? "మందుల అలర్ట్‌లు, అపాయింట్‌మెంట్ రిమైండర్లు మరియు ఫాలో-అప్‌ల ప్రత్యక్ష డెలివరీ సెంటర్."
                : "Automated in-app delivery for medication alerts, clinic appointment reminders, and missed care recovery."}
            </p>
          </div>

          <button
            onClick={markAllNotificationsRead}
            className="px-3.5 py-2 rounded-xl bg-[#121C30] hover:bg-[#18253A] text-[#16D6C1] border border-[#1E2B45] text-xs font-semibold transition-colors self-start sm:self-auto"
          >
            {t.common.markAllRead}
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
                  ? "bg-[#16D6C1] text-[#080D1B] font-bold"
                  : "bg-[#121C30] text-[#9AA9BE] hover:text-[#F4F7FC] border border-[#1E2B45]"
              }`}
            >
              {getFilterLabel(type)}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#9AA9BE] bg-[#121C30] rounded-3xl border border-[#1E2B45]">
              {t.common.noNotifications}
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => markNotificationRead(item.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  !item.read
                    ? "bg-[#121C30] border-[#16D6C1]/40 shadow-sm"
                    : "bg-[#121C30]/60 border-[#1E2B45] hover:bg-[#121C30]"
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-2xl bg-[#080D1B] border border-[#1E2B45] flex-shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#F4F7FC] text-sm">
                        {lang === "te" ? item.titleTe : item.titleEn}
                      </span>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-[#16D6C1] animate-pulse" />
                      )}
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#18253A] text-[#9AA9BE] border border-[#1E2B45]">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#9AA9BE] leading-relaxed max-w-2xl">
                      {lang === "te" ? item.messageTe : item.messageEn}
                    </p>
                    <div className="text-[10px] text-[#9AA9BE] mt-1">
                      {lang === "te" ? "డెలివరీ సమయం: " : "Delivered: "}{formatLocalDate(item.createdAt)}
                    </div>
                  </div>
                </div>

                {item.actionUrl && (
                  <Link
                    href={item.actionUrl}
                    className="px-3.5 py-2 rounded-xl bg-[#18253A] hover:bg-[#1E2B45] text-[#16D6C1] text-xs font-semibold flex items-center gap-1.5 self-end sm:self-auto transition-colors border border-[#1E2B45]"
                  >
                    <span>{lang === "te" ? "వివరాలు చూడండి" : "View Details"}</span>
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

"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useCareRouteStore } from "@/lib/data/store";
import { translations, TranslationDictionary } from "@/lib/translations";

type CareRouteStoreType = ReturnType<typeof useCareRouteStore>;

interface CareRouteContextType extends CareRouteStoreType {
  t: TranslationDictionary;
  formatLocalDate: (dateStr: string, options?: Intl.DateTimeFormatOptions) => string;
  formatLocalTime: (timeStr: string) => string;
  localizeDoctor: (name?: string) => string;
  localizeSpecialty: (specialty?: string) => string;
  localizeRoom: (room?: string) => string;
  localizeClinic: (clinic?: string) => string;
  localizePatientName: (name?: string) => string;
  localizeStatus: (status?: string) => string;
  localizePriority: (priority?: string) => string;
  getGreeting: () => string;
}

const CareRouteContext = createContext<CareRouteContextType | null>(null);

export function CareRouteProvider({ children }: { children: ReactNode }) {
  const store = useCareRouteStore();
  const t = translations[store.lang] || translations.en;
  const isTe = store.lang === "te";

  const greetingPeriod = React.useSyncExternalStore(
    () => () => {},
    () => {
      const hour = new Date().getHours();
      if (hour < 12) return "morning";
      if (hour < 17) return "afternoon";
      return "evening";
    },
    () => "morning"
  );

  const getGreeting = (): string => {
    if (greetingPeriod === "morning") return t.dashboard.greetingMorning;
    if (greetingPeriod === "afternoon") return t.dashboard.greetingAfternoon;
    return t.dashboard.greetingEvening;
  };

  const formatLocalDate = (dateStr: string, options?: Intl.DateTimeFormatOptions): string => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const defaultOptions: Intl.DateTimeFormatOptions = options || {
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      return d.toLocaleDateString(isTe ? "te-IN" : "en-US", defaultOptions);
    } catch {
      return dateStr;
    }
  };

  const formatLocalTime = (timeStr: string): string => {
    try {
      if (!timeStr) return "";
      if (timeStr.includes(":") && !timeStr.includes("T")) {
        const [h, m] = timeStr.split(":");
        const hours = parseInt(h, 10);
        const mins = m ? m.slice(0, 2) : "00";
        const isPM = hours >= 12;
        const formattedHours = hours % 12 || 12;
        if (isTe) {
          let ampm = "ఉదయం";
          if (hours >= 12 && hours < 16) ampm = "మధ్యాహ్నం";
          else if (hours >= 16 && hours < 20) ampm = "సాయంత్రం";
          else if (hours >= 20 || hours < 5) ampm = "రాత్రి";
          return `${ampm} ${formattedHours}:${mins}`;
        }
        const ampm = isPM ? "PM" : "AM";
        return `${formattedHours}:${mins} ${ampm}`;
      }
      const d = new Date(timeStr);
      if (isNaN(d.getTime())) return timeStr;
      return d.toLocaleTimeString(isTe ? "te-IN" : "en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return timeStr;
    }
  };

  const localizeDoctor = (name?: string): string => {
    if (!name) return "";
    if (!isTe) return name;
    if (name.includes("Anita Sharma")) return "డాక్టర్ అనితా శర్మ, MD";
    if (name.includes("Srinivas")) return "డాక్టర్ కె. శ్రీనివాస్, MD";
    if (name.includes("Rajesh Varma")) return "డాక్టర్ రాజేష్ వర్మ, MD";
    if (name.includes("Priya Sharma")) return "ప్రియా శర్మ, RN";
    return name;
  };

  const localizeSpecialty = (spec?: string): string => {
    if (!spec) return "";
    if (!isTe) return spec;
    if (spec.includes("Endocrinology")) return "ఎండోక్రినాలజీ & డయాబెటాలజీ";
    if (spec.includes("Cardiology")) return "కార్డియాలజీ విభాగం";
    if (spec.includes("General Physician") || spec.includes("General Medicine")) return "జనరల్ మెడిసిన్ / ఇంటర్నల్ మెడిసిన్";
    return spec;
  };

  const localizeRoom = (room?: string): string => {
    if (!room) return "";
    if (!isTe) return room;
    if (room.includes("302")) return "గది 302 (కన్సల్టేషన్ సూట్)";
    if (room.includes("204")) return "కార్డియో సూట్ 204 (రెండవ అంతస్తు)";
    if (room.includes("104")) return "గది 104 (ఔట్ పేషెంట్ విభాగం)";
    return room.replace(/Room/gi, "గది").replace(/Suite/gi, "సూట్");
  };

  const localizeClinic = (clinic?: string): string => {
    if (!clinic) return "";
    if (!isTe) return clinic;
    if (clinic.includes("Apollo")) return "అపోలో హెల్త్ సిటీ, జూబ్లీ హిల్స్";
    if (clinic.includes("Metro Care")) return "మెట్రో కేర్ క్లినిక్, బంజారా హిల్స్";
    if (clinic.includes("Vijaya")) return "విజయ డయాగ్నస్టిక్ సెంటర్, హైదరాబాద్";
    return clinic;
  };

  const localizePatientName = (name?: string): string => {
    if (!name) return "";
    if (!isTe) return name;
    if (name.includes("Venkata Rao")) return "వెంకట రావు";
    return name;
  };

  const localizeStatus = (status?: string): string => {
    if (!status) return "";
    if (!isTe) {
      return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }
    const map: Record<string, string> = {
      confirmed: "ఖరారైంది",
      scheduled: "షెడ్యూల్ చేయబడింది",
      missed: "రాలేకపోయారు",
      cancelled: "రద్దు చేయబడింది",
      taken: "తీసుకున్నారు",
      skipped: "దాటవేశారు",
      pending: "సమయం ఆసన్నం కాలేదు",
      action_required: "చర్య అవసరం",
      completed: "పూర్తయింది",
      verified: "ధృవీకరించబడింది",
      flagged_ambiguity: "అస్పష్టత గుర్తించబడింది",
      pending_verification: "ధృవీకరణ బకాయి",
      high: "అత్యవసరం",
      medium: "మధ్యస్థం",
      low: "సాధారణం",
    };
    return map[status.toLowerCase()] || status;
  };

  const localizePriority = (priority?: string): string => {
    if (!priority) return "";
    if (!isTe) return priority.toUpperCase();
    if (priority.toLowerCase() === "high") return "అత్యవసరం";
    if (priority.toLowerCase() === "medium") return "మధ్యస్థం";
    if (priority.toLowerCase() === "low") return "సాధారణం";
    return priority;
  };

  return (
    <CareRouteContext.Provider
      value={{
        ...store,
        t,
        formatLocalDate,
        formatLocalTime,
        localizeDoctor,
        localizeSpecialty,
        localizeRoom,
        localizeClinic,
        localizePatientName,
        localizeStatus,
        localizePriority,
        getGreeting,
      }}
    >
      {children}
    </CareRouteContext.Provider>
  );
}

export function useCareRoute() {
  const context = useContext(CareRouteContext);
  if (!context) {
    throw new Error("useCareRoute must be used within a CareRouteProvider");
  }
  return context;
}

"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useCareRouteStore } from "@/lib/data/store";
import { translations, TranslationDictionary } from "@/lib/translations";

type CareRouteStoreType = ReturnType<typeof useCareRouteStore>;

interface CareRouteContextType extends CareRouteStoreType {
  t: TranslationDictionary;
}

const CareRouteContext = createContext<CareRouteContextType | null>(null);

export function CareRouteProvider({ children }: { children: ReactNode }) {
  const store = useCareRouteStore();
  const t = translations[store.lang] || translations.en;

  return (
    <CareRouteContext.Provider value={{ ...store, t }}>
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

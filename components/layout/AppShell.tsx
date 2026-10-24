"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { DemoTourModal } from "./DemoTourModal";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080D1B] text-[#F4F7FC] flex flex-col font-sans selection:bg-[#16D6C1] selection:text-[#080D1B]">
      <Navbar onOpenDemoTour={() => setIsDemoTourOpen(true)} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>

      <MobileNav />
      <DemoTourModal
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
      />
    </div>
  );
}

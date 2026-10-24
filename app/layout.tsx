import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CareRouteProvider } from "@/components/CareRouteProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareRoute AI — Your Healthcare Journey, Connected",
  description:
    "An AI-powered, bilingual healthcare assistant connecting patients and authorized clinic staff through intelligent prescription verification, lab report explanations, and appointment conflict detection.",
  keywords: [
    "CareRoute AI",
    "healthcare AI",
    "prescription verification",
    "medical report explanation",
    "bilingual healthcare Telugu",
    "smart appointment conflict detection",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <CareRouteProvider>{children}</CareRouteProvider>
      </body>
    </html>
  );
}

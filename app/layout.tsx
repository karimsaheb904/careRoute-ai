import type { Metadata } from "next";
import { Inter, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import { CareRouteProvider } from "@/components/CareRouteProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansTelugu = Noto_Sans_Telugu({
  variable: "--font-noto-telugu",
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareRoute AI — Your Healthcare Journey, Connected",
  description:
    "A sophisticated, AI-powered, bilingual (English & Telugu) healthcare assistant connecting patients and authorized clinic staff through intelligent prescription verification, lab report explanations, and appointment conflict detection.",
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
      className={`${inter.variable} ${notoSansTelugu.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080D1B] text-[#F4F7FC] font-sans selection:bg-[#16D6C1] selection:text-[#080D1B]">
        <CareRouteProvider>{children}</CareRouteProvider>
      </body>
    </html>
  );
}

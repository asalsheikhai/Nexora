import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Vazirmatn, Inter } from "next/font/google";

const vazir = Vazirmatn({ subsets: ["arabic"], variable: "--font-fa", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-en", display: "swap" });

export const metadata: Metadata = {
  title: "NEXORA — AR Showroom",
  description: "Control light. Command space. NexoraLuxe AR showroom.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "NEXORA — AR Showroom",
    description: "Graphite micro-cement + brass wash. Zebra / Dual / Motorized.",
    images: [{ url: "/api/og" }]
  },
  metadataBase: new URL("https://nexoraluxe.ir")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" className={`${vazir.variable} ${inter.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

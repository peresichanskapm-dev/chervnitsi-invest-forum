import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ScrollReveal } from "@/components/ui/ScrollReveal/ScrollReveal";

import "./globals.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Chernivtsi Invest Forum — 3-4 жовтня 2026",
  description:
    "Chernivtsi Invest Forum — місце, де відбуваються інвестиції. Чернівці, 3-4 жовтня 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* suppressHydrationWarning: the head script below adds `has-reveal` to this
       element before React hydrates, which would otherwise read as a className mismatch */
    <html lang="uk" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* runs before first paint, so revealed content never flashes in and back out */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("has-reveal")`,
          }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}

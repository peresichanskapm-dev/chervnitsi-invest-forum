import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import { ScrollReveal } from "@/components/ui/ScrollReveal/ScrollReveal";

import "./globals.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

const GTM_ID = "GTM-NTZ5VPTD";
const GA_ID = "G-Z7L2JL1PH3";

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
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}

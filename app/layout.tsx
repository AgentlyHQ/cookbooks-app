import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/ThemeToggle";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://cookbooks.use-agently.com"),
  title: {
    default: "Cookbooks — Curated tools & workflows for your AI agents",
    template: "%s — Cookbooks",
  },
  description: "Where agentic tools come to find what they need. The authoritative registry for CLI tools.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Cookbooks — Curated tools & workflows for your AI agents",
    description: "Where agentic tools come to find what they need.",
    type: "website",
    siteName: "Cookbooks",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookbooks — Curated tools & workflows for your AI agents",
    description: "Where agentic tools come to find what they need.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-RGNDH5QLD0" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RGNDH5QLD0');
        `}</Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

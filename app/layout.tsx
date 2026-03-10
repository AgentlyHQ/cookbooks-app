import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/ThemeToggle";
import { GoogleAnalytics } from "next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://cookbooks.use-agently.com"),
  title: {
    default: "Cookbooks — The Authoritative CLI Registry",
    template: "%s — Cookbooks",
  },
  description: "Where agentic tools come to find what they need. The authoritative registry for CLI tools.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Cookbooks — The Authoritative CLI Registry",
    description: "Where agentic tools come to find what they need.",
    type: "website",
    siteName: "Cookbooks",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookbooks — The Authoritative CLI Registry",
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
        <ThemeProvider>{children}</ThemeProvider>
        <GoogleAnalytics gaId="G-RGNDH5QLD0" />
      </body>
    </html>
  );
}

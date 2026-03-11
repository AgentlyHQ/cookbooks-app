import Link from "next/link";
import { LandingHeader } from "@/app/_components/LandingHeader";

export default function NotFound() {
  const ascii404 = String.raw`
██╗  ██╗   ██████╗   ██╗  ██╗
██║  ██║  ██╔═████╗  ██║  ██║
███████║  ██║██╔██║  ███████║
╚════██║  ████╔╝██║  ╚════██║
     ██║  ╚██████╔╝       ██║
     ╚═╝   ╚═════╝        ╚═╝`;

  return (
    <div className="cb-root">
      <LandingHeader />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "52px 24px 0",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* dot grid background */}
        <div className="cb-dot-grid" />
        <div className="cb-glow" />

        {/* ASCII 404 */}
        <pre
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "clamp(10px, 1.45vw, 18px)",
            fontWeight: 700,
            lineHeight: 1.08,
            color: "var(--cb-border-hi)",
            position: "relative",
            zIndex: 1,
            userSelect: "none",
            whiteSpace: "pre",
            margin: 0,
            padding: "22px 24px",
            textAlign: "left",
            background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            overflow: "auto",
            maxWidth: "min(92vw, 680px)",
          }}
        >
          {ascii404}
        </pre>

        {/* message */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: "24px",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              color: "var(--cb-muted)",
              marginBottom: "10px",
            }}
          >
            <span style={{ color: "var(--cb-accent)" }}>$</span>{" "}
            <span style={{ color: "var(--cb-text)" }}>cd</span> /this/page{" "}
            <span style={{ color: "var(--cb-dim)" }}>→ not found</span>
          </p>

          <p
            style={{
              fontSize: "1rem",
              color: "var(--cb-muted)",
              maxWidth: "360px",
              lineHeight: 1.7,
            }}
          >
            This page doesn&apos;t exist. Maybe the CLI was removed from the registry, or the URL is wrong.
          </p>
        </div>

        {/* back link */}
        <Link href="/" className="cb-nav-submit" style={{ position: "relative", zIndex: 1, padding: "9px 20px", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          ← Back to registry
        </Link>
      </div>
    </div>
  );
}

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Cookbooks — Where agentic tools come to find what they need.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  let fontBold: ArrayBuffer | null = null;
  let fontRegular: ArrayBuffer | null = null;

  try {
    const [cssB, cssR] = await Promise.all([
      fetch("https://fonts.googleapis.com/css2?family=Fira+Mono:wght@700", {
        headers: { "User-Agent": "Mozilla/5.0" },
      }).then((r) => r.text()),
      fetch("https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400", {
        headers: { "User-Agent": "Mozilla/5.0" },
      }).then((r) => r.text()),
    ]);

    const urlB = cssB.match(/src: url\((.+?)\) format/)?.[1];
    const urlR = cssR.match(/src: url\((.+?)\) format/)?.[1];

    [fontBold, fontRegular] = await Promise.all([
      urlB ? fetch(urlB).then((r) => r.arrayBuffer()) : Promise.resolve(null),
      urlR ? fetch(urlR).then((r) => r.arrayBuffer()) : Promise.resolve(null),
    ]);
  } catch {
    // falls back to system monospace
  }

  const fonts: { name: string; data: ArrayBuffer; weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; style: "normal" }[] = [];
  if (fontBold)    fonts.push({ name: "Fira Mono", data: fontBold,    weight: 700, style: "normal" });
  if (fontRegular) fonts.push({ name: "Fira Mono", data: fontRegular, weight: 400, style: "normal" });

  return new ImageResponse(
    (
      /* root */
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#080808", fontFamily: "Fira Mono, monospace", position: "relative" }}>

        {/* top accent bar */}
        <div style={{ display: "flex", width: "100%", height: "4px", background: "#b5ff4d", flexShrink: 0 }} />

        {/* body */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "64px 80px 56px" }}>

          {/* logo: > cookbooks. */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "60px" }}>
            <span style={{ color: "#b5ff4d", fontSize: "30px", fontWeight: 400 }}>{">"}</span>
            <span style={{ color: "#e0e0d6", fontSize: "30px", fontWeight: 700, letterSpacing: "0.06em" }}>cookbooks</span>
            <span style={{ color: "#b5ff4d", fontSize: "30px", fontWeight: 700 }}>.</span>
          </div>

          {/* tagline — no <br />, use separate spans in a column */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: "4px" }}>
            <span style={{ color: "#eaeae0", fontSize: "64px", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Where agentic tools
            </span>
            <span style={{ color: "#eaeae0", fontSize: "64px", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              come to find what
            </span>
            <span style={{ color: "#eaeae0", fontSize: "64px", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              they need.
            </span>
          </div>

          {/* bottom bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #1e1e1e", paddingTop: "22px" }}>
            <span style={{ display: "flex", color: "#505050", fontSize: "16px", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              The Authoritative Registry for CLI Tools
            </span>
            <span style={{ display: "flex", color: "#b5ff4d", fontSize: "16px", fontWeight: 700, letterSpacing: "0.06em" }}>
              cookbooks.use-agently.com
            </span>
          </div>
        </div>

        {/* decorative ASCII art, far right, very faded */}
        <div style={{ display: "flex", position: "absolute", right: "60px", top: "50%", transform: "translateY(-50%)", flexDirection: "column", fontSize: "10px", lineHeight: "1.18", color: "#1c1c1c", fontWeight: 700, whiteSpace: "pre" }}>
          <span>{" ██████╗  ██████╗  ██████╗ ██╗  ██╗██████╗  ██████╗  ██████╗ ██╗  ██╗███████╗"}</span>
          <span>{"██╔════╝ ██╔═══██╗██╔═══██╗██║ ██╔╝██╔══██╗██╔═══██╗██╔═══██╗██║ ██╔╝██╔════╝"}</span>
          <span>{"██║      ██║   ██║██║   ██║█████╔╝ ███████╗██║   ██║██║   ██║█████╔╝ ███████╗"}</span>
          <span>{"██║      ██║   ██║██║   ██║██╔═██╗ ██╔══██╗██║   ██║██║   ██║██╔═██╗ ╚════██╗"}</span>
          <span>{"╚██████╗ ╚██████╔╝╚██████╔╝██║  ██╗██████╔╝╚██████╔╝╚██████╔╝██║  ██╗ █████╔╝"}</span>
          <span>{" ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝"}</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}

// ASCII art rendered as segments — COOK highlighted, BOOKS plain
const ASCII_LINES = [
  [{ hi: true, t: " ██████╗  ██████╗  ██████╗ ██╗  ██╗" }, { t: "██████╗  ██████╗  ██████╗ ██╗  ██╗███████╗" }],
  [{ hi: true, t: "██╔════╝ ██╔═══██╗██╔═══██╗██║ ██╔╝" }, { t: "██╔══██╗██╔═══██╗██╔═══██╗██║ ██╔╝██╔════╝" }],
  [{ hi: true, t: "██║      ██║   ██║██║   ██║█████╔╝ " }, { t: "███████╗██║   ██║██║   ██║█████╔╝ ███████╗" }],
  [{ hi: true, t: "██║      ██║   ██║██║   ██║██╔═██╗ " }, { t: "██╔══██╗██║   ██║██║   ██║██╔═██╗ ╚════██╗" }],
  [{ hi: true, t: "╚██████╗ ╚██████╔╝╚██████╔╝██║  ██╗" }, { t: "██████╔╝╚██████╔╝╚██████╔╝██║  ██╗ █████╔╝" }],
  [{ hi: true, t: " ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝" }, { t: "╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝" }],
];

export function LandingHero() {
  return (
    <section className="cb-hero">
      <div className="cb-dot-grid" />
      <div className="cb-glow" />

      <pre className="cb-ascii" aria-label="COOKBOOKS">
        {ASCII_LINES.map((segments, i) => (
          <span key={i}>
            {segments.map((seg, j) =>
              seg.hi ? (
                <span key={j} className="cb-hi">{seg.t}</span>
              ) : (
                seg.t
              )
            )}
            {i < ASCII_LINES.length - 1 ? "\n" : ""}
          </span>
        ))}
      </pre>

      <p className="cb-wordplay">
        <code>cli tools</code>&nbsp;→&nbsp;collected in&nbsp;<code>cookbooks</code>
      </p>

      <div className="cb-hero-copy">
        <p className="cb-eyebrow">
          The <strong>Authoritative</strong> Registry for CLI Tools
        </p>
        <h1 className="cb-h1">
          Where agentic tools<br />come to find what they need.
        </h1>
        <p className="cb-subtext">
          When Claude, Cursor, Copilot, or Codex reach for a CLI tool,<br />
          they reach for Cookbooks. One registry. Every tool. No ambiguity.
        </p>
      </div>

    </section>
  );
}

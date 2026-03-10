"use client";

const AGENTS = [
  "Claude Code", "Cursor", "GitHub Copilot", "Cline", "OpenAI Codex",
  "Windsurf", "Roo", "Gemini CLI", "Kilo", "Aider", "Continue",
  "Devin", "SWE-agent", "OpenCode", "Goose", "Amp", "Droid", "Trae",
];

const ALL = [...AGENTS, ...AGENTS]; // duplicate for seamless loop

export function AgentsCarousel() {
  return (
    <section className="kl-agents">
      <p className="kl-agents-label">Trusted by agentic tools</p>
      <div className="kl-carousel-outer">
        <div className="kl-carousel-track">
          {ALL.map((name, i) => (
            <div key={i} className="kl-agent-chip">
              <span className="kl-agent-pip" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

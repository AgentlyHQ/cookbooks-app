const AGENTS = [
  "Claude Code", "Cursor", "GitHub Copilot", "Cline", "OpenAI Codex",
  "Windsurf", "Roo", "Gemini CLI", "Kilo", "Aider", "Continue",
  "Devin", "SWE-agent", "OpenCode", "Goose", "Amp", "Droid", "Trae",
];

const ALL = [...AGENTS, ...AGENTS]; // duplicate for seamless loop

export function AgentsCarousel() {
  return (
    <section className="cb-agents">
      <p className="cb-agents-label">Trusted by agentic tools</p>
      <div className="cb-carousel-outer">
        <div className="cb-carousel-track">
          {ALL.map((name, i) => (
            <div key={i} className="cb-agent-chip">
              <span className="cb-agent-pip" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

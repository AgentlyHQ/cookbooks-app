import React from "react";

const AGENTS = [
  "OpenAI Codex", "Claude Code", "Copilot", "OpenClaw",
  "Cursor", "Windsurf", "Gemini", "Aider",
  "Continue", "OpenCode",
];

const ALL = [...AGENTS, ...AGENTS]; // duplicate for seamless loop

export function AgentsCarousel() {
  return (
    <section className="cb-agents">
      <p className="cb-agents-label">Use it for your agents on</p>
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

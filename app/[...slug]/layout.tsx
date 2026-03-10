import { LandingHeader } from "@/app/_components/LandingHeader";

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cb-root">
      <LandingHeader />
      {children}
      <div className="cb-footer-wrap">
        <footer className="cb-footer">
          <div className="cb-footer-left">
            <strong>cookbooks</strong> — the directory for agentic CLIs, reimagined for agents
          </div>
          <div className="cb-footer-links">
            <a href="https://github.com/AgentlyHQ" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://github.com/AgentlyHQ/cookbooks-registry" target="_blank" rel="noopener noreferrer">Registry</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

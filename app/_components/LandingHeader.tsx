import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function LandingHeader() {
  return (
    <header className="kl-header">
      <Link href="/" className="kl-logo">
        <span className="kl-logo-prompt">{'>'}</span>
        <span className="kl-logo-wordmark">cookbooks</span>
      </Link>
      <nav className="kl-nav">
        <a href="#registry" className="kl-nav-link">CLI Registry</a>
        <div className="kl-nav-sep" />
        <a href="#workflows" className="kl-nav-link kl-nav-link--soon">
          Workflows
          <span className="kl-soon-badge">soon</span>
        </a>
        <div className="kl-nav-sep" />
        <a href="/faq" className="kl-nav-link">FAQ</a>
        <div className="kl-nav-sep" />
        <a href="https://use-agently.com" className="kl-nav-link" target="_blank" rel="noopener noreferrer">Agently ↗</a>
        <div className="kl-nav-sep" />
        <a
          href="https://github.com/AgentlyHQ/cookbooks-registry/blob/main/clis.json"
          className="kl-nav-submit"
          target="_blank"
          rel="noopener noreferrer"
        >
          + Submit
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}

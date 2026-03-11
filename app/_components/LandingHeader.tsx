import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function LandingHeader() {
  return (
    <header className="cb-header">
      <Link href="/" className="cb-logo">
        <span className="cb-logo-prompt">{'>'}</span>
        <span className="cb-logo-wordmark">cookbooks</span>
      </Link>
      <nav className="cb-nav">
        <a href="/#registry" className="cb-nav-link">CLI Registry</a>
        <div className="cb-nav-sep" />
        <a href="#workflows" className="cb-nav-link cb-nav-link--soon">
          Workflows
          <span className="cb-soon-badge">soon</span>
        </a>
        <div className="cb-nav-sep" />
        <Link href="/faq" className="cb-nav-link">FAQ</Link>
        <div className="cb-nav-sep" />
        <a href="https://use-agently.com" className="cb-nav-link" target="_blank" rel="noopener noreferrer">Agently ↗</a>
        <div className="cb-nav-sep" />
        <a
          href="https://github.com/AgentlyHQ/cookbooks-registry/blob/main/clis.json"
          className="cb-nav-submit"
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

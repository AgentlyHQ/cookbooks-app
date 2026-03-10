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
        <a href="https://github.com/AgentlyHQ/cookbooks-registry" className="kl-nav-link">Registry</a>
        <div className="kl-nav-sep" />
        <a href="https://github.com/AgentlyHQ" className="kl-nav-link" target="_blank" rel="noopener noreferrer">GitHub</a>
        <div className="kl-nav-sep" />
        <ThemeToggle />
      </nav>
    </header>
  );
}

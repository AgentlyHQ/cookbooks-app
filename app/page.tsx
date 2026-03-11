import { getCLIs } from "@/lib/registry";
import { getGitHubStars } from "@/lib/github";
import { LandingHeader } from "@/app/_components/LandingHeader";
import { LandingHero } from "@/app/_components/LandingHero";
import { AgentsCarousel } from "@/app/_components/AgentsCarousel";
import { RegistrySection } from "@/app/_components/RegistrySection";

export default async function HomePage() {
  const clis = await getCLIs();
  const starEntries = await Promise.all(
    clis.map(async (cli) => [cli.slug, cli.github ? await getGitHubStars(cli.github) : null] as [string, number | null]),
  );
  const stars = Object.fromEntries(starEntries);

  return (
    <div className="cb-root">
      <LandingHeader />
      <LandingHero />
      <AgentsCarousel />
      <RegistrySection clis={clis} stars={stars} />
      <div id="workflows" />
      <div className="cb-footer-wrap">
        <footer className="cb-footer">
          <div className="cb-footer-left">
            <strong>cookbooks</strong> — a project by{" "}
            <a href="https://use-agently.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cb-accent)", textDecoration: "none" }}>Agently</a>
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

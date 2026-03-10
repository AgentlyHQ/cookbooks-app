import { getCLIs } from "@/lib/registry";
import { getGitHubStars } from "@/lib/github";
import { LandingHeader } from "@/app/_components/LandingHeader";
import { LandingHero } from "@/app/_components/LandingHero";
import { RegistrySection } from "@/app/_components/RegistrySection";

export default async function HomePage() {
  const clis = await getCLIs();
  const starEntries = await Promise.all(
    clis.map(async (cli) => [cli.slug, cli.github ? await getGitHubStars(cli.github) : null] as [string, number | null]),
  );
  const stars = Object.fromEntries(starEntries);

  return (
    <div className="kl-root">
      <LandingHeader />
      <LandingHero />
<RegistrySection clis={clis} stars={stars} />
      <div className="kl-footer-wrap">
        <footer className="kl-footer">
          <div className="kl-footer-left">
            <strong>cookbooks</strong> — where agentic tools come to find what they need
          </div>
          <div className="kl-footer-links">
            <a href="https://github.com/AgentlyHQ">GitHub</a>
            <a href="https://github.com/AgentlyHQ/cookbooks-registry">Registry</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

import type { CLIEntry } from "@/lib/types";

const REGISTRY_URL =
  process.env.REGISTRY_URL ??
  "https://raw.githubusercontent.com/AgentlyHQ/cookbooks-registry/main/clis.json";

const FALLBACK_CLIS: CLIEntry[] = [
  {
    slug: "googleworkspace/cli",
    name: "gws",
    description:
      "Unified CLI for Google Workspace APIs — Drive, Gmail, Calendar, Sheets, Docs, and Chat. Dynamically built from the Google Discovery Service.",
    github: "googleworkspace/cli",
    install: { npm: "@googleworkspace/cli" },
  },
];

export async function getCLIs(): Promise<CLIEntry[]> {
  try {
    const res = await fetch(REGISTRY_URL, { next: { revalidate: 0 } });
    if (!res.ok) return FALLBACK_CLIS;
    return res.json() as Promise<CLIEntry[]>;
  } catch {
    return FALLBACK_CLIS;
  }
}

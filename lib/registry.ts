import type { CLIEntry } from "@/lib/types";

const REGISTRY_URL =
  process.env.REGISTRY_URL ??
  "https://raw.githubusercontent.com/AgentlyHQ/cookbooks-registry/main/clis.json";

export async function getCLIs(): Promise<CLIEntry[]> {
  const res = await fetch(REGISTRY_URL, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error(`Failed to fetch registry: ${res.status}`);
  return res.json() as Promise<CLIEntry[]>;
}

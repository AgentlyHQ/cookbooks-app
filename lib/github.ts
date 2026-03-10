import { unstable_cache } from "next/cache";

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export const getGitHubStars = unstable_cache(
  async (repo: string): Promise<number | null> => {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: githubHeaders(),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return (data.stargazers_count as number) ?? null;
    } catch {
      return null;
    }
  },
  ["gh-stars"],
  { revalidate: 3600 },
);

export const getGitHubReadme = unstable_cache(
  async (repo: string): Promise<string | null> => {
    try {
      for (const branch of ["main", "master"]) {
        const res = await fetch(
          `https://raw.githubusercontent.com/${repo}/${branch}/README.md`,
        );
        if (res.ok) return res.text();
      }
      return null;
    } catch {
      return null;
    }
  },
  ["gh-readme"],
  { revalidate: 3600 },
);

export const getGitHubMeta = unstable_cache(
  async (
    repo: string,
  ): Promise<{ stars: number | null; description: string | null; homepage: string | null }> => {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: githubHeaders(),
      });
      if (!res.ok) return { stars: null, description: null, homepage: null };
      const data = await res.json();
      return {
        stars: (data.stargazers_count as number) ?? null,
        description: (data.description as string) ?? null,
        homepage: (data.homepage as string) ?? null,
      };
    } catch {
      return { stars: null, description: null, homepage: null };
    }
  },
  ["gh-meta"],
  { revalidate: 3600 },
);

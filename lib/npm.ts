import { unstable_cache } from "next/cache";

export const getNpmWeeklyDownloads = unstable_cache(
  async (packageName: string): Promise<number | null> => {
    try {
      const encoded = encodeURIComponent(packageName);
      const res = await fetch(`https://api.npmjs.org/downloads/point/last-week/${encoded}`);
      if (!res.ok) return null;
      const data = await res.json();
      return (data.downloads as number) || null;
    } catch {
      return null;
    }
  },
  ["npm-downloads"],
  { revalidate: 3600 },
);

export const getPypiWeeklyDownloads = unstable_cache(
  async (packageName: string): Promise<number | null> => {
    try {
      const res = await fetch(`https://pypistats.org/api/packages/${packageName}/recent`);
      if (!res.ok) return null;
      const data = await res.json();
      return (data.data?.last_week as number) || null;
    } catch {
      return null;
    }
  },
  ["pypi-downloads"],
  { revalidate: 3600 },
);

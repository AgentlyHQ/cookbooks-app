import type { MetadataRoute } from "next";
import { getCLIs } from "@/lib/registry";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://cookbooks.sh";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const clis = await getCLIs();

  const cliRoutes: MetadataRoute.Sitemap = clis.map((cli) => ({
    url: `${BASE_URL}/cli/${cli.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    ...cliRoutes,
  ];
}

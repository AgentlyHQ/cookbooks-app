import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "raw.githubusercontent.com" },
    ],
  },
  async redirects() {
    return [
      // Redirect old /{owner}/{repo} slugs → /cli/{owner}/{repo}
      {
        source: "/:owner/:repo",
        destination: "/cli/:owner/:repo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

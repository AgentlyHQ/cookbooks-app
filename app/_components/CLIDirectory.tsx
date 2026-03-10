"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Star, ArrowRight, Terminal, Package } from "lucide-react";
import type { CLIEntry, CLIStats } from "@/lib/types";

function formatNumber(n: number | null | undefined): string {
  if (n == null) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toString();
}

interface CLIDirectoryProps {
  clis: CLIEntry[];
  stats: Record<string, CLIStats>;
}

export function CLIDirectory({ clis, stats }: CLIDirectoryProps) {
  const [search, setSearch] = useState("");

  const filtered = clis.filter((cli) => {
    const q = search.toLowerCase();
    return (
      !q ||
      cli.name.toLowerCase().includes(q) ||
      (cli.description ?? "").toLowerCase().includes(q) ||
      (cli.github ?? "").toLowerCase().includes(q) ||
      (cli.install?.npm ?? "").toLowerCase().includes(q) ||
      (cli.install?.pip ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search CLIs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-border bg-background text-foreground placeholder:text-muted-foreground h-9 w-full rounded-lg border pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 sm:w-72"
          />
        </div>
      </div>

      {/* Results count */}
      <p className="text-muted-foreground text-xs">
        {filtered.length} {filtered.length === 1 ? "tool" : "tools"}
        {search && ` matching "${search}"`}
      </p>

      {/* Table */}
      <div className="border-border overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-border bg-muted/50 border-b text-left text-xs">
              <th className="text-muted-foreground px-4 py-3 font-medium">CLI</th>
              <th className="text-muted-foreground hidden px-4 py-3 font-medium sm:table-cell">Repository</th>
              <th className="text-muted-foreground hidden px-4 py-3 font-medium text-right md:table-cell">Stars</th>
              <th className="text-muted-foreground hidden px-4 py-3 font-medium lg:table-cell">Install</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {filtered.length > 0 ? (
              filtered.map((cli) => {
                const s = stats[cli.slug];
                const installCmd = cli.install?.npm
                  ? `npm i -g ${cli.install.npm}`
                  : cli.install?.pip
                    ? `pip install ${cli.install.pip}`
                    : null;

                return (
                  <tr key={cli.slug} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/${cli.slug}`} className="flex items-start gap-3">
                        <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-md ring-1 ring-white/5">
                          <Terminal className="text-muted-foreground/60 h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-foreground text-sm font-medium">{cli.name}</div>
                          <div className="text-muted-foreground mt-0.5 max-w-xs truncate text-xs">
                            {cli.description}
                          </div>
                        </div>
                      </Link>
                    </td>

                    <td className="hidden px-4 py-3 sm:table-cell">
                      <a
                        href={`https://github.com/${cli.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {cli.github}
                      </a>
                    </td>

                    <td className="hidden px-4 py-3 text-right md:table-cell">
                      <div className="text-foreground inline-flex items-center gap-1 text-sm tabular-nums">
                        <Star className="text-muted-foreground h-3 w-3" />
                        {formatNumber(s?.stars)}
                      </div>
                    </td>

                    <td className="hidden px-4 py-3 lg:table-cell">
                      {installCmd ? (
                        <div className="flex items-center gap-1.5">
                          <Package className="text-muted-foreground h-3 w-3 shrink-0" />
                          <code className="text-muted-foreground font-mono text-xs">{installCmd}</code>
                        </div>
                      ) : (
                        <span className="text-muted-foreground/40 text-xs">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/${cli.slug}`}
                        className="text-muted-foreground hover:text-foreground inline-flex transition-colors"
                        aria-label={`View ${cli.name}`}
                      >
                        <ArrowRight className="size-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <p className="text-muted-foreground text-sm">No CLIs found matching your search.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { CLIEntry } from "@/lib/types";

const TABS = ["All Time"];
const PAGE_SIZE = 20;

function rankClass(r: number) {
  if (r === 1) return "cb-rank-1";
  if (r === 2) return "cb-rank-2";
  if (r === 3) return "cb-rank-3";
  return "";
}

function formatStars(n: number | null | undefined): string {
  if (n == null) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toString();
}

interface Props {
  clis: CLIEntry[];
  stars: Record<string, number | null>;
}

export function RegistrySection({ clis, stars }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);

  const sorted = [...clis].sort((a, b) => {
    const sa = stars[a.slug] ?? -1;
    const sb = stars[b.slug] ?? -1;
    return sb - sa;
  });

  const filtered = sorted.filter((c) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.description ?? "").toLowerCase().includes(q) ||
      (c.github ?? "").toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <section className="cb-registry" id="registry">
      <div className="cb-reg-header">
        <span className="cb-reg-title">CLI Registry</span>
        <span className="cb-reg-count">
          <em>{clis.length}</em> tools
        </span>
      </div>

      <div className="cb-tabs">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`cb-tab${activeTab === i ? " cb-tab-active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {i === 2 && <span className="cb-hot-dot" />}
            {tab}
          </button>
        ))}
      </div>

      <div className="cb-search-row">
        <input
          className="cb-search-input"
          type="text"
          placeholder="Search the registry..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(0); }}
          onKeyDown={(e) => { if (e.key === "Escape") { setQuery(""); setPage(0); } }}
        />
        <span className="cb-search-shortcut">/</span>
      </div>

      <table className="cb-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tool</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((cli, i) => (
            <tr key={cli.slug} onClick={() => router.push(`/${cli.slug}`)}>
              <td className={rankClass(page * PAGE_SIZE + i + 1)}>{page * PAGE_SIZE + i + 1}</td>
              <td>
                <Link href={`/${cli.slug}`} className="cb-tool-name" style={{ textDecoration: "none" }}>
                  {cli.name}
                </Link>
<div className="cb-tool-owner">{cli.github?.split("/")[0]}</div>
              </td>
              <td className="cb-stars-col">
                {formatStars(stars[cli.slug])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="cb-pagination">
          <button
            className="cb-page-btn"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            ← Prev
          </button>
          <span className="cb-page-info">
            {page + 1} / {totalPages}
          </span>
          <button
            className="cb-page-btn"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}

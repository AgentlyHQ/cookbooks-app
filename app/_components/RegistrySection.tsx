"use client";

import { useState } from "react";
import Link from "next/link";
import type { CLIEntry } from "@/lib/types";

const TABS = ["All Time"];
const PAGE_SIZE = 20;

function rankClass(r: number) {
  if (r === 1) return "kl-rank-1";
  if (r === 2) return "kl-rank-2";
  if (r === 3) return "kl-rank-3";
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
    <section className="kl-registry" id="registry">
      <div className="kl-reg-header">
        <span className="kl-reg-title">CLI Registry</span>
        <span className="kl-reg-count">
          <em>{clis.length}</em> tools
        </span>
      </div>

      <div className="kl-tabs">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`kl-tab${activeTab === i ? " kl-tab-active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {i === 2 && <span className="kl-hot-dot" />}
            {tab}
          </button>
        ))}
      </div>

      <div className="kl-search-row">
        <input
          className="kl-search-input"
          type="text"
          placeholder="Search the registry..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(0); }}
          onKeyDown={(e) => { if (e.key === "Escape") { setQuery(""); setPage(0); } }}
        />
        <span className="kl-search-shortcut">/</span>
      </div>

      <table className="kl-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tool</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((cli, i) => (
            <tr key={cli.slug} onClick={() => (window.location.href = `/${cli.slug}`)}>
              <td className={rankClass(page * PAGE_SIZE + i + 1)}>{page * PAGE_SIZE + i + 1}</td>
              <td>
                <Link href={`/${cli.slug}`} className="kl-tool-name" style={{ textDecoration: "none" }}>
                  {cli.name}
                </Link>
<div className="kl-tool-owner">{cli.github?.split("/")[0]}</div>
              </td>
              <td className="kl-stars-col">
                {formatStars(stars[cli.slug])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="kl-pagination">
          <button
            className="kl-page-btn"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            ← Prev
          </button>
          <span className="kl-page-info">
            {page + 1} / {totalPages}
          </span>
          <button
            className="kl-page-btn"
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

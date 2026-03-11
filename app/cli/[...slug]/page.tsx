import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { ArrowLeft, Star, ExternalLink, GitFork } from "lucide-react";
import { getCLIs } from "@/lib/registry";
import { getGitHubMeta, getGitHubReadme } from "@/lib/github";
import { CopyInstall } from "./_components/CopyInstall";

export async function generateStaticParams() {
  const clis = await getCLIs();
  return clis.map((cli) => ({ slug: cli.slug.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const clis = await getCLIs();
  const cli = clis.find((c) => c.slug === slug.join("/"));
  if (!cli) return {};
  return {
    title: `${cli.name} — Cookbooks`,
    description: cli.description,
  };
}

function formatNumber(n: number | null): string {
  if (n == null) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toString();
}


export default async function CLIDetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const clis = await getCLIs();
  const cli = clis.find((c) => c.slug === slug.join("/"));
  if (!cli) notFound();

  const [meta, readme] = await Promise.all([
    getGitHubMeta(cli.github ?? ""),
    getGitHubReadme(cli.github ?? ""),
  ]);

  return (
    <main className="cb-detail">
      {/* Back */}
      <Link href="/" className="cb-back">
        <ArrowLeft size={13} />
        Back to registry
      </Link>

      {/* Page header */}
      <div className="cb-detail-title-row">
        <h1 className="cb-detail-h1">{cli.name}</h1>
        {(meta.description ?? cli.description) && (
          <p className="cb-detail-desc">{meta.description ?? cli.description}</p>
        )}
      </div>

      {/* 2-col grid — sidebar first in DOM (mobile-first order), swapped visually on desktop */}
      <div className="cb-detail-grid">

        {/* Sidebar — order-1 mobile, order-2 desktop */}
        <div className="cb-sidebar cb-detail-sidebar">
          {/* About */}
          <div className="cb-card">
            <div className="cb-card-header">
              <span className="cb-card-label">About</span>
            </div>
            <div className="cb-stat-row">
              <span className="cb-stat-label">
                <Star size={13} />
                Stars
              </span>
              <span className="cb-stat-value">{formatNumber(meta.stars)}</span>
            </div>
          </div>

          {/* Repository */}
          {cli.github && (
            <div className="cb-card">
              <div className="cb-card-header">
                <span className="cb-card-label">Repository</span>
              </div>
              <a
                href={`https://github.com/${cli.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cb-ext-link"
              >
                <GitFork size={13} style={{ flexShrink: 0 }} />
                <span className="cb-ext-repo">{cli.github}</span>
                <ExternalLink size={11} style={{ flexShrink: 0 }} />
              </a>
            </div>
          )}

          {/* Install */}
          <CopyInstall install={cli.install} />
        </div>

        {/* README — order-2 mobile, order-1 desktop */}
        <div className="cb-detail-readme">
          {readme ? (
            <div className="cb-card">
              <div className="cb-card-header">
                <span className="cb-card-label">README.md</span>
              </div>
              <div className="cb-readme-body">
                <article className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[
                      rehypeRaw,
                      [
                        rehypeSanitize,
                        {
                          ...defaultSchema,
                          attributes: {
                            ...defaultSchema.attributes,
                            td:   [...(defaultSchema.attributes?.td   ?? []), "align"],
                            th:   [...(defaultSchema.attributes?.th   ?? []), "align"],
                            code: [...(defaultSchema.attributes?.code ?? []), "className"],
                            span: [...(defaultSchema.attributes?.span ?? []), "className"],
                          },
                        },
                      ],
                    ]}
                    components={{
                      img({ src, alt, ...props }) {
                        if (!src || typeof src !== "string") return null;
                        const resolved =
                          src.startsWith("http") || src.startsWith("//")
                            ? src
                            : `https://raw.githubusercontent.com/${cli.github}/HEAD/${src.replace(/^\//, "")}`;
                        // eslint-disable-next-line @next/next/no-img-element
                        return <img src={resolved} alt={alt ?? ""} className="max-w-full h-auto" {...props} />;
                      },
                    }}
                  >
                    {readme}
                  </ReactMarkdown>
                </article>
              </div>
            </div>
          ) : (
            <div className="cb-card">
              <div className="cb-no-readme">No README available for this repository.</div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

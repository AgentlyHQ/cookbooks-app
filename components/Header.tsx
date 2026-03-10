import Link from "next/link";
import { Terminal } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="border-border bg-card/80 sticky top-0 z-50 border-b backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-md">
              <Terminal className="text-primary h-3.5 w-3.5" />
            </div>
            <span className="text-foreground text-[15px] font-semibold">cookbooks</span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://github.com/agentlyhq/cookbooks-app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hidden text-sm transition-colors sm:block"
            >
              GitHub
            </a>
            <a
              href="https://github.com/agentlyhq/cookbooks-app/blob/main/data/clis.json"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
            >
              Submit CLI
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

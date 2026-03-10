"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { CLIInstall } from "@/lib/types";

interface Cmd {
  label: string;
  cmd: string;
}

function buildCmds(install: CLIInstall): Cmd[] {
  const cmds: Cmd[] = [];
  if (install.npm) {
    cmds.push(
      { label: "npm",  cmd: `npm install -g ${install.npm}` },
      { label: "pnpm", cmd: `pnpm add -g ${install.npm}` },
      { label: "bun",  cmd: `bun add -g ${install.npm}` },
    );
  }
  if (install.pip)   cmds.push({ label: "pip",   cmd: `pip install ${install.pip}` });
  if (install.brew)  cmds.push({ label: "brew",  cmd: `brew install ${install.brew}` });
  if (install.cargo) cmds.push({ label: "cargo", cmd: `cargo install ${install.cargo}` });
  return cmds;
}

export function CopyInstall({ install }: { install?: CLIInstall }) {
  const [copied, setCopied] = useState<string | null>(null);

  if (!install) return null;
  const cmds = buildCmds(install);
  if (cmds.length === 0) return null;

  function copy(cmd: string) {
    navigator.clipboard.writeText(cmd).catch(() => {});
    setCopied(cmd);
    setTimeout(() => setCopied(null), 1800);
  }

  return (
    <div className="cb-card">
      <div className="cb-card-header">
        <span className="cb-card-label">Install</span>
      </div>
      <div className="cb-install-list">
        {cmds.map(({ label, cmd }) => (
          <div key={label} className="cb-install-row">
            <span className="cb-install-label">{label}</span>
            <code className="cb-install-cmd">{cmd}</code>
            <button
              className="cb-install-copy"
              onClick={() => copy(cmd)}
              title="Copy"
              aria-label={`Copy ${label} install command`}
            >
              {copied === cmd ? <Check size={11} /> : <Copy size={11} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

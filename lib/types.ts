export interface CLIInstall {
  npm?: string;
  pip?: string;
  brew?: string;
  cargo?: string;
}

export interface CLIEntry {
  slug: string;
  name: string;
  description?: string;
  github?: string | null;
  install?: CLIInstall;
}

export interface CLIStats {
  stars: number | null;
}

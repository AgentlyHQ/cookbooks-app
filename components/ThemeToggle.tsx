"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="border-border flex animate-pulse items-center rounded-full border">
        <div className="size-6.5 rounded-full" />
        <div className="size-6.5 rounded-full" />
        <div className="size-6.5 rounded-full" />
      </div>
    );
  }

  return (
    <div className="border-border flex items-center rounded-full border">
      {(
        [
          { value: "system", Icon: Monitor, label: "System" },
          { value: "light", Icon: Sun, label: "Light" },
          { value: "dark", Icon: Moon, label: "Dark" },
        ] as const
      ).map(({ value, Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`cursor-pointer rounded-full p-1.5 transition-colors ${
            theme === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon className="size-3.5" />
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </div>
  );
}

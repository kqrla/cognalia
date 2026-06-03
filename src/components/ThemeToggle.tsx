// optional dark mode toggle for public/non-app pages.
// persists the user's choice in localStorage under `analogize-theme`.
// toggles the `dark` class on <html>.

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "analogize-theme";

const getInitial = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return "light";
};

export const applyStoredTheme = () => {
  if (typeof document === "undefined") return;
  const t = getInitial();
  document.documentElement.classList.toggle("dark", t === "dark");
};

export const ThemeToggle = ({ className }: { className?: string }) => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      aria-label={`switch to ${next} mode`}
      title={`switch to ${next} mode`}
      onClick={() => setTheme(next)}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        className,
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
};

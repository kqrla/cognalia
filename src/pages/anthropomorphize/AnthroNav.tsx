// small tab strip shared across the /anthropomorphize cluster pages.

import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/anthropomorphize", label: "overview", end: true },
  { to: "/anthropomorphize/about", label: "about" },
  { to: "/anthropomorphize/features", label: "features" },
  { to: "/anthropomorphize/faq", label: "faq" },
];

export const AnthroNav = () => (
  <nav className="mb-10 flex flex-wrap gap-2 border-b border-border/70 pb-4 text-sm">
    {tabs.map((t) => (
      <NavLink
        key={t.to}
        to={t.to}
        end={t.end}
        className={({ isActive }) =>
          cn(
            "rounded-full border px-3.5 py-1.5 transition-colors",
            isActive
              ? "border-foreground/20 bg-secondary text-foreground"
              : "border-transparent text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
          )
        }
      >
        {t.label}
      </NavLink>
    ))}
  </nav>
);

export default AnthroNav;

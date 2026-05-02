// shared site navigation for the public-facing pages: landing, about,
// features, faq. compact, serif wordmark, link to the live app.

import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/about", label: "about" },
  { to: "/features", label: "features" },
  { to: "/faq", label: "faq" },
];

export const SiteNav = () => {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="container flex h-14 max-w-5xl items-center justify-between">
        <Link to="/" className="font-serif-display text-xl tracking-tight">
          analogize
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/app"
            className={cn(
              "ml-2 inline-flex items-center rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90",
              pathname === "/app" && "opacity-80",
            )}
          >
            open app
          </Link>
        </nav>
      </div>
    </header>
  );
};

export const SiteFooter = () => (
  <footer className="border-t border-border/60 py-10">
    <div className="container max-w-5xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-serif-display text-base">analogize</p>
      <p className="text-xs text-muted-foreground">
        a thinking tool. not a learning platform.
      </p>
    </div>
  </footer>
);

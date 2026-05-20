// signed-in style navbar for the /demo/* subtree. mirrors the shape
// of the real authenticated experience (dashboard, history, topics,
// graph, account) but every link routes within /demo and nothing is
// persisted. distinct from SiteNav so visitors can feel the
// "logged-in" surface without ever creating an account.

import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const demoItems = [
  { to: "/demo/dashboard", label: "dashboard" },
  { to: "/demo/history", label: "history" },
  { to: "/demo/graph", label: "graph" },
  { to: "/demo/personalize", label: "personalize" },
  { to: "/demo/account", label: "account" },
];

export const DemoNav = () => {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-30 border-b border-primary/20 bg-background/80 backdrop-blur">
      <div className="container flex h-14 max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-serif-display text-xl tracking-tight">
            analogize
          </Link>
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
            demo
          </span>
        </div>
        <nav className="flex items-center gap-1 text-sm">
          {demoItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground",
                  (isActive || pathname === item.to) && "text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/demo"
            className="ml-1 inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> exit demo
          </Link>
          <Link
            to="/register"
            className="ml-1 inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            make it real
          </Link>
        </nav>
      </div>
    </header>
  );
};

export const DemoBanner = () => (
  <div className="border-b border-dashed border-primary/20 bg-primary/5">
    <div className="container max-w-6xl py-2 text-center text-[11px] text-muted-foreground">
      this is a sandbox tour of the signed-in experience. nothing here is real, nothing is saved.
    </div>
  </div>
);

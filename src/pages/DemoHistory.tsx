// /demo/history - read-only mirror of /history populated with demo
// recents. tag inputs and clear buttons are inert: this is a tour.

import { useMemo, useState } from "react";
import { Clock, Tag, X, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { demoRecents } from "@/features/analogy/demoData";
import { getSystem } from "@/features/analogy/systems";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/SiteNav";
import { DemoBanner, DemoNav } from "@/components/DemoNav";

const DemoHistory = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    demoRecents.forEach((r) => r.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return demoRecents.filter((r) => {
      if (activeTag && !r.tags?.includes(activeTag)) return false;
      if (!q) return true;
      const sys = getSystem(r.system)?.label ?? r.system;
      return (
        r.concept.toLowerCase().includes(q) ||
        sys.toLowerCase().includes(q) ||
        (r.tags ?? []).some((t) => t.toLowerCase().includes(q)) ||
        (r.explanation?.analogy ?? "").toLowerCase().includes(q)
      );
    });
  }, [activeTag, query]);

  const inert = () => toast("demo only — sign up to actually save changes.");

  return (
    <div className="min-h-screen">
      <DemoNav />
      <DemoBanner />
      <main className="container max-w-3xl py-12">
        <header className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">your history</p>
          <h1 className="font-serif-display text-3xl tracking-tight sm:text-4xl">past translations</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            tag concepts to organize them however makes sense to you. in the real app, tags stay on your device.
          </p>
        </header>

        {allTags.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">filter</span>
            {allTags.map((t) => {
              const sel = activeTag === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTag(sel ? null : t)}
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-[11px] transition-colors",
                    sel
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-muted-foreground hover:text-foreground",
                  )}
                >
                  #{t}
                </button>
              );
            })}
            {activeTag && (
              <button onClick={() => setActiveTag(null)} className="text-[10px] text-muted-foreground hover:text-foreground">
                clear
              </button>
            )}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="surface-card p-8 text-center">
            <Clock className="mx-auto mb-3 h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">no entries match this tag.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filtered.map((r) => {
              const sys = getSystem(r.system);
              return (
                <li key={r.id} className="surface-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold tracking-tight">{r.concept}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        via {sys?.label ?? r.system} ·{" "}
                        {new Date(r.createdAt).toLocaleDateString(undefined, {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </p>
                      {r.explanation?.analogy && (
                        <p className="mt-2 line-clamp-2 text-xs italic text-foreground/70">
                          "{r.explanation.analogy}"
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    {(r.tags ?? []).map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-foreground/80">
                        #{t}
                        <button onClick={inert} aria-label="remove tag" className="text-muted-foreground hover:text-foreground">
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={inert}
                      className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="h-3 w-3" /> add tag
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default DemoHistory;

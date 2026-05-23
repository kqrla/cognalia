// /history - full list of past translations with user-authored semantic tags.
// tags are local-only, freeform, and live alongside each recent in localStorage.
// users can add/remove tags inline; clicking a tag filters the list.

import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus, Tag, X, Clock, StickyNote, Eye, Search } from "lucide-react";
import { useRecents } from "@/features/analogy/store";
import { getSystem } from "@/features/analogy/systems";
import { cn } from "@/lib/utils";

const History = () => {
  const navigate = useNavigate();
  const { recents, updateRecentTags, updateRecentNote, clearRecents } = useRecents();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [noteDraft, setNoteDraft] = useState<Record<string, string>>({});

  const allTags = useMemo(() => {
    const set = new Set<string>();
    recents.forEach((r) => r.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [recents]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recents.filter((r) => {
      if (activeTag && !r.tags?.includes(activeTag)) return false;
      if (!q) return true;
      const sys = getSystem(r.system)?.label ?? r.system;
      return (
        r.concept.toLowerCase().includes(q) ||
        sys.toLowerCase().includes(q) ||
        (r.domain ?? "").toLowerCase().includes(q) ||
        (r.note ?? "").toLowerCase().includes(q) ||
        (r.tags ?? []).some((t) => t.toLowerCase().includes(q)) ||
        (r.explanation?.analogy ?? "").toLowerCase().includes(q)
      );
    });
  }, [recents, activeTag, query]);

  const addTag = (id: string) => {
    const value = (draft[id] ?? "").trim();
    if (!value) return;
    const cur = recents.find((r) => r.id === id);
    const next = [...(cur?.tags ?? []), value];
    updateRecentTags(id, next);
    setDraft((d) => ({ ...d, [id]: "" }));
  };

  const removeTag = (id: string, tag: string) => {
    const cur = recents.find((r) => r.id === id);
    updateRecentTags(id, (cur?.tags ?? []).filter((t) => t !== tag));
  };

  return (
    <main className="min-h-screen">
      <div className="container max-w-3xl py-10 sm:py-14">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/app")}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            back to home
          </button>
          {recents.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (confirm("clear all history?")) clearRecents();
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              clear all
            </button>
          )}
        </div>

        <header className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            your history
          </p>
          <h1 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
            past translations
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            tag concepts to organize them however makes sense to you. tags stay on this device.
          </p>
        </header>

        {recents.length > 0 && (
          <div className="mb-4 relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search concepts, systems, tags, notes…"
              className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-9 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}

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
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className="text-[10px] text-muted-foreground hover:text-foreground"
              >
                clear
              </button>
            )}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="surface-card p-8 text-center">
            <Clock className="mx-auto mb-3 h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {recents.length === 0
                ? "nothing here yet. translate a concept to start building your history."
                : "no entries match this tag."}
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filtered.map((r) => {
              const sys = getSystem(r.system);
              return (
                <li key={r.id} className="surface-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => navigate(`/explain?recent=${r.id}`)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <p className="truncate text-sm font-semibold tracking-tight">
                        {r.concept}
                        {r.domain && (
                          <span className="ml-2 text-[10px] font-normal uppercase tracking-wider text-muted-foreground">
                            · {r.domain}
                          </span>
                        )}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        via {sys.label} ·{" "}
                        {new Date(r.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/explain?recent=${r.id}`)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      open
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    {(r.tags ?? []).map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-foreground/80"
                      >
                        #{t}
                        <button
                          type="button"
                          onClick={() => removeTag(r.id, t)}
                          aria-label={`remove tag ${t}`}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </span>
                    ))}
                    <div className="flex items-center gap-1">
                      <input
                        value={draft[r.id] ?? ""}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, [r.id]: e.target.value }))
                        }
                        onKeyDown={(e) => e.key === "Enter" && addTag(r.id)}
                        placeholder="add tag"
                        className="w-24 rounded-full border border-dashed border-border bg-transparent px-2 py-0.5 text-[11px] placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
                      />
                      <button
                        type="button"
                        onClick={() => addTag(r.id)}
                        className="rounded-full p-0.5 text-muted-foreground hover:text-foreground"
                        aria-label="add tag"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <StickyNote className="h-3 w-3 shrink-0 text-muted-foreground" />
                    <input
                      value={
                        noteDraft[r.id] !== undefined
                          ? noteDraft[r.id]
                          : (r.note ?? "")
                      }
                      onChange={(e) =>
                        setNoteDraft((d) => ({ ...d, [r.id]: e.target.value }))
                      }
                      onBlur={() => {
                        if (noteDraft[r.id] !== undefined) {
                          updateRecentNote(r.id, noteDraft[r.id]);
                          setNoteDraft((d) => {
                            const { [r.id]: _, ...rest } = d;
                            return rest;
                          });
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                      }}
                      maxLength={140}
                      placeholder="add a private note (only you can see this)"
                      className="flex-1 rounded-md border border-dashed border-border bg-transparent px-2 py-1 text-[11px] text-foreground/85 placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
                    />
                    <span
                      className="inline-flex items-center gap-1 text-[10px] text-muted-foreground"
                      title="private - stays on this device"
                    >
                      <Eye className="h-3 w-3" />
                      private
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-10 text-center">
          <Link to="/app" className="text-xs text-muted-foreground hover:text-foreground">
            ← back to translating
          </Link>
        </div>
      </div>
    </main>
  );
};

export default History;

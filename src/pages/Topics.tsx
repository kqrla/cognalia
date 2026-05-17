// /topics - manage the semantic tags ("topics") attached to past
// translations. signed-in only. lets users rename a topic across all
// recents, merge it into another, or remove it entirely. clicking a
// topic opens history filtered to that tag.

import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Pencil, Tag, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/useAuth";
import { useRecents } from "@/features/analogy/store";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

const Topics = () => {
  const { user, loading } = useAuth();
  const { recents, updateRecentTags } = useRecents();
  const [renaming, setRenaming] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const topics = useMemo(() => {
    const map = new Map<string, { count: number; concepts: string[] }>();
    recents.forEach((r) => {
      r.tags?.forEach((t) => {
        const entry = map.get(t) ?? { count: 0, concepts: [] };
        entry.count += 1;
        if (entry.concepts.length < 3) entry.concepts.push(r.concept);
        map.set(t, entry);
      });
    });
    return Array.from(map.entries())
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.count - a.count);
  }, [recents]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <section className="container max-w-3xl py-16 text-sm text-muted-foreground">checking…</section>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;

  const renameTopic = (old: string, next: string) => {
    const clean = next.trim();
    if (!clean) return;
    recents.forEach((r) => {
      if (!r.tags?.includes(old)) return;
      const merged = Array.from(new Set(r.tags.map((t) => (t === old ? clean : t))));
      updateRecentTags(r.id, merged);
    });
    setRenaming(null);
    setDraft("");
    toast.success(clean === old ? "no change" : `renamed "${old}" → "${clean}"`);
  };

  const removeTopic = (name: string) => {
    if (!confirm(`remove topic "${name}" from all translations?`)) return;
    recents.forEach((r) => {
      if (!r.tags?.includes(name)) return;
      updateRecentTags(r.id, r.tags.filter((t) => t !== name));
    });
    toast.success(`removed "${name}"`);
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="container max-w-3xl py-12">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">topics</p>
        <h1 className="font-serif-display text-4xl tracking-tight">your conceptual clusters.</h1>
        <p className="mt-3 max-w-xl text-sm text-foreground/70">
          topics are the freeform tags you've attached to translations in /history. rename one and it propagates everywhere. merge two by renaming one into the other.
        </p>

        {topics.length === 0 ? (
          <p className="surface-paper mt-10 p-6 text-sm text-muted-foreground">
            no topics yet. open <Link to="/history" className="underline underline-offset-4">history</Link> and tag a translation to start.
          </p>
        ) : (
          <ul className="mt-10 divide-y divide-border/60 surface-paper">
            {topics.map((t) => (
              <li key={t.name} className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    {renaming === t.name ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          renameTopic(t.name, draft);
                        }}
                        className="flex items-center gap-2"
                      >
                        <input
                          autoFocus
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          className="flex-1 rounded-md border border-input bg-background px-2 py-1 text-sm"
                          placeholder="new name (or existing topic to merge into)"
                        />
                        <button type="submit" className="rounded-full bg-foreground px-3 py-1 text-xs text-background">
                          save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRenaming(null);
                            setDraft("");
                          }}
                          className="text-xs text-muted-foreground"
                        >
                          cancel
                        </button>
                      </form>
                    ) : (
                      <Link
                        to={`/history?tag=${encodeURIComponent(t.name)}`}
                        className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                      >
                        <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                        {t.name}
                        <span className="text-xs text-muted-foreground">· {t.count}</span>
                      </Link>
                    )}
                    {renaming !== t.name && (
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {t.concepts.join(" · ")}
                      </p>
                    )}
                  </div>
                  {renaming !== t.name && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setRenaming(t.name);
                          setDraft(t.name);
                        }}
                        className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        aria-label="rename"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeTopic(t.name)}
                        className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        aria-label="remove"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <SiteFooter />
    </div>
  );
};

export default Topics;

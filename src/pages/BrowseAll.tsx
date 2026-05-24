// /browseall - public gallery of analogy presets that creators have
// opted into listing publicly. anyone (signed in or not) can browse
// and import a preset into their browser. search is purely client-side
// over the loaded batch.

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Compass, Download, Loader2, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { addPreset, getPresets } from "@/features/analogy/presets";
import { Input } from "@/components/ui/input";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

type Listed = {
  slug: string;
  label: string;
  description: string;
  created_at: string;
};

const BrowseAll = () => {
  const [items, setItems] = useState<Listed[] | null>(null);
  const [query, setQuery] = useState("");
  const [imported, setImported] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("published_presets")
        .select("slug,label,description,created_at")
        .eq("listed", true)
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) {
        setItems([]);
        return;
      }
      setItems((data ?? []) as Listed[]);
      const existing = new Set(getPresets().map((p) => p.label.toLowerCase()));
      setImported(new Set((data ?? []).filter((d) => existing.has(d.label.toLowerCase())).map((d) => d.slug)));
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!items) return [];
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) || i.description.toLowerCase().includes(q),
    );
  }, [items, query]);

  const onImport = (p: Listed) => {
    const created = addPreset(p.label, p.description);
    if (!created) {
      toast.error("you already have a preset with that name");
      return;
    }
    setImported((prev) => new Set(prev).add(p.slug));
    toast.success(`imported "${p.label}"`);
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="container max-w-5xl py-12">
        <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <Compass className="h-3.5 w-3.5" /> browse all
        </p>
        <h1 className="font-serif-display text-4xl tracking-tight sm:text-5xl">
          analogy templates, shared by other minds.
        </h1>
        <p className="mt-4 max-w-2xl text-foreground/75">
          these are user-built references - hobbies, professions, mental models - that creators opted to list publicly. import one and analogize will reach for it in your own translations when (and only when) it lands naturally.
        </p>

        <div className="mt-8 flex items-center gap-2 surface-paper p-2">
          <Search className="ml-2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search templates by name or description"
            className="border-0 bg-transparent focus-visible:ring-0"
          />
        </div>

        {items === null ? (
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> loading templates...
          </div>
        ) : filtered.length === 0 ? (
          <div className="surface-card mt-8 flex flex-col items-start gap-3 p-6">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {items.length === 0
                ? "no public templates yet. you could be the first - "
                : "nothing matches that search. try a broader word, or "}
              <Link to="/suggest" className="underline underline-offset-4 hover:text-foreground">
                build a preset
              </Link>{" "}
              and toggle "list publicly" after publishing.
            </p>
          </div>
        ) : (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {filtered.map((p) => {
              const wasImported = imported.has(p.slug);
              return (
                <li key={p.slug} className="surface-card flex flex-col justify-between gap-3 p-5">
                  <div>
                    <p className="font-serif-display text-xl tracking-tight">{p.label}</p>
                    <p className="mt-2 text-sm text-foreground/75">{p.description}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <Link
                      to={`/preset/${p.slug}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      view /preset/{p.slug}
                    </Link>
                    <button
                      type="button"
                      onClick={() => onImport(p)}
                      disabled={wasImported}
                      className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 font-medium text-background hover:opacity-90 disabled:opacity-50"
                    >
                      <Download className="h-3.5 w-3.5" />
                      {wasImported ? "imported" : "import"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
      <SiteFooter />
    </div>
  );
};

export default BrowseAll;

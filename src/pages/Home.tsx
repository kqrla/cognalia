// home screen. the input, the system selector, recent concepts, and the
// curated demo library. when the user submits, we navigate to /explain
// with the concept + system in the url so explanations are shareable.

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, BookOpen, Settings2, Network, History } from "lucide-react";
import { analogySystems, getSystem, type AnalogySystemId } from "@/features/analogy/systems";
import { SystemChip } from "@/features/analogy/components/SystemChip";
import { SystemSelector } from "@/features/analogy/components/SystemSelector";
import { usePreferences, useRecents } from "@/features/analogy/store";
import { useGraph } from "@/features/graph/store";
import { curatedConcepts } from "@/features/analogy/curated";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type Domain = { field: string; sense: string };

const Home = () => {
  const navigate = useNavigate();
  const { preferences } = usePreferences();
  const { recents } = useRecents();
  const { nodes, edges } = useGraph();

  // if the user has not onboarded, send them there. cheap redirect.
  useEffect(() => {
    if (!preferences.onboarded) navigate("/onboarding", { replace: true });
  }, [preferences.onboarded, navigate]);

  const [concept, setConcept] = useState("");
  const [system, setSystem] = useState<AnalogySystemId>(
    preferences.defaultSystem ?? analogySystems[0].id,
  );
  const [showAllSystems, setShowAllSystems] = useState(false);

  // disambiguation: when the term has multiple meanings across fields,
  // we show small pills so the user can pin the analogy to the right one.
  const [domains, setDomains] = useState<Domain[]>([]);
  const [domain, setDomain] = useState<string | null>(null);
  const lastQueriedRef = useRef<string>("");

  // keep selector in sync if the default changes (e.g. after re-onboarding)
  useEffect(() => {
    if (preferences.defaultSystem) setSystem(preferences.defaultSystem);
  }, [preferences.defaultSystem]);

  // debounced disambiguation lookup as the user types
  useEffect(() => {
    const trimmed = concept.trim();
    if (trimmed.length < 2) {
      setDomains([]);
      setDomain(null);
      return;
    }
    const handle = window.setTimeout(async () => {
      if (lastQueriedRef.current === trimmed.toLowerCase()) return;
      lastQueriedRef.current = trimmed.toLowerCase();
      try {
        const { data } = await supabase.functions.invoke("disambiguate", {
          body: { concept: trimmed },
        });
        const list: Domain[] = Array.isArray(data?.domains) ? data.domains : [];
        setDomains(list);
        // reset selection if the new list doesn't include it
        setDomain((d) => (d && list.some((x) => x.field === d) ? d : null));
      } catch {
        setDomains([]);
      }
    }, 450);
    return () => window.clearTimeout(handle);
  }, [concept]);

  const submit = () => {
    const trimmed = concept.trim();
    if (!trimmed) return;
    const params = new URLSearchParams({ q: trimmed, system });
    if (domain) params.set("domain", domain);
    navigate(`/explain?${params.toString()}`);
  };

  const featuredSystems = useMemo(() => {
    // show the user's default first, then the next four. keeps the home tidy.
    const ordered = [...analogySystems].sort((a, b) =>
      a.id === system ? -1 : b.id === system ? 1 : 0,
    );
    return ordered.slice(0, 5);
  }, [system]);

  return (
    <main className="min-h-screen">
      <div className="container max-w-3xl py-10 sm:py-16">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="font-serif-display text-2xl text-foreground">
              analogize
            </p>
            <p className="text-sm text-foreground/70">
              translate ideas into how you already think.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/onboarding")}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            aria-label="thinking style preferences"
          >
            <Settings2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">preferences</span>
          </button>
        </header>

        {/* input card */}
        <section className="surface-lift mb-8 rounded-3xl p-6 sm:p-8">
          <label
            htmlFor="concept"
            className="mb-3 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            explain anything
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <input
              id="concept"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="recursion, transformers, escrow, photosynthesis..."
              className={cn(
                "flex-1 rounded-2xl border border-input bg-background px-4 py-3 text-base",
                "placeholder:text-muted-foreground/70",
                "focus:outline-none focus:ring-2 focus:ring-primary/40",
              )}
            />
            <button
              type="button"
              onClick={submit}
              disabled={!concept.trim()}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3",
                "bg-primary text-primary-foreground font-medium",
                "transition-all hover:opacity-90 disabled:opacity-40",
              )}
            >
              translate
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            tip: the more specific the topic, the sharper the analogy. try
            "transformer architecture in deep learning" instead of just "transformer".
          </p>

          {domains.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                which one?
              </span>
              {domains.map((d) => {
                const selected = domain === d.field;
                return (
                  <button
                    key={d.field}
                    type="button"
                    onClick={() => setDomain(selected ? null : d.field)}
                    title={d.sense}
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-[11px] transition-colors",
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {d.field}
                  </button>
                );
              })}
              {domain && (
                <button
                  type="button"
                  onClick={() => setDomain(null)}
                  className="text-[10px] text-muted-foreground hover:text-foreground"
                >
                  clear
                </button>
              )}
            </div>
          )}

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                analogy system
              </p>
              <button
                type="button"
                onClick={() => setShowAllSystems((v) => !v)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {showAllSystems ? "show fewer" : "show all"}
              </button>
            </div>
            {showAllSystems ? (
              <SystemSelector value={system} onChange={setSystem} compact />
            ) : (
              <div className="flex flex-wrap gap-2">
                {featuredSystems.map((s) => (
                  <SystemChip
                    key={s.id}
                    system={s.id}
                    selected={s.id === system}
                    onClick={() => setSystem(s.id)}
                    size="sm"
                  />
                ))}
              </div>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              currently translating through{" "}
              <span className="font-medium text-foreground/80">
                {getSystem(system).label}
              </span>
              . {getSystem(system).hint}.
            </p>
          </div>
        </section>

        {/* understanding graph teaser. shows up after a few concepts. */}
        {nodes.length >= 1 && (
          <section className="mb-10">
            <button
              type="button"
              onClick={() => navigate("/graph")}
              className="surface-card group flex w-full items-center justify-between gap-4 p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-foreground/70">
                  <Network className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-tight">
                    {nodes.length >= 3
                      ? "want to see how what you've learned connects?"
                      : "your understanding map"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {nodes.length} concept{nodes.length === 1 ? "" : "s"} ·{" "}
                    {edges.filter((e) => e.status === "active").length}{" "}
                    connection
                    {edges.filter((e) => e.status === "active").length === 1
                      ? ""
                      : "s"}
                    {edges.some((e) => e.status === "pending") &&
                      " · new suggestions waiting"}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </button>
          </section>
        )}

        {/* recent concepts */}
        {recents.length > 0 && (
          <RecentsSection
            recents={recents}
            onOpen={(id) => navigate(`/explain?recent=${id}`)}
          />
        )}

        {/* curated library */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold tracking-tight">
              start with a curated example
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {curatedConcepts.map((c) => {
              const sys = getSystem(c.system);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => navigate(`/explain?curated=${c.id}`)}
                  className={cn(
                    "surface-card group p-5 text-left transition-all",
                    "hover:-translate-y-0.5 hover:shadow-lift",
                  )}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full",
                        sys.tintClass,
                      )}
                    >
                      <sys.icon className="h-3.5 w-3.5 text-foreground/70" />
                    </span>
                    <p className="text-xs text-muted-foreground">{sys.label}</p>
                  </div>
                  <p className="mb-1 text-base font-semibold tracking-tight">
                    {c.concept}
                  </p>
                  <p className="text-sm text-muted-foreground">{c.teaser}</p>
                </button>
              );
            })}
          </div>
        </section>

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          a thinking tool. not a learning platform.
        </footer>
      </div>
    </main>
  );
};


type RecentLike = {
  id: string;
  concept: string;
  system: AnalogySystemId;
  createdAt: number;
};

const RecentsSection = ({
  recents,
  onOpen,
}: {
  recents: RecentLike[];
  onOpen: (id: string) => void;
}) => {
  const [openKey, setOpenKey] = useState<string | null>(null);

  // group versions of the same concept (case-insensitive). preserve recency order
  // by sorting groups by their newest entry's createdAt desc.
  const groups = useMemo(() => {
    const map = new Map<string, RecentLike[]>();
    for (const r of recents) {
      const k = r.concept.trim().toLowerCase();
      const arr = map.get(k) ?? [];
      arr.push(r);
      map.set(k, arr);
    }
    return Array.from(map.values())
      .map((arr) => arr.sort((a, b) => b.createdAt - a.createdAt))
      .sort((a, b) => b[0].createdAt - a[0].createdAt)
      .slice(0, 6);
  }, [recents]);

  return (
    <section className="mb-10">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold tracking-tight">recent</h2>
        </div>
        <a
          href="/history"
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          see all & tag →
        </a>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {groups.map((versions) => {
          const head = versions[0];
          const key = head.concept.toLowerCase();
          const isOpen = openKey === key;
          return (
            <div key={key} className="surface-card p-4">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onOpen(head.id)}
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="truncate text-sm font-medium">{head.concept}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    via {getSystem(head.system).label}
                    {versions.length > 1 && ` · ${versions.length} versions`}
                  </p>
                </button>
                {versions.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    className="rounded-full border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    title="version history"
                    aria-label="version history"
                  >
                    <History className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </div>
              {isOpen && versions.length > 1 && (
                <ul className="mt-3 space-y-1 border-t border-border/60 pt-3">
                  {versions.map((v, i) => (
                    <li key={v.id}>
                      <button
                        type="button"
                        onClick={() => onOpen(v.id)}
                        className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground"
                      >
                        <span className="truncate">
                          {i === 0 ? "latest · " : ""}
                          via {getSystem(v.system).label}
                        </span>
                        <span className="shrink-0 text-[10px] uppercase tracking-wider">
                          {new Date(v.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Home;

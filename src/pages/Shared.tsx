// /s/:id — read-only public view of a shared snapshot. handles three kinds:
//   - single explanation (the original behaviour)
//   - a single peripheral concept (anchored to a root)
//   - an entire ecosystem: a root explanation followed by every peripheral
//     the publisher had gathered, presented as a sorted cluster.

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Sparkles,
  Orbit,
  ArrowLeftRight,
  CornerDownRight,
  AlertTriangle,
  Network,
} from "lucide-react";
import { ExplanationView } from "@/features/analogy/components/ExplanationView";
import { getSystem, type AnalogySystemId } from "@/features/analogy/systems";
import type { Explanation, AnalogyMappingPair } from "@/features/analogy/types";
import { cn } from "@/lib/utils";

type PeripheralResult = {
  fits: boolean;
  reason: string;
  analogy: string;
  mapping: AnalogyMappingPair[];
  bridge: string;
  limits: string;
};

type SharedPeripheral = {
  id: string;
  question: string;
  createdAt: number;
  result: PeripheralResult;
};

type SharedPayload = {
  id: string;
  kind?: "single" | "peripheral" | "ecosystem";
  concept: string;
  system: AnalogySystemId;
  explanation: Explanation;
  domain: string | null;
  question: string | null;
  peripherals: SharedPeripheral[] | null;
  created_at: string;
};

const PeripheralBlock = ({ entry }: { entry: SharedPeripheral }) => (
  <article className="surface-card animate-fade-up p-5">
    <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
      <Orbit className="h-3 w-3" />
      peripheral
    </p>
    <h3 className="mb-4 font-serif-display text-xl tracking-tight text-foreground">
      {entry.question}
    </h3>
    {!entry.result.fits ? (
      <div className="rounded-xl border border-dashed border-border p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          doesn't fit this world cleanly
        </div>
        <p className="text-sm leading-relaxed text-foreground/80">
          {entry.result.reason}
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        <div>
          <p className="mb-1 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-3 w-3" /> analogy
          </p>
          <p className="text-sm leading-relaxed text-foreground/90">
            {entry.result.analogy}
          </p>
        </div>
        {entry.result.mapping.length > 0 && (
          <div>
            <p className="mb-1 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
              <ArrowLeftRight className="h-3 w-3" /> mapping
            </p>
            <ul className="divide-y divide-border/60">
              {entry.result.mapping.map((pair, i) => (
                <li
                  key={i}
                  className="grid grid-cols-1 gap-1 py-2 text-sm sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-3"
                >
                  <span className="text-foreground/85">{pair.analogy_part}</span>
                  <ArrowLeftRight className="hidden h-3 w-3 text-muted-foreground sm:block" />
                  <span className="text-foreground/70">{pair.real_part}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {entry.result.bridge && (
          <div>
            <p className="mb-1 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
              <CornerDownRight className="h-3 w-3" /> bridge
            </p>
            <p className="text-sm leading-relaxed text-foreground/85">
              {entry.result.bridge}
            </p>
          </div>
        )}
        {entry.result.limits && (
          <div>
            <p className="mb-1 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
              <AlertTriangle className="h-3 w-3" /> where it breaks
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              {entry.result.limits}
            </p>
          </div>
        )}
      </div>
    )}
  </article>
);

const SharedPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<SharedPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/share-explanation?id=${encodeURIComponent(id)}`;
        const res = await fetch(url, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body?.error ?? "not found");
        if (!cancelled) setData(body as SharedPayload);
      } catch (e) {
        if (!cancelled) setError((e as Error).message ?? "not found");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const kind = data?.kind ?? "single";

  const kindBadge =
    kind === "ecosystem"
      ? { label: "shared ecosystem", icon: Network }
      : kind === "peripheral"
        ? { label: "shared peripheral", icon: Orbit }
        : { label: "shared explanation", icon: Sparkles };
  const BadgeIcon = kindBadge.icon;

  return (
    <main className="min-h-screen">
      <div className="container max-w-3xl py-8 sm:py-12">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            back to analogize
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">
            <BadgeIcon className="h-3 w-3" />
            {kindBadge.label}
          </span>
        </div>

        {!data && !error && (
          <div className="surface-card flex items-center gap-3 p-8">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">loading shared snapshot…</p>
          </div>
        )}

        {error && (
          <div className="surface-card p-8 text-center">
            <p className="text-sm text-muted-foreground">
              this shared snapshot could not be found.
            </p>
          </div>
        )}

        {data && (
          <>
            <header className="mb-8">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {kind === "peripheral" ? "peripheral of" : "explanation"}
              </p>
              <h1 className="mb-2 font-serif-display text-3xl tracking-tight text-foreground sm:text-4xl">
                {kind === "peripheral" && data.question
                  ? data.question
                  : data.concept}
              </h1>
              <p className="text-xs text-muted-foreground">
                {kind === "peripheral" && (
                  <>
                    inside the world of{" "}
                    <span className="text-foreground/80">{data.concept}</span> ·{" "}
                  </>
                )}
                via {getSystem(data.system).label}
                {data.domain && ` · ${data.domain}`} ·{" "}
                {new Date(data.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </header>

            {kind === "peripheral" && data.peripherals?.[0] ? (
              <PeripheralBlock entry={data.peripherals[0]} />
            ) : (
              <ExplanationView
                concept={data.concept}
                system={data.system}
                explanation={data.explanation}
                diagramKey={data.id}
              />
            )}

            {kind === "ecosystem" && data.peripherals && data.peripherals.length > 0 && (
              <section className={cn("mt-10")}>
                <div className="mb-4 flex items-center gap-2">
                  <Orbit className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold tracking-tight">
                    peripherals in this ecosystem
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    · {data.peripherals.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {data.peripherals
                    .slice()
                    .sort((a, b) => {
                      // sort: fitting peripherals first, then by recency
                      if (a.result.fits !== b.result.fits) {
                        return a.result.fits ? -1 : 1;
                      }
                      return (b.createdAt ?? 0) - (a.createdAt ?? 0);
                    })
                    .map((p) => (
                      <PeripheralBlock key={p.id} entry={p} />
                    ))}
                </div>
              </section>
            )}

            <div className="mt-10 rounded-2xl border border-dashed border-border p-5 text-center">
              <Sparkles className="mx-auto mb-2 h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                want your own analogies?{" "}
                <Link to="/" className="text-foreground underline-offset-4 hover:underline">
                  try analogize →
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default SharedPage;

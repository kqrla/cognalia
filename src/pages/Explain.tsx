// the explanation screen. three entry modes:
//  - ?q=...&system=...   fresh request, calls the edge function
//  - ?curated=id         loads from the curated library, no network
//  - ?recent=id          loads from local recents cache
//
// the user can switch systems on the fly, which triggers a fresh request.
// "explain again differently" simply re-fires the request with the current
// system to get a new variation.

import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, RefreshCcw, Sparkles, Loader2, Network } from "lucide-react";
import { toast } from "sonner";
import { ExplanationView } from "@/features/analogy/components/ExplanationView";
import { SystemSelector } from "@/features/analogy/components/SystemSelector";
import { ExplainError, requestExplanation } from "@/features/analogy/api";
import { usePreferences, useRecents } from "@/features/analogy/store";
import { upsertNode } from "@/features/graph/store";
import { curatedConcepts } from "@/features/analogy/curated";
import {
  analogySystems,
  pickContrastingSystem,
  thinkingStyles,
  type AnalogySystemId,
} from "@/features/analogy/systems";
import type { Explanation } from "@/features/analogy/types";
import { cn } from "@/lib/utils";

const Explain = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { preferences } = usePreferences();
  const { addRecent, getRecent } = useRecents();

  const curatedId = params.get("curated");
  const recentId = params.get("recent");
  const queryConcept = params.get("q") ?? "";
  const querySystem = (params.get("system") as AnalogySystemId | null) ?? null;

  // resolve the initial state from whichever entry mode was used
  const initial = useMemo(() => {
    if (curatedId) {
      const found = curatedConcepts.find((c) => c.id === curatedId);
      if (found) {
        return {
          concept: found.concept,
          system: found.system,
          explanation: found.explanation as Explanation,
          source: "curated" as const,
        };
      }
    }
    if (recentId) {
      const found = getRecent(recentId);
      if (found) {
        return {
          concept: found.concept,
          system: found.system,
          explanation: found.explanation,
          source: found.source,
        };
      }
    }
    return null;
    // we intentionally only resolve once on mount per id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curatedId, recentId]);

  const [concept] = useState(initial?.concept ?? queryConcept);
  const [system, setSystem] = useState<AnalogySystemId>(
    initial?.system ?? querySystem ?? preferences.defaultSystem ?? analogySystems[0].id,
  );
  const [explanation, setExplanation] = useState<Explanation | null>(
    initial?.explanation ?? null,
  );
  const [loading, setLoading] = useState(false);
  // monotonically increasing key so MermaidDiagram re-renders even when
  // the new mermaid source happens to equal the previous one
  const [renderKey, setRenderKey] = useState(0);
  // history of analogy systems used for THIS concept in this session.
  // drives "explain again differently" so we never reuse the same lens
  // and prefer a contrasting thinking type each time.
  const [usedSystems, setUsedSystems] = useState<AnalogySystemId[]>(
    initial?.system ? [initial.system] : system ? [system] : [],
  );

  const thinkingStyleLabel = useMemo(() => {
    const style = thinkingStyles.find(
      (s) => s.id === preferences.thinkingStyleId,
    );
    return style?.label;
  }, [preferences.thinkingStyleId]);

  const fetchExplanation = useCallback(
    async (
      forSystem: AnalogySystemId,
      opts?: { reframe?: boolean; avoid?: AnalogySystemId[] },
    ) => {
      if (!concept.trim()) return;
      setLoading(true);
      try {
        const next = await requestExplanation({
          concept,
          system: forSystem,
          thinkingStyleLabel,
          reframe: opts?.reframe,
          avoidSystems: opts?.avoid,
        });
        setExplanation(next);
        setRenderKey((k) => k + 1);
        setUsedSystems((prev) =>
          prev.includes(forSystem) ? prev : [...prev, forSystem],
        );
        addRecent({
          concept,
          system: forSystem,
          explanation: next,
          source: "ai",
        });
        upsertNode({
          concept,
          system: forSystem,
          explanation: next,
        });
      } catch (e) {
        const err =
          e instanceof ExplainError
            ? e
            : new ExplainError("something went wrong", "unknown");
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    [concept, thinkingStyleLabel, addRecent],
  );

  // on first mount, if we did not resolve from curated/recent, fetch fresh.
  // if we did resolve, still record the concept on the understanding graph.
  useEffect(() => {
    if (!initial && concept.trim() && !explanation) {
      fetchExplanation(system);
    } else if (initial) {
      upsertNode({
        concept: initial.concept,
        system: initial.system,
        explanation: initial.explanation,
      });
    }
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSwitchSystem = (next: AnalogySystemId) => {
    if (next === system) return;
    setSystem(next);
    // keep the url in sync so the page is shareable in its current state
    const nextParams = new URLSearchParams(params);
    nextParams.delete("curated");
    nextParams.delete("recent");
    nextParams.set("q", concept);
    nextParams.set("system", next);
    setParams(nextParams, { replace: true });
    fetchExplanation(next);
  };

  // "explain again differently" is reframing, not regeneration.
  // we deliberately switch to a system with a contrasting thinking type
  // and tell the model which lenses were already used.
  const onRegenerate = () => {
    const nextSystem = pickContrastingSystem(system, usedSystems);
    setSystem(nextSystem.id);
    const nextParams = new URLSearchParams(params);
    nextParams.delete("curated");
    nextParams.delete("recent");
    nextParams.set("q", concept);
    nextParams.set("system", nextSystem.id);
    setParams(nextParams, { replace: true });
    toast(`reframing through ${nextSystem.label}`);
    fetchExplanation(nextSystem.id, {
      reframe: true,
      avoid: usedSystems,
    });
  };

  if (!concept.trim()) {
    // someone landed here without a concept. send them to the app.
    navigate("/app", { replace: true });
    return null;
  }

  return (
    <main className="min-h-screen">
      <div className="container max-w-3xl py-8 sm:py-12">
        <button
          type="button"
          onClick={() => navigate("/app")}
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          back to home
        </button>

        <header className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            translating
          </p>
          <h1 className="mb-6 font-serif-display text-3xl tracking-tight text-foreground sm:text-4xl">
            {concept}
          </h1>

          <div className="surface-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                analogy system
              </p>
              <button
                type="button"
                onClick={onRegenerate}
                disabled={loading}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs",
                  "text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50",
                )}
              >
                {loading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <RefreshCcw className="h-3 w-3" />
                )}
                explain again differently
              </button>
            </div>
            <SystemSelector value={system} onChange={onSwitchSystem} compact />
          </div>
        </header>

        {loading && !explanation && (
          <div className="surface-card flex items-center gap-3 p-8">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <div>
              <p className="text-sm font-medium">finding the right analogy</p>
              <p className="text-xs text-muted-foreground">
                this usually takes a few seconds
              </p>
            </div>
          </div>
        )}

        {explanation && (
          <div className={cn("relative", loading && "opacity-60")}>
            {loading && (
              <div className="pointer-events-none absolute right-0 top-0 z-10 flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft">
                <Loader2 className="h-3 w-3 animate-spin" />
                rethinking
              </div>
            )}
            <ExplanationView
              concept={concept}
              system={system}
              explanation={explanation}
              diagramKey={`${system}-${renderKey}`}
            />
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-dashed border-border p-5 text-center">
          <Sparkles className="mx-auto mb-2 h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            try a different system above to see the same concept through another lens.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Explain;

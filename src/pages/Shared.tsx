// /s/:id — read-only public view of a shared explanation.
// fetched via the share-explanation edge function; no auth required.

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { ExplanationView } from "@/features/analogy/components/ExplanationView";
import { getSystem, type AnalogySystemId } from "@/features/analogy/systems";
import type { Explanation } from "@/features/analogy/types";

type SharedPayload = {
  id: string;
  concept: string;
  system: AnalogySystemId;
  explanation: Explanation;
  domain: string | null;
  created_at: string;
};

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
          <span className="rounded-full border border-border bg-card px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">
            shared explanation
          </span>
        </div>

        {!data && !error && (
          <div className="surface-card flex items-center gap-3 p-8">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">loading shared explanation…</p>
          </div>
        )}

        {error && (
          <div className="surface-card p-8 text-center">
            <p className="text-sm text-muted-foreground">
              this shared explanation could not be found.
            </p>
          </div>
        )}

        {data && (
          <>
            <header className="mb-8">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                explanation
              </p>
              <h1 className="mb-2 font-serif-display text-3xl tracking-tight text-foreground sm:text-4xl">
                {data.concept}
              </h1>
              <p className="text-xs text-muted-foreground">
                via {getSystem(data.system).label}
                {data.domain && ` · ${data.domain}`} ·{" "}
                {new Date(data.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </header>

            <ExplanationView
              concept={data.concept}
              system={data.system}
              explanation={data.explanation}
              diagramKey={data.id}
            />

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

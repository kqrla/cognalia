// peripheral analogy card. lets the user ask for related concepts to be
// explained inside the SAME analogy ecosystem the root explanation
// established. the root analogy is treated as canon; everything new is
// positioned around it. when a peripheral concept does not fit the
// world naturally, we refuse instead of forcing a bad metaphor.

import { useState } from "react";
import {
  Loader2,
  Orbit,
  Send,
  ArrowLeftRight,
  CornerDownRight,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { AnalogySystemId } from "../systems";
import type { AnalogyMappingPair } from "../types";
import { cn } from "@/lib/utils";

type PeripheralResult = {
  fits: boolean;
  reason: string;
  analogy: string;
  mapping: AnalogyMappingPair[];
  bridge: string;
  limits: string;
  // local-only
  question: string;
};

type Props = {
  rootConcept: string;
  system: AnalogySystemId;
  rootAnalogy: string;
  rootMapping: AnalogyMappingPair[];
  domain?: string | null;
};

export const PeripheralCard = ({
  rootConcept,
  system,
  rootAnalogy,
  rootMapping,
  domain,
}: Props) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PeripheralResult[]>([]);

  const ask = async () => {
    const q = question.trim();
    if (!q || loading) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("peripheral", {
        body: {
          rootConcept,
          system,
          rootAnalogy,
          rootMapping,
          peripheralConcept: q,
          domain,
        },
      });
      if (error) throw error;
      const r = data?.result;
      if (!r) throw new Error("no result");
      setResults((prev) => [{ ...r, question: q }, ...prev]);
      setQuestion("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "could not extend ecosystem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="surface-card mt-6 p-5 animate-fade-up">
      <div className="mb-3 flex items-center gap-2">
        <Orbit className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-semibold tracking-tight">
          extend this ecosystem
        </p>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">
        ask about a related concept and we'll place it inside the same world as{" "}
        <span className="font-medium text-foreground/80">{rootConcept}</span>.
        if it doesn't land naturally, we'll say so instead of forcing it.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="e.g. how does backpropagation fit in?"
          className={cn(
            "flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground/70",
            "focus:outline-none focus:ring-2 focus:ring-primary/40",
          )}
        />
        <button
          type="button"
          onClick={ask}
          disabled={!question.trim() || loading}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm",
            "bg-primary text-primary-foreground transition-all hover:opacity-90",
            "disabled:opacity-40",
          )}
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          extend
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-5 space-y-4">
          {results.map((r, i) => (
            <article
              key={i}
              className="rounded-xl border border-border/70 bg-background/60 p-4"
            >
              <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                peripheral · {r.question}
              </p>

              {!r.fits ? (
                <div className="flex items-start gap-2 text-sm text-foreground/80">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <p>
                    doesn't fit this world cleanly.{" "}
                    <span className="text-muted-foreground">{r.reason}</span>
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {r.analogy}
                  </p>

                  {r.mapping?.length > 0 && (
                    <ul className="divide-y divide-border/60 rounded-lg bg-background/40 px-3">
                      {r.mapping.map((p, j) => (
                        <li
                          key={j}
                          className="grid grid-cols-1 gap-1 py-2 text-xs sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-3"
                        >
                          <span className="text-foreground/85">
                            {p.analogy_part}
                          </span>
                          <ArrowLeftRight className="hidden h-3 w-3 text-muted-foreground sm:block" />
                          <span className="text-foreground/70">{p.real_part}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {r.bridge && (
                    <p className="flex gap-2 text-xs leading-relaxed text-foreground/75">
                      <CornerDownRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span>{r.bridge}</span>
                    </p>
                  )}

                  {r.limits && (
                    <p className="text-xs italic text-muted-foreground">
                      {r.limits}
                    </p>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

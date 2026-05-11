// peripheral analogy launcher. user types a related concept, we ask
// the model whether it fits inside the existing analogy ecosystem,
// and then route them to a dedicated peripheral screen that mirrors
// the regular explanation layout. the card itself stays a launcher,
// not a results panel - the results live on /peripheral.

import { useState } from "react";
import { Loader2, Orbit, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { AnalogySystemId } from "../systems";
import type { AnalogyMappingPair } from "../types";
import type { PeripheralPayload } from "@/pages/Peripheral";
import { addPeripheralToEcosystem } from "../ecosystems";
import { cn } from "@/lib/utils";

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
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

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
      const result = data?.result;
      if (!result) throw new Error("no result");
      // only record peripherals that actually fit; refusals shouldn't pollute
      // the ecosystem cluster.
      if (result.fits) {
        addPeripheralToEcosystem(rootConcept, system, { question: q, result });
      }
      const payload: PeripheralPayload = {
        rootConcept,
        system,
        domain: domain ?? null,
        question: q,
        result,
      };
      navigate("/peripheral", { state: payload });
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
        ask about a related concept and we'll open it on its own screen, placed
        inside the same world as{" "}
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
    </section>
  );
};

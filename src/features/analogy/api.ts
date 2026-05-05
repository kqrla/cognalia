// thin client over the explain edge function. keeps all gateway-shaped
// errors in one place so the ui can show a single, clear toast.

import { supabase } from "@/integrations/supabase/client";
import type { AnalogySystemId } from "./systems";
import type { Explanation } from "./types";

export type ExplainArgs = {
  concept: string;
  system: AnalogySystemId;
  thinkingStyleLabel?: string;
  // when reframing, we tell the model which analogy worlds were already
  // used so it produces a genuinely different lens, not a paraphrase.
  avoidSystems?: string[];
  reframe?: boolean;
  // optional disambiguation: when a term spans multiple fields, this
  // pins the explanation to the right one.
  domain?: string;
};

export class ExplainError extends Error {
  constructor(message: string, public kind: "rate_limit" | "no_credits" | "unknown") {
    super(message);
  }
}

export const requestExplanation = async ({
  concept,
  system,
  thinkingStyleLabel,
  avoidSystems,
  reframe,
  domain,
}: ExplainArgs): Promise<Explanation> => {
  const { data, error } = await supabase.functions.invoke("explain", {
    body: {
      concept,
      system,
      thinkingStyle: thinkingStyleLabel,
      avoidSystems,
      reframe,
      domain,
    },
  });

  if (error) {
    // the supabase invoker exposes the http status on FunctionsHttpError
    const status = (error as unknown as { context?: { status?: number } }).context?.status;
    if (status === 429) {
      throw new ExplainError(
        "too many requests. wait a moment and try again.",
        "rate_limit",
      );
    }
    if (status === 402) {
      throw new ExplainError(
        "ai credits exhausted on this workspace. add funds to keep going.",
        "no_credits",
      );
    }
    throw new ExplainError(error.message ?? "failed to generate explanation", "unknown");
  }

  if (!data?.explanation) {
    throw new ExplainError("no explanation returned", "unknown");
  }

  return data.explanation as Explanation;
};

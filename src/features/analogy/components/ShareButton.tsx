// share button that publishes a snapshot to a public, unlisted url and copies it
// to the clipboard. supports three kinds of snapshot:
//   - single explanation
//   - a single peripheral (anchored to a root concept)
//   - an entire ecosystem (root + every peripheral the user has gathered)

import { useState } from "react";
import { Share2, Check, Loader2, Link as LinkIcon, Orbit, Network } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Explanation, AnalogyMappingPair } from "../types";
import type { AnalogySystemId } from "../systems";
import type { PeripheralEntry } from "../ecosystems";
import { cn } from "@/lib/utils";

type CommonProps = {
  concept: string;
  system: AnalogySystemId;
  domain?: string | null;
};

type SingleProps = CommonProps & {
  kind?: "single";
  explanation: Explanation;
};

type PeripheralProps = CommonProps & {
  kind: "peripheral";
  question: string;
  result: {
    fits: boolean;
    reason: string;
    analogy: string;
    mapping: AnalogyMappingPair[];
    bridge: string;
    limits: string;
  };
};

type EcosystemProps = CommonProps & {
  kind: "ecosystem";
  explanation: Explanation;
  peripherals: PeripheralEntry[];
};

type Props = SingleProps | PeripheralProps | EcosystemProps;

export const ShareButton = (props: Props) => {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [url, setUrl] = useState<string | null>(null);

  const kind = props.kind ?? "single";

  const labels = {
    single: { idle: "share", done: "shared explanation", icon: Share2 },
    peripheral: { idle: "share peripheral", done: "shared peripheral", icon: Orbit },
    ecosystem: { idle: "share whole ecosystem", done: "shared ecosystem", icon: Network },
  } as const;
  const Icon = labels[kind].icon;

  const publish = async () => {
    if (state === "loading") return;
    setState("loading");
    try {
      const body: Record<string, unknown> = {
        kind,
        concept: props.concept,
        system: props.system,
        domain: props.domain ?? null,
      };
      if (kind === "single" || kind === "ecosystem") {
        body.explanation = (props as SingleProps | EcosystemProps).explanation;
      }
      if (kind === "peripheral") {
        const p = props as PeripheralProps;
        body.question = p.question;
        // for a standalone peripheral we still need an "explanation" payload
        // because the table requires it. we shape it from the result so the
        // viewer can render the same section grammar.
        body.explanation = {
          analogy: p.result.analogy,
          mapping: p.result.mapping,
          visual_mermaid: "",
          visual_kind: "mindmap",
          bridge: p.result.bridge,
          real_explanation: p.result.reason,
          limits: p.result.limits,
        };
        body.peripherals = [
          {
            id: "self",
            question: p.question,
            createdAt: Date.now(),
            result: p.result,
          },
        ];
      }
      if (kind === "ecosystem") {
        body.peripherals = (props as EcosystemProps).peripherals;
      }

      const { data, error } = await supabase.functions.invoke(
        "share-explanation",
        { body },
      );
      if (error) throw error;
      const id = (data as { id?: string } | null)?.id;
      if (!id) throw new Error("no id returned");
      const link = `${window.location.origin}/s/${id}`;
      setUrl(link);
      setState("done");
      try {
        await navigator.clipboard.writeText(link);
        toast.success("link copied to clipboard");
      } catch {
        toast.success("share link ready");
      }
    } catch (e) {
      setState("idle");
      toast.error("could not publish - try again");
      console.error(e);
    }
  };

  if (state === "done" && url) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs">
        <Check className="h-3 w-3 text-foreground/70" />
        <span className="text-muted-foreground">{labels[kind].done} ·</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(url).then(
              () => toast.success("copied"),
              () => toast.error("copy failed"),
            );
          }}
          className="inline-flex items-center gap-1 text-foreground hover:underline"
          title={url}
        >
          <LinkIcon className="h-3 w-3" />
          copy link
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={publish}
      disabled={state === "loading"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs",
        "text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50",
      )}
    >
      {state === "loading" ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Icon className="h-3 w-3" />
      )}
      {state === "loading" ? "publishing…" : labels[kind].idle}
    </button>
  );
};

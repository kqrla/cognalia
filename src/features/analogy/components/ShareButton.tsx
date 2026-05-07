// share button that publishes the current explanation snapshot to a public,
// unlisted url and copies it to the clipboard. one-shot — no edit, no delete.

import { useState } from "react";
import { Share2, Check, Loader2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Explanation } from "../types";
import type { AnalogySystemId } from "../systems";
import { cn } from "@/lib/utils";

type Props = {
  concept: string;
  system: AnalogySystemId;
  explanation: Explanation;
  domain?: string | null;
};

export const ShareButton = ({ concept, system, explanation, domain }: Props) => {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [url, setUrl] = useState<string | null>(null);

  const publish = async () => {
    if (state === "loading") return;
    setState("loading");
    try {
      const { data, error } = await supabase.functions.invoke(
        "share-explanation",
        {
          body: { concept, system, explanation, domain: domain ?? null },
        },
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
      toast.error("could not publish — try again");
      console.error(e);
    }
  };

  if (state === "done" && url) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs">
        <Check className="h-3 w-3 text-foreground/70" />
        <span className="text-muted-foreground">published ·</span>
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
        <Share2 className="h-3 w-3" />
      )}
      {state === "loading" ? "publishing…" : "share"}
    </button>
  );
};

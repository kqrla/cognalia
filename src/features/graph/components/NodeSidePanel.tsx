// the side panel for the focused node. shows concept, system,
// understanding state controls, and quick actions to re-explain
// or jump to the full explanation flow.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSystem } from "@/features/analogy/systems";
import type { GraphNode, UnderstandingState } from "../types";
import { setNodeState, removeNode } from "../store";

type Props = {
  node: GraphNode;
};

const stateOptions: {
  id: UnderstandingState;
  label: string;
  hint: string;
}[] = [
  { id: "clicked", label: "clicked", hint: "this lands for me" },
  { id: "kinda", label: "kinda", hint: "i'm getting there" },
  { id: "unclear", label: "unclear", hint: "still fuzzy" },
];

export const NodeSidePanel = ({ node }: Props) => {
  const navigate = useNavigate();
  const sys = getSystem(node.system);

  return (
    <aside className="surface-card animate-fade-up flex flex-col gap-4 p-5">
      <div>
        <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          focused
        </p>
        <h2 className="font-serif-display text-2xl tracking-tight">
          {node.concept}
        </h2>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs text-foreground/70">
          <sys.icon className="h-3.5 w-3.5" />
          thinking in: {sys.label}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          how clearly does this land?
        </p>
        <div className="flex flex-wrap gap-2">
          {stateOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setNodeState(node.id, opt.id)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                node.state === opt.id
                  ? "border-foreground/30 bg-background text-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
              title={opt.hint}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {node.lastExplanation && (
        <div className="rounded-xl bg-background/60 p-3">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            last analogy
          </p>
          <p className="mt-1 text-sm text-foreground/85 line-clamp-3">
            {node.lastExplanation.analogy}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() =>
            navigate(
              `/explain?q=${encodeURIComponent(node.concept)}&system=${node.system}`,
            )
          }
          className="inline-flex items-center justify-between rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          open full explanation
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() =>
            navigate(
              `/explain?q=${encodeURIComponent(node.concept)}`,
            )
          }
          className="inline-flex items-center justify-between rounded-xl border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          re-explain in a different system
          <Sparkles className="h-4 w-4" />
        </button>
      </div>

      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
        last updated {new Date(node.updatedAt).toLocaleDateString()}
      </p>
    </aside>
  );
};

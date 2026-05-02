// suggested connections panel. when a new concept is added we may
// detect meaningful relationships to existing nodes. the user has
// to accept them — we never silently link.

import { ArrowRight, Check, X } from "lucide-react";
import { acceptEdge, dismissEdge, useGraph } from "../store";
import { edgeStyle } from "../types";

type Props = {
  focusId: string;
};

export const SuggestionsPanel = ({ focusId }: Props) => {
  const { nodes, edges } = useGraph();
  const pending = edges.filter(
    (e) => e.status === "pending" && (e.from === focusId || e.to === focusId),
  );
  const nameOf = (id: string) =>
    nodes.find((n) => n.id === id)?.concept ?? id.replace(/_/g, " ");

  if (pending.length === 0) return null;

  return (
    <div className="surface-card animate-fade-up p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        this might connect to something you've learned
      </p>
      <ul className="space-y-2">
        {pending.map((e) => {
          const meta = edgeStyle[e.type];
          return (
            <li
              key={e.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-background/60 p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm">
                  <span className="font-medium">{nameOf(e.from)}</span>{" "}
                  <span className="text-muted-foreground">{meta.label}</span>{" "}
                  <ArrowRight className="inline h-3 w-3 text-muted-foreground" />{" "}
                  <span className="font-medium">{nameOf(e.to)}</span>
                </p>
                {e.reason && (
                  <p className="truncate text-xs text-muted-foreground">
                    {e.reason}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => acceptEdge(e.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
                  aria-label="accept connection"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => dismissEdge(e.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="dismiss connection"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

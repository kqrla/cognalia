// the understanding graph page. /graph
//
// shows the user's living map: focus node centered, neighbors on a
// soft ring, suggestions surface as accept/dismiss prompts.
// the graph grows only when the user learns concepts elsewhere in
// the app (handled by upsertNode in the explain flow).

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Network } from "lucide-react";
import { useGraph } from "@/features/graph/store";
import { GraphCanvas2D } from "@/features/graph/components/GraphCanvas2D";
import { NodeSidePanel } from "@/features/graph/components/NodeSidePanel";
import { SuggestionsPanel } from "@/features/graph/components/SuggestionsPanel";
import { edgeStyle, type GraphEdge } from "@/features/graph/types";

const Graph = () => {
  const navigate = useNavigate();
  const { nodes, edges } = useGraph();
  const [params, setParams] = useSearchParams();

  const focusFromUrl = params.get("focus");
  // pick the most recently updated node by default
  const fallbackFocus = useMemo(() => {
    if (nodes.length === 0) return null;
    return [...nodes].sort((a, b) => b.updatedAt - a.updatedAt)[0].id;
  }, [nodes]);

  const focusId = focusFromUrl ?? fallbackFocus ?? null;

  const focusNode = useMemo(
    () => nodes.find((n) => n.id === focusId) ?? null,
    [nodes, focusId],
  );

  const [activeEdge, setActiveEdge] = useState<GraphEdge | null>(null);

  useEffect(() => {
    setActiveEdge(null);
  }, [focusId]);

  const setFocus = (id: string) => {
    const next = new URLSearchParams(params);
    next.set("focus", id);
    setParams(next, { replace: true });
  };

  return (
    <main className="min-h-screen">
      <div className="container max-w-6xl py-8 sm:py-12">
        <button
          type="button"
          onClick={() => navigate("/app")}
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          back to home
        </button>

        <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              your understanding
            </p>
            <h1 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
              a map of how you think
            </h1>
            <p className="mt-2 max-w-prose text-sm text-foreground/70">
              clusters drift apart when concepts aren't related. node size
              reflects how broad, well-understood, or connected an idea is.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground">
            <Network className="h-3.5 w-3.5" />
            {nodes.length} concept{nodes.length === 1 ? "" : "s"} ·{" "}
            {edges.filter((e) => e.status === "active").length} connection
            {edges.filter((e) => e.status === "active").length === 1 ? "" : "s"}
          </div>
        </header>

        {nodes.length === 0 ? (
          <div className="surface-card flex flex-col items-center gap-4 p-10 text-center">
            <Network className="h-6 w-6 text-muted-foreground" />
            <div>
              <p className="font-serif-display text-xl">nothing here yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                learn a concept and it will land on the map.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/app")}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              translate something
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              <GraphCanvas2D
                nodes={nodes}
                edges={edges}
                focusId={focusId}
                onFocusNode={setFocus}
                onSelectEdge={setActiveEdge}
              />

              {activeEdge && (
                <div className="surface-card animate-fade-up p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    relationship
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-medium">
                      {nodes.find((n) => n.id === activeEdge.from)?.concept}
                    </span>{" "}
                    <span className="text-muted-foreground">
                      {edgeStyle[activeEdge.type].label}
                    </span>{" "}
                    <span className="font-medium">
                      {nodes.find((n) => n.id === activeEdge.to)?.concept}
                    </span>
                  </p>
                  {activeEdge.reason && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {activeEdge.reason}
                    </p>
                  )}
                </div>
              )}

              {/* legend */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <svg width="28" height="6">
                    <line
                      x1="0"
                      y1="3"
                      x2="28"
                      y2="3"
                      stroke="hsl(var(--foreground) / 0.5)"
                      strokeWidth="1.5"
                    />
                  </svg>
                  structural - part of, depends on
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg width="28" height="6">
                    <line
                      x1="0"
                      y1="3"
                      x2="28"
                      y2="3"
                      stroke="hsl(var(--foreground) / 0.5)"
                      strokeWidth="1.5"
                      strokeDasharray="6 6"
                    />
                  </svg>
                  analogy - similar pattern, behaves like
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {focusNode && <NodeSidePanel node={focusNode} />}
              {focusId && <SuggestionsPanel focusId={focusId} />}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Graph;

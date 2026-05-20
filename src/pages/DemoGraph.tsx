// /demo/graph - same understanding-graph surface a signed-in user
// gets, populated with mock nodes/edges. reuses the real
// GraphCanvas2D + side panels so visitors see the exact component,
// not a stand-in. nothing is written to the local graph store.

import { useMemo, useState } from "react";
import { Network } from "lucide-react";
import { GraphCanvas2D } from "@/features/graph/components/GraphCanvas2D";
import type { GraphEdge, GraphNode } from "@/features/graph/types";
import { edgeStyle } from "@/features/graph/types";
import { SiteFooter } from "@/components/SiteNav";
import { DemoBanner, DemoNav } from "@/components/DemoNav";
import { demoRecents } from "@/features/analogy/demoData";

// derive nodes/edges from the same demoRecents the dashboard uses
// so the demo feels internally consistent.
const buildDemoGraph = (): { nodes: GraphNode[]; edges: GraphEdge[] } => {
  const now = Date.now();
  const nodes: GraphNode[] = demoRecents.map((r, i) => ({
    id: r.id,
    concept: r.concept,
    state: i % 3 === 0 ? "clicked" : i % 3 === 1 ? "kinda" : "unclear",
    system: r.system,
    systemsUsed: [r.system],
    createdAt: now - i * 86_400_000,
    updatedAt: now - i * 86_400_000,
    lastExplanation: r.explanation,
  }));
  // hand-curated edges to make the demo feel like a real map
  const pair = (a: number, b: number, type: GraphEdge["type"], reason: string): GraphEdge => ({
    id: `${nodes[a].id}->${nodes[b].id}:${type}`,
    from: nodes[a].id,
    to: nodes[b].id,
    type,
    reason,
    createdAt: now,
    status: "active",
  });
  const edges: GraphEdge[] = [
    pair(0, 8, "similar_pattern", "both adjust weights from a downstream signal"),
    pair(0, 5, "depends_on", "feynman-style decomposition surfaces gaps to backprop"),
    pair(2, 10, "behaves_like", "entropy and double-entry both conserve a quantity"),
    pair(3, 6, "similar_pattern", "both negotiate agreement among unreliable parties"),
    pair(4, 5, "part_of", "rebase is part of a broader editing technique"),
    pair(7, 11, "behaves_like", "topics and operators both decouple producers from consumers"),
    pair(1, 9, "similar_pattern", "monads and category theory share a compositional shape"),
  ];
  return { nodes, edges };
};

const DemoGraph = () => {
  const { nodes, edges } = useMemo(buildDemoGraph, []);
  const [focusId, setFocusId] = useState<string | null>(nodes[0]?.id ?? null);
  const [activeEdge, setActiveEdge] = useState<GraphEdge | null>(null);
  const focusNode = nodes.find((n) => n.id === focusId);

  return (
    <div className="min-h-screen">
      <DemoNav />
      <DemoBanner />
      <main className="container max-w-6xl py-8 sm:py-12">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">your understanding</p>
            <h1 className="font-serif-display text-3xl tracking-tight sm:text-4xl">a map of how you think</h1>
            <p className="mt-2 max-w-prose text-sm text-foreground/70">
              this is the exact same graph the signed-in app renders — every translation seeds a node, and the engine proposes edges as patterns repeat. node size reflects how connected an idea is.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground">
            <Network className="h-3.5 w-3.5" />
            {nodes.length} concepts · {edges.length} connections
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <GraphCanvas2D
              nodes={nodes}
              edges={edges}
              focusId={focusId}
              onFocusNode={setFocusId}
              onSelectEdge={setActiveEdge}
            />
            {activeEdge && (
              <div className="surface-card animate-fade-up p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">relationship</p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">{nodes.find((n) => n.id === activeEdge.from)?.concept}</span>{" "}
                  <span className="text-muted-foreground">{edgeStyle[activeEdge.type].label}</span>{" "}
                  <span className="font-medium">{nodes.find((n) => n.id === activeEdge.to)?.concept}</span>
                </p>
                {activeEdge.reason && <p className="mt-1 text-xs text-muted-foreground">{activeEdge.reason}</p>}
              </div>
            )}
            <p className="text-[11px] text-muted-foreground">
              in your own graph, this stays in sync across devices once you create an account — the rendering and interactions are identical.
            </p>
          </div>

          <div className="space-y-4">
            {focusNode && (
              <div className="surface-card p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">focused</p>
                <p className="mt-1 font-serif-display text-xl tracking-tight">{focusNode.concept}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  state: <span className="text-foreground">{focusNode.state}</span> · last lens: <span className="text-foreground">{focusNode.system.replace(/_/g, " ")}</span>
                </p>
                {focusNode.lastExplanation?.analogy && (
                  <p className="mt-3 text-sm italic text-foreground/80">"{focusNode.lastExplanation.analogy}"</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default DemoGraph;

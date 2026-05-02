// node-weight calculation. weight drives visual size in the 3d graph.
// the heuristic is intentionally simple and explainable:
//
//   weight = base
//          + degree * degreeFactor      // broader topics get bigger
//          + stateBoost                 // "clicked" concepts feel solid
//          + ageBoost                   // older anchors carry weight too
//
// nothing here adds links. weight is purely a visual signal.

import type { GraphEdge, GraphNode } from "./types";

export const computeDegree = (
  nodeId: string,
  edges: GraphEdge[],
): number => {
  let d = 0;
  for (const e of edges) {
    if (e.status !== "active") continue;
    if (e.from === nodeId || e.to === nodeId) d += 1;
  }
  return d;
};

const stateBoost: Record<GraphNode["state"], number> = {
  clicked: 2.2,
  kinda: 1,
  unclear: 0.4,
};

export const computeWeight = (
  node: GraphNode,
  edges: GraphEdge[],
): number => {
  const degree = computeDegree(node.id, edges);
  const ageDays =
    Math.max(0, (Date.now() - node.createdAt) / (1000 * 60 * 60 * 24));
  const ageBoost = Math.min(1.5, Math.log1p(ageDays) * 0.4);
  return 3 + degree * 1.6 + stateBoost[node.state] + ageBoost;
};

// cluster id: nodes sharing the same analogy system are pulled together
// softly. unrelated clusters drift apart in the force layout, which is
// exactly what makes the map feel like real understanding instead of
// a single connected blob.
export const clusterIdFor = (node: GraphNode): string => node.system;

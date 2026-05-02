// radial layout. for each render we place the focus node at center
// and its accepted neighbors on a soft circle around it. we cap the
// visible neighbors at 6 so the canvas never feels noisy — the rest
// are reachable by clicking through.

import type { GraphEdge, GraphNode } from "./types";

export type LayoutPoint = {
  id: string;
  x: number;
  y: number;
  // distance from focus, in hops (0 = focus, 1 = direct neighbor)
  ring: number;
};

export type LayoutEdge = {
  edge: GraphEdge;
  fromPoint: LayoutPoint;
  toPoint: LayoutPoint;
};

export type Layout = {
  points: LayoutPoint[];
  edges: LayoutEdge[];
  // suggestions involving the focus node, surfaced separately in ui
  pendingForFocus: GraphEdge[];
};

const MAX_NEIGHBORS = 6;

export const layoutGraph = (
  nodes: GraphNode[],
  edges: GraphEdge[],
  focusId: string,
  size: { width: number; height: number },
): Layout => {
  const cx = size.width / 2;
  const cy = size.height / 2;
  const radius = Math.max(120, Math.min(size.width, size.height) / 2 - 90);

  const focus = nodes.find((n) => n.id === focusId);
  if (!focus) {
    return { points: [], edges: [], pendingForFocus: [] };
  }

  const active = edges.filter((e) => e.status === "active");
  const pending = edges.filter(
    (e) => e.status === "pending" && (e.from === focusId || e.to === focusId),
  );

  // collect direct neighbors via active edges
  const neighborIds = new Set<string>();
  for (const e of active) {
    if (e.from === focusId) neighborIds.add(e.to);
    if (e.to === focusId) neighborIds.add(e.from);
  }
  const neighbors = nodes
    .filter((n) => neighborIds.has(n.id))
    .slice(0, MAX_NEIGHBORS);

  const points: LayoutPoint[] = [
    { id: focus.id, x: cx, y: cy, ring: 0 },
  ];

  const angleStep = (Math.PI * 2) / Math.max(neighbors.length, 1);
  // start from the top so the layout feels intentional
  const startAngle = -Math.PI / 2;
  neighbors.forEach((n, i) => {
    const angle = startAngle + i * angleStep;
    points.push({
      id: n.id,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      ring: 1,
    });
  });

  const pointIndex = new Map(points.map((p) => [p.id, p]));
  const layoutEdges: LayoutEdge[] = active
    .filter(
      (e) => pointIndex.has(e.from) && pointIndex.has(e.to),
    )
    .map((e) => ({
      edge: e,
      fromPoint: pointIndex.get(e.from)!,
      toPoint: pointIndex.get(e.to)!,
    }));

  return {
    points,
    edges: layoutEdges,
    pendingForFocus: pending,
  };
};

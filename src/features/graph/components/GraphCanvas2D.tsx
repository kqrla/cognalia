// flat, neo4j-style 2d understanding graph. svg-based force layout
// implemented in-house so we don't pull in another heavy dependency.
//
// design goals:
//   - nodes are weighted (computeWeight drives radius)
//   - nodes that share an analogy system are gently pulled toward
//     the same cluster anchor, but unrelated clusters drift apart
//   - drag a node to pin it, scroll to zoom, drag empty space to pan
//   - click a node to focus, click an edge to inspect

import { useEffect, useMemo, useRef, useState } from "react";
import { getSystem } from "@/features/analogy/systems";
import type { GraphEdge, GraphNode } from "../types";
import { edgeStyle } from "../types";
import { computeDegree, computeWeight } from "../weights";

type Props = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  focusId: string | null;
  onFocusNode: (id: string) => void;
  onSelectEdge: (edge: GraphEdge) => void;
};

type SimNode = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
  radius: number;
  weight: number;
  degree: number;
  color: string;
  cluster: string;
  data: GraphNode;
};

const systemColors: Record<string, string> = {
  building_lego: "#c9a27a",
  cooking_recipe: "#d98a6a",
  storage_organization: "#a3b18a",
  traffic_flow: "#e0b25a",
  relationship_dynamics: "#d98aa6",
  gaming_progression: "#7aa6d9",
  story_narrative: "#b39ddb",
  company_startup: "#90a4ae",
  sports_team_strategy: "#80cbc4",
  film_production: "#9e8a7a",
  social_media: "#8ad1c7",
  music_playlist: "#b388eb",
};

const stateOpacity: Record<GraphNode["state"], number> = {
  clicked: 1,
  kinda: 0.78,
  unclear: 0.5,
};

const WIDTH = 1200;
const HEIGHT = 760;

export const GraphCanvas2D = ({
  nodes,
  edges,
  focusId,
  onFocusNode,
  onSelectEdge,
}: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const simRef = useRef<Map<string, SimNode>>(new Map());
  const [, force] = useState(0);
  const tick = () => force((n) => (n + 1) % 1_000_000);

  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const draggingNode = useRef<string | null>(null);
  const draggingPan = useRef<{ x: number; y: number } | null>(null);

  const activeEdges = useMemo(
    () => edges.filter((e) => e.status === "active"),
    [edges],
  );

  // (re)build sim nodes when the graph changes, preserving previous positions
  useEffect(() => {
    const previous = simRef.current;
    const next = new Map<string, SimNode>();

    // cluster anchors: one per analogy system, distributed on a ring
    const clusterKeys = Array.from(new Set(nodes.map((n) => getSystem(n.system).id)));
    const anchors = new Map<string, { x: number; y: number }>();
    clusterKeys.forEach((key, i) => {
      const angle = (i / Math.max(clusterKeys.length, 1)) * Math.PI * 2;
      const radius = clusterKeys.length <= 1 ? 0 : 240 + clusterKeys.length * 14;
      anchors.set(key, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });
    });

    nodes.forEach((node) => {
      const cluster = getSystem(node.system).id;
      const anchor = anchors.get(cluster) ?? { x: 0, y: 0 };
      const prev = previous.get(node.id);
      const weight = computeWeight(node, activeEdges);
      const degree = computeDegree(node.id, activeEdges);
      next.set(node.id, {
        id: node.id,
        x: prev?.x ?? anchor.x + (Math.random() - 0.5) * 80,
        y: prev?.y ?? anchor.y + (Math.random() - 0.5) * 80,
        vx: prev?.vx ?? 0,
        vy: prev?.vy ?? 0,
        fx: prev?.fx ?? null,
        fy: prev?.fy ?? null,
        radius: Math.max(10, weight * 2.6),
        weight,
        degree,
        color: systemColors[cluster] ?? "#a89b8c",
        cluster,
        data: node,
      });
    });

    simRef.current = next;
    tick();
  }, [nodes, activeEdges]);

  // force simulation loop
  useEffect(() => {
    let raf = 0;
    let alpha = 1;
    const links = activeEdges
      .map((e) => ({
        edge: e,
        source: simRef.current.get(e.from),
        target: simRef.current.get(e.to),
      }))
      .filter((l): l is { edge: GraphEdge; source: SimNode; target: SimNode } =>
        Boolean(l.source && l.target),
      );

    const clusters = new Map<string, { x: number; y: number }>();
    const clusterKeys = Array.from(
      new Set(Array.from(simRef.current.values()).map((n) => n.cluster)),
    );
    clusterKeys.forEach((key, i) => {
      const angle = (i / Math.max(clusterKeys.length, 1)) * Math.PI * 2;
      const radius = clusterKeys.length <= 1 ? 0 : 240 + clusterKeys.length * 14;
      clusters.set(key, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });
    });

    const step = () => {
      const sims = Array.from(simRef.current.values());
      if (sims.length === 0) {
        raf = requestAnimationFrame(step);
        return;
      }

      // repulsion
      for (let i = 0; i < sims.length; i++) {
        for (let j = i + 1; j < sims.length; j++) {
          const a = sims[i];
          const b = sims[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist2 = dx * dx + dy * dy + 0.01;
          const dist = Math.sqrt(dist2);
          const sameCluster = a.cluster === b.cluster;
          const strength = (sameCluster ? 900 : 2200) * (a.radius + b.radius) * 0.05;
          const f = strength / dist2;
          const fx = (dx / dist) * f;
          const fy = (dy / dist) * f;
          a.vx -= fx;
          a.vy -= fy;
          b.vx += fx;
          b.vy += fy;
        }
      }

      // link spring
      links.forEach(({ source, target }) => {
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
        const desired = 110 + source.radius + target.radius;
        const k = 0.04;
        const f = (dist - desired) * k;
        const fx = (dx / dist) * f;
        const fy = (dy / dist) * f;
        source.vx += fx;
        source.vy += fy;
        target.vx -= fx;
        target.vy -= fy;
      });

      // cluster gravity
      sims.forEach((n) => {
        const anchor = clusters.get(n.cluster);
        if (!anchor) return;
        n.vx += (anchor.x - n.x) * 0.012;
        n.vy += (anchor.y - n.y) * 0.012;
        // mild centering
        n.vx += -n.x * 0.0008;
        n.vy += -n.y * 0.0008;
      });

      // integrate
      sims.forEach((n) => {
        if (n.fx !== null && n.fy !== null) {
          n.x = n.fx;
          n.y = n.fy;
          n.vx = 0;
          n.vy = 0;
          return;
        }
        n.vx *= 0.82;
        n.vy *= 0.82;
        n.x += n.vx * alpha;
        n.y += n.vy * alpha;
      });

      alpha = Math.max(0.05, alpha * 0.995);
      tick();
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [activeEdges, nodes]);

  // pointer helpers
  const screenToWorld = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * WIDTH;
    const py = ((clientY - rect.top) / rect.height) * HEIGHT;
    return {
      x: (px - WIDTH / 2 - view.x) / view.k,
      y: (py - HEIGHT / 2 - view.y) / view.k,
    };
  };

  const handlePointerDownNode = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    draggingNode.current = id;
    const node = simRef.current.get(id);
    if (node) {
      node.fx = node.x;
      node.fy = node.y;
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingNode.current) {
      const node = simRef.current.get(draggingNode.current);
      if (node) {
        const { x, y } = screenToWorld(e.clientX, e.clientY);
        node.fx = x;
        node.fy = y;
      }
      return;
    }
    if (draggingPan.current) {
      const dx = e.clientX - draggingPan.current.x;
      const dy = e.clientY - draggingPan.current.y;
      draggingPan.current = { x: e.clientX, y: e.clientY };
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
    }
  };

  const handlePointerUp = (e: React.PointerEvent, id?: string) => {
    if (draggingNode.current && id === draggingNode.current) {
      const node = simRef.current.get(draggingNode.current);
      // single click (no real drag): release pin and focus
      if (node) {
        const moved =
          Math.abs((node.fx ?? 0) - node.x) > 2 ||
          Math.abs((node.fy ?? 0) - node.y) > 2;
        if (!moved) {
          node.fx = null;
          node.fy = null;
          onFocusNode(id);
        }
      }
    }
    draggingNode.current = null;
    draggingPan.current = null;
  };

  const handleBgPointerDown = (e: React.PointerEvent) => {
    draggingPan.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.0015;
    setView((v) => ({ ...v, k: Math.min(2.4, Math.max(0.35, v.k * (1 + delta))) }));
  };

  const sims = Array.from(simRef.current.values());
  const transform = `translate(${WIDTH / 2 + view.x}, ${HEIGHT / 2 + view.y}) scale(${view.k})`;

  return (
    <div className="relative h-[68vh] min-h-[460px] w-full overflow-hidden rounded-3xl border bg-[hsl(25_22%_8%)]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-full w-full touch-none"
        onPointerDown={handleBgPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(e) => handlePointerUp(e)}
        onPointerLeave={(e) => handlePointerUp(e)}
        onWheel={handleWheel}
      >
        <defs>
          <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(25 30% 14%)" />
            <stop offset="100%" stopColor="hsl(25 22% 8%)" />
          </radialGradient>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill="url(#bg-glow)" />

        <g transform={transform}>
          {/* edges */}
          {activeEdges.map((edge) => {
            const a = simRef.current.get(edge.from);
            const b = simRef.current.get(edge.to);
            if (!a || !b) return null;
            const meta = edgeStyle[edge.type];
            const isFocus = edge.from === focusId || edge.to === focusId;
            const stroke = meta.tone === "structural" ? "#baa28f" : "#b99bd4";
            return (
              <g key={edge.id}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={stroke}
                  strokeOpacity={isFocus ? 0.9 : 0.45}
                  strokeWidth={isFocus ? 2 : 1.4}
                  strokeDasharray={meta.line === "dashed" ? "6 6" : undefined}
                />
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="transparent"
                  strokeWidth={14}
                  className="cursor-pointer"
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    onSelectEdge(edge);
                  }}
                />
                {isFocus && (
                  <text
                    x={(a.x + b.x) / 2}
                    y={(a.y + b.y) / 2 - 6}
                    fill="rgba(244,234,216,0.7)"
                    fontSize={10}
                    textAnchor="middle"
                    style={{ pointerEvents: "none" }}
                  >
                    {meta.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* nodes */}
          {sims.map((n) => {
            const isFocus = n.id === focusId;
            return (
              <g
                key={n.id}
                transform={`translate(${n.x}, ${n.y})`}
                className="cursor-pointer"
                onPointerDown={(e) => handlePointerDownNode(e, n.id)}
                onPointerUp={(e) => handlePointerUp(e, n.id)}
              >
                {isFocus && (
                  <circle r={n.radius + 8} fill="rgba(244,234,216,0.12)" />
                )}
                <circle
                  r={n.radius}
                  fill={n.color}
                  fillOpacity={stateOpacity[n.data.state]}
                  stroke={isFocus ? "rgba(244,234,216,0.95)" : "rgba(0,0,0,0.35)"}
                  strokeWidth={isFocus ? 2 : 1}
                />
                <text
                  y={n.radius + 14}
                  fill="rgba(244,234,216,0.92)"
                  fontSize={Math.max(10, Math.min(14, n.weight * 0.9))}
                  textAnchor="middle"
                  fontFamily="Georgia, serif"
                  style={{ pointerEvents: "none" }}
                >
                  {n.data.concept.length > 30
                    ? `${n.data.concept.slice(0, 27)}…`
                    : n.data.concept}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/60 backdrop-blur">
        drag nodes · drag bg to pan · scroll to zoom · click to focus
      </div>

      {nodes.length > 0 && activeEdges.length === 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-xs text-foreground/55">
          no connections yet — clusters will form as you accept relationships
        </div>
      )}
    </div>
  );
};

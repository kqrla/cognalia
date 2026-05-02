// the graph canvas. svg-based, no extra deps. nodes are rounded
// pills; edges are styled by type (solid for structural, dashed for
// analogy). only the focus and its direct neighbors are visible at
// once — clicking a neighbor refocuses, expanding outward.

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getSystem } from "@/features/analogy/systems";
import type { GraphEdge, GraphNode } from "../types";
import { edgeStyle } from "../types";
import { layoutGraph, type LayoutEdge } from "../layout";

type Props = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  focusId: string;
  onFocusNode: (id: string) => void;
  onSelectEdge: (edge: GraphEdge) => void;
};

const stateStyles: Record<
  GraphNode["state"],
  { fillVar: string; stroke: string; dash?: string }
> = {
  clicked: { fillVar: "--card", stroke: "hsl(var(--foreground) / 0.55)" },
  kinda: { fillVar: "--card", stroke: "hsl(var(--foreground) / 0.3)" },
  unclear: {
    fillVar: "--card",
    stroke: "hsl(var(--foreground) / 0.35)",
    dash: "3 4",
  },
};

export const GraphCanvas = ({
  nodes,
  edges,
  focusId,
  onFocusNode,
  onSelectEdge,
}: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 720, height: 520 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const r = entry.contentRect;
      setSize({
        width: Math.max(320, r.width),
        height: Math.max(420, r.height),
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const layout = useMemo(
    () => layoutGraph(nodes, edges, focusId, size),
    [nodes, edges, focusId, size],
  );

  const nodeIndex = useMemo(
    () => new Map(nodes.map((n) => [n.id, n])),
    [nodes],
  );

  return (
    <div
      ref={wrapRef}
      className="relative h-[60vh] min-h-[420px] w-full overflow-hidden rounded-3xl border bg-card/60"
    >
      <svg
        width={size.width}
        height={size.height}
        className="absolute inset-0"
        aria-label="understanding graph canvas"
      >
        <defs>
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="hsl(25 18% 14%)"
              floodOpacity="0.10"
            />
          </filter>
        </defs>

        {/* edges first so nodes paint over them */}
        {layout.edges.map((le) => (
          <EdgeLine key={le.edge.id} le={le} onClick={() => onSelectEdge(le.edge)} />
        ))}

        {/* nodes */}
        {layout.points.map((p) => {
          const n = nodeIndex.get(p.id);
          if (!n) return null;
          const isFocus = p.id === focusId;
          const sys = getSystem(n.system);
          const style = stateStyles[n.state];
          const label = n.concept;
          const charW = isFocus ? 8.4 : 7.4;
          const padX = isFocus ? 22 : 16;
          const w = Math.max(isFocus ? 120 : 92, label.length * charW + padX * 2);
          const h = isFocus ? 52 : 40;
          return (
            <g
              key={p.id}
              transform={`translate(${p.x - w / 2}, ${p.y - h / 2})`}
              className="cursor-pointer transition-transform"
              style={{
                animation: isFocus ? undefined : `graph-float 6s ease-in-out infinite`,
                animationDelay: `${(p.x + p.y) % 4}s`,
              }}
              onClick={() => onFocusNode(p.id)}
            >
              <rect
                width={w}
                height={h}
                rx={h / 2}
                ry={h / 2}
                fill={`hsl(var(${style.fillVar}))`}
                stroke={style.stroke}
                strokeDasharray={style.dash}
                strokeWidth={isFocus ? 1.5 : 1}
                filter="url(#soft-shadow)"
              />
              {/* system tint dot */}
              <circle
                cx={18}
                cy={h / 2}
                r={6}
                fill={`hsl(var(--system-${sys.id.split("_")[0]}, var(--muted)))`}
                opacity={0.9}
              />
              <text
                x={32}
                y={h / 2 + 4}
                fontSize={isFocus ? 14 : 12}
                fill="hsl(var(--foreground))"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* empty state when nothing connects yet */}
      {layout.edges.length === 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-xs text-muted-foreground">
          {nodes.length <= 1
            ? "learn a few more concepts to start seeing connections"
            : "no connections from this node yet — explore another to keep building"}
        </div>
      )}

      <style>{`
        @keyframes graph-float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -3px); }
        }
      `}</style>
    </div>
  );
};

const EdgeLine = ({
  le,
  onClick,
}: {
  le: LayoutEdge;
  onClick: () => void;
}) => {
  const meta = edgeStyle[le.edge.type];
  const dash = meta.line === "dashed" ? "6 6" : undefined;
  // mid point for label hover target
  const mx = (le.fromPoint.x + le.toPoint.x) / 2;
  const my = (le.fromPoint.y + le.toPoint.y) / 2;
  return (
    <g className="cursor-pointer" onClick={onClick}>
      <line
        x1={le.fromPoint.x}
        y1={le.fromPoint.y}
        x2={le.toPoint.x}
        y2={le.toPoint.y}
        stroke="hsl(var(--foreground) / 0.35)"
        strokeWidth={1.25}
        strokeDasharray={dash}
        strokeLinecap="round"
      />
      <g
        transform={`translate(${mx - 50}, ${my - 11})`}
        className={cn("opacity-0 transition-opacity hover:opacity-100")}
      >
        <rect
          width={100}
          height={22}
          rx={11}
          fill="hsl(var(--card))"
          stroke="hsl(var(--border))"
        />
        <text
          x={50}
          y={15}
          textAnchor="middle"
          fontSize={10}
          fill="hsl(var(--muted-foreground))"
        >
          {meta.label}
        </text>
      </g>
    </g>
  );
};

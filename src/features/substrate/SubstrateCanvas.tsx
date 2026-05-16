// simple 2d canvas for substrate. svg, lightweight force layout.
// nodes are draggable; clicking enters "link mode" - the next clicked
// node forms a soft edge to the first. background drag pans.

import { useEffect, useMemo, useRef, useState } from "react";
import {
  nodeDegree,
  updateNodePosition,
  type SubstrateEdge,
  type SubstrateKind,
  type SubstrateNode,
} from "./store";

type Props = {
  nodes: SubstrateNode[];
  edges: SubstrateEdge[];
  selectedId: string | null;
  linkingFrom: string | null;
  onSelect: (id: string | null) => void;
  onLinkClick: (id: string) => void;
};

type Sim = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
  r: number;
};

const W = 1200;
const H = 720;

const kindColor: Record<SubstrateKind, string> = {
  interest: "#d9b67a",
  project: "#7aa6d9",
  concept: "#b39ddb",
  field: "#a3b18a",
  skill: "#e0a07a",
  question: "#d98aa6",
};

export const SubstrateCanvas = ({
  nodes,
  edges,
  selectedId,
  linkingFrom,
  onSelect,
  onLinkClick,
}: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const simRef = useRef<Map<string, Sim>>(new Map());
  const [, force] = useState(0);
  const tick = () => force((n) => (n + 1) % 1_000_000);

  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const dragNode = useRef<string | null>(null);
  const dragMoved = useRef(false);
  const dragPan = useRef<{ x: number; y: number } | null>(null);

  const degreeMap = useMemo(() => {
    const m = new Map<string, number>();
    nodes.forEach((n) => m.set(n.id, nodeDegree(n.id, edges)));
    return m;
  }, [nodes, edges]);

  // rebuild sim, preserve positions
  useEffect(() => {
    const prev = simRef.current;
    const next = new Map<string, Sim>();
    nodes.forEach((n) => {
      const p = prev.get(n.id);
      const deg = degreeMap.get(n.id) ?? 0;
      next.set(n.id, {
        id: n.id,
        x: p?.x ?? n.x,
        y: p?.y ?? n.y,
        vx: p?.vx ?? 0,
        vy: p?.vy ?? 0,
        fx: p?.fx ?? null,
        fy: p?.fy ?? null,
        r: 16 + Math.min(deg, 6) * 3,
      });
    });
    simRef.current = next;
    tick();
  }, [nodes, degreeMap]);

  // physics loop
  useEffect(() => {
    let raf = 0;
    let alpha = 1;
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
          const d2 = dx * dx + dy * dy + 0.01;
          const d = Math.sqrt(d2);
          const f = (1800 * (a.r + b.r) * 0.04) / d2;
          a.vx -= (dx / d) * f;
          a.vy -= (dy / d) * f;
          b.vx += (dx / d) * f;
          b.vy += (dy / d) * f;
        }
      }
      // link springs
      edges.forEach((e) => {
        const a = simRef.current.get(e.from);
        const b = simRef.current.get(e.to);
        if (!a || !b) return;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
        const desired = 130 + a.r + b.r;
        const f = (d - desired) * 0.04;
        a.vx += (dx / d) * f;
        a.vy += (dy / d) * f;
        b.vx -= (dx / d) * f;
        b.vy -= (dy / d) * f;
      });
      // gentle centering
      sims.forEach((n) => {
        n.vx += -n.x * 0.001;
        n.vy += -n.y * 0.001;
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
      alpha = Math.max(0.05, alpha * 0.996);
      tick();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [edges, nodes]);

  const screenToWorld = (cx: number, cy: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const px = ((cx - rect.left) / rect.width) * W;
    const py = ((cy - rect.top) / rect.height) * H;
    return {
      x: (px - W / 2 - view.x) / view.k,
      y: (py - H / 2 - view.y) / view.k,
    };
  };

  const onNodeDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    dragNode.current = id;
    dragMoved.current = false;
    const n = simRef.current.get(id);
    if (n) {
      n.fx = n.x;
      n.fy = n.y;
    }
  };

  const onMove = (e: React.PointerEvent) => {
    if (dragNode.current) {
      const n = simRef.current.get(dragNode.current);
      if (n) {
        const { x, y } = screenToWorld(e.clientX, e.clientY);
        if (Math.abs(x - (n.fx ?? n.x)) > 1.5 || Math.abs(y - (n.fy ?? n.y)) > 1.5) {
          dragMoved.current = true;
        }
        n.fx = x;
        n.fy = y;
      }
      return;
    }
    if (dragPan.current) {
      const dx = e.clientX - dragPan.current.x;
      const dy = e.clientY - dragPan.current.y;
      dragPan.current = { x: e.clientX, y: e.clientY };
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
    }
  };

  const onUp = (e: React.PointerEvent, id?: string) => {
    if (dragNode.current && id === dragNode.current) {
      const n = simRef.current.get(dragNode.current);
      if (n) {
        if (!dragMoved.current) {
          // click - not drag
          n.fx = null;
          n.fy = null;
          if (linkingFrom) onLinkClick(id);
          else onSelect(id);
        } else {
          // persist new position
          updateNodePosition(id, n.x, n.y);
        }
      }
    }
    dragNode.current = null;
    dragPan.current = null;
  };

  const onBgDown = (e: React.PointerEvent) => {
    onSelect(null);
    dragPan.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const d = -e.deltaY * 0.0015;
    setView((v) => ({ ...v, k: Math.min(2.2, Math.max(0.4, v.k * (1 + d))) }));
  };

  const sims = Array.from(simRef.current.values());
  const transform = `translate(${W / 2 + view.x}, ${H / 2 + view.y}) scale(${view.k})`;

  return (
    <div className="relative h-[64vh] min-h-[420px] w-full overflow-hidden rounded-3xl border bg-[hsl(28_22%_10%)]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full touch-none"
        onPointerDown={onBgDown}
        onPointerMove={onMove}
        onPointerUp={(e) => onUp(e)}
        onPointerLeave={(e) => onUp(e)}
        onWheel={onWheel}
      >
        <defs>
          <radialGradient id="sub-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(28 30% 16%)" />
            <stop offset="100%" stopColor="hsl(28 22% 10%)" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#sub-bg)" />
        <g transform={transform}>
          {edges.map((e) => {
            const a = simRef.current.get(e.from);
            const b = simRef.current.get(e.to);
            if (!a || !b) return null;
            return (
              <line
                key={e.id}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="rgba(244,234,216,0.45)"
                strokeWidth={1.4}
                strokeDasharray="5 5"
              />
            );
          })}
          {sims.map((n) => {
            const node = nodes.find((x) => x.id === n.id);
            if (!node) return null;
            const isSel = node.id === selectedId;
            const isLinkSrc = node.id === linkingFrom;
            return (
              <g
                key={n.id}
                transform={`translate(${n.x}, ${n.y})`}
                className="cursor-pointer"
                onPointerDown={(e) => onNodeDown(e, n.id)}
                onPointerUp={(e) => onUp(e, n.id)}
              >
                {(isSel || isLinkSrc) && (
                  <circle r={n.r + 7} fill="rgba(244,234,216,0.12)" />
                )}
                <circle
                  r={n.r}
                  fill={kindColor[node.kind]}
                  fillOpacity={0.92}
                  stroke={
                    isLinkSrc
                      ? "rgba(244,234,216,0.95)"
                      : isSel
                        ? "rgba(244,234,216,0.8)"
                        : "rgba(0,0,0,0.35)"
                  }
                  strokeWidth={isLinkSrc ? 2.5 : isSel ? 2 : 1}
                  strokeDasharray={isLinkSrc ? "4 3" : undefined}
                />
                <text
                  y={n.r + 14}
                  fill="rgba(244,234,216,0.92)"
                  fontSize={12}
                  textAnchor="middle"
                  fontFamily="Georgia, serif"
                  style={{ pointerEvents: "none" }}
                >
                  {node.label.length > 28 ? `${node.label.slice(0, 25)}…` : node.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground/70 backdrop-blur">
        drag nodes · drag bg to pan · scroll to zoom
      </div>
      {linkingFrom && (
        <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground/85 backdrop-blur">
          link mode · click another node
        </div>
      )}
    </div>
  );
};

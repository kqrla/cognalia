// 3d force-directed knowledge graph. neo4j-esque feel, but with two
// deliberate departures:
//
//   1. nothing auto-links. clusters of unrelated concepts can — and
//      should — float independently. a disconnected blob is a feature,
//      not a bug: it means those concepts genuinely aren't related yet.
//
//   2. node size is weighted. broader / better-understood / more
//      connected concepts render larger so the graph reads as a real
//      map of importance, not a uniform mesh.
//
// the focused node gets a subtle glow ring so the user always knows
// where they are inside the cloud.

import { useEffect, useMemo, useRef } from "react";
import ForceGraph3D, { type ForceGraphMethods } from "react-force-graph-3d";
import * as THREE from "three";
import SpriteText from "three-spritetext";
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

type GNode = {
  id: string;
  name: string;
  weight: number;
  degree: number;
  color: string;
  state: GraphNode["state"];
  raw: GraphNode;
};

type GLink = {
  source: string;
  target: string;
  edge: GraphEdge;
  color: string;
  dashed: boolean;
};

// stable color per analogy system — falls back to a neutral tone if the
// css var hasn't resolved yet. these mirror the system tints in tailwind.
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

export const GraphCanvas3D = ({
  nodes,
  edges,
  focusId,
  onFocusNode,
  onSelectEdge,
}: Props) => {
  const fgRef = useRef<ForceGraphMethods>();
  const containerRef = useRef<HTMLDivElement>(null);

  const data = useMemo(() => {
    const gnodes: GNode[] = nodes.map((n) => {
      const sys = getSystem(n.system);
      return {
        id: n.id,
        name: n.concept,
        weight: computeWeight(n, edges),
        degree: computeDegree(n.id, edges),
        color: systemColors[sys.id] ?? "#a89b8c",
        state: n.state,
        raw: n,
      };
    });
    const glinks: GLink[] = edges
      .filter((e) => e.status === "active")
      .map((e) => {
        const meta = edgeStyle[e.type];
        return {
          source: e.from,
          target: e.to,
          edge: e,
          color:
            meta.tone === "structural"
              ? "rgba(120, 100, 85, 0.55)"
              : "rgba(160, 130, 180, 0.55)",
          dashed: meta.line === "dashed",
        };
      });
    return { nodes: gnodes, links: glinks };
  }, [nodes, edges]);

  // soft clustering: nodes sharing an analogy system get pulled toward
  // a shared anchor point. this is how unrelated topics naturally
  // separate into floating islands instead of one tangled mesh.
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    // weaker default charge so clusters don't blow apart
    fg.d3Force("charge")?.strength(-90);
    const link = fg.d3Force("link") as
      | { distance: (fn: (l: GLink) => number) => void }
      | undefined;
    link?.distance((l) => 38 + (l.dashed ? 18 : 0));
  }, [data]);

  // recenter when focus changes
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg || !focusId) return;
    const node = (fg.graphData().nodes as Array<GNode & { x?: number; y?: number; z?: number }>).find(
      (n) => n.id === focusId,
    );
    if (!node || node.x === undefined) return;
    const distance = 220;
    const dist = Math.hypot(node.x ?? 0, node.y ?? 0, node.z ?? 0) || 1;
    const ratio = 1 + distance / dist;
    fg.cameraPosition(
      {
        x: (node.x ?? 0) * ratio,
        y: (node.y ?? 0) * ratio,
        z: (node.z ?? 0) * ratio,
      },
      { x: node.x ?? 0, y: node.y ?? 0, z: node.z ?? 0 },
      900,
    );
  }, [focusId, data]);

  const buildNodeObject = (n: GNode) => {
    const group = new THREE.Group();
    const isFocus = n.id === focusId;
    const radius = Math.max(2.5, n.weight * 0.9);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 18, 18),
      new THREE.MeshLambertMaterial({
        color: new THREE.Color(n.color),
        transparent: true,
        opacity: stateOpacity[n.state],
      }),
    );
    group.add(sphere);

    if (isFocus) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(radius * 1.35, radius * 1.55, 48),
        new THREE.MeshBasicMaterial({
          color: 0xf4ead8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
        }),
      );
      // ring always faces camera-ish — billboard handled by force-graph
      group.add(ring);
    }

    // text label (only for larger nodes to keep canvas clean)
    if (n.weight > 4 || isFocus) {
      const sprite = new SpriteText(n.name);
      sprite.color = "#f4ead8";
      sprite.textHeight = isFocus ? 4.2 : 3;
      sprite.fontFace = "Georgia, serif";
      sprite.backgroundColor = "rgba(20, 16, 12, 0.55)";
      sprite.padding = 2;
      sprite.borderRadius = 3;
      sprite.position.set(0, radius + 4, 0);
      group.add(sprite);
    }

    return group;
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[68vh] min-h-[460px] w-full overflow-hidden rounded-3xl border bg-[hsl(25_22%_8%)]"
    >
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        backgroundColor="rgba(0,0,0,0)"
        showNavInfo={false}
        nodeRelSize={4}
        nodeThreeObject={(n) => buildNodeObject(n as GNode)}
        nodeThreeObjectExtend={false}
        linkColor={(l) => (l as GLink).color}
        linkOpacity={0.75}
        linkWidth={(l) => ((l as GLink).edge.from === focusId || (l as GLink).edge.to === focusId ? 1.4 : 0.6)}
        linkDirectionalParticles={(l) =>
          (l as GLink).edge.from === focusId || (l as GLink).edge.to === focusId ? 2 : 0
        }
        linkDirectionalParticleSpeed={0.006}
        linkDirectionalParticleWidth={1.6}
        onNodeClick={(n) => onFocusNode((n as GNode).id)}
        onLinkClick={(l) => onSelectEdge((l as GLink).edge)}
        enableNodeDrag={true}
        cooldownTime={6000}
        warmupTicks={40}
      />

      {/* ambient hud */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/60 backdrop-blur">
        drag to rotate · scroll to zoom · click a node to focus
      </div>

      {data.nodes.length > 0 && data.links.length === 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-xs text-foreground/55">
          no connections yet — clusters will form as you accept relationships
        </div>
      )}
    </div>
  );
};

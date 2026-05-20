// /demo/graph - static visual stand-in for the understanding graph.
// the real /graph requires a populated graph store; here we just
// render a fake constellation of demo concepts so visitors can sense
// the surface without seeding any real state.

import { demoRecents } from "@/features/analogy/demoData";
import { SiteFooter } from "@/components/SiteNav";
import { DemoBanner, DemoNav } from "@/components/DemoNav";
import { Network } from "lucide-react";

const DemoGraph = () => {
  // pick 8 concepts and lay them on a soft ring around a focus node.
  const nodes = demoRecents.slice(0, 8);
  const focus = nodes[0];
  const ring = nodes.slice(1);
  const radius = 200;
  const cx = 320;
  const cy = 220;

  return (
    <div className="min-h-screen">
      <DemoNav />
      <DemoBanner />
      <main className="container max-w-5xl py-12">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">understanding graph</p>
        <h1 className="font-serif-display text-4xl tracking-tight">how your concepts connect.</h1>
        <p className="mt-3 max-w-xl text-sm text-foreground/70">
          every translation seeds a node; the graph proposes edges as patterns repeat. focus a node to pull its neighbors closer.
        </p>

        <div className="mt-10 surface-paper overflow-hidden">
          <div className="relative h-[460px] w-full bg-gradient-to-br from-background to-secondary/30">
            <svg viewBox="0 0 640 460" className="absolute inset-0 h-full w-full">
              {ring.map((n, i) => {
                const angle = (i / ring.length) * Math.PI * 2;
                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;
                return (
                  <line
                    key={n.id}
                    x1={cx} y1={cy} x2={x} y2={y}
                    stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="3 4"
                  />
                );
              })}
              <circle cx={cx} cy={cy} r={42} fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth={1.5} />
              <text x={cx} y={cy + 4} textAnchor="middle" className="fill-foreground text-xs font-medium">
                {focus.concept.slice(0, 14)}
              </text>
              {ring.map((n, i) => {
                const angle = (i / ring.length) * Math.PI * 2;
                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;
                return (
                  <g key={n.id}>
                    <circle cx={x} cy={y} r={28} fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth={1} />
                    <text x={x} y={y + 3} textAnchor="middle" className="fill-foreground/80 text-[10px]">
                      {n.concept.slice(0, 12)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="flex items-center gap-2 border-t border-border/60 p-3 text-xs text-muted-foreground">
            <Network className="h-3.5 w-3.5" />
            in the real graph, you can drag, focus, and accept suggested edges between nodes.
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default DemoGraph;

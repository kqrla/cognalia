// /graphical - explains the understanding-graph system: what it is, why it
// exists, the concept behind it, and how every translation quietly grows it.

import { Link } from "react-router-dom";
import {
  ArrowRight,
  Network,
  Sparkles,
  Layers,
  Workflow,
  Tag,
  Filter,
  Eye,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

const Graphical = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-4xl pt-16 pb-12 sm:pt-20">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          the graphical system
        </p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          your understanding, drawn as a{" "}
          <span className="a-hl a-hl-sage">living map</span>.
        </h1>
        <p className="mt-6 max-w-[92%] text-lg leading-relaxed text-foreground/75">
          every concept you translate becomes a node. every analogy that lands becomes an edge.
          the result is{" "}
          <span className="a-u a-u-wavy">not a list, not a folder</span> — it is a graph that
          slowly grows in the shape of how you actually think.
        </p>
      </section>

      {/* visual: pseudo-graph */}
      <section className="container max-w-4xl pb-16">
        <div className="surface-paper relative overflow-hidden p-8 sm:p-12">
          <svg
            viewBox="0 0 600 280"
            className="mx-auto block h-auto w-full max-w-2xl"
            aria-hidden="true"
          >
            {/* edges */}
            <g stroke="hsl(var(--foreground) / 0.25)" strokeWidth="1.2" fill="none">
              <line x1="300" y1="140" x2="120" y2="70" />
              <line x1="300" y1="140" x2="490" y2="70" />
              <line x1="300" y1="140" x2="100" y2="220" />
              <line x1="300" y1="140" x2="500" y2="220" />
              <line x1="300" y1="140" x2="300" y2="40" strokeDasharray="3 4" />
              <line x1="120" y1="70" x2="100" y2="220" strokeDasharray="3 4" />
              <line x1="490" y1="70" x2="500" y2="220" strokeDasharray="3 4" />
            </g>
            {/* nodes */}
            {[
              { x: 300, y: 140, r: 28, fill: "hsl(48 90% 70% / 0.7)", label: "git" },
              { x: 120, y: 70, r: 20, fill: "hsl(110 25% 65% / 0.7)", label: "branches" },
              { x: 490, y: 70, r: 20, fill: "hsl(210 55% 75% / 0.7)", label: "merge" },
              { x: 100, y: 220, r: 18, fill: "hsl(340 60% 82% / 0.7)", label: "commit" },
              { x: 500, y: 220, r: 18, fill: "hsl(25 85% 70% / 0.7)", label: "rebase" },
              { x: 300, y: 40, r: 16, fill: "hsl(30 8% 75% / 0.7)", label: "diff" },
            ].map((n) => (
              <g key={n.label}>
                <circle cx={n.x} cy={n.y} r={n.r} fill={n.fill} stroke="hsl(var(--foreground) / 0.5)" strokeWidth="1" />
                <text
                  x={n.x}
                  y={n.y + n.r + 14}
                  textAnchor="middle"
                  fontSize="11"
                  fill="hsl(var(--foreground) / 0.75)"
                  fontFamily="ui-serif, Georgia, serif"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
            a focus node, its neighbors, and the soft ring of related ideas
          </p>
        </div>
      </section>

      {/* why */}
      <section className="container max-w-4xl pb-16">
        <h2 className="mb-3 font-serif-display text-3xl tracking-tight">
          why a graph, and not a list
        </h2>
        <p className="max-w-[92%] text-foreground/80 leading-relaxed">
          lists{" "}
          <span className="a-u a-u-dashed">flatten</span> ideas into chronology. folders force you
          to pick one parent and abandon the rest. but understanding is{" "}
          <span className="a-hl a-hl-yellow a-b">intertwingled</span> — each concept connects
          sideways, upward, and back into things you learned years ago. a graph is the only
          structure honest enough to admit that.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            {
              icon: Network,
              title: "concepts cluster naturally",
              body: "ideas explained through the same thinking system fall near each other, forming visible neighborhoods of meaning.",
            },
            {
              icon: Layers,
              title: "depth, not just breadth",
              body: "every reframing of the same concept is kept. the graph remembers how your understanding evolved, layer by layer.",
            },
            {
              icon: Tag,
              title: "your tags become geography",
              body: "the custom tags you add on /history quietly shape regions of the graph, so your own vocabulary surfaces visually.",
            },
            {
              icon: Eye,
              title: "you can see gaps",
              body: "isolated nodes and lonely edges become obvious. the empty space tells you what to learn next.",
            },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <article key={c.title} className="surface-paper p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-3.5 w-3.5 text-foreground/70" />
                  </span>
                  <p className="text-sm font-semibold tracking-tight">{c.title}</p>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{c.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* the concept */}
      <section className="container max-w-4xl pb-16">
        <h2 className="mb-3 font-serif-display text-3xl tracking-tight">the concept behind it</h2>
        <p className="max-w-[92%] text-foreground/80 leading-relaxed">
          the brain is, in essence, a{" "}
          <span className="a-hl a-hl-blue">complex, infinitely nested, weighted, semantically tagged knowledge graph</span>.
          new ideas don't{" "}
          <span className="a-i">appear</span> — they{" "}
          <span className="a-bb">attach</span>. the graphical system mirrors that. when you
          translate a concept, we don't just store the explanation; we store the{" "}
          <span className="a-u a-u-solid a-u-w3">relationship</span> it has to the analogy you
          chose, the system you pinned, and the concepts you've already understood.
        </p>

        <div className="mt-6 surface-paper p-6 sm:p-8">
          <p className="font-serif-display text-lg italic text-foreground/85">
            "everything is deeply intertwingled."
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            ted nelson, computer lib / dream machines, 1974
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/75">
            we took this seriously. there is no taxonomy, no parent folder, no &quot;category&quot;
            you have to commit to. there is only the graph and the weights between things.
          </p>
        </div>
      </section>

      {/* how it grows */}
      <section className="container max-w-4xl pb-16">
        <h2 className="mb-6 font-serif-display text-3xl tracking-tight">how it grows</h2>
        <ol className="space-y-4">
          {[
            {
              n: "01",
              icon: Sparkles,
              t: "you translate a concept",
              b: "the concept becomes a node. the analogy system you chose becomes its color and its cluster.",
            },
            {
              n: "02",
              icon: Filter,
              t: "we read the relationships",
              b: "the explain pipeline extracts which existing concepts the new one leans on — those become edges, with weights.",
            },
            {
              n: "03",
              icon: Workflow,
              t: "the canvas re-lays itself",
              b: "the focus node centers, neighbors arrange on a soft ring, and the rest fades to ambient context.",
            },
            {
              n: "04",
              icon: Network,
              t: "suggestions surface",
              b: "we propose related concepts you haven't translated yet. accept and they enter the graph; dismiss and they're gone.",
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.n} className="surface-paper flex gap-4 p-5">
                <div className="flex flex-col items-center gap-2">
                  <span className="font-serif-display text-xl text-muted-foreground">{s.n}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-3.5 w-3.5 text-foreground/70" />
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-tight">{s.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/80">{s.b}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* reasoning */}
      <section className="container max-w-4xl pb-24">
        <h2 className="mb-3 font-serif-display text-3xl tracking-tight">the reasoning</h2>
        <p className="max-w-[92%] text-foreground/80 leading-relaxed">
          a translation that lives in isolation{" "}
          <span className="a-u a-u-dotted">decays</span>. a translation that connects to five other
          things you already know becomes{" "}
          <span className="a-hl a-hl-sage a-b">load-bearing</span>. the graphical system exists so
          that every act of understanding{" "}
          <span className="a-i">compounds</span> instead of evaporates.
        </p>
        <p className="mt-4 max-w-[92%] text-foreground/80 leading-relaxed">
          this is also why the graph is{" "}
          <span className="a-u a-u-solid">private by default</span>. it is not a knowledge base for
          the world to read; it is the shape of your own mind, drawn slowly, by you.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/graph"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            open your graph
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/mechanisms"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-foreground/80 hover:text-foreground"
          >
            see the underlying mechanisms
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Graphical;

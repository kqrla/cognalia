// /substrate - explainer page for the substrate cognition system.
// uses the global annotation classes from src/styles/annotation.css.

import { Link } from "react-router-dom";
import {
  ArrowRight,
  Network,
  Layers,
  Eye,
  Compass,
  Sparkles,
  Workflow,
  GitBranch,
  Telescope,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

const Substrate = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* hero */}
      <section className="container max-w-4xl pt-16 pb-16 sm:pt-24">
        <p className="mb-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          a visual cognition and pattern-mapping system
        </p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">
          your interests aren't <span className="a-hl a-hl-pink">scattered</span>.
          they're <span className="a-hl a-hl-yellow">structurally connected</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/75">
          substrate helps you uncover, visualize and articulate the
          <span className="a-u a-u-solid a-u-w3"> load-bearing structures </span>
          underneath your interests, skills, projects and ways of thinking — the
          recurring cognitive patterns that look random on paper but are
          <span className="a-i"> deeply coherent </span>
          internally.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/substrate/app"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            open substrate
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#core"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-foreground/80 hover:text-foreground"
          >
            the core idea
          </a>
        </div>
      </section>

      {/* the core idea */}
      <section id="core" className="container max-w-4xl pb-20">
        <div className="surface-paper p-8 sm:p-12">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            the observation
          </p>
          <h2 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
            most systems organize people by{" "}
            <span className="a-hl a-hl-gray">labels</span>. substrate organizes
            by <span className="a-hl a-hl-blue">structure</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-foreground/80 leading-relaxed">
            many people's interests aren't actually random or disconnected — they
            are expressions of <span className="a-bb">recurring cognitive patterns</span>{" "}
            that are difficult to see from the surface. linguistics +
            coding, neuroscience + design, philosophy + UX,
            architecture + psychology — externally these look disconnected.
            internally they are often tied together by{" "}
            <span className="a-u a-u-solid">shared structures</span>,{" "}
            <span className="a-u a-u-solid">recurring questions</span> and{" "}
            <span className="a-u a-u-solid">transferable hard skills</span>.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-secondary/40 p-5">
              <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                instead of asking
              </p>
              <p className="font-serif-display text-xl text-foreground/75">
                "what subjects do you like?"
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-secondary/60 p-5">
              <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                substrate asks
              </p>
              <p className="font-serif-display text-xl">
                "what patterns keep <span className="a-hl a-hl-yellow">reappearing</span>{" "}
                across the things you're drawn to?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* what it is / isn't */}
      <section className="container max-w-4xl pb-20">
        <div className="grid gap-6 sm:grid-cols-2">
          <article className="surface-paper p-7">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              substrate is
            </p>
            <ul className="space-y-2 text-sm text-foreground/85">
              {[
                "a system for revealing the load-bearing structure underneath your interests",
                "a visual map of recurring cognitive patterns",
                "a translation layer between associative thinking and category-based institutions",
                "a way to make transferable hard skills visible",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-foreground/40">·</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="surface-paper p-7">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              substrate is not
            </p>
            <ul className="space-y-2 text-sm text-foreground/70">
              {[
                "a productivity app",
                "a task manager",
                "a moodboard",
                "a personality test",
                "a social platform",
                "a habit tracker",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-foreground/30">·</span>
                  <span className="a-u a-u-dotted">{t}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* the problem */}
      <section className="container max-w-4xl pb-20">
        <h2 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
          the problem substrate is solving
        </h2>
        <p className="mt-4 max-w-2xl text-foreground/75">
          current systems are <span className="a-u a-u-wavy">category-based</span>. they
          assume interests should fit into neat boxes, specialization should happen
          early, and coherence means staying inside one category. because of this:
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            { icon: Layers, t: "interdisciplinary thinkers", b: "are often viewed as unfocused" },
            { icon: Workflow, t: "neurodivergent learners", b: "are often viewed as inconsistent" },
            { icon: Network, t: "associative thinking", b: "becomes difficult to explain" },
            { icon: Eye, t: "transferable hard skills", b: "become invisible" },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <article key={c.t} className="surface-paper p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-3.5 w-3.5 text-foreground/70" />
                  </span>
                  <p className="text-sm font-semibold tracking-tight">{c.t}</p>
                </div>
                <p className="text-sm text-foreground/75">{c.b}</p>
              </article>
            );
          })}
        </div>
        <p className="mt-8 max-w-2xl text-foreground/75">
          someone interested in computational linguistics, systems design,
          etymology and interface architecture may get described as{" "}
          <span className="a-i">"all over the place"</span> — even when their
          interests are <span className="a-bb">deeply coherent structurally</span>.
        </p>
      </section>

      {/* who it's for */}
      <section className="container max-w-4xl pb-20">
        <div className="surface-paper p-8 sm:p-12">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            who it's for
          </p>
          <h2 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
            built for <span className="a-hl a-hl-sage">pattern-oriented</span> cognition.
          </h2>
          <p className="mt-4 max-w-2xl text-foreground/80">
            especially for people who think associatively, move across multiple
            domains, struggle to explain their interests linearly, and feel
            their interests are coherent internally but fragmented externally.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "interdisciplinary learners",
              "neurodivergent thinkers",
              "polymaths",
              "self-directed learners",
              "researchers",
              "creative technologists",
              "systems thinkers",
            ].map((p) => (
              <span
                key={p}
                className="surface-paper inline-flex items-center rounded-full px-4 py-1.5 text-xs text-foreground/85"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* philosophy */}
      <section className="container max-w-4xl pb-20">
        <h2 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
          the philosophy
        </h2>
        <div className="mt-6 space-y-4">
          {[
            {
              n: "01",
              t: "nothing exists in isolation",
              b: "fields, subjects and disciplines are interconnected. the boundaries between them are often institutional, not structural.",
            },
            {
              n: "02",
              t: "interests are often structurally coherent",
              b: "people may appear scattered at the surface level while remaining highly consistent at the structural level.",
            },
            {
              n: "03",
              t: "transferable hard skills matter",
              b: "many skills transfer across domains because the underlying cognitive structure is the same. linguistics and programming both involve symbolic systems, syntax, parsing, transformation and hierarchy.",
            },
            {
              n: "04",
              t: "understanding requires context",
              b: "deep specialization without broader systems understanding becomes brittle. substrate encourages zooming out before zooming in.",
            },
            {
              n: "05",
              t: "patterns are visible before they are verbalizable",
              b: "many people intuitively sense coherence in their interests before they can explain it. substrate helps convert implicit pattern recognition into explicit structure and language.",
            },
          ].map((p) => (
            <article key={p.n} className="surface-paper flex gap-5 p-6">
              <p className="font-serif-display text-2xl text-foreground/40">{p.n}</p>
              <div>
                <p className="font-serif-display text-lg">{p.t}</p>
                <p className="mt-1 text-sm text-foreground/75">{p.b}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* what it does */}
      <section className="container max-w-4xl pb-20">
        <h2 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
          what substrate actually does
        </h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            { icon: Network, t: "visual mapping", b: "create nodes for interests, projects, concepts, fields, questions, recurring themes. they form a living visual map." },
            { icon: GitBranch, t: "soft connection building", b: "connect nodes through association, structural similarity, recurring themes — not rigid folders, not strict taxonomies." },
            { icon: Sparkles, t: "pattern detection", b: "as the map grows, substrate identifies recurring themes, dense conceptual clusters and load-bearing structures." },
            { icon: Compass, t: "cognitive thread extraction", b: "identify the recurring thread tying your interests together — your dominant structural tendencies." },
            { icon: Telescope, t: "adjacent exploration", b: "structurally-related fields and pathways based on underlying patterns, not surface-level keyword matching." },
            { icon: Eye, t: "translation", b: "convert associative structures into explainable language: summaries, narratives, intellectual descriptions you can actually share." },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <article key={c.t} className="surface-paper p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-3.5 w-3.5 text-foreground/70" />
                  </span>
                  <p className="text-sm font-semibold tracking-tight">{c.t}</p>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{c.b}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* behind the scenes - layers */}
      <section className="container max-w-4xl pb-20">
        <div className="surface-paper p-8 sm:p-12">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            behind the scenes
          </p>
          <h2 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
            five layers of <span className="a-hl a-hl-blue">pattern analysis</span>.
          </h2>
          <ol className="mt-6 space-y-3">
            {[
              { n: "layer 1", t: "node collection", b: "the system gathers explicit interests, concepts, projects and relationships." },
              { n: "layer 2", t: "semantic overlap", b: "identifies conceptual similarities, recurring abstractions and shared structural properties — not just keyword matching." },
              { n: "layer 3", t: "structural clustering", b: "recurring frameworks, repeated modes of thinking, transferable structures, conceptual density." },
              { n: "layer 4", t: "thread synthesis", b: "synthesizes the load-bearing structures underlying the map and your dominant structural tendencies." },
              { n: "layer 5", t: "translation", b: "converts associative structure into institutional narratives, readable summaries and coherent intellectual descriptions." },
            ].map((l) => (
              <li key={l.n} className="flex gap-4 rounded-2xl border border-border/60 bg-secondary/30 p-4">
                <span className="font-serif-display text-sm uppercase tracking-wider text-muted-foreground">
                  {l.n}
                </span>
                <div>
                  <p className="font-serif-display text-base">{l.t}</p>
                  <p className="mt-0.5 text-sm text-foreground/75">{l.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* outputs */}
      <section className="container max-w-4xl pb-20">
        <h2 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
          the output
        </h2>
        <p className="mt-4 max-w-2xl text-foreground/75">
          substrate gives you back something you can <span className="a-bb">actually use</span>.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            { t: "visual cognition map", b: "a dynamic graph: interests, clusters, dense nodes, structural relationships." },
            { t: "thread summaries", b: '"your interests consistently center around structured symbolic systems and the transformation of meaning."' },
            { t: "transferable hard skill identification", b: "systems thinking, abstraction, symbolic reasoning, structural analysis, pattern recognition, information modeling." },
            { t: "adjacent field recommendations", b: "fields, pathways and intersections aligned with your existing cognitive structure." },
            { t: "exportable narratives", b: "portfolio descriptions, admissions-ready explanations, interdisciplinary narratives — the translation layer between associative cognition and category-based institutions." },
          ].map((c) => (
            <article key={c.t} className="surface-paper p-5">
              <p className="font-serif-display text-base">{c.t}</p>
              <p className="mt-1 text-sm text-foreground/80">{c.b}</p>
            </article>
          ))}
        </div>
      </section>

      {/* why it matters */}
      <section className="container max-w-4xl pb-24">
        <div className="surface-paper p-8 sm:p-12">
          <h2 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
            why substrate matters
          </h2>
          <p className="mt-4 max-w-2xl text-foreground/80 leading-relaxed">
            many people possess deep coherence, strong structural thinking and
            transferable hard skills — but lack the{" "}
            <span className="a-u a-u-solid">language</span>,{" "}
            <span className="a-u a-u-solid">visualization</span> and{" "}
            <span className="a-u a-u-solid">institutional translation tools </span>
            to communicate that effectively. substrate exists to bridge that gap.
          </p>
          <p className="mt-6 max-w-2xl text-foreground/85">
            it helps you move from{" "}
            <span className="a-hl a-hl-orange">"my interests seem random"</span> to{" "}
            <span className="a-hl a-hl-yellow">
              "my interests are structurally connected through recurring cognitive
              patterns."
            </span>
          </p>
          <Link
            to="/substrate/app"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            start mapping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Substrate;

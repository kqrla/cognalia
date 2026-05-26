// /roadmap - small, deliberate list of what's planned next. accounts and
// the core feynman format are already in. this page is intentionally
// modest: most of what's coming is sharper analogies, better models, and
// quieter polish, not new product surface area.

import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Circle,
  Sparkles,
  Layers,
  AlertTriangle,
  Workflow,
  Filter,
  Cloud,
  PenTool,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

type Status = "shipped" | "next" | "later";

const items: {
  status: Status;
  icon: typeof Sparkles;
  title: string;
  body: string;
}[] = [
  {
    status: "shipped",
    icon: Layers,
    title: "ten thinking systems with reframing",
    body: "the core format - analogy, mapping, visual, bridge, real explanation, where it breaks - across ten mental models, reframable on demand.",
  },
  {
    status: "shipped",
    icon: Cloud,
    title: "optional cloud sync and json export",
    body: "local-browser-first by default. accounts are optional and only add cross-device sync and a one-click json export.",
  },
  {
    status: "next",
    icon: Sparkles,
    title: "sharper analogies, fewer near-misses",
    body: "ongoing tuning of the explain prompt and model routing so the chosen analogy lands on the first try more often, especially for cross-domain technical terms.",
  },
  {
    status: "next",
    icon: AlertTriangle,
    title: "stricter 'where it breaks'",
    body: "make the limits section call out the specific subclaim the analogy gets wrong, not a generic disclaimer. the goal is fewer confidently-wrong mental models.",
  },
  {
    status: "next",
    icon: Workflow,
    title: "cleaner diagrams",
    body: "tighter mermaid output with analogy-specific labels, better fallbacks when the diagram fails to render, and a small set of layout presets the model can pick from.",
  },
  {
    status: "next",
    icon: Filter,
    title: "better domain disambiguation",
    body: "more reliable detection of overloaded terms, faster pill suggestions, and remembering a pinned subdomain across follow-ups in the same session.",
  },
  {
    status: "later",
    icon: CircleDot,
    title: "small quality-of-life polish",
    body: "keyboard shortcuts on /history, faster peripheral loading, lighter initial bundle. nothing flashy.",
  },
];

const explicitlyOut = [
  "personal ai assistants or chat-style threads",
  "streaks, points, levels, or any gamification",
  "course paths, lessons, or quizzes",
  "social feeds of other users' explanations",
];

const statusMeta: Record<Status, { label: string; Icon: typeof CheckCircle2; tone: string }> = {
  shipped: { label: "shipped", Icon: CheckCircle2, tone: "text-foreground" },
  next: { label: "next", Icon: CircleDot, tone: "text-foreground/80" },
  later: { label: "later", Icon: Circle, tone: "text-muted-foreground" },
};

const Roadmap = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-3xl py-16 sm:py-20">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          roadmap
        </p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          small, deliberate, mostly invisible.
        </h1>
        <p className="mt-6 max-w-2xl text-foreground/75">
          analogize is a thinking tool, not a platform. most of what's coming is making the existing format sharper - better analogies, cleaner diagrams, more honest limits - rather than new surface area.
        </p>
      </section>

      <section className="container max-w-3xl pb-16">
        <ul className="space-y-3">
          {items.map((it, i) => {
            const meta = statusMeta[it.status];
            const Icon = it.icon;
            const Status = meta.Icon;
            return (
              <li key={i} className="surface-paper p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider ${meta.tone}`}>
                    <Status className="h-3 w-3" />
                    {meta.label}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-3.5 w-3.5 text-foreground/70" />
                  </span>
                  <div>
                    <p className="font-serif-display text-lg tracking-tight">{it.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">{it.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="container max-w-3xl pb-20">
        <h2 className="font-serif-display text-2xl tracking-tight">what we're not building</h2>
        <p className="mt-2 text-sm text-foreground/70">
          a short list, kept honest so the product stays a thinking tool.
        </p>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {explicitlyOut.map((x) => (
            <li
              key={x}
              className="surface-paper p-4 text-xs leading-relaxed text-foreground/80"
            >
              {x}
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <h2 className="font-serif-display text-2xl tracking-tight">
            sister apps of analogize
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            other independent engines from our universe.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              to="/substrate"
              className="surface-paper group p-5 transition-colors hover:bg-secondary/40"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="font-serif-display text-xl tracking-tight">substrate</p>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  in development
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                a visual cognition and pattern-mapping system that surfaces the
                load-bearing structures connecting your interests, skills and ways
                of thinking.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-foreground/70 group-hover:text-foreground">
                explore <ArrowRight className="h-3 w-3" />
              </span>
            </Link>

            <article
              aria-disabled="true"
              className="surface-paper p-5 opacity-80"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="font-serif-display text-xl tracking-tight">narrativize</p>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  in development
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                turns the peripheral concepts and subcontents that live in the same
                ecosystem into a single immersive narrative — mapping a broader
                concept end-to-end instead of entering one focused analogy per term.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                soon
              </span>
            </article>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-serif-display text-2xl tracking-tight">
            visual sketchnote mode
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            long-term plans for making analogize explanations visually replayable.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <article className="surface-paper p-5 opacity-80">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-serif-display text-xl tracking-tight">visual sketches</p>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  planned
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                auto-generated sketchnotes that walk through an explanation step by step,
                pairing each analogy beat with a simple hand-drawn-style illustration so the
                concept lands through both language and line.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                long term
              </span>
            </article>

            <article className="surface-paper p-5 opacity-80">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-serif-display text-xl tracking-tight">visual anchoring</p>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  planned
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                persistent visual landmarks tied to concepts you have already learned,
                so revisiting an idea surfaces the same sketch, color, and shape you
                first absorbed it through — reinforcing memory through familiar imagery.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                long term
              </span>
            </article>

            <article className="surface-paper p-5 opacity-80">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-serif-display text-xl tracking-tight">replayable explanations</p>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  planned
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                an animated playback mode that replays the analogy beat-by-beat,
                letting you pause, rewind, and rewatch how a concept maps onto its
                mental model instead of reading it all at once.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                long term
              </span>
            </article>

            <article className="surface-paper p-5 opacity-80">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-serif-display text-xl tracking-tight">not a whiteboard</p>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  principle
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                this is not a free-form drawing app. every visual is generated from the
                analogy itself, constrained and purposeful, so the sketch always serves
                the explanation and never becomes a blank canvas exercise.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                guiding principle
              </span>
            </article>
          </div>
        </div>

        <Link
          to="/app"
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          back to the app
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Roadmap;

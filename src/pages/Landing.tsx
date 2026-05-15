// landing page. serif headings, beige-grid background (already in body),
// a tight pitch, the five-part structure shown as a sample, and clear CTAs.

import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ArrowLeftRight,
  Workflow,
  CornerDownRight,
  FileText,
  AlertTriangle,
  Network,
  Orbit,
  RefreshCcw,
  Lightbulb,
  Layers,
  Filter,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

const sample = [
  {
    label: "analogy",
    icon: Sparkles,
    body: "git is like writing alternate versions of a story without touching the original. each 'what if this happened instead' becomes its own timeline you can keep, share, or discard.",
  },
  {
    label: "mapping",
    icon: ArrowLeftRight,
    body: "canon timeline = main branch · alternate storyline = branch · saving progress = commit · folding back into canon = merge",
  },
  {
    label: "visual",
    icon: Workflow,
    body: "a small diagram showing canon and an alternate timeline diverging, then merging back.",
  },
  {
    label: "bridge",
    icon: CornerDownRight,
    body: "in other words, a branch is a movable pointer to a commit, so you can build new history in parallel and merge it back when you want.",
  },
  {
    label: "real explanation",
    icon: FileText,
    body: "a git branch is a movable pointer to a commit. work on a branch produces commits that diverge from the original tip. merging combines histories.",
  },
  {
    label: "where it breaks",
    icon: AlertTriangle,
    body: "unlike fanfiction, git tracks exact line-by-line changes and does not interpret meaning. branches are not parallel universes; they are pointers into the same commit graph.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-4xl pt-16 pb-20 sm:pt-24 sm:pb-28">
        <p className="mb-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          a cognitive translation tool
        </p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">
          translate ideas into how you already think.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/75">
          analogize takes the feynman technique a step further. instead of just simplifying ideas, it translates them into the mental models you already use. you start in familiar territory, see exactly how each part maps to the real concept, and only then move into the actual explanation.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            try it now
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/features"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-foreground/80 hover:text-foreground"
          >
            see how it works
          </Link>
        </div>
      </section>

      <section className="container max-w-4xl pb-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
            every explanation, the same six layers.
          </h2>
        </div>
        <p className="mb-8 max-w-2xl text-foreground/70">
          example: <em className="font-serif-display not-italic">git branches</em>, translated through the story-and-fanfiction system.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {sample.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.label}
                className="surface-paper p-5"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-3.5 w-3.5 text-foreground/70" />
                  </span>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-foreground/85">{s.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container max-w-4xl pb-24">
        <div className="surface-paper p-8 sm:p-12">
          <h2 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
            the result is not knowing. it is getting it.
          </h2>
          <p className="mt-4 max-w-2xl text-foreground/75">
            concepts stop feeling abstract and start feeling obvious, because they connect to what you already know. and because every explanation also shows where the analogy breaks, you do not end up with a shallow or misleading understanding.
          </p>
          <Link
            to="/app"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            translate something
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Landing;

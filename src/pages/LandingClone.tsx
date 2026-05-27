// /landingclone — sandbox copy of the landing page used to prototype a new
// footer. the navbar and body match Landing.tsx exactly; only the footer at
// the bottom is the new design. do NOT propagate this footer to other pages
// unless the user says the keyword "implementamente".

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
  Mail,
  Github,
  Compass,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";

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

const LandingClone = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-4xl pt-16 pb-20 sm:pt-24 sm:pb-28">
        <p className="mb-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          a cognitive translation tool · clone
        </p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">
          translate ideas into how you already think.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/75">
          analogize takes the feynman technique a step further. instead of just simplifying ideas,
          it translates them into the mental models you already use. you start in
          familiar territory, see exactly how each part maps to the real concept, and only then
          move into the actual explanation, with where it breaks spelled out so you never end up
          with a confident wrong model.
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
              <article key={s.label} className="surface-paper p-5">
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
        <h2 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
          and then it keeps working for you.
        </h2>
        <p className="mt-4 mb-10 max-w-2xl text-foreground/70">
          the six layers are the format. these are the things that quietly compound around them,
          turning one-off explanations into a thinking practice.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { icon: Layers, t: "ten thinking systems", b: "pick the lens you already navigate fluently, gaming, cooking, story, traffic, brains. the same concept reads differently through each." },
            { icon: RefreshCcw, t: "explain again, differently", b: "regenerate through a different system to see the same concept from another angle. no two explanations repeat." },
            { icon: Filter, t: "domain disambiguation", b: "type a fuzzy term and pin the field you mean, so the analogy lands in the right subdomain instead of the most popular one." },
            { icon: Orbit, t: "peripheral analogies", b: "ask about a related idea and we place it inside the same world as the original, or admit, honestly, when it doesn't fit." },
            { icon: Lightbulb, t: "your own references", b: "teach analogize a hobby or mental model it didn't ship with. it's reused later only when it lands naturally." },
            { icon: Network, t: "an understanding graph", b: "every translation becomes a node. every analogy becomes an edge. your understanding draws itself, sideways and upward." },
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

      <section className="container max-w-4xl pb-24">
        <div className="surface-paper p-8 sm:p-12">
          <h2 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
            the result is not knowing. it is getting it.
          </h2>
          <p className="mt-4 max-w-2xl text-foreground/75">
            concepts stop feeling abstract and start feeling obvious, because they connect to what you already know.
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

      {/* ============================================================ */}
      {/* NEW FOOTER — sandboxed to /landingclone only.                 */}
      {/* do NOT lift this into SiteNav.tsx until user says             */}
      {/* "implementamente".                                            */}
      {/* ============================================================ */}
      <footer className="mt-12 border-t border-border/60 bg-secondary/30">
        <div className="container max-w-5xl py-14">
          {/* top: wordmark + statement */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-12">
            <div className="sm:col-span-5">
              <Link to="/" className="font-serif-display text-2xl tracking-tight">
                analogize
              </Link>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/75">
                a thinking tool, not a learning platform. built around the belief that{" "}
                <em className="font-serif-display not-italic">understanding is attachment</em>,
                not retrieval.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  <Compass className="h-3 w-3" />
                  local-first
                </span>
                <span className="inline-flex items-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  no ads
                </span>
                <span className="inline-flex items-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  yours by default
                </span>
              </div>
            </div>

            {/* sitemap columns */}
            <div className="sm:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  the tool
                </p>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/app" className="text-foreground/80 hover:text-foreground">open app</Link></li>
                  <li><Link to="/features" className="text-foreground/80 hover:text-foreground">features</Link></li>
                  <li><Link to="/graphical" className="text-foreground/80 hover:text-foreground">graphical</Link></li>
                  <li><Link to="/examples" className="text-foreground/80 hover:text-foreground">examples</Link></li>
                  <li><Link to="/browseall" className="text-foreground/80 hover:text-foreground">browse all</Link></li>
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  the thinking
                </p>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/philosophy" className="text-foreground/80 hover:text-foreground">philosophy</Link></li>
                  <li><Link to="/goals" className="text-foreground/80 hover:text-foreground">goals</Link></li>
                  <li><Link to="/mechanisms" className="text-foreground/80 hover:text-foreground">mechanisms</Link></li>
                  <li><Link to="/roadmap" className="text-foreground/80 hover:text-foreground">roadmap</Link></li>
                  <li><Link to="/compare" className="text-foreground/80 hover:text-foreground">compare</Link></li>
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  the project
                </p>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="text-foreground/80 hover:text-foreground">about</Link></li>
                  <li><Link to="/faq" className="text-foreground/80 hover:text-foreground">faq</Link></li>
                  <li><Link to="/pricing" className="text-foreground/80 hover:text-foreground">pricing</Link></li>
                  <li><Link to="/contact" className="text-foreground/80 hover:text-foreground">contact</Link></li>
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  yours
                </p>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/account" className="text-foreground/80 hover:text-foreground">account</Link></li>
                  <li><Link to="/register" className="text-foreground/80 hover:text-foreground">register</Link></li>
                  <li><Link to="/login" className="text-foreground/80 hover:text-foreground">login</Link></li>
                  <li><Link to="/demo" className="text-foreground/80 hover:text-foreground">demo</Link></li>
                  <li><Link to="/whyregister" className="text-foreground/80 hover:text-foreground">why register</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* a small editorial line */}
          <div className="mt-12 border-t border-border/60 pt-6">
            <p className="font-serif-display text-lg italic text-foreground/80">
              "everything is deeply intertwingled." <span className="text-muted-foreground not-italic text-sm">— ted nelson, 1974</span>
            </p>
          </div>

          {/* bottom row */}
          <div className="mt-8 flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} analogize · a small studio project</p>
            <div className="flex items-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-1.5 hover:text-foreground">
                <Mail className="h-3.5 w-3.5" /> say hello
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" /> github
              </a>
              <span className="hidden sm:inline">not a learning platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingClone;

// /goals - why analogize exists. conceptual, warm, honest about the
// cognitive mechanics without being a textbook.

import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  FolderTree,
  Lightbulb,
  Map,
  Route,
  ArrowDown,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

const Goals = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <article className="container max-w-3xl py-16 sm:py-24">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          goals
        </p>
        <h1 className="mb-8 font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          memory that hooks, not stores.
        </h1>

        <div className="space-y-6 text-foreground/85 leading-relaxed">
          <p>
            most learning tools treat memory like a filing cabinet: you put facts in, you pull facts out. the problem is that real memory does not work like a filing cabinet. it works like a web. when you remember something, you rarely reach for it by its exact name. you reach for it because something nearby reminded you of it: a smell, a shape, a phrase, a pattern.
          </p>
          <p>
            analogize is designed for that kind of memory. the kind that retrieves an idea because it is connected to something you already know, not because you memorized a label. psychologists call this <em>content-addressable retrieval</em>: finding a memory through its relationships rather than its address.
          </p>

          {/* visual path metaphor */}
          <div className="my-10 flex flex-col items-center gap-3 rounded-xl border border-border/40 bg-secondary/30 p-6 sm:flex-row sm:gap-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-sm">
              <Map className="h-4 w-4 text-foreground/60" />
            </span>
            <ArrowDown className="h-4 w-4 text-muted-foreground sm:hidden" />
            <div className="hidden sm:block h-px flex-1 bg-border/50" />
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-sm">
              <Route className="h-4 w-4 text-foreground/60" />
            </span>
            <ArrowDown className="h-4 w-4 text-muted-foreground sm:hidden" />
            <div className="hidden sm:block h-px flex-1 bg-border/50" />
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-sm">
              <Lightbulb className="h-4 w-4 text-foreground/60" />
            </span>
            <div className="text-center text-xs text-muted-foreground sm:text-left">
              <p className="font-medium text-foreground/80">definition</p>
              <p>single thread</p>
              <p className="mt-2 font-medium text-foreground/80">analogy</p>
              <p>whole neighborhood</p>
              <p className="mt-2 font-medium text-foreground/80">retrieval</p>
              <p>many paths in</p>
            </div>
          </div>

          <h2 className="pt-6 font-serif-display text-3xl tracking-tight">
            what we mean by associative, retentive memory
          </h2>
          <p>
            <strong>retentive</strong> means the idea stays with you. <strong>associative</strong> means it stays because it is wired into your existing mental landscape, not because you repeated it ten times. when you understand a new concept through an analogy you already trust, you are not just learning the concept: you are building a bridge from a place in your mind that already has depth, texture, and emotional weight. that bridge makes the new idea far easier to find later.
          </p>
          <p>
            think of it this way: a definition gives you a single thread to pull. an analogy gives you a whole neighborhood to wander through. the next time you encounter a related idea, you are more likely to remember this one because the paths between them have already been walked.
          </p>

          <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="surface-paper group relative overflow-hidden rounded-lg p-5 transition-colors hover:bg-accent/30">
              <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-secondary/40 transition-all group-hover:scale-150" />
              <span className="relative mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <Brain className="h-4 w-4 text-foreground/70" />
              </span>
              <p className="relative font-serif-display text-lg tracking-tight">
                retentive
              </p>
              <p className="relative mt-1 text-sm leading-relaxed text-foreground/80">
                the idea stays. not because you drilled it, but because it now lives inside a model your brain already trusts.
              </p>
            </div>
            <div className="surface-paper group relative overflow-hidden rounded-lg p-5 transition-colors hover:bg-accent/30">
              <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-secondary/40 transition-all group-hover:scale-150" />
              <span className="relative mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <FolderTree className="h-4 w-4 text-foreground/70" />
              </span>
              <p className="relative font-serif-display text-lg tracking-tight">
                associative
              </p>
              <p className="relative mt-1 text-sm leading-relaxed text-foreground/80">
                you can reach the idea from multiple directions. one cue leads to another, and the concept reappears naturally.
              </p>
            </div>
            <div className="surface-paper group relative overflow-hidden rounded-lg p-5 transition-colors hover:bg-accent/30">
              <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-secondary/40 transition-all group-hover:scale-150" />
              <span className="relative mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <Lightbulb className="h-4 w-4 text-foreground/70" />
              </span>
              <p className="relative font-serif-display text-lg tracking-tight">
                retrievable
              </p>
              <p className="relative mt-1 text-sm leading-relaxed text-foreground/80">
                when you need the idea, you do not need the exact label. any nearby concept can call it forward.
              </p>
            </div>
          </div>

          <h2 className="pt-6 font-serif-display text-3xl tracking-tight">
            the feynman technique, extended
          </h2>
          <p>
            the feynman technique is a test: explain something simply, and if you cannot, you do not understand it. analogize agrees with that test, but it adds the preparation step the feynman technique leaves out.
          </p>

          <blockquote className="my-8 border-l-2 border-foreground/40 pl-5 font-serif-display text-xl italic text-foreground/90">
            "before you can explain something simply, you need a simple place to stand."
          </blockquote>

          <p>
            before you can explain something simply, you need a simple place to stand. analogize gives you that place by translating the concept into a system you already navigate fluently. once you have the analogy, the simple explanation writes itself. you are no longer simplifying from above; you are translating across.
          </p>
          <p>
            in other words, the feynman technique tells you whether you understand. analogize helps you get to the point where the feynman test is easy to pass.
          </p>

          <h2 className="pt-6 font-serif-display text-3xl tracking-tight">
            a cognitive translation tool
          </h2>
          <p>
            analogize is not a tutor. it does not teach you from scratch. it is a translator: it takes a concept from one cognitive language, the language of the field it came from, and renders it into the cognitive language you already speak.
          </p>
          <p>
            if you think in cooking metaphors, a database index becomes a spice rack. if you think in traffic, it becomes a fast lane. the underlying concept does not change. what changes is the doorway you walk through to enter it. and the doorway matters more than we admit. a concept you can only access through jargon is a concept you do not truly own.
          </p>
          <p>
            the goal is ownership. the moment an idea stops being something you read and starts being something you can think with. that is the moment analogize is built for.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <Link
            to="/mechanisms"
            className="group block rounded-lg border border-border/60 bg-card px-5 py-5 transition-colors hover:bg-accent/30"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground/90">
                  if you are the technobabble type
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  a feature-by-feature map of the cognitive mechanisms behind each part of the app, with citations.
                </p>
              </div>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            </div>
          </Link>

          <Link
            to="/app"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            try analogize
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
};

export default Goals;

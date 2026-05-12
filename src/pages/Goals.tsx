// /goals - why analogize exists. conceptual, warm, honest about the
// cognitive mechanics without being a textbook.

import { Link } from "react-router-dom";
import { ArrowRight, Brain, FolderTree, Lightbulb } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
            most learning tools treat memory like a filing cabinet: you put facts in, you pull facts out. the problem is that real memory does not work like a filing cabinet. it works like a web. when you remember something, you rarely reach for it by its exact name. you reach for it because something nearby reminded you of it - a smell, a shape, a phrase, a pattern.
          </p>
          <p>
            analogize is designed for that kind of memory. the kind that retrieves an idea because it is connected to something you already know, not because you memorized a label. psychologists call this <em>content-addressable retrieval</em>: finding a memory through its relationships rather than its address.
          </p>

          <h2 className="pt-6 font-serif-display text-3xl tracking-tight">what we mean by associative, retentive memory</h2>
          <p>
            <strong>retentive</strong> means the idea stays with you. <strong>associative</strong> means it stays because it is wired into your existing mental landscape, not because you repeated it ten times. when you understand a new concept through an analogy you already trust, you are not just learning the concept. you are building a bridge from a place in your mind that already has depth, texture, and emotional weight. that bridge makes the new idea far easier to find later.
          </p>
          <p>
            think of it this way: a definition gives you a single thread to pull. an analogy gives you a whole neighborhood to wander through. the next time you encounter a related idea, you are more likely to remember this one because the paths between them have already been walked.
          </p>

          <div className="my-8 flex flex-col gap-4 sm:flex-row">
            <div className="surface-paper flex-1 p-5">
              <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <Brain className="h-4 w-4 text-foreground/70" />
              </span>
              <p className="font-serif-display text-lg tracking-tight">retentive</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                the idea stays. not because you drilled it, but because it now lives inside a model your brain already trusts.
              </p>
            </div>
            <div className="surface-paper flex-1 p-5">
              <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <FolderTree className="h-4 w-4 text-foreground/70" />
              </span>
              <p className="font-serif-display text-lg tracking-tight">associative</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                you can reach the idea from multiple directions. one cue leads to another, and the concept reappears naturally.
              </p>
            </div>
            <div className="surface-paper flex-1 p-5">
              <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <Lightbulb className="h-4 w-4 text-foreground/70" />
              </span>
              <p className="font-serif-display text-lg tracking-tight">retrievable</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                when you need the idea, you do not need the exact label. any nearby concept can call it forward.
              </p>
            </div>
          </div>

          <h2 className="pt-6 font-serif-display text-3xl tracking-tight">the feynman technique, extended</h2>
          <p>
            the feynman technique is a test: explain something simply, and if you cannot, you do not understand it. analogize agrees with that test, but it adds the preparation step the feynman technique leaves out.
          </p>
          <p>
            before you can explain something simply, you need a simple place to stand. analogize gives you that place by translating the concept into a system you already navigate fluently. once you have the analogy, the simple explanation writes itself. you are no longer simplifying from above; you are translating across.
          </p>
          <p>
            in other words, the feynman technique tells you whether you understand. analogize helps you get to the point where the feynman test is easy to pass.
          </p>

          <h2 className="pt-6 font-serif-display text-3xl tracking-tight">a cognitive translation tool</h2>
          <p>
            analogize is not a tutor. it does not teach you from scratch. it is a translator: it takes a concept from one cognitive language - the language of the field it came from - and renders it into the cognitive language you already speak.
          </p>
          <p>
            if you think in cooking metaphors, a database index becomes a spice rack. if you think in traffic, it becomes a fast lane. the underlying concept does not change. what changes is the doorway you walk through to enter it. and the doorway matters more than we admit. a concept you can only access through jargon is a concept you do not truly own.
          </p>
          <p>
            the goal is ownership. the moment an idea stops being something you read and starts being something you can think with. that is the moment analogize is built for.
          </p>
        </div>

        <Collapsible className="mt-12">
          <CollapsibleTrigger className="group w-full rounded-lg border border-border/60 bg-card px-5 py-4 text-left transition-colors hover:bg-accent">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/90">
                if you are the technobabble type
              </span>
              <span className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                click to expand
              </span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="rounded-b-lg border-x border-b border-border/60 bg-card/50 px-5 py-5 text-sm leading-relaxed text-foreground/80">
              <p className="mb-3">
                <strong className="font-serif-display not-italic">content-addressable memory</strong> refers to retrieval triggered by partial or associative cues rather than explicit address labels. in computational terms, it resembles an associative array or content-addressable memory (CAM) architecture; in biological terms, it maps onto the spreading-activation models of human long-term memory proposed by collins and quillian (1969) and later refined by anderson (1983).
              </p>
              <p className="mb-3">
                analogize operationalizes this by deliberately encoding new declarative knowledge into pre-existing semantic schemas via analogical mapping. this aligns with structure-mapping theory (gentner, 1983), which posits that analogy is not merely rhetorical flourish but a core mechanism of learning: learners map relational structures from a familiar base domain to a novel target domain, preserving higher-order relations while discarding surface features.
              </p>
              <p className="mb-3">
                the feynman technique, reinterpreted through a cognitive lens, functions as a metacognitive monitor (flavell, 1979). it asks: is my mental model coherent enough to generate a compressed, coherent output? analogize augments this by front-loading the encoding phase with cross-domain schema alignment, effectively reducing cognitive load during the generation step (sweller, 1988). the six-layer output - analogy, mapping, visual, bridge, real explanation, limits - constitutes a worked example (renkl, 2005) that scaffolds both elaborative rehearsal and dual coding (paivio, 1986).
              </p>
              <p>
                the <em>where it breaks</em> layer is particularly important: it serves as a discriminative cue (estes, 1994), marking the boundaries of the analogy so the learner does not overgeneralize. without this, analogical transfer risks producing illusory explanatory depth (rozenblit and keil, 2002). by surfacing the failure mode explicitly, analogize attempts to prevent the learner from conflating the source and target domains.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Link
          to="/app"
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          try analogize
          <ArrowRight className="h-4 w-4" />
        </Link>
      </article>

      <SiteFooter />
    </div>
  );
};

export default Goals;

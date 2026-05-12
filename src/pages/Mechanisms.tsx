// /mechanisms - feature-to-mechanism guide. each app feature maps to a
// specific cognitive process. visual layout: left column shows the feature,
// right column shows the mechanism it implements, with a connector between.

import { Link } from "react-router-dom";
import {
  ArrowRight,
  Layers,
  Sparkles,
  ArrowLeftRight,
  Workflow,
  CornerDownRight,
  FileText,
  AlertTriangle,
  RefreshCcw,
  Orbit,
  Filter,
  Lightbulb,
  Clock,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

type Row = {
  icon: typeof Layers;
  feature: string;
  featureBody: string;
  mechanism: string;
  mechanismBody: string;
  citation: string;
};

const rows: Row[] = [
  {
    icon: Layers,
    feature: "picking a thinking system",
    featureBody:
      "you choose a base domain you already navigate fluently - cooking, traffic, gaming, story.",
    mechanism: "deliberate base-domain selection",
    mechanismBody:
      "instead of letting the model invent any analogy, you pin a schema with rich relational structure. that maximises preserved higher-order relations during transfer and reduces interference from surface features.",
    citation: "structure-mapping theory, gentner 1983",
  },
  {
    icon: Sparkles,
    feature: "the analogy layer",
    featureBody:
      "a short, vivid pass in your chosen system, before any technical content shows up.",
    mechanism: "encoding via dual coding",
    mechanismBody:
      "anchors the new idea in a verbal-plus-imagistic representation tied to a familiar schema. this reverses the usual definition-first flow that produces brittle, easily-forgotten encodings.",
    citation: "dual coding, paivio 1986",
  },
  {
    icon: ArrowLeftRight,
    feature: "the explicit mapping list",
    featureBody:
      "one-to-one pairs that say 'this part of the analogy = that part of the real concept'.",
    mechanism: "structure-mapping made auditable",
    mechanismBody:
      "forces a complete, inspectable mapping rather than a partial, opportunistic one. partial mappings are the main source of analogical errors, so making the alignment visible lets you catch them.",
    citation: "gick and holyoak 1983",
  },
  {
    icon: Workflow,
    feature: "the mermaid visual",
    featureBody:
      "a small diagram of the same relational structure, labelled in analogy terms not target jargon.",
    mechanism: "non-verbal channel of dual coding",
    mechanismBody:
      "gives the relational structure a spatial form so it is encoded twice, verbally and visually. keeping the labels in the base domain prevents the visual from smuggling target vocabulary back in too early.",
    citation: "paivio 1986; larkin and simon 1987",
  },
  {
    icon: CornerDownRight,
    feature: "the bridge line ('in other words...')",
    featureBody:
      "a single sentence that walks you from the analogy into the actual concept.",
    mechanism: "explicit transfer cue",
    mechanismBody:
      "transfer almost never happens spontaneously. learners need a concrete prompt that says 'now apply this over there'. the bridge is that cue, baked into the format so you cannot skip it.",
    citation: "barnett and ceci 2002",
  },
  {
    icon: FileText,
    feature: "the real explanation",
    featureBody:
      "the concept in its proper terms, only after the analogy has done its work.",
    mechanism: "elaborative encoding",
    mechanismBody:
      "by the time the technical version arrives, you already have a schema to attach it to. the new vocabulary becomes a set of retrieval cues into an existing network, not isolated terms to memorise.",
    citation: "craik and lockhart 1972",
  },
  {
    icon: AlertTriangle,
    feature: "the 'where it breaks' layer",
    featureBody:
      "an honest note on the points where the analogy stops being accurate.",
    mechanism: "boundary marker against illusory depth",
    mechanismBody:
      "analogies that feel complete tend to be over-trusted. naming the failure mode keeps the analogy as a tool you use rather than a belief you hold, and prevents the source and target from collapsing into one model.",
    citation: "rozenblit and keil 2002",
  },
  {
    icon: RefreshCcw,
    feature: "explain again, different system",
    featureBody:
      "regenerate the same concept through a second or third base domain.",
    mechanism: "multi-context encoding",
    mechanismBody:
      "the same target gets encoded against several independent schemas, increasing the number of distinct retrieval paths into it. that is the operational definition of the kind of associative memory we are aiming for.",
    citation: "smith, glenberg and bjork 1978",
  },
  {
    icon: Orbit,
    feature: "peripheral analogies",
    featureBody:
      "ask about a related concept and it lands inside the same world as the first one.",
    mechanism: "lateral transfer of a mapped structure",
    mechanismBody:
      "re-uses an already-aligned base schema on a neighbouring problem. when the new concept does not fit the schema cleanly we say so, because forced transfer reproduces the same illusory-depth failure as a too-tidy original.",
    citation: "gentner and markman 1997",
  },
  {
    icon: Filter,
    feature: "domain pills and follow-ups",
    featureBody:
      "small prompts that ask which sense of an ambiguous term you mean.",
    mechanism: "metacognitive monitoring",
    mechanismBody:
      "asks you to commit to a target schema before encoding starts, so the mapping is not built on the wrong sense of the word and then quietly relearned later.",
    citation: "flavell 1979",
  },
  {
    icon: Lightbulb,
    feature: "user-suggested presets",
    featureBody:
      "teach the app a hobby or model that is not built in, and reuse it later.",
    mechanism: "user-declared schema density",
    mechanismBody:
      "you tell the system which of your long-term schemas are rich enough to support reliable mapping. that is information the system cannot infer on its own from a short prompt.",
    citation: "schema theory, rumelhart 1980",
  },
  {
    icon: Clock,
    feature: "history, tags and version-per-reframe",
    featureBody:
      "every reframe is kept; you can revisit a concept through different lenses over time.",
    mechanism: "spaced retrieval scaffolding",
    mechanismBody:
      "each revisit is a retrieval-practice event under a slightly different cue. that is the condition under which associative pathways consolidate rather than decay.",
    citation: "roediger and karpicke 2006",
  },
];

const Mechanisms = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-5xl py-16 sm:py-20">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          mechanisms
        </p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          every feature, the cognitive thing it does.
        </h1>
        <p className="mt-6 max-w-2xl text-foreground/75">
          this is the technical companion to{" "}
          <Link to="/goals" className="underline underline-offset-4 hover:text-foreground">
            /goals
          </Link>
          . each piece of the app is mapped to the specific cognitive process it implements, with the research it draws from. nothing here is decorative.
        </p>
      </section>

      <section className="container max-w-5xl pb-24">
        <ol className="space-y-4">
          {rows.map((r, idx) => {
            const Icon = r.icon;
            return (
              <li
                key={r.feature}
                className="surface-paper grid grid-cols-1 gap-0 overflow-hidden p-0 md:grid-cols-[1fr_auto_1fr]"
              >
                {/* feature side */}
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                      <Icon className="h-3.5 w-3.5 text-foreground/70" />
                    </span>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      feature {String(idx + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <p className="font-serif-display text-xl leading-snug tracking-tight">
                    {r.feature}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {r.featureBody}
                  </p>
                </div>

                {/* connector */}
                <div className="relative flex items-center justify-center px-2 md:px-0">
                  <div className="hidden md:block h-full w-px bg-border/70" />
                  <span className="absolute flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background">
                    <ArrowRight className="h-3.5 w-3.5 text-foreground/60" />
                  </span>
                </div>

                {/* mechanism side */}
                <div className="border-t border-border/60 bg-background/40 p-6 md:border-l md:border-t-0">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    mechanism
                  </p>
                  <p className="font-serif-display text-xl leading-snug tracking-tight">
                    {r.mechanism}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {r.mechanismBody}
                  </p>
                  <p className="mt-3 text-xs italic text-muted-foreground">
                    {r.citation}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            try analogize
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/goals"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 px-5 py-3 text-sm text-foreground/80 transition-colors hover:bg-accent"
          >
            back to goals
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Mechanisms;
